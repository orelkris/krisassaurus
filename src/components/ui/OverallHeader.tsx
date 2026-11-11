import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ChevronDown, ChevronLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export interface OverallMenuItem {
  code: string
  name?: string
  // How many specific expectations it has
  count: number
  to: string
}

interface OverallHeaderProps {
  // e.g. "Overall Expectations", and where it goes. Without it the title
  // stands alone (the strand page, which the sidebar already leads back from)
  back?: { label: string; to: string }
  code: string
  name?: string
  // The strand's overall expectations, for the menu on the title. With one
  // (e.g. A1), the title is plain text
  items: OverallMenuItem[]
}

// The top of a specific expectations page: a back link (optional), then the overall's
// code and name as a big title. The title opens a menu of the strand's other
// overalls. The back link sits beside the title with a line between them;
// when the title doesn't fit on that line, the back link moves above it.
// The chevron stays with the last word, so it never sits alone on a line
function OverallHeader({ back, code, name, items }: OverallHeaderProps) {
  const [open, setOpen] = useState(false)
  const [stacked, setStacked] = useState(false)
  const rowRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  // The title is stacked when it starts lower than the back link
  useLayoutEffect(() => {
    const row = rowRef.current
    if (!row) return
    const check = () => {
      setStacked(false)
      requestAnimationFrame(() => {
        const title = titleRef.current
        const link = row.firstElementChild as HTMLElement | null
        if (title && link && link !== title)
          setStacked(title.offsetTop > link.offsetTop + link.offsetHeight / 2)
      })
    }
    check()
    const observer = new ResizeObserver(check)
    observer.observe(row)
    return () => observer.disconnect()
  }, [code, name])

  // Clicking anywhere else closes the menu
  useEffect(() => {
    if (!open) return
    const close = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [open])

  const words = (name ?? '').split(' ')
  const last = words.pop()
  const hasMenu = items.length > 1

  const title = (
    <>
      <span className="text-strand-text">{code}</span>{' '}
      {words.length > 0 && `${words.join(' ')} `}
      {/* The last word and the chevron never split */}
      <span className="whitespace-nowrap">
        {last}
        {hasMenu && (
          <span className="ml-sm inline-flex size-chevron items-center justify-center rounded-pill bg-strand align-middle text-on-primary">
            <ChevronDown
              aria-hidden="true"
              className={`size-icon transition-transform ${open ? 'rotate-180' : ''}`}
            />
          </span>
        )}
      </span>
    </>
  )

  return (
    <div ref={rowRef} className="flex flex-wrap items-center gap-x-md gap-y-sm">
      {back && (
        <>
          <Link
            to={back.to}
            className="-ml-sm row-xs shrink-0 rounded-row px-sm py-xs text-sm font-semibold text-strand-text transition-colors hover:bg-soft"
          >
            <ChevronLeft aria-hidden="true" className="size-icon" />
            {back.label}
          </Link>
          {/* The line between them; gone once the title wraps below */}
          <span
            aria-hidden="true"
            className={`h-divider w-px bg-line ${stacked ? 'hidden' : 'hidden sm:block'}`}
          />
        </>
      )}
      <div
        ref={titleRef}
        className="relative min-w-none basis-full sm:basis-auto"
      >
        <div ref={menuRef}>
          <h1 className="heading-page text-balance">
            {hasMenu ? (
              <button
                type="button"
                aria-expanded={open}
                aria-haspopup="true"
                onClick={() => setOpen(!open)}
                className="cursor-pointer text-left"
              >
                {title}
              </button>
            ) : (
              title
            )}
          </h1>
          {open && (
            <div className="absolute top-full left-none z-10 mt-sm w-menu max-w-full rounded-card border border-line bg-page p-xs shadow-menu">
              {items.map((item) =>
                item.code === code ? (
                  <span
                    key={item.code}
                    aria-current="true"
                    className="row-md rounded-row bg-strand-bg px-md py-sm text-md font-semibold"
                  >
                    <span className="w-code text-strand-text">{item.code}</span>
                    <span className="flex-1">{item.name}</span>
                    <span className="text-small">{item.count}</span>
                  </span>
                ) : (
                  <Link
                    key={item.code}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="row-md rounded-row px-md py-sm text-md transition-colors hover:bg-soft"
                  >
                    <span className="w-code font-semibold text-strand-text">
                      {item.code}
                    </span>
                    <span className="flex-1">{item.name}</span>
                    <span className="text-small">{item.count}</span>
                  </Link>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default OverallHeader
