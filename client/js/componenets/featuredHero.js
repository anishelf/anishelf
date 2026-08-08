let featuredAnime = [];

let currentHero = 0;

let heroTimer;

// ============================
// Load featured anime for hero carousel
// ============================
async function loadHeroCarousel(){

    const data =
    await getFeaturedAnime();


    featuredAnime =
    data.results;


    renderHero();

    startHeroTimer();

}

// ============================
// Render hero carousel
// ============================

function renderHero(){

    const anime =
    featuredAnime[currentHero];


    displayFeaturedAnime(anime);


    updateHeroButtons(anime);


    updateHeroDots();

}

// ============================
// Start hero carousel timer
// ============================

function startHeroTimer(){

    heroTimer =
    setInterval(()=>{


        currentHero++;


        if(
            currentHero >= featuredAnime.length
        ){

            currentHero = 0;

        }


        renderHero();


    },5000);

}

// ============================
// Update hero buttons
// ============================
function updateHeroButtons(anime){


    const details =
    document.getElementById(
        "heroDetailsBtn"
    );


    details.href =
    `anime.html?id=${anime.id}`;



    const listBtn =
    document.getElementById(
        "heroListBtn"
    );


    listBtn.onclick = () => {

        addToList(anime);

    };


}

// ============================
// Update hero dots
// ============================
function updateHeroDots(){

    const container =
    document.getElementById(
        "heroIndicators"
    );

    container.innerHTML = "";


    featuredAnime.forEach((_, index) => {

        const dot =
        document.createElement("span");

        dot.className =
            index === currentHero
            ? "hero-dot active"
            : "hero-dot";


        dot.onclick = () => {

            currentHero = index;

            renderHero();

        };

        container.appendChild(dot);

    });

}