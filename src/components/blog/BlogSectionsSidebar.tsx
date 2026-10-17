interface BlogSectionsSidebarProps {
  name: string
}

// Sidebar for blog sections that don't have content yet; same heading style as
// DramaSidebar so every blog's sidebar opens the same way
function BlogSectionsSidebar({ name }: BlogSectionsSidebarProps) {
  return (
    <div className="hidden lg:block lg:pr-4">
      <p className="mb-1.5 text-xs uppercase tracking-wide text-gray-400">{name}</p>
      <p className="py-1 text-sm text-gray-400">Posts will be listed here.</p>
    </div>
  )
}

export default BlogSectionsSidebar
