// ============================
// API Functions
// Handles communication with AniShelf backend
// ============================


const API_BASE_URL = "https://anishelf-api.onrender.com/api/anime";


// Search anime from backend

async function searchAnime(query) {

    try {

        const response = await fetch(
            `${API_BASE_URL}/search?q=${encodeURIComponent(query)}`
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


// ============================
// Get trending anime
// ============================

async function getTrendingAnime() {

    try {

        const response = await fetch(
            `${API_BASE_URL}/trending`
        );


        const data = await response.json();


        return data;


    } catch (error) {

        console.error("Trending API Error:", error);


        return {
            success: false,
            results: []
        };

    }

}

// ============================
// Get featured anime
// ============================

async function getFeaturedAnime() {

    try {

        const response = await fetch(
            `${API_BASE_URL}/featured`
        );


        const data = await response.json();


        return data;


    } catch(error) {

        console.error(
            "Featured API Error:",
            error
        );


        return {
            success: false,
            result: null
        };

    }

}

async function getNewReleases(){

    const response =
    await fetch(
        `${API_BASE_URL}/new-releases`
    );

    return await response.json();

}

async function getTopRatedAnime(){

    const response =
    await fetch(
        `${API_BASE_URL}/top-rated`
    );

    return await response.json();

}


async function getMovies(){

    const response =
    await fetch(
        `${API_BASE_URL}/movies`
    );

    return await response.json();

}


async function getHorrorAnime(){

    const response =
    await fetch(
        `${API_BASE_URL}/horror`
    );

    return await response.json();

}


async function getUpcomingAnime(){

    const response =
    await fetch(
        `${API_BASE_URL}/upcoming`
    );

    return await response.json();

}

