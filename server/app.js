// ===============================
// Dependencies
// External packages and libraries
// ===============================

const express = require("express");
const cors = require("cors");


// ===============================
// Internal files
// Routes, database, utilities
// ===============================

const pool = require("./db/db");
const animeRoutes = require("./routes/animeRoutes");


// ===============================
// App initialization
// Creates our Express application
// ===============================

const app = express();


// ===============================
// Middlewares
// Functions that run between the
// request and the response
// ===============================

// Allows requests from frontend
app.use(cors());

// Allows Express to read JSON request bodies
app.use(express.json());


// ===============================
// Routes
// API endpoints live here
// ===============================

// Anime-related endpoints
// Example:
// GET /api/anime/search?q=monster
app.use("/api/anime", animeRoutes);


// ===============================
// Database test
// Temporary check that Neon/PostgreSQL works
// Remove later or move into a health route
// ===============================

pool.query("SELECT NOW()")
    .then(result => {
        console.log("✅ Database connected:");
        console.log(result.rows[0]);
    })
    .catch(error => {
        console.error("❌ Database connection failed:");
        console.error(error);
        console.error("code:", error.code);
        console.error("message:", error.message);
    });


// ===============================
// Default route
// Basic API health check
// ===============================

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to AniShelf API"
    });
});


// ===============================
// Export app
// Used by server.js
// ===============================

module.exports = app;