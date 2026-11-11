import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { getScrollContainer, scrollToTop } from '@/lib/scroll'

// How far down the page, in pixels, before the button shows
const showAfter = 600

// A round button in the bottom-right corner that scrolls back to the top.
// AppLayout renders it once, so every page has it
function BackToTop() {
  const [isShown, setIsShown] = useState(false)

  useEffect(() => {
    const container = getScrollContainer()
    if (!container) return
    const onScroll = () => setIsShown(container.scrollTop > showAfter)
    container.addEventListener('scroll', onScroll, { passive: true })
    return () => container.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => scrollToTop('smooth')}
      className={`fixed right-md bottom-md z-10 flex size-round cursor-pointer items-center justify-center rounded-pill border border-line bg-page text-fg shadow-float transition-opacity hover:bg-soft ${
        isShown ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <ArrowUp aria-hidden="true" className="size-icon" />
    </button>
  )
}

export default BackToTop
