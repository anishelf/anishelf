const express =
require("express");


const router =
express.Router();


const verifyToken =
require("../middleware/authMiddleware");


const {
    getLists,
    createList
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

module.exports =
router;