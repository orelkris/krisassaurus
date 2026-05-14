import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'Blog', path: '/' },
  { label: 'Resources', path: '/resources' },
  { label: 'Music', path: '/music' },
  { label: 'About', path: '/about' },
]

function Navbar() {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-10 bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-8 h-14 flex items-center gap-8">
        <Link
          to="/"
          className="w-52 shrink-0 font-bold text-gray-900 text-lg"
          onClick={() => setIsOpen(false)}
        >
          Teaching Journey
        </Link>

        <div className="hidden lg:flex gap-6">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm transition-colors ${
                location.pathname === link.path
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
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`py-3 text-sm border-b border-gray-100 last:border-0 transition-colors ${
                location.pathname === link.path
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
