const express = require("express");
const router = express.Router();


const verifyToken = require("../middleware/authMiddleware");


const {

    getAnimeComments,
    createAnimeComment,
    removeComment

} =
require("../controllers/commentController");



// ========================================
// Get comments
// ========================================

router.get(

    "/anime/:animeId",

    getAnimeComments

);



// ========================================
// Create comment
// ========================================

router.post(

    "/anime/:animeId",

    verifyToken,

    createAnimeComment

);



// ========================================
// Delete comment
// ========================================

router.delete(

    "/:commentId",

    verifyToken,

    removeComment

);



module.exports =
    router;