const createListBtn =
document.getElementById(
    "createListBtn"
);

const modal =
document.getElementById(
    "listModal"
);

createListBtn.addEventListener(
    "click",
    () => {

        modal.classList.remove(
            "hidden"
        );

    }
);

document
.getElementById(
    "closeModalBtn"
)
.addEventListener(
    "click",
    () => {

        modal.classList.add(
            "hidden"
        );

    }
);

document
.getElementById(
    "saveListBtn"
)
.addEventListener(
    "click",
    async()=>{

        const name =
        document.getElementById(
            "listName"
        ).value.trim();

        const description =
        document.getElementById(
            "listDescription"
        ).value.trim();

        if(!name) return;

        const result =
        await createList(

            name,

            description

        );

        if(result.success){

            modal.classList.add(
                "hidden"
            );

            document.getElementById(
                "listName"
            ).value = "";

            document.getElementById(
                "listDescription"
            ).value = "";

            loadLists();

        }else{

            alert(
                result.message ||
                "Failed to create list"
            );

        }

    }
);

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
        onclick="openList(${list.id})">

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

}

function openList(id){

    window.location.href =
    `library-list.html?id=${id}`;

}

loadLists();