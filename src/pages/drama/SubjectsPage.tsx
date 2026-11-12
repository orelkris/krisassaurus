import { Link } from 'react-router-dom'
import PageHeader from '@/components/layout/PageHeader'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { ARTS_DRAMA } from '@/lib/arts'
import { dramaSubjects } from '@/data/drama/subjects'

// Drama & other subjects: a card per subject, each opening its page
function SubjectsPage() {
  return (
    <>
      <PageHeader
        above={
          <Breadcrumb
            className="text-fg"
            items={[
              { label: 'Arts' },
              { label: 'Drama' },
              { label: 'Drama & other subjects' },
            ]}
          />
        }
        title="Drama & other subjects"
      />
      <div className="grid grid-cols-1 gap-grid sm:grid-cols-2">
        {dramaSubjects.map((subject) => (
          <Link
            key={subject.slug}
            to={`${ARTS_DRAMA}/subjects/${subject.slug}`}
            className="card card-hover col-tight"
          >
            <span className="text-note">Drama &amp;</span>
            <h2 className="heading-card">{subject.name}</h2>
            <p className="text-small">{subject.intro}</p>
            <p className="text-note mt-auto pt-sm">Coming soon</p>
          </Link>
        ))}
      </div>
    </>
  )
}

export default SubjectsPage
