const params =
new URLSearchParams(
    window.location.search
);


const listId =
Number(
    params.get("id")
);


const lists =
JSON.parse(
    localStorage.getItem(
        "animeLists"
    )
) || [];


const list =
lists.find(
    item => item.id === listId
);


const container =
document.getElementById(
    "listPage"
);


if(!list){

    container.innerHTML =
    "<h1>List not found</h1>";

}else{

    container.innerHTML = `

    <div class="list-card">

        

        <div class="list-header">

            <h1>

                ${list.name}

            </h1>

            <button
            class="back-btn"
            onclick="history.back()">

                ← Back

            </button>

        </div>

        <p>

            ${
                list.description ||
                "No description"
            }

        </p>

        <h3>

            ${list.anime.length}
            Anime

        </h3>

        <div
        class="anime-container">

        </div>

    </div>

    `;
}