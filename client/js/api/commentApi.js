const COMMENT_URL =
    "https://ani-shelf.com/api/comments";


// ========================================
// Get comments for anime
// ========================================

async function getAnimeComments(animeId){

    const response =
        await fetch(
            `${COMMENT_URL}/anime/${animeId}`
        );


    const data =
        await response.json();


    return data;

}



// ========================================
// Create comment
// ========================================

async function createAnimeComment(
    animeId,
    content
){

    const response =
        await fetch(
            `${COMMENT_URL}/anime/${animeId}`,
            {

                method:"POST",

                credentials:"include",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify({

                    content

                })

            }
        );


    const data =
        await response.json();


    if(!response.ok){

        throw new Error(

            data.message ||
            "Failed to create comment"

        );

    }


    return data;

}



// ========================================
// Delete comment
// ========================================

async function deleteAnimeComment(
    commentId
){

    const response =
        await fetch(
            `${COMMENT_URL}/${commentId}`,
            {

                method:"DELETE",

                credentials:"include"

            }
        );


    const data =
        await response.json();


    if(!response.ok){

        throw new Error(

            data.message ||
            "Failed to delete comment"

        );

    }


    return data;

}
window.getAnimeComments =
    getAnimeComments;

window.createAnimeComment =
    createAnimeComment;

window.deleteAnimeComment =
    deleteAnimeComment;
