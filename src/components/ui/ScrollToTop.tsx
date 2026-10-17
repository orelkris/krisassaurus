import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { scrollToTop } from '@/lib/scroll'

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
    // A link with a #section (like a strategy group) scrolls itself into place
    if (hash) return
    scrollToTop()
  }, [pathname, hash])

  return null
}

export default ScrollToTop
