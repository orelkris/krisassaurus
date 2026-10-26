import type { HandoutQuestion } from '@/types/quickGame'
import { handoutQuestions } from '@/data/quickGame/questions'

// The match for each scenario: scenario id -> handout question id
export const answers: Record<string, string> = {
  'late-guardian': 'transporting',
  'closed-door': 'observed',
  'sharing-divorce': 'professional-relationship',
}

export interface Answer extends HandoutQuestion {
  // The question's number on the handout
  number: number
}

export function getAnswer(
  gameSlug: string,
  scenarioId: string
): Answer | undefined {
  const questions = handoutQuestions[gameSlug] ?? []
  const index = questions.findIndex((q) => q.id === answers[scenarioId])
  if (index < 0) return undefined
  return { ...questions[index], number: index + 1 }
}
