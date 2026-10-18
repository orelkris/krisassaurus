import { Navigate, useParams } from 'react-router-dom'
import { getSubjectSection } from '@/data/subjects'
import ComingSoon from '@/components/ui/ComingSoon'
import TwoColumnLayout from '@/components/layout/TwoColumnLayout'
import SubjectSidebar from '@/components/subjects/SubjectSidebar'

// Subjects that don't have their own pages yet (Language, Gym)
function SubjectSectionPage() {
  const { subject: slug = '' } = useParams<{ subject: string }>()
  const section = getSubjectSection(slug)

  if (!section) return <Navigate to="/" replace />

  return (
    <TwoColumnLayout sidebar={<SubjectSidebar name={section.name} />} scrollable>
      <div className="col-page flex-1">
        <h1 className="heading-page">{section.name}</h1>
        <ComingSoon
          title="Coming soon"
          text="This section will follow the same pattern as Drama once its content is ready."
          related={section.related}
        />
      </div>
    </TwoColumnLayout>
  )
}

export default SubjectSectionPage
