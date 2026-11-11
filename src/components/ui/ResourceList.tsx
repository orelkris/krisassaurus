export interface ResourceRow {
  // What kind it is, e.g. Lesson plan
  kind: string
  title: string
  url: string
  // Who made it, e.g. Ophea
  source: string
}

interface ResourceListProps {
  resources: ResourceRow[]
}

// Outside resources as a list of links that open in a new tab: the kind in a
// small tinted chip, the title, and who made it. On phones the chip and the
// source share the top line and the title goes under them
function ResourceList({ resources }: ResourceListProps) {
  return (
    <div className="divide-y divide-line rounded-card border border-line">
      {resources.map((resource) => (
        <a
          key={resource.url}
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-wrap items-baseline gap-x-md gap-y-xs px-md py-sm transition-colors first:rounded-t-card last:rounded-b-card hover:bg-soft"
        >
          <span className="order-1 rounded-pill bg-strand-bg px-sm text-xs font-semibold whitespace-nowrap text-strand-text">
            {resource.kind}
          </span>
          <span className="order-3 basis-full text-md text-fg sm:order-2 sm:basis-auto sm:flex-1">
            {resource.title}
          </span>
          <span className="order-2 ml-auto text-sm whitespace-nowrap text-muted sm:order-3">
            {resource.source}
          </span>
        </a>
      ))}
    </div>
  )
}

export default ResourceList
