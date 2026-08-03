// ========================================
// AniShelf Profile
// ========================================


document.addEventListener(
    "DOMContentLoaded",
    async()=>{


        const result =
        await checkAuth();



        if(!result.success){

            window.location.href =
            "login.html";

            return;

        }



        const user =
        result.user;



        document.getElementById(
            "username"
        ).textContent =
        user.username;



        document.getElementById(
            "email"
        ).textContent =
        user.email ||
        "No email available";



        document
        .getElementById(
            "logoutBtn"
        )
        .addEventListener(
            "click",
            async()=>{


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



const logoutBtn =
document.getElementById(
    "logoutBtn"
);


if(logoutBtn){

    logoutBtn.addEventListener(
        "click",
        async()=>{


            const response =
            await logoutUser();



            if(response.success){

                window.location.href =
                "index.html";

            }


        }
    );

}