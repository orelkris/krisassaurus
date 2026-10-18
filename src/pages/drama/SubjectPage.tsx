import { Navigate, useParams } from 'react-router-dom'
import Breadcrumb from '@/components/ui/Breadcrumb'
import ComingSoon from '@/components/ui/ComingSoon'
import { getSubject } from '@/data/drama/subjects'

function SubjectPage() {
  const { slug = '' } = useParams<{ slug: string }>()
  const subject = getSubject(slug)

  if (!subject) return <Navigate to="/drama" replace />

  return (
    <div className="col-page flex-1">
      <header className="col-stack">
        <Breadcrumb
          className="text-gray-900"
          items={[
            { label: 'Drama' },
            { label: 'Subjects' },
            { label: subject.name },
          ]}
        />
        <h1 className="heading-page">Drama &amp; {subject.name}</h1>
        <p className="text-lead">{subject.intro}</p>
      </header>

      <ComingSoon
        text={`This page will cover how drama connects to ${subject.name}, based on what we did in class.`}
        related={subject.related}
      />
    </div>
  )
}

export default SubjectPage