// src/components/ui/FormField.jsx
const FormField = ({
  label,
  children,
  error,
  required = false,
  description,
  className = "",
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-slate-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {description && <p className="text-sm text-slate-600">{description}</p>}
      {children}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default FormField;
