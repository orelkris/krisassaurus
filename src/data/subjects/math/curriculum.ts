import type { Curriculum, MathStrand } from '@/types/curriculum'
import { activityCards } from './activityCards'
import { conceptCards } from './conceptCards'
import expectations from './expectations.json'
import { mathIdeas } from './ideas'

// Mathematics, Grades 1–8 (2020). The expectations and their teacher
// supports (key concepts, examples, sample tasks) come from the document.
// Strand A is the same chart in every grade; its six skills are A1.1–A1.6.
// Build script: krisassaurus-math/data/to_curriculum.py
export const mathCurriculum: Curriculum<MathStrand> = {
  subject: 'math',
  documentSlug: 'mathematics-1-8',
  strands: {
    A: {
      name: 'Social-Emotional Learning Skills',
      skills: true,
      note: 'Strand A is not taught on its own. It runs through every other strand: students learn to manage the feelings that come with hard problems while they use the mathematical processes. The same skills help adults who feel unsure about math. Since 2021–22, schools are asked not to assess or report on Strand A. Teaching it continues.',
    },
    B: { name: 'Number' },
    C: { name: 'Algebra' },
    D: { name: 'Data' },
    E: { name: 'Spatial Sense' },
    F: { name: 'Financial Literacy' },
  },
  grades: expectations,
  ideas: mathIdeas,
  supports: (grade) =>
    import(`./supports/grade-${grade}.json`).then((file) => file.default),
  cards: { concepts: conceptCards, activities: activityCards },
}
