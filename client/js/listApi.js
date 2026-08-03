const LIST_URL =
"https://anishelf-api.onrender.com/api/lists";


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