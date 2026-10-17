import type { DocumentLink } from '@/types/resources'

// Each link is written once: it shows a card on the page at `to`, and that
// page shows under "Used on this site" on the document's page
export const documentLinks: DocumentLink[] = [
  {
    documentSlug: 'the-arts-1-8',
    to: '/blog/drama',
    label: 'Blog › Drama',
    blurb: 'The Drama strand, with expectations for each grade.',
    // Printed page where the curriculum introduces the Drama strand
    page: 15,
    pageLabel: 'the Drama strand',
  },
  {
    documentSlug: 'mathematics-1-8',
    to: '/blog/math',
    label: 'Blog › Math',
    blurb: 'Every expectation for Grades 1 to 8, by grade and by strand.',
  },
]

export function getLinksToPage(to: string): DocumentLink[] {
  return documentLinks.filter((link) => link.to === to)
}

export function getLinksForDocument(slug: string): DocumentLink[] {
  return documentLinks.filter((link) => link.documentSlug === slug)
}
