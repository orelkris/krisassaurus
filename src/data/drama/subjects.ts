import type { DramaSubject } from '@/types/drama'

export const dramaSubjects: DramaSubject[] = [
  {
    slug: 'language-arts',
    name: 'Language Arts',
    intro: 'Drama as a way into reading, writing and oral language.',
  },
  {
    slug: 'math',
    name: 'Math',
    intro: 'Acting out problems, patterns and shapes to make math visible.',
    related: {
      label: 'Looking for math posts without drama?',
      linkText: 'Blog → Math',
      to: '/blog/math',
    },
  },
  {
    slug: 'science',
    name: 'Science',
    intro: 'Bodies and voices model processes that are hard to see.',
  },
  {
    slug: 'social-studies',
    name: 'Social Studies',
    intro: 'Stepping into other perspectives, places and times.',
  },
]

export function getSubject(slug: string): DramaSubject | undefined {
  return dramaSubjects.find((subject) => subject.slug === slug)
}
