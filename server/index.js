import express from 'express';
import session from 'express-session';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import { initDatabase, getDatabase, saveDatabase } from './database.js';

const app = express();
const PORT = process.env.PORT || 3000;
const SESSION_SECRET = process.env.SESSION_SECRET || 'ptp-tracker-secret-key-2024';

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
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
  if (!req.session.user || !req.session.user || req.session.user.role !== 'admin') {
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

// Get current user
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
    req.session.user = user;
    res.json({ user });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// ==================== GLOBAL COLUMNS (Admin-defined) ====================

const COLUMN_TYPES = ['text', 'number', 'amount', 'date', 'select'];
const COLUMN_ROLES = ['', 'agent', 'campaign', 'date', 'amount'];
const VALID_ROLES = COLUMN_ROLES.filter(Boolean);

// Get all global columns (any authenticated user needs them to render tables)
app.get('/api/columns', requireAuth, (req, res) => {
  try {
    const db = getDatabase();
    const result = db.exec("SELECT id, name, type, role, applies_to, required, position FROM global_columns ORDER BY position, id");
    const columns = result.length
      ? result[0].values.map(row => ({ id: row[0], name: row[1], type: row[2], role: row[3], applies_to: row[4], required: !!row[5], position: row[6] }))
      : [];
    res.json({ columns });
  } catch (error) {
    console.error('Get columns error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create a global column
app.post('/api/columns', requireAdmin, (req, res) => {
  try {
    const { name, type, role, applies_to, required } = req.body;
    if (!name || !name.trim()) return res.status(400).json({ error: 'Column name is required' });
    if (!COLUMN_TYPES.includes(type)) return res.status(400).json({ error: 'Invalid column type' });
    if (role && !VALID_ROLES.includes(role)) return res.status(400).json({ error: 'Invalid column role' });
    if (role === 'campaign') return res.status(400).json({ error: 'Campaign column is built-in and cannot be created' });

    const db = getDatabase();
    // Only one column per role
    if (role) {
      const existing = db.exec("SELECT id FROM global_columns WHERE role = ?", [role]);
      if (existing.length && existing[0].values.length > 0) {
        return res.status(400).json({ error: `A column with the '${role}' role already exists` });
      }
    }

    const applies = ['ptp', 'confirmed'].includes(applies_to) ? applies_to : 'both';
    const posRes = db.exec("SELECT COALESCE(MAX(position), -1) + 1 FROM global_columns");
    db.run(
      "INSERT INTO global_columns (name, type, role, applies_to, required, position) VALUES (?, ?, ?, ?, ?, ?)",
      [name.trim(), type, role || '', applies, required ? 1 : 0, posRes[0].values[0][0]]
    );
    const columnId = db.exec("SELECT last_insert_rowid()")[0].values[0][0];
    saveDatabase();
    res.json({ message: 'Column created', id: columnId });
  } catch (error) {
    console.error('Create column error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update a global column
app.put('/api/columns/:id', requireAdmin, (req, res) => {
  try {
    const { id } = req.params;
    const { name, type, role, applies_to, required } = req.body;
    if (!name || !name.trim()) return res.status(400).json({ error: 'Column name is required' });
    if (!COLUMN_TYPES.includes(type)) return res.status(400).json({ error: 'Invalid column type' });
    if (role && !VALID_ROLES.includes(role)) return res.status(400).json({ error: 'Invalid column role' });

    const db = getDatabase();
    const existingCol = db.exec("SELECT id, role FROM global_columns WHERE id = ?", [id]);
    if (!existingCol.length || existingCol[0].values.length === 0) {
      return res.status(404).json({ error: 'Column not found' });
    }
    // Only one column per role (excluding this one)
    if (role) {
      const dup = db.exec("SELECT id FROM global_columns WHERE role = ? AND id != ?", [role, id]);
      if (dup.length && dup[0].values.length > 0) {
        return res.status(400).json({ error: `A column with the '${role}' role already exists` });
      }
    }

    const applies = ['ptp', 'confirmed'].includes(applies_to) ? applies_to : 'both';
    db.run(
      "UPDATE global_columns SET name = ?, type = ?, role = ?, applies_to = ?, required = ? WHERE id = ?",
      [name.trim(), type, role || '', applies, required ? 1 : 0, id]
    );
    saveDatabase();
    res.json({ message: 'Column updated' });
  } catch (error) {
    console.error('Update column error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a global column (cascades to its stored values)
app.delete('/api/columns/:id', requireAdmin, (req, res) => {
  try {
    const { id } = req.params;
    const db = getDatabase();
    db.run("DELETE FROM record_values WHERE column_id = ?", [id]);
    db.run("DELETE FROM global_columns WHERE id = ?", [id]);
    saveDatabase();
    res.json({ message: 'Column deleted' });
  } catch (error) {
    console.error('Delete column error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// ==================== RECORDS (schema-less) ====================

/**
 * Attach column values to records: record.values = { [column_id]: value }.
 */
function attachValues(db, records) {
  if (!records.length) return records;
  const ids = records.map(r => r.id);
  const placeholders = ids.map(() => '?').join(',');
  const res = db.exec(
    `SELECT record_id, column_id, value FROM record_values WHERE record_id IN (${placeholders})`,
    ids
  );
  const map = {};
  if (res.length) {
    res[0].values.forEach(([recordId, columnId, value]) => {
      if (!map[recordId]) map[recordId] = {};
      map[recordId][columnId] = value;
    });
  }
  records.forEach(r => { r.values = map[r.id] || {}; });
  return records;
}

function canAccessCampaign(user, campaign) {
  if (!campaign) return true; // records without campaign are visible to all
  if (user.role === 'admin' || !user.campaign) return true;
  const baseOf = (c) => (c.includes(' - ') ? c.split(' - ')[0] : c);
  return baseOf(user.campaign) === baseOf(campaign);
}

function saveRecordValues(db, recordId, values) {
  if (!values || typeof values !== 'object') return;
  for (const [columnId, value] of Object.entries(values)) {
    db.run(
      "INSERT INTO record_values (record_id, column_id, value) VALUES (?, ?, ?) ON CONFLICT(record_id, column_id) DO UPDATE SET value = excluded.value",
      [recordId, Number(columnId), value === null || value === undefined ? '' : String(value)]
    );
  }
}

// Get records ('ptp' or 'confirmed')
app.get('/api/records/:type', requireAuth, (req, res) => {
  try {
    const type = req.params.type;
    if (type !== 'ptp' && type !== 'confirmed') {
      return res.status(400).json({ error: 'Invalid record type' });
    }
    const user = req.session.user;
    const db = getDatabase();
    const result = db.exec(
      `SELECT r.id, r.record_type, r.campaign, r.created_by, r.created_at, u.full_name as created_by_name
       FROM records r LEFT JOIN users u ON r.created_by = u.id
       WHERE r.record_type = ? ORDER BY r.id DESC`,
      [type]
    );

    const columns = result.length ? result[0].columns : [];
    const records = result.length
      ? result[0].values.map(row => {
          const obj = {};
          columns.forEach((col, i) => (obj[col] = row[i]));
          return obj;
        })
      : [];

    const visible = records.filter(r => canAccessCampaign(user, r.campaign));
    attachValues(db, visible);
    res.json({ records: visible });
  } catch (error) {
    console.error('Get records error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create a record
app.post('/api/records/:type', requireAuth, (req, res) => {
  try {
    const type = req.params.type;
    if (type !== 'ptp' && type !== 'confirmed') {
      return res.status(400).json({ error: 'Invalid record type' });
    }
    const { campaign, values } = req.body;
    if (campaign && !canAccessCampaign(req.session.user, campaign)) {
      return res.status(403).json({ error: 'You can only create records for your assigned campaign' });
    }

    const db = getDatabase();

    // Enforce required columns
    const reqCols = db.exec("SELECT id, name FROM global_columns WHERE required = 1 AND (applies_to = 'both' OR applies_to = ?)", [type]);
    if (reqCols.length) {
      for (const [colId, colName] of reqCols[0].values) {
        const v = values?.[colId];
        if (v === undefined || v === null || String(v).trim() === '') {
          return res.status(400).json({ error: `"${colName}" is required` });
        }
      }
    }

    db.run(
      "INSERT INTO records (record_type, campaign, created_by) VALUES (?, ?, ?)",
      [type, campaign || '', req.session.user.id]
    );
    const recordId = db.exec("SELECT last_insert_rowid()")[0].values[0][0];
    saveRecordValues(db, recordId, values);
    saveDatabase();

    res.json({ message: 'Record created', id: recordId });
  } catch (error) {
    console.error('Create record error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update a record
app.put('/api/records/:type/:id', requireAuth, (req, res) => {
  try {
    const type = req.params.type;
    if (type !== 'ptp' && type !== 'confirmed') {
      return res.status(400).json({ error: 'Invalid record type' });
    }
    const { id } = req.params;
    const { campaign, values } = req.body;
    const db = getDatabase();

    const existing = db.exec("SELECT id FROM records WHERE id = ? AND record_type = ?", [id, type]);
    if (!existing.length || existing[0].values.length === 0) {
      return res.status(404).json({ error: 'Record not found' });
    }

    if (campaign !== undefined) {
      db.run("UPDATE records SET campaign = ? WHERE id = ?", [campaign || '', id]);
    }

    saveRecordValues(db, id, values);
    saveDatabase();
    res.json({ message: 'Record updated' });
  } catch (error) {
    console.error('Update record error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a record
app.delete('/api/records/:type/:id', requireAuth, (req, res) => {
  try {
    const type = req.params.type;
    if (type !== 'ptp' && type !== 'confirmed') {
      return res.status(400).json({ error: 'Invalid record type' });
    }
    const { id } = req.params;
    const db = getDatabase();
    db.run("DELETE FROM record_values WHERE record_id = ?", [id]);
    db.run("DELETE FROM records WHERE id = ? AND record_type = ?", [id, type]);
    saveDatabase();
    res.json({ message: 'Record deleted' });
  } catch (error) {
    console.error('Delete record error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// ==================== USER MANAGEMENT ROUTES (Admin) ====================

app.get('/api/users', requireAdmin, (req, res) => {
  try {
    const db = getDatabase();
    const result = db.exec("SELECT id, username, role, full_name, campaign, created_at FROM users ORDER BY id ASC");
    if (result.length === 0) return res.json({ users: [] });

    const columns = result[0].columns;
    const users = result[0].values.map(row => {
      const obj = {};
      columns.forEach((col, i) => (obj[col] = row[i]));
      return obj;
    });
    res.json({ users });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/users', requireAdmin, async (req, res) => {
  try {
    const { username, password, full_name, role, campaign } = req.body;
    const db = getDatabase();

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

app.delete('/api/users/:id', requireAdmin, (req, res) => {
  try {
    const { id } = req.params;
    const db = getDatabase();

    if (parseInt(id) === req.session.user.id) {
      return res.status(400).json({ error: 'Cannot delete your own account' });
    }

    db.run("DELETE FROM users WHERE id=?", [id]);
    db.run("DELETE FROM campaign_assignments WHERE user_id=?", [id]);
    saveDatabase();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.put('/api/users/:id/campaign', requireAdmin, (req, res) => {
  try {
    const { id } = req.params;
    const { campaign } = req.body;
    getDatabase().run("UPDATE users SET campaign=? WHERE id=?", [campaign || '', id]);
    saveDatabase();
    res.json({ message: 'Campaign updated successfully' });
  } catch (error) {
    console.error('Update campaign error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.put('/api/users/:id/password', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    if (!password || typeof password !== 'string' || password.length < 6) {
      return res.status(400).json({ error: 'New password must be at least 6 characters' });
    }

    const targetId = parseInt(id);
    const exists = getDatabase().exec("SELECT id FROM users WHERE id = ?", [targetId]);
    if (exists.length === 0 || exists[0].values.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    getDatabase().run("UPDATE users SET password=? WHERE id=?", [hashedPassword, targetId]);
    saveDatabase();
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// ==================== CAMPAIGNS & BUCKETS CONFIG (Admin) ====================

// Get full campaign configuration (with buckets, agent assignments)
app.get('/api/campaigns-config', requireAuth, (req, res) => {
  try {
    const db = getDatabase();
    const campaigns = db.exec("SELECT id, name, position FROM campaign_config ORDER BY position, id");
    if (campaigns.length === 0) return res.json({ campaigns: [] });

    const result = campaigns[0].values.map(([id, name, position]) => {
      const buckets = db.exec("SELECT id, name, position FROM campaign_buckets WHERE campaign_id = ? ORDER BY position, id", [id]);
      const assignments = db.exec(
        `SELECT a.id, a.user_id, a.bucket_id, u.full_name, u.username, b.name as bucket_name
         FROM campaign_assignments a
         JOIN users u ON a.user_id = u.id
         LEFT JOIN campaign_buckets b ON a.bucket_id = b.id
         WHERE a.campaign_id = ? ORDER BY u.full_name`,
        [id]
      );

      return {
        id,
        name,
        position,
        buckets: buckets.length ? buckets[0].values.map(row => ({ id: row[0], name: row[1], position: row[2] })) : [],
        assignments: assignments.length ? assignments[0].values.map(row => ({ id: row[0], user_id: row[1], bucket_id: row[2], full_name: row[3], username: row[4], bucket_name: row[5] })) : [],
      };
    });

    res.json({ campaigns: result });
  } catch (error) {
    console.error('Get campaigns config error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/campaigns-config', requireAdmin, (req, res) => {
  try {
    const { name } = req.body;
    if (!name || !name.trim()) return res.status(400).json({ error: 'Campaign name is required' });

    const db = getDatabase();
    const exists = db.exec("SELECT id FROM campaign_config WHERE name = ?", [name.trim()]);
    if (exists.length && exists[0].values.length > 0) {
      return res.status(400).json({ error: 'A campaign with this name already exists' });
    }

    const posRes = db.exec("SELECT COALESCE(MAX(position), -1) + 1 FROM campaign_config");
    db.run("INSERT INTO campaign_config (name, position) VALUES (?, ?)", [name.trim(), posRes[0].values[0][0]]);
    const campaignId = db.exec("SELECT last_insert_rowid()")[0].values[0][0];
    saveDatabase();
    res.json({ message: 'Campaign created', id: campaignId });
  } catch (error) {
    console.error('Create campaign error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.put('/api/campaigns-config/:id', requireAdmin, (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    if (!name || !name.trim()) return res.status(400).json({ error: 'Campaign name is required' });

    const db = getDatabase();
    const exists = db.exec("SELECT id FROM campaign_config WHERE name = ? AND id != ?", [name.trim(), id]);
    if (exists.length && exists[0].values.length > 0) {
      return res.status(400).json({ error: 'A campaign with this name already exists' });
    }

    db.run("UPDATE campaign_config SET name = ? WHERE id = ?", [name.trim(), id]);
    saveDatabase();
    res.json({ message: 'Campaign updated' });
  } catch (error) {
    console.error('Update campaign error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/api/campaigns-config/:id', requireAdmin, (req, res) => {
  try {
    const { id } = req.params;
    const db = getDatabase();

    db.run("DELETE FROM campaign_assignments WHERE campaign_id = ?", [id]);
    db.run("DELETE FROM campaign_buckets WHERE campaign_id = ?", [id]);
    db.run("DELETE FROM campaign_config WHERE id = ?", [id]);
    saveDatabase();

    res.json({ message: 'Campaign deleted' });
  } catch (error) {
    console.error('Delete campaign error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// ---- Buckets ----

app.post('/api/campaigns-config/:id/buckets', requireAdmin, (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    if (!name || !name.trim()) return res.status(400).json({ error: 'Bucket name is required' });

    const db = getDatabase();
    const posRes = db.exec("SELECT COALESCE(MAX(position), -1) + 1 FROM campaign_buckets WHERE campaign_id = ?", [id]);
    db.run("INSERT INTO campaign_buckets (campaign_id, name, position) VALUES (?, ?, ?)", [id, name.trim(), posRes[0].values[0][0]]);
    const bucketId = db.exec("SELECT last_insert_rowid()")[0].values[0][0];
    saveDatabase();
    res.json({ message: 'Bucket added', id: bucketId });
  } catch (error) {
    console.error('Add bucket error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.put('/api/buckets/:id', requireAdmin, (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    if (!name || !name.trim()) return res.status(400).json({ error: 'Bucket name is required' });
    getDatabase().run("UPDATE campaign_buckets SET name = ? WHERE id = ?", [name.trim(), id]);
    saveDatabase();
    res.json({ message: 'Bucket updated' });
  } catch (error) {
    console.error('Update bucket error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/api/buckets/:id', requireAdmin, (req, res) => {
  try {
    const { id } = req.params;
    const db = getDatabase();
    db.run("UPDATE campaign_assignments SET bucket_id = NULL WHERE bucket_id = ?", [id]);
    db.run("DELETE FROM campaign_buckets WHERE id = ?", [id]);
    saveDatabase();
    res.json({ message: 'Bucket deleted' });
  } catch (error) {
    console.error('Delete bucket error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// ---- Agent assignments (bucket per user) ----

app.put('/api/campaigns-config/:id/assignments', requireAdmin, (req, res) => {
  try {
    const { id } = req.params;
    const { assignments } = req.body; // [{ user_id, bucket_id }]
    if (!Array.isArray(assignments)) return res.status(400).json({ error: 'assignments must be an array' });

    const db = getDatabase();
    db.run("DELETE FROM campaign_assignments WHERE campaign_id = ?", [id]);
    for (const a of assignments) {
      if (!a.user_id) continue;
      db.run(
        "INSERT INTO campaign_assignments (campaign_id, user_id, bucket_id) VALUES (?, ?, ?)",
        [id, a.user_id, a.bucket_id || null]
      );
    }
    saveDatabase();
    res.json({ message: 'Assignments updated' });
  } catch (error) {
    console.error('Update assignments error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// ==================== START SERVER ====================

async function startServer() {
  try {
    await initDatabase();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log('Default admin credentials: admin / admin123');
      console.log('CIMB Account Monitoring system started');
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
