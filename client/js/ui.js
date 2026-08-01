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


                <div class="card-image">


                    <img
                        src="${anime.image}"
                        alt="${anime.title}"
                    >


                    <span class="rating-badge">

                        ⭐ ${
                            anime.score
                            ? (anime.score / 10).toFixed(1)
                            : "N/A"
                        }

                    </span>


                </div>



                <div class="card-content">


                    <div class="card-title-row">


                        <h3>
                            ${anime.title}
                        </h3>


                        <button
                            class="card-menu"
                            onclick="toggleCardMenu(event, ${anime.id})">

                            ⋮

                        </button>
                        <div class="card-dropdown" id="menu-${anime.id}">

                            <button
                                onclick="addToList(${anime.id})">
                                 ➕Add to List
                            </button>

                        </div>
                    </div>


                    <div class="card-badges">


                        <span>
                            ${anime.format || "TV"}
                        </span>


                        <span>
                            ${anime.year || "N/A"}
                        </span>
                        <span>
                            ${(anime.genres || ["Anime"])[0]} 
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
// ============================
// menu configuration
// ============================

function toggleCardMenu(event,id){

    event.stopPropagation();

    const menu =
    document.getElementById(
        `menu-${id}`
    );

    if(!menu) return;

    document
    .querySelectorAll(".card-dropdown")
    .forEach(dropdown => {

        if(dropdown !== menu){

            dropdown.classList.remove(
                "active"
            );

        }

    });

    menu.classList.toggle(
        "active"
    );

}
function addToList(id){

    console.log(
        "Added anime:",
        id
    );


    alert(
        "Added to your list!"
    );

}
document.addEventListener(
    "click",
    () => {

        document
        .querySelectorAll(
            ".card-dropdown"
        )
        .forEach(menu => {

            menu.classList.remove(
                "active"
            );

        });

    }
);