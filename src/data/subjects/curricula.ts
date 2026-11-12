import { dramaCurriculum } from '@/data/subjects/drama/curriculum'
import { mathCurriculum } from '@/data/subjects/math/curriculum'
import { gymCurriculum } from '@/data/subjects/gym/curriculum'
import { scienceCurriculum } from '@/data/subjects/science/curriculum'
import type { Curriculum, StrandId } from '@/types/curriculum'

// Every subject whose pages come from its curriculum data. App.tsx makes the
// same set of pages for each one, so adding a subject is adding it here.
// A subject's own extras, like Drama's strategies, are in
// components/curriculum/subjectExtras.tsx.
// (Each curriculum has only its own strand letters; the pages list them
// with strandsOf(), so they never ask for a letter it doesn't have)
export const CURRICULA = [
  mathCurriculum,
  dramaCurriculum,
  gymCurriculum,
  scienceCurriculum,
] as unknown as Curriculum<StrandId>[]
