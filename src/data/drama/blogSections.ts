import type { CrossLink } from '@/types/drama'

export interface BlogSection {
  slug: string
  name: string
  path: string
  ready: boolean
  related?: CrossLink
}

// The Blog dropdown in the navbar lists these in order
export const blogSections: BlogSection[] = [
  { slug: 'personal', name: 'Personal', path: '/', ready: true },
  {
    slug: 'math',
    name: 'Math',
    path: '/blog/math',
    ready: false,
    related: {
      label: 'Looking for ways to teach math through drama?',
      linkText: 'Drama & Math',
      to: '/blog/drama/subjects/math',
    },
  },
  { slug: 'drama', name: 'Drama', path: '/blog/drama', ready: true },
  { slug: 'language', name: 'Language', path: '/blog/language', ready: false },
  { slug: 'gym', name: 'Gym', path: '/blog/gym', ready: false },
]

export function getBlogSection(slug: string): BlogSection | undefined {
  return blogSections.find((section) => section.slug === slug)
}
