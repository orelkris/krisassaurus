import { colorSet } from '@/lib/colors'
import type { StrategyGroup, StrategyGroupId } from '@/types/drama'

export const strategyGroups: StrategyGroup[] = [
  {
    id: 'role-play',
    code: 'R',
    name: 'Role Play',
    blurb: 'Students step into a character and speak or act as them.',
    colors: colorSet('group-r'),
    defaultFacts: {
      time: '10–15 min',
      grouping: 'Whole class or small groups',
      grades: 'Grades 1–8',
    },
  },
  {
    id: 'tableaux',
    code: 'T',
    name: 'Tableaux',
    blurb: 'Frozen pictures made with bodies to show a moment or an idea.',
    colors: colorSet('group-t'),
    defaultFacts: {
      time: '5–10 min',
      grouping: 'Groups of 3–5',
      grades: 'Grades K–8',
    },
  },
  {
    id: 'voice-and-sound',
    code: 'V',
    name: 'Voice and Sound',
    blurb: 'Voices, sound and rhythm build atmosphere and meaning.',
    colors: colorSet('group-v'),
    defaultFacts: {
      time: '5–10 min',
      grouping: 'Whole class',
      grades: 'Grades K–8',
    },
  },
  {
    id: 'movement',
    code: 'M',
    name: 'Movement',
    blurb: 'Bodies in motion express ideas without relying on words.',
    colors: colorSet('group-m'),
    defaultFacts: {
      time: '5–10 min',
      grouping: 'Pairs or whole class',
      grades: 'Grades K–8',
    },
  },
  {
    id: 'scene-work',
    code: 'S',
    name: 'Scene Work and Forms',
    blurb: 'Short scenes and theatre forms to explore a story or problem.',
    colors: colorSet('group-s'),
    defaultFacts: {
      time: '15–20 min',
      grouping: 'Small groups',
      grades: 'Grades 3–8',
    },
  },
]

export function getGroup(id: StrategyGroupId): StrategyGroup {
  // Every StrategyGroupId has an entry above, so this never returns undefined
  return strategyGroups.find((group) => group.id === id)!
}
