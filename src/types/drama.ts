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
