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
  name: string
  blurb: string
  // Hex colours, applied with inline styles like tagColors
  colors: { bg: string; text: string; accent: string }
  // Typical facts for the family; a strategy can override any of them
  defaultFacts: QuickFacts
}

export interface StrategyDetails {
  what: string
  steps: string[]
  example: string
  variations: string[]
}

export interface Strategy {
  slug: string
  name: string
  groupId: StrategyGroupId
  summary: string
  facts?: Partial<QuickFacts>
  // Pages without details show the summary and a "draft" note
  details?: StrategyDetails
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
