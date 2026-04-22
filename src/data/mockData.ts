import type { Post, Resource } from '../types'

export const mockPosts: Post[] = [
  {
    id: '1',
    title: 'My First Week in the Classroom',
    excerpt:
      'Reflections on stepping into my own classroom for the first time — the nerves, the joy, and what I wish I had known.',
    content: `My hands were shaking as I wrote my name on the whiteboard for the first time. Twenty-three pairs of eyes watched me, waiting. I had spent months preparing for this moment — lesson plans, seating charts, classroom rules laminated and ready — and yet nothing quite prepares you for the weight of standing in front of a room that is genuinely depending on you.

The first thing that surprised me was the silence. Not the uncomfortable kind, but the attentive kind. They were curious about me just as much as I was nervous about them. That realisation helped.

By Wednesday I had already thrown out two planned activities. They were too long, too complicated, and I could see the energy draining from the room. I had planned for a perfect class, not a real one. Learning to read the room — to pivot when something is not working — turned out to be the most important skill of the first week.

What I wish someone had told me: bring water. Talking for six hours a day is exhausting in a way nobody warns you about. And eat lunch. You will be tempted to use that time to prepare for the afternoon. Do not. You need it.

By Friday something shifted. A student who had not spoken all week asked a genuinely curious question and the whole class leaned in. That moment made the shaking hands on Monday completely worth it.`,
    date: new Date('2025-01-05'),
    tags: ['reflection', 'first year'],
    coverColor: 'bg-blue-100',
    author: { name: 'Your Name', role: 'Teacher' },
  },

  {
    id: '2',
    title: 'Building Classroom Routines That Actually Stick',
    excerpt:
      'The systems I tried, what failed spectacularly, and the simple routines that finally worked.',
    content: 'Full content goes here...',
    date: new Date('2025-01-12'),
    tags: ['classroom management'],
    coverColor: 'bg-orange-100',
    author: { name: 'Your Name', role: 'Teacher' },
  },
  {
    id: '3',
    title: 'Lesson Planning Without Burning Out',
    excerpt:
      'How I went from spending every Sunday planning to having a sustainable weekly system.',
    content: 'Full content goes here...',
    date: new Date('2025-01-20'),
    tags: ['planning', 'wellbeing'],
    coverColor: 'bg-green-100',
    author: { name: 'Your Name', role: 'Teacher' },
  },
  {
    id: '4',
    title: 'Getting Quiet Students to Participate',
    excerpt:
      'Strategies that go beyond cold calling — creating genuine safety for hesitant voices.',
    content: 'Full content goes here...',
    date: new Date('2025-02-03'),
    tags: ['student engagement'],
    coverColor: 'bg-purple-100',
    author: { name: 'Your Name', role: 'Teacher' },
  },
  {
    id: '5',
    title: 'Parent Communication That Builds Trust',
    excerpt:
      'What I learned about reaching out early, often, and with the right tone.',
    content: 'Full content goes here...',
    date: new Date('2025-02-14'),
    tags: ['communication'],
    coverColor: 'bg-pink-100',
    author: { name: 'Your Name', role: 'Teacher' },
  },
  {
    id: '6',
    title: 'Using Exit Tickets Effectively',
    excerpt:
      'Exit tickets are only useful if you actually do something with the data. Here is my system.',
    content: 'Full content goes here...',
    date: new Date('2025-02-28'),
    tags: ['assessment'],
    coverColor: 'bg-yellow-100',
    author: { name: 'Your Name', role: 'Teacher' },
  },
  {
    id: '7',
    title: 'Reflecting on My First Full Term',
    excerpt:
      'Three months in — what changed, what surprised me, and what I am carrying into next term.',
    content: 'Full content goes here...',
    date: new Date('2025-03-10'),
    tags: ['reflection'],
    coverColor: 'bg-teal-100',
    author: { name: 'Your Name', role: 'Teacher' },
  },
]

export const mockResources: Resource[] = [
  {
    id: 'r1',
    title: 'Cult of Pedagogy',
    url: 'https://www.cultofpedagogy.com',
    description:
      'Practical teaching strategies, podcast, and research-backed classroom ideas.',
    topic: 'General Teaching',
    date: new Date('2025-01-01'),
  },
  {
    id: 'r2',
    title: 'Teach Like a Champion',
    url: 'https://teachlikeachampion.com',
    description:
      "Doug Lemov's techniques for high-impact classroom instruction.",
    topic: 'Classroom Management',
    date: new Date('2025-01-01'),
  },
]
