import type {
  DramaDetails,
  DramaExpectation,
  DramaFilter,
  DramaStrandId,
} from '@/types/drama'
import type { ExpectationItem } from '@/components/ui/ExpectationRow'
import type { ExpectationGroup } from '@/components/ui/ExpectationGroups'
import type { FitColumn } from '@/components/ui/WhereThisFits'
import expectationList from './expectations.json'
import { dramaGrades, dramaTopics, getDramaStrand } from './strands'

// The official wording of all 72 Drama expectations. Their examples and
// teacher prompts are in details.json and load only when an expectation
// page opens
export const dramaExpectations = expectationList as DramaExpectation[]

const byId = new Map(
  dramaExpectations.map((expectation) => [expectation.id, expectation])
)

// URLs use the grade and the code: /drama/grade/6/b1.1
export function dramaExpectationPath(expectation: DramaExpectation): string {
  return `/drama/grade/${expectation.grade}/${expectation.code.toLowerCase()}`
}

export function findDramaExpectation(
  grade: number,
  code: string
): DramaExpectation | undefined {
  return byId.get(`g${grade}-${code.toLowerCase()}`)
}

// Every Drama curriculum link comes from the filter, like Math's:
// grade → /grade/6, strand → /strand/<slug>, both → /grade/6/strand/<slug>
export function dramaPath({ grade, strand, code }: DramaFilter): string {
  const slug = strand && getDramaStrand(strand).slug
  if (grade && slug) return `/drama/grade/${grade}/strand/${slug}`
  if (grade) return `/drama/grade/${grade}`
  if (slug)
    return `/drama/strand/${slug}${code ? `?code=${code.toLowerCase()}` : ''}`
  return '/drama'
}

// The expectations for a grade, a strand, or both
export function getDramaExpectations({
  grade,
  strand,
}: DramaFilter): DramaExpectation[] {
  return dramaExpectations.filter(
    (expectation) =>
      (grade === undefined || expectation.grade === grade) &&
      (strand === undefined || expectation.strand === strand)
  )
}

// One expectation number in every grade, e.g. B1.1 from Grade 1 to 8
export function getCodeInGrades(code: string): DramaExpectation[] {
  return dramaExpectations.filter((expectation) => expectation.code === code)
}

// What the shared ExpectationRow shows for one Drama expectation
export function toDramaItem(expectation: DramaExpectation): ExpectationItem {
  return {
    id: expectation.id,
    code: expectation.code,
    text: expectation.text,
    to: dramaExpectationPath(expectation),
  }
}

// A box per strand (B1, B2, B3) with each expectation under its short name,
// for the shared ExpectationGroups
export function dramaStrandGroups(
  list: DramaExpectation[]
): ExpectationGroup[] {
  const strands = [...new Set(list.map((expectation) => expectation.strand))]
  return strands.map((id) => {
    const strand = getDramaStrand(id)
    return {
      id,
      label: `${id} · ${strand.name}`,
      color: strand.colors.text,
      tone: strand.colors,
      sections: list
        .filter((expectation) => expectation.strand === id)
        .map((expectation) => ({
          id: expectation.id,
          heading: dramaTopics[expectation.code],
          items: [toDramaItem(expectation)],
        })),
    }
  })
}

// One expectation number from Grade 1 to 8: a box per grade
export function dramaCodeGroups(code: string): ExpectationGroup[] {
  const colors = getDramaStrand(code.slice(0, 2) as DramaStrandId).colors
  return dramaGrades.map((grade) => {
    const expectation = findDramaExpectation(grade, code)
    return {
      id: String(grade),
      label: `Grade ${grade}`,
      color: colors.text,
      tone: colors,
      sections: expectation
        ? [{ id: expectation.id, items: [toDramaItem(expectation)] }]
        : [],
      empty: 'Not in this grade',
    }
  })
}

// How many expectations each code has in each grade, for the StrandMap
export function dramaCodeCounts(code: string): Record<number, number> {
  return Object.fromEntries(
    dramaGrades.map((grade) => [
      grade,
      findDramaExpectation(grade, code) ? 1 : 0,
    ])
  )
}

// The same expectation number in the grade before, this grade, and the
// grade after, for the shared WhereThisFits
export function dramaWhereThisFits(expectation: DramaExpectation): FitColumn[] {
  const { grade, code } = expectation
  const inGrade = (g: number) => {
    const item = findDramaExpectation(g, code)
    return item ? [toDramaItem(item)] : []
  }

  return [
    {
      label: grade > 1 ? `Grade ${grade - 1} · before` : 'Before',
      items: inGrade(grade - 1),
      empty: 'This is where it starts.',
    },
    { label: `Grade ${grade} · now`, items: inGrade(grade), empty: '' },
    {
      label: grade < 8 ? `Grade ${grade + 1} · next` : 'Next',
      items: inGrade(grade + 1),
      empty: 'Continues in Grade 9 drama.',
    },
  ]
}

export async function loadDramaDetails(
  expectation: DramaExpectation
): Promise<DramaDetails | undefined> {
  const details = await import('./details.json')
  return (details.default as Record<string, DramaDetails>)[expectation.id]
}
