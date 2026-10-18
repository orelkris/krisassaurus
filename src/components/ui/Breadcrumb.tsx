export interface Crumb {
  label: string
}

interface BreadcrumbProps {
  items: Crumb[]
  className?: string
}

// Shows where the page sits. It isn't clickable: the sidebar is how you move around.
// The last item is the current page and is shown in bold
function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={`text-[13px] ${className}`}>
      <ol className="flex flex-wrap items-baseline gap-1.5">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={item.label} className="flex items-baseline gap-1.5">
              <span
                aria-current={isLast ? 'page' : undefined}
                className={isLast ? 'font-semibold' : 'opacity-70'}
              >
                {item.label}
              </span>
              {!isLast && <span className="opacity-50">/</span>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumb
