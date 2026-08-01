const express = require("express");
const { 
    searchAnime,
    getTrendingAnime,
    getFeaturedAnime,
    getAnimeById,
    getNewReleases,
    getTopRatedAnime,
    getMovies,
    getHorrorAnime,
    getUpcomingAnime
 } = require("../controllers/animeController");

const router = express.Router();

router.get("/search", searchAnime);
router.get("/trending", getTrendingAnime);
router.get("/featured", getFeaturedAnime);
router.get("/new-releases", getNewReleases);
router.get("/top-rated", getTopRatedAnime);
router.get("/movies", getMovies);
router.get("/horror", getHorrorAnime);
router.get("/upcoming", getUpcomingAnime);
router.get("/:id", getAnimeById);

module.exports = router;