const express = require("express");

const {
    register,
    login,
    logout
} = require("../controllers/authController");

const verifyToken =
    require("../middleware/authMiddleware");

const imagekit =
    require("../utils/imagekit");


const router =
    express.Router();


router.post(
    "/register",
    register
);


router.post(
    "/login",
    login
);


router.post(
    "/logout",
    logout
);


// ========================================
// ImageKit Upload Authentication
// ========================================

router.get(
    "/imagekit",
    verifyToken,
    async (req, res) => {

        try {

            const authenticationParameters =
                await imagekit.helper
                    .getAuthenticationParameters();


            res.json({

                success: true,

                ...authenticationParameters,

                publicKey:
                    process.env.IMAGEKIT_PUBLIC_KEY

            });


        } catch(error) {

            console.error(
                "IMAGEKIT AUTH ERROR:",
                error
            );


            res.status(500).json({

                success: false,

                message:
                    "Failed to generate ImageKit authentication"

            });

        }

    }
);


module.exports = router;
