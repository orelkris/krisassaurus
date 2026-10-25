import { Link } from 'react-router-dom'
import PageHeader from '@/components/layout/PageHeader'
import PageSection from '@/components/layout/PageSection'
import CurriculumBox from '@/components/resources/CurriculumBox'
import ButtonLink from '@/components/ui/ButtonLink'
import GradeTiles from '@/components/ui/GradeTiles'
import StrandBadge from '@/components/ui/StrandBadge'
import StrandCards from '@/components/ui/StrandCards'
import { strategyGroups } from '@/data/drama/groups'
import { strategies } from '@/data/drama/strategies'
import { dramaSubjects } from '@/data/drama/subjects'
import {
  dramaExpectations,
  dramaPath,
  getDramaExpectations,
} from '@/data/drama/curriculum/expectations'
import {
  dramaGrades,
  dramaStrands,
  dramaTopics,
  getCodesInStrand,
} from '@/data/drama/curriculum/strands'

// Laid out like the Math overview; the Container in TwoColumnLayout spaces
// these sections equally
function DramaOverviewPage() {
  return (
    <>
      <PageHeader
        title="Drama"
        description="Drama strategies I’ve learned and tried, and how I’ve used them across subjects. Pick a strategy to see how to run it, or a subject to read what happened in class."
        meta={`${strategies.length} strategies · ${dramaSubjects.length} subjects · ${dramaExpectations.length} expectations · Ontario curriculum, 2009`}
      />
      <CurriculumBox subject="drama" />

      <PageSection
        box="panel"
        stripe={strategyGroups.map((group) => group.colors.accent)}
        title="Strategies"
      >
        <div className="col-stack items-start">
          <p className="text-lead">
            Drama strategies are short, structured activities that let students
            step inside a story, an idea or a problem. They need no stage,
            costumes or acting experience, and most take ten minutes or less.
            Each one gives students a different way in: speaking as a character,
            freezing a moment, building a sound, moving an idea, or replaying a
            scene with a new choice.
          </p>
          <p className="text-lead">
            The {strategies.length} strategies here are sorted into five colour
            families, and each has its own page with steps, a classroom example
            and variations.
          </p>
          <ButtonLink to="/drama/strategies">
            See all {strategies.length} →
          </ButtonLink>
        </div>
      </PageSection>

      <PageSection
        box="panel"
        title="Start with your grade"
        description="Every expectation for one grade on one page, grouped by strand."
      >
        <GradeTiles
          tiles={dramaGrades.map((grade) => ({
            grade,
            to: dramaPath({ grade }),
            meta: `${getDramaExpectations({ grade }).length} expectations`,
          }))}
        />
      </PageSection>

      <PageSection
        box="panel"
        stripe={dramaStrands.map((strand) => strand.colors.accent)}
        title="Follow an expectation across grades"
        description="Each strand has the same numbered expectations in every grade, like B1.1 Role play. Pick one and see it grow from Grade 1 to 8."
      >
        <StrandCards
          cards={dramaStrands.map((strand) => ({
            id: strand.id,
            to: dramaPath({ strand: strand.id }),
            name: strand.name,
            badge: <StrandBadge strand={strand} />,
            blurb: strand.blurb,
            points: getCodesInStrand(strand.id).map(
              (code) => `${code} ${dramaTopics[code]}`
            ),
            accent: strand.colors.accent,
          }))}
        />
      </PageSection>

      <PageSection title="Subjects">
        <div className="grid grid-cols-1 gap-grid sm:grid-cols-2">
          {dramaSubjects.map((subject) => (
            <Link
              key={subject.slug}
              to={`/drama/subjects/${subject.slug}`}
              className="card card-hover col-tight"
            >
              <span className="text-muted">Drama &amp;</span>
              <h3 className="heading-card">{subject.name}</h3>
              <p className="text-small">{subject.intro}</p>
              <p className="text-muted mt-auto pt-2">Coming soon</p>
            </Link>
          ))}
        </div>
      </PageSection>
    </>
  )
}

export default DramaOverviewPage
