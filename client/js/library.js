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
.getElementById("saveListBtn")
.addEventListener(
"click",
()=>{

    const name =
    document.getElementById(
        "listName"
    ).value.trim();
    const description =
    document.getElementById(
        "listDescription"
    ).value.trim();

    if(!name) return;


    const lists =
    JSON.parse(
        localStorage.getItem(
            "animeLists"
        )
    ) || [];


    lists.push({

        id:Date.now(),

        name,
        description,
        anime:[]

    });


    localStorage.setItem(

        "animeLists",

        JSON.stringify(lists)

    );


    modal.classList.add(
        "hidden"
    );


    loadLists();

});
function loadLists(){

    const container =
    document.getElementById(
        "libraryLists"
    );


    const lists =
    JSON.parse(
        localStorage.getItem(
            "animeLists"
        )
    ) || [];


    container.innerHTML =
    lists.map(list => `

        <div class="library-card" onclick="openList(${list.id})">

            <h3>
                ${list.name}
            </h3>
            <p class="description">
                ${list.description || "No description"}
            </p>
            <p>

                ${list.anime.length}
                Anime

            </p>

        </div>

    `).join("");

}

function openList(id){

    window.location.href =
    `library-list.html?id=${id}`;

}

document
.getElementById("closeModalBtn")
.addEventListener(
"click",
()=>{

    modal.classList.add(
        "hidden"
    );

});


loadLists();