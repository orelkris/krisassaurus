import type { NumberedQuestion } from '@/types/quickGame'
import { handoutQuestions } from '@/data/quickGame/questions'

// The match for each scenario: scenario id -> handout question id
export const answers: Record<string, string> = {
  'late-guardian': 'transporting',
  'closed-door': 'observed',
  'sharing-divorce': 'professional-relationship',
  babysitting: 'known-approved',
  sweetheart: 'discomfort',
}

export function getAnswer(
  gameSlug: string,
  scenarioId: string
): NumberedQuestion | undefined {
  const questions = handoutQuestions[gameSlug] ?? []
  const index = questions.findIndex((q) => q.id === answers[scenarioId])
  if (index < 0) return undefined
  return { ...questions[index], number: index + 1 }
}
