// ===============================
// Dependencies
// External packages and libraries
// ===============================

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// ===============================
// Internal files
// Routes, database, utilities
// ===============================

const pool = require("./db/db");
const animeRoutes = require("./routes/animeRoutes");
const authRoutes = require("./routes/authRoutes");
const verifyToken = require("./middleware/authMiddleware");


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
const allowedOrigins = [

    "http://localhost:5500",

    "http://127.0.0.1:5500",

    "https://your-future-frontend-url.com"

];


app.use(cors({

    origin:function(origin,callback){

        if(!origin ||
        allowedOrigins.includes(origin)){

            callback(null,true);

        }else{

            callback(new Error("Not allowed"));

        }

    },

    credentials:true

}));

// Allows Express to read JSON request bodies
app.use(express.json());
app.use(cookieParser());

// ===============================
// Routes
// API endpoints live here
// ===============================

// Anime-related endpoints
// Example:
// GET /api/anime/search?q=monster
app.use("/api/anime", animeRoutes);
app.use(
    "/api/auth",
    authRoutes
);
app.get(
    "/api/auth/profile",
    verifyToken,
    (req,res)=>{

        res.json({

            success:true,

            user:req.user

        });

    }
);
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