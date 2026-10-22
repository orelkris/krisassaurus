import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface ButtonLinkProps {
  children: ReactNode
  // A page on this site
  to?: string
  // A file or another website; opens in a new tab unless `download` is set
  href?: string
  download?: boolean
  // Primary is filled black, secondary is outlined
  variant?: 'primary' | 'secondary'
}

const variantClass = {
  primary: 'bg-gray-900 text-white hover:bg-gray-700',
  secondary: 'border border-gray-200 text-gray-900 hover:bg-gray-50',
}

// A link that looks like a button. Every button-style link on the site uses
// this, so the styles live in one place
function ButtonLink({
  children,
  to,
  href,
  download,
  variant = 'primary',
}: ButtonLinkProps) {
  const className = `rounded-full px-4 py-2 text-sm font-semibold transition-colors ${variantClass[variant]}`

  if (to) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    )
  }

  if (download) {
    return (
      <a href={href} download className={className}>
        {children}
      </a>
    )
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  )
}

export default ButtonLink
