import ButtonLink from '@/components/ui/ButtonLink'
import InfoBox from '@/components/ui/InfoBox'
import { getLinksToPage } from '@/data/resources/documentLinks'
import {
  getMinistryDocument,
  getPdfUrl,
} from '@/data/resources/ministryDocuments'
import { getSubjectSection } from '@/data/subjects'

interface CurriculumBoxProps {
  // The subject's slug in subjects.ts, e.g. "drama"
  subject: string
}

// The curriculum document for a subject, at the top of its page. The subject
// gives the page path and colour; documentLinks says which document that page
// uses. Shows nothing when there is no link
function CurriculumBox({ subject }: CurriculumBoxProps) {
  const section = getSubjectSection(subject)
  const link = section && getLinksToPage(section.path)[0]
  const document = link && getMinistryDocument(link.documentSlug)

  if (!section || !link || !document) return null

  const year = document.year.replace('Revised ', '')

  return (
    <InfoBox
      label="Curriculum"
      title={`${document.title} (${year})`}
      text={link.blurb}
      accent={section.color}
      actions={
        <>
          {/* My copy of the PDF when it's on the site, otherwise the
              ministry's page for the document */}
          {document.file ? (
            <ButtonLink href={getPdfUrl(document, link.page)}>
              Open {link.page && link.pageLabel ? link.pageLabel : 'the PDF'} ↗
            </ButtonLink>
          ) : (
            document.officialUrl && (
              <ButtonLink href={document.officialUrl}>
                Ministry site ↗
              </ButtonLink>
            )
          )}
          <ButtonLink
            to={`/resources/documents/${document.slug}`}
            variant="secondary"
          >
            About this document
          </ButtonLink>
        </>
      }
    />
  )
}

export default CurriculumBox