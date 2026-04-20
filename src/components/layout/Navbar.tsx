import { Link, useLocation } from 'react-router-dom'

const links = [
  { label: 'Blog', path: '/' },
  { label: 'Resources', path: '/resources' },
]

function Navbar() {
  const location = useLocation()

  return (
    <nav className="sticky top-0 z-10 bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="font-bold text-gray-900 text-lg">
          Teaching Journey
        </Link>

        <div className="flex gap-6">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm transition-colors ${location.pathname === link.path ? 'text-gray-900 font-semibold' : 'text-gray-500 hover:text-gray-900'}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
