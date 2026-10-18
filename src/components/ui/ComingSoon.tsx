import { Link } from 'react-router-dom'
import type { CrossLink } from '@/types/drama'

interface ComingSoonProps {
  title?: string
  text: string
  // Optional link to a related page that already exists
  related?: CrossLink
}

// Placeholder for any page or section whose content isn't ready yet
function ComingSoon({ title = 'Coming soon', text, related }: ComingSoonProps) {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex flex-1 flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-gray-200 px-6 py-12 text-center">
        <h2 className="heading-section">{title}</h2>
        <p className="text-small max-w-md">{text}</p>
      </div>
      {related && (
        <p className="text-small">
          {related.label}{' '}
          <Link to={related.to} className="link">
            {related.linkText}
          </Link>
        </p>
      )}
    </div>
  )
}

export default ComingSoon
