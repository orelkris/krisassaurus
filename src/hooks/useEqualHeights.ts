import { useLayoutEffect, type RefObject } from 'react'

interface EqualHeightsOptions {
  // Match only the cards that sit side by side on the same row
  perRow?: boolean
  // Below this width the cards stack, so they keep their own heights
  minWidth?: number
}

// Gives the cards matching `selector` inside `containerRef` one shared height:
// the tallest card's. Re-runs when the window resizes or the fonts load.
// `deps` re-run it when the cards change
export function useEqualHeights(
  containerRef: RefObject<HTMLElement | null>,
  selector: string,
  { perRow = false, minWidth = 900 }: EqualHeightsOptions = {},
  deps: unknown[] = []
) {
  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return

    const equalize = () => {
      const cards = [...container.querySelectorAll<HTMLElement>(selector)]
      cards.forEach((card) => (card.style.minHeight = ''))
      if (window.innerWidth < minWidth) return

      const groups: HTMLElement[][] = []
      if (perRow) {
        const rows = new Map<number, HTMLElement[]>()
        cards.forEach((card) =>
          rows.set(card.offsetTop, [...(rows.get(card.offsetTop) ?? []), card])
        )
        groups.push(...rows.values())
      } else {
        groups.push(cards)
      }

      groups.forEach((group) => {
        const height = Math.max(...group.map((card) => card.offsetHeight))
        group.forEach((card) => (card.style.minHeight = `${height}px`))
      })
    }

    equalize()
    document.fonts?.ready.then(equalize)
    window.addEventListener('resize', equalize)
    return () => window.removeEventListener('resize', equalize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef, selector, perRow, minWidth, ...deps])
}
