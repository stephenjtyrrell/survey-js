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

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../public')));

// Fallback: serve index.html for any non-API route (for Angular routing)
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

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
    if (err) {
      console.error('Error inserting response:', err);
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Response saved', id });
  });
});

// GET: All responses
app.get('/api/response', (req, res) => {
  db.all('SELECT * FROM responses', [], (err, rows) => {
    if (err) {
      console.error('Error fetching responses:', err);
      return res.status(500).json({ error: err.message });
    }
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
    if (err) {
      console.error('Error updating response:', err);
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      console.warn('Response not found for update:', id);
      return res.status(404).json({ error: 'Response not found' });
    }
    res.json({ message: 'Response updated' });
  });
});

// DELETE: Remove a response by id
app.delete('/api/response/:id', (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM responses WHERE id = ?', [id], function(err) {
    if (err) {
      console.error('Error deleting response:', err);
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      console.warn('Response not found for delete:', id);
      return res.status(404).json({ error: 'Response not found' });
    }
    res.json({ message: 'Response deleted' });
  });
});

// Log all incoming requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`, req.body || '');
  next();
});

// Add error handler for JSON parsing
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error('Bad JSON:', err);
    return res.status(400).json({ error: 'Invalid JSON' });
  }
  next(err);
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// (Optional) Migration utility: run migrate-to-sqlite.js if you need to import old JSON data

if (require.main === module) {
  app.listen(PORT, () => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`Survey backend (SQLite) running on port ${PORT}`);
    }
  });
}

module.exports = app;
