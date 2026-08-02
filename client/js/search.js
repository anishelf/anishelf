
// ========================================
// AniShelf Search Page
// ========================================
const genreFilter =
document.getElementById("genreFilter");


const formatFilter =
document.getElementById("formatFilter");


const yearFilter =
document.getElementById("yearFilter");


const seasonFilter =
document.getElementById("seasonFilter");


const sortFilter =
document.getElementById("sortFilter");


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

        clearTimeout(searchTimeout);

        searchTimeout =
        setTimeout(() => {

            runSearch();

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

async function runSearch(){

    const query =
    searchInput.value.trim();


    const params =
    new URLSearchParams();


    if(query)
        params.append("q",query);


    if(genreFilter.value)
        params.append(
            "genre",
            genreFilter.value
        );


    if(formatFilter.value)
        params.append(
            "format",
            formatFilter.value
        );


    if(yearFilter.value)
        params.append(
            "year",
            yearFilter.value
        );


    if(seasonFilter.value)
        params.append(
            "season",
            seasonFilter.value
        );


    if(sortFilter.value)
        params.append(
            "sort",
            sortFilter.value
        );


    if(query || params.toString()){


        const data =await searchAnimeWithFilters(params);


        if(data.success){
            displayAnime(
                data.results,
                "animeContainer"
            );

        }


    }else{


        loadDiscoverAnime();


    }

}

[
    genreFilter,
    formatFilter,
    yearFilter,
    seasonFilter,
    sortFilter

].forEach(filter => {

    filter.addEventListener(
        "change",
        runSearch
    );

});
