import { Link } from 'react-router-dom'
import PageHeader from '@/components/layout/PageHeader'
import PageSection from '@/components/layout/PageSection'
import StrandBadge from '@/components/ui/StrandBadge'
import GradeTiles from '@/components/ui/GradeTiles'
import StrandCards from '@/components/ui/StrandCards'
import DotList from '@/components/ui/DotList'
import {
  expectations,
  getExpectations,
  getIdeasInStrand,
  mathPath,
} from '@/data/math/expectations'
import { mathGrades, mathStrands, strandA } from '@/data/math/strands'
import { getSubjectSection } from '@/data/subjects'
import CurriculumBox from '@/components/resources/CurriculumBox'

// e.g. Drama & Math, kept with the subjects
const related = getSubjectSection('math')?.related

// The Container in TwoColumnLayout spaces these sections equally
function MathOverviewPage() {
  return (
    <>
      <PageHeader
        title="Math"
        description="The Ontario Math curriculum, one small piece at a time. Start with the grade you teach, or follow one idea from Grade 1 to Grade 8 to see where your students are coming from and where they are headed."
        meta={`8 grades · 5 strands · ${expectations.length} expectations · Ontario curriculum, 2020`}
      />
      <CurriculumBox subject="math" />
      <PageSection
        box="panel"
        title="Start with your grade"
        description="Every expectation for one grade on one page, grouped by strand."
      >
        <GradeTiles
          tiles={mathGrades.map((grade) => ({
            grade,
            to: mathPath({ grade }),
            meta: `${getExpectations({ grade }).length} expectations`,
          }))}
        />
      </PageSection>

      <PageSection
        box="panel"
        stripe={mathStrands.map((strand) => strand.colors.accent)}
        title="Follow an idea across grades"
        description="Each strand is split into the same smaller ideas in every grade, like Math facts or Fractions. Pick one and see it grow from Grade 1 to 8."
      >
        <StrandCards
          cards={mathStrands.map((strand) => ({
            id: strand.id,
            to: mathPath({ strand: strand.id }),
            name: strand.name,
            badge: <StrandBadge strand={strand} />,
            blurb: strand.blurb,
            points: getIdeasInStrand(strand.id).map((idea) => idea.name),
            accent: strand.colors.accent,
          }))}
        />
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
        <DotList items={strandA.skills} color={strandA.colors.accent} />
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
