import express from 'express';
import session from 'express-session';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import { initDatabase, getDatabase, saveDatabase, migrateDatabase } from './database.js';

const app = express();
const PORT = process.env.PORT || 3000;
const SESSION_SECRET = process.env.SESSION_SECRET || 'ptp-tracker-secret-key-2024';

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Auth middleware
function requireAuth(req, res, next) {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  next();
}

function requireAdmin(req, res, next) {
  if (!req.session.user || req.session.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
}

// ==================== AUTH ROUTES ====================

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const db = getDatabase();

    const result = db.exec("SELECT id, username, password, role, full_name, campaign FROM users WHERE username = ?", [username]);
    
    if (result.length === 0 || result[0].values.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const [id, uname, hashedPassword, role, fullName, campaign] = result[0].values[0];
    const valid = await bcrypt.compare(password, hashedPassword);
    
    if (!valid) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    req.session.user = { id, username: uname, role, full_name: fullName, campaign: campaign || '' };
    res.json({ user: { id, username: uname, role, full_name: fullName, campaign: campaign || '' } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Logout
app.post('/api/auth/logout', (req, res) => {
  req.session.destroy();
  res.json({ message: 'Logged out' });
});

// Get current user (reads fresh from DB so campaign/role changes apply immediately)
app.get('/api/auth/me', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  try {
    const db = getDatabase();
    const result = db.exec("SELECT id, username, role, full_name, campaign FROM users WHERE id = ?", [req.session.user.id]);
    if (result.length === 0 || result[0].values.length === 0) {
      req.session.destroy();
      return res.status(401).json({ error: 'Not authenticated' });
    }
    const [id, username, role, full_name, campaign] = result[0].values[0];
    const user = { id, username, role, full_name, campaign: campaign || '' };
    req.session.user = user; // keep session in sync
    res.json({ user });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// ==================== PTP RECORDS ROUTES ====================

// Get all PTP records
app.get('/api/records', requireAuth, (req, res) => {
  try {
    const db = getDatabase();
    const result = db.exec(`
      SELECT p.id, p.contact_date, p.agent_name, p.campaign, p.loan_number, p.ptp_date, p.ptp_amount, p.remarks, p.created_by, p.created_at, u.full_name as created_by_name
      FROM ptp_records p
      LEFT JOIN users u ON p.created_by = u.id
      ORDER BY p.id DESC
    `);

    if (result.length === 0) {
      return res.json({ records: [] });
    }

    const columns = result[0].columns;
    const records = result[0].values.map(row => {
      const obj = {};
      columns.forEach((col, i) => obj[col] = row[i]);
      return obj;
    });

    res.json({ records });
  } catch (error) {
    console.error('Get records error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create a PTP record
app.post('/api/records', requireAuth, (req, res) => {
  try {
    const { contact_date, agent_name, campaign, loan_number, ptp_date, ptp_amount, remarks } = req.body;

    // Validation
    if (!contact_date || !agent_name || !loan_number || !ptp_date) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    if (ptp_amount === undefined || isNaN(ptp_amount) || ptp_amount < 0) {
      return res.status(400).json({ error: 'Invalid PTP amount' });
    }
    if (ptp_amount > 999999999) {
      return res.status(400).json({ error: 'PTP amount exceeds maximum' });
    }

    const db = getDatabase();

    db.run(
      `INSERT INTO ptp_records (contact_date, agent_name, campaign, loan_number, ptp_date, ptp_amount, remarks, created_by) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [contact_date, agent_name, campaign || '', loan_number, ptp_date, ptp_amount, remarks || '', req.session.user.id]
    );

    // Get the last inserted row
    const result = db.exec("SELECT last_insert_rowid()");
    const newId = result[0].values[0][0];

    saveDatabase();

    res.json({ 
      message: 'Record created successfully',
      record: { id: newId, contact_date, agent_name, campaign, loan_number, ptp_date, ptp_amount, remarks, created_by: req.session.user.id }
    });
  } catch (error) {
    console.error('Create record error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update a PTP record
app.put('/api/records/:id', requireAuth, (req, res) => {
  try {
    const { id } = req.params;
    const { contact_date, agent_name, campaign, loan_number, ptp_date, ptp_amount, remarks } = req.body;

    // Validation
    if (!contact_date || !agent_name || !loan_number || !ptp_date) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    if (ptp_amount === undefined || isNaN(ptp_amount) || ptp_amount < 0) {
      return res.status(400).json({ error: 'Invalid PTP amount' });
    }

    const db = getDatabase();

    db.run(
      `UPDATE ptp_records SET contact_date=?, agent_name=?, campaign=?, loan_number=?, ptp_date=?, ptp_amount=?, remarks=? WHERE id=?`,
      [contact_date, agent_name, campaign || '', loan_number, ptp_date, ptp_amount, remarks || '', id]
    );

    saveDatabase();
    res.json({ message: 'Record updated successfully' });
  } catch (error) {
    console.error('Update record error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a PTP record
app.delete('/api/records/:id', requireAuth, (req, res) => {
  try {
    const { id } = req.params;
    const db = getDatabase();

    db.run("DELETE FROM ptp_records WHERE id=?", [id]);
    saveDatabase();

    res.json({ message: 'Record deleted successfully' });
  } catch (error) {
    console.error('Delete record error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// ==================== CONFIRMED RECORDS ROUTES ====================

// Get all confirmed records
app.get('/api/confirmed', requireAuth, (req, res) => {
  try {
    const db = getDatabase();
    const result = db.exec(`
      SELECT c.id, c.contact_date, c.agent_name, c.campaign, c.loan_number, c.confirmed_date, c.ptp_amount, c.remarks, c.created_by, c.created_at, u.full_name as created_by_name
      FROM confirmed_records c
      LEFT JOIN users u ON c.created_by = u.id
      ORDER BY c.id DESC
    `);

    if (result.length === 0) {
      return res.json({ records: [] });
    }

    const columns = result[0].columns;
    const records = result[0].values.map(row => {
      const obj = {};
      columns.forEach((col, i) => obj[col] = row[i]);
      return obj;
    });

    res.json({ records });
  } catch (error) {
    console.error('Get confirmed records error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create a confirmed record
app.post('/api/confirmed', requireAuth, (req, res) => {
  try {
    const { contact_date, agent_name, campaign, loan_number, confirmed_date, ptp_amount, remarks } = req.body;

    if (!contact_date || !agent_name || !loan_number || !confirmed_date) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    if (ptp_amount === undefined || isNaN(ptp_amount) || ptp_amount < 0) {
      return res.status(400).json({ error: 'Invalid PTP amount' });
    }

    const db = getDatabase();

    db.run(
      `INSERT INTO confirmed_records (contact_date, agent_name, campaign, loan_number, confirmed_date, ptp_amount, remarks, created_by) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [contact_date, agent_name, campaign || '', loan_number, confirmed_date, ptp_amount, remarks || '', req.session.user.id]
    );

    const result = db.exec("SELECT last_insert_rowid()");
    const newId = result[0].values[0][0];
    saveDatabase();

    res.json({ 
      message: 'Record created successfully',
      record: { id: newId, contact_date, agent_name, campaign, loan_number, confirmed_date, ptp_amount, remarks, created_by: req.session.user.id }
    });
  } catch (error) {
    console.error('Create confirmed record error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update a confirmed record
app.put('/api/confirmed/:id', requireAuth, (req, res) => {
  try {
    const { id } = req.params;
    const { contact_date, agent_name, campaign, loan_number, confirmed_date, ptp_amount, remarks } = req.body;

    if (!contact_date || !agent_name || !loan_number || !confirmed_date) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    if (ptp_amount === undefined || isNaN(ptp_amount) || ptp_amount < 0) {
      return res.status(400).json({ error: 'Invalid PTP amount' });
    }

    const db = getDatabase();
    db.run(
      `UPDATE confirmed_records SET contact_date=?, agent_name=?, campaign=?, loan_number=?, confirmed_date=?, ptp_amount=?, remarks=? WHERE id=?`,
      [contact_date, agent_name, campaign || '', loan_number, confirmed_date, ptp_amount, remarks || '', id]
    );
    saveDatabase();
    res.json({ message: 'Record updated successfully' });
  } catch (error) {
    console.error('Update confirmed record error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a confirmed record
app.delete('/api/confirmed/:id', requireAuth, (req, res) => {
  try {
    const { id } = req.params;
    const db = getDatabase();
    db.run("DELETE FROM confirmed_records WHERE id=?", [id]);
    saveDatabase();
    res.json({ message: 'Record deleted successfully' });
  } catch (error) {
    console.error('Delete confirmed record error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get confirmed records for a specific campaign (any authenticated user, but non-admins see all buckets for their base campaign)
app.get('/api/campaign/:campaign/confirmed', requireAuth, (req, res) => {
  try {
    const campaign = decodeURIComponent(req.params.campaign);
    
    // Validate campaign
    if (!isValidCampaign(campaign)) {
      return res.status(400).json({ error: 'Invalid campaign' });
    }
    
    // Extract base campaign from the requested campaign
    let baseCampaign = campaign;
    const idx = campaign.lastIndexOf(' - ');
    if (idx > 0) {
      baseCampaign = campaign.slice(0, idx);
    }
    
    // Non-admin users can only access their assigned base campaign
    if (req.session.user.role !== 'admin') {
      const userBaseCampaign = req.session.user.campaign;
      let userBase = userBaseCampaign;
      const userIdx = userBaseCampaign.lastIndexOf(' - ');
      if (userIdx > 0) {
        userBase = userBaseCampaign.slice(0, userIdx);
      }
      if (userBase !== baseCampaign) {
        return res.status(403).json({ error: 'You can only access your assigned campaign' });
      }
    }

    const db = getDatabase();
    // Filter by base campaign to include all buckets (Pre-Charge-Off and Charge-Off)
    const result = db.exec(
      `SELECT c.id, c.contact_date, c.agent_name, c.campaign, c.loan_number, c.confirmed_date, c.ptp_amount, c.remarks, c.created_by, c.created_at, u.full_name as created_by_name
      FROM confirmed_records c
      LEFT JOIN users u ON c.created_by = u.id
      WHERE c.campaign LIKE ?
      ORDER BY c.id DESC`,
      [`${baseCampaign}%`]
    );

    if (result.length === 0) {
      return res.json({ records: [] });
    }

    const columns = result[0].columns;
    const records = result[0].values.map((row) => {
      const obj = {};
      columns.forEach((col, i) => (obj[col] = row[i]));
      return obj;
    });

    res.json({ records });
  } catch (error) {
    console.error('Get campaign confirmed records error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// ==================== USER MANAGEMENT ROUTES (Admin) ====================

// Get all users
app.get('/api/users', requireAdmin, (req, res) => {
  try {
    const db = getDatabase();
    const result = db.exec("SELECT id, username, role, full_name, campaign, created_at FROM users ORDER BY id ASC");

    if (result.length === 0) {
      return res.json({ users: [] });
    }

    const columns = result[0].columns;
    const users = result[0].values.map(row => {
      const obj = {};
      columns.forEach((col, i) => obj[col] = row[i]);
      return obj;
    });

    res.json({ users });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create a new user (Admin only)
app.post('/api/users', requireAdmin, async (req, res) => {
  try {
    const { username, password, full_name, role, campaign } = req.body;
    const db = getDatabase();

    // Check if username exists
    const exists = db.exec("SELECT id FROM users WHERE username = ?", [username]);
    if (exists.length > 0 && exists[0].values.length > 0) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    db.run(
      "INSERT INTO users (username, password, role, full_name, campaign) VALUES (?, ?, ?, ?, ?)",
      [username, hashedPassword, role || 'user', full_name, campaign || '']
    );

    saveDatabase();
    res.json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a user (Admin only)
app.delete('/api/users/:id', requireAdmin, (req, res) => {
  try {
    const { id } = req.params;
    const db = getDatabase();

    // Prevent admin from deleting themselves
    if (parseInt(id) === req.session.user.id) {
      return res.status(400).json({ error: 'Cannot delete your own account' });
    }

    db.run("DELETE FROM users WHERE id=?", [id]);
    saveDatabase();

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update user campaign (Admin only)
app.put('/api/users/:id/campaign', requireAdmin, (req, res) => {
  try {
    const { id } = req.params;
    const { campaign } = req.body;
    const db = getDatabase();

    db.run("UPDATE users SET campaign=? WHERE id=?", [campaign || '', id]);
    saveDatabase();

    res.json({ message: 'Campaign updated successfully' });
  } catch (error) {
    console.error('Update campaign error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Change password (Admin only — admins can reset their own and other users' passwords)
app.put('/api/users/:id/password', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;
    const db = getDatabase();

    if (!password || typeof password !== 'string' || password.length < 6) {
      return res.status(400).json({ error: 'New password must be at least 6 characters' });
    }

    const targetId = parseInt(id);
    const exists = db.exec("SELECT id FROM users WHERE id = ?", [targetId]);
    if (exists.length === 0 || exists[0].values.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    db.run("UPDATE users SET password=? WHERE id=?", [hashedPassword, targetId]);
    saveDatabase();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// ==================== CAMPAIGN-SCOPED ROUTES ====================

const BASE_CAMPAIGNS = ['Personal Loan', 'Revi Credit', 'LazPay', 'GCredit'];
const CAMPAIGN_BUCKETS = ['Pre-Charge-Off', 'Charge-Off'];

// Validate a campaign (accepts base names like "Revi Credit" or full names like "Revi Credit - Pre-Charge-Off")
function isValidCampaign(campaign) {
  if (!campaign) return false;
  // Accept exact base campaigns
  if (BASE_CAMPAIGNS.includes(campaign)) return true;
  // Accept campaigns with bucket suffix (e.g., "Personal Loan - Pre-Charge-Off")
  const idx = campaign.lastIndexOf(' - ');
  if (idx > 0) {
    const base = campaign.slice(0, idx);
    const bucket = campaign.slice(idx + 3);
    return BASE_CAMPAIGNS.includes(base) && CAMPAIGN_BUCKETS.includes(bucket);
  }
  return false;
}

// Get users assigned to a specific campaign (admin only)
app.get('/api/campaign/:campaign/users', requireAdmin, (req, res) => {
  try {
    const campaign = decodeURIComponent(req.params.campaign);
    if (!isValidCampaign(campaign)) {
      return res.status(400).json({ error: 'Invalid campaign' });
    }

    const db = getDatabase();
    const result = db.exec(
      "SELECT id, username, role, full_name, campaign, created_at FROM users WHERE campaign = ? ORDER BY id ASC",
      [campaign]
    );

    if (result.length === 0) {
      return res.json({ users: [] });
    }

    const columns = result[0].columns;
    const users = result[0].values.map((row) => {
      const obj = {};
      columns.forEach((col, i) => (obj[col] = row[i]));
      return obj;
    });

    res.json({ users });
  } catch (error) {
    console.error('Get campaign users error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get PTP records for a specific campaign (any authenticated user, but non-admins see all buckets for their base campaign)
app.get('/api/campaign/:campaign/records', requireAuth, (req, res) => {
  try {
    const campaign = decodeURIComponent(req.params.campaign);
    
    // Validate campaign
    if (!isValidCampaign(campaign)) {
      return res.status(400).json({ error: 'Invalid campaign' });
    }
    
    // Extract base campaign from the requested campaign
    let baseCampaign = campaign;
    const idx = campaign.lastIndexOf(' - ');
    if (idx > 0) {
      baseCampaign = campaign.slice(0, idx);
    }
    
    // Non-admin users can only access their assigned base campaign
    if (req.session.user.role !== 'admin') {
      const userBaseCampaign = req.session.user.campaign;
      let userBase = userBaseCampaign;
      const userIdx = userBaseCampaign.lastIndexOf(' - ');
      if (userIdx > 0) {
        userBase = userBaseCampaign.slice(0, userIdx);
      }
      if (userBase !== baseCampaign) {
        return res.status(403).json({ error: 'You can only access your assigned campaign' });
      }
    }

    const db = getDatabase();
    // Filter by base campaign to include all buckets (Pre-Charge-Off and Charge-Off)
    const result = db.exec(
      `SELECT p.id, p.contact_date, p.agent_name, p.campaign, p.loan_number, p.ptp_date, p.ptp_amount, p.remarks, p.created_by, p.created_at, u.full_name as created_by_name
      FROM ptp_records p
      LEFT JOIN users u ON p.created_by = u.id
      WHERE p.campaign LIKE ?
      ORDER BY p.id DESC`,
      [`${baseCampaign}%`]
    );

    if (result.length === 0) {
      return res.json({ records: [] });
    }

    const columns = result[0].columns;
    const records = result[0].values.map((row) => {
      const obj = {};
      columns.forEach((col, i) => (obj[col] = row[i]));
      return obj;
    });

    res.json({ records });
  } catch (error) {
    console.error('Get campaign records error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// ==================== START SERVER ====================

async function startServer() {
  try {
    await initDatabase();
    await migrateDatabase();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log('Default admin credentials: admin / admin123');
      console.log('CIMB Account Monitoring system started');
      console.log('Dashboard: accessible at /dashboard');
      console.log('Confirmed Tracker: accessible at /confirmed');
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
