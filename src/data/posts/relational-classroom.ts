import type { Post } from '@/types'

export const relationalClassroom: Post = {
  id: '1',
  title: 'Building a Relational Social Studies Classroom',
  excerpt:
    'Q: How you plan to physically set up your classroom for social studies',
  content: [
    'When I think about how I plan to physically set up my classroom...',
    // ...the rest of the paragraphs, as they are today
  ],
  date: new Date('2026-05-02'),
  tags: ['classroom setup', 'social studies', 'philosophy', 'inquiry'],
  author: { name: 'Kris', role: 'Teacher Candidate, Brock University' },
}