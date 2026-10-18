import type { CrossLink } from '@/types/drama'

export interface SubjectSection {
  slug: string
  name: string
  path: string
  ready: boolean
  related?: CrossLink
}

// The Subjects dropdown in the navbar lists these in order
export const subjectSections: SubjectSection[] = [
  {
    slug: 'math',
    name: 'Math',
    path: '/math',
    ready: true,
    related: {
      label: 'Looking for ways to teach math through drama?',
      linkText: 'Drama & Math',
      to: '/drama/subjects/math',
    },
  },
  { slug: 'drama', name: 'Drama', path: '/drama', ready: true },
  { slug: 'language', name: 'Language', path: '/language', ready: false },
  { slug: 'gym', name: 'Gym', path: '/gym', ready: false },
]

export function getSubjectSection(slug: string): SubjectSection | undefined {
  return subjectSections.find((section) => section.slug === slug)
}
