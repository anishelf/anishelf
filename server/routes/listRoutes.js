const express =
require("express");


const router =
express.Router();


const verifyToken =
require("../middleware/authMiddleware");


const {
    getLists,
    createList,
    getList,
    addAnimeToList,
    getListAnime,
    removeAnimeFromList
} = require(
    "../controllers/listController"
);



router.get(
    "/",
    verifyToken,
    getLists
);

router.post(
    "/",
    verifyToken,
    createList
);


router.get(
    "/:id",
    verifyToken,
    getList
);

router.post(
    "/:id/anime",
    verifyToken,
    addAnimeToList
);



router.get(
    "/:id/anime",
    verifyToken,
    getListAnime
);


router.delete(
    "/:id/anime/:animeId",
    verifyToken,
    removeAnimeFromList
);


module.exports =
router;