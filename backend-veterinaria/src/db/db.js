const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

async function initDb() {
  const db = await open({
    filename: './SmartCareVet.db',
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    )
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS patients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      name TEXT NOT NULL,
      species TEXT NOT NULL,
      breed TEXT,
      birth_date TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS appointments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      patient_id INTEGER,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      service_type TEXT NOT NULL,
      reason TEXT,
      status TEXT DEFAULT 'pending',
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (patient_id) REFERENCES patients(id)
    )
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS purchase (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cita_id INTEGER NOT NULL,
      payment_methods TEXT NOT NULL,
      total REAL NOT NULL,
      service TEXT NOT NULL,
      date DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (cita_id) REFERENCES appointments(id)
    )
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  return db;
}

module.exports = { initDb };