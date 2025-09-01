import BaseModal from "./BaseModal";

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to continue?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger", // 'danger' | 'warning' | 'info'
}) => {
  const variantStyles = {
    danger: "bg-red-600 hover:bg-red-700 text-white",
    warning: "bg-yellow-600 hover:bg-yellow-700 text-white",
    info: "bg-indigo-600 hover:bg-indigo-700 text-white",
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div className="p-6">
        <p className="text-slate-700 mb-6">{message}</p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2 px-4 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`flex-1 py-2 px-4 rounded-lg transition-colors ${variantStyles[variant]}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </BaseModal>
  );
};

export default ConfirmModal;
