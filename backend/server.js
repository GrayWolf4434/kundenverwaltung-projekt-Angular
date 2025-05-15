// backend/server.js

const express = require("express");
const cors    = require("cors");
const bcrypt  = require("bcrypt");
const jwt     = require("jsonwebtoken");
const dbMod   = require("./db");    // dein neues db.js
const JWT_SECRET = "DEIN_SUPER_GEHEIMER_KEY";

const app = express();
const port = 3000;

// 1) Middleware
app.use(cors());
app.use(express.json());

// 2) Debug-Log für Register
app.use("/api/register", (req, res, next) => {
  console.log("→ [DEBUG] /api/register body:", req.body);
  next();
});

// 3) Registration
app.post("/api/register", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ fehler: "Username und Passwort erforderlich" });
  }
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return res.status(500).json({ fehler: err.message });
    dbMod.createUser(username, hash, (err, id) => {
      if (err) {
        if (err.message.includes("UNIQUE")) {
          return res.status(409).json({ fehler: "Username bereits vergeben" });
        }
        return res.status(500).json({ fehler: err.message });
      }
      res.status(201).json({ id });
    });
  });
});

// 4) Login
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ fehler: "Username und Passwort erforderlich" });
  }
  dbMod.getUserByUsername(username, (err, user) => {
    if (err) return res.status(500).json({ fehler: err.message });
    if (!user) return res.status(401).json({ fehler: "Ungültige Zugangsdaten" });
    bcrypt.compare(password, user.password_hash, (err, ok) => {
      if (err) return res.status(500).json({ fehler: err.message });
      if (!ok) return res.status(401).json({ fehler: "Ungültige Zugangsdaten" });
      const token = jwt.sign({ sub: user.id }, JWT_SECRET, { expiresIn: "2h" });
      res.json({ token });
    });
  });
});

// ─── CRUD für Kunden ──────────────────────────────────────────────────────────

// GET /api/kunden  – alle Kunden
app.get("/api/kunden", (req, res) => {
  dbMod.kundenAnzeigen((err, rows) => {
    if (err) return res.status(500).json({ fehler: err.message });
    res.json(rows);
  });
});

// POST /api/kunden – neuen Kunden anlegen
app.post("/api/kunden", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ fehler: "Name und E-Mail erforderlich" });
  }
  dbMod.kundeHinzufuegen(name, email, (err, id) => {
    if (err) return res.status(500).json({ fehler: err.message });
    // gib den angelegten Datensatz zurück
    res.status(201).json({ id, name, email });
  });
});

// PUT /api/kunden/:id – Kunden-Daten aktualisieren
app.put("/api/kunden/:id", (req, res) => {
  const id = Number(req.params.id);
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ fehler: "Name und E-Mail erforderlich" });
  }
  dbMod.kundeAktualisieren(id, name, email, (err, changes) => {
    if (err) return res.status(500).json({ fehler: err.message });
    if (changes === 0) return res.status(404).json({ fehler: "Kunde nicht gefunden" });
    res.json({ id, name, email });
  });
});

// DELETE /api/kunden/:id – Kunden löschen
app.delete("/api/kunden/:id", (req, res) => {
  const id = Number(req.params.id);
  dbMod.kundeLoeschen(id, (err, changes) => {
    if (err) return res.status(500).json({ fehler: err.message });
    if (changes === 0) return res.status(404).json({ fehler: "Kunde nicht gefunden" });
    res.status(204).send();
  });
});

// ──────────────────────────────────────────────────────────────────────────────

// Server starten
app.listen(port, () => {
  console.log(`Server läuft unter http://localhost:${port}`);
});
