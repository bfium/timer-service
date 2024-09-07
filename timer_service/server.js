/* eslint-disable no-param-reassign */
import express from 'express';
import bodyParser from 'body-parser';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors'; // Import the CORS package


const app = express();
const port = process.env.API_PORT || 3003;

// Helper to get the current directory (because __dirname is not available in ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE = path.join(__dirname, 'db.json');

// Enable CORS for all origins (you can restrict this to specific origins if necessary)
app.use(cors({ origin: 'http://localhost:3002' })); // Allow only this front-end origin

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

// Function to read timers from the file
const readTimers = async () => {
  const data = await fs.readFile(DATA_FILE, 'utf8');
  return JSON.parse(data).timers;
};

// Function to write timers to the file
const writeTimers = async (timers) => {
  const data = JSON.stringify({ timers }, null, 2);
  await fs.writeFile(DATA_FILE, data, 'utf8');
};


app.get('/api/timers', async (req, res) => {
  try {
    const timers = await readTimers();
    res.json(timers);
  } catch (err) {
    console.error('Error reading or parsing the data file:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/timers', async (req, res) => {
  try {
    const newTimer = req.body;
    const timers = await readTimers();
    timers.push(newTimer);
    await writeTimers(timers);
    res.status(201).json(newTimer);
  } catch (err) {
    console.error('Error writing to the data file:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.put('/api/timers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTimer = req.body;
    let timers = await readTimers();


    const timerIndex = timers.findIndex((timer) => timer.id === id);
    if (timerIndex === -1) {
      return res.status(404).json({ error: 'Timer not found' });
    }


    timers[timerIndex] = { ...timers[timerIndex], ...updatedTimer };
    await writeTimers(timers);
    res.json(timers[timerIndex]);
  } catch (err) {
    console.error('Error updating the timer:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.delete('/api/timers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let timers = await readTimers();

    const newTimers = timers.filter((timer) => timer.id !== id);
    if (newTimers.length === timers.length) {
      return res.status(404).json({ error: 'Timer not found' });
    }

    await writeTimers(newTimers);
    res.status(204).end(); // 204 No Content indicates success without a response body
  } catch (err) {
    console.error('Error deleting the timer:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(port, () => {
  console.log(`Server running at: http://localhost:${port}/`); // eslint-disable-line no-console
});