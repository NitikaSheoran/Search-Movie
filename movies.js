const searchButton = document.querySelector("#searchButton");
const apiLink = `https://www.omdbapi.com/?&apikey=a01f9f54`;

async function getMovie() {
    const movieCards = document.querySelector(".movies");
    movieCards.innerHTML = ''; 
    const movieInput = document.querySelector("#search");
    const movie = movieInput.value;
    const finalLink = `${apiLink}&s=${movie}`;
    const response = await fetch(finalLink);
    const data = await response.json();
    const movies = data.Search;

    for (const movie of movies) {
        const id = movie.imdbID;
        const movieLink = `${apiLink}&i=${id}`;
        const movieResponse = await fetch(movieLink);
        const movieData = await movieResponse.json();

        const movieCard = document.createElement("div");
        movieCard.classList.add("movieCard");

        const posterUrl = movieData.Poster !== "N/A" ? movieData.Poster : "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png";

        const posterClass = movieData.Poster !== "N/A" ? "poster" : "poster noPoster";

        movieCard.innerHTML = `
        <div class="${posterClass}">
            <img src="${posterUrl}" alt="${movieData.Title} poster">
        </div>
        <div class="movieDetails">
            <h2 id="movieTitle">${movieData.Title}</h2>
            <p id="year">${movieData.Year}</p>
            <div class="moreInfo">
                <button class="moreInfoButton">More Info</button>
            </div>
        </div>
        <div class="moreDetails">
            <p id="genre">Genre: ${movieData.Genre}</p>
            <p id="director">Director: ${movieData.Director}</p>
            <p id="actors">Actors: ${movieData.Actors}</p>
            <p id="rating">Rating: ${movieData.Ratings && movieData.Ratings[0] ? movieData.Ratings[0].Value : 'N/A'}</p>
            <p id="plot">Plot: ${movieData.Plot}</p>
        </div>`;
    
            
        
        movieCards.appendChild(movieCard);
    }

    // Adding event listeners for "More Info" buttons
    const moreInfoButtons = document.querySelectorAll(".moreInfoButton");
    moreInfoButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const moreDetails = event.target.closest('.movieCard').querySelector('.moreDetails');
            if (moreDetails.style.display === 'block') {
                moreDetails.style.display = 'none';
            } else {
                moreDetails.style.display = 'block';
            }
        });
    });
}

searchButton.addEventListener("click", getMovie);


