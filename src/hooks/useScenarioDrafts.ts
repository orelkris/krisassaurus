import { useEffect, useState } from 'react'
import { scenarios } from '@/data/quickGame/scenarios'
import { getAnswer } from '@/data/quickGame/answers'
import type { ScenarioDraft } from '@/types/quickGame'

// v2: answer became the question's words instead of its number
const storageKey = (gameSlug: string) => `quick-game:v2:${gameSlug}`

// The game's scenarios from the data files, as the starting list
function fromData(gameSlug: string): ScenarioDraft[] {
  return (scenarios[gameSlug] ?? []).map((scenario) => {
    const question = getAnswer(gameSlug, scenario.id)
    return {
      ...scenario,
      answer: question ? `${question.number}. ${question.text}` : '',
    }
  })
}

// What the teacher typed last time in this browser, or the data files' list
function load(gameSlug: string): ScenarioDraft[] {
  try {
    const saved = localStorage.getItem(storageKey(gameSlug))
    if (saved) return JSON.parse(saved)
  } catch {
    // Storage can be blocked, e.g. in a private window
  }
  return fromData(gameSlug)
}

const blank = (): ScenarioDraft => ({
  id: crypto.randomUUID(),
  text: '',
  answer: '',
})

// The scenarios the teacher types on the Quick Game page. They are saved in
// this browser, so they are still there next time. add() puts an empty row at
// the end. Clearing a row's boxes takes it out of the game
export function useScenarioDrafts(gameSlug: string) {
  const [state, setState] = useState(() => ({
    gameSlug,
    drafts: load(gameSlug),
    // The row add() made, so the page can put the cursor in it
    addedId: '',
  }))

  // Another game was picked: load its list
  if (state.gameSlug !== gameSlug) {
    setState({ gameSlug, drafts: load(gameSlug), addedId: '' })
  }

  useEffect(() => {
    try {
      localStorage.setItem(
        storageKey(state.gameSlug),
        JSON.stringify(state.drafts)
      )
    } catch {
      // Not saved; the list still works until the page is closed
    }
  }, [state.gameSlug, state.drafts])

  const { drafts } = state
  // With no scenarios at all there is still one row to type in
  const rows =
    drafts.length > 0 ? drafts : [{ id: 'first', text: '', answer: '' }]

  const update = (index: number, change: Partial<ScenarioDraft>) => {
    setState((current) => {
      const next = [...current.drafts]
      next[index] = {
        ...(next[index] ?? blank()),
        ...change,
      }
      return { ...current, drafts: next }
    })
  }

  const add = () => {
    const row = blank()
    setState((current) => ({
      ...current,
      drafts: [...current.drafts, row],
      addedId: row.id,
    }))
  }

  return {
    rows,
    update,
    add,
    addedId: state.addedId,
    // Only rows with a scenario go on the board
    playable: drafts.filter((draft) => draft.text.trim()),
  }
}
