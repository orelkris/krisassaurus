// src/components/ui/TagSelector.jsx
import { Check, X } from "lucide-react";

const TagSelector = ({
  options = [],
  selectedOptions = [],
  onSelectionChange,
  maxSelections = null,
  placeholder = "Select options",
  allowRemove = true,
  variant = "default", // 'default' | 'compact' | 'grid'
}) => {
  const toggleOption = (option) => {
    const isSelected = selectedOptions.includes(option);

    if (isSelected) {
      onSelectionChange(selectedOptions.filter((opt) => opt !== option));
    } else {
      if (maxSelections && selectedOptions.length >= maxSelections) return;
      onSelectionChange([...selectedOptions, option]);
    }
  };

  const GridLayout = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {options.map((option) => {
        const isSelected = selectedOptions.includes(option);
        const isDisabled =
          maxSelections &&
          selectedOptions.length >= maxSelections &&
          !isSelected;

        return (
          <button
            key={option}
            type="button"
            disabled={isDisabled}
            onClick={() => toggleOption(option)}
            className={`relative p-3 rounded-xl text-sm font-medium transition-all border-2 ${
              isSelected
                ? "bg-indigo-50 border-indigo-200 text-indigo-700"
                : isDisabled
                ? "bg-slate-50 border-slate-100 text-slate-400 cursor-not-allowed"
                : "bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
            }`}
          >
            <span className="block">{option}</span>
            {isSelected && (
              <Check className="absolute top-1 right-1 h-4 w-4 text-indigo-600" />
            )}
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="space-y-3">
      <GridLayout />

      {selectedOptions.length > 0 && (
        <div className="flex flex-wrap gap-2 p-3 bg-slate-50 rounded-xl">
          <span className="text-sm text-slate-600 font-medium">Selected:</span>
          {selectedOptions.map((option) => (
            <span
              key={option}
              className="inline-flex items-center gap-1 px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-lg"
            >
              {option}
              {allowRemove && (
                <button
                  type="button"
                  onClick={() => toggleOption(option)}
                  className="hover:bg-indigo-200 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagSelector;
