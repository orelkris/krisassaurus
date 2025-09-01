import { useState } from "react";
import { BarChart3, Plus, Filter } from "lucide-react";
import AddMovieModal from "components/modals/movies/AddMovieModal";
import { getMovieStats } from "data/movies";

const MoviesSidebar = ({ movies = [], onAddMovie, recentMovieActivity }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const stats = getMovieStats(movies);

  const handleAddMovie = (movieData) => {
    onAddMovie?.(movieData);
    setShowAddModal(false);
  };

  return (
    <div className="w-full lg:w-72 p-4 lg:p-6">
      <div className="space-y-4 lg:space-y-6">
        {/* Quick Stats */}
        <div>
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Movie Stats
          </h3>
          <div className="grid grid-cols-3 lg:grid-cols-1 gap-4 lg:space-y-3 lg:gap-0">
            <div className="text-center lg:text-left lg:flex lg:justify-between">
              <span className="text-slate-600 text-sm lg:text-base block lg:inline">
                Total Movies
              </span>
              <span className="font-medium text-lg lg:text-base block lg:inline">
                {stats.total}
              </span>
            </div>
            <div className="text-center lg:text-left lg:flex lg:justify-between">
              <span className="text-slate-600 text-sm lg:text-base block lg:inline">
                This Month
              </span>
              <span className="font-medium text-lg lg:text-base block lg:inline">
                {stats.thisMonth}
              </span>
            </div>
            <div className="text-center lg:text-left lg:flex lg:justify-between">
              <span className="text-slate-600 text-sm lg:text-base block lg:inline">
                Average Rating
              </span>
              <span className="font-medium text-lg lg:text-base block lg:inline">
                {stats.avgRating}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="text-lg font-bold text-slate-900 mb-4">
            Quick Actions
          </h3>
          <div className="flex gap-3 lg:flex-col lg:space-y-3 lg:gap-0">
            <button
              onClick={() => setShowAddModal(true)}
              className="flex-1 lg:w-full bg-indigo-600 text-white py-3 px-4 rounded-xl hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Movie</span>
            </button>
            <button className="flex-1 lg:w-full border border-slate-200 text-slate-700 py-3 px-4 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Filter</span>
            </button>
          </div>
        </div>

        {/* Recent Activity - Hidden on mobile */}
        <div className="hidden lg:block">
          <h3 className="text-lg font-bold text-slate-900 mb-4">
            Recent Activity
          </h3>
          <div className="space-y-3 text-sm">
            {recentMovieActivity.map((movie, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                <span className="text-slate-600 truncate">Added "{movie}"</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Movie Modal */}
      <AddMovieModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddMovie}
      />
    </div>
  );
};

export default MoviesSidebar;
