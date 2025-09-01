// src/components/movies/forms/MovieForm.jsx
import StarRating from "components/ui/StarRating";
import TagSelector from "components/ui/TagSelector";
import FormField from "components/forms/FormField";
import { getAllGenres } from "data/movies";

const MovieForm = ({ formData, onFormChange, onSubmit }) => {
  const movieGenres = getAllGenres();

  const handleFieldChange = (field, value) => {
    onFormChange({ ...formData, [field]: value });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <FormField label="Movie Title" required>
        <input
          type="text"
          required
          className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter movie title"
          value={formData.title || ""}
          onChange={(e) => handleFieldChange("title", e.target.value)}
        />
      </FormField>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="Director">
          <input
            type="text"
            className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Director name"
            value={formData.director || ""}
            onChange={(e) => handleFieldChange("director", e.target.value)}
          />
        </FormField>

        <FormField label="Year">
          <input
            type="number"
            min="1900"
            max="2025"
            className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="2024"
            value={formData.year || ""}
            onChange={(e) => handleFieldChange("year", e.target.value)}
          />
        </FormField>
      </div>

      <FormField label="Date Watched">
        <input
          type="date"
          className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={formData.watchedDate || ""}
          onChange={(e) => handleFieldChange("watchedDate", e.target.value)}
        />
      </FormField>

      <FormField label="Your Rating">
        <StarRating
          rating={formData.rating || 0}
          onRatingChange={(rating) => handleFieldChange("rating", rating)}
        />
      </FormField>

      <FormField label="Genres">
        <TagSelector
          options={movieGenres}
          selectedOptions={formData.genres || []}
          onSelectionChange={(genres) => handleFieldChange("genres", genres)}
          maxSelections={3}
        />
      </FormField>

      <FormField label="Notes" description="Your thoughts about the movie">
        <textarea
          rows="4"
          className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y min-h-[100px] max-h-[200px]"
          placeholder="Your thoughts..."
          value={formData.notes || ""}
          onChange={(e) => handleFieldChange("notes", e.target.value)}
        />
      </FormField>
    </form>
  );
};

export default MovieForm;
