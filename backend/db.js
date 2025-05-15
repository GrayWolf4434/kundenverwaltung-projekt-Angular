// backend/db.js

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('kunden.db', err => {
  if (err) console.error("Fehler beim Öffnen der Datenbank:", err.message);
  else console.log("✅ Verbunden mit der SQLite-Datenbank.");
});

db.serialize(() => {
  // Kunden-Tabelle
  db.run(`
    CREATE TABLE IF NOT EXISTS kunden (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL
    )
  `);

  // Users-Tabelle für Login/Register
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL
    )
  `);
});

// CRUD-Funktionen für Kunden (falls du sie brauchst)
function kundeHinzufuegen(name, email, cb) {
  db.run(`INSERT INTO kunden (name,email) VALUES (?,?)`, [name,email], function(err) {
    cb(err, this.lastID);
  });
}
function kundenAnzeigen(cb) {
  db.all(`SELECT * FROM kunden`, [], (err, rows) => cb(err, rows));
}
function kundeLoeschen(id, cb) {
  db.run(`DELETE FROM kunden WHERE id=?`, [id], function(err) {
    cb(err, this.changes);
  });
}
function kundeAktualisieren(id, name, email, cb) {
  db.run(`UPDATE kunden SET name=?,email=? WHERE id=?`, [name,email,id], function(err) {
    cb(err, this.changes);
  });
}

// User-Funktionen
function getUserByUsername(username, cb) {
  db.get(`SELECT id,username,password_hash FROM users WHERE username=?`, [username], (err,row) => {
    cb(err, row);
  });
}
function createUser(username, passwordHash, cb) {
  db.run(`INSERT INTO users (username,password_hash) VALUES (?,?)`, [username,passwordHash], function(err) {
    cb(err, this.lastID);
  });
}

module.exports = {
  db,
  kundeHinzufuegen,
  kundenAnzeigen,
  kundeLoeschen,
  kundeAktualisieren,
  getUserByUsername,
  createUser
};
