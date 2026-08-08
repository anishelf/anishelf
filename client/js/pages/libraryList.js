const params =
new URLSearchParams(
    window.location.search
);


const listId =
params.get("id");


async function loadList(){


    const response =
    await fetch(

        `https://anishelf-api.onrender.com/api/lists/${listId}`,

        {

            credentials:"include"

        }

    );

    const animeResponse =
    await fetch(

        `https://anishelf-api.onrender.com/api/lists/${listId}/anime`,

        {
            credentials:"include"
        }

    );

    const animeResult =
    await animeResponse.json();

    const animeList =
    animeResult.success
    ? animeResult.anime
    : [];













    const result =
    await response.json();



    const container =
    document.getElementById(
        "listPage"
    );



    if(!result.success){

        container.innerHTML =
        "<h1>List not found</h1>";

        return;

    }



    const list =
    result.list;



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

                ${animeList.length} Anime

            </h3>

            <div
            class="anime-container">

                ${
                    animeList.map(anime => `

                        <div class="anime-card">

                            <img
                            src="${anime.anime_cover}"
                            alt="${anime.anime_title}">

                            <div class="card-content">

                                <h3>

                                    ${anime.anime_title}

                                </h3>

                            </div>

                        </div>

                    `).join("")
                }

            </div>




















        </div>

    `;


}


loadList();