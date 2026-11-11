import type { Author } from '@/types'

interface AuthorTagProps {
  author: Author
}

function AuthorTag({ author }: AuthorTagProps) {
  return (
    <div className="flex items-center gap-md">
      <div className="size-avatar rounded-pill bg-line flex items-center justify-center text-xs font-bold text-muted shrink-0">
        {author.name.charAt(0)}
      </div>
      <div>
        <p className="text-sm font-semibold text-fg">{author.name}</p>
        <p className="text-note">{author.role}</p>
      </div>
    </div>
  )
}

export default AuthorTag
