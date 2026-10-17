import type {
  Expectation,
  ExpectationDetails,
  TaughtStrandId,
} from '@/types/math'
import expectationList from './expectations.json'
import { mathIdeas } from './ideas'

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

// URLs use the grade and the code: /blog/math/grade/6/b1.1
export function expectationPath(expectation: Expectation): string {
  return `/blog/math/grade/${expectation.grade}/${expectation.code.toLowerCase()}`
}

export function findExpectation(
  grade: number,
  code: string
): Expectation | undefined {
  return byId.get(`g${grade}-${code.toLowerCase()}`)
}

export function getExpectationsInGrade(grade: number): Expectation[] {
  return expectations.filter((expectation) => expectation.grade === grade)
}

export function getExpectationsInStrand(strand: TaughtStrandId): Expectation[] {
  return expectations.filter((expectation) => expectation.strand === strand)
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
