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
  })

  return (
    <div className="rounded-xl border border-gray-100 overflow-hidden flex flex-col">
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-4">
          <h2 className="font-bold text-gray-900 leading-snug">{title}</h2>
          {duration && (
            <span className="text-xs text-gray-400 shrink-0 mt-0.5">
              {duration}
            </span>
          )}
        </div>

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-500"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {description && (
          <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
        )}

        <div className="mt-auto flex flex-col gap-3">
          <hr className="border-gray-100" />

          {audioUrl ? (
            <audio controls className="w-full h-8">
              <source src={audioUrl} type="audio/mpeg" />
              Your browser does not support audio.
            </audio>
          ) : (
            <div className="h-8 flex items-center">
              <p className="text-xs text-gray-300 italic">Audio coming soon</p>
            </div>
          )}

          <p className="text-xs text-gray-400">{formattedDate}</p>
        </div>
      </div>
    </div>
  )
}

export default CompositionCard
