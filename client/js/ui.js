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

            <div class="anime-card">


                <img 
                    src="${anime.image}" 
                    alt="${anime.title}"
                >


                <div class="card-content">


                    <h3>
                        ${anime.title}
                    </h3>


                    <div class="card-info">

                        <span>
                            ${anime.year ?? "Unknown"}
                        </span>


                        <span>
                            ${anime.genres?.[0] ?? "Anime"}
                        </span>

                    </div>


                    <span class="card-rating">

                        ⭐ ${anime.score ?? "N/A"}

                    </span>


                </div>


            </div>

        `;


    });

}