export type ButtonVariant = 'primary' | 'secondary' | 'accent'
export type ButtonSize = 'md' | 'lg'

const variantClass: Record<ButtonVariant, string> = {
  primary: 'bg-gray-900 text-white hover:bg-gray-700',
  secondary: 'border border-gray-200 text-gray-900 hover:bg-gray-50',
  // For the one action a page is for, e.g. Start on Quick Game
  accent: 'bg-emerald-600 text-white shadow-sm hover:bg-emerald-700',
}

// lg fills its column, e.g. in a sidebar
const sizeClass: Record<ButtonSize, string> = {
  md: 'px-4 py-2 text-sm',
  lg: 'block w-full px-5 py-3 text-center text-base',
}

// Shared by Button and ButtonLink, so both look the same
export function buttonClass(
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md'
) {
  return `whitespace-nowrap rounded-full font-semibold transition-colors cursor-pointer ${sizeClass[size]} ${variantClass[variant]}`
}
