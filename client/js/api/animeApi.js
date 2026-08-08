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
// ============================
// Get new releases
// ============================


async function getNewReleases(){

    const response =
    await fetch(
        `${API_BASE_URL}/new-releases`
    );

    return await response.json();

}
// ============================
// Get top rated animes
// ============================


async function getTopRatedAnime(){

    const response =
    await fetch(
        `${API_BASE_URL}/top-rated`
    );

    return await response.json();

}
// ============================
// Get anime movies
// ============================

async function getMovies(){

    const response =
    await fetch(
        `${API_BASE_URL}/movies`
    );

    return await response.json();

}
// ============================
// Get horror anime
// ============================

async function getHorrorAnime(){

    const response =
    await fetch(
        `${API_BASE_URL}/horror`
    );

    return await response.json();

}
// ============================
// Get upcoming anime
// ============================


async function getUpcomingAnime(){

    const response =
    await fetch(
        `${API_BASE_URL}/upcoming`
    );

    return await response.json();

}

// ============================
// search anime with filters
// ============================
async function searchAnimeWithFilters(params){

    try {

        const response =
        await fetch(
            `https://anishelf-api.onrender.com/api/anime/search?${params}`
        );


        return await response.json();


    } catch(error){

        console.error(
            "Filter Search Error:",
            error
        );


        return {
            success:false,
            results:[]
        };

    }

}