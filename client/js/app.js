// ========================================
// Homepage Search Redirect
// ========================================

const searchBtn =
document.getElementById("searchBtn");


const searchInput =
document.getElementById("searchInput");



searchBtn.addEventListener("click", () => {


    const query =
    searchInput.value.trim();



    if(!query) return;



    window.location.href =
    `search.html?q=${encodeURIComponent(query)}`;


});



searchInput.addEventListener("keydown", (event)=>{


    if(event.key !== "Enter") return;



    const query =
    searchInput.value.trim();



    if(!query) return;



    window.location.href =
    `search.html?q=${encodeURIComponent(query)}`;


});
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

async function loadFeaturedAnime() {

    const data = await getFeaturedAnime();


    if(data.success) {

        displayFeaturedAnime(
            data.result
        );

    }

}



// Run when page loads

loadFeaturedAnime();
loadTrendingAnime();