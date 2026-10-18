import { Link, Navigate, useParams } from 'react-router-dom'
import Breadcrumb from '@/components/ui/Breadcrumb'
import ComingSoon from '@/components/ui/ComingSoon'
import { getDocumentGroup } from '@/data/resources/documentGroups'
import { getLinksForDocument } from '@/data/resources/documentLinks'
import {
  getMinistryDocument,
  getPdfUrl,
} from '@/data/resources/ministryDocuments'

function DocumentPage() {
  const { slug = '' } = useParams<{ slug: string }>()
  const document = getMinistryDocument(slug)

  if (!document) return <Navigate to="/resources" replace />

  const group = getDocumentGroup(document.groupId)
  const usedOn = getLinksForDocument(document.slug)
  const sections = document.sections ?? []

  const facts = [
    ['Year', document.year],
    ['Grades', document.grades],
    ['Strands', document.strands?.join(', ')],
    ['File', document.file && `PDF, my copy (added ${document.file.added})`],
  ].filter((fact): fact is [string, string] => !!fact[1])

  return (
    <div className="col-page flex-1">
      <Breadcrumb
        className="text-gray-900"
        items={[
          { label: 'Resources' },
          { label: 'Ministry documents' },
          { label: document.shortName },
        ]}
      />

      {!document.file ? (
        <>
          <h1 className="heading-page">{document.shortName}</h1>
          <ComingSoon text="I haven't added this document yet." />
        </>
      ) : (
        <div className="col-page min-w-0">
          <header className="col-stack">
            <p className="text-label">
              Ontario Ministry of Education · {group?.name}
            </p>
            <h1 className="heading-page">{document.title}</h1>
            <p className="text-lead">{document.summary}</p>
          </header>

          <dl className="grid max-w-prose grid-cols-[auto_1fr] gap-x-5 gap-y-1 text-sm">
            {facts.map(([label, value]) => (
              <div key={label} className="contents">
                <dt className="text-gray-400">{label}</dt>
                <dd className="text-gray-900">{value}</dd>
              </div>
            ))}
            {document.officialUrl && (
              <div className="contents">
                <dt className="text-gray-400">Official</dt>
                <dd>
                  <a
                    href={document.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link"
                  >
                    Ministry's Curriculum and Resources page ↗
                  </a>
                </dd>
              </div>
            )}
          </dl>

          <div className="col-stack">
            <div className="flex flex-wrap gap-stack">
              <a
                href={getPdfUrl(document)}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-gray-700"
              >
                Open PDF ↗
              </a>
              <a
                href={document.file.url}
                download
                className="rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-50"
              >
                Download
              </a>
            </div>
            <p className="text-muted">
              Open shows the PDF in a new tab without saving it. Download saves
              a copy to your computer.
            </p>
          </div>

          {/* A line separates the introduction from the links into the PDF */}
          {(sections.length > 0 || usedOn.length > 0) && (
            <div className="col-page border-t border-gray-200 pt-page">
              {sections.length > 0 && (
                <section className="max-w-prose">
                  <h2 className="heading-section">Jump to a section</h2>
                  <p className="text-muted mb-stack">
                    Each link opens the PDF at that page.
                  </p>
                  <ul className="border-t border-gray-200">
                    {sections.map((section) => (
                      <li
                        key={section.label}
                        className="border-b border-gray-200"
                      >
                        <a
                          href={getPdfUrl(document, section.page)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex justify-between gap-3 py-2.5 text-sm text-gray-900 hover:underline"
                        >
                          {section.label}
                          <span className="text-gray-400 tabular-nums">
                            p. {section.page}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {usedOn.length > 0 && (
                <section>
                  <h2 className="heading-section mb-section">
                    Used on this site
                  </h2>
                  <div className="flex flex-wrap gap-stack">
                    {usedOn.map((link) => (
                      <Link
                        key={link.to}
                        to={link.to}
                        className="rounded-full border border-gray-200 px-3 py-1 text-sm text-gray-700 transition-colors hover:bg-gray-50"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default DocumentPage
