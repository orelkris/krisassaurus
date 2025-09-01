import { Star, Calendar } from "lucide-react";

const Card = ({
  title,
  subtitle,
  description,
  image,
  rating,
  ratingType = "stars",
  maxRating = 5,
  tags = [],
  date,
  onClick,
  variant = "default",
  className = "",
  imageSize = "normal", // 'small' | 'normal' | 'large'
}) => {
  const renderRating = () => {
    if (ratingType === "none") return null;

    if (ratingType === "stars") {
      return (
        <div className="flex items-center gap-1">
          {[...Array(maxRating)].map((_, i) => (
            <Star
              key={i}
              className={`h-3 w-3 ${
                i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
          <span className="text-xs text-slate-600 ml-1">{rating}/5</span>
        </div>
      );
    }

    return null;
  };

  const cardVariants = {
    default: "p-4",
    compact: "p-3",
    detailed: "p-6",
  };

  const imageSizes = {
    small: "h-20 w-14", // Poster aspect ratio, small
    normal: "h-32 w-24", // Poster aspect ratio, medium
    large: "h-48 w-36", // Poster aspect ratio, large
  };

  return (
    <div
      className={`
        bg-white rounded-xl shadow-sm border border-slate-200 
        hover:shadow-md hover:border-slate-300 transition-all duration-200 cursor-pointer
        ${cardVariants[variant]} ${className}
      `}
      onClick={onClick}
    >
      <div className="flex gap-3">
        {/* Small Poster */}
        {image && (
          <div className="flex-shrink-0">
            <img
              src={image}
              alt={title}
              className={`${imageSizes[imageSize]} object-cover rounded-lg`}
              onError={(e) => {
                e.target.src = "https://picsum.photos/300/450?random=1";
              }}
            />
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0 space-y-2">
          {/* Title & Year */}
          <div>
            <h3 className="font-bold text-slate-900 text-sm leading-tight line-clamp-2">
              {title}
            </h3>
            {subtitle && (
              <p className="text-slate-600 text-xs mt-1">{subtitle}</p>
            )}
          </div>

          {/* Rating */}
          {renderRating()}

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {tags.slice(0, 2).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-md"
                >
                  {tag}
                </span>
              ))}
              {tags.length > 2 && (
                <span className="text-xs text-slate-500">
                  +{tags.length - 2}
                </span>
              )}
            </div>
          )}

          {/* Date */}
          {date && (
            <div className="flex items-center gap-1 text-slate-500 text-xs">
              <Calendar className="h-3 w-3" />
              {new Date(date).toLocaleDateString()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
