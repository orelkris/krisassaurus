import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDown, Menu, X } from 'lucide-react'
import { blogSections } from '@/data/drama/blogSections'

const links = [
  { label: 'Resources', path: '/resources' },
  { label: 'Music', path: '/music' },
  { label: 'About', path: '/about' },
]

// Blog covers the Personal posts at "/", single posts, and every /blog section
function isBlogPath(pathname: string) {
  return (
    pathname === '/' ||
    pathname.startsWith('/post/') ||
    pathname.startsWith('/blog')
  )
}

function isSectionActive(sectionPath: string, pathname: string) {
  if (sectionPath === '/') {
    return pathname === '/' || pathname.startsWith('/post/')
  }
  return pathname.startsWith(sectionPath)
}

function Navbar() {
  const { pathname } = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const [isBlogOpen, setIsBlogOpen] = useState(false)
  const [isMobileBlogOpen, setIsMobileBlogOpen] = useState(true)
  const blogMenuRef = useRef<HTMLDivElement>(null)

  // The dropdown stays open until Blog is clicked again, a section is picked,
  // Escape is pressed, or the reader clicks somewhere else on the page.
  useEffect(() => {
    if (!isBlogOpen) return

    function handlePointerDown(event: PointerEvent) {
      if (!blogMenuRef.current?.contains(event.target as Node)) {
        setIsBlogOpen(false)
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsBlogOpen(false)
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isBlogOpen])

  const closeMenus = () => {
    setIsBlogOpen(false)
    setIsOpen(false)
  }

  const blogActive = isBlogPath(pathname)

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
          <div ref={blogMenuRef} className="relative">
            <button
              onClick={() => setIsBlogOpen(!isBlogOpen)}
              aria-expanded={isBlogOpen}
              aria-haspopup="true"
              className={`flex items-center gap-1 text-sm transition-colors cursor-pointer ${
                blogActive
                  ? 'text-gray-900 font-semibold'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Blog
              <ChevronDown
                size={14}
                className={`transition-transform ${isBlogOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {isBlogOpen && (
              <div className="absolute left-[-12px] top-full mt-3.5 min-w-48 rounded-xl border border-gray-200 bg-white p-1.5 shadow-lg flex flex-col">
                {blogSections.map((section) => (
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
                      <span className="text-xs font-normal text-gray-400">
                        soon
                      </span>
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
            onClick={() => setIsMobileBlogOpen(!isMobileBlogOpen)}
            aria-expanded={isMobileBlogOpen}
            className={`flex items-center justify-between py-3 text-sm border-b border-gray-100 cursor-pointer ${
              blogActive ? 'text-gray-900 font-semibold' : 'text-gray-500'
            }`}
          >
            Blog
            <ChevronDown
              size={14}
              className={`transition-transform ${isMobileBlogOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {isMobileBlogOpen &&
            blogSections.map((section) => (
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
