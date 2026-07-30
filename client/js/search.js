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


    if(!query) return;



    searchInput.value = query;



    const data =
    await searchAnime(query);



    if(data.success){


        displayAnime(
            data.results,
            "animeContainer"
        );


    }


}




// Button click

searchBtn.addEventListener("click", ()=>{


    const query =
    searchInput.value.trim();


    performSearch(query);


});




// Enter key

searchInput.addEventListener("keydown",(event)=>{


    if(event.key === "Enter"){


        performSearch(
            searchInput.value.trim()
        );


    }


});




// Auto load from homepage

if(urlQuery){


    performSearch(urlQuery);


}