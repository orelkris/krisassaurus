import Card from "components/ui/Card";

const MovieCard = ({ movie, onClick, variant = "compact" }) => {
  return (
    <Card
      title={movie.title}
      subtitle={`${movie.director} • ${movie.year}`}
      image={movie.posterUrl}
      rating={movie.rating}
      ratingType="stars"
      tags={movie.genres || [movie.genre]}
      date={movie.watchedDate}
      onClick={() => onClick?.(movie)}
      variant={variant}
      imageSize="small"
      className="hover:scale-[1.02]"
    />
  );
};

export default MovieCard;
