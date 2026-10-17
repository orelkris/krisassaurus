// Pieces of curriculum text, so numbers and expressions don't break across lines
export interface TextPiece {
  text: string
  // Keep this piece on one line
  keep: boolean
}

// One side of an expression like (10 + 2) × 7. Lines may still break at "="
const EXPRESSION =
  /\(*\d[\d.,\u00a0]*\)*(?:\s?[×÷+−–-]\s?\(*\d[\d.,\u00a0]*\)*)+/g

// Longer expressions may wrap, or they would run off a phone screen
const MAX_KEPT = 28

// Spaced numbers like 1 000 000 get non-breaking spaces. Very long ones (like
// the Planck length written out) may still wrap
export function joinNumbers(text: string): string {
  return text.replace(/\d[\d.,]*(?: \d{3}\b[\d.,]*)+/g, (number) =>
    number.length <= MAX_KEPT ? number.replace(/ /g, '\u00a0') : number
  )
}

export function splitMathText(text: string): TextPiece[] {
  const joined = joinNumbers(text)
  const pieces: TextPiece[] = []
  let last = 0
  for (const match of joined.matchAll(EXPRESSION)) {
    const start = match.index ?? 0
    if (start > last)
      pieces.push({ text: joined.slice(last, start), keep: false })
    pieces.push({ text: match[0], keep: match[0].length <= MAX_KEPT })
    last = start + match[0].length
  }
  if (last < joined.length)
    pieces.push({ text: joined.slice(last), keep: false })
  return pieces
}

// Curriculum style: 4000, but 40 000
export function formatNumber(value: number): string {
  return value < 10000
    ? String(value)
    : String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}
