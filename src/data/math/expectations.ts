import type {
  Expectation,
  ExpectationDetails,
  MathFilter,
  MathIdea,
  TaughtStrandId,
} from '@/types/math'
import type { ExpectationItem } from '@/components/ui/ExpectationRow'
import type { ExpectationGroup } from '@/components/ui/ExpectationGroups'
import type { FitColumn } from '@/components/ui/WhereThisFits'
import expectationList from './expectations.json'
import { mathIdeas } from './ideas'
import { getStrand, mathGrades } from './strands'

// The official wording of all 369 expectations. The longer teacher supports
// (key concepts, examples, sample tasks) are in details/grade-N.json and load
// only when an expectation page opens
export const expectations = expectationList as Expectation[]

const byId = new Map(
  expectations.map((expectation) => [expectation.id, expectation])
)

export function getExpectation(id: string): Expectation | undefined {
  return byId.get(id)
}

// URLs use the grade and the code: /math/grade/6/b1.1
export function expectationPath(expectation: Expectation): string {
  return `/math/grade/${expectation.grade}/${expectation.code.toLowerCase()}`
}

export function findExpectation(
  grade: number,
  code: string
): Expectation | undefined {
  return byId.get(`g${grade}-${code.toLowerCase()}`)
}

// Every Math page link comes from the filter, so the sidebar and the pages agree:
// nothing → /math, grade → /grade/6, strand → /strand/number,
// both → /grade/6/strand/number
export function mathPath({ grade, strand, idea }: MathFilter): string {
  const slug = strand && getStrand(strand).slug
  if (grade && slug) return `/math/grade/${grade}/strand/${slug}`
  if (grade) return `/math/grade/${grade}`
  if (slug) return `/math/strand/${slug}${idea ? `?idea=${idea}` : ''}`
  return '/math'
}

// The expectations for a grade, a strand, or both
export function getExpectations({ grade, strand }: MathFilter): Expectation[] {
  return expectations.filter(
    (expectation) =>
      (grade === undefined || expectation.grade === grade) &&
      (strand === undefined || expectation.strand === strand)
  )
}

// Groups a list by its overall expectation (B1, B2...), keeping the order
export function groupByOverall(list: Expectation[]): Expectation[][] {
  const groups = new Map<string, Expectation[]>()
  for (const expectation of list) {
    const group = groups.get(expectation.overall) ?? []
    group.push(expectation)
    groups.set(expectation.overall, group)
  }
  return [...groups.values()]
}

// Splits a list (e.g. one overall) by idea, keeping order. Each idea's
// expectations sit next to each other in every grade
export function groupByIdea(list: Expectation[]) {
  const groups: { idea?: MathIdea; expectations: Expectation[] }[] = []
  for (const expectation of list) {
    const idea = getIdeaOf(expectation)
    const last = groups.at(-1)
    if (last && last.idea?.id === idea?.id) last.expectations.push(expectation)
    else groups.push({ idea, expectations: [expectation] })
  }
  return groups
}

// What the shared ExpectationRow shows for one Math expectation
export function toExpectationItem(expectation: Expectation): ExpectationItem {
  return {
    id: expectation.id,
    code: expectation.code,
    text: expectation.text,
    to: expectationPath(expectation),
  }
}

// A box per overall expectation (B1, B2...) with a heading per idea, for the
// shared ExpectationGroups
export function overallGroups(list: Expectation[]): ExpectationGroup[] {
  return groupByOverall(list).map((group) => ({
    id: group[0].overall,
    label: `${group[0].overall} · ${group[0].overallTitle}`,
    color: getStrand(group[0].strand).colors.text,
    sections: groupByIdea(group).map(({ idea, expectations: items }) => ({
      id: items[0].id,
      heading: idea?.name,
      items: items.map(toExpectationItem),
    })),
  }))
}

// One idea from Grade 1 to 8: a box per grade holding the idea's
// expectations in that grade, for the shared ExpectationGroups
export function ideaGroups(idea: MathIdea): ExpectationGroup[] {
  return mathGrades.map((grade) => {
    const items = getExpectationsInIdea(idea.id, grade)
    return {
      id: String(grade),
      label: `Grade ${grade}`,
      color: getStrand(idea.strand).colors.text,
      sections: items.length
        ? [{ id: 'all', items: items.map(toExpectationItem) }]
        : [],
      empty: 'Not in this grade',
    }
  })
}

// The same idea in the grade before, this grade, and the grade after, for
// the shared WhereThisFits
export function whereThisFits(expectation: Expectation): FitColumn[] {
  const idea = getIdeaOf(expectation)
  const { grade } = expectation
  const inGrade = (g: number) =>
    idea && g >= 1 && g <= 8
      ? getExpectationsInIdea(idea.id, g).map(toExpectationItem)
      : []

  return [
    {
      label: grade > 1 ? `Grade ${grade - 1} · before` : 'Before',
      items: inGrade(grade - 1),
      empty:
        grade === 1
          ? 'This is where it starts.'
          : 'Not taught in the grade before.',
    },
    { label: `Grade ${grade} · now`, items: inGrade(grade), empty: '' },
    {
      label: grade < 8 ? `Grade ${grade + 1} · next` : 'Next',
      items: inGrade(grade + 1),
      empty:
        grade === 8
          ? 'Continues in Grade 9 math.'
          : 'Not taught in the grade after.',
    },
  ]
}

export function getIdeasInStrand(strand: TaughtStrandId) {
  return mathIdeas.filter((idea) => idea.strand === strand)
}

export function getIdea(id: string) {
  return mathIdeas.find((idea) => idea.id === id)
}

export function getIdeaOf(expectation: Expectation) {
  return mathIdeas.find((idea) =>
    idea.expectations[expectation.grade]?.includes(expectation.id)
  )
}

export function getExpectationsInIdea(
  ideaId: string,
  grade: number
): Expectation[] {
  const ids = getIdea(ideaId)?.expectations[grade] ?? []
  return ids.flatMap((id) => {
    const expectation = byId.get(id)
    return expectation ? [expectation] : []
  })
}

export async function loadDetails(
  expectation: Expectation
): Promise<ExpectationDetails | undefined> {
  const grade = await import(`./details/grade-${expectation.grade}.json`)
  return (grade.default as Record<string, ExpectationDetails>)[expectation.id]
}
