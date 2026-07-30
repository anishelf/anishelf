const express = require("express");
const { 
    searchAnime,
    getTrendingAnime,
    getFeaturedAnime,
    getAnimeById,
    getNewReleases
 } = require("../controllers/animeController");

const router = express.Router();

router.get("/search", searchAnime);
router.get("/trending", getTrendingAnime);
router.get("/featured", getFeaturedAnime);
router.get("/new-releases", getNewReleases);
router.get("/:id", getAnimeById);

module.exports = router;