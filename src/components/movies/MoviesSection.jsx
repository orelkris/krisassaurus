import { useState } from "react";
import { getTestMovies } from "data/movies";
import MovieCard from "components/movies/MovieCard";
import MovieDetailsModal from "components/modals/movies/MovieDetailsModal";
import ConfirmModal from "components/modals/ConfirmModal";
import { Film } from "lucide-react";

function MoviesSection({ movies = [], onUpdateMovie, onDeleteMovie }) {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movieToDelete, setMovieToDelete] = useState(null);

  const testMovies = getTestMovies();
  const displayMovies = movies.length > 0 ? movies : testMovies;

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseDetails = () => {
    setSelectedMovie(null);
  };

  const handleEditMovie = (movie) => {
    console.log("Edit movie:", movie.title);
    // TODO: Implement edit functionality
    setSelectedMovie(null);
  };

  const handleDeleteClick = (movie) => {
    setSelectedMovie(null);
    setMovieToDelete(movie);
  };

  const handleConfirmDelete = () => {
    if (movieToDelete) {
      onDeleteMovie?.(movieToDelete.id);
      console.log("Deleted movie:", movieToDelete.title);
    }
    setMovieToDelete(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Your Movies
        </h1>
        <div className="text-sm text-slate-600">
          {displayMovies.length} movie{displayMovies.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Compact Movie Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {displayMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onClick={handleMovieClick} />
        ))}
      </div>

      {displayMovies.length === 0 && (
        <div className="text-center py-12">
          <div className="text-slate-400 mb-4">
            <Film className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-slate-900 mb-2">
            No movies yet
          </h3>
          <p className="text-slate-600 mb-4">
            Start building your movie collection
          </p>
        </div>
      )}

      {/* Movie Details Modal */}
      <MovieDetailsModal
        isOpen={!!selectedMovie}
        movie={selectedMovie}
        onClose={handleCloseDetails}
        onEdit={handleEditMovie}
        onDelete={handleDeleteClick}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!movieToDelete}
        onClose={() => setMovieToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Movie"
        message={`Are you sure you want to delete "${movieToDelete?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
      />
    </div>
  );
}

export default MoviesSection;
