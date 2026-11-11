import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDown, Menu, X } from 'lucide-react'
import { subjectSections } from '@/data/subjects'

const links = [
  { label: 'Resources', path: '/resources' },
  { label: 'Quick Game', path: '/quick-game' },
  { label: 'Music', path: '/music' },
  { label: 'About', path: '/about' },
]

function isSectionActive(sectionPath: string, pathname: string) {
  return pathname === sectionPath || pathname.startsWith(`${sectionPath}/`)
}

// Subjects is active on any subject's pages
function isSubjectPath(pathname: string) {
  return subjectSections.some((section) =>
    isSectionActive(section.path, pathname)
  )
}

function Navbar() {
  const { pathname } = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const [isSubjectsOpen, setIsSubjectsOpen] = useState(false)
  const [isMobileSubjectsOpen, setIsMobileSubjectsOpen] = useState(true)
  const subjectsMenuRef = useRef<HTMLDivElement>(null)

  // The dropdown stays open until Subjects is clicked again, a subject is picked,
  // Escape is pressed, or the reader clicks somewhere else on the page.
  useEffect(() => {
    if (!isSubjectsOpen) return

    function handlePointerDown(event: PointerEvent) {
      if (!subjectsMenuRef.current?.contains(event.target as Node)) {
        setIsSubjectsOpen(false)
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsSubjectsOpen(false)
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isSubjectsOpen])

  const closeMenus = () => {
    setIsSubjectsOpen(false)
    setIsOpen(false)
  }

  const subjectsActive = isSubjectPath(pathname)

  return (
    <nav className="sticky top-none z-10 border-b border-line bg-page">
      <div className="mx-auto flex h-nav max-w-site items-center gap-xl px-xl">
        <Link
          to="/"
          className="w-logo shrink-0 text-lg font-bold text-fg"
          onClick={closeMenus}
        >
          Teaching Journey
        </Link>

        <div className="hidden items-center gap-lg lg:flex">
          <div ref={subjectsMenuRef} className="relative">
            <button
              onClick={() => setIsSubjectsOpen(!isSubjectsOpen)}
              aria-expanded={isSubjectsOpen}
              aria-haspopup="true"
              className={`row-xs cursor-pointer text-sm transition-colors ${
                subjectsActive
                  ? 'font-semibold text-fg'
                  : 'text-muted hover:text-fg'
              }`}
            >
              Subjects
              <ChevronDown
                className={`size-icon-sm transition-transform ${isSubjectsOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {isSubjectsOpen && (
              <div className="absolute top-full -left-md mt-md flex min-w-dropdown flex-col rounded-card border border-line bg-page p-xs shadow-menu">
                {subjectSections.map((section) => (
                  <Link
                    key={section.slug}
                    to={section.path}
                    onClick={closeMenus}
                    className={`flex justify-between gap-md rounded-row px-md py-sm text-sm transition-colors hover:bg-soft ${
                      isSectionActive(section.path, pathname)
                        ? 'font-semibold text-fg'
                        : 'text-muted hover:text-fg'
                    }`}
                  >
                    {section.name}
                    {!section.ready && (
                      <span className="text-note font-normal">soon</span>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm transition-colors ${
                pathname === link.path
                  ? 'font-semibold text-fg'
                  : 'text-muted hover:text-fg'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="ml-auto cursor-pointer text-muted transition-colors hover:text-fg lg:hidden"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? (
            <X aria-hidden="true" className="size-icon-lg" />
          ) : (
            <Menu aria-hidden="true" className="size-icon-lg" />
          )}
        </button>
      </div>

      {isOpen && (
        <div className="flex flex-col border-t border-line bg-page px-xl py-md lg:hidden">
          <button
            onClick={() => setIsMobileSubjectsOpen(!isMobileSubjectsOpen)}
            aria-expanded={isMobileSubjectsOpen}
            className={`flex cursor-pointer items-center justify-between border-b border-line py-md text-sm ${
              subjectsActive ? 'font-semibold text-fg' : 'text-muted'
            }`}
          >
            Subjects
            <ChevronDown
              className={`size-icon-sm transition-transform ${isMobileSubjectsOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {isMobileSubjectsOpen &&
            subjectSections.map((section) => (
              <Link
                key={section.slug}
                to={section.path}
                onClick={closeMenus}
                className={`border-b border-line py-sm pl-md text-sm transition-colors ${
                  isSectionActive(section.path, pathname)
                    ? 'font-semibold text-fg'
                    : 'text-muted'
                }`}
              >
                {section.name}
              </Link>
            ))}

          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={closeMenus}
              className={`border-b border-line py-md text-sm transition-colors last:border-0 ${
                pathname === link.path ? 'font-semibold text-fg' : 'text-muted'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}

export default Navbar
