import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDown, Menu, X } from 'lucide-react'
import { subjectSections } from '@/data/subjects'

const links = [
  { label: 'Resources', path: '/resources' },
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
    <nav className="sticky top-0 z-10 bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-8 h-14 flex items-center gap-8">
        <Link
          to="/"
          className="w-52 shrink-0 font-bold text-gray-900 text-lg"
          onClick={closeMenus}
        >
          Teaching Journey
        </Link>

        <div className="hidden lg:flex gap-6 items-center">
          <div ref={subjectsMenuRef} className="relative">
            <button
              onClick={() => setIsSubjectsOpen(!isSubjectsOpen)}
              aria-expanded={isSubjectsOpen}
              aria-haspopup="true"
              className={`row-tight text-sm transition-colors cursor-pointer ${
                subjectsActive
                  ? 'text-gray-900 font-semibold'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Subjects
              <ChevronDown
                size={14}
                className={`transition-transform ${isSubjectsOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {isSubjectsOpen && (
              <div className="absolute left-[-12px] top-full mt-3.5 min-w-48 rounded-xl border border-gray-200 bg-white p-1.5 shadow-lg flex flex-col">
                {subjectSections.map((section) => (
                  <Link
                    key={section.slug}
                    to={section.path}
                    onClick={closeMenus}
                    className={`flex justify-between gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-gray-50 ${
                      isSectionActive(section.path, pathname)
                        ? 'text-gray-900 font-semibold'
                        : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    {section.name}
                    {!section.ready && (
                      <span className="text-muted font-normal">soon</span>
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
                  ? 'text-gray-900 font-semibold'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden ml-auto cursor-pointer text-gray-500 hover:text-gray-900 transition-colors"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white px-8 py-4 flex flex-col">
          <button
            onClick={() => setIsMobileSubjectsOpen(!isMobileSubjectsOpen)}
            aria-expanded={isMobileSubjectsOpen}
            className={`flex items-center justify-between py-3 text-sm border-b border-gray-100 cursor-pointer ${
              subjectsActive ? 'text-gray-900 font-semibold' : 'text-gray-500'
            }`}
          >
            Subjects
            <ChevronDown
              size={14}
              className={`transition-transform ${isMobileSubjectsOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {isMobileSubjectsOpen &&
            subjectSections.map((section) => (
              <Link
                key={section.slug}
                to={section.path}
                onClick={closeMenus}
                className={`py-2.5 pl-4 text-sm border-b border-gray-100 transition-colors ${
                  isSectionActive(section.path, pathname)
                    ? 'text-gray-900 font-semibold'
                    : 'text-gray-500'
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
              className={`py-3 text-sm border-b border-gray-100 last:border-0 transition-colors ${
                pathname === link.path
                  ? 'text-gray-900 font-semibold'
                  : 'text-gray-500'
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
