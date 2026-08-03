const express =
require("express");


const router =
express.Router();


const verifyToken =
require("../middleware/authMiddleware");


const {
    getLists,
    createList,
    getList
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

module.exports =
router;