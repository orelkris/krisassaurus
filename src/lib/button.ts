export type ButtonVariant = 'primary' | 'secondary' | 'accent'
export type ButtonSize = 'sm' | 'md' | 'lg'

const variantClass: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-on-primary hover:bg-primary-hover',
  secondary: 'border border-line bg-page text-fg hover:bg-soft',
  // For the one action a page is for, e.g. Start on Quick Game
  accent: 'bg-accent text-on-primary shadow-sm hover:bg-accent-hover',
}

// sm sits beside small controls, e.g. in a strategy example; lg fills its
// column, e.g. in a sidebar
const sizeClass: Record<ButtonSize, string> = {
  sm: 'px-lg py-xs text-xs',
  md: 'px-md py-sm text-sm',
  lg: 'block w-full px-lg py-md text-center text-md',
}

// Shared by Button and ButtonLink, so both look the same
export function buttonClass(
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md'
) {
  return `whitespace-nowrap rounded-pill font-semibold transition-colors cursor-pointer ${sizeClass[size]} ${variantClass[variant]}`
}
