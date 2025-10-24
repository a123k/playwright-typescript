const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Serve static files from the hash folder
app.use(express.static(path.join(__dirname)));

// Optional: Redirect root to index.html explicitly
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/hashinfo', (req, res) => {
  res.json({ info: 'This is some sample API data for ZAP to scan.' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

