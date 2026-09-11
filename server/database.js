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

  db.run(`
    CREATE TABLE IF NOT EXISTS ptp_records (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      contact_date TEXT NOT NULL,
      agent_name TEXT NOT NULL,
      campaign TEXT NOT NULL DEFAULT '',
      loan_number TEXT NOT NULL,
      ptp_date TEXT NOT NULL,
      ptp_amount REAL NOT NULL,
      remarks TEXT,
      created_by INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (created_by) REFERENCES users(id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS confirmed_records (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      contact_date TEXT NOT NULL,
      agent_name TEXT NOT NULL,
      campaign TEXT NOT NULL DEFAULT '',
      loan_number TEXT NOT NULL,
      confirmed_date TEXT NOT NULL,
      ptp_amount REAL NOT NULL,
      remarks TEXT,
      created_by INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (created_by) REFERENCES users(id)
    )
  `);

  // Create default admin if not exists
  const adminExists = db.exec("SELECT id FROM users WHERE username = 'admin'");
  if (adminExists.length === 0 || adminExists[0].values.length === 0) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    db.run(
      "INSERT INTO users (username, password, role, full_name) VALUES (?, ?, ?, ?)",
      ['admin', hashedPassword, 'admin', 'Administrator']
    );
  }

  // Add campaign column to ptp_records if it doesn't exist (migration)
  try {
    db.run(`ALTER TABLE ptp_records ADD COLUMN campaign TEXT NOT NULL DEFAULT ''`);
  } catch (e) {
    // Column already exists, ignore
  }

  // Add campaign column to users if it doesn't exist (migration)
  try {
    db.run(`ALTER TABLE users ADD COLUMN campaign TEXT NOT NULL DEFAULT ''`);
  } catch (e) {
    // Column already exists, ignore
  }

  saveDatabase();
  console.log('Database initialized successfully');
  return db;
}

// Migration: Add confirmed_records table if it doesn't exist (for existing databases)
export async function migrateDatabase() {
  try {
    const db = getDatabase();
    db.run(`
      CREATE TABLE IF NOT EXISTS confirmed_records (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        contact_date TEXT NOT NULL,
        agent_name TEXT NOT NULL,
        campaign TEXT NOT NULL DEFAULT '',
        loan_number TEXT NOT NULL,
        confirmed_date TEXT NOT NULL,
        ptp_amount REAL NOT NULL,
        remarks TEXT,
        created_by INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (created_by) REFERENCES users(id)
      )
    `);
    saveDatabase();
    console.log('Migration completed: confirmed_records table ready');
  } catch (error) {
    console.error('Migration error:', error);
  }
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
