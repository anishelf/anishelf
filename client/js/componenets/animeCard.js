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


                <button
                class="card-menu"
                onclick="
                event.stopPropagation();
                toggleCardMenu(event)">
                    ⋮
                </button>


                <div class="card-dropdown" 
                onclick="event.stopPropagation()">


                    <button
                    class="dropdown-item add-list-btn"
                    data-id="${anime.id}"
                    data-title="${anime.title}"
                    data-image="${anime.image}"
                    >

                        ➕ Add To List

                    </button>



                    <button
                    class="dropdown-item share-btn"
                    data-id="${anime.id}"
                    data-title="${anime.title}"
                    >

                        🔗 Share

                    </button>


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


    const card =
    event.target.closest(
        ".anime-card"
    );


    const dropdown =
    card.querySelector(
        ".card-dropdown"
    );


    document
    .querySelectorAll(
        ".card-dropdown"
    )
    .forEach(menu=>{

        if(menu !== dropdown){

            menu.classList.remove(
                "active"
            );

        }

    });


    dropdown.classList.toggle(
        "active"
    );

}


console.log("animeCard.js loaded");