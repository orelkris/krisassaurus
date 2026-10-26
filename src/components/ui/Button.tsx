import type { ReactNode } from 'react'
import { buttonClass, type ButtonVariant } from '@/lib/button'

interface ButtonProps {
  children: ReactNode
  onClick: () => void
  // Primary is filled black, secondary is outlined
  variant?: ButtonVariant
  disabled?: boolean
}

// A button that does something on the page. For a button that goes
// somewhere, use ButtonLink
function Button({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
}: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${buttonClass(variant)} disabled:pointer-events-none disabled:opacity-30`}
    >
      {children}
    </button>
  )
}

export default Button
