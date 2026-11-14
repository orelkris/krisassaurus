import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDown, Menu, X } from 'lucide-react'
import { subjectSections } from '@/data/subjects'
import { gameSections } from '@/data/games'

interface MenuItem {
  name: string
  path: string
  // false shows "soon" beside it
  ready?: boolean
}

// What the navbar shows, in order: a dropdown has items, a link has a path
type NavEntry =
  | { label: string; items: MenuItem[] }
  | { label: string; path: string }

const entries: NavEntry[] = [
  { label: 'Subjects', items: subjectSections },
  { label: 'Resources', path: '/resources' },
  { label: 'Games', items: gameSections },
  { label: 'Music', path: '/music' },
  { label: 'About', path: '/about' },
]

function isSectionActive(sectionPath: string, pathname: string) {
  return pathname === sectionPath || pathname.startsWith(`${sectionPath}/`)
}

// A dropdown is active on any of its pages
function isMenuActive(items: MenuItem[], pathname: string) {
  return items.some((item) => isSectionActive(item.path, pathname))
}

interface NavMenuProps {
  label: string
  items: MenuItem[]
  pathname: string
  onPick: () => void
}

// A navbar dropdown on wide screens. It stays open until its name is clicked
// again, an item is picked, Escape is pressed, or the reader clicks somewhere
// else on the page
function NavMenu({ label, items, pathname, onPick }: NavMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return

    function handlePointerDown(event: PointerEvent) {
      if (!menuRef.current?.contains(event.target as Node)) setIsOpen(false)
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsOpen(false)
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={`row-xs cursor-pointer text-sm transition-colors ${
          isMenuActive(items, pathname)
            ? 'font-semibold text-fg'
            : 'text-muted hover:text-fg'
        }`}
      >
        {label}
        <ChevronDown
          className={`size-icon-sm transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full -left-md mt-md flex min-w-dropdown flex-col rounded-card border border-line bg-page p-xs shadow-menu">
          {items.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => {
                setIsOpen(false)
                onPick()
              }}
              className={`flex justify-between gap-md rounded-row px-md py-sm text-sm transition-colors hover:bg-soft ${
                isSectionActive(item.path, pathname)
                  ? 'font-semibold text-fg'
                  : 'text-muted hover:text-fg'
              }`}
            >
              {item.name}
              {item.ready === false && (
                <span className="text-note font-normal">soon</span>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

// A dropdown in the phone menu: its name opens and closes its items
function MobileNavMenu({ label, items, pathname, onPick }: NavMenuProps) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className={`flex cursor-pointer items-center justify-between border-b border-line py-md text-sm ${
          isMenuActive(items, pathname) ? 'font-semibold text-fg' : 'text-muted'
        }`}
      >
        {label}
        <ChevronDown
          className={`size-icon-sm transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen &&
        items.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={onPick}
            className={`border-b border-line py-sm pl-md text-sm transition-colors ${
              isSectionActive(item.path, pathname)
                ? 'font-semibold text-fg'
                : 'text-muted'
            }`}
          >
            {item.name}
          </Link>
        ))}
    </>
  )
}

function Navbar() {
  const { pathname } = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const closeMenu = () => setIsOpen(false)

  return (
    <nav className="sticky top-none z-10 border-b border-line bg-page">
      <div className="mx-auto flex h-nav max-w-site items-center gap-xl px-xl">
        <Link
          to="/"
          className="w-logo shrink-0 text-lg font-bold text-fg"
          onClick={closeMenu}
        >
          Teaching Journey
        </Link>

        <div className="hidden items-center gap-lg lg:flex">
          {entries.map((entry) =>
            'items' in entry ? (
              <NavMenu
                key={entry.label}
                label={entry.label}
                items={entry.items}
                pathname={pathname}
                onPick={closeMenu}
              />
            ) : (
              <Link
                key={entry.path}
                to={entry.path}
                className={`text-sm transition-colors ${
                  pathname === entry.path
                    ? 'font-semibold text-fg'
                    : 'text-muted hover:text-fg'
                }`}
              >
                {entry.label}
              </Link>
            )
          )}
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
          {entries.map((entry) =>
            'items' in entry ? (
              <MobileNavMenu
                key={entry.label}
                label={entry.label}
                items={entry.items}
                pathname={pathname}
                onPick={closeMenu}
              />
            ) : (
              <Link
                key={entry.path}
                to={entry.path}
                onClick={closeMenu}
                className={`border-b border-line py-md text-sm transition-colors last:border-0 ${
                  pathname === entry.path
                    ? 'font-semibold text-fg'
                    : 'text-muted'
                }`}
              >
                {entry.label}
              </Link>
            )
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar
