// ========================================
// AniShelf
// File: anime.js
// Purpose: Anime details page logic
// ========================================



const detailsContainer =
    document.getElementById("animeDetails");



// Get anime id from URL

const params =
    new URLSearchParams(window.location.search);


const animeId =
    params.get("id");



// Load anime details

async function loadAnimeDetails(){


    if(!animeId){

        detailsContainer.innerHTML = `
            <h2>
                Anime not found
            </h2>
        `;

        return;

    }


    const response = await fetch(
        `https://anishelf-api.onrender.com/api/anime/${animeId}`
    );


    const data =
        await response.json();



    if(data.success){

        displayAnimeDetails(
            data.result
        );

    }


}



// Display anime

function displayAnimeDetails(anime){


    detailsContainer.innerHTML = `

    <div class="anime-banner"
        style="
        background-image:
        linear-gradient(
        rgba(5,5,15,.8),
        rgba(5,5,15,1)
        ),
        url(${anime.banner});
        ">


    </div>



    <div class="anime-main">


    <img

    class="anime-poster"

    src="${anime.image}"

    alt="${anime.title}"

    >



    <div class="anime-info">


    <h1>
    ${anime.title}
    </h1>


    <div class="anime-tags">

    <span>
    ⭐ ${(anime.score / 10).toFixed(1)}
    </span>


    <span>
    ${anime.format}
    </span>


    <span>
    ${anime.episodes || "?"} Episodes
    </span>


    </div>


    <p>

    ${anime.genres.join(" • ")}

    </p>


    </div>


    </div>


    ${anime.trailer?.site === "youtube" ? `

    <section class="anime-trailer">

    <h2>
    Trailer
    </h2>

    <iframe

    src="https://www.youtube.com/embed/${anime.trailer.id}"

    allowfullscreen>

    </iframe>

    </section>

    ` : ""}

    <section class="anime-description">


        <h2>
        Synopsis
        </h2>


        <p>

        ${anime.description}

        </p>


    </section>
    

    ${anime.recommendations?.length ? `

        <section class="recommendations">

        <h2>
        You Might Also Like
        </h2>


        <div class="anime-container">


        ${anime.recommendations.map(item => `


        <div class="anime-card"
        onclick="openAnime(${item.id})">


        <img

        src="${item.image}"

        alt="${item.title}"

        >


        <div class="card-content">


        <h3>
        ${item.title}
        </h3>


        <p>

        ⭐ ${item.score ? (item.score/10).toFixed(1) : "N/A"}

        </p>


        </div>


        </div>


        `).join("")}


        </div>

        </section>

        ` : ""
    }





    `;

}


loadAnimeDetails();