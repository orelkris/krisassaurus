import type { StrategyPair } from '@/types/drama'

// Each pair is written once and shows on both strategies' pages.
// Placeholder pairings: replace with what the course recommends.
export const pairsWith: StrategyPair[] = [
  { a: 'tableaux-still-image', b: 'tap-in-voices-in-the-head', why: 'Freeze the moment, then hear what each character is thinking.' },
  { a: 'tableaux-still-image', b: 'caption-making', why: 'A caption makes the group decide what their picture is really about.' },
  { a: 'tableaux-still-image', b: 'sequenced-tableaux-storyboards' },
  { a: 'role-on-the-wall', b: 'hot-seating', why: 'Build the character first, then interview them.' },
  { a: 'hot-seating', b: 'teacher-in-role' },
  { a: 'hot-seating', b: 'corridor-of-voices-voice-alley' },
  { a: 'teacher-in-role', b: 'news-reporting' },
  { a: 'teacher-in-role', b: 'forum-theatre' },
  { a: 'role-on-the-wall', b: 'writing-in-role' },
  { a: 'role-on-the-wall', b: 'alter-ego' },
  { a: 'tap-in-voices-in-the-head', b: 'alter-ego' },
  { a: 'sequenced-tableaux-storyboards', b: 'voice-over-narration' },
  { a: 'sequenced-tableaux-storyboards', b: 'stop-animation' },
  { a: 'soundscape', b: 'guided-visualization' },
  { a: 'soundscape', b: 'conductor' },
  { a: 'corridor-of-voices-voice-alley', b: 'thought-mapping-positioning' },
  { a: 'mirrors', b: 'pantomime' },
  { a: 'mirrors', b: 'magnetic-attraction' },
  { a: 'forum-theatre', b: 'what-if', why: 'Both replay a scene with a different choice.' },
  { a: 'forum-theatre', b: 'rolling-theatre' },
  { a: 'what-if', b: 'flash-forward-flashback' },
]

export interface PairedStrategy {
  slug: string
  why?: string
}

export function getPairs(slug: string): PairedStrategy[] {
  return pairsWith
    .filter((pair) => pair.a === slug || pair.b === slug)
    .map((pair) => ({ slug: pair.a === slug ? pair.b : pair.a, why: pair.why }))
}
