import type { Term } from '@/components/ui/TermList'
import elementList from './elements.json'

// The five elements of drama each grade focuses on, worded as in the
// curriculum's Fundamental Concepts box
const elements = elementList as Record<string, Term[]>

export function getElements(grade: number): Term[] {
  return elements[grade] ?? []
}
