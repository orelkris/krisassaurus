import { useEffect, useState } from 'react'
import { scenarios } from '@/data/quickGame/scenarios'
import { getAnswer } from '@/data/quickGame/answers'
import type { ScenarioDraft } from '@/types/quickGame'

// v2: answer became the question's words instead of its number
const storageKey = (gameSlug: string) => `quick-game:v2:${gameSlug}`
// Ids of scenarios from the data files that the teacher removed with ×
const removedKey = (gameSlug: string) => `quick-game:removed:${gameSlug}`

function readList<T>(key: string): T[] | undefined {
  try {
    const saved = localStorage.getItem(key)
    if (saved) return JSON.parse(saved)
  } catch {
    // Storage can be blocked, e.g. in a private window
  }
  return undefined
}

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

// What the teacher typed last time in this browser. Scenarios added to the
// data files since then are put at the end, unless the teacher removed them
function load(gameSlug: string): ScenarioDraft[] {
  const saved = readList<ScenarioDraft>(storageKey(gameSlug))
  if (!saved) return fromData(gameSlug)

  const removed = readList<string>(removedKey(gameSlug)) ?? []
  const savedIds = new Set(saved.map((draft) => draft.id))
  const added = fromData(gameSlug).filter(
    (draft) => !savedIds.has(draft.id) && !removed.includes(draft.id)
  )
  return [...saved, ...added]
}

// Remembers that a data-file scenario was removed, so load() leaves it out
function rememberRemoved(gameSlug: string, id: string) {
  if (!scenarios[gameSlug]?.some((scenario) => scenario.id === id)) return
  const removed = readList<string>(removedKey(gameSlug)) ?? []
  try {
    localStorage.setItem(removedKey(gameSlug), JSON.stringify([...removed, id]))
  } catch {
    // Not saved; it may come back next time the page opens
  }
}

const blank = (): ScenarioDraft => ({
  id: crypto.randomUUID(),
  text: '',
  answer: '',
})

// The scenarios the teacher types on the Quick Game page. They are saved in
// this browser, so they are still there next time; new scenarios in the data
// files still show up. add() puts an empty row at the end and remove() takes
// one out. Rows with an empty scenario box are
// skipped on the board
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

  const remove = (index: number) => {
    const id = state.drafts[index]?.id
    if (id) rememberRemoved(state.gameSlug, id)
    setState((current) => ({
      ...current,
      drafts: current.drafts.filter((_, i) => i !== index),
    }))
  }

  return {
    rows,
    update,
    add,
    remove,
    addedId: state.addedId,
    // Only rows with a scenario go on the board
    playable: drafts.filter((draft) => draft.text.trim()),
  }
}
