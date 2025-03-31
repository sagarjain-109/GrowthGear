import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY || 'test123';

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

const mockData = {
  "total sales": "$500,000",
  "top product": "Laptop X200",
  "customer count": "1,200 customers",
};

const authenticate = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey || apiKey !== API_KEY) {
    return res.status(403).json({ error: 'Access denied. Invalid API key.' });
  }
  next();
};

const convertToSQL = (query) => {
  const lowerQuery = query.toLowerCase();
  if (lowerQuery.includes("total sales")) return "SELECT SUM(amount) FROM sales;";
  if (lowerQuery.includes("top product")) return "SELECT product_name FROM sales GROUP BY product_name ORDER BY SUM(amount) DESC LIMIT 1;";
  if (lowerQuery.includes("customer count")) return "SELECT COUNT(*) FROM customers;";
  return null;
};

app.post('/query', authenticate, (req, res) => {
  const { question } = req.body;
  if (!question) return res.status(400).json({ error: "Query cannot be empty" });
  
  const sqlQuery = convertToSQL(question);
  if (!sqlQuery) return res.status(400).json({ error: "Query not recognized" });
  
  res.json({
    question,
    sqlQuery,
    result: mockData[question.toLowerCase()] || "No relevant data available"
  });
});

app.post('/explain', authenticate, (req, res) => {
  const { question } = req.body;
  const sqlQuery = convertToSQL(question);
  if (!sqlQuery) return res.status(400).json({ error: "Unable to process query" });
  res.json({
    question,
    sqlQuery,
    explanation: "This query is translated into an SQL statement to fetch relevant data from the database."
  });
});

app.post('/validate', authenticate, (req, res) => {
  const { question } = req.body;
  const sqlQuery = convertToSQL(question);
  res.json({
    question,
    valid: sqlQuery ? true : false,
    message: sqlQuery ? "Query is valid and can be processed." : "Query is not supported."
  });
});

app.get('/', (req, res) => {
  res.send("Gen AI Query Simulation API is running.");
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
