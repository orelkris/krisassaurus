// Blocks that build a rewritten concept or activity card (see SupportCards
// in types/curriculum.ts). Text in **double stars** is bold
export interface Tile {
  label?: string
  big: string
  sub: string
}

export interface NumberLineMark {
  // Percent along the line
  at: number
  label: string
  tone?: 'right' | 'wrong'
}

export type MathBlock =
  | { type: 'text'; body: string }
  | { type: 'tiles'; items: Tile[] }
  | { type: 'steps'; items: string[] }
  | { type: 'tip'; body: string }
  // A question box; a mistake box is red and can hold tiles
  | {
      type: 'ask'
      head?: string
      question: string
      mistake?: boolean
      items?: Tile[]
    }
  // Label and value rows; the first value is the lead
  | { type: 'rows'; rows: [string, string][] }
  | { type: 'placeValue'; number: string }
  | { type: 'digits'; number: string; note?: string }
  | { type: 'periods'; periods: string[] }
  | { type: 'numberLine'; start: string; end: string; marks: NumberLineMark[] }

export interface ConceptCard {
  title: string
  summary: string
  body: string
  blocks: MathBlock[]
}

export interface ActivityCard {
  title: string
  summary: string
  blocks: MathBlock[]
  // Takes the full width of the grid
  wide?: boolean
}
