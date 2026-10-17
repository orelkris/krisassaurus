import { Link } from 'react-router-dom'
import StrandBadge from '@/components/math/StrandBadge'
import {
  expectations,
  getExpectationsInGrade,
  getIdeasInStrand,
} from '@/data/math/expectations'
import { mathGrades, mathStrands, strandA } from '@/data/math/strands'
import { getBlogSection } from '@/data/drama/blogSections'

// e.g. Drama & Math, kept with the blog sections
const related = getBlogSection('math')?.related

const cardClass =
  'flex flex-col gap-3 rounded-2xl border border-gray-200 p-5 sm:p-6'
const tileClass =
  'rounded-xl border border-gray-200 transition-shadow hover:shadow-md'

function MathOverviewPage() {
  return (
    <div className="flex flex-col gap-7">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-gray-900">Math</h1>
        <p className="max-w-prose leading-relaxed text-gray-500">
          The Ontario Math curriculum, one small piece at a time. Start with the
          grade you teach, or follow one idea from Grade 1 to Grade 8 to see
          where your students are coming from and where they are headed.
        </p>
        <p className="text-xs text-gray-400">
          8 grades · 5 strands · {expectations.length} expectations · Ontario
          curriculum, 2020
        </p>
      </header>

      <section className={cardClass}>
        <h2 className="text-lg font-bold text-gray-900">
          Start with your grade
        </h2>
        <p className="max-w-prose text-sm leading-relaxed text-gray-500">
          Every expectation for one grade on one page, grouped by strand.
        </p>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {mathGrades.map((grade) => (
            <Link
              key={grade}
              to={`/blog/math/grade/${grade}`}
              className={`${tileClass} flex flex-col gap-0.5 px-3.5 py-3`}
            >
              <b className="text-base text-gray-900">Grade {grade}</b>
              <span className="text-[12.5px] text-gray-400">
                {getExpectationsInGrade(grade).length} expectations
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-gray-200">
        <div className="flex h-2" aria-hidden="true">
          {mathStrands.map((strand) => (
            <span
              key={strand.id}
              className="flex-1"
              style={{ backgroundColor: strand.colors.accent }}
            />
          ))}
        </div>
        <div className="flex flex-col gap-3 p-5 sm:p-6">
          <h2 className="text-lg font-bold text-gray-900">
            Follow an idea across grades
          </h2>
          <p className="max-w-prose text-sm leading-relaxed text-gray-500">
            Each strand is split into the same smaller ideas in every grade,
            like Math facts or Fractions. Pick one and see it grow from Grade 1
            to 8.
          </p>
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            {mathStrands.map((strand) => (
              <Link
                key={strand.id}
                to={`/blog/math/strand/${strand.slug}`}
                className={`${tileClass} flex flex-col gap-2 p-4`}
              >
                <h3 className="flex items-center gap-2 text-base font-bold text-gray-900">
                  <StrandBadge strand={strand} />
                  {strand.name}
                </h3>
                <p className="text-[13.5px] text-gray-500">{strand.blurb}</p>
                <ul className="flex flex-col gap-0.5 pl-[18px] text-[13.5px] text-gray-500">
                  {getIdeasInStrand(strand.id).map((idea) => (
                    <li key={idea.id} className="relative">
                      <span
                        className="absolute top-[0.55em] -left-3.5 h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: strand.colors.accent }}
                      />
                      {idea.name}
                    </li>
                  ))}
                </ul>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        className={cardClass}
        style={{ borderColor: strandA.colors.accent }}
      >
        <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900">
          <StrandBadge strand={{ id: 'A', colors: strandA.colors }} />
          {strandA.name}
        </h2>
        <p className="max-w-prose text-sm leading-relaxed text-gray-500">
          {strandA.text}
        </p>
        <ul className="list-disc gap-x-6 pl-[18px] text-[13.5px] sm:columns-2">
          {strandA.skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
        <p className="text-xs text-gray-400">{strandA.note}</p>
      </section>

      {related && (
        <p className="text-sm text-gray-500">
          {related.label}{' '}
          <Link to={related.to} className="link">
            {related.linkText}
          </Link>
        </p>
      )}
    </div>
  )
}

export default MathOverviewPage
