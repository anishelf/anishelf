const express = require("express");
const { 
    searchAnime,
    getTrendingAnime
 } = require("../controllers/animeController");

const router = express.Router();

router.get("/search", searchAnime);
router.get("/trending", getTrendingAnime);

module.exports = router;