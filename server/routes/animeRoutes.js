const express = require("express");
const { 
    searchAnime,
    getTrendingAnime,
    getFeaturedAnime
 } = require("../controllers/animeController");

const router = express.Router();

router.get("/search", searchAnime);
router.get("/trending", getTrendingAnime);
router.get("/featured", getFeaturedAnime);

module.exports = router;