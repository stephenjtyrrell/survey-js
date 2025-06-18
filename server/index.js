// SQLite Express backend for survey responses
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const DB_PATH = path.join(__dirname, 'survey.db');

app.use(cors());
app.use(express.json());

// Initialize SQLite DB
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) throw err;
  db.run(`CREATE TABLE IF NOT EXISTS responses (
    id TEXT PRIMARY KEY,
    response TEXT NOT NULL,
    date TEXT NOT NULL
  )`);
});

function generateId() {
  return (
    Date.now().toString(36) + Math.random().toString(36).substr(2, 9)
  );
}

// POST: Add a new response
app.post('/api/response', (req, res) => {
  const id = generateId();
  const response = JSON.stringify(req.body);
  const date = new Date().toISOString();
  db.run('INSERT INTO responses (id, response, date) VALUES (?, ?, ?)', [id, response, date], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Response saved', id });
  });
});

// GET: All responses
app.get('/api/response', (req, res) => {
  db.all('SELECT * FROM responses', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    const responses = rows.map(r => ({ id: r.id, response: JSON.parse(r.response), date: r.date }));
    res.json(responses);
  });
});

// PUT: Update a response by id
app.put('/api/response/:id', (req, res) => {
  const id = req.params.id;
  const response = JSON.stringify(req.body);
  const date = new Date().toISOString();
  db.run('UPDATE responses SET response = ?, date = ? WHERE id = ?', [response, date, id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Response not found' });
    res.json({ message: 'Response updated' });
  });
});

// (Optional) Migration utility: run migrate-to-sqlite.js if you need to import old JSON data

app.listen(PORT, () => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`Survey backend (SQLite) running on port ${PORT}`);
  }
});
