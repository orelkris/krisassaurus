import { useState } from "react";
import { Save } from "lucide-react";
import BaseModal from "components/modals/BaseModal";
import MovieForm from "components/forms/MovieForm";

const AddMovieModal = ({ isOpen, onClose, onSave }) => {
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
      genre: formData.genres[0] || "Unspecified",
    });
    // Reset form
    setFormData({
      title: "",
      director: "",
      year: "",
      rating: 0,
      genres: [],
      notes: "",
      watchedDate: new Date().toISOString().split("T")[0],
    });
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Movie"
      size="default"
    >
      <div className="p-6">
        <MovieForm
          formData={formData}
          onFormChange={setFormData}
          onSubmit={handleSubmit}
        />

        {/* Action Buttons */}
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
    </BaseModal>
  );
};

export default AddMovieModal;
