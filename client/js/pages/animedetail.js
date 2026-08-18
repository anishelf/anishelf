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

            <div class="anime-actions">

                <button class="anime-btn">

                    ▶ Trailer

                </button>

                <button class="anime-btn">

                    ➕ Add To List

                </button>

            </div>

        </div>
    </div>
    <section class="anime-content">

        <div class="content-left">

            ${anime.trailer?.site === "youtube" ? `

            <div class="info-panel">

                <h2>
                    Trailer
                </h2>

                <iframe
                src="https://www.youtube.com/embed/${anime.trailer.id}"
                allowfullscreen>
                </iframe>

            </div>

            ` : ""}


            <div class="info-panel">

                <h2>
                    Synopsis
                </h2>

                <p>

                    ${anime.description}

                </p>

            </div>

        </div>


        <div class="content-right">

            <div class="info-panel">

                <h2>
                    Information
                </h2>

                <div class="detail-row">

                    <span>Rating</span>

                    <span>
                    ⭐ ${(anime.score/10).toFixed(1)}
                    </span>

                </div>

                <div class="detail-row">

                    <span>Format</span>

                    <span>${anime.format}</span>

                </div>

                ${anime.format !== "MOVIE" ? `

                <div class="detail-row">

                    <span>Episodes</span>

                    <span>
                        ${anime.episodes || "Unknown"}
                    </span>

                </div>

                ` : ""}


                ${anime.format === "MOVIE" ? `

                <div class="detail-row">

                    <span>Duration</span>

                    <span>
                        ${anime.duration || "Unknown"} min
                    </span>

                </div>

                ` : ""}

                <div class="detail-row">

                    <span>Status</span>

                    <span>${anime.status}</span>

                </div>

                <div class="detail-row">

                    <span>Season</span>

                    <span>
                    ${anime.season}
                    </span>

                </div>

                <div class="detail-row">
                    <span>Released</span>
                    <span>${anime.year}</span>
                </div>



                <div class="detail-row">

                    <span>Studio</span>

                    <span>${anime.studio}</span>

                </div>

                <div class="genre-list">

                    ${anime.genres.map(genre => `
                        <span class="genre-badge">
                            ${genre}
                        </span>
                    `).join("")}

                </div>

            </div>

        </div>

    </section>



    <section class="bottom-panel">

        <div class="bottom-tabs">

            <button
            class="tab-btn active"
            onclick="showTab('recommendations', this)">

                Related Anime

            </button>

            <button
            class="tab-btn"
            onclick="showTab('comments', this)">

                Comments

            </button>

        </div>


        <div
        id="recommendationsTab"
        class="tab-content">

            <div class="anime-container">

                ${anime.recommendations
                .map(item => createAnimeCard(item))
                .join("")}

            </div>

        </div>
        <div
        id="commentsTab"
        class="tab-content hidden">


            <div class="comments-box">


                <h2>
                    💬 Community Comments
                </h2>



                <!-- Existing comments -->

                <div class="comment-list">


                    <div class="comment-card">


                        <div class="comment-header">

                            <strong>
                                Guest
                            </strong>


                            <span>
                                Just now
                            </span>

                        </div>


                        <p>
                            No comments yet. Be the first to share your thoughts!
                        </p>


                    </div>


                </div>



                <!-- Comment input -->

                <div class="comment-composer">


                    <textarea
                        id="commentInput"
                        placeholder="Share your thoughts about this anime...">
                    </textarea>



                    <button
                        class="anime-btn"
                        id="commentBtn">

                        Post Comment

                    </button>


                </div>


            </div>


        </div>

    </section>
    `;
    // ========================================
    // Anime Actions
    // ========================================

    const trailerButton =
        document.getElementById("watchTrailerBtn");

    const addToListButton =
        document.getElementById("addToListBtn");


    // ========================================
    // Watch Trailer
    // ========================================

    if(trailerButton){

        trailerButton.addEventListener(
            "click",
            () => {

                if(
                    anime.trailer?.site === "youtube" &&
                    anime.trailer?.id
                ){

                    const trailerUrl =
                        `https://www.youtube.com/watch?v=${anime.trailer.id}`;

                    window.open(
                        trailerUrl,
                        "_blank"
                    );

                    return;

                }


                alert(
                    "Trailer not available for this anime."
                );

            }
        );

    }


    // ========================================
    // Add To List
    // ========================================

    if(addToListButton){

        addToListButton.addEventListener(
            "click",
            async () => {

                try{

                    await openAddListModal(

                        anime.id,

                        anime.title,

                        anime.image

                    );

                }catch(error){

                    console.error(
                        "ADD TO LIST ERROR:",
                        error
                    );

                }

            }
        );

    }

}

function showTab(tab, button){


    document
    .querySelectorAll(".tab-content")
    .forEach(content=>{

        content.classList.add("hidden");

    });



    document
    .querySelectorAll(".tab-btn")
    .forEach(btn=>{

        btn.classList.remove("active");

    });



    document
    .getElementById(tab + "Tab")
    .classList.remove("hidden");


    button.classList.add("active");

}

loadAnimeDetails();