const loginForm =
document.getElementById(
    "loginForm"
);

if(loginForm){

    loginForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();

            localStorage.setItem(
                "user",
                JSON.stringify({
                    username,
                    email
                })
            );

            window.location.href =
            "index.html";

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
        (event) => {

            event.preventDefault();

            const username =
            document.getElementById(
                "username"
            ).value;
            const email =
            document.getElementById(
                "email"
            ).value;

            localStorage.setItem(
                "user",
                JSON.stringify({
                    username,
                    email
                })
            );

            window.location.href =
            "index.html";

        }
    );

}