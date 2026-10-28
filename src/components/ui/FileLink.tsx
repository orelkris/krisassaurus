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
      className="flex max-w-sm items-center gap-3 rounded-[10px] border border-gray-200 px-3.5 py-2.5 transition-colors hover:border-red-500 hover:bg-gray-50"
    >
      <span className="shrink-0 rounded-md bg-red-500 px-1.5 py-1.5 text-[10px] font-extrabold text-white">
        {kind}
      </span>
      <span>
        <span className="block text-sm font-semibold text-gray-900">
          {title}
        </span>
        <span className="text-small block">Opens in a new tab</span>
      </span>
    </a>
  )
}

export default FileLink
