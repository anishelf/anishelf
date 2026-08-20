const {

    getCommentsByAnime,
    createComment,
    getCommentById,
    deleteComment

} = require("../models/commentModel");



// ========================================
// Get comments
// ========================================

const getAnimeComments = async(req,res) => {

    try{

        const animeId =
            req.params.animeId;


        const comments =
            await getCommentsByAnime(
                animeId
            );


        res.json({

            success:true,

            comments

        });


    }catch(error){

        console.error(
            "GET COMMENTS ERROR:",
            error
        );


        res.status(500).json({

            success:false,

            message:
                "Failed to load comments"

        });

    }

};



// ========================================
// Create comment
// ========================================

const createAnimeComment = async(req,res) => {

    try{

        const animeId =
            req.params.animeId;


        const {
            content
        } = req.body;


        // ========================================
        // Validate comment
        // ========================================

        if(
            !content ||
            !content.trim()
        ){

            return res.status(400).json({

                success:false,

                message:
                    "Comment cannot be empty"

            });

        }


        // ========================================
        // Create comment
        // ========================================

        const comment =
            await createComment(

                req.user.id,

                animeId,

                content.trim()

            );


        // ========================================
        // Get full comment information
        // Includes username + profile image
        // ========================================

        const comments =
            await getCommentsByAnime(
                animeId
            );


        const newComment =
            comments.find(

                item =>
                    item.id === comment.id

            );


        // ========================================
        // Return created comment
        // ========================================

        res.status(201).json({

            success:true,

            comment:
                newComment

        });


    }catch(error){

        console.error(
            "CREATE COMMENT ERROR:",
            error
        );


        res.status(500).json({

            success:false,

            message:
                "Failed to create comment"

        });

    }

};



// ========================================
// Delete comment
// ========================================

const removeComment = async(req,res) => {

    try{

        const commentId =
            req.params.commentId;


        const comment =
            await getCommentById(
                commentId
            );


        if(!comment){

            return res.status(404).json({

                success:false,

                message:
                    "Comment not found"

            });

        }


        // Only owner can delete

        if(
            comment.user_id !==
            req.user.id
        ){

            return res.status(403).json({

                success:false,

                message:
                    "You cannot delete this comment"

            });

        }


        await deleteComment(
            commentId
        );


        res.json({

            success:true,

            message:
                "Comment deleted"

        });


    }catch(error){

        console.error(
            "DELETE COMMENT ERROR:",
            error
        );


        res.status(500).json({

            success:false,

            message:
                "Failed to delete comment"

        });

    }

};



module.exports = {

    getAnimeComments,
    createAnimeComment,
    removeComment

};