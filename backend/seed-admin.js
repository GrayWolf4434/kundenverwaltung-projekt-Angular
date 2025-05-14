// backend/seed-admin.js

const bcrypt = require("bcrypt");
const db     = require("./db");

// 1) Admin-Zugangsdaten
const ADMIN_USER = "admin";
const ADMIN_PASS = "DeinSicheresPasswort123!";

// 2) Passwort hashen (synchron, SaltRounds = 10)
const hash = bcrypt.hashSync(ADMIN_PASS, 10);

// 3) User anlegen
db.createUser(ADMIN_USER, hash, (err, id) => {
  if (err) {
    console.error("Fehler beim Anlegen des Admin-Users:", err.message);
  } else {
    console.log(`Admin-User "${ADMIN_USER}" angelegt mit ID ${id}`);
  }
  // 4) DB-Verbindung schließen und Script beenden
  db.close && db.close();
  process.exit(err ? 1 : 0);
});
