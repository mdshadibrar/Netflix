const API_KEY = 'f83f1811db2c58accfb49f69d66a896c';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const requests = {
    fetchTrending: `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchTopRated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchActionMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=35`,
}

// Fetch movies and display them in their respective rows
async function fetchMovies(url, elementId) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        showMovies(data.results, elementId);
    } catch (error) {
        console.log('Error:', error);
    }
}

function showMovies(movies, elementId) {
    const element = document.getElementById(elementId);
    element.innerHTML = '';
    movies.forEach((movie) => {
        const movieElement = document.createElement('img');
        movieElement.src = `${IMG_URL}${movie.poster_path}`;
        movieElement.classList.add('row__poster');
        element.appendChild(movieElement);
    });
}

// Fetch random movie and display it in the banner
async function fetchRandomMovie() {
    try {
        const response = await fetch(requests.fetchTrending);
        const data = await response.json();
        const movies = data.results;
        const randomIndex = Math.floor(Math.random() * movies.length);
        const randomMovie = movies[randomIndex];
        displayBanner(randomMovie);
    } catch (error) {
        console.log('Error:', error);
    }
}

// Display the movie in the banner section
function displayBanner(movie) {
    const banner = document.querySelector('.banner');
    banner.style.backgroundImage = `url(${IMG_URL}${movie.backdrop_path})`;
    const bannerContent = `
        <div class="banner-content">
            <h1>${movie.title || movie.name}</h1>
            <p>${movie.overview}</p>
            <button class="play-btn">Play</button>
            <button class="info-btn">More Info</button>
        </div>
    `;
    banner.innerHTML = bannerContent;
}

document.addEventListener('DOMContentLoaded', () => {
    fetchRandomMovie(); // Display a random movie in the banner
    fetchMovies(requests.fetchTrending, 'trending');
    fetchMovies(requests.fetchTopRated, 'topRated');
    fetchMovies(requests.fetchActionMovies, 'actionMovies');
    fetchMovies(requests.fetchComedyMovies, 'comedyMovies');
});