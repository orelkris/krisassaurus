import type { AboutData } from '@/types'
import bannerImage from '@/assets/teacher-banner.png'

export const about: AboutData = {
  name: 'Kris Orel',
  role: 'Teacher',
  coverColor: 'bg-indigo-100',
  imageUrl: bannerImage,
  sections: [
    {
      id: 'about',
      label: 'About Me',
      paragraphs: [
        'My name is Kris Orel, and I am currently pursuing a Bachelor of Education with a focus in music while also working toward additional math qualifications. Alongside my studies, I bring experience in programming and IT customer service, which has sharpened my problem-solving and technical skills.',
      ],
    },
    {
      id: 'blog',
      label: 'About This Blog',
      paragraphs: [
        'This blog is a space for me to document my journey as an educator, reflect on teaching and learning, and share ideas that inspire me. One of the major inspirations behind creating this space was reading reflections written by teachers like Aviva, whose blog posts emphasized the importance of documenting learning, revisiting student thinking, and reflecting honestly on classroom experiences. Her work made me realize that putting learning online can create opportunities for connection, reflection, and professional growth.',
        'I want this blog to function almost like a living journal or portfolio. A place where ideas can evolve over time rather than needing to be immediately “perfect.” Some posts may focus on lesson ideas, creativity, inquiry, and interdisciplinary learning, while others may explore self-regulation, storytelling, technology, classroom community, or the emotional side of learning.',
        'Most importantly, I hope this blog reflects a belief that learning is deeply human. Learning is not just about performance or outcomes. It is about curiosity, experimentation, reflection, connection, and discovering meaning in the world around us.',
      ],
      links: [{ label: 'Support Aviva!', href: 'https://adunsiger.com/' }],
    },
    {
      id: 'background',
      label: 'Background',
      paragraphs: [
        'I am currently studying to become an elementary teacher, and throughout this journey I’ve been thinking deeply about what kind of classroom I want to create. A lot of my ideas about teaching come from my own experiences with creativity, storytelling, reflection, and learning differently from the people around me. I’ve always been drawn to spaces where people feel safe enough to share ideas passionately and honestly, and I want my classroom to feel like that too.',
        'Some of my strongest learning experiences have come from creative exploration. Music, video games, storytelling, sketching, journaling, and digital media have all shaped the way I think and communicate. I still remember the excitement of discovering I could compose music for a hand-cranked music box, or the feeling of creating something meaningful through video editing and improvisation. Those experiences taught me that creativity is not separate from learning. Creativity is often how we make sense of the world.',
        'I also care deeply about documentation and reflection. Inspired by teachers like Aviva, who emphasizes documenting student thinking and revisiting learning over time, I’ve started reflecting more intentionally on my own learning process. Whether it’s journaling, recording ideas, organizing thoughts, or revisiting conversations, I’ve realized that documentation can help reveal patterns, strengthen understanding, and create space for growth. That idea continues to shape the kind of educator I hope to become.',
      ],
    },
    {
      id: 'philosophy',
      label: 'Teaching Philosophy',
      paragraphs: [
        'I believe every student enters the classroom carrying stories, experiences, interests, and ways of seeing the world that deserve to be valued. Just as my own family memories, creative experiences, and personal interests have shaped who I am, I believe students learn best when their identities and lived experiences are welcomed into the learning process. These stories are not distractions from learning. They are often the foundation for meaningful learning.',
        'Creativity is also central to my teaching philosophy. I do not see creativity as an “extra” reserved only for arts education. Creativity is how students experiment, problem-solve, communicate ideas, and discover confidence in themselves. Whether students are sketching scientific observations, creating stories, building models, composing music, or designing digital projects, creativity allows learning to become personal and memorable.',
        'I also believe students need emotionally safe environments where they feel comfortable expressing themselves authentically. Many students carry anxieties, insecurities, or fears about being “wrong,” and I want my classroom to feel like a space where experimentation and curiosity are encouraged rather than punished. I value process as much as product. Learning is often messy, iterative, and nonlinear, and students deserve room to explore ideas over time without feeling pressured to achieve perfection immediately.',
        'Technology also plays an important role in my philosophy, not as a replacement for human connection, but as a creative and collaborative tool. Video games taught me problem-solving and persistence. Video creation taught me storytelling and communication. Digital tools can help students create, collaborate, reflect, and share their thinking in meaningful ways when used intentionally and creatively.',
      ],
    },
    {
      id: 'standpoint',
      label: 'Standpoint',
      paragraphs: [
        "This video is a glimpse into the experiences that have shaped me as an educator. You'll see my cherished family photos, a painting of my cat made by my sister-in-law, and my flute, which has been my creative companion since I was 5. The centerpiece is a mechanical music box tuned to beautiful and rich key of A-flat. You have to punch holes into a paper strip to create a melody and then turn a handle on the music box to bring it to life! I composed this piece specifically for my standpoint reflection. This is what drives my passion for teaching creativity: storytelling, and hands-on learning. I hope you enjoy it :) ",
      ],
      media: {
        type: 'youtube',
        youtubeId: '0-ecQBtvilY',
        title: 'Standpoint video',
      },
    },
  ],
}