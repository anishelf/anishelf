// ========================================
// AniShelf Profile
// File: profile.js
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        const result =
            await checkAuth();


        if(!result.success){

            window.location.href =
                "login.html";

            return;

        }


        const user =
            result.user;


        // ============================
        // User information
        // ============================

        document.getElementById(
            "username"
        ).textContent =
            user.username;


        document.getElementById(
            "email"
        ).textContent =
            user.email ||
            "No email available";


        // ============================
        // Profile image
        // ============================

        const avatar =
            document.getElementById(
                "profileAvatar"
            );


        if(user.profileImage){

            avatar.innerHTML = `

                <img
                    src="${user.profileImage}"
                    alt="${user.username}"
                >

            `;

        }


        // ============================
        // Profile image preview
        // ============================

        const imageInput =
            document.getElementById(
                "profileImageInput"
            );


        if(imageInput){

            imageInput.addEventListener(
                "change",
                event => {

                    const file =
                        event.target.files[0];


                    if(!file){

                        return;

                    }


                    const reader =
                        new FileReader();


                    reader.onload =
                        () => {

                            avatar.innerHTML = `

                                <img
                                    src="${reader.result}"
                                    alt="Profile picture"
                                >

                            `;

                        };


                    reader.readAsDataURL(file);

                }
            );

        }


        // ============================
        // Load My Lists
        // ============================

        await loadMyLists();


        // ============================
        // Logout
        // ============================

        document
            .getElementById("logoutBtn")
            .addEventListener(
                "click",
                async () => {

                    const response =
                        await logoutUser();


                    if(response.success){

                        window.location.href =
                            "index.html";

                    }

                }
            );

    }

);

// ========================================
// Load My Lists Count
// ========================================

async function loadMyLists(){

    try{

        const result =
            await getLists();


        console.log(
            "PROFILE LISTS:",
            result
        );


        const listCount =
            document.getElementById(
                "listCount"
            );


        if(!listCount){

            return;

        }


        if(!result.success){

            listCount.textContent =
                "0";

            return;

        }


        const lists =
            Array.isArray(result.lists)
                ? result.lists
                : [];


        listCount.textContent =
            lists.length;


    }catch(error){

        console.error(
            "LOAD PROFILE LIST COUNT ERROR:",
            error
        );


        const listCount =
            document.getElementById(
                "listCount"
            );


        if(listCount){

            listCount.textContent =
                "0";

        }

    }

}



// ========================================
// Open Profile List
// ========================================

function openProfileList(id){

    window.location.href = `library.html?list=${id}`;

}


window.openProfileList = openProfileList;

