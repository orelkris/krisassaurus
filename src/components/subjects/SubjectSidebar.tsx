interface SubjectSidebarProps {
  name: string
}

// Sidebar for subjects that don't have content yet; same heading style as
// DramaSidebar so every subject's sidebar opens the same way
function SubjectSidebar({ name }: SubjectSidebarProps) {
  return (
    <div className="hidden lg:block lg:pr-4">
      <p className="text-label mb-1.5">{name}</p>
      <p className="py-1 text-sm text-gray-400">Posts will be listed here.</p>
    </div>
  )
}

export default SubjectSidebar
