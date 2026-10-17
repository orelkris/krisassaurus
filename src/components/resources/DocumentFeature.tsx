import { Link } from 'react-router-dom'
import { getLinksToPage } from '@/data/resources/documentLinks'
import {
  getMinistryDocument,
  getPdfUrl,
} from '@/data/resources/ministryDocuments'

interface DocumentFeatureProps {
  // The page this card sits on, matched against documentLinks
  page: string
}

// "Curriculum" cards for the documents linked to a page; shows nothing when
// the page has no links
function DocumentFeature({ page }: DocumentFeatureProps) {
  const items = getLinksToPage(page).flatMap((link) => {
    const document = getMinistryDocument(link.documentSlug)
    return document?.file ? [{ link, document }] : []
  })

  if (items.length === 0) return null

  return (
    <section className="flex flex-col gap-3">
      {items.map(({ link, document }) => (
        <div
          key={document.slug}
          className="flex flex-col items-start gap-1 rounded-2xl border border-gray-200 p-4 sm:p-5"
        >
          <p className="text-xs uppercase tracking-wide text-gray-400">
            Curriculum
          </p>
          <h2 className="font-bold leading-snug text-gray-900">
            {document.title} ({document.year.replace('Revised ', '')})
          </h2>
          <p className="text-sm text-gray-500">{link.blurb}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <a
              href={getPdfUrl(document, link.page)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-gray-700"
            >
              Open {link.page && link.pageLabel ? link.pageLabel : 'the PDF'} ↗
            </a>
            <Link
              to={`/resources/documents/${document.slug}`}
              className="rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-50"
            >
              About this document
            </Link>
          </div>
        </div>
      ))}
    </section>
  )
}

export default DocumentFeature
