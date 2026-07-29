const express = require("express");
const { 
    searchAnime,
    getTrendingAnime,
    getFeaturedAnime,
    getAnimeById
 } = require("../controllers/animeController");

const router = express.Router();

router.get("/search", searchAnime);
router.get("/trending", getTrendingAnime);
router.get("/featured", getFeaturedAnime);
router.get("/:id", getAnimeById);

module.exports = router;