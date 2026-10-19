import type { Composition } from '@/types'
import drivingInTheFog from '@/assets/music/driving-in-the-fog.mp3'
import flowingRiver from '@/assets/music/flowing-river.mp3'
import deepRed from '@/assets/music/deep-red.mp3'
import fridayNight from '@/assets/music/friday-night.mp3'
import inTheDark from '@/assets/music/in-the-dark.mp3'
import phrygian from '@/assets/music/phrygian.mp3'

export const compositions: Composition[] = [
  {
    id: 'c1',
    title: 'Driving in the fog',
    audioUrl: drivingInTheFog,
    date: new Date('2025-04-16'),
    description: 'I wanted to write an atmospheric piece in F# minor.',
    tags: ['Electronic'],
    duration: '1:50',
  },
  {
    id: 'c2',
    title: 'Flowing River',
    audioUrl: flowingRiver,
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
    date: new Date('2025-02-27'),
    description:
      "A similar chord progression used in Elgar's Enigma Variations that was then used in The Matrix.\
    For some reason, this has been my brother's favorite piece so far.",
    tags: ['Electronic'],
    duration: '1:08',
  },
  {
    id: 'c5',
    title: 'Phrygian',
    audioUrl: phrygian,
    date: new Date('2025-04-30'),
    description:
      'Based on the Phrygian mode (sensual).',
    tags: ['Electronic'],
    duration: '1:23',
  },
  {
    id: 'c6',
    title: 'In the Dark',
    audioUrl: inTheDark,
    date: new Date('2025-05-11'),
    description:
      "Just looking at you in the dark...",
    tags: ['Electronic'],
    duration: '2:15',
  },
]