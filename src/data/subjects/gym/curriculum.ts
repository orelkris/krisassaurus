import type { Curriculum, GymStrand } from '@/types/curriculum'
import expectations from './expectations.json'

// Health and Physical Education, Grades 1–8 (2019). The expectations come
// from the document; parse script: krisassaurus-gym/data/parse_gym.py
export const gymCurriculum: Curriculum<GymStrand> = {
  subject: 'gym',
  documentSlug: 'health-and-physical-education-1-8',
  strands: {
    A: {
      name: 'Social-Emotional Learning Skills',
      note: 'Strand A is not taught as a separate unit. It runs through every other strand: students are taught these skills, such as managing emotions, coping with stress and building relationships, while they learn in Active Living, Movement Competence and Healthy Living, and they are assessed there too. The expectations are the same in every grade; the examples show how they grow.',
    },
    B: { name: 'Active Living' },
    C: { name: 'Movement Competence: Skills, Concepts, and Strategies' },
    D: {
      name: 'Healthy Living',
      // The rows of the Healthy Living summary chart
      topics: [
        'Healthy Eating',
        'Personal Safety and Injury Prevention',
        'Substance Use, Addictions, and Related Behaviours',
        'Human Development and Sexual Health',
        'Mental Health Literacy',
      ],
    },
  },
  grades: expectations,
}
