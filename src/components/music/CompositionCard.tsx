import type { Composition } from '@/types'

interface CompositionCardProps {
  composition: Composition
}

function CompositionCard({ composition }: CompositionCardProps) {
  const { title, audioUrl, coverColor, date, description, tags, duration } =
    composition

  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  })

  return (
    <div className="rounded-card border border-line overflow-hidden flex flex-col">
      {coverColor ? <div className={`h-cover w-full ${coverColor}`} /> : null}

      <div className="p-md flex flex-col gap-md flex-1">
        <div className="flex items-start justify-between gap-md">
          <h2 className="heading-card">{title}</h2>
          {duration && (
            <span className="text-note shrink-0 mt-px">{duration}</span>
          )}
        </div>

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-xs">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-sm py-px text-xs rounded-pill bg-soft text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {description && <p className="text-small">{description}</p>}

        <div className="mt-auto flex flex-col gap-md">
          <hr className="border-line" />

          {audioUrl ? (
            <audio controls className="w-full h-player">
              <source src={audioUrl} type="audio/mpeg" />
              Your browser does not support audio.
            </audio>
          ) : (
            <div className="h-player flex items-center">
              <p className="text-xs text-faint italic">Audio coming soon</p>
            </div>
          )}

          <p className="text-note">{formattedDate}</p>
        </div>
      </div>
    </div>
  )
}

export default CompositionCard
