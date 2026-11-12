import type { ReactNode } from 'react'
import ArtsSidebarGroups from '@/components/arts/ArtsSidebarGroups'
import type { SubjectId } from '@/types/curriculum'

// What a subject adds to the shared curriculum pages, e.g. the Arts'
// processes. Everything else on those pages comes from the curriculum
export interface SubjectExtras {
  // Under the Overview's title
  description?: string
  // Counts before the curriculum's in the Overview's header
  meta?: string[]
  // Overview sections between the Curriculum box and the Grades
  afterCurriculum?: ReactNode
  // Overview sections at the end
  end?: ReactNode
  // Sidebar groups under Overview, and after By strand
  sidebarTop?: ReactNode
  sidebarEnd?: ReactNode
}

export const SUBJECT_EXTRAS: Partial<Record<SubjectId, SubjectExtras>> = {
  arts: {
    sidebarEnd: <ArtsSidebarGroups />,
  },
}
