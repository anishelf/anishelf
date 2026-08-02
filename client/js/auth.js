const AUTH_URL =
"https://anishelf-api.onrender.com/api/auth";



async function registerUser(
    username,
    email,
    password
){

    const response =
    await fetch(
        `${AUTH_URL}/register`,
        {

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                username,

                email,

                password

            })

        }
    );


    return await response.json();

}




async function loginUser(
    email,
    password
){

    const response =
    await fetch(
        `${AUTH_URL}/login`,
        {

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                email,

                password

            })

        }
    );


    return await response.json();

}