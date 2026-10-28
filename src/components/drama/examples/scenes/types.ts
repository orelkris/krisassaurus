export interface SceneProps {
  colors: { bg: string; text: string; accent: string }
  // The students lit up, by letter
  active: string[]
  // Shows the drawing faint, e.g. before the freeze
  faded?: boolean
  // Makes each student a button
  onTap?: (id: string) => void
}
