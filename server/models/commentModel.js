const pool = require("../db/db");


// ========================================
// Get comments for an anime
// ========================================

const getCommentsByAnime = async(animeId) => {

    const result =
        await pool.query(

            `
            SELECT
                comments.id,
                comments.content,
                comments.created_at,

                users.id AS user_id,
                users.username,
                users.profile_image

            FROM comments

            JOIN users
                ON comments.user_id = users.id

            WHERE comments.anime_id = $1

            ORDER BY comments.created_at DESC
            `,

            [animeId]

        );

    return result.rows;

};



// ========================================
// Create comment
// ========================================

const createComment = async(
    userId,
    animeId,
    content
) => {

    const result =
        await pool.query(

            `
            INSERT INTO comments
            (
                user_id,
                anime_id,
                content
            )

            VALUES
            (
                $1,
                $2,
                $3
            )

            RETURNING *
            `,

            [
                userId,
                animeId,
                content
            ]

        );

    return result.rows[0];

};



// ========================================
// Get comment by ID
// ========================================

const getCommentById = async(commentId) => {

    const result =
        await pool.query(

            `
            SELECT *
            FROM comments
            WHERE id = $1
            `,

            [commentId]

        );

    return result.rows[0];

};



// ========================================
// Delete comment
// ========================================

const deleteComment = async(commentId) => {

    await pool.query(

        `
        DELETE FROM comments
        WHERE id = $1
        `,

        [commentId]

    );

};



module.exports = {

    getCommentsByAnime,
    createComment,
    getCommentById,
    deleteComment

};