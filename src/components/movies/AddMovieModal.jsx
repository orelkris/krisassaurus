// src/components/movies/AddMovieModal.jsx
import { useState } from "react";
import { X, Save } from "lucide-react";
import MovieForm from "components/forms/MovieForm";

const AddMovieModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    director: "",
    year: "",
    rating: 0,
    genres: [],
    notes: "",
    watchedDate: new Date().toISOString().split("T")[0],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: Date.now(),
      year: parseInt(formData.year) || new Date().getFullYear(),
      genre: formData.genres[0] || "Unspecified", // For backwards compatibility
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">Add Movie</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-slate-500" />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6">
          <MovieForm
            formData={formData}
            onFormChange={setFormData}
            onSubmit={handleSubmit}
          />

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6 mt-6 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 py-3 px-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-medium flex items-center justify-center gap-2"
            >
              <Save className="h-4 w-4" />
              Save Movie
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMovieModal;
