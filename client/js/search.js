// ========================================
// AniShelf Search Page
// ========================================


const searchInput =
document.getElementById("searchInput");


const searchBtn =
document.getElementById("searchBtn");



// Get query from URL

const params =
new URLSearchParams(window.location.search);


const urlQuery =
params.get("q");




// Search function

async function performSearch(query){

    if(!query){

        loadDiscoverAnime();

        return;

    }

    const data =
    await searchAnime(query);

    if(data.success){

        displayAnime(
            data.results,
            "animeContainer"
        );

        document.getElementById(
            "resultsTitle"
        ).textContent =
        `🔎 ${data.results.length} Results`;

    }

}

let searchTimeout;

searchInput.addEventListener(
    "input",
    () => {

        clearTimeout(
            searchTimeout
        );

        searchTimeout =
        setTimeout(() => {

            performSearch(
                searchInput.value.trim()
            );

        },300);

    }
);


if(urlQuery){

    performSearch(urlQuery);

}else{

    loadDiscoverAnime();

}

async function loadDiscoverAnime(){

    const data =
    await getTrendingAnime();

    if(data.success){

        displayAnime(
            data.results,
            "animeContainer"
        );

        document.getElementById(
            "resultsTitle"
        ).textContent =
        "🔥 Discover Anime";

    }

}