import express from "express";
import path from "path";
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import Router from "./router.js";
import Connection from "./connection.js";

dotenv.config();
const JWT_KEY = process.env.JWT_KEY;


// Recreate __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Serve static files from 'cliendside' folder
// Serve static files (HTML, CSS, JS)
app.use(express.static(path.resolve(__dirname, '../cliendside')));

// Send index.html for root path
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../cliendside', 'index.html'));
});


// Parse JSON with large payloads
app.use(express.json({ limit: '50mb' }));

// API routes
app.use('/api', Router);

// Send index.html for root path
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'cliendside', 'index.html'));
});

// Connect to DB and start server
Connection().then(() => {
  const PORT = process.env.PORT;
  app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
  });
}).catch((error) => {
  console.log("Database connection failed:", error);
});
