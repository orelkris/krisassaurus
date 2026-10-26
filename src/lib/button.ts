export type ButtonVariant = 'primary' | 'secondary'

const variantClass: Record<ButtonVariant, string> = {
  primary: 'bg-gray-900 text-white hover:bg-gray-700',
  secondary: 'border border-gray-200 text-gray-900 hover:bg-gray-50',
}

// Shared by Button and ButtonLink, so both look the same
export function buttonClass(variant: ButtonVariant = 'primary') {
  return `whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors cursor-pointer ${variantClass[variant]}`
}
