// A story or book used in class. Subjects link to it from their own files
export interface Story {
  slug: string
  title: string
  // Where to read it, e.g. a PDF
  url: string
}
