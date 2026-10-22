import type { DocumentLink } from '@/types/resources'

// Each link is written once: it shows a card on the page at `to`, and that
// page shows under "Used on this site" on the document's page
export const documentLinks: DocumentLink[] = [
  {
    documentSlug: 'the-arts-1-8',
    to: '/drama',
    label: 'Subjects › Drama',
    blurb: 'The Drama strand, with expectations for each grade.',
    // Printed page where the curriculum introduces the Drama strand
    page: 15,
    pageLabel: 'the Drama strand',
  },
  {
    documentSlug: 'mathematics-1-8',
    to: '/math',
    label: 'Subjects › Math',
    blurb: 'Every expectation for Grades 1 to 8, by grade and by strand.',
  },
  {
    documentSlug: 'language-1-8',
    to: '/language',
    label: 'Subjects › Language',
    blurb: 'The expectations for each grade, by strand.',
  },
  {
    documentSlug: 'health-and-physical-education-1-8',
    to: '/gym',
    label: 'Subjects › Gym',
    blurb:
      'The expectations for each grade, including Active Living and Movement Competence.',
  },
]

export function getLinksToPage(to: string): DocumentLink[] {
  return documentLinks.filter((link) => link.to === to)
}

export function getLinksForDocument(slug: string): DocumentLink[] {
  return documentLinks.filter((link) => link.documentSlug === slug)
}