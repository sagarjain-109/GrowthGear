# Gen AI Query Simulation API

## What is this?
This is a simple backend service that lets users ask business-related questions in normal language and get SQL-like queries with mock results. It's like having an AI assistant for data queries.

## What it does
- Converts simple questions into SQL-like queries.
- Gives fake (mock) answers based on predefined data.
- Explains how a query is processed.
- Checks if a query is valid.
- Uses API key authentication for security.

## Tech Used
- **Language:** Node.js
- **Framework:** Express.js
- **Database:** In-memory storage (fake data)

## How to Set It Up
### Things You Need
- Node.js (version 14 or later)
- npm (comes with Node.js)

### Steps to Install
1. Clone this project:
   ```sh
   git clone <your-repo-url>
   cd <repo-folder>
   ```
2. Install required packages:
   ```sh
   npm install
   ```
3. Create a `.env` file and add this line:
   ```sh
   API_KEY=test123
   ```
4. Start the server:
   ```sh
   npm start
   ```
   Your server will be running at `http://localhost:3000`.

## How to Use the API

### Authentication
Every request must have an API key in the headers:
```json
{
  "x-api-key": "test123"
}
```

### Endpoints

#### 1. Ask a Question
**URL:** `POST /query`

**Send this in the request body:**
```json
{
  "question": "total sales"
}
```
**Response you get:**
```json
{
  "question": "total sales",
  "sqlQuery": "SELECT SUM(amount) FROM sales;",
  "result": "$500,000"
}
```

#### 2. Get Query Explanation
**URL:** `POST /explain`

**Send this in the request body:**
```json
{
  "question": "customer count"
}
```
**Response you get:**
```json
{
  "question": "customer count",
  "sqlQuery": "SELECT COUNT(*) FROM customers;",
  "explanation": "This converts your question into an SQL query to get the required data."
}
```

#### 3. Check If a Query is Valid
**URL:** `POST /validate`

**Send this in the request body:**
```json
{
  "question": "top product"
}
```
**Response you get:**
```json
{
  "question": "top product",
  "valid": true,
  "message": "Query is valid and can be processed."
}
```

## How to Push This to GitHub
1. Ignore unnecessary files by creating a `.gitignore` file with this content:
   ```sh
   node_modules/
   .env
   ```
2. Run these commands:
   ```sh
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```
3. After cloning the repo, install dependencies with:
   ```sh
   npm install
   ```

## Deploying the API
You can deploy this on platforms like Render, Heroku, or Railway.

## Testing With Postman
1. Import the Postman collection (included in the repo).
2. Add your API key in the headers.
3. Try the endpoints and see responses.

## License
This project is open-source under the MIT License.

---

Now you're all set to use the Gen AI Query Simulation API! 🚀

