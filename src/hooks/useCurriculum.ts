import { createContext, useContext } from 'react'
import type { Curriculum, StrandId } from '@/types/curriculum'

// The subject whose pages are showing. App.tsx sets it once per subject,
// around that subject's routes, so the same pages work for every subject
export const CurriculumContext = createContext<Curriculum<StrandId> | null>(
  null
)

export function useCurriculum(): Curriculum<StrandId> {
  const curriculum = useContext(CurriculumContext)
  if (!curriculum)
    throw new Error('useCurriculum is only for pages inside a subject route')
  return curriculum
}
