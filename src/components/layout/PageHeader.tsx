import type { ReactNode } from 'react'

interface PageHeaderProps {
  title: ReactNode
  // Above the title, e.g. the breadcrumb
  above?: ReactNode
  description?: ReactNode
  // Anything else the header needs, under the description
  children?: ReactNode
  // A small grey line at the end, e.g. counts or a source
  meta?: ReactNode
}

// The top of every page: title, description and meta. Whatever comes next
// (tabs, sections) is the page container's next child, so it gets the same gap
function PageHeader({
  title,
  above,
  description,
  children,
  meta,
}: PageHeaderProps) {
  return (
    <header className="col-stack">
      {above}
      <h1 className="heading-page row-stack">{title}</h1>
      {description && <p className="text-lead">{description}</p>}
      {children}
      {meta && <p className="text-muted row-stack flex-wrap">{meta}</p>}
    </header>
  )
}

export default PageHeader