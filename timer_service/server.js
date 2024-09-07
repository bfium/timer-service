/* eslint-disable no-param-reassign */
import express from 'express';
import bodyParser from 'body-parser';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = process.env.PORT || 3003;

// Helper to get the current directory (because __dirname is not available in ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Data source
const DATA_FILE = path.join(__dirname, 'db.json');

// Set up middleware
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Disable caching for all requests
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

// API endpoint to get timers
app.get('/api/timers', async (req, res) => {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    const timers = JSON.parse(data).timers;
    res.json(timers);
  } catch (err) {
    console.error('Error reading or parsing the data file:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the timer_service
app.listen(port, () => {
  console.log(`Server running at: http://localhost:${port}/`); // eslint-disable-line no-console
});