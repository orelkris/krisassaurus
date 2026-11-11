import { strandColors } from '@/lib/curriculum'
import type { MathStrand, TaughtStrandId } from '@/types/math'

export const mathStrands: MathStrand[] = [
  {
    id: 'B',
    slug: 'number',
    name: 'Number',
    blurb:
      'Counting, place value, fractions and the four operations. The biggest strand: about a third of every grade.',
    colors: strandColors('B'),
  },
  {
    id: 'C',
    slug: 'algebra',
    name: 'Algebra',
    blurb:
      'Patterns, equations, variables and coding. Students learn to spot a rule and describe it.',
    colors: strandColors('C'),
  },
  {
    id: 'D',
    slug: 'data',
    name: 'Data',
    blurb:
      'Asking a question, collecting data, graphing it, and reasoning about chance.',
    colors: strandColors('D'),
  },
  {
    id: 'E',
    slug: 'spatial-sense',
    name: 'Spatial Sense',
    blurb:
      'Shapes, position and movement, and measuring: length, area, volume, angles and time.',
    colors: strandColors('E'),
  },
  {
    id: 'F',
    slug: 'financial-literacy',
    name: 'Financial Literacy',
    blurb:
      'Money in Grades 1 to 3, then budgeting, saving and being a smart consumer from Grade 4.',
    colors: strandColors('F'),
  },
]

// Strand A isn't taught on its own, so it has a card on the overview, not a page
export const strandA = {
  name: 'Feeling capable in math',
  colors: strandColors('A'),
  text: 'Strand A is not taught on its own. It runs through every other strand: students learn to manage the feelings that come with hard problems while they use the mathematical processes. The same skills help adults who feel unsure about math.',
  skills: [
    'Identify and manage emotions',
    'Recognize sources of stress and cope with challenges',
    'Maintain positive motivation and perseverance',
    'Build relationships and communicate effectively',
    'Develop self-awareness and sense of identity',
    'Think critically and creatively',
  ],
  note: 'Since 2021–22, schools are asked not to assess or report on Strand A. Teaching it continues.',
}

export const mathGrades = [1, 2, 3, 4, 5, 6, 7, 8]

export function getStrand(id: TaughtStrandId): MathStrand {
  // Every TaughtStrandId has an entry above, so this never returns undefined
  return mathStrands.find((strand) => strand.id === id)!
}

export function getStrandBySlug(slug: string): MathStrand | undefined {
  return mathStrands.find((strand) => strand.slug === slug)
}
