const loginForm =
document.getElementById(
    "loginForm"
);

// ============================
// Login form submit event
// ============================
if(loginForm){

    loginForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            const email =
            document.getElementById(
                "email"
            ).value;


            const password =
            document.getElementById(
                "password"
            ).value;



            const result =
            await loginUser(
                email,
                password
            );



            if(result.success){

                window.location.href =
                "index.html";

            }else{

                alert(
                    result.message
                );

            }

        }
    );

}