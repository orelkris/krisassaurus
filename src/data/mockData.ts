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
    title: 'Building a Relational Social Studies Classroom',
    excerpt:
      'Q: How you plan to physically set up your classroom for social studies',
    content: [
      'When I think about how I plan to physically set up my classroom for social studies, I always keep the idea of "classrooms are not neutral spaces" in my mind. The way a room is organized shapes participation, communication, and the relationships students build with one another. Because social studies is rooted in discussion, inquiry, and community, I want my classroom to reflect those values physically as well as academically.',
      'Instead of organizing students in rows facing the front of the room, I plan to create a flexible learning environment built around grouped tables, circles, and shared spaces. I want students to feel like participants in the learning process rather than passive receivers of information. A circular or semicircle arrangement creates stronger opportunities for eye contact, discussion, and collaborative thinking. It also helps reduce the feeling that knowledge only flows from the teacher to the student. In social studies especially, learning should feel relational and community-based rather than hierarchical.',

      'I also want movement to remain part of the classroom experience, even in older grades. One observation that stayed with me is how kindergarten classrooms allow students to move freely, gather on carpets, and interact naturally with one another, while older students are often expected to remain separated at individual desks. In my future classroom, I want to maintain some of that flexibility because I believe it supports connection, comfort, and participation. Students should have opportunities to move between discussion circles, collaborative inquiry spaces, independent work areas, and reflective spaces depending on the activity and their learning needs.',

      'This type of setup also connects closely to culturally responsive and inclusive teaching practices. I want students to see the classroom as a shared learning community where multiple perspectives, identities, and experiences are valued. Flexible seating and collaborative layouts help create space for students to communicate horizontally with one another instead of always directing their attention toward the teacher. That structure supports dialogue, inquiry, and collective meaning-making, which are all central to social studies education.',

      'I also plan to intentionally design the classroom environment to support English language learners and diverse learners through visual supports, accessible resources, and cooperative learning structures. Social studies learning becomes more meaningful when students can interact with ideas through conversation, group inquiry, graphic organizers, maps, visuals, and hands-on activities. A classroom that encourages collaboration and flexibility allows students to engage in ways that reflect their strengths and identities.',
      'For example, it would be great to have words from multiple languages around the room. Students could be encouraged to create an assignment entirely in their home language, and we could post it on the wall for others to explore. Greetings and other culturally relevant phrases could be displayed around the room as well, so that the languages students bring with them are visible in the space rather than something they leave at the door. I am also making a list (and already buying!) books that I have read recently and have had recommended to me by my Brock teachers and classmates, and I want to keep those around the room. It would be good to have books in multiple languages too, so that students can see their own languages reflected on the shelves alongside English.',

      'I want the physical setup of my classroom to communicate that every student belongs in the learning process. Social studies should help students build relationships with one another, critically examine the world around them, and recognize themselves as active members of a community. By creating a classroom organized around circles, collaboration, flexibility, and shared inquiry, I hope to build a learning environment that reflects those goals every day.',
    ],
    date: new Date('2026-05-02'),
    tags: ['classroom setup', 'social studies', 'philosophy', 'inquiry'],
    author: { name: 'Kris', role: 'Teacher Candidate, Brock University' },
  },
  {
    id: '2',
    title: 'Instructional Approaches for Social Studies',
    excerpt:
      'Q: The instructional approaches you will use to teach social studies',
    content: [
      "Reflecting on how I would like to approach my approach to teaching Social Studies, I think that it is less about memorizing isolated facts and more about helping students understand how people's lives are shaped by their communities, environments, routines, and relationships. I want students to feel that social studies is connected to real human experiences, not something that only exists inside a textbook. Students are far more likely to engage deeply with learning when they feel emotionally safe, connected to the material, and encouraged to share their own perspectives and experiences. To me, learning should feel participatory and relational. Students need to recognize that their ideas, questions, and observations matter within the classroom community.",
      'Because of this, many of my instructional approaches focus on storytelling, inquiry, collaboration, reflection, and discussion. Storytelling is especially important to me. Stories make concepts more memorable and emotionally meaningful, and they give students something to connect to their own lives. I also value collaborative discussion and community-building practices, such as circles and shared inquiry, because students learn by hearing different perspectives and building understanding together. Reflection through sketching, writing, discussion, and other multimodal activities gives students different ways to organize their thinking and communicate what they understand, rather than forcing one format on everyone.',

      'In a Grade 2 Social Studies unit focused on global communities, students could explore how children around the world experience their daily lives differently depending on their environment, climate, culture, and community. Rather than simply memorizing information about other countries, students might examine stories, images, maps, videos, and personal experiences to better understand how other children live, learn, play, travel, and spend time with their families. This is personally meaningful for me. I immigrated to Canada when I was nine, and one of the things I remember most clearly is how unfamiliar everything felt, and how much I would have benefited from a classroom where the daily life I had come from was treated as something worth talking about, rather than something to leave behind. That is the kind of classroom I want to build.',
      "Using a text such as This Is How We Do It by Matt Lamothe, students could compare aspects of their own daily routines with those of children from different communities around the world. Through collaborative discussions, students might ask questions about food, clothing, weather, transportation, school, and family life, while thinking critically about why those differences exist. Students might then create questions for a class pen pal letter, encouraging them to think beyond their own experiences and consider different perspectives with curiosity and empathy. I like this kind of task because the writing has a real purpose attached to it. It is not a worksheet about somebody else's life. It is a letter, going somewhere, to somebody.",
      'Through inquiry, discussion, reflection, and multimodal expression, students are encouraged to see social studies not as learning about "other" people, but as learning about relationships between people, places, environments, and ways of life. Most importantly, I want students to leave social studies feeling curious about the world, and more connected to the people living in it.',
    ],
    date: new Date('2026-05-12'),
    tags: ['instructional approaches', 'social studies', 'philosophy'],
    author: { name: 'Kris', role: 'Teacher Candidate, Brock University' },
  },

  {
    id: '3',
    title: 'Different Lenses, Same World',
    excerpt:
      'Q: How you expect to integrate social studies and other subject areas',
    content: [
      "Throughout my experiences as a Brock teacher candidate, I've realized that I really care about how well my lesson and unit plans are connected. Students do not experience the world through separate subjects. A conversation about community can quickly turn into a story, a piece of art, or a discussion about fairness and belonging. The lines between Social Studies, Language, and the Arts may help organize a timetable, but they are not really how curiosity works for children, and they are not how learning actually moves throughout a day.",

      "I don't want think about integration as “fitting” one subject into other subjects. I want to give value and care to each subject. Each one brings something important and unique to the learning experience. Language helps students communicate meaning through stories and discussion. The Arts help students express emotions, identities, and experiences creatively. Social studies asks who is affected, whose voices are heard, and what responsibilities people have to one another. Each subject props the other up and together, they make learning feel more connected and meaningful.",

      'During the 8P09 course, my group and I worked on creating two lesson plans for the Minds-on and Action portions of a lesson. How did that experience help me think about the importance of subject integration? We looked at the Grade 2 Social Studies curriculum and were tasked with integrating it with Literacy. The focus was on learning about global communities, and this topic creates a very natural way of integrating it with the Language curriculum. Through the lens of social studies, students might explore the communities they belong to and think about how people help make communities welcoming and connected. Through the Language lens, students could read and discuss stories about families, traditions, and neighbourhoods while sharing their own experiences through speaking and writing activities. This creates a natural entry point into the lesson. Books are a fantastic way to start off a lesson, and once you have that opening, the rest of the plan starts to come together almost on its own. It also creates a natural extension into integrating with the Arts, because students might create visual representations of important places in their community or dramatize community stories through role play.',

      'I also believe integrated learning creates more opportunities for students to participate meaningfully. Some students may communicate complex ideas more confidently through discussion, drama, movement, or visual art than through formal writing alone. Integration allows students to move between different ways of showing understanding while helping them see their own experiences reflected within the classroom.',

      'I want my classroom to feel like a place where subjects are always connected, because that is how real curiosity naturally moves through the world!',
    ],
    date: new Date('2026-05-11'),
    tags: ['integration', 'social studies', 'philosophy', 'curriculum design'],
    author: { name: 'Kris', role: 'Teacher Candidate, Brock University' },
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
  aboutMe: [
    'My name is Kris Orel, and I am currently pursuing a Bachelor of Education with a focus in music while also working toward additional math qualifications. Alongside my studies, I bring experience in programming and IT customer service, which has sharpened my problem-solving and technical skills.',
  ],
  blogDescription: [
    'This blog is a space for me to document my journey as an educator, reflect on teaching and learning, and share ideas that inspire me. One of the major inspirations behind creating this space was reading reflections written by teachers like Aviva, whose blog posts emphasized the importance of documenting learning, revisiting student thinking, and reflecting honestly on classroom experiences. Her work made me realize that putting learning online can create opportunities for connection, reflection, and professional growth.',
    'I want this blog to function almost like a living journal or portfolio. A place where ideas can evolve over time rather than needing to be immediately “perfect.” Some posts may focus on lesson ideas, creativity, inquiry, and interdisciplinary learning, while others may explore self-regulation, storytelling, technology, classroom community, or the emotional side of learning.',
    'Most importantly, I hope this blog reflects a belief that learning is deeply human. Learning is not just about performance or outcomes. It is about curiosity, experimentation, reflection, connection, and discovering meaning in the world around us.',
  ],
  background: [
    'I am currently studying to become an elementary teacher, and throughout this journey I’ve been thinking deeply about what kind of classroom I want to create. A lot of my ideas about teaching come from my own experiences with creativity, storytelling, reflection, and learning differently from the people around me. I’ve always been drawn to spaces where people feel safe enough to share ideas passionately and honestly, and I want my classroom to feel like that too.',
    'Some of my strongest learning experiences have come from creative exploration. Music, video games, storytelling, sketching, journaling, and digital media have all shaped the way I think and communicate. I still remember the excitement of discovering I could compose music for a hand-cranked music box, or the feeling of creating something meaningful through video editing and improvisation. Those experiences taught me that creativity is not separate from learning. Creativity is often how we make sense of the world.',
    'I also care deeply about documentation and reflection. Inspired by teachers like Aviva, who emphasizes documenting student thinking and revisiting learning over time, I’ve started reflecting more intentionally on my own learning process. Whether it’s journaling, recording ideas, organizing thoughts, or revisiting conversations, I’ve realized that documentation can help reveal patterns, strengthen understanding, and create space for growth. That idea continues to shape the kind of educator I hope to become.',
  ],
  philosophy: [
    'I believe every student enters the classroom carrying stories, experiences, interests, and ways of seeing the world that deserve to be valued. Just as my own family memories, creative experiences, and personal interests have shaped who I am, I believe students learn best when their identities and lived experiences are welcomed into the learning process. These stories are not distractions from learning. They are often the foundation for meaningful learning.',
    'Creativity is also central to my teaching philosophy. I do not see creativity as an “extra” reserved only for arts education. Creativity is how students experiment, problem-solve, communicate ideas, and discover confidence in themselves. Whether students are sketching scientific observations, creating stories, building models, composing music, or designing digital projects, creativity allows learning to become personal and memorable.',
    'I also believe students need emotionally safe environments where they feel comfortable expressing themselves authentically. Many students carry anxieties, insecurities, or fears about being “wrong,” and I want my classroom to feel like a space where experimentation and curiosity are encouraged rather than punished. I value process as much as product. Learning is often messy, iterative, and nonlinear, and students deserve room to explore ideas over time without feeling pressured to achieve perfection immediately.',
    'Technology also plays an important role in my philosophy, not as a replacement for human connection, but as a creative and collaborative tool. Video games taught me problem-solving and persistence. Video creation taught me storytelling and communication. Digital tools can help students create, collaborate, reflect, and share their thinking in meaningful ways when used intentionally and creatively.',
  ],

  standpoint: {
    text: [
      "This video is a glimpse into the experiences that have shaped me as an educator. You'll see my cherished family photos, a painting of my cat made by my sister-in-law, and my flute, which has been my creative companion since I was 5. The centerpiece is a mechanical music box tuned to beautiful and rich key of A-flat. You have to punch holes into a paper strip to create a melody and then turn a handle on the music box to bring it to life! I composed this piece specifically for my standpoint reflection. This is what drives my passion for teaching creativity: storytelling, and hands-on learning. I hope you enjoy it :) ",
    ],
    youtubeId: '0-ecQBtvilY',
  },
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
    tags: ['Electronic', 'Piano'],
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
