import type { Post, Resource } from '../types'
import bannerImage from '@/assets/teacher-banner.png'
import type { Composition } from '@/types'
import drivingInTheFog from '@/assets/driving-in-the-fog.mp3'
import flowingRiver from '@/assets/flowing-river.mp3'
import deepRed from '@/assets/deep-red.mp3'
import fridayNight from '@/assets/friday-night.mp3'
import droplets from '@/assets/droplets.mp3'
import tooMuch from '@/assets/too-much.mp3'

export const mockPosts: Post[] = [
  {
    id: '1',
    title: 'The Room as a Teacher',
    excerpt:
      'Q: How you plan to physically set up your classroom for social studies',
    content: `When I started thinking seriously about how I would set up my classroom, I assumed the layout was a logistical question. Where do the desks go? Where does my desk go? How do I get students in and out without anyone tripping over a backpack? What I did not realise is that the room itself is part of the curriculum. Marx, Fuhrer and Hartig put it plainly in their 2000 study: classrooms are physical entities as well as organisational units, and the physical characteristics of a setting shape the behaviour of the people inside it. That single idea has reshaped how I plan to set up my own space.

Their study followed a fourth-grade class for eight weeks, rotating the students between a traditional row-and-column arrangement and a semicircular one. The result was clear. Children asked significantly more questions when seated in the semicircle. The researchers connect this back to Steinzor's much older finding that face-to-face contact encourages social interaction. In rows, students are oriented toward the back of someone's head. In a semicircle, they can see each other and the teacher at once. Eye contact is unobstructed. Presence is felt more directly. The room invites participation rather than discouraging it.

The piece of the study that struck me hardest, though, was the "action zone." In the row-and-column setup, the researchers found a T-shaped and triangular region across the front and centre of the room where children asked noticeably more questions. Students outside this zone asked fewer. The same finding has appeared in classroom research for decades. What this means, practically, is that a row-and-column layout silently sorts students into participators and observers based on where they happen to sit. The students at the back and the sides are not less curious. They are seated in a way that makes asking a question feel harder.

In the semicircle, that action zone disappeared. There was no significant difference between students in central and non-central positions. Everyone was, in a sense, in the action zone. That is the finding I keep coming back to. A semicircle does not just produce more questions overall, it distributes the opportunity to participate more evenly across the class.

For a social studies classroom in particular, this matters enormously. Social studies depends on discussion, on students bringing their own experiences and questions to historical and geographical content, on the kind of dialogue that simply cannot happen if a third of the class is seated outside the zone where speaking up feels natural. If I am asking Grade 6 students to wrestle with questions about communities, government, or global connections, I need a room that says, with its furniture, that every voice in here is expected to be heard.

So my plan is to build the room around a modified semicircle or horseshoe for whole-class discussion, with the ability to break out into small clusters of four for inquiry work. I want the walls to hold student-generated questions, not just my anchor charts. I want a meeting space on the carpet for primary divisions, or a discussion corner with movable seating for junior and intermediate. The point is not the specific furniture. The point is that I am choosing a layout that says question-asking is the work of this room.

One caution the researchers raised stays with me. They noted that even in the semicircle, the overall rate of question-asking was still low, around three questions per lesson for the whole class. The room helps, but the room is not enough. Teacher style, classroom culture, and the kinds of questions I model all still matter. The physical environment is a foundation. It is not a substitute for the relationships and habits I build on top of it.

What I take from all of this, heading into my own classroom, is that I cannot afford to treat the furniture as an afterthought. Every choice about where students sit is a choice about who gets to speak, who gets seen, and what kind of thinking the room makes possible.`,
    date: new Date('2026-05-02'),
    tags: ['classroom setup', 'social studies', 'philosophy', 'inquiry'],
    coverColor: 'bg-amber-100',
    author: { name: 'Kris', role: 'Teacher Candidate, Brock University' },
  },
  {
    id: '2',
    title: 'Instructional Approaches for Social Studies',
    excerpt:
      'Q: The instructional approaches you will use to teach social studies',
    content: `The most useful thing I took from my inquiry into multilingual learners was not actually about language. It was about how to design instruction. When I went back through my notes from Cummins (2021), Bale et al. (2023), and the Ontario document on English language learners, I realized that the strategies they were describing were not narrow tricks for one population of students. They were a philosophy of teaching. The same philosophy I want to apply to how I teach social studies generally.

The core idea is this: lower the threshold between a student and their thinking. Do not make them perform in a particular form, language, or style before they are allowed to participate in the actual cognitive work of the subject. That sentence sounds simple, but once I sat with it, it started shaping almost every instructional decision I was making. Below are the approaches it has led me toward, and why each one matters.

One of the strategies that struck me hardest came from a candidate's response to a Red River Rebellion task. They suggested grouping students who shared a language together for the research phase, then remixing those groups for the dramatic recreation phase. The reasoning was that in a mixed group, "some people may not feel comfortable speaking out for clarification on an English term if the rest of the group seems to understand" (Bale et al., 2023, p. 173). So put students with people who share their experience first. Let them argue, question, and form ideas without the threshold in the way. Then mix the groups for the sharing stage, so that every student arrives at the next step with something real to bring.

I think this principle generalizes far beyond ELL contexts. Every classroom has thresholds. Some students are quiet because they are still finding their academic voice. Some are anxious about being wrong in front of peers. Some need to talk something through twice before they trust it. In a Grade 6 unit on Communities in Canada, Past and Present, I want a similar two-phase rhythm. Home groups for digging into a source, where the goal is to think out loud without performing. Expert groups for sharing, where students bring their thinking to a wider audience. Comfort first, then stretch.

Cummins (2021) argues that the analytical thinking schools say they value, things like interpretation, argument, and synthesis, is not the same as the English used to perform it. When I read that, I started thinking about how often I had quietly conflated the two in my own planning. If a student could not write a clean paragraph about a historical event, I had drifted toward assuming they did not understand the event. But these are two different skills. A student can think clearly about cause and effect and still struggle to write a topic sentence about it.

So in social studies, I want to give students multiple ways to show their cognitive work. Talk before writing. Sketch before explaining. Build a timeline with sticky notes before drafting a paragraph. Record a voice memo as a first draft. The cognitive thinking is the goal. The written form is one expression of it, not a prerequisite for being heard. This matters in social studies more than almost anywhere else, because the content itself, things like causation, perspective-taking, and continuity over time, are demanding cognitive skills that deserve their own space, separate from the writing demand stacked on top.

One candidate Bale et al. quoted suggested a multilingual vocabulary chart for Red River key terms, with columns for English, French, Mitchif, and empty columns for other languages students brought to the room (p. 174). I keep coming back to this strategy because it does two things at once. It makes the invisible visible, and it positions every student's background as a resource for the class. I want my social studies classroom to do the same. Wall displays that hold student questions, not just my anchor charts. Perspective walls during units on Indigenous history or immigration where students can pin up sources, family stories, or artifacts they bring from home. Vocabulary charts where the columns stay open for what students contribute.

This is connected to Cummins's idea of identity texts, which are pieces of work students create that reflect who they are (p. 76). For a culminating social studies task, this might mean a student creating a project on their family's migration story, or an oral history project with a grandparent, or a piece about a community they belong to. The point is that the work is theirs, in a real sense. Not a worksheet about somebody else's life.

Bale et al. (2023) found that teacher candidates near the end of their program suggested language-inclusive strategies less often than candidates near the beginning of the program (p. 183). The system was teaching them out of these ideas. One candidate's AT told him, "OK there buddy, good luck with that. I want nothing to do with that." That finding stays with me, because it warns me about something important. The instructional approaches I am committing to here will be under pressure once I am in a school. There will be timetables, prep periods, colleagues who do it differently, and report card deadlines that push toward simpler, faster, more standardized teaching.

So I am writing this down now, before that pressure starts. The instructional approaches I want for my social studies classroom are these. Comfort first, then stretch. Multiple modes of expression for the same thinking. Identity placed at the centre, not the margins. A room that reflects the people in it. Not because they are new or trendy. Because they let every student do the actual thinking. And in social studies, the actual thinking is the whole point.`,
    date: new Date('2026-05-12'),
    tags: [
      'instructional approaches',
      'social studies',
      'philosophy',
      'translanguaging',
    ],
    coverColor: 'bg-rose-100',
    author: { name: 'Kris', role: 'Teacher Candidate, Brock University' },
  },

  {
    id: '3',
    title: 'Different Lenses, Same World',
    excerpt:
      'Q: How you expect to integrate social studies and other subject areas',
    content: `When I plan a unit now, I keep coming back to a single idea: the world we are asking students to understand does not arrive divided into subjects. Climate, migration, food, technology, identity, water, history. None of these things politely sort themselves into a Science period and a Social Studies period and a Language period. The dividing lines we draw on a school timetable are conveniences for adults. They are not how the world is.

So when I think about integration, I do not start from "how can I fit social studies into other subjects." I start from somewhere different. Each subject is a lens. Each one looks at the same world and notices something the others do not. Science asks how the world works. Mathematics asks what we can measure and model. Language asks how we make meaning through words. Visual arts asks what we can see and express. And social studies asks something the others cannot quite ask on their own: who is affected, what does this mean for the people living through it, what are our responsibilities, whose voice has been heard and whose has been left out.

That last lens is the one I am increasingly convinced cannot be missing from any of the others.

Take a Grade 4 unit on Political and Physical Regions of Canada. Students could memorize the names of regions, draw boundary lines, label rivers, and complete a perfectly competent assignment. The geography lens would be in place. But without social studies, no one in that classroom would ever ask whose home this land has been, what relationships people have built with it, how the lines on the map came to exist, or what those lines have meant for the communities living across them. The map without the social studies lens is just a map. With it, the same map becomes a conversation.

This is what I mean when I say I want to integrate social studies into other subjects. Not as a decoration. Not as a wrap-up paragraph at the end of a science lesson on ecosystems. As the lens that gives the other learning its weight.

There is a phrase that has stayed with me from my own coursework: each discipline is a different way of asking what is true. Science finds truth through observation and testing. History finds truth through evidence, perspective, and careful reconstruction. Literature finds truth through experience and metaphor. When students move across these lenses inside a single unit, they start to see that knowledge is layered. No single subject holds the whole answer. And the social studies lens, the one that asks about people and relationships and consequences, is often the one that pulls everything else into focus.

This matters especially for the students I have been thinking about most. A student who is still developing academic English can be doing genuine historical thinking, genuine geographical thinking, and genuine scientific thinking all at once, if the unit is structured so that those lenses cooperate rather than compete for separated time blocks. A student whose home culture connects them to a particular region, language, or history can find themselves inside the curriculum rather than outside of it. Integration is not just a pedagogical choice. It is an equity choice. It widens the doors students can walk through.

I am also aware that integration is harder than the way I am describing it here. Real timetables, prep periods, assessment requirements, and report cards all push against this kind of fluid planning. But the answer to those pressures is not to give up on integration. It is to be honest about what social studies actually is. It is not a content area to fit in around the edges. It is the subject that asks what all of this means for human beings. Without that lens, science risks becoming technical, language risks becoming decorative, and the curriculum risks becoming a list of facts no student has any reason to care about.

I want my future classroom to feel like a place where the lenses are always within reach. Where a question about water in a science lesson can become a question about who has access to clean water, and then a question about how communities have organized around it, and then a question about how people across cultures have written and spoken about it. Not because I am trying to cram four subjects into one period, but because that is how real curiosity actually moves. From one lens to another. Around the same world.`,
    date: new Date('2026-05-11'),
    tags: ['integration', 'social studies', 'philosophy', 'curriculum design'],
    coverColor: 'bg-sky-100',
    author: { name: 'Kris', role: 'Teacher Candidate, Brock University' },
  },
  {
    id: '4',
    title: 'Getting Quiet Students to Participate',
    excerpt: 'Creating genuine safety for hesitant voices.',
    content:
      'Make pancakes and extort maple syrup from Canadian Walter White (aka Doug)...That maple syrup be 99.999% pure!',
    date: new Date('2025-05-13'),
    tags: ['student engagement'],
    coverColor: 'bg-purple-100',
    author: { name: 'Barb', role: 'Teacher' },
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
    author: { name: 'Kris', role: 'Teacher' },
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
    author: { name: 'Kris', role: 'Teacher' },
  },
  {
    id: '7',
    title: 'Reflecting on My First Full Term',
    excerpt:
      'What changed, what surprised me, and what I am carrying into next term.',
    content: 'Full content goes here...',
    date: new Date('2025-03-10'),
    tags: ['reflection'],
    coverColor: 'bg-teal-100',
    author: { name: 'Kris', role: 'Teacher' },
  },
]

export const mockResources: Resource[] = [
  {
    id: 'r1',
    title: 'Khan Academy',
    url: 'https://www.khanacademy.org',
    description:
      'Free practice exercises and instructional videos covering math from basic arithmetic through calculus.',
    topic: 'Math',
    date: new Date('2025-01-10'),
  },
  {
    id: 'r2',
    title: 'Desmos',
    url: 'https://www.desmos.com',
    description:
      'Beautiful graphing calculator and ready-made classroom activities for algebra and beyond.',
    topic: 'Math',
    date: new Date('2025-01-15'),
  },
  {
    id: 'r3',
    title: 'PhET Simulations',
    url: 'https://phet.colorado.edu',
    description:
      'Free, research-based interactive simulations for physics, chemistry, biology and earth science.',
    topic: 'Science',
    date: new Date('2025-01-20'),
  },
  {
    id: 'r4',
    title: 'National Geographic Education',
    url: 'https://education.nationalgeographic.org',
    description:
      'Lesson plans, activities and encyclopedic resources for science and geography.',
    topic: 'Science',
    date: new Date('2025-02-01'),
  },
  {
    id: 'r5',
    title: 'iCivics',
    url: 'https://www.icivics.org',
    description:
      'Games and lesson plans that teach civics, government and social studies in an engaging way.',
    topic: 'Social Studies',
    date: new Date('2025-02-05'),
  },
  {
    id: 'r6',
    title: 'National Archives Education',
    url: 'https://www.archives.gov/education',
    description:
      'Primary source documents, lesson plans and teaching tools directly from the US National Archives.',
    topic: 'Social Studies',
    date: new Date('2025-02-10'),
  },
  {
    id: 'r7',
    title: 'CommonLit',
    url: 'https://www.commonlit.org',
    description:
      'Free reading passages, literary texts and comprehension tools for grades 3 through 12.',
    topic: 'English',
    date: new Date('2025-02-15'),
  },
  {
    id: 'r8',
    title: 'NoRedInk',
    url: 'https://www.noredink.com',
    description:
      "Adaptive grammar and writing practice that adjusts to each student's level and interests.",
    topic: 'English',
    date: new Date('2025-02-20'),
  },
  {
    id: 'r9',
    title: 'Cult of Pedagogy',
    url: 'https://www.cultofpedagogy.com',
    description:
      'Research-backed teaching strategies, podcast episodes and classroom resources for all subjects.',
    topic: 'General Teaching',
    date: new Date('2025-03-01'),
  },
  {
    id: 'r10',
    title: 'Edutopia',
    url: 'https://www.edutopia.org',
    description:
      'Articles, videos and guides on evidence-based teaching strategies and school culture.',
    topic: 'General Teaching',
    date: new Date('2025-03-05'),
  },
]

import type { AboutData } from '@/types'

export const mockAbout: AboutData = {
  name: 'Kris Orel',
  role: 'Teacher',
  coverColor: 'bg-indigo-100',
  imageUrl: bannerImage,
  background: [
    'Write a few sentences about where you are from, how you got into teaching, and what subject or age group you work with.',
    'This is your space — make it personal and honest.',
  ],
  philosophy: [
    'What do you believe about how students learn best? What kind of classroom do you try to build?',
    'What matters most to you as an educator? This is a good place to be direct about your values.',
  ],
  blogDescription: [
    'Teaching Journey is a personal log of my experiences in the classroom. It is not a guide or a how-to — it is an honest record of what I am learning, what is working, and what is not.',
    'If you are a fellow teacher, a student, or just curious about what the job actually looks like from the inside, I hope you find something useful here.',
  ],
}

export const mockCompositions: Composition[] = [
  {
    id: 'c1',
    title: 'Driving in the fog',
    audioUrl: drivingInTheFog,
    // coverColor: 'bg-amber-200',
    date: new Date('2025-04-16'),
    description: 'I wanted to write an atmospheric piece in F# minor.',
    tags: ['Electronic'],
    duration: '1:50',
  },
  {
    id: 'c2',
    title: 'Flowing River',
    audioUrl: flowingRiver,
    // coverColor: 'bg-blue-200',
    date: new Date('2025-04-14'),
    description:
      "In a very subtle way, this piece was inspired by Ian Clarke's Hypnosis. E minor is a very gentle key. ",
    tags: ['Electronic'],
    duration: '2:13',
  },
  {
    id: 'c3',
    title: 'Deep Red',
    audioUrl: deepRed,
    // coverColor: 'bg-red-900',
    date: new Date('2025-02-28'),
    description:
      'I was just playing around with some sounds, and I improvied this piano melody on top of my chord progression...',
    tags: ['Electronic'],
    duration: '1:41',
  },
  {
    id: 'c4',
    title: 'Friday Night',
    audioUrl: fridayNight,
    // coverColor: 'bg-rose-300',
    date: new Date('2025-02-27'),
    description:
      "A similar chord progression used in Elgar's Enigma Variations that was then used in The Matrix.\
    For some reason, this has been my brother's favorite piece so far.",
    tags: ['Electronic'],
    duration: '1:08',
  },
  {
    id: 'c5',
    title: 'Droplets',
    audioUrl: droplets,
    // coverColor: 'bg-green-200',
    date: new Date('2025-04-30'),
    description:
      'A bit unpolished, but an interesting outcome from a quick improvisation session.',
    tags: ['Electronic'],
    duration: '1:50',
  },
  {
    id: 'c6',
    title: 'One late night...',
    audioUrl: tooMuch,
    // coverColor: 'bg-purple-200',
    date: new Date('2025-05-11'),
    description:
      "I couldn't fall asleep, and I was nervous about a pancake breakfast in class that I had to \
    bring batter for. So I wrote this...It isn't very good but a fun outcome...",
    tags: ['Electronic'],
    duration: '1:02',
  },
]
