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
  // Centre the title and description (the breadcrumb stays left), e.g.
  // above a centred diagram
  centred?: boolean
}

// The top of every page: title, description and meta. Whatever comes next
// (tabs, sections) is the page container's next child, so it gets the same gap
function PageHeader({
  title,
  above,
  description,
  children,
  meta,
  centred = false,
}: PageHeaderProps) {
  return (
    <header className="col-sm">
      {above}
      <h1 className={`heading-page row-sm ${centred ? 'self-center' : ''}`}>
        {title}
      </h1>
      {description && (
        <p
          className={`text-lead ${centred ? 'self-center text-center text-balance' : ''}`}
        >
          {description}
        </p>
      )}
      {children}
      {meta && <p className="text-small row-sm flex-wrap">{meta}</p>}
    </header>
  )
}

export default PageHeader
