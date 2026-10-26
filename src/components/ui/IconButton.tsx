import type { ReactNode } from 'react'

interface IconButtonProps {
  // Read out by screen readers and shown on hover, since there is no text
  label: string
  // The icon, e.g. <Play size={20} />
  children: ReactNode
  onClick: () => void
  // Primary is a big filled circle for the main action; plain is quiet
  variant?: 'primary' | 'plain'
  disabled?: boolean
}

const variantClass = {
  primary: 'p-5 bg-gray-900 text-white hover:bg-gray-700',
  plain: 'p-3 text-gray-500 hover:bg-gray-100 hover:text-gray-900',
}

// A round button with only an icon, e.g. play, next or full screen
function IconButton({
  label,
  children,
  onClick,
  variant = 'plain',
  disabled = false,
}: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      disabled={disabled}
      className={`cursor-pointer rounded-full transition-colors disabled:pointer-events-none disabled:opacity-30 ${variantClass[variant]}`}
    >
      {children}
    </button>
  )
}

export default IconButton
