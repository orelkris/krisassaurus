import type { DramaStrand, DramaStrandId } from '@/types/drama'

export const dramaGrades = [1, 2, 3, 4, 5, 6, 7, 8]

export const dramaStrands: DramaStrand[] = [
  {
    id: 'B1',
    slug: 'creating-and-presenting',
    name: 'Creating and Presenting',
    blurb:
      'Making drama: role play, the elements of drama, and planning and sharing work with an audience.',
    colors: { bg: '#F1EBFE', text: '#5B21B6', accent: '#7C3AED' },
  },
  {
    id: 'B2',
    slug: 'reflecting-responding-and-analysing',
    name: 'Reflecting, Responding, and Analysing',
    blurb:
      'Responding to drama: personal reactions, drama vocabulary, and strengths and next steps.',
    colors: { bg: '#FCE8F1', text: '#9D174D', accent: '#C0267A' },
  },
  {
    id: 'B3',
    slug: 'exploring-forms-and-cultural-contexts',
    name: 'Exploring Forms and Cultural Contexts',
    blurb:
      'Drama and theatre forms, and the place of drama in communities past and present.',
    colors: { bg: '#E8E8FD', text: '#3730A3', accent: '#4F46E5' },
  },
]

export function getDramaStrand(id: DramaStrandId): DramaStrand {
  return dramaStrands.find((strand) => strand.id === id) ?? dramaStrands[0]
}

export function getDramaStrandBySlug(slug: string): DramaStrand | undefined {
  return dramaStrands.find((strand) => strand.slug === slug)
}

// A short name for each expectation number, the same in every grade
export const dramaTopics: Record<string, string> = {
  'B1.1': 'Role play',
  'B1.2': 'Elements of drama',
  'B1.3': 'Planning and shaping',
  'B1.4': 'Presenting with aids',
  'B2.1': 'Personal response',
  'B2.2': 'Drama terminology',
  'B2.3': 'Strengths and next steps',
  'B3.1': 'Drama and theatre forms',
  'B3.2': 'Drama in communities',
}

// The expectation numbers in a strand, e.g. B1.1 to B1.4
export function getCodesInStrand(strand: DramaStrandId): string[] {
  return Object.keys(dramaTopics).filter((code) => code.startsWith(strand))
}

// Printed page where each grade's Drama expectations start in The Arts 1–8
export const dramaGradePages: Record<number, number> = {
  1: 68,
  2: 78,
  3: 88,
  4: 102,
  5: 112,
  6: 124,
  7: 138,
  8: 150,
}
