// A colour set from index.css as CSS variables: the strong colour, its light
// tint (bg) and dark text for on the tint. For components that take colours
// as props. A theme only changes index.css
export interface ColorSet {
  bg: string
  text: string
  accent: string
}

// e.g. colorSet('strand-b') reads --color-strand-b, -bg and -text
export function colorSet(name: string): ColorSet {
  return {
    bg: `var(--color-${name}-bg)`,
    text: `var(--color-${name}-text)`,
    accent: `var(--color-${name})`,
  }
}
