import type { Curriculum, DramaStrand } from '@/types/curriculum'
import elements from './elements.json'
import expectations from './expectations.json'

// The Arts, Grades 1–8 (2009): the Drama strand, B. Its overall
// expectations (B1 Creating and Presenting, B2 Reflecting, Responding, and
// Analysing, B3 Exploring Forms and Cultural Contexts) are the same in every
// grade. Each specific's "(e.g., …)" list and teacher prompts come from the
// document, and so does each grade's Elements of drama box.
// Build script: krisassaurus-drama/data/to_curriculum.py
export const dramaCurriculum: Curriculum<DramaStrand> = {
  subject: 'drama',
  documentSlug: 'the-arts-1-8',
  strands: {
    B: { name: 'Drama' },
  },
  grades: expectations,
  concepts: { name: 'Elements of drama', grades: elements },
}
