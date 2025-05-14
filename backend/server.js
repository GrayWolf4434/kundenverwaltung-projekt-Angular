const bcrypt = require("bcrypt");
const jwt    = require("jsonwebtoken");
const JWT_SECRET = "DEIN_SUPER_GEHEIMER_KEY";


// ➤ Login-Endpoint
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ fehler: "Username und Passwort erforderlich" });
  }

  db.getUserByUsername(username, (err, user) => {
    if (err) return res.status(500).json({ fehler: err.message });
    if (!user) return res.status(401).json({ fehler: "Ungültige Zugangsdaten" });

    bcrypt.compare(password, user.password_hash, (err, valid) => {
      if (err) return res.status(500).json({ fehler: err.message });
      if (!valid) return res.status(401).json({ fehler: "Ungültige Zugangsdaten" });

      const token = jwt.sign(
        { sub: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: "2h" }
      );
      res.json({ token });
    });
  });
});
