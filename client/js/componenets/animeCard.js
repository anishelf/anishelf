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



// ==================================
// library specific js scripts
//===================================

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
            data-anime-id="${anime.id}"
            data-list-id="${listId}"
            onclick="
                openLibraryAnime(
                    ${anime.id}
                )
            "
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
                        type="button"
                        data-anime-id="${anime.id}"
                        data-list-id="${listId}"
                        onclick="
                            event.stopPropagation();
                            toggleLibraryAnimeMenu(event);
                        "
                    >

                        ⋮

                    </button>


                    <div
                        class="library-anime-dropdown"
                        onclick="
                            event.stopPropagation();
                        "
                    >

                        <button
                            type="button"
                            class="remove-library-anime-btn"
                            onclick="
                                event.stopPropagation();
                                removeAnimeFromLibraryList(
                                    ${anime.id},
                                    ${listId}
                                );
                            "
                        >

                            🗑️ Remove from list

                        </button>

                    </div>

                </div>

            </div>

        </div>

    `;

}

// ============================
// Open Anime Details
// ============================

function openLibraryAnime(
    animeId
){

    console.log(
        "OPEN LIBRARY ANIME:",
        animeId
    );


    window.location.href =
        `anime.html?id=${animeId}`;

}

// ============================
// Toggle Anime Dropdown
// ============================

function toggleLibraryAnimeMenu(
    event
){

    event.stopPropagation();
    event.preventDefault();


    const button =
        event.currentTarget;


    const card =
        button.closest(
            ".library-anime-card"
        );


    if(!card){

        return;

    }


    const dropdown =
        card.querySelector(
            ".library-anime-dropdown"
        );


    if(!dropdown){

        return;

    }


    // Close other anime menus

    document
        .querySelectorAll(
            ".library-anime-dropdown"
        )
        .forEach(menu => {

            if(menu !== dropdown){

                menu.classList.remove(
                    "active"
                );

            }

        });


    // Toggle current menu

    dropdown.classList.toggle(
        "active"
    );

}
// ============================
// Close Anime Dropdowns
// ============================

document.addEventListener(
    "click",
    () => {

        document
            .querySelectorAll(
                ".library-anime-dropdown"
            )
            .forEach(menu => {

                menu.classList.remove(
                    "active"
                );

            });

    }
);
// ============================
// Remove Anime From List
// ============================

function removeAnimeFromLibraryList(
    animeId,
    listId
){

    console.log(
        "REMOVE ANIME:",
        animeId,
        "FROM LIST:",
        listId
    );


    // Close dropdowns

    document
        .querySelectorAll(
            ".library-anime-dropdown"
        )
        .forEach(menu => {

            menu.classList.remove(
                "active"
            );

        });


    Modal.open({

        title:
            "Remove Anime",

        content: `

            <div class="library-confirm-modal">

                <div class="library-confirm-icon delete">
                    🗑️
                </div>


                <h3 class="library-confirm-title">
                    Remove this anime?
                </h3>


                <p class="library-confirm-message">

                    Are you sure you want to
                    remove this anime from
                    this list?

                </p>


                <div class="library-confirm-warning">

                    ⚠️ The anime will only be removed
                    from this list.

                </div>

            </div>

        `,

        actions: `

            <div class="library-confirm-actions">

                <button
                    class="library-confirm-btn delete"
                    onclick="
                        confirmRemoveAnimeFromLibraryList(
                            ${animeId},
                            ${listId}
                        )
                    "
                >

                    Remove Anime

                </button>

            </div>

        `

    });

}
// ============================
// Confirm Remove Anime
// ============================

async function confirmRemoveAnimeFromLibraryList(
    animeId,
    listId
){

    console.log(
        "CONFIRM REMOVE:",
        animeId,
        listId
    );


    /*
        API will go here.

        Example later:

        const result =
            await removeAnimeFromList(
                listId,
                animeId
            );

        if(!result.success){

            throw new Error(
                result.message
            );

        }

        Modal.close();

        await openList(
            listId,
            ...
        );
    */


    Modal.open({

        title:
            "Coming Soon",

        content: `

            <div class="library-confirm-modal">

                <div class="library-confirm-icon delete">
                    🗑️
                </div>


                <h3 class="library-confirm-title">
                    Removal Ready
                </h3>


                <p class="library-confirm-message">

                    The anime removal system is
                    ready to be connected to
                    your API.

                </p>

            </div>

        `

    });

}


console.log("animeCard.js loaded");