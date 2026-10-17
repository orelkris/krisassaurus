import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { getScrollContainer, scrollToTop } from '@/lib/scroll'

// How far (in px) the user must scroll before the button appears
const SHOW_AFTER = 400

function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const container = getScrollContainer()
    if (!container) return

    const handleScroll = () => setIsVisible(container.scrollTop > SHOW_AFTER)
    handleScroll()
    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isVisible) return null

  return (
    <button
      onClick={() => scrollToTop('smooth')}
      aria-label="Back to top"
      title="Back to top"
      className="fixed bottom-6 right-6 z-20 w-11 h-11 rounded-full bg-gray-900 text-white shadow-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer"
    >
      <ArrowUp size={20} />
    </button>
  )
}

export default BackToTopButton
