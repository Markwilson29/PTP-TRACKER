import initSqlJs from 'sql.js';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

const DB_PATH = path.join(process.cwd(), 'ptp_tracker.db');

let db = null;

export async function initDatabase() {
  const SQL = await initSqlJs();

  // Load existing database or create new one
  if (fs.existsSync(DB_PATH)) {
    const buffer = fs.readFileSync(DB_PATH);
    db = new SQL.Database(buffer);
  } else {
    db = new SQL.Database();
  }

  // Create tables
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'user',
      full_name TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Add campaign column to users if it doesn't exist (migration)
  try {
    db.run(`ALTER TABLE users ADD COLUMN campaign TEXT NOT NULL DEFAULT ''`);
  } catch (e) {
    // Column already exists, ignore
  }

  // ==================== Schema v2: fully admin-defined columns ====================
  // Every tracker column is defined by the admin in global_columns and stored
  // per-record in record_values. Records themselves only keep system fields.
  db.run(`
    CREATE TABLE IF NOT EXISTS records (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      record_type TEXT NOT NULL DEFAULT 'ptp',
      campaign TEXT NOT NULL DEFAULT '',
      created_by INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (created_by) REFERENCES users(id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS global_columns (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      type TEXT NOT NULL DEFAULT 'text',
      role TEXT NOT NULL DEFAULT '',
      applies_to TEXT NOT NULL DEFAULT 'both',
      required INTEGER NOT NULL DEFAULT 0,
      position INTEGER NOT NULL DEFAULT 0
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS record_values (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      record_id INTEGER NOT NULL,
      column_id INTEGER NOT NULL,
      value TEXT,
      UNIQUE(record_id, column_id)
    )
  `);

  // ==================== Campaigns & Buckets configuration ====================
  db.run(`
    CREATE TABLE IF NOT EXISTS campaign_config (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      position INTEGER NOT NULL DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS campaign_buckets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      campaign_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      position INTEGER NOT NULL DEFAULT 0
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS campaign_assignments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      campaign_id INTEGER NOT NULL,
      user_id INTEGER NOT NULL,
      bucket_id INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS app_meta (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    )
  `);

  // ==================== One-time migration to schema v2 (fresh start) ====================
  // Drops the legacy fixed-column record tables and per-campaign column tables.
  const marker = db.exec("SELECT COUNT(*) FROM app_meta WHERE key = 'schema_v2'");
  const migrated = marker[0] && marker[0].values[0][0] > 0;
  if (!migrated) {
    try {
      db.run("DROP TABLE IF EXISTS column_values");
      db.run("DROP TABLE IF EXISTS campaign_columns");
      db.run("DROP TABLE IF EXISTS ptp_records");
      db.run("DROP TABLE IF EXISTS confirmed_records");
      db.run("INSERT INTO app_meta (key, value) VALUES ('schema_v2', '1')");
      console.log('Migrated to schema v2: all tracker data wiped, columns are now admin-defined');
    } catch (e) {
      console.error('Schema v2 migration error:', e);
    }
  }

  await seedCampaignsAndBuckets();

  saveDatabase();
  console.log('Database initialized successfully');
  return db;
}

/**
 * Seed the default campaigns, buckets and agent accounts (from the
 * usernames.xlsx CIMB roster) — only runs when campaign_config is empty.
 * Columns are NOT seeded; the admin creates them manually.
 */
async function seedCampaignsAndBuckets() {
  const count = db.exec("SELECT COUNT(*) FROM campaign_config");
  const hasExisting = count[0] && count[0].values[0][0] > 0;

  const campaigns = ['Revi Credit', 'Personal Loan', 'GCredit', 'LazPay'];
  const buckets = ['PRE CHARGE OFF', 'CHARGE OFF'];

  campaigns.forEach((name, i) => {
    let campaignId;
    if (hasExisting) {
      const existing = db.exec("SELECT id FROM campaign_config WHERE name = ?", [name]);
      if (existing.length && existing[0].values.length > 0) {
        campaignId = existing[0].values[0][0];
      } else {
        db.run("INSERT INTO campaign_config (name, position) VALUES (?, ?)", [name, i]);
        campaignId = db.exec("SELECT last_insert_rowid()")[0].values[0][0];
      }
    } else {
      db.run("INSERT INTO campaign_config (name, position) VALUES (?, ?)", [name, i]);
      campaignId = db.exec("SELECT last_insert_rowid()")[0].values[0][0];
    }

    const existingBuckets = db.exec("SELECT COUNT(*) FROM campaign_buckets WHERE campaign_id = ?", [campaignId]);
    if (existingBuckets[0].values[0][0] === 0) {
      buckets.forEach((bucket, bi) => {
        db.run("INSERT INTO campaign_buckets (campaign_id, name, position) VALUES (?, ?, ?)", [campaignId, bucket, bi]);
      });
    }
  });

  // Seed agents from the usernames.xlsx roster (no campaign / bucket assignment —
  // the admin assigns them on the Campaigns & Columns page)
  const agents = [
    ['Carl Angeles', 'CIMB-1000'],
    ['Olegario Morilla', 'CIMB-1001'],
    ['Johnver Fontanilla', 'CIMB-1002'],
    ['Princess Catequista', 'CIMB-1003'],
    ['Reggie Ocate', 'CIMB-1004'],
    ['Maricris Sase', 'CIMB-1005'],
    ['Mark Zara', 'CIMB-1006'],
    ['Harvey Rollo', 'CIMB-1007'],
    ['Aishen Domaoal', 'CIMB-1008'],
    ['Fred Justin Sayson', 'CIMB-1009'],
    ['Cecile Delosmo', 'CIMB-1010'],
    ['Arjhon Manatlao', 'CIMB-1011'],
    ['Marvel Dulcero', 'CIMB-1012'],
    ['Mark Wilson Bien', 'CIMB-1013'],
    ['Danica Talion Ogena', 'CIMB-1014'],
    ['Shirleen Tina', 'CIMB-1015'],
    ['Geralden Belo', 'CIMB-1016'],
    ['Kiana Santos', 'CIMB-1017'],
    ['Queeny Romero', 'CIMB-1018'],
    ['Daniela Mae Fontanilla', 'CIMB-1019'],
    ['Michelle Aniceto', 'CIMB-2000'],
    ['Necar Mosende', 'CIMB-2001'],
    ['Denver Gubatan', 'CIMB-2002'],
    ['Jerlyn Baronda', 'CIMB-2003'],
    ['Karen Cordova', 'CIMB-2004'],
    ['Jillan Zambra', 'CIMB-2005'],
    ['Joy Emperado', 'CIMB-2006'],
    ['Mary Castillo', 'CIMB-2007'],
    ['Nasheba Hussin', 'CIMB-2008'],
    ['Kheneth Britania', 'CIMB-2009'],
    ['Melody Tamon', 'CIMB-2010'],
    ['Divina Gutierrez', 'CIMB-2011'],
    ['Gwenevere Torres', 'CIMB-2012'],
  ];
  const AGENT_DEFAULT_PASSWORD = 'Cimb@2026';

  for (const [fullName, username] of agents) {
    const exists = db.exec("SELECT id FROM users WHERE username = ?", [username]);
    if (!exists.length || exists[0].values.length === 0) {
      const hashed = await bcrypt.hash(AGENT_DEFAULT_PASSWORD, 10);
      db.run(
        "INSERT INTO users (username, password, role, full_name, campaign) VALUES (?, ?, 'user', ?, '')",
        [username, hashed, fullName]
      );
    }
  }

  // ==================== One-time roster swap ====================
  // Removes the old hardcoded demo accounts (carl, cecile, fred, …) now that
  // the real CIMB roster from usernames.xlsx is seeded. Runs once.
  const rosterMarker = db.exec("SELECT COUNT(*) FROM app_meta WHERE key = 'roster_swapped'");
  if ((!rosterMarker.length || rosterMarker[0].values[0][0] === 0)) {
    const oldUsernames = ['carl', 'cecile', 'fred', 'geralden', 'gwen', 'harvey', 'joy', 'markzara'];
    let removed = 0;
    for (const u of oldUsernames) {
      const row = db.exec("SELECT id FROM users WHERE username = ?", [u]);
      if (row.length && row[0].values.length > 0) {
        const oldId = row[0].values[0][0];
        db.run("DELETE FROM campaign_assignments WHERE user_id = ?", [oldId]);
        db.run("DELETE FROM records WHERE created_by = ?", [oldId]);
        db.run("DELETE FROM users WHERE id = ?", [oldId]);
        removed++;
      }
    }
    db.run("INSERT INTO app_meta (key, value) VALUES ('roster_swapped', '1')");
    if (removed > 0) console.log(`Roster swapped: removed ${removed} old demo accounts`);
  }

  // Create default admin if not exists
  const adminExists = db.exec("SELECT id FROM users WHERE username = 'admin'");
  if (adminExists.length === 0 || adminExists[0].values.length === 0) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    db.run(
      "INSERT INTO users (username, password, role, full_name) VALUES (?, ?, 'admin', ?)",
      ['admin', hashedPassword, 'Administrator']
    );
  }

  console.log('Seeded campaigns, buckets and the CIMB agent roster');
}

export function getDatabase() {
  return db;
}

export function saveDatabase() {
  if (db) {
    const data = db.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(DB_PATH, buffer);
  }
}

export { db };
