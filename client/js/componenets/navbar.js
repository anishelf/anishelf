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
                <a href="login.html"
                class = "authActions">
                    Login
                </a>
            </li>


            <li>
                <a href="signup.html"
                class = "authActions">
                    Sign Up
                </a>
            </li>

        `;


    }


}

function setupNavbar(){

    const toggle =
        document.getElementById("navToggle");

    const navLinks =
        document.getElementById("navLinks");


    if(!toggle || !navLinks) return;


    toggle.addEventListener("click", () => {

        const isOpen =
            navLinks.classList.toggle("mobile-open");


        toggle.classList.toggle(
            "active",
            isOpen
        );


        toggle.setAttribute(
            "aria-expanded",
            isOpen
        );

    });


    navLinks.addEventListener("click", event => {

        if(event.target.tagName === "A"){

            navLinks.classList.remove(
                "mobile-open"
            );

            toggle.classList.remove(
                "active"
            );

            toggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });

}


document.addEventListener(
    "DOMContentLoaded",
    async () => {

        await renderNavbar();

        setupNavbar();

    }
);