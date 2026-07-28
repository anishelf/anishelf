// ============================
// API Functions
// Handles communication with AniShelf backend
// ============================


const API_URL = "https://anishelf-api.onrender.com/api/anime/search";


// Search anime from backend

async function searchAnime(query) {

    try {

        const response = await fetch(
            `${API_URL}?q=${encodeURIComponent(query)}`
        );


        const data = await response.json();


        return data;


    } catch (error) {

        console.error("API Error:", error);


        return {
            success: false,
            results: []
        };

    }

}