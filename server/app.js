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
const listRoutes =require("./routes/listRoutes");
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

    "https://anishelf-alpha.vercel.app",
    
    "https://ani-shelf.com"

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
app.use(
    "/api/lists",
    listRoutes
);
app.get(
    "/api/auth/profile",
    verifyToken,
    async(req,res)=>{

        try{


            const result =
            await pool.query(

                `
                SELECT
                    id,
                    username,
                    email,
                    profile_image
                FROM users
                WHERE id = $1
                `,

                [
                    req.user.id
                ]

            );



            if(
                result.rows.length === 0
            ){

                return res.status(404).json({

                    success:false,

                    message:
                    "User not found"

                });

            }



            res.json({

                success:true,

                user:{
                    id: result.row[0].id,
                    username: result.row[0].username,
                    email: result.row[0].email,
                    profileImage: result.row[0].profile_image
                }
                

            });



        }catch(error){


            console.error(error);



            res.status(500).json({

                success:false,

                message:
                "Server error"

            });

        }

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