function createAnimeCard(anime){

    return `

    <div class="anime-card"
    onclick="openAnime(${anime.id})">


        <img
        src="${anime.image}"
        alt="${anime.title}">


        <div class="card-content">




            <div class="card-title-row">

                <h3>
                    ${anime.title}
                </h3>

                <div class="card-menu-wrapper">

                    <button
                        class="card-menu"
                        onclick="
                        event.stopPropagation();
                        toggleCardMenu(event)">
                        ⋮
                    </button>

                    <div
                        class="card-dropdown"
                        onclick="event.stopPropagation()">

                        <button
                            class="dropdown-item add-list-btn"
                            data-id="${anime.id}"
                            data-title="${anime.title}"
                            data-image="${anime.image}">

                            ➕ Add To List

                        </button>

                        <button
                            class="dropdown-item share-btn"
                            data-id="${anime.id}"
                            data-title="${anime.title}">

                            🔗 Share

                        </button>

                    </div>

                </div>

            </div>
           
            <div class="card-badges">


                <span class="card-rating">

                    ⭐ ${
                    anime.score
                    ? (anime.score/10).toFixed(1)
                    : "N/A"
                    }

                </span>



                <span class="card-badge">

                    ${anime.format || "TV"}

                </span>



                <span class="card-badge">

                    ${anime.year || "----"}

                </span>


            </div>


        </div>


    </div>

    `;

}

//==================================
//create libray cards
//==================================
function createLibraryAnimeCard(
    anime,
    listId
){

    return `

        <div
            class="library-anime-card"
        >

            <img
                src="${anime.image}"
                alt="${anime.title}"
            >


            <div
                class="library-anime-content"
            >

                <div
                    class="library-anime-title-row"
                >

                    <h3>
                        ${anime.title}
                    </h3>


                    <button
                        class="library-anime-menu"
                        data-anime-id="${anime.id}"
                        data-list-id="${listId}"
                    >

                        ⋮

                    </button>

                </div>


            </div>

        </div>

    `;

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

function toggleCardMenu(event){

    event.stopPropagation();
    event.preventDefault();

    const button =
        event.currentTarget;

    const card =
        button.closest(".anime-card");

    const dropdown =
        card.querySelector(".card-dropdown");


    // Close other menus
    document
        .querySelectorAll(".card-dropdown")
        .forEach(menu => {

            if(menu !== dropdown){

                menu.classList.remove("active");

            }

        });


    // Toggle current menu
    dropdown.classList.toggle("active");


    if(!dropdown.classList.contains("active")){

        return;

    }


    // Get button position
    const rect =
        button.getBoundingClientRect();


    // Position dropdown
    dropdown.style.position = "fixed";

    dropdown.style.top =
        `${rect.bottom + 6}px`;

    dropdown.style.left =
        `${rect.right - 170}px`;

}


// ========================================
// CLOSE WHEN CLICKING OUTSIDE
// ========================================

document.addEventListener(
    "click",
    function(event){

        // If click is inside a dropdown,
        // don't close it here.
        if(
            event.target.closest(".card-dropdown")
        ){

            return;

        }


        // If click is on a menu button,
        // toggleCardMenu() handles it.
        if(
            event.target.closest(".card-menu")
        ){

            return;

        }


        // Otherwise close all menus
        document
            .querySelectorAll(".card-dropdown")
            .forEach(menu => {

                menu.classList.remove("active");

            });

    }
);


// ========================================
// CLOSE AFTER CLICKING DROPDOWN OPTION
// ========================================

document.addEventListener(
    "click",
    function(event){

        const option =
            event.target.closest(
                ".card-dropdown .dropdown-item"
            );


        if(!option){

            return;

        }


        const dropdown =
            option.closest(".card-dropdown");


        if(dropdown){

            dropdown.classList.remove("active");

        }

    }
);

console.log("animeCard.js loaded");