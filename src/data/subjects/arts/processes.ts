import type { ArtsProcess, CreativeStage, CriticalAspect } from '@/types/arts'

// The two processes in The Arts, Grades 1–8 (2009). Text from the document

export const creativeProcess: ArtsProcess = {
  slug: 'creative-process',
  name: 'Creative Process',
  intro:
    'The creative process is intended to be followed in a flexible, fluid, and cyclical manner.',
  pages: '19–22',
}

export const criticalProcess: ArtsProcess = {
  slug: 'critical-analysis-process',
  name: 'Critical Analysis Process',
  intro:
    'The process is intended to be used in a flexible manner. The cultural context of the work should be taken into consideration throughout the critical analysis process.',
  pages: '23–28',
}

export const ARTS_PROCESSES = [creativeProcess, criticalProcess]

// In the middle of the creative process's cycle
export const creativeCentre: [string, string] = ['Feedback', 'and reflection']

export const creativeStages: CreativeStage[] = [
  {
    name: 'Challenging and Inspiring',
    lines: ['Challenging and', 'Inspiring'],
    student: [
      'uses creative ideas inspired by the stimulus for creation',
      'uses research, takes inventory, makes choices',
      'participates in the development of a plan or description of criteria for evaluating success',
    ],
    teacher: [
      'introduces the initial idea, challenge, stimulus, inspiration, experience',
      'provides models, examples, and/or learning goals',
      'establishes expectations, defines parameters, and helps develop criteria for evaluating success',
    ],
  },
  {
    name: 'Imagining and Generating',
    lines: ['Imagining and', 'Generating'],
    student: [
      'uses ideas inspired by the stimulus: brainstorms, “bodystorms”, lists, sketches, discusses, poses questions, draws on prior knowledge and experience',
      'defines the problem in a unique way',
    ],
    teacher: [
      'observes, listens, prompts with questions, and provides choices',
    ],
  },
  {
    name: 'Planning and Focusing',
    lines: ['Planning and', 'Focusing'],
    student: [
      'gathers information, storyboards ideas, discusses, determines a focus for exploration, uses a variety of tools for recording plans (e.g., inquiry, research)',
      'states what he or she is trying to do, or articulates the idea to be developed',
      'makes choices about the art forms, tools, strategies, and formal concepts (e.g., elements)',
    ],
    teacher: [
      'provides a rich variety of materials and resources',
      'strategically asks questions and/or models planning strategies',
      'shares a variety of samples of plans',
      'structures planning and provides choices (e.g., assigns group management roles to students)',
    ],
  },
  {
    name: 'Exploring and Experimenting',
    lines: ['Exploring and', 'Experimenting'],
    student: [
      'uses a range of arts elements, techniques, conventions, and/or principles (as appropriate for each strand) in response to the challenge, stimulus, or inspiration introduced by the teacher or teaching artist or set by the student',
    ],
    teacher: [
      'continues to provide a rich variety of materials and resources for open-ended activities',
      'continues to ask questions and provide direct instruction strategically',
      'provides reference charts of the elements, techniques, conventions, and/or principles (as appropriate for each strand)',
      'provides positive reinforcement for risk taking; expects focus; encourages incubation',
      'provides time to practise',
    ],
  },
  {
    name: 'Producing Preliminary Work',
    lines: ['Producing', 'Preliminary Work'],
    student: [
      'commits to artistic choices and works to make his or her meaning clear for an intended audience',
      'creates the work (i.e., the embodiment of the idea)',
    ],
    teacher: [
      'asks questions about meaning and intended audience',
      'observes aspects of the work and provides descriptive feedback (e.g., verbal, written)',
      'encourages students to reason, communicate ideas, make connections, and apply knowledge and skills',
    ],
  },
  {
    name: 'Revising and Refining',
    lines: ['Revising and', 'Refining'],
    student: [
      'shares preliminary work with peers; invites outside opinions; develops and refines the formal concepts (elements, techniques, conventions, principles, as appropriate for each strand)',
      'reworks the piece, building on strengths and incorporating feedback',
      'develops and modifies initial idea; makes choices, adapts, and shapes',
    ],
    teacher: [
      'continues to ask questions about meaning and intended audience',
      'continues to provide numerous learning opportunities that are varied, and supports the learning needs and experiences of the students',
      'observes and provides descriptive feedback; encourages students to look for alternatives and give reasons for decisions',
      'provides time and opportunities for reflection and revision',
    ],
  },
  {
    name: 'Presenting, Performing, and Sharing',
    lines: ['Presenting, Performing,', 'and Sharing'],
    student: [
      'identifies an audience (e.g., teacher, parents, peers, community) and prepares a space for sharing the work',
      'finalizes his or her production',
    ],
    teacher: [
      'promotes student talk about the arts',
      'makes necessary arrangements to ensure that performers/exhibitors are sharing with an appropriate audience',
      'promotes the collaborative sharing of ideas and strategies; helps structure the sharing for students',
      'is supportive',
    ],
  },
  {
    name: 'Reflecting and Evaluating',
    lines: ['Reflecting and', 'Evaluating'],
    student: [
      'reflects on the process and the degree of success, and identifies further learning goals and opportunities and next steps',
    ],
    teacher: [
      'encourages reflection',
      'links evaluation to criteria and the lessons taught',
      'provides a variety of methods of evaluation to accommodate the learning styles of a variety of students',
      'provides descriptive feedback',
      'evaluates on the basis of a body of evidence collected over time',
    ],
  },
]

export const criticalAspects: CriticalAspect[] = [
  {
    name: 'Initial Reaction',
    description:
      'Students are encouraged to express their first reaction to a work.',
    questions: [
      'What is your first impression?',
      'What does this work bring to mind?',
      'What does this work remind you of?',
      'What do you feel? What emotions does this work evoke?',
      'What puzzles you? What are your questions?',
      'What connections can you make between this work and your own experience or other art forms?',
    ],
  },
  {
    name: 'Description',
    description:
      'Students are asked to brainstorm and list everything they see or hear in the work.',
    questions: [
      'What do you see when you examine the work closely?',
      'What grabs your attention in the work?',
      'What do you sense (e.g., see, hear, smell, feel, taste) when you examine the work?',
      'What stands out for you? What do you notice (e.g., elements)?',
      'What “qualities” do you hear or see in this work (e.g., a performer speaking in role with clarity and conviction)?',
      'What do you think the artist worked particularly hard at while he or she created this work?',
    ],
  },
  {
    name: 'Analysis and Interpretation',
    description:
      'Students try to figure out what the artist has done to achieve certain effects.',
    questions: [
      'What elements and conventions of the art form are used in this work?',
      'How are the elements organized, combined, or arranged?',
      'How does the work evoke ideas, feelings, and images?',
      'What do you think is the theme or subject of the work?',
      'Why do you think the playwright created this work?',
      'What message or meaning do you think the work conveys?',
      'In your opinion, what is the artist’s view of the world?',
      'How does this view match or contrast with your own view of the world?',
    ],
  },
  {
    name: 'Expression of an Informed Point of View',
    description:
      'Students compare their point of view after reflection and analysis to their initial reaction and make connections to other works of art they have seen or heard.',
    questions: [
      'How effectively does the artist select and combine elements to achieve an intended effect in this work?',
      'What doesn’t work and why?',
      'Has your point of view shifted from your initial reaction? If so, how has it changed?',
      'What made you change your mind?',
      'If you have not changed your mind, can you now explain your first reaction more fully or precisely?',
      'Is this an important work? Why?',
    ],
    ownWork: [
      'In what ways do you feel the work is successful?',
      'How did it affect the audience? Was it the way you intended?',
      'How would you alter this work for a different audience, or to send a different message?',
    ],
  },
  {
    name: 'Consideration of Cultural Context',
    description:
      'Everyone views the world through various lenses, and our views of the world and our life experiences inform our understanding of works in the arts.',
    questions: [
      'What interesting things did you learn about the artist’s life and work?',
      'Are there viewpoints or voices that are left out or never heard in the works?',
      'In what ways do you agree or disagree with what the artist or critics said about the work?',
      'Why might different audiences view a work in a way that is different from the artist’s intention?',
      'How might the work be understood differently by different people in the same time period or by people in the past and in the present?',
      'Were you surprised by anything you discovered? If so, what?',
    ],
  },
]
