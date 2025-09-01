// src/components/ui/StarRating.jsx
import { useState } from "react";
import { Star } from "lucide-react";

const StarRating = ({
  rating = 0,
  onRatingChange,
  maxRating = 5,
  size = "md",
  disabled = false,
  showLabel = true,
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  const StarIcon = ({ filled, star }) => (
    <button
      key={star}
      type="button"
      disabled={disabled}
      onClick={() => onRatingChange?.(star)}
      onMouseEnter={() => !disabled && setHoverRating(star)}
      onMouseLeave={() => !disabled && setHoverRating(0)}
      className={`p-1 transition-colors ${
        disabled ? "cursor-default" : "cursor-pointer"
      } ${
        filled
          ? "text-yellow-400 hover:text-yellow-500"
          : "text-gray-300 hover:text-yellow-300"
      }`}
    >
      <Star
        className={`${sizeClasses[size]} ${filled ? "fill-current" : ""}`}
      />
    </button>
  );

  return (
    <div className="flex items-center gap-1">
      {[...Array(maxRating)].map((_, index) => {
        const star = index + 1;
        const isFilled = star <= (hoverRating || rating);
        return <StarIcon key={star} filled={isFilled} star={star} />;
      })}
      {showLabel && (
        <span className="ml-2 text-sm text-slate-600">
          {rating > 0
            ? `${rating} star${rating > 1 ? "s" : ""}`
            : "Click to rate"}
        </span>
      )}
    </div>
  );
};

export default StarRating;
