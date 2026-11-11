interface SubjectSidebarProps {
  name: string
}

// Sidebar for subjects that don't have content yet; same heading style as
// DramaSidebar so every subject's sidebar opens the same way
function SubjectSidebar({ name }: SubjectSidebarProps) {
  return (
    <div className="hidden lg:block lg:pr-md">
      <p className="text-label mb-xs">{name}</p>
      <p className="py-xs text-sm text-faint">Posts will be listed here.</p>
    </div>
  )
}

export default SubjectSidebar
