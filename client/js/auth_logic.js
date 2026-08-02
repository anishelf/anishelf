const loginForm =
document.getElementById(
    "loginForm"
);


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


                localStorage.setItem(
                    "token",
                    result.token
                );


                localStorage.setItem(
                    "user",
                    JSON.stringify(result.user)
                );


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





const signupForm =
document.getElementById(
    "signupForm"
);



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