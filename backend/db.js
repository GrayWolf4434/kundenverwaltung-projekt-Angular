// Tabelle für Benutzer anlegen (falls nicht vorhanden)
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL
  )
`);

// User nach Username laden
function getUserByUsername(username, callback) {
  db.get(
    `SELECT id, username, password_hash FROM users WHERE username = ?`,
    [username],
    (err, row) => {
      if (err) return callback(err);
      callback(null, row);
    }
  );
}

// (Optional) Neuen User anlegen
function createUser(username, passwordHash, callback) {
  db.run(
    `INSERT INTO users (username, password_hash) VALUES (?, ?)`,
    [username, passwordHash],
    function (err) {
      if (err) return callback(err);
      callback(null, this.lastID);
    }
  );
}
module.exports = {
  // … bereits vorhandene Exports …
  getUserByUsername,
  createUser
};
