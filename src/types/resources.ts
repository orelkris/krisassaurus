import type { SubjectId } from '@/types/curriculum'

export type DocumentGroupId = 'curriculum' | 'assessment'

export interface DocumentGroup {
  id: DocumentGroupId
  name: string
}

// A place in the PDF worth jumping to, e.g. the Grade 1 Drama expectations.
// `page` is the number printed on the page
export interface DocumentSection {
  label: string
  page: number
}

// My own copy of the PDF, saved from the ministry's site
export interface DocumentFile {
  url: string
  // Picture of the first page, made once when the PDF is added
  coverUrl?: string
  added: string
  // Pages before the printed page 1 (e.g. an unnumbered cover). Section pages
  // are the printed numbers; this lines them up with the PDF viewer's pages
  pageOffset?: number
}

export interface MinistryDocument {
  slug: string
  // Full title as printed on the cover
  title: string
  // Shorter name for the sidebar and cards
  shortName: string
  groupId: DocumentGroupId
  year: string
  grades?: string
  strands?: string[]
  summary: string
  // Documents without a file show as "coming soon"
  file?: DocumentFile
  // The ministry's own page, so readers can check for a newer version
  officialUrl?: string
  sections?: DocumentSection[]
}

// A page on this site that points readers to a document
export interface DocumentLink {
  documentSlug: string
  to: string
  label: string
  // Short line shown on the card on that page
  blurb: string
  // Open the PDF at this page instead of the cover
  page?: number
  pageLabel?: string
}

// The kinds of outside resource, once. A page shows a resource's kind with
// its name from here, and a typo in a kind is a type error
export const RESOURCE_TYPES = {
  lessonPlan: { name: 'Lesson plan' },
  video: { name: 'Video' },
  printable: { name: 'Printable' },
  game: { name: 'Game' },
  website: { name: 'Website' },
  interactive: { name: 'Interactive' },
  book: { name: 'Book' },
} as const

export type ResourceType = keyof typeof RESOURCE_TYPES

// Something from outside the site that helps teach an expectation, e.g. an
// Ophea lesson
export interface TeachingResource {
  id: string
  title: string
  url: string
  type: ResourceType
  // Who made it, e.g. Ophea
  source: string
}

// Which expectations a resource goes with, in one subject and grade
export interface ResourceLink {
  resource: string
  subject: SubjectId
  grade: number
  // e.g. ["D1.1", "D2.1"]
  codes: string[]
}
