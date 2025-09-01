import { X } from "lucide-react";
import { useEffect } from "react";

const BaseModal = ({
  isOpen,
  onClose,
  title,
  children,
  size = "default", // 'sm' | 'default' | 'lg' | 'xl' | 'full'
  showHeader = true,
  showCloseButton = true,
  closeOnBackdrop = true,
  className = "",
}) => {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-md",
    default: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-[95vw]",
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && closeOnBackdrop) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
    >
      <div
        className={`bg-white rounded-2xl w-full ${sizeClasses[size]} max-h-[90vh] overflow-hidden flex flex-col ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {showHeader && (
          <div className="flex justify-between items-center p-6 border-b border-slate-200 flex-shrink-0">
            {title && (
              <h2 className="text-xl font-bold text-slate-900">{title}</h2>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                aria-label="Close modal"
              >
                <X className="h-5 w-5 text-slate-500" />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default BaseModal;
