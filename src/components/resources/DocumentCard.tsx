import { Link } from 'react-router-dom'
import type { MinistryDocument } from '@/types/resources'
import DocumentCover from '@/components/resources/DocumentCover'

interface DocumentCardProps {
  document: MinistryDocument
}

function DocumentCard({ document }: DocumentCardProps) {
  const body = (
    <>
      <DocumentCover document={document} className="w-full" />
      <span className="text-sm font-semibold leading-snug text-fg group-hover:underline">
        {document.shortName}
      </span>
      <span className="text-note">
        {document.file ? document.year : 'Coming soon'}
      </span>
    </>
  )

  // Documents without a PDF yet aren't clickable
  if (!document.file) {
    return <div className="flex flex-col gap-xs opacity-60">{body}</div>
  }

  return (
    <Link
      to={`/resources/documents/${document.slug}`}
      className="group flex flex-col gap-xs"
    >
      {body}
    </Link>
  )
}

export default DocumentCard
