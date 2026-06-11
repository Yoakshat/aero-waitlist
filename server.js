const express = require('express');
const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(process.env.DB_PATH || path.join(__dirname, 'waitlist.db'));
db.exec(`CREATE TABLE IF NOT EXISTS signups (
  email TEXT PRIMARY KEY,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
)`);

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

app.post('/api/waitlist', (req, res) => {
  const email = String(req.body.email || '').trim().toLowerCase();
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ ok: false, message: 'Please enter a valid email address.' });
  }
  const result = db.prepare('INSERT OR IGNORE INTO signups (email) VALUES (?)').run(email);
  if (result.changes === 0) {
    return res.json({ ok: true, message: "You're already on the list!" });
  }
  res.json({ ok: true, message: "You're in! We'll be in touch soon." });
});

app.get('/api/waitlist.csv', (req, res) => {
  const rows = db.prepare('SELECT email, created_at FROM signups ORDER BY created_at').all();
  const csv = ['email,joined_at', ...rows.map(r => `${r.email},${r.created_at}`)].join('\n');
  res.type('text/csv').send(csv);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`AERO waitlist running on http://localhost:${PORT}`));
