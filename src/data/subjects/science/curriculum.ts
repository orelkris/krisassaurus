import type { Curriculum, ScienceStrand } from '@/types/curriculum'
import expectations from './expectations.json'
import units from './units.json'

// Science and Technology, Grades 1–8 (2022). The expectations and each
// grade's unit names come from the document; parse script:
// krisassaurus-science/data/parse_science.py
export const scienceCurriculum: Curriculum<ScienceStrand> = {
  subject: 'science',
  documentSlug: 'science-and-technology-1-8',
  strands: {
    A: { name: 'STEM Skills and Connections', skills: true },
    B: { name: 'Life Systems' },
    C: { name: 'Matter and Energy' },
    D: { name: 'Structures and Mechanisms' },
    E: { name: 'Earth and Space Systems' },
  },
  grades: expectations,
  units,
}
