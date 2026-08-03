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

                0 Anime

            </h3>



            <div
            class="anime-container">

            </div>


        </div>

    `;


}


loadList();