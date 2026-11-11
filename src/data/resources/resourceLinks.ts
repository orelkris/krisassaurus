import type { ResourceLink } from '@/types/resources'

// Which expectations each resource in teachingResources.ts goes with
export const resourceLinks: ResourceLink[] = [
  {
    resource: 'ophea-healthy-eating-junior',
    subject: 'gym',
    grade: 4,
    codes: ['D1.1', 'D2.1', 'D3.1'],
  },
  {
    resource: 'ophea-vaping-video-1',
    subject: 'gym',
    grade: 4,
    codes: ['D1.4', 'D2.3'],
  },
  {
    resource: 'ophea-concussion-symptom-tool',
    subject: 'gym',
    grade: 4,
    codes: ['B3.1'],
  },
  {
    resource: 'ophea-beyond-walls-elementary',
    subject: 'gym',
    grade: 4,
    codes: ['B1.1', 'B2.1', 'C2.1'],
  },
  {
    resource: 'ophea-open-class-in-out-on',
    subject: 'gym',
    grade: 4,
    codes: ['C1.3'],
  },
]
