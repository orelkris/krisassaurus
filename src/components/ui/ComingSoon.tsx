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
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <p className="text-sm text-gray-500 max-w-md">{text}</p>
      </div>
      {related && (
        <p className="text-sm text-gray-500">
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
