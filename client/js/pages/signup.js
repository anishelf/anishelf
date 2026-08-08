
const signupForm =
document.getElementById(
    "signupForm"
);

// ============================
// Signup form submit event
// ============================

if(signupForm){

    signupForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();



            const username =
            document.getElementById(
                "username"
            ).value;



            const email =
            document.getElementById(
                "email"
            ).value;



            const password =
            document.getElementById(
                "password"
            ).value;



            const result =
            await registerUser(
                username,
                email,
                password
            );



            if(result.success){

                alert(
                    "Account created!"
                );


                window.location.href =
                "login.html";


            }else{

                alert(
                    result.message
                );

            }

        }
    );

}