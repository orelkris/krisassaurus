import type { QuickGame } from '@/types/quickGame'
import windLoop from '@/assets/music/as-the-wind-travels-loop.mp3'
import askYourself from '@/assets/handouts/ask-yourself.pdf'

// The file has one second of padding at each end; the loop is bars 5 to 20
// of As the Wind Travels, 32 seconds at 120 BPM
const windTravelsLoop = { url: windLoop, loopStart: 1, loopEnd: 33 }

export const games: QuickGame[] = [
  {
    slug: 'minds-on',
    title: 'Minds On',
    prompt: 'What should you have asked yourself first?',
    handoutUrl: askYourself,
    music: windTravelsLoop,
  },
]

// Seconds on the clock for each scenario
export const timerOptions = [15, 30, 45, 60]
export const defaultSeconds = 30

export function getGame(slug: string): QuickGame | undefined {
  return games.find((game) => game.slug === slug)
}
