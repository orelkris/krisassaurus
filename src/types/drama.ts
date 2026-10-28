export type StrategyGroupId =
  | 'role-play'
  | 'tableaux'
  | 'voice-and-sound'
  | 'movement'
  | 'scene-work'

export interface QuickFacts {
  time: string
  grouping: string
  grades: string
}

export interface StrategyGroup {
  id: StrategyGroupId
  // The letter on its badge, e.g. R
  code: string
  name: string
  blurb: string
  // Hex colours, applied with inline styles like tagColors
  colors: { bg: string; text: string; accent: string }
  // Typical facts for the family; a strategy can override any of them
  defaultFacts: QuickFacts
}

// One part of a strategy page: a heading and its paragraphs
export interface StrategySection {
  heading: string
  paragraphs: string[]
}

export interface Strategy {
  slug: string
  name: string
  groupId: StrategyGroupId
  summary: string
  facts?: Partial<QuickFacts>
  // The page's text, in order, for pages that don't have a JSON page file
  // yet. Pages with neither show a "draft" note
  sections?: StrategySection[]
}

// One piece of a strategy page section
export type StrategyBlock =
  | { type: 'text'; text: string }
  // Numbered steps, each starting with a bold lead-in, with an optional
  // bullet list under the step
  | {
      type: 'steps'
      items: { lead: string; text: string; items?: string[] }[]
    }
  // A paragraph that starts with a bold label, e.g. "Bonus tip:"
  | { type: 'tip'; lead: string; text: string }
  | { type: 'bullets'; items: string[] }
  // A line someone says, set off from the text
  | { type: 'quote'; text: string }

export interface StrategyPageSection {
  heading: string
  blocks: StrategyBlock[]
}

// How a line is said in an example, e.g. a LOUD line or a soft one
export type LineStyle = 'shaky' | 'loud' | 'soft' | 'heart'

// One student's line in a sequence example
export interface SpokenLine {
  text: string
  style?: LineStyle
}

// One way to run a sequence, e.g. Count off or Level it up
export interface SequenceVersion {
  label: string
  // A question shown above the students, e.g. for Level it up
  prompt?: string
  // One per student, in speaking order. Students past the end say the filler
  lines: SpokenLine[]
}

// The interactive example at the top of a strategy page. kind picks the
// widget; the other fields set it up
export type StrategyExample =
  | {
      kind: 'timer'
      title: string
      // The lengths to pick from, and the one picked at the start
      minutes: number[]
      start: number
      placeholder: string
    }
  | {
      // Students speak one after another
      kind: 'sequence'
      title: string
      button: string
      students: number
      // row: one line of students; tunnel: two lines facing each other, with
      // a walker passing between them (lines alternate sides)
      layout: 'row' | 'tunnel'
      // Shows each student's number on their shirt
      numbered?: boolean
      // Time between speakers
      stepMs: number
      // What a student without a line says, e.g. … or a heart
      filler: SpokenLine
      versions: SequenceVersion[]
    }
  | {
      // Columns of phrases, said aloud one at a time
      kind: 'phrases'
      title: string
      // A short line under the title, e.g. which story the phrases are from
      note?: string
      button: string
      stepMs: number
      columns: { heading: string; phrases: string[] }[]
      // Ways to play them. columns: every phrase in column 1, then column 2;
      // alternate: the first phrase of each column, then the second...
      // Without rounds, the phrases play by columns
      rounds?: { label: string; order: 'columns' | 'alternate' }[]
    }
  | {
      // A drawn tableau. tap: tap a student to hear their thought; freeze:
      // count down, then the picture appears
      kind: 'scene'
      mode: 'tap' | 'freeze'
      title: string
      button: string
      // Which drawing, e.g. summer-house
      scene: string
      // tap: each student's line, by their letter. Students in a pair speak
      // together
      people?: { id: string; line: string; pair?: string }[]
      // tap: the order the button taps students in
      flow?: string[]
    }
  | {
      // Students answer a question with their body. pick: choose an answer
      // to see it drawn, with what it means; poll: the button gives every
      // student a random answer, then counts them
      kind: 'choice'
      mode: 'pick' | 'poll'
      title: string
      // The question, shown above the drawing
      prompt: string
      // pose: pick: where the student is on the chair (on-top, sitting,
      // behind, under); poll: which way the thumb points (up, middle, down)
      options: { label: string; pose: string; line?: string }[]
      // pick: the answer shown at the start
      start?: number
      // poll: the button, and how many students answer
      button?: string
      students?: number
    }
  | {
      // Cards turned over one at a time, e.g. the parts of a story
      kind: 'reveal'
      title: string
      button: string
      stepMs: number
      cards: { label: string; text: string }[]
      // Lets one card's text be switched, e.g. a relationship for younger
      // students. card is its place in cards, from 0
      swap?: {
        label: string
        card: number
        options: { label: string; text: string }[]
      }
    }

// Everything on a strategy page below its header, from
// data/drama/strategyPages/<slug>.json
export interface StrategyPageContent {
  example?: StrategyExample
  sections: StrategyPageSection[]
}

export interface StrategyPair {
  a: string
  b: string
  why?: string
}

export interface CrossLink {
  label: string
  linkText: string
  to: string
}

export interface DramaSubject {
  slug: string
  name: string
  intro: string
  related?: CrossLink
}

// The Drama strand of The Arts 1–8 (2009). Its three overall expectations
// (B1, B2, B3) are the strands of the Drama pages
export type DramaStrandId = 'B1' | 'B2' | 'B3'

export interface DramaStrand {
  id: DramaStrandId
  slug: string
  name: string
  blurb: string
  colors: { bg: string; text: string; accent: string }
}

export interface DramaPrompt {
  // e.g. In role, Out of role
  label?: string
  text: string
}

// One specific expectation, worded exactly as in the curriculum
export interface DramaExpectation {
  // e.g. g6-b1.1
  id: string
  grade: number
  strand: DramaStrandId
  // e.g. B1.1, the same numbers in every grade
  code: string
  text: string
}

// The curriculum's examples and teacher prompts for one expectation. They
// load only when its page opens
export interface DramaDetails {
  examples: string[]
  prompts: DramaPrompt[]
}

// What the Drama curriculum filter has picked. Nothing picked is the overview
export interface DramaFilter {
  grade?: number
  strand?: DramaStrandId
  // Only used on a strand page with no grade picked, e.g. B1.2
  code?: string
}
