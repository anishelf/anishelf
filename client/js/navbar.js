// ========================================
// AniShelf Navbar
// ========================================


async function renderNavbar(){

    const navLinks =
    document.getElementById(
        "navLinks"
    );


    if(!navLinks) return;



    const result =
    await checkAuth();



    if(result.success){

        navLinks.innerHTML = `

            <li>
                <a href="index.html">
                    Home
                </a>
            </li>


            <li>
                <a href="search.html">
                    Search
                </a>
            </li>


            <li>
                <a href="library.html">
                    Library
                </a>
            </li>


            <li>
                <a href="community.html">
                    Community
                </a>
            </li>


            <li>
                <a href="ai-search.html">
                    AI Search
                </a>
            </li>


            <li>
                <a href="profile.html">
                    Profile
                </a>
            </li>

        `;

    }else{


        navLinks.innerHTML = `

            <li>
                <a href="index.html">
                    Home
                </a>
            </li>


            <li>
                <a href="search.html">
                    Search
                </a>
            </li>


            <li>
                <a href="login.html">
                    Login
                </a>
            </li>


            <li>
                <a href="signup.html">
                    Sign Up
                </a>
            </li>

        `;


    }


}



document.addEventListener(
    "DOMContentLoaded",
    renderNavbar
);