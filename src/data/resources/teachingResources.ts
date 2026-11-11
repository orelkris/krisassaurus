import type { TeachingResource } from '@/types/resources'

// Outside resources, each once. Which expectations they go with is in
// resourceLinks.ts
export const teachingResources: TeachingResource[] = [
  {
    id: 'ophea-healthy-eating-junior',
    title: 'Healthy Eating: Making Healthy Choices (Junior lesson)',
    url: 'https://ophea.net/node/5857',
    type: 'lessonPlan',
    source: 'Ophea',
  },
  {
    id: 'ophea-vaping-video-1',
    title: 'Video 1: Making Safer Informed Decisions About Vaping',
    url: 'https://ophea.net/node/2315',
    type: 'video',
    source: 'Ophea',
  },
  {
    id: 'ophea-concussion-symptom-tool',
    title: 'Sample Concussion Symptom Awareness Tool',
    url: 'https://safety.ophea.net/tools-resources/sample-concussion-symptom-awareness-tool',
    type: 'printable',
    source: 'Ophea Safety',
  },
  {
    id: 'ophea-beyond-walls-elementary',
    title:
      'Beyond the Walls: Elementary Activity Cards (DPA, curricular, recess)',
    url: 'https://ophea.net/beyond-walls-activities-outdoors/elementary-activities',
    type: 'game',
    source: 'Ophea',
  },
  {
    id: 'ophea-open-class-in-out-on',
    title: 'Open Class, Movement Exploration: Lesson 1 In, Out, On',
    url: 'https://ophea.net/hpe-online-learning/elementary/ophea-open-class/unit-3-movement-exploration/lesson-1-out',
    type: 'lessonPlan',
    source: 'Ophea',
  },
]
