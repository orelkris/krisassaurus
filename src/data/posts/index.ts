import type { Post } from '@/types'
import { relationalClassroom } from './relational-classroom'
import { instructionalApproaches } from './instructional-approaches'
import { differentLenses } from './different-lenses'

export const posts: Post[] = [
  relationalClassroom,
  instructionalApproaches,
  differentLenses,
]