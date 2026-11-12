import type { ReactNode } from 'react'
import DramaSubjectsNav from '@/components/drama/DramaSubjectsNav'
import StrategiesNav from '@/components/drama/StrategiesNav'
import {
  DramaStrategiesSection,
  DramaSubjectsSection,
} from '@/components/drama/DramaOverviewSections'
import { strategies } from '@/data/drama/strategies'
import { dramaSubjects } from '@/data/drama/subjects'
import type { SubjectId } from '@/types/curriculum'

// What a subject adds to the shared curriculum pages, e.g. Drama's
// strategies. Everything else on those pages comes from the curriculum
export interface SubjectExtras {
  // Under the Overview's title
  description?: string
  // Counts before the curriculum's in the Overview's header, e.g. 44 strategies
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
  drama: {
    description:
      'Drama strategies I’ve learned and tried, and how I’ve used them across subjects. Pick a strategy to see how to run it, or a subject to read what happened in class.',
    meta: [
      `${strategies.length} strategies`,
      `${dramaSubjects.length} subjects`,
    ],
    afterCurriculum: <DramaStrategiesSection />,
    end: <DramaSubjectsSection />,
    sidebarTop: <StrategiesNav />,
    sidebarEnd: <DramaSubjectsNav />,
  },
}
