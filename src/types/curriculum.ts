// The shape every subject's curriculum follows:
// Subject > Grade > Strand > Overall expectation (B1) > Specific expectation (B1.1)

// Every subject on the site, once. Pages take a subject's name from here,
// and a typo in a subject id is a type error
export const SUBJECTS = {
  math: { name: 'Math' },
  drama: { name: 'Drama' },
  language: { name: 'Language' },
  gym: { name: 'Gym' },
} as const

export type SubjectId = keyof typeof SUBJECTS

// Every strand letter any subject uses. Strand colours are set per letter in
// index.css, so a letter has the same colour in every subject
export const STRAND_IDS = ['A', 'B', 'C', 'D', 'E', 'F'] as const

export type StrandId = (typeof STRAND_IDS)[number]

// Each subject picks its own letters
export type GymStrand = Extract<StrandId, 'A' | 'B' | 'C' | 'D'>

export interface Prompt {
  teacher: string
  // Zero or more sample student answers
  students: string[]
}

export interface SpecificExpectation {
  description: string
  // The heading it sits under in the document, e.g. Healthy Eating
  topic?: string
  // The label from the document's topic chart, e.g. Nutrients
  shortName?: string
  // The "(e.g., …)" parts, in order
  examples: string[]
  // Where each example sits in the description (characters before it), so
  // a page can show it inline
  exampleAt?: number[]
  prompts: Prompt[]
  // Strand A skills printed after the expectation, e.g. A1.3
  tags: string[]
}

export interface OverallExpectation {
  // e.g. Active Participation; some overalls, like Gym's A1, have none
  name?: string
  description: string
  // Keyed by code, e.g. B1.1
  specifics: Record<string, SpecificExpectation>
}

// One grade: each strand's overall expectations, keyed by code, e.g. B1
export type GradeExpectations<S extends StrandId> = Partial<
  Record<S, Record<string, OverallExpectation>>
>

export interface Strand {
  name: string
  // A short text about the strand that we wrote, e.g. how Strand A is taught
  note?: string
  // The topics in the order the document prints them, when the order of
  // first use isn't right (e.g. Gym's Healthy Living chart)
  topics?: string[]
}

export interface Curriculum<S extends StrandId> {
  subject: SubjectId
  // The document's slug in data/resources/ministryDocuments.ts, which has
  // its title, year and link
  documentSlug: string
  strands: Record<S, Strand>
  // Keyed by grade, e.g. "4"
  grades: Record<string, GradeExpectations<S>>
}
