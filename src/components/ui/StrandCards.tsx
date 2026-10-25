import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import DotList from '@/components/ui/DotList'

export interface StrandCard {
  id: string
  to: string
  name: string
  // Shown before the name, e.g. a StrandBadge
  badge?: ReactNode
  blurb?: string
  // The smaller parts of the strand, e.g. Math's ideas
  points: string[]
  // Colour of the dot before each point
  accent: string
}

interface StrandCardsProps {
  cards: StrandCard[]
}

// One card per strand, two across (one on phones): the name, a line about
// it, then its parts as a dotted list. Each subject's Overview uses it for
// "Follow ... across grades"
function StrandCards({ cards }: StrandCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-grid sm:grid-cols-2">
      {cards.map((card) => (
        <Link key={card.id} to={card.to} className="card card-hover col-stack">
          {/* The badge sits on the first line when the name wraps */}
          <h3 className="heading-card row-stack items-start">
            {card.badge}
            {card.name}
          </h3>
          {card.blurb && <p className="text-small">{card.blurb}</p>}
          <DotList items={card.points} color={card.accent} />
        </Link>
      ))}
    </div>
  )
}

export default StrandCards
