import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Opens the page at the part the address points to, e.g. #strand-d or
// #b1.3, once the page has drawn. Pass anything that changes the page's
// content, so it jumps again when that changes
export function useHashJump(...deps: unknown[]) {
  const { hash } = useLocation()
  useEffect(() => {
    if (!hash) return
    const frame = requestAnimationFrame(() =>
      document
        .getElementById(decodeURIComponent(hash.slice(1)))
        ?.scrollIntoView()
    )
    return () => cancelAnimationFrame(frame)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hash, ...deps])
}
