const AUTH_URL =
    "https://api.ani-shelf.com/api/auth";


// ========================================
// Register user
// ========================================

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

                credentials:"include",

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


// ========================================
// Login user
// ========================================

async function loginUser(
    email,
    password
){

    const response =
        await fetch(
            `${AUTH_URL}/login`,
            {

                method:"POST",

                credentials:"include",

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


// ========================================
// Get user profile
// ========================================

async function getProfile(){

    const response =
        await fetch(
            `${AUTH_URL}/profile`,
            {

                method:"GET",

                credentials:"include"

            }
        );


    const data =
        await response.json();


    return data;

}


// ========================================
// Logout user
// ========================================

async function logoutUser(){

    const response =
        await fetch(
            `${AUTH_URL}/logout`,
            {

                method:"POST",

                credentials:"include"

            }
        );


    return await response.json();

}


// ========================================
// Check authentication status
// ========================================

async function checkAuth(){

    try{

        const response =
            await fetch(
                `${AUTH_URL}/profile`,
                {

                    method:"GET",

                    credentials:"include"

                }
            );


        const data =
            await response.json();


        console.log(
            "AUTH CHECK:",
            data
        );


        // ================================
        // User is authenticated
        // ================================

        if(
            response.ok &&
            data.success === true &&
            data.user
        ){

            return {

                success:true,

                user:data.user

            };

        }


        // ================================
        // User is NOT authenticated
        // ================================

        return {

            success:false

        };


    }catch(error){

        console.error(
            "AUTH CHECK ERROR:",
            error
        );


        return {

            success:false

        };

    }

}

