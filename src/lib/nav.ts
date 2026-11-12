// A link in a sidebar group, e.g. a Drama subject: the current one in bold
export const navLinkClass = (isCurrent: boolean) =>
  `flex items-center justify-between gap-xs py-xs text-sm transition-colors ${
    isCurrent ? 'font-semibold text-fg' : 'text-muted hover:text-fg'
  }`
