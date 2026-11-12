import type {
  ArtsStrand,
  Curriculum,
  GradeConcepts,
  Term,
} from '@/types/curriculum'
import elements from './elements.json'
import expectations from './expectations.json'

// The Arts, Grades 1–8 (2009): A Dance, B Drama, C Music, D Visual Arts.
// Every strand has the same three overall expectations in every grade
// (X1 Creating and Presenting, or Performing in Music; X2 Reflecting,
// Responding, and Analysing; X3 Exploring Forms and Cultural Contexts).
// Each specific's "(e.g., …)" list and teacher prompts come from the
// document, and so does each strand's elements box in each grade.
// Build script: krisassaurus-arts/data/arts_to_curriculum.py
const byGrade = elements as Record<string, Partial<Record<ArtsStrand, Term[]>>>

// elements.json is keyed by grade, then strand; each strand's box needs its
// own grades
const conceptsOf = (strand: ArtsStrand, name: string): GradeConcepts => ({
  name,
  grades: Object.fromEntries(
    Object.entries(byGrade).map(([grade, strands]) => [
      grade,
      strands[strand] ?? [],
    ])
  ),
})

export const artsCurriculum: Curriculum<ArtsStrand> = {
  subject: 'arts',
  documentSlug: 'the-arts-1-8',
  strands: {
    A: { name: 'Dance' },
    B: { name: 'Drama' },
    C: { name: 'Music' },
    D: { name: 'Visual Arts' },
  },
  grades: expectations,
  concepts: {
    A: conceptsOf('A', 'Elements of dance'),
    B: conceptsOf('B', 'Elements of drama'),
    C: conceptsOf('C', 'Elements of music'),
    D: conceptsOf('D', 'Elements and principles of design'),
  },
  strandAtATime: true,
}
