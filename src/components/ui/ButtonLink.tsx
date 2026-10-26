import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { buttonClass, type ButtonSize, type ButtonVariant } from '@/lib/button'

interface ButtonLinkProps {
  children: ReactNode
  // A page on this site
  to?: string
  // A file or another website; opens in a new tab unless `download` is set
  href?: string
  download?: boolean
  // Primary is filled black, secondary is outlined, accent is green
  variant?: ButtonVariant
  size?: ButtonSize
}

// A link that looks like a button. Every button-style link on the site uses
// this, so the styles live in one place
function ButtonLink({
  children,
  to,
  href,
  download,
  variant = 'primary',
  size = 'md',
}: ButtonLinkProps) {
  const className = buttonClass(variant, size)

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
