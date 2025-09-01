import { X, Edit, Trash2, Calendar, Star } from "lucide-react";

const MovieDetailsModal = ({ movie, onClose, onEdit, onDelete }) => {
  if (!movie) return null;

  const renderStars = (rating) => (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-5 w-5 ${
            star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
      <span className="ml-2 font-medium">{rating}/5</span>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-start p-6 border-b border-slate-200">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-slate-900 mb-1">
              {movie.title}
            </h2>
            <p className="text-slate-600">
              {movie.director} • {movie.year}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors ml-4"
          >
            <X className="h-5 w-5 text-slate-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Poster and Basic Info */}
          <div className="flex gap-6">
            {/* Poster */}
            {movie.posterUrl && (
              <div className="flex-shrink-0">
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="w-32 h-48 object-cover rounded-xl shadow-md"
                  onError={(e) => {
                    e.target.src = "https://picsum.photos/300/450?random=1";
                  }}
                />
              </div>
            )}

            {/* Info */}
            <div className="flex-1 space-y-4">
              {/* Rating */}
              <div>
                <h3 className="text-sm font-medium text-slate-700 mb-2">
                  Your Rating
                </h3>
                {renderStars(movie.rating)}
              </div>

              {/* Genres */}
              {(movie.genres || [movie.genre]).length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-slate-700 mb-2">
                    Genres
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {(movie.genres || [movie.genre]).map((genre, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm font-medium rounded-full"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Watch Date */}
              <div>
                <h3 className="text-sm font-medium text-slate-700 mb-2">
                  Date Watched
                </h3>
                <div className="flex items-center gap-2 text-slate-600">
                  <Calendar className="h-4 w-4" />
                  {new Date(movie.watchedDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          {movie.notes && (
            <div>
              <h3 className="text-sm font-medium text-slate-700 mb-2">
                Your Notes
              </h3>
              <div className="bg-slate-50 p-4 rounded-xl">
                <p className="text-slate-700 leading-relaxed">{movie.notes}</p>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 p-6 border-t border-slate-200">
          <button
            onClick={() => onEdit?.(movie)}
            className="flex-1 py-3 px-4 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors font-medium flex items-center justify-center gap-2"
          >
            <Edit className="h-4 w-4" />
            Edit Movie
          </button>
          <button
            onClick={() => onDelete?.(movie)}
            className="flex-1 py-3 px-4 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium flex items-center justify-center gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Delete Movie
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsModal;
