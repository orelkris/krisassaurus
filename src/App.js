import { useState } from "react";
import MainLayout from "components/layout/MainLayout";
import NavigationSidebar from "components/layout/NavigationSidebar";
import GlobalDashboard from "components/dashboard/GlobalDashboard";
import MoviesSection from "components/movies/MoviesSection";
import MoviesSidebar from "components/movies/MoviesSidebar";
import { getTestMovies } from "data/movies";

function App() {
  const [activeSection, setActiveSection] = useState("movies"); // Start with movies for testing
  const [movies, setMovies] = useState(getTestMovies()); // Start with test data
  const [recentMovieActivity, setRecentMovieActivity] = useState([]);

  const handleAddMovie = (movieData) => {
    setMovies((prev) => [...prev, movieData]);

    handleRecentMovieActivity(movieData.title);
    console.log(movieData);
  };

  const handleUpdateMovie = (movieId, updatedData) => {
    setMovies((prev) =>
      prev.map((movie) =>
        movie.id === movieId ? { ...movie, ...updatedData } : movie
      )
    );
  };

  const handleDeleteMovie = (movieId) => {
    setMovies((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  const handleRecentMovieActivity = (movieTitle) => {
    setRecentMovieActivity((prev) => [...prev.slice(0, 2), movieTitle]);
  };

  const renderContent = () => {
    switch (activeSection) {
      case "movies":
        return (
          <MoviesSection
            movies={movies}
            onUpdateMovie={handleUpdateMovie}
            onDeleteMovie={handleDeleteMovie}
          />
        );
      case "dashboard":
      default:
        return <GlobalDashboard />;
    }
  };

  const renderRightSidebar = () => {
    switch (activeSection) {
      case "movies":
        return (
          <MoviesSidebar
            movies={movies}
            onAddMovie={handleAddMovie}
            recentMovieActivity={recentMovieActivity}
          />
        );
      default:
        return null;
    }
  };

  return (
    <MainLayout
      leftSidebar={
        <NavigationSidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
      }
      rightSidebar={renderRightSidebar()}
    >
      {renderContent()}
    </MainLayout>
  );
}

export default App;
