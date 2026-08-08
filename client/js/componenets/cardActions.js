console.log("cardActions.js LOADED");

document.addEventListener("click", function (e) {

    const addListBtn = e.target.closest(".add-list-btn");

    if (!addListBtn) {
        return;
    }

    e.preventDefault();
    e.stopPropagation();

    console.log("REAL ADD LIST CLICK");

    const animeId = addListBtn.dataset.id;
    const animeTitle = addListBtn.dataset.title;
    const animeImage = addListBtn.dataset.image;

    console.log("Anime:", {
        animeId,
        animeTitle,
        animeImage
    });

    if (typeof openAddListModal !== "function") {

        console.error(
            "openAddListModal() DOES NOT EXIST"
        );

        return;
    }

    openAddListModal(
        animeId,
        animeTitle,
        animeImage
    );

}, true);



// ===========================
// SHARE ANIME
// ===========================

function openShareModal(animeId, animeTitle){

    const shareUrl =
        `${window.location.origin}/client/anime.html?id=${animeId}`;

    Modal.open({

        title: "Share Anime",

        content: `

            <p>
                Share
                <strong>${animeTitle}</strong>
            </p>

            <input
                type="text"
                class="share-link-input"
                value="${shareUrl}"
                readonly
            >

            <div class="share-actions">

                <button
                    class="share-copy-btn"
                    data-share-url="${shareUrl}">
                    📋 Copy Link
                </button>

                <button
                    class="share-native-btn"
                    data-share-url="${shareUrl}"
                    data-share-title="${animeTitle}">
                    🔗 Share
                </button>

            </div>

        `

    });


    const copyButton =
        document.querySelector(
            ".share-copy-btn"
        );


    const nativeButton =
        document.querySelector(
            ".share-native-btn"
        );


    // ===========================
    // COPY LINK
    // ===========================

    copyButton.addEventListener(
        "click",
        async () => {

            try {

                await navigator.clipboard.writeText(
                    copyButton.dataset.shareUrl
                );


                copyButton.textContent =
                    "✅ Copied!";


                setTimeout(() => {

                    copyButton.textContent =
                        "📋 Copy Link";

                }, 1500);


            } catch(error){

                console.error(
                    "Failed to copy link:",
                    error
                );

            }

        }
    );


    // ===========================
    // NATIVE SHARE
    // ===========================

    nativeButton.addEventListener(
        "click",
        async () => {

            if(!navigator.share){

                console.log(
                    "Native sharing is not supported."
                );

                return;

            }


            try {

                await navigator.share({

                    title:
                        nativeButton.dataset.shareTitle,

                    url:
                        nativeButton.dataset.shareUrl

                });

            } catch(error){

                // User cancelled sharing.
                console.log(
                    "Share cancelled."
                );

            }

        }
    );

}

function setupShareButtons(){

    const buttons =
        document.querySelectorAll(
            ".share-btn"
        );


    buttons.forEach(button => {

        button.onclick = function(e){

            e.stopPropagation();

            console.log(
                "REAL SHARE CLICK"
            );


            console.log({

                animeId:
                    button.dataset.id,

                animeTitle:
                    button.dataset.title

            });


            openShareModal(
                button.dataset.id,
                button.dataset.title
            );

        };

    });

}

function setupHeroAddListButton(){

    const button =
        document.getElementById(
            "heroListBtn"
        );


    if(!button) return;


    button.addEventListener(
        "click",
        function(event){

            event.preventDefault();

            event.stopPropagation();


            console.log(
                "HERO ADD LIST CLICK"
            );


            openAddListModal(

                button.dataset.id,

                button.dataset.title,

                button.dataset.image

            );

        }
    );

}

setupHeroAddListButton();