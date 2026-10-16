// The page scrolls inside AppLayout's content area, not the browser window,
// so scroll helpers need to target that element.
export const SCROLL_CONTAINER_ID = 'app-scroll'

export function getScrollContainer() {
  return document.getElementById(SCROLL_CONTAINER_ID)
}

export function scrollToTop(behavior: ScrollBehavior = 'auto') {
  getScrollContainer()?.scrollTo({ top: 0, behavior })
}
