import type { ComponentType } from 'react'
import SummerHouseScene from './SummerHouseScene'
import type { SceneProps } from './types'

// Where each student's speech bubble points on the summer house, in % of
// the drawing
const summerHouseBubbles: Record<string, { left: number; top: number }> = {
  C: { left: 50, top: 15 },
  D: { left: 50, top: 15 },
  A: { left: 43, top: 41 },
  B: { left: 57, top: 41 },
}

// The drawings a scene example can name in its JSON, with where each
// student's speech bubble goes
export const scenes: Record<
  string,
  {
    Drawing: ComponentType<SceneProps>
    bubbles: Record<string, { left: number; top: number }>
  }
> = {
  'summer-house': { Drawing: SummerHouseScene, bubbles: summerHouseBubbles },
}
