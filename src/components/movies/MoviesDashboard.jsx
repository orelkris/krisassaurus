import React from "react";
import { Film, Star, Clock, TrendingUp } from "lucide-react";
import MovieCard from "components/movies/MovieCard";

const MoviesDashboard = () => {
  const testMovie = {
    id: 1,
    title: "Hereditary",
    director: "Ari Aster",
    year: 2018,
    rating: 5,
    genre: "Horror",
    notes: "Absolutely terrifying! Toni Collette's performance was incredible.",
    watchedDate: "2025-08-19",
    posterUrl:
      "https://via.placeholder.com/300x450/1a1a1a/white?text=Hereditary",
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap6">
        <MovieCard
          movie={testMovie}
          onClick={(movie) => console.log("Clicked:", movie.title)}
        />
      </div>
    </div>
  );
};

export default MoviesDashboard;
