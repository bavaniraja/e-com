const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// User registration
exports.register = (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ error: "Name, email, password required" });

  db.query("SELECT id FROM users WHERE email=?", [email], async (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length > 0) return res.status(409).json({ error: "Email already exists" });

    try {
      const hashed = await bcrypt.hash(password, 10);
      db.query(
        "INSERT INTO users (name,email,password) VALUES (?,?,?)",
        [name, email, hashed],
        (err, result) => {
          if (err) return res.status(500).json({ error: err.message });
          const token = jwt.sign({ id: result.insertId, email }, JWT_SECRET, { expiresIn: "7d" });
          res.status(201).json({ success: true, userId: result.insertId, token });
        }
      );
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  });
};

// User login
exports.login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Email and password required" });

  db.query("SELECT * FROM users WHERE email=?", [email], async (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(401).json({ error: "Invalid credentials" });

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });
    delete user.password;
    res.json({ success: true, user, token });
  });
};

// Middleware to protect routes
exports.authenticate = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: "Missing authorization header" });

  const parts = auth.split(" ");
  if (parts.length !== 2) return res.status(401).json({ error: "Invalid authorization header" });

  try {
    const payload = jwt.verify(parts[1], JWT_SECRET);
    req.user = payload;
    next();
  } catch (e) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};
