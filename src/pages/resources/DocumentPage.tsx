import { Link, Navigate, useParams } from 'react-router-dom'
import Breadcrumb from '@/components/ui/Breadcrumb'
import ComingSoon from '@/components/ui/ComingSoon'
import { getDocumentGroup } from '@/data/resources/documentGroups'
import { getLinksForDocument } from '@/data/resources/documentLinks'
import {
  getMinistryDocument,
  getPdfUrl,
} from '@/data/resources/ministryDocuments'
import ButtonLink from '@/components/ui/ButtonLink'

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
    <>
      <Breadcrumb
        className="text-fg"
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
        <>
          <header className="col-stack">
            <p className="text-label">
              Ontario Ministry of Education · {group?.name}
            </p>
            <h1 className="heading-page">{document.title}</h1>
            <p className="text-lead">{document.summary}</p>
          </header>

          <dl className="grid max-w-read grid-cols-[auto_1fr] gap-x-lg gap-y-xs text-sm">
            {facts.map(([label, value]) => (
              <div key={label} className="contents">
                <dt className="text-faint">{label}</dt>
                <dd className="text-fg">{value}</dd>
              </div>
            ))}
            {document.officialUrl && (
              <div className="contents">
                <dt className="text-faint">Official</dt>
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
              <ButtonLink href={getPdfUrl(document)}>Open PDF ↗</ButtonLink>
              <ButtonLink href={document.file.url} download variant="secondary">
                Download
              </ButtonLink>
            </div>
            <p className="text-note">
              Open shows the PDF in a new tab without saving it. Download saves
              a copy to your computer.
            </p>
          </div>

          {/* A line separates the introduction from the links into the PDF */}
          {(sections.length > 0 || usedOn.length > 0) && (
            <div className="col-page border-t border-line pt-page">
              {sections.length > 0 && (
                <section className="max-w-read">
                  <h2 className="heading-section">Jump to a section</h2>
                  <p className="text-note mb-stack">
                    Each link opens the PDF at that page.
                  </p>
                  <ul className="border-t border-line">
                    {sections.map((section) => (
                      <li key={section.label} className="border-b border-line">
                        <a
                          href={getPdfUrl(document, section.page)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex justify-between gap-md py-sm text-sm text-fg hover:underline"
                        >
                          {section.label}
                          <span className="text-faint tabular-nums">
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
                        className="rounded-pill border border-line px-md py-xs text-sm text-fg transition-colors hover:bg-soft"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </div>
          )}
        </>
      )}
    </>
  )
}

export default DocumentPage
