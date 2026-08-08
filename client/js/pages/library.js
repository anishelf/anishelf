async function loadLists(){

    const container =
        document.getElementById(
            "libraryLists"
        );


    const result =
        await getLists();


    if(!result.success){

        container.innerHTML = `
            <p>
                Failed to load lists
            </p>
        `;

        return;

    }


    const lists =
        result.lists;


    if(lists.length === 0){

        container.innerHTML = `
            <p>
                No lists yet.
            </p>
        `;

        return;

    }


    container.innerHTML =
        lists.map(list => `

            <div
                class="library-card"
                data-list-id="${list.id}"
                data-list-name="${list.name}"
            >

                <h3>
                    ${list.name}
                </h3>

                <p class="description">
                    ${
                        list.description ||
                        "No description"
                    }
                </p>

                <p>
                    0 Anime
                </p>

            </div>

        `).join("");


    // Connect list buttons AFTER
    // they exist in the DOM

    document
        .querySelectorAll(".library-card")
        .forEach(card => {

            card.addEventListener(
                "click",
                () => {

                    openList(
                        card.dataset.listId,
                        card.dataset.listName,
                        card.dataset.description
                    );

                }
            );

        });

}


// ============================
// Open list modal
// ============================

async function openList(
    id,
    name
){

    console.log(
        "OPENING LIST:",
        id,
        name
    );


    try{

        const result =
            await getListAnime(id);


        console.log(
            "LIST ANIME:",
            result
        );


        if(!result.success){

            throw new Error(
                result.message ||
                "Failed to load list"
            );

        }


        const animeList =
            result.anime || [];


        let cards = "";


        animeList.forEach(anime => {

            cards += createLibraryAnimeCard({

                id:
                    anime.anime_id,

                title:
                    anime.anime_title,

                image:
                    anime.anime_cover

            });

        });


        Modal.open({

            title:name,
            discri
            content:`

                <div
                    class="library-list-modal"
                >

                    ${
                        animeList.length > 0

                        ? cards

                        : `
                            <p class="empty-list">
                                This list is empty.
                            </p>
                        `
                    }

                </div>

            `

        });


        setupShareButtons();


    }catch(error){

        console.error(
            "OPEN LIST ERROR:",
            error
        );


        Modal.open({

            title:"Error",

            content:`

                <p>
                    ❌ Failed to load this list.
                </p>

            `

        });

    }

}

// ============================
// Start library
// ============================

loadLists();

