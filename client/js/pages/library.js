// ========================================
// AniShelf Library
// File: library.js
// ========================================


// ============================
// Load My Lists
// ============================

// ============================
// Load My Lists
// ============================

async function loadLists(){

    const container =
        document.getElementById(
            "libraryLists"
        );


    if(!container){

        return;

    }


    try{

        const result =
            await getLists();


        console.log(
            "LIBRARY LISTS:",
            result
        );


        if(!result.success){

            container.innerHTML = `

                <p>
                    Failed to load lists
                </p>

            `;

            return;

        }


        const lists =
            Array.isArray(result.lists)
                ? result.lists
                : [];


        // ============================
        // Update total list count
        // ============================

        const listCount =
            document.getElementById(
                "listCount"
            );


        if(listCount){

            listCount.textContent =
                lists.length;

        }


        // ============================
        // Empty library
        // ============================

        if(lists.length === 0){

            container.innerHTML = `

                <p>
                    No lists yet.
                </p>

            `;

            return;

        }


        // ============================
        // Get anime count for each list
        // ============================

        const listsWithCounts =
            await Promise.all(

                lists.map(
                    async list => {

                        try{

                            const animeResult =
                                await getListAnime(
                                    list.id
                                );


                            const anime =
                                Array.isArray(
                                    animeResult.anime
                                )
                                    ? animeResult.anime
                                    : [];


                            return {

                                ...list,

                                anime_count:
                                    anime.length

                            };

                        }catch(error){

                            console.error(
                                `Failed to load anime for list ${list.id}:`,
                                error
                            );


                            return {

                                ...list,

                                anime_count:0

                            };

                        }

                    }
                )

            );


        // ============================
        // Create list cards
        // ============================

        container.innerHTML =

            listsWithCounts.map(
                list => `

                <div
                    class="library-card"

                    data-list-id="${list.id}"

                    data-list-name="${escapeHTML(
                        list.name
                    )}"

                    data-list-description="${escapeHTML(
                        list.description || ""
                    )}"
                >


                    <div
                        class="library-card-header"
                    >


                        <div
                            class="library-card-title"
                        >

                            <h3>

                                ${escapeHTML(
                                    list.name
                                )}

                            </h3>

                        </div>


                        <!-- Three dots -->

                        <button
                            class="library-card-menu"
                            type="button"

                            onclick="
                                event.stopPropagation();
                                toggleLibraryListMenu(event);
                            "
                        >

                            ⋮

                        </button>


                        <!-- Dropdown -->

                        <div
                            class="library-card-dropdown"

                            onclick="
                                event.stopPropagation();
                            "
                        >


                            <button
                                class="library-dropdown-item"

                                onclick="
                                    shareLibraryList(
                                        ${list.id},
                                        '${escapeListText(
                                            list.name
                                        )}'
                                    )
                                "
                            >

                                🔗 Share

                            </button>


                            <button
                                class="library-dropdown-item"

                                onclick="
                                    publishLibraryList(
                                        ${list.id}
                                    )
                                "
                            >

                                🌎 Publish

                            </button>


                            <button
                                class="
                                    library-dropdown-item
                                    delete-list-item
                                "

                                onclick="
                                    deleteLibraryList(
                                        ${list.id}
                                    )
                                "
                            >

                                🗑️ Delete

                            </button>


                        </div>

                    </div>


                    <!-- Description -->

                    <p class="list-description">

                        ${
                            escapeHTML(
                                list.description ||
                                "No description"
                            )
                        }

                    </p>


                    <!-- Anime Count -->

                    <p class="library-anime-count">

                        ${list.anime_count}

                        Anime

                    </p>


                </div>

            `

            ).join("");


        // ============================
        // Card click
        // ============================

        document
            .querySelectorAll(
                ".library-card"
            )
            .forEach(card => {

                card.addEventListener(
                    "click",
                    () => {

                        openList(

                            card.dataset.listId,

                            card.dataset.listName,

                            card.dataset.listDescription

                        );

                    }
                );

            });


    }catch(error){

        console.error(
            "LOAD LISTS ERROR:",
            error
        );


        container.innerHTML = `

            <p>
                Failed to load lists
            </p>

        `;

    }

}


// ============================
// Update List Count
// ============================

function updateListCount(count){

    const listCount =
        document.getElementById(
            "listCount"
        );


    if(!listCount){

        return;

    }


    listCount.textContent =
        count;

}


// ============================
// Escape HTML
// ============================

function escapeHTML(text){

    return String(text)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


// ============================
// Escape HTML Attribute
// ============================

function escapeAttribute(text){

    return escapeHTML(
        text
    );

}


// ============================
// Escape Text For Inline HTML
// ============================

function escapeListText(text){

    return String(text)
        .replace(
            /\\/g,
            "\\\\"
        )
        .replace(
            /'/g,
            "\\'"
        )
        .replace(
            /"/g,
            "&quot;"
        );

}


// ============================
// Toggle List Dropdown
// ============================
// ============================
// Toggle list dropdown
// ============================

function toggleLibraryListMenu(event){

    event.stopPropagation();
    event.preventDefault();


    const button =
        event.currentTarget;


    const card =
        button.closest(
            ".library-card"
        );


    if(!card){

        return;

    }


    const dropdown =
        card.querySelector(
            ".library-card-dropdown"
        );


    if(!dropdown){

        return;

    }


    // ============================
    // Close other dropdowns
    // ============================

    document
        .querySelectorAll(
            ".library-card-dropdown"
        )
        .forEach(menu => {

            if(menu !== dropdown){

                menu.classList.remove(
                    "active"
                );

            }

        });


    // ============================
    // Toggle current dropdown
    // ============================

    dropdown.classList.toggle(
        "active"
    );

}

// ============================
// Close Dropdowns
// ============================

document.addEventListener(
    "click",
    () => {

        document
            .querySelectorAll(
                ".library-card-dropdown"
            )
            .forEach(menu => {

                menu.classList.remove(
                    "active"
                );

            });

    }
);


// ============================
// Share List
// ============================

function shareLibraryList(
    listId,
    listName
){

    // Close menus

    document
        .querySelectorAll(
            ".library-card-dropdown"
        )
        .forEach(menu => {

            menu.classList.remove(
                "active"
            );

        });


    console.log(
        "SHARE LIST:",
        listId,
        listName
    );


    const shareUrl =
        `${window.location.origin}/library.html?list=${listId}`;


    // ============================
    // Native Share
    // ============================

    if(
        navigator.share
    ){

        navigator.share({

            title:
                listName,

            text:
                `Check out my AniShelf list: ${listName}`,

            url:
                shareUrl

        }).catch(
            error => {

                console.log(
                    "Share cancelled:",
                    error
                );

            }
        );


        return;

    }


    // ============================
    // Clipboard Share
    // ============================

    if(
        navigator.clipboard
    ){

        navigator.clipboard.writeText(
            shareUrl
        );


        Modal.open({

            title:
                "List Link Copied",

            content: `

                <p>
                    🔗 The list link has been
                    copied to your clipboard.
                </p>

            `

        });

    }

}


// ============================
// Publish List
// ============================

function publishLibraryList(
    listId
){

    // Close menus

    document
        .querySelectorAll(
            ".library-card-dropdown"
        )
        .forEach(menu => {

            menu.classList.remove(
                "active"
            );

        });


    console.log(
        "PUBLISH LIST:",
        listId
    );


    Modal.open({

        title:
            "Publish List",

        content: `

            <p>

                🌎 Publishing will make this
                list visible to the AniShelf
                community.

            </p>


            <p>

                You can change this later.

            </p>

        `,

        actions: `

            <button
                class="modal-action-btn"

                onclick="
                    confirmPublishList(
                        ${listId}
                    )
                "
            >

                Publish List

            </button>

        `

    });

}


// ============================
// Confirm Publish
// ============================

function confirmPublishList(
    listId
){

    console.log(
        "CONFIRM PUBLISH:",
        listId
    );


    Modal.open({

        title:
            "Coming Soon",

        content: `

            <p>

                🌎 List publishing is ready
                to be connected to the
                community system.

            </p>

        `

    });

}


// ============================
// Delete List
// ============================

function deleteLibraryList(
    listId
){

    // Close menus

    document
        .querySelectorAll(
            ".library-card-dropdown"
        )
        .forEach(menu => {

            menu.classList.remove(
                "active"
            );

        });


    Modal.open({

        title:
            "Delete List",

        content: `

            <p>

                ⚠️ Are you sure you want
                to delete this list?

            </p>


            <p>

                This cannot be undone.

            </p>

        `,

        actions: `

            <button
                class="modal-action-btn danger"

                onclick="
                    confirmDeleteLibraryList(
                        ${listId}
                    )
                "
            >

                Delete List

            </button>

        `

    });

}


// ============================
// Confirm Delete
// ============================

async function confirmDeleteLibraryList(
    listId
){

    console.log(
        "DELETE LIST:",
        listId
    );


    Modal.open({

        title:
            "Coming Soon",

        content: `

            <p>

                🗑️ Delete functionality is
                ready to be connected to
                your API.

            </p>

        `

    });

}


// ============================
// Open List Modal
// ============================

async function openList(
    id,
    name,
    description
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
            Array.isArray(
                result.anime
            )
                ? result.anime
                : [];


        // ============================
        // Create Anime Cards
        // ============================

        let cards = "";


        animeList.forEach(
            anime => {

                cards +=
                    createLibraryAnimeCard({

                        id:
                            anime.anime_id,

                        title:
                            anime.anime_title,

                        image:
                            anime.anime_cover

                    });

            }
        );


        // ============================
        // Open Modal
        // ============================

        Modal.open({

            title:
                name,

            description:
                description ||
                "No description.",

            content: `

                <div
                    class="library-list-modal"
                >

                    ${
                        animeList.length > 0

                        ? cards

                        : `

                            <p
                                class="empty-list"
                            >

                                This list is empty.

                            </p>

                        `
                    }

                </div>

            `

        });


        // ============================
        // Setup Share Buttons
        // ============================

        if(
            typeof setupShareButtons ===
            "function"
        ){

            setupShareButtons();

        }


    }catch(error){

        console.error(
            "OPEN LIST ERROR:",
            error
        );


        Modal.open({

            title:
                "Error",

            content: `

                <p>

                    ❌ Failed to load this list.

                </p>

            `

        });

    }

}


// ============================
// Open Create List Modal
// ============================

function openCreateListModal(){

    Modal.open({

        title:
            "Create New List",

        content: `

            <div
                class="create-list-form"
            >

                <label
                    for="newListName"
                >

                    List Name

                </label>


                <input
                    type="text"

                    id="newListName"

                    placeholder="e.g. Watch Later"

                    maxlength="50"
                >


                <label
                    for="newListDescription"
                >

                    Description

                </label>


                <textarea
                    id="newListDescription"

                    placeholder="What is this list about?"

                    maxlength="200"
                ></textarea>

            </div>

        `,

        actions: `

            <button
                class="modal-create-submit"

                id="createListSubmit"
            >

                Create List

            </button>

        `

    });


    // ============================
    // Submit Button
    // ============================

    const submitButton =
        document.getElementById(
            "createListSubmit"
        );


    if(!submitButton){

        return;

    }


    submitButton.addEventListener(
        "click",
        async () => {

            const nameInput =
                document.getElementById(
                    "newListName"
                );


            const descriptionInput =
                document.getElementById(
                    "newListDescription"
                );


            const name =
                nameInput
                    ? nameInput.value.trim()
                    : "";


            const description =
                descriptionInput
                    ? descriptionInput.value.trim()
                    : "";


            // ============================
            // Validate
            // ============================

            if(!name){

                if(nameInput){

                    nameInput.focus();

                }

                return;

            }


            // ============================
            // Disable Button
            // ============================

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
                    "CREATE LIST RESULT:",
                    result
                );


                if(!result.success){

                    throw new Error(
                        result.message ||
                        "Failed to create list"
                    );

                }


                // ============================
                // Close Modal
                // ============================

                Modal.close();


                // ============================
                // Refresh Library
                // ============================

                await loadLists();


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

                    title:
                        "Error",

                    content: `

                        <p>

                            ❌ ${
                                error.message ||
                                "Failed to create list."
                            }

                        </p>

                    `

                });

            }

        }
    );

}


// ============================
// Start Library
// ============================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadLists();


        const createButton =
            document.getElementById(
                "createListBtn"
            );


        if(createButton){

            createButton.addEventListener(
                "click",
                openCreateListModal
            );

        }

    }
);


// ============================
// Global Functions
// ============================

window.toggleLibraryListMenu =
    toggleLibraryListMenu;

window.shareLibraryList =
    shareLibraryList;

window.publishLibraryList =
    publishLibraryList;

window.confirmPublishList =
    confirmPublishList;

window.deleteLibraryList =
    deleteLibraryList;

window.confirmDeleteLibraryList =
    confirmDeleteLibraryList;

window.openList =
    openList;

window.openCreateListModal =
    openCreateListModal;