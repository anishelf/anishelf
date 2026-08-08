console.log("app.js loaded");
// ========================================
// Homepage Search Redirect
// ========================================

const searchInput =
document.getElementById("searchInput");


if(searchInput){

    searchInput.addEventListener(
        "keydown",
        (event) => {


            if(event.key === "Enter"){

                const query =
                searchInput.value.trim();


                if(!query) return;


                window.location.href =
                `search.html?q=${encodeURIComponent(query)}`;

            }

        }
    );

}
// ============================
// Load homepage content
// ============================

async function loadTrendingAnime() {

    const data = await getTrendingAnime();


    if (data.success) {

        displayAnime(
            data.results,
            "trendingContainer");

    }

}
// ============================
// Load featured anime
// ============================




async function loadNewReleases() {
    const newData =
    await getNewReleases();
    
    displayAnime(
        newData.results,
        "newContainer"
    );
}

async function loadTopRated(){
    
    const data =
    await getTopRatedAnime();
    
    displayAnime(
        data.results,
        "topRatedContainer"
    );
    
}


async function loadMovies(){
    
    const data =
    await getMovies();
    
    displayAnime(
        data.results,
        "moviesContainer"
    );
    
}


async function loadHorror(){
    
    const data =
    await getHorrorAnime();
    
    displayAnime(
        data.results,
        "horrorContainer"
    );
    
}


async function loadUpcoming(){
    
    const data =
    await getUpcomingAnime();
    
    displayAnime(
        data.results,
        "upcomingContainer"
    );
    
}

// Run when page loads
loadHeroCarousel();
loadTrendingAnime();
loadNewReleases();
loadTopRated();
loadMovies();
loadHorror();
loadUpcoming();