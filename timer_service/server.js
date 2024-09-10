import express from 'express';
import bodyParser from 'body-parser';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
const app = express();
const port = process.env.API_PORT || 3003;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE = path.join(__dirname, 'db.json');

// Enable CORS for specific origin (customize as needed)
app.use(cors({ origin: `http://localhost:${port}` }));

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

// Load OpenAPI specification
const openapiSpec = YAML.load(path.join(__dirname, './oas.yaml'));

// Serve the OpenAPI documentation using Swagger UI
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiSpec));
/*
// Middleware to validate requests based on OpenAPI spec
app.use(
  OpenApiValidator({
    apiSpec: path.join(__dirname, './oas.yaml'),
    validateRequests: true,    // Automatically validate requests against the spec
    validateResponses: false,  // Optional: Validate responses
  })
);*/

// GET /api/timers
app.get('/api/timers', async (req, res) => {
  try {
    const timers = await readTimers();
    res.json(timers);
  } catch (err) {
    console.error('Error reading or parsing the data file:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST /api/timers
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

// PUT /api/timers/:id
app.put('/api/timers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTimer = req.body;
    let timers = await readTimers();

    const timerIndex = timers.findIndex((timer) => timer.id === id);
    if (timerIndex === -1) {
      return res.status(404).json({ error: 'Timer not found' });
    }

    timers[timerIndex] = { ...timers[timerIndex], ...updatedTimer };  // Spread operator for non-mutating update
    await writeTimers(timers);
    res.json(timers[timerIndex]);
  } catch (err) {
    console.error('Error updating the timer:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE /api/timers/:id
app.delete('/api/timers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let timers = await readTimers();

    const newTimers = timers.filter((timer) => timer.id !== id);
    if (newTimers.length === timers.length) {
      return res.status(404).json({ error: 'Timer not found' });
    }

    await writeTimers(newTimers);
    res.status(204).end();  // 204 No Content indicates success without a response body
  } catch (err) {
    console.error('Error deleting the timer:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at: http://localhost:${port}/`);  // eslint-disable-line no-console
});