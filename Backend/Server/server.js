const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config({ path: __dirname + '/../.env' });


const app = express();
app.use(cors());
app.use(express.json());

// MySQL Connection with SSL (Required for PlanetScale)
const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT || 19259, 
  connectTimeout: 10000, 
});


// Connect to MySQL
db.connect(err => {
  if (err) {
    console.error('❌ Database connection error:', err);
  } else {
    console.log('✅ Connected to MySQL database');
  }
});

// GET trip by ID
app.get('/api/trips/:tripId', (req, res) => {
  const tripId = req.params.tripId;
  console.log("Fetching trip with ID:", tripId);

  const query = "SELECT * FROM ai_tripss WHERE id = ?";
  db.query(query, [tripId], (err, result) => {
    if (err) {
      console.error("❌ Error fetching trip:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Trip not found" });
    }
    res.json(result[0]);
  });
});

// POST: Add a Trip
app.post("/api/trips", (req, res) => {
    const { userSelection, tripData, email, id } = req.body;

    const query = "INSERT INTO ai_tripss (id, userSelection, tripData, email) VALUES (?, ?, ?, ?)";

    db.query(query, [id, JSON.stringify(userSelection), JSON.stringify(tripData), email], (err, result) => {
        if (err) {
            console.error("❌ Error saving trip:", err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
        res.status(201).json({ message: "✅ Trip saved successfully", id });
    });
});

// Start Server
const PORT =  process.env.MYSQL_PORT;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
