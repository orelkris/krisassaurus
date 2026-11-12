import { useEffect, useState } from 'react'
import type { Curriculum, StrandId, TeacherSupports } from '@/types/curriculum'

// One grade's teacher supports (Math), keyed by code. Undefined while they
// load, and for subjects without any
export function useSupports(
  curriculum: Curriculum<StrandId>,
  grade: number
): Record<string, TeacherSupports> | undefined {
  const [loaded, setLoaded] = useState<{
    curriculum: Curriculum<StrandId>
    grade: number
    supports: Record<string, TeacherSupports>
  }>()
  useEffect(() => {
    if (!curriculum.supports || !curriculum.grades[grade]) return
    let isCurrent = true
    curriculum.supports(grade).then((supports) => {
      if (isCurrent) setLoaded({ curriculum, grade, supports })
    })
    return () => {
      isCurrent = false
    }
  }, [curriculum, grade])
  return loaded?.curriculum === curriculum && loaded.grade === grade
    ? loaded.supports
    : undefined
}
