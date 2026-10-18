import { Link } from 'react-router-dom'
import PageHeader from '@/components/layout/PageHeader'
import PageSection from '@/components/layout/PageSection'
import StrandBadge from '@/components/math/StrandBadge'
import {
  expectations,
  getExpectations,
  getIdeasInStrand,
  mathPath,
} from '@/data/math/expectations'
import { mathGrades, mathStrands, strandA } from '@/data/math/strands'
import { getSubjectSection } from '@/data/subjects'

// e.g. Drama & Math, kept with the subjects
const related = getSubjectSection('math')?.related

const tileClass = 'card card-hover'

// The Container in TwoColumnLayout spaces these sections equally
function MathOverviewPage() {
  return (
    <>
      <PageHeader
        title="Math"
        description="The Ontario Math curriculum, one small piece at a time. Start with the grade you teach, or follow one idea from Grade 1 to Grade 8 to see where your students are coming from and where they are headed."
        meta={`8 grades · 5 strands · ${expectations.length} expectations · Ontario curriculum, 2020`}
      />

      <PageSection
        box="panel"
        title="Start with your grade"
        description="Every expectation for one grade on one page, grouped by strand."
      >
        <div className="grid grid-cols-2 gap-grid sm:grid-cols-4">
          {mathGrades.map((grade) => (
            <Link
              key={grade}
              to={mathPath({ grade })}
              className={`${tileClass} col-tight`}
            >
              <b className="text-base text-gray-900">Grade {grade}</b>
              <span className="text-muted">
                {getExpectations({ grade }).length} expectations
              </span>
            </Link>
          ))}
        </div>
      </PageSection>

      <PageSection
        box="panel"
        stripe={mathStrands.map((strand) => strand.colors.accent)}
        title="Follow an idea across grades"
        description="Each strand is split into the same smaller ideas in every grade, like Math facts or Fractions. Pick one and see it grow from Grade 1 to 8."
      >
        <div className="grid grid-cols-1 gap-grid sm:grid-cols-2">
          {mathStrands.map((strand) => (
            <Link
              key={strand.id}
              to={mathPath({ strand: strand.id })}
              className={`${tileClass} col-stack`}
            >
              <h3 className="heading-card row-stack">
                <StrandBadge strand={strand} />
                {strand.name}
              </h3>
              <p className="text-small">{strand.blurb}</p>
              <ul className="text-small flex flex-col gap-0.5 pl-[18px]">
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
      </PageSection>

      <PageSection
        box="panel"
        accent={strandA.colors.accent}
        title={
          <>
            <StrandBadge strand={{ id: 'A', colors: strandA.colors }} />
            {strandA.name}
          </>
        }
        description={strandA.text}
      >
        <ul className="list-disc gap-x-6 pl-[18px] text-[13.5px] sm:columns-2">
          {strandA.skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
        <p className="text-muted">{strandA.note}</p>
      </PageSection>

      {related && (
        <p className="text-small">
          {related.label}{' '}
          <Link to={related.to} className="link">
            {related.linkText}
          </Link>
        </p>
      )}
    </>
  )
}

export default MathOverviewPage