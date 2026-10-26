import { useEffect, useState, type RefObject } from 'react'

// Puts one element in full screen and tracks whether it is, including when
// the reader leaves with Escape
export function useFullScreen(ref: RefObject<HTMLElement | null>) {
  const [isFullScreen, setIsFullScreen] = useState(false)

  useEffect(() => {
    const handleChange = () =>
      setIsFullScreen(document.fullscreenElement === ref.current)
    document.addEventListener('fullscreenchange', handleChange)
    return () => document.removeEventListener('fullscreenchange', handleChange)
  }, [ref])

  const toggle = () => {
    if (document.fullscreenElement) document.exitFullscreen()
    else ref.current?.requestFullscreen?.().catch(() => {})
  }

  return { isFullScreen, toggle }
}
