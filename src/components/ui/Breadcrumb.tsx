import { Link } from 'react-router-dom'

export interface Crumb {
  label: string
  to?: string
}

interface BreadcrumbProps {
  items: Crumb[]
  className?: string
}

// The last item is the current page and is shown in bold, not as a link
function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={`text-[13px] ${className}`}>
      <ol className="flex flex-wrap items-baseline gap-1.5">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={item.label} className="flex items-baseline gap-1.5">
              {isLast ? (
                <span aria-current="page" className="font-semibold">
                  {item.label}
                </span>
              ) : item.to ? (
                <Link to={item.to} className="opacity-70 hover:opacity-100 hover:underline">
                  {item.label}
                </Link>
              ) : (
                <span className="opacity-70">{item.label}</span>
              )}
              {!isLast && <span className="opacity-50">/</span>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumb
