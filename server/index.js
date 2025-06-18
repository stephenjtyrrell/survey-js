// Simple Express backend for survey responses
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;
const RESPONSES_FILE = path.join(__dirname, 'responses.json');

app.use(cors());
app.use(express.json());

function generateId() {
  return (
    Date.now().toString(36) + Math.random().toString(36).substr(2, 9)
  );
}

// POST endpoint to receive survey responses
app.post('/api/response', (req, res) => {
  const response = req.body;
  let responses = [];
  if (fs.existsSync(RESPONSES_FILE)) {
    responses = JSON.parse(fs.readFileSync(RESPONSES_FILE));
  }
  const id = generateId();
  responses.push({ id, response, date: new Date().toISOString() });
  fs.writeFileSync(RESPONSES_FILE, JSON.stringify(responses, null, 2));
  res.status(201).json({ message: 'Response saved', id });
});

// (Optional) GET endpoint to view all responses
app.get('/api/response', (req, res) => {
  if (fs.existsSync(RESPONSES_FILE)) {
    const responses = JSON.parse(fs.readFileSync(RESPONSES_FILE));
    res.json(responses);
  } else {
    res.json([]);
  }
});

// PUT endpoint to update a response by id
app.put('/api/response/:id', (req, res) => {
  const id = req.params.id;
  let responses = [];
  if (fs.existsSync(RESPONSES_FILE)) {
    responses = JSON.parse(fs.readFileSync(RESPONSES_FILE));
  }
  const idx = responses.findIndex(r => r.id === id);
  if (idx === -1) {
    return res.status(404).json({ error: 'Response not found' });
  }
  responses[idx].response = req.body;
  responses[idx].date = new Date().toISOString();
  fs.writeFileSync(RESPONSES_FILE, JSON.stringify(responses, null, 2));
  res.json({ message: 'Response updated' });
});

// Serve the responses.html page
app.use('/responses', express.static(path.join(__dirname, 'responses.html')));

app.listen(PORT, () => {
  console.log(`Survey backend running on port ${PORT}`);
});
