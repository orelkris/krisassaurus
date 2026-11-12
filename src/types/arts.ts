// A stage of the Arts' creative process, with what the student and the
// teacher do in it
export interface CreativeStage {
  name: string
  // The name on two lines, for the diagram
  lines: [string, string]
  student: string[]
  teacher: string[]
}

// An aspect of the Arts' critical analysis process, with its guiding
// questions
export interface CriticalAspect {
  name: string
  description: string
  questions: string[]
  // Questions for students about their own work, when the document has them
  ownWork?: string[]
}

// One of the two processes the Arts document describes
export interface ArtsProcess {
  slug: string
  name: string
  // The document's opening line about it
  intro: string
  // The document's printed pages, e.g. 19–22
  pages: string
}
