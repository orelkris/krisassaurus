import { useEffect, useState } from 'react'

// useState that is also saved in this browser, so the value is still there
// next time the page opens, or on another page that uses the same key
export function useStoredState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const saved = localStorage.getItem(key)
      if (saved !== null) return JSON.parse(saved)
    } catch {
      // Storage can be blocked, e.g. in a private window
    }
    return initial
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Not saved; the value still works until the page is closed
    }
  }, [key, value])

  return [value, setValue] as const
}
