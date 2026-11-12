import type { ActivityCard, ConceptCard } from '@/types/math'

// The shape every subject's curriculum follows:
// Subject > Grade > Strand > Overall expectation (B1) > Specific expectation (B1.1)

// Every subject on the site, once. Pages take a subject's name from here,
// and a typo in a subject id is a type error
export const SUBJECTS = {
  math: { name: 'Math' },
  drama: { name: 'Drama' },
  language: { name: 'Language' },
  gym: { name: 'Gym' },
  science: { name: 'Science' },
} as const

export type SubjectId = keyof typeof SUBJECTS

// Every strand letter any subject uses. Strand colours are set per letter in
// index.css, so a letter has the same colour in every subject
export const STRAND_IDS = ['A', 'B', 'C', 'D', 'E', 'F'] as const

export type StrandId = (typeof STRAND_IDS)[number]

// Each subject picks its own letters
export type GymStrand = Extract<StrandId, 'A' | 'B' | 'C' | 'D'>
export type ScienceStrand = Extract<StrandId, 'A' | 'B' | 'C' | 'D' | 'E'>
export type MathStrand = StrandId

export interface Prompt {
  teacher: string
  // Zero or more sample student answers
  students: string[]
}

// A point in a teacher-support list, with the points printed under it
export interface SupportPoint {
  text: string
  items: SupportPoint[]
}

export interface SampleTask {
  text: string
  items: string[]
  after?: string
}

// The teacher supports the document prints under an expectation (Math):
// key concepts, examples and sample tasks
export interface TeacherSupports {
  keyConcepts: SupportPoint[]
  examples: SupportPoint[]
  tasks: SampleTask[]
  // Tools the sample tasks mention, e.g. number line
  tools: string[]
}

// The teacher supports an overall page can show, each as a tab
export type Support = 'concepts' | 'examples' | 'tasks'

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
  // The document's PDF page for it, when we have one
  page?: number
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
  // A strand of skills taught through the other strands (Gym's and
  // Science's Strand A): the Overview lists its skills, and the other
  // strands' expectations can be tagged with them
  skills?: boolean
}

// Specific expectations that are the same idea from grade to grade, though
// their codes change (Math's Fractions: B1.6 in Grade 1, B1.4 in Grade 4).
// A connection we made, so it lives in its own file
export interface Idea<S extends StrandId> {
  id: string
  strand: S
  name: string
  // The idea's specific codes in each grade
  codes: Partial<Record<number, string[]>>
}

// Key concepts and sample tasks we rewrote as cards, keyed by grade and
// code (g6-b1.1). Expectations without cards show the document's text
export interface SupportCards {
  concepts: Record<string, ConceptCard[]>
  activities: Record<string, ActivityCard[]>
}

export interface Curriculum<S extends StrandId> {
  subject: SubjectId
  // The document's slug in data/resources/ministryDocuments.ts, which has
  // its title, year and link
  documentSlug: string
  strands: Record<S, Strand>
  // Keyed by grade, e.g. "4"
  grades: Record<string, GradeExpectations<S>>
  // A strand's unit in each grade, when the document names one, e.g.
  // Science Grade 1, B: Needs and Characteristics of Living Things
  units?: Record<string, Partial<Record<S, string>>>
  // The strands' ideas, when a subject is split that way (Math). Pages
  // then group and compare specifics by idea rather than by code
  ideas?: Idea<S>[]
  // Loads one grade's teacher supports, keyed by code (B1.1). They're large,
  // so they load only when a page shows them
  supports?: (grade: number) => Promise<Record<string, TeacherSupports>>
  cards?: SupportCards
}
