async function loadListDropdown(
    event,
    id,
    title,
    image
){

    event.stopPropagation();

    const dropdown =
    event.target.nextElementSibling;

    const response =
    await fetch(
        "https://anishelf-api.onrender.com/api/lists",
        {
            credentials:"include"
        }
    );

    const result =
    await response.json();

    dropdown.innerHTML =
    result.lists.map(list => `
        <button
        class="dropdown-item"
        data-list-id="${list.id}">
            ${list.name}
        </button>
    `).join("");

    console.log("before:", dropdown.className);
    dropdown.classList.add("active");
    console.log("after:", dropdown.className);
    console.log(dropdown.getBoundingClientRect());
}

async function addAnimeToList(
    listId,
    animeId,
    title,
    image
){

    const response =
    await fetch(

        `https://anishelf-api.onrender.com/api/lists/${listId}/anime`,

        {

            method:"POST",

            credentials:"include",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                anime_id:animeId,

                anime_title:title,

                anime_cover:image

            })

        }

    );

    const result =
    await response.json();

    if(result.success){

        alert("Anime added!");

    }else{

        alert(result.message);

    }

}
async function addAnimeToSelectedList(listId){

    const response =
    await fetch(

        `https://anishelf-api.onrender.com/api/lists/${listId}/anime`,

        {
            method:"POST",

            credentials:"include",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                anime_id:selectedAnime.id,

                anime_title:selectedAnime.title,

                anime_cover:selectedAnime.image

            })

        }

    );


    const result =
    await response.json();


    if(result.success){

        alert("Anime added!");

    }
    else{

        alert(result.message);

    }

}
window.loadListDropdown = loadListDropdown;
window.addAnimeToSelectedList = addAnimeToSelectedList;