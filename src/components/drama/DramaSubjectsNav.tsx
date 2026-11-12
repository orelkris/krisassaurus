import { useState } from 'react'
import { Link, useMatch } from 'react-router-dom'
import { dramaSubjects, getSubject } from '@/data/drama/subjects'
import NavChevron from '@/components/drama/NavChevron'
import { navLinkClass } from '@/lib/nav'

// Drama & other subjects, at the end of Drama's sidebar
function DramaSubjectsNav() {
  const subjectMatch = useMatch('/drama/subjects/:slug')
  const currentSubject = getSubject(subjectMatch?.params.slug ?? '')
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="flex w-full cursor-pointer items-center justify-between py-xs text-sm font-semibold text-fg"
      >
        Subjects
        <NavChevron open={isOpen} />
      </button>

      {isOpen && (
        <div className="pl-sm">
          {dramaSubjects.map((subject) => (
            <Link
              key={subject.slug}
              to={`/drama/subjects/${subject.slug}`}
              className={navLinkClass(subject.slug === currentSubject?.slug)}
            >
              {subject.name}
              <span className="text-note font-normal">soon</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default DramaSubjectsNav
