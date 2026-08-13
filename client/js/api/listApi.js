const LIST_URL =
"https://anishelf-api.onrender.com/api/lists";

// ============================
// Get all lists
// ============================
async function getLists(){

    const response =
    await fetch(
        LIST_URL,
        {
            credentials:"include"
        }
    );

    return await response.json();

}

// ============================
// Get list anime by id
// ============================
async function getListAnime(id){

    const response =
    await fetch(
        `${LIST_URL}/${id}/anime`,
        {
            credentials:"include"
        }
    );

    return await response.json();
}
// ============================
// Create a new list
// ============================
async function createList(
    name,
    description
){

    const response =
    await fetch(
        LIST_URL,
        {

            method:"POST",

            credentials:"include",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                name,
                description

            })

        }
    );

    return await response.json();

}



async function addAnimeToList(listId, anime){

    const response = await fetch(
        `${LIST_URL}/${listId}/anime`,
        {
            method: "POST",

            credentials: "include",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                anime_id: anime.id,

                anime_title: anime.title,

                anime_cover: anime.image

            })

        }
    );


    const data = await response.json();


    if(!response.ok){

        throw new Error(
            data.message || "Failed to add anime"
        );

    }


    return data;

}


// ============================
// Remove anime from list
// ============================
async function removeAnimeFromList(
    listId,
    animeId
){

    const response =
        await fetch(
            `${LIST_URL}/${listId}/anime/${animeId}`,
            {
                method: "DELETE",

                credentials: "include"
            }
        );


    const data =
        await response.json();


    if(!response.ok){

        throw new Error(
            data.message ||
            "Failed to remove anime from list"
        );

    }


    return data;

}





// =====================
// Open Add To List Modal
// =====================
async function openAddListModal(
    animeId,
    animeTitle,
    animeImage
){

    const result =
        await getLists();


    console.log(
        "LIST RESULT:",
        result
    );


    const lists =
        result.lists;


    let listHtml = "";


    lists.forEach(list => {

        listHtml += `

            <button
                class="modal-list-option"
                data-list-id="${list.id}"
            >

                📁 ${list.name}

            </button>

        `;

    });


    Modal.open({

        title:"Add To List",

        content:`

            <p>
                Select a list for
                <strong>${animeTitle}</strong>
            </p>


            <div
                class="modal-list-container"
            >

                ${listHtml}

            </div>


            <button
                class="modal-create-list-btn"
                id="modalCreateListBtn"
            >

                ➕ Create New List

            </button>

        `

    });


    // ==========================
    // Existing list buttons
    // ==========================

    document
        .querySelectorAll(
            ".modal-list-option"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                async () => {

                    console.log(
                        "LIST SELECTED:",
                        button.dataset.listId
                    );


                    await saveAnimeToList(

                        button.dataset.listId,

                        animeId,

                        animeTitle,

                        animeImage

                    );

                }
            );

        });


    // ==========================
    // Create list button
    // ==========================

    const createButton =
        document.getElementById(
            "modalCreateListBtn"
        );


    createButton.addEventListener(
        "click",
        () => {

            openCreateListModal(
                animeId,
                animeTitle,
                animeImage
            );

        }
    );

}




//==================================
//save to the list through the modal
//===================================
async function saveAnimeToList(
    listId,
    animeId,
    animeTitle,
    animeImage
){

    console.log("SAVE FUNCTION REACHED");

    console.log({
        listId,
        animeId,
        animeTitle,
        animeImage
    });


    try {

        await addAnimeToList(
            listId,
            {
                id: animeId,
                title: animeTitle,
                image: animeImage
            }
        );


        Modal.open({

            title: "Success",

            content: `
                <p>
                    ✅ Anime added successfully
                </p>
            `

        });


        setTimeout(() => {

            Modal.close();

        }, 1500);


    } catch(error) {

        console.error(
            "ADD ANIME ERROR:",
            error
        );


        Modal.open({

            title: "Error",

            content: `
                <p>
                    ❌ Failed to add anime
                </p>
            `

        });

    }
    
}

// ============================
// Create List Modal
// ============================
function openCreateListModal(
    animeId,
    animeTitle,
    animeImage
){

    Modal.open({

        title:"Create New List",

        content:`

            <div
                class="create-list-form"
            >

                <label>
                    List Name
                </label>


                <input
                    type="text"
                    id="newListName"
                    placeholder="e.g. Watch Later"
                >


                <label>
                    Description
                </label>


                <textarea
                    id="newListDescription"
                    placeholder="Optional description..."
                ></textarea>


                <button
                    id="createListSubmit"
                    class="modal-create-submit"
                >

                    Create List

                </button>

            </div>

        `

    });


    const submitButton =
        document.getElementById(
            "createListSubmit"
        );


    submitButton.addEventListener(
        "click",
        async () => {

            const name =
                document
                    .getElementById(
                        "newListName"
                    )
                    .value
                    .trim();


            const description =
                document
                    .getElementById(
                        "newListDescription"
                    )
                    .value
                    .trim();


            if(!name){

                alert(
                    "Please enter a list name."
                );

                return;

            }


            submitButton.disabled =
                true;


            submitButton.textContent =
                "Creating...";


            try{

                const result =
                    await createList(
                        name,
                        description
                    );


                console.log(
                    "LIST CREATED:",
                    result
                );


                if(!result.success){

                    throw new Error(
                        result.message ||
                        "Failed to create list"
                    );

                }


                // Go back to Add To List
                await openAddListModal(
                    animeId,
                    animeTitle,
                    animeImage
                );


            }catch(error){

                console.error(
                    "CREATE LIST ERROR:",
                    error
                );


                submitButton.disabled =
                    false;


                submitButton.textContent =
                    "Create List";


                Modal.open({

                    title:"Error",

                    content:`

                        <p>
                            ❌ Failed to create list.
                        </p>

                    `

                });

            }

        }
    );

}

















window.openAddListModal = openAddListModal;
window.saveAnimeToList = saveAnimeToList;