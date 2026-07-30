// ============================
// UI Functions
// Handles displaying content on the page
// ============================


function displayAnime(animeList, containerId) {

  const container = document.getElementById(containerId);

    // Clear previous results

    container.innerHTML = "";


    // Create a card for every anime

    animeList.forEach(anime => {

        container.innerHTML += `

            <div class="anime-card" onclick="openAnime(${anime.id})">

                <img
                    src="${anime.image}"
                    alt="${anime.title}"
                >

                <div class="card-content">

                    <h3>${anime.title}</h3>

                    <div class="card-info">

                        <span>

                            ⭐ ${anime.score ? (anime.score / 10).toFixed(1) : "N/A"}

                        </span>

                    </div>

                    <div class="card-info">

                        <span>

                            ${anime.format || "TV"}

                        </span>

                        <span>

                            ${anime.episodes || "?"} Episodes

                        </span>

                    </div>

                    <div class="card-info">

                        <span>

                            ${anime.season || "Unknown"} ${anime.year || ""}

                        </span>

                    </div>

                    <div class="card-info">

                        <span>

                            ${(anime.genres || []).slice(0,2).join(" • ")}

                        </span>

                    </div>

                </div>

            </div>

        `;

    });

}
// ============================
// Display featured anime
// ============================

function displayFeaturedAnime(anime) {

    const hero = document.getElementById("featuredHero");
    
   
    hero.style.backgroundImage = `
    linear-gradient(
        rgba(5,5,15,0.85),
        rgba(5,5,15,0.95)
    ),
    url(${anime.image})
    `;


    document.getElementById("featuredTitle").textContent =
        anime.title;


    document.getElementById("featuredDescription").textContent =
        anime.description
        .replace(/<[^>]*>/g, "")
        .slice(0, 200) + "...";


    document.getElementById("featuredScore").textContent =
        `⭐ ${anime.score / 10}`;


    document.getElementById("featuredYear").textContent =
        anime.year;

}


// ============================
// Open Anime Details
// ============================

function openAnime(id){

    window.location.href =
        `anime.html?id=${id}`;

}