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
      className={`fixed right-4 bottom-4 z-10 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white text-gray-900 shadow-md transition-opacity hover:bg-gray-50 ${
        isShown ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <ArrowUp size={18} aria-hidden="true" />
    </button>
  )
}

export default BackToTop