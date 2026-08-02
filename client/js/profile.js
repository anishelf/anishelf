// ========================================
// AniShelf Profile
// ========================================


const user =
JSON.parse(
    localStorage.getItem("user")
);


if(!user){

    window.location.href =
    "login.html";

}



document.getElementById(
    "username"
).textContent =
user.username;



document.getElementById(
    "email"
).textContent =
user.email || "No email available";




document
.getElementById("logoutBtn")
.addEventListener(
"click",
()=>{


    localStorage.removeItem(
        "user"
    );


    window.location.href =
    "index.html";


});