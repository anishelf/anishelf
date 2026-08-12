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
        // Profile image upload
        // ============================

        const imageInput =
            document.getElementById(
                "profileImageInput"
            );


        imageInput.addEventListener(
            "change",
            async event => {

                const file =
                    event.target.files[0];


                if(!file){

                    return;

                }


                // ============================
                // Basic validation
                // ============================

                if(!file.type.startsWith("image/")){

                    alert(
                        "Please select an image."
                    );

                    return;

                }


                if(file.size > 5 * 1024 * 1024){

                    alert(
                        "Image must be smaller than 5MB."
                    );

                    return;

                }


                try {

                    // ============================
                    // Get ImageKit authentication
                    // ============================

                    const authResponse =
                        await fetch(
                            "https://anishelf-api.onrender.com/api/auth/imagekit",
                            {
                                credentials: "include"
                            }
                        );


                    const authData =
                        await authResponse.json();


                    if(!authData.success){

                        throw new Error(
                            "Failed to authenticate with ImageKit"
                        );

                    }


                    // ============================
                    // Prepare ImageKit upload
                    // ============================

                    const formData =
                        new FormData();


                    formData.append(
                        "file",
                        file
                    );


                    formData.append(
                        "fileName",
                        `profile_${Date.now()}_${file.name}`
                    );


                    formData.append(
                        "publicKey",
                        authData.publicKey
                    );


                    formData.append(
                        "signature",
                        authData.signature
                    );


                    formData.append(
                        "expire",
                        authData.expire
                    );


                    formData.append(
                        "token",
                        authData.token
                    );


                    // ============================
                    // Upload to ImageKit
                    // ============================

                    const uploadResponse =
                        await fetch(
                            "https://upload.imagekit.io/api/v1/files/upload",
                            {
                                method: "POST",
                                body: formData
                            }
                        );


                    const uploadData =
                        await uploadResponse.json();


                    if(!uploadResponse.ok){

                        console.error(
                            "IMAGEKIT UPLOAD ERROR:",
                            uploadData
                        );

                        throw new Error(
                            "Image upload failed"
                        );

                    }


                    console.log(
                        "IMAGEKIT UPLOAD:",
                        uploadData
                    );


                    // ============================
                    // Get uploaded image URL
                    // ============================

                    const imageUrl =
                        uploadData.url;


                    if(!imageUrl){

                        throw new Error(
                            "ImageKit did not return an image URL"
                        );

                    }


                    // ============================
                    // Save URL to AniShelf database
                    // ============================

                    const saveResponse =
                        await fetch(
                            "https://anishelf-api.onrender.com/api/auth/profile-image",
                            {

                                method: "PUT",

                                credentials: "include",

                                headers: {
                                    "Content-Type":
                                        "application/json"
                                },

                                body: JSON.stringify({

                                    profileImage:
                                        imageUrl

                                })

                            }
                        );


                    const saveData =
                        await saveResponse.json();


                    if(!saveData.success){

                        throw new Error(
                            saveData.message ||
                            "Failed to save profile image"
                        );

                    }


                    // ============================
                    // Update profile picture
                    // ============================

                    avatar.innerHTML = `

                        <img
                            src="${imageUrl}"
                            alt="${user.username}"
                        >

                    `;


                    console.log(
                        "PROFILE IMAGE SAVED:",
                        imageUrl
                    );


                } catch(error) {

                    console.error(
                        "PROFILE IMAGE UPLOAD ERROR:",
                        error
                    );


                    alert(
                        "Failed to upload profile picture."
                    );

                }


                // Allow selecting the same file again
                imageInput.value = "";

            }
        );


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




