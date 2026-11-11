import { useState } from 'react'
import type { MinistryDocument } from '@/types/resources'

interface DocumentCoverProps {
  document: MinistryDocument
  className?: string
}

// Picture of the PDF's first page. Until there is one, a plain stand-in
// with the document's name is drawn instead
function DocumentCover({ document, className = '' }: DocumentCoverProps) {
  const [hasError, setHasError] = useState(false)
  const coverUrl = document.file?.coverUrl

  const frame = `aspect-[8.5/11] overflow-hidden rounded-tiny border border-line bg-page shadow-float ${className}`

  if (coverUrl && !hasError) {
    return (
      <img
        src={coverUrl}
        alt=""
        loading="lazy"
        onError={() => setHasError(true)}
        className={`${frame} object-cover object-top`}
      />
    )
  }

  return (
    <div aria-hidden="true" className={`${frame} relative flex flex-col`}>
      <div className={`h-1/3 ${document.file ? 'bg-cover' : 'bg-line'}`} />
      <p className="px-[10%] pt-[12%] text-[clamp(var(--text-2xs),1.1em,var(--text-sm))] font-bold leading-tight text-fg">
        {document.shortName}
      </p>
      <p className="mt-auto px-[10%] pb-[8%] text-xs text-muted">
        {document.year}
      </p>
    </div>
  )
}

export default DocumentCover
