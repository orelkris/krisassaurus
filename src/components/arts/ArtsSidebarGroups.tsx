import { useLocation } from 'react-router-dom'
import { FilterRow } from '@/components/ui/CurriculumFilter'
import {
  ARTS_PROCESSES,
  creativeStages,
  criticalAspects,
} from '@/data/subjects/arts/processes'
import { ARTS_DRAMA } from '@/lib/arts'
import { strategies } from '@/data/drama/strategies'
import { dramaSubjects } from '@/data/drama/subjects'

// How many steps each process has, shown at the end of its row
const STEPS: Record<string, number> = {
  'creative-process': creativeStages.length,
  'critical-analysis-process': criticalAspects.length,
}

// The Arts' groups at the end of its sidebar: the two processes, then
// Drama's own pages (Strategies, Drama & other subjects). Rows are the
// same as By grade's
function ArtsSidebarGroups() {
  const { pathname } = useLocation()
  const drama = [
    {
      label: 'Strategies',
      to: `${ARTS_DRAMA}/strategies`,
      count: strategies.length,
    },
    {
      label: 'Drama & other subjects',
      to: `${ARTS_DRAMA}/subjects`,
      count: dramaSubjects.length,
    },
  ]

  return (
    <>
      <div className="col-xs">
        <p className="text-sm font-semibold text-fg">Processes</p>
        <div className="pl-sm">
          {ARTS_PROCESSES.map((process) => {
            const to = `/arts/${process.slug}`
            return (
              <FilterRow
                key={process.slug}
                to={to}
                label={process.name}
                count={STEPS[process.slug]}
                isPicked={pathname === to}
              />
            )
          })}
        </div>
      </div>
      <div className="col-xs border-t border-line pt-md">
        <p className="text-sm font-semibold text-fg">Drama</p>
        <div className="pl-sm">
          {drama.map((link) => (
            <FilterRow
              key={link.to}
              to={link.to}
              label={link.label}
              count={link.count}
              isPicked={pathname.startsWith(link.to)}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default ArtsSidebarGroups
