import { Link } from 'react-router-dom'
import type { MathFilter, TaughtStrandId } from '@/types/math'
import CurriculumBreadcrumb from '@/components/ui/CurriculumBreadcrumb'
import CurriculumFilter, {
  type CurriculumPick,
  type FilterSubList,
} from '@/components/ui/CurriculumFilter'
import { mathGrades, mathStrands } from '@/data/math/strands'
import {
  expectationPath,
  getExpectations,
  getIdeasInStrand,
  groupByOverall,
  mathPath,
} from '@/data/math/expectations'
import { useMathFilter } from '@/hooks/useMathFilter'

const headingClass = 'text-sm font-semibold text-gray-900'

const toFilter = ({ grade, strand }: CurriculumPick): MathFilter => ({
  grade,
  strand: strand as TaughtStrandId | undefined,
})

// Math's sidebar: the shared grade and strand filter, with Math's ideas under
// a picked strand and Articles at the end
function MathSidebar() {
  const { filter, strand: currentStrand, expectation } = useMathFilter()

  // Unpicking the grade of an expectation keeps its idea open on the strand page
  const path = (pick: CurriculumPick) =>
    mathPath({
      ...toFilter(pick),
      idea:
        !pick.grade && pick.strand === filter.strand ? filter.idea : undefined,
    })

  // With a grade picked, the strand opens onto its expectations in that
  // grade; without, onto its ideas
  let subList: FilterSubList | undefined
  if (currentStrand && filter.grade) {
    subList = {
      kind: 'codes',
      groups: groupByOverall(getExpectations(filter)).map((group) => ({
        label: `${group[0].overall} · ${group[0].overallTitle}`,
        codes: group.map((item) => {
          const isPicked = item.id === expectation?.id
          return {
            id: item.id,
            code: item.code,
            // Clicking the open expectation again goes back to its grade and strand
            to: isPicked ? mathPath(filter) : expectationPath(item),
            isPicked,
          }
        }),
      })),
    }
  } else if (currentStrand) {
    const ideas = getIdeasInStrand(currentStrand.id)
    const currentIdeaId = filter.idea ?? ideas[0]?.id
    subList = {
      kind: 'links',
      links: ideas.map((idea) => ({
        id: idea.id,
        label: idea.name,
        to: mathPath({ strand: currentStrand.id, idea: idea.id }),
        isCurrent: idea.id === currentIdeaId,
      })),
    }
  }

  return (
    <>
      {/* On phones the sidebar sits above the page, so the breadcrumb leads */}
      <CurriculumBreadcrumb
        subject="Math"
        grade={filter.grade}
        strand={currentStrand?.name}
        code={expectation?.code}
        className="lg:hidden"
      />

      <div className="col-tight">
        <p className="text-label">Math</p>

        <Link
          to={mathPath({})}
          className={`block py-1 text-sm transition-colors ${
            !filter.grade && !currentStrand
              ? 'font-semibold text-gray-900'
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          Overview
        </Link>
      </div>

      <CurriculumFilter
        grades={mathGrades}
        strands={mathStrands}
        picked={{ grade: filter.grade, strand: filter.strand }}
        count={(pick) => getExpectations(toFilter(pick)).length}
        path={path}
        subList={subList}
      />

      <p className={`${headingClass} flex items-center justify-between`}>
        Articles
        <span className="text-muted font-normal">soon</span>
      </p>
    </>
  )
}

export default MathSidebar
