// ============================
// Main Application Logic
// Handles user interactions
// ============================


const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");


// Search button click event

searchBtn.addEventListener("click", async () => {

    const query = searchInput.value.trim();


    // Prevent empty searches

    if (!query) {
        return;
    }

    // loading animation

   document.getElementById("animeContainer").innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
            <p>Loading...</p>
        </div>
    `;


    // Ask backend for anime

    const data = await searchAnime(query);


    // Display results on page

    if (data.success) {

        displayAnime(data.results);

    }

});