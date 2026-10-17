// A = Social-Emotional Learning, which runs through the other strands
export type StrandId = 'A' | 'B' | 'C' | 'D' | 'E' | 'F'
export type TaughtStrandId = Exclude<StrandId, 'A'>

export interface MathStrand {
  id: TaughtStrandId
  slug: string
  name: string
  blurb: string
  // Hex colours, applied with inline styles like the Drama groups
  colors: { bg: string; text: string; accent: string }
}

// One specific expectation, worded exactly as in the curriculum
export interface Expectation {
  // e.g. g6-b1.1
  id: string
  grade: number
  strand: TaughtStrandId
  // e.g. B1.1
  code: string
  // The overall expectation it sits under, e.g. B1 · Number Sense
  overall: string
  overallTitle: string
  text: string
  // PDF page where its teacher supports start
  page: number
}

export interface MathIdea {
  id: string
  strand: TaughtStrandId
  name: string
  // Expectation ids, grade by grade
  expectations: Partial<Record<number, string[]>>
}

// A curriculum bullet with the bullets nested under it
export interface CurriculumItem {
  text: string
  items: CurriculumItem[]
}

export interface SampleTask {
  text: string
  items: string[]
  after?: string
}

// The ministry's teacher supports for one expectation
export interface ExpectationDetails {
  keyConcepts: CurriculumItem[]
  examples: CurriculumItem[]
  tasks: SampleTask[]
  // Tools the sample tasks mention
  tools: string[]
}

// Blocks that build a concept or activity card. Text in **double stars** is bold
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
