import type { MathBlock } from '@/types/math'
import Fold from '@/components/ui/Fold'
import MathText from '@/components/math/MathText'
import MathBlockView from '@/components/math/blocks/MathBlockView'

interface MathCardProps {
  // Small coloured label above the title, e.g. "Activity 01"
  eyebrow?: string
  eyebrowColor?: string
  title: string
  summary: string
  body?: string
  blocks: MathBlock[]
  // Lines between blocks, for activities with several steps
  divided?: boolean
  wide?: boolean
  // The ministry's own wording, folded away at the bottom of the card
  original?: string
}

// A concept or activity card. Cards sit two per row in a grid
function MathCard({
  eyebrow,
  eyebrowColor,
  title,
  summary,
  body,
  blocks,
  divided = false,
  wide = false,
  original,
}: MathCardProps) {
  return (
    <article
      className={`math-card card col-stack min-w-none ${
        wide ? 'wide:col-span-2' : ''
      }`}
    >
      <header>
        {eyebrow && (
          <span
            className="text-xs font-bold uppercase tracking-wider"
            style={{ color: eyebrowColor }}
          >
            {eyebrow}
          </span>
        )}
        <h3 className="heading-card mt-px mb-px">{title}</h3>
        <p className="text-xs text-muted">{summary}</p>
      </header>

      {body && (
        <p className="max-w-read text-sm leading-relaxed">
          <MathText text={body} />
        </p>
      )}

      {blocks.map((block, index) => (
        <div
          key={index}
          className={
            divided && index > 0 && block.type !== 'tip'
              ? 'border-t border-line pt-md'
              : ''
          }
        >
          <MathBlockView block={block} />
        </div>
      ))}

      {original && (
        <Fold label="Ministry wording" className="mt-auto">
          <p>
            <MathText text={original} />
          </p>
        </Fold>
      )}
    </article>
  )
}

export default MathCard
