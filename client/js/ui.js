// ============================
// UI Functions
// Handles displaying content on the page
// ============================


function displayAnime(animeList, containerId) {

  const container = document.getElementById(containerId);

    // Clear previous results

    container.innerHTML = "";


    // Create a card for every anime

    animeList.forEach(anime => {

        container.innerHTML += createAnimeCard(anime);
    });

    // Setup Share buttons
    setupShareButtons();

}
// ============================
// Display featured anime
// ============================

function displayFeaturedAnime(anime) {

    const hero =
        document.getElementById(
            "featuredHero"
        );


    hero.style.backgroundImage = `
        linear-gradient(
            rgba(5,5,15,0.85),
            rgba(5,5,15,0.95)
        ),
        url(${anime.image})
    `;


    document.getElementById(
        "featuredTitle"
    ).textContent =
        anime.title;


    document.getElementById(
        "featuredDescription"
    ).textContent =
        anime.description
            .replace(/<[^>]*>/g, "")
            .slice(0, 200) + "...";


    document.getElementById(
        "featuredScore"
    ).textContent =
        `⭐ ${anime.score / 10}`;


    document.getElementById(
        "featuredYear"
    ).textContent =
        anime.year;


    // Give the hero Add To List button
    // the current anime data

    const heroListBtn =
        document.getElementById(
            "heroListBtn"
        );


    heroListBtn.dataset.id =
        anime.id;

    heroListBtn.dataset.title =
        anime.title;

    heroListBtn.dataset.image =
        anime.image;

}


