import { useCallback, useEffect, useRef, useState } from 'react'
import { getScrollContainer } from '@/lib/scroll'

// Tracks which section of a long page the reader is looking at.
// `ids` are the element ids of the sections, in page order.
// A section becomes current once its top reaches the middle of the scroll
// area. At the very bottom the last section wins, because short sections at
// the end can never scroll up that far.
export function useScrollSpy(ids: string[]) {
  const [activeId, setActiveId] = useState(ids[0])
  // A section picked with jumpTo stays current until the reader scrolls by hand
  const forcedId = useRef<string | null>(null)

  const update = useCallback(() => {
    const container = getScrollContainer()
    if (!container) return

    if (forcedId.current) {
      setActiveId(forcedId.current)
      return
    }

    const line = container.getBoundingClientRect().top + container.clientHeight * 0.5
    let current = ids[0]
    for (const id of ids) {
      const section = document.getElementById(id)
      if (section && section.getBoundingClientRect().top <= line) current = id
    }

    const atBottom =
      container.scrollTop > 0 &&
      container.scrollTop + container.clientHeight >= container.scrollHeight - 4
    if (atBottom) current = ids[ids.length - 1]

    setActiveId(current)
  }, [ids])

  useEffect(() => {
    const container = getScrollContainer()
    if (!container) return

    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }
    const releaseForced = () => {
      forcedId.current = null
    }
    const manualScrollEvents = ['wheel', 'touchmove', 'keydown']

    frame = requestAnimationFrame(update)
    container.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    for (const event of manualScrollEvents) {
      window.addEventListener(event, releaseForced, { passive: true })
    }
    return () => {
      cancelAnimationFrame(frame)
      container.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      for (const event of manualScrollEvents) {
        window.removeEventListener(event, releaseForced)
      }
    }
  }, [update])

  const jumpTo = useCallback((id: string, behavior: ScrollBehavior = 'smooth') => {
    forcedId.current = id
    setActiveId(id)
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : behavior })
  }, [])

  return { activeId, jumpTo }
}
