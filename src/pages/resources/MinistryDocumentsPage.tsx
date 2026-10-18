import { useSearchParams } from 'react-router-dom'
import {
  documentGroups,
  isDocumentGroupId,
} from '@/data/resources/documentGroups'
import { getDocumentsInGroup } from '@/data/resources/ministryDocuments'
import ResourcesHeader from '@/components/resources/ResourcesHeader'
import DocumentCard from '@/components/resources/DocumentCard'

function MinistryDocumentsPage() {
  const [searchParams] = useSearchParams()
  const group = searchParams.get('group')
  // ?group=curriculum shows one group; anything else shows them all
  const groups = isDocumentGroupId(group)
    ? documentGroups.filter(({ id }) => id === group)
    : documentGroups

  return (
    <div className="col-page">
      <ResourcesHeader
        activeTab="ministry"
        intro="Ontario curriculum and assessment documents I use. Each one opens as a PDF in a new tab, with a link to the ministry's official page."
      />

      {groups.map(({ id, name }) => {
        const documents = getDocumentsInGroup(id)
        return (
          <section key={id} className="col-section">
            <h2 className="heading-section flex items-baseline gap-2">
              {name}
              <span className="text-muted font-normal">{documents.length}</span>
            </h2>
            <div className="grid grid-cols-2 gap-grid sm:grid-cols-3 xl:grid-cols-4">
              {documents.map((document) => (
                <DocumentCard key={document.slug} document={document} />
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}

export default MinistryDocumentsPage
