const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('../db'); 

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

//  GET all job applications
app.get('/api/applications', (req, res) => {
  db.query('SELECT * FROM applications', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// POST new job application
app.post('/api/applications', (req, res) => {
  const { company, position, location, status, dateApplied } = req.body;
  const query = `
    INSERT INTO applications (company, position, location, status, dateApplied)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.query(query, [company, position, location, status, dateApplied], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ id: result.insertId, ...req.body });
  });
});

//  PUT (edit) application by ID
app.put('/api/applications/:id', (req, res) => {
  const { company, position, location, status, dateApplied } = req.body;
  const { id } = req.params;
  const query = `
    UPDATE applications SET company=?, position=?, location=?, status=?, dateApplied=? WHERE id=?
  `;
  db.query(query, [company, position, location, status, dateApplied, id], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});

//  DELETE application by ID
app.delete('/api/applications/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM applications WHERE id=?', [id], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
