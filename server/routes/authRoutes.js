const pool = require("../db/db");

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


// ========================================
// Save Profile Image
// ========================================

router.put(
    "/profile-image",
    verifyToken,
    async (req, res) => {

        try {

            const { profileImage } = req.body;

            if (!profileImage) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Profile image is required"

                });

            }


            const result =
                await pool.query(

                    `
                    UPDATE users
                    SET profile_image = $1
                    WHERE id = $2
                    RETURNING
                        id,
                        username,
                        email,
                        profile_image
                    `,

                    [
                        profileImage,
                        req.user.id
                    ]

                );


            if (
                result.rows.length === 0
            ) {

                return res.status(404).json({

                    success: false,

                    message:
                        "User not found"

                });

            }


            res.json({

                success: true,

                user: {

                    id:
                        result.rows[0].id,

                    username:
                        result.rows[0].username,

                    email:
                        result.rows[0].email,

                    profileImage:
                        result.rows[0].profile_image

                }

            });


        } catch (error) {

            console.error(
                "PROFILE IMAGE SAVE ERROR:",
                error
            );


            res.status(500).json({

                success: false,

                message:
                    "Failed to save profile image"

            });

        }

    }
);





module.exports = router;
