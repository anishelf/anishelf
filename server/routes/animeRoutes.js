const express = require("express");
const { searchAnime } = require("../controllers/animeController");

const router = express.Router();

router.get("/search", searchAnime);

module.exports = router;