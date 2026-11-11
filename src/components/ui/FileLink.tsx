interface FileLinkProps {
  href: string
  title: string
  // The short label on the badge, e.g. PDF
  kind: string
}

// A small card that opens a file in a new tab
function FileLink({ href, title, kind }: FileLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex max-w-narrow items-center gap-md rounded-row border border-line px-md py-sm transition-colors hover:border-danger hover:bg-soft"
    >
      <span className="shrink-0 rounded-badge bg-danger px-xs py-xs text-xs font-extrabold text-on-primary">
        {kind}
      </span>
      <span>
        <span className="block text-sm font-semibold text-fg">{title}</span>
        <span className="text-small block">Opens in a new tab</span>
      </span>
    </a>
  )
}

export default FileLink
