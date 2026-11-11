import { resourceLinks } from '@/data/resources/resourceLinks'
import { teachingResources } from '@/data/resources/teachingResources'
import type { SubjectId } from '@/types/curriculum'
import type { TeachingResource } from '@/types/resources'

// The outside resources that go with one expectation, e.g.
// resourcesFor('gym', 4, 'D1.1')
export function resourcesFor(
  subject: SubjectId,
  grade: number,
  code: string
): TeachingResource[] {
  return resourceLinks
    .filter(
      (link) =>
        link.subject === subject &&
        link.grade === grade &&
        link.codes.includes(code)
    )
    .map((link) => teachingResources.find((r) => r.id === link.resource))
    .filter((resource): resource is TeachingResource => !!resource)
}
