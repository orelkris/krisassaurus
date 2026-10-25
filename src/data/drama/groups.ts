import type { StrategyGroup, StrategyGroupId } from '@/types/drama'

export const strategyGroups: StrategyGroup[] = [
  {
    id: 'role-play',
    code: 'R',
    name: 'Role Play',
    blurb: 'Students step into a character and speak or act as them.',
    colors: { bg: '#DCFCE7', text: '#166534', accent: '#22C55E' },
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
    colors: { bg: '#FEF9C3', text: '#854D0E', accent: '#EAB308' },
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
    colors: { bg: '#CFFAFE', text: '#155E75', accent: '#06B6D4' },
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
    colors: { bg: '#FAE8FF', text: '#86198F', accent: '#D946EF' },
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
    colors: { bg: '#E5E7EB', text: '#374151', accent: '#6B7280' },
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
