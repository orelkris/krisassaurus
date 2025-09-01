import testMoviesData from "data/movies/testMovies.json";
import genresData from "data/movies/genres.json";

// Movie data functions
export const getTestMovies = () => testMoviesData;

export const getMovieById = (id) =>
  testMoviesData.find((movie) => movie.id === id);

export const getMoviesByGenre = (genre) =>
  testMoviesData.filter(
    (movie) => movie.genres.includes(genre) || movie.genre === genre
  );

export const getMoviesByDirector = (director) =>
  testMoviesData.filter((movie) =>
    movie.director.toLowerCase().includes(director.toLowerCase())
  );

export const getMoviesByRating = (minRating) =>
  testMoviesData.filter((movie) => movie.rating >= minRating);

// Genre data functions
export const getAllGenres = () => genresData.allGenres;

export const getGenreCategories = () => genresData.categories;

export const getGenresByCategory = (category) =>
  genresData.categories[category] || [];

// Stats functions
export const getMovieStats = (movies = testMoviesData) => ({
  total: movies.length,
  avgRating:
    movies.length > 0
      ? +(
          movies.reduce((sum, movie) => sum + movie.rating, 0) / movies.length
        ).toFixed(1)
      : 0,
  byGenre: movies.reduce((acc, movie) => {
    movie.genres.forEach((genre) => {
      acc[genre] = (acc[genre] || 0) + 1;
    });
    return acc;
  }, {}),
  thisMonth: movies.filter((movie) => {
    const movieDate = new Date(movie.watchedDate);
    const now = new Date();
    return (
      movieDate.getMonth() === now.getMonth() &&
      movieDate.getFullYear() === now.getFullYear()
    );
  }).length,
});
