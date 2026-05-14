import type { Author } from '@/types'

interface AuthorTagProps {
  author: Author
}

function AuthorTag({ author }: AuthorTagProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600 shrink-0">
        {author.name.charAt(0)}
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-800">{author.name}</p>
        <p className="text-xs text-gray-400">{author.role}</p>
      </div>
    </div>
  )
}

export default AuthorTag
