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
    <div className="flex flex-1 flex-col gap-7">
      <Breadcrumb
        className="text-gray-900"
        items={[
          { label: 'Resources', to: '/resources' },
          {
            label: 'Ministry documents',
            to: `/resources?group=${document.groupId}`,
          },
          { label: document.shortName },
        ]}
      />

      {!document.file ? (
        <>
          <h1 className="text-3xl font-bold text-gray-900">
            {document.shortName}
          </h1>
          <ComingSoon text="I haven't added this document yet." />
        </>
      ) : (
        <div className="flex min-w-0 flex-col gap-6">
          <header className="flex flex-col gap-1">
            <p className="text-xs uppercase tracking-wide text-gray-400">
              Ontario Ministry of Education · {group?.name}
            </p>
            <h1 className="text-3xl font-bold leading-tight text-gray-900">
              {document.title}
            </h1>
            <p className="mt-1 max-w-prose text-gray-500 leading-relaxed">
              {document.summary}
            </p>
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

          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap gap-2">
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
            <p className="text-xs text-gray-400">
              Open shows the PDF in a new tab without saving it. Download saves
              a copy to your computer.
            </p>
          </div>

          {/* A line separates the introduction from the links into the PDF */}
          {(sections.length > 0 || usedOn.length > 0) && (
            <div className="mt-2 flex flex-col gap-7 border-t border-gray-200 pt-7">
              {sections.length > 0 && (
                <section className="max-w-prose">
                  <h2 className="text-lg font-bold text-gray-900">
                    Jump to a section
                  </h2>
                  <p className="mb-2 text-xs text-gray-400">
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
                  <h2 className="mb-2 text-lg font-bold text-gray-900">
                    Used on this site
                  </h2>
                  <div className="flex flex-wrap gap-2">
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
