// ========================================
// AniShelf Library
// File: library.js
// ========================================


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


    // ============================
    // Share URL
    // ============================

    const shareUrl =
        `${window.location.origin}/library.html?list=${listId}`;


    // ============================
    // Share Modal
    // ============================

    Modal.open({

        title:
            "Share List",

        content: `

            <div class="library-share-modal">

                <div class="library-share-icon">
                    🔗
                </div>


                <h3 class="library-share-title">

                    Share "${escapeListText(listName)}"

                </h3>


                <p class="library-share-message">

                    Share this list with other
                    AniShelf users.

                </p>


                <div class="library-share-link">

                    <input
                        type="text"
                        value="${shareUrl}"
                        readonly
                        id="libraryShareLink"
                    >

                    <button
                        type="button"
                        onclick="copyLibraryListLink()"
                    >
                        Copy
                    </button>

                </div>

            </div>

        `,

        actions: `

            <div class="library-share-actions">

                <button
                    class="library-share-btn"
                    onclick="
                        nativeShareLibraryList(
                            ${listId},
                            '${escapeListText(listName)}'
                        )
                    "
                >
                    📤 Share List
                </button>

            </div>

        `

    });

}


// ============================
// Copy List Link
// ============================

async function copyLibraryListLink(){

    const input =
        document.getElementById(
            "libraryShareLink"
        );


    if(!input){

        return;

    }


    try{

        await navigator.clipboard.writeText(
            input.value
        );


        const button =
            input.parentElement.querySelector(
                "button"
            );


        if(button){

            button.textContent =
                "Copied!";


            setTimeout(
                () => {

                    button.textContent =
                        "Copy";

                },
                1500
            );

        }


    }catch(error){

        console.error(
            "COPY LINK ERROR:",
            error
        );


        // Fallback

        input.select();

        document.execCommand(
            "copy"
        );

    }

}


// ============================
// Native Share
// ============================

async function nativeShareLibraryList(
    listId,
    listName
){

    const shareUrl =
        `${window.location.origin}/library.html?list=${listId}`;


    // ============================
    // Native Share Available
    // ============================

    if(navigator.share){

        try{

            await navigator.share({

                title:
                    listName,

                text:
                    `Check out my AniShelf list: ${listName}`,

                url:
                    shareUrl

            });

            return;

        }catch(error){

            // User closed share sheet

            if(
                error.name ===
                "AbortError"
            ){

                return;

            }


            console.error(
                "NATIVE SHARE ERROR:",
                error
            );

        }

    }


    // ============================
    // Fallback
    // ============================

    await copyLibraryListLink();

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


    // ============================
    // First Publish Popup
    // ============================

    Modal.open({

        title:
            "Publish List",

        content: `

            <div class="library-confirm-modal">

                <div class="library-confirm-icon publish">
                    🌎
                </div>


                <h3 class="library-confirm-title">
                    Publish this list?
                </h3>


                <p class="library-confirm-message">

                    Publishing this list will make it
                    visible to the AniShelf community.

                </p>


                <div class="library-confirm-info">

                    🌎 You can change this later.

                </div>

            </div>

        `,

        actions: `

            <div class="library-confirm-actions">

                <button
                    class="library-confirm-btn publish"
                    onclick="
                        confirmPublishList(
                            ${listId}
                        )
                    "
                >
                    Continue
                </button>

            </div>

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
            "Confirm Publication",

        content: `

            <div class="library-confirm-modal">

                <div class="library-confirm-icon publish">
                    🌎
                </div>


                <h3 class="library-confirm-title">
                    Ready to publish?
                </h3>


                <p class="library-confirm-message">

                    Your list will become visible
                    to the AniShelf community.

                </p>


                <div class="library-confirm-info">

                    🌎 You can unpublish the list later.

                </div>

            </div>

        `,

        actions: `

            <div class="library-confirm-actions">

                <button
                    class="library-confirm-btn publish"
                    onclick="
                        executePublishList(
                            ${listId}
                        )
                    "
                >
                    Publish List
                </button>

            </div>

        `

    });

}


// ============================
// Execute Publish
// ============================

async function executePublishList(
    listId
){

    console.log(
        "EXECUTE PUBLISH:",
        listId
    );


    /*
        API will eventually go here.

        Example:

        const result =
            await publishList(listId);

        if(!result.success){

            throw new Error(
                result.message
            );

        }
    */


    Modal.open({

        title:
            "Coming Soon",

        content: `

            <div class="library-confirm-modal">

                <div class="library-confirm-icon publish">
                    🌎
                </div>


                <h3 class="library-confirm-title">
                    Publishing Coming Soon
                </h3>


                <p class="library-confirm-message">

                    The publishing system is ready
                    to be connected to the AniShelf
                    community API.

                </p>

            </div>

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


    console.log(
        "DELETE LIST:",
        listId
    );


    // ============================
    // Delete Confirmation
    // ============================

    Modal.open({

        title:
            "Delete List",

        content: `

            <div class="library-confirm-modal">

                <div class="library-confirm-icon delete">
                    🗑️
                </div>


                <h3 class="library-confirm-title">
                    Delete this list?
                </h3>


                <p class="library-confirm-message">

                    Are you sure you want to
                    delete this list?

                </p>


                <div class="library-confirm-warning">

                    ⚠️ This action cannot be undone.

                </div>

            </div>

        `,

        actions: `

            <div class="library-confirm-actions">

                <button
                    class="library-confirm-btn delete"
                    onclick="
                        confirmDeleteLibraryList(
                            ${listId}
                        )
                    "
                >
                    Delete List
                </button>

            </div>

        `

    });

}


// ============================
// Confirm Delete
// ============================

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


    try {

        const result =
            await removeAnimeFromList(
                listId,
                animeId
            );


        if(!result.success){

            throw new Error(
                result.message ||
                "Failed to remove anime"
            );

        }


        Modal.open({

            title:
                "Anime Removed",

            content: `

                <div
                    class="library-confirm-modal"
                >

                    <div
                        class="library-confirm-icon delete"
                    >
                        🗑️
                    </div>


                    <h3
                        class="library-confirm-title"
                    >
                        Anime removed
                    </h3>


                    <p
                        class="library-confirm-message"
                    >
                        The anime has been removed
                        from this list.
                    </p>

                </div>

            `

        });


        setTimeout(() => {

            Modal.close();

        }, 1000);


        // Refresh the currently opened list

        // We will need the list's name and
        // description here if we want to
        // reopen it automatically.

    } catch(error){

        console.error(
            "REMOVE ANIME ERROR:",
            error
        );


        Modal.open({

            title:
                "Error",

            content: `

                <div
                    class="library-confirm-modal"
                >

                    <div
                        class="library-confirm-icon delete"
                    >
                        ⚠️
                    </div>


                    <h3
                        class="library-confirm-title"
                    >
                        Removal failed
                    </h3>


                    <p
                        class="library-confirm-message"
                    >
                        ${error.message}
                    </p>

                </div>

            `

        });

    }

}


// ============================
// Execute Delete
// ============================

async function executeDeleteLibraryList(
    listId
){

    console.log(
        "EXECUTE DELETE:",
        listId
    );


    /*
        API will eventually go here.

        Example:

        const result =
            await deleteList(listId);

        if(!result.success){

            throw new Error(
                result.message
            );

        }

        await loadLists();
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
                    Delete Functionality Coming Soon
                </h3>


                <p class="library-confirm-message">

                    The delete system is ready to be
                    connected to your AniShelf API.

                </p>

            </div>

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

                cards +=createLibraryAnimeCard(
                    {

                        id:
                            anime.anime_id,

                        title:
                            anime.anime_title,

                        image:
                            anime.anime_cover

                    },

                    id
                );

            }
        );


        // ============================
        // Open Modal
        // ============================
        Modal.open({

            title:
                name,

            content: `

                <div class="library-list-description">

                    ${
                        description ||
                        "No description."
                    }

                </div>


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

window.openList =
    openList;

window.openCreateListModal =
    openCreateListModal;