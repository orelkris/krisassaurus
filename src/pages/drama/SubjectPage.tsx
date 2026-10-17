import { Navigate, useParams } from 'react-router-dom'
import Breadcrumb from '@/components/ui/Breadcrumb'
import ComingSoon from '@/components/ui/ComingSoon'
import { getSubject } from '@/data/drama/subjects'

function SubjectPage() {
  const { slug = '' } = useParams<{ slug: string }>()
  const subject = getSubject(slug)

  if (!subject) return <Navigate to="/blog/drama" replace />

  return (
    <div className="flex flex-1 flex-col gap-7">
      <header className="flex flex-col gap-2">
        <Breadcrumb
          className="text-gray-900"
          items={[
            { label: 'Drama', to: '/blog/drama' },
            { label: 'Subjects' },
            { label: subject.name },
          ]}
        />
        <h1 className="text-3xl font-bold text-gray-900">Drama &amp; {subject.name}</h1>
        <p className="max-w-prose text-gray-500 leading-relaxed">{subject.intro}</p>
      </header>

      <ComingSoon
        text={`This page will cover how drama connects to ${subject.name}, based on what we did in class.`}
        related={subject.related}
      />
    </div>
  )
}

export default SubjectPage
