import type { CrossLink } from '@/types/drama'

export interface SubjectSection {
  slug: string
  name: string
  path: string
  ready: boolean
  // Accent for the subject, e.g. the edge of its Curriculum box
  color: string
  related?: CrossLink
}

// The Subjects dropdown in the navbar lists these in order
export const subjectSections: SubjectSection[] = [
  {
    slug: 'math',
    name: 'Math',
    path: '/math',
    ready: true,
    color: '#1f7a5c',
    related: {
      label: 'Looking for ways to teach math through drama?',
      linkText: 'Drama & Math',
      to: '/drama/subjects/math',
    },
  },
  {
    slug: 'drama',
    name: 'Drama',
    path: '/drama',
    ready: true,
    color: '#7a4fd0',
  },
  {
    slug: 'language',
    name: 'Language',
    path: '/language',
    ready: false,
    color: '#c2410c',
  },
  {
    slug: 'gym',
    name: 'Gym',
    path: '/gym',
    ready: false,
    color: '#0e7490',
  },
]

export function getSubjectSection(slug: string): SubjectSection | undefined {
  return subjectSections.find((section) => section.slug === slug)
}