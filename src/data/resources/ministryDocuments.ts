import type { DocumentGroupId, MinistryDocument } from '@/types/resources'

export const ministryDocuments: MinistryDocument[] = [
  {
    slug: 'the-arts-1-8',
    title: 'The Ontario Curriculum, Grades 1–8: The Arts',
    shortName: 'The Arts, 1–8',
    groupId: 'curriculum',
    year: 'Revised 2009',
    grades: 'Grades 1 to 8',
    strands: ['Dance', 'Drama', 'Music', 'Visual Arts'],
    summary:
      'Expectations for dance, drama, music and visual arts in each grade, with the creative and critical analysis processes.',
    file: {
      // Save the ministry's PDF and cover picture in public/documents/
      url: '/documents/the-arts-1-8-2009.pdf',
      coverUrl: '/documents/the-arts-1-8-2009-cover.png',
      added: 'October 2026',
      // The printed page numbers match the PDF's own pages
      pageOffset: 2,
    },
    officialUrl: 'https://www.dcp.edu.gov.on.ca/en/curriculum/elementary-arts',
    // Printed page numbers, taken from the PDF
    sections: [
      { label: 'The Creative Process', page: 19 },
      { label: 'The Critical Analysis Process', page: 23 },
      { label: 'The Achievement Chart for the Arts', page: 31 },
      { label: 'Drama · Grade 1', page: 68 },
      { label: 'Drama · Grade 2', page: 78 },
      { label: 'Drama · Grade 3', page: 88 },
      { label: 'Drama · Grade 4', page: 102 },
      { label: 'Drama · Grade 5', page: 112 },
      { label: 'Drama · Grade 6', page: 124 },
      { label: 'Drama · Grade 7', page: 138 },
      { label: 'Drama · Grade 8', page: 150 },
      { label: 'Glossary', page: 159 },
    ],
  },
  {
    slug: 'language-1-8',
    title: 'The Ontario Curriculum, Grades 1–8: Language',
    shortName: 'Language, 1–8',
    groupId: 'curriculum',
    year: '2023',
    grades: 'Grades 1 to 8',
    summary: 'Coming soon.',
  },
  {
    slug: 'mathematics-1-8',
    title: 'The Ontario Curriculum, Grades 1–8: Mathematics',
    shortName: 'Mathematics, 1–8',
    groupId: 'curriculum',
    year: '2020',
    grades: 'Grades 1 to 8',
    summary: 'Coming soon.',
  },
  {
    slug: 'science-and-technology-1-8',
    title: 'The Ontario Curriculum, Grades 1–8: Science and Technology',
    shortName: 'Science and Technology, 1–8',
    groupId: 'curriculum',
    year: '2022',
    grades: 'Grades 1 to 8',
    summary: 'Coming soon.',
  },
  {
    slug: 'social-studies-history-geography',
    title:
      'The Ontario Curriculum: Social Studies, Grades 1 to 6; History and Geography, Grades 7 and 8',
    shortName: 'Social Studies, History and Geography',
    groupId: 'curriculum',
    year: '2018',
    grades: 'Grades 1 to 8',
    summary: 'Coming soon.',
  },
  {
    slug: 'health-and-physical-education-1-8',
    title: 'The Ontario Curriculum, Grades 1–8: Health and Physical Education',
    shortName: 'Health and Physical Education, 1–8',
    groupId: 'curriculum',
    year: '2019',
    grades: 'Grades 1 to 8',
    summary: 'Coming soon.',
  },
  {
    slug: 'growing-success',
    title:
      'Growing Success: Assessment, Evaluation, and Reporting in Ontario Schools',
    shortName: 'Growing Success',
    groupId: 'assessment',
    year: '2010',
    summary: 'Coming soon.',
  },
]

export function getMinistryDocument(
  slug: string
): MinistryDocument | undefined {
  return ministryDocuments.find((document) => document.slug === slug)
}

export function getDocumentsInGroup(
  groupId: DocumentGroupId
): MinistryDocument[] {
  return ministryDocuments.filter((document) => document.groupId === groupId)
}

// Link to the PDF, opened at a page when one is given
export function getPdfUrl(
  document: MinistryDocument,
  page?: number
): string | undefined {
  if (!document.file) return undefined
  if (!page) return document.file.url
  return `${document.file.url}#page=${page + (document.file.pageOffset ?? 0)}`
}
