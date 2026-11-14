import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
  useLocation,
} from 'react-router-dom'
import AppLayout from '@/components/layout/AppLayout'
import SubjectSectionPage from '@/pages/SubjectSectionPage'
import AboutPage from '@/pages/AboutPage'
import MusicPage from '@/pages/MusicPage'
import QuickGamePage from '@/pages/QuickGamePage'
import QuizPage from '@/pages/QuizPage'
import ScrollToTop from '@/components/ui/ScrollToTop'
import TwoColumnLayout from '@/components/layout/TwoColumnLayout'
import StrategiesPage from '@/pages/drama/StrategiesPage'
import StrategyPage from '@/pages/drama/StrategyPage'
import SubjectPage from '@/pages/drama/SubjectPage'
import SubjectsPage from '@/pages/drama/SubjectsPage'
import CreativeProcessPage from '@/pages/arts/CreativeProcessPage'
import CriticalProcessPage from '@/pages/arts/CriticalProcessPage'
import { ARTS_DRAMA } from '@/lib/arts'
import ResourcesSidebar from '@/components/resources/ResourcesSidebar'
import ComingSoon from '@/components/ui/ComingSoon'
import CurriculumOverviewPage from '@/pages/curriculum/CurriculumOverviewPage'
import CurriculumGradePage from '@/pages/curriculum/CurriculumGradePage'
import CurriculumSpecificsPage from '@/pages/curriculum/CurriculumSpecificsPage'
import CurriculumComparePage from '@/pages/curriculum/CurriculumComparePage'
import CurriculumStrandPage from '@/pages/curriculum/CurriculumStrandPage'
import CurriculumSidebar from '@/components/curriculum/CurriculumSidebar'
import { CURRICULA } from '@/data/subjects/curricula'
import { CurriculumContext } from '@/hooks/useCurriculum'
import MinistryDocumentsPage from '@/pages/resources/MinistryDocumentsPage'
import TeachingResourcesPage from '@/pages/resources/TeachingResourcesPage'
import DocumentPage from '@/pages/resources/DocumentPage'

// Old /blog/... links (e.g. /blog/math/grade/6) open the same page without /blog
function OldBlogRedirect() {
  const { pathname, search, hash } = useLocation()
  const to = pathname.replace(/^\/blog/, '') || '/'
  return <Navigate to={`${to}${search}${hash}`} replace />
}

// Drama was its own subject before the Arts: /drama/... addresses now open
// the same page under /arts. Its strategies and subject pages moved to
// /arts/drama/..., its grades are the Arts' grades (Drama is Strand B), and
// its old strands were the overall expectations B1, B2 and B3
const OLD_DRAMA_STRANDS: Record<string, string> = {
  'creating-and-presenting': 'b1',
  'reflecting-responding-and-analysing': 'b2',
  'exploring-forms-and-cultural-contexts': 'b3',
}

function OldDramaRedirect() {
  const { pathname, search, hash } = useLocation()
  const parts = pathname.split('/').slice(2)
  const [first, second, third, fourth] = parts
  const code = new URLSearchParams(search).get('code')
  let to = '/arts'
  if (first === 'strategies' || first === 'subjects')
    to = `${ARTS_DRAMA}/${parts.join('/')}${hash}`
  else if (first === 'grade' && second && third === 'strand')
    to = OLD_DRAMA_STRANDS[fourth]
      ? `/arts/grade/${second}/${OLD_DRAMA_STRANDS[fourth]}`
      : `/arts/grade/${second}#strand-b`
  else if (first === 'grade' && second)
    to = `/arts/grade/${second}${third ? `/${third}` : '#strand-b'}`
  else if (first === 'strand' && OLD_DRAMA_STRANDS[second])
    to = `/arts/strand/b/${OLD_DRAMA_STRANDS[second]}${code ? `#${code.replace('.', '-')}` : ''}`
  else if (first === 'strand') to = '/arts/strand/b'
  return <Navigate to={to} replace />
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* The Quick Game board on its own, without the navbar */}
        <Route path="/quick-game-start" element={<QuickGamePage direct />} />

        <Route element={<AppLayout />}>
          {/* Home opens Math, the first subject */}
          <Route path="/" element={<Navigate to="/math" replace />} />

          {/* Every subject made from its curriculum data (Math, Arts, Gym,
              Science) gets the same pages. Its curriculum is set once around
              its routes */}
          {CURRICULA.map((curriculum) => (
            <Route
              key={curriculum.subject}
              path={`/${curriculum.subject}`}
              element={
                <CurriculumContext.Provider value={curriculum}>
                  <TwoColumnLayout
                    sidebar={<CurriculumSidebar />}
                    subject={curriculum.subject}
                    scrollable
                  >
                    <Outlet />
                  </TwoColumnLayout>
                </CurriculumContext.Provider>
              }
            >
              <Route index element={<CurriculumOverviewPage />} />
              <Route path="grade/:grade" element={<CurriculumGradePage />} />
              <Route
                path="grade/:grade/:code"
                element={<CurriculumSpecificsPage />}
              />
              <Route
                path="grade/:grade/:code/:specific"
                element={<CurriculumComparePage />}
              />
              <Route path="strand/:strand" element={<CurriculumStrandPage />} />
              {/* The Arts' own pages: its two processes, and Drama's
                  strategies and Drama & other subjects */}
              {curriculum.subject === 'arts' && (
                <>
                  <Route
                    path="creative-process"
                    element={<CreativeProcessPage />}
                  />
                  <Route
                    path="critical-analysis-process"
                    element={<CriticalProcessPage />}
                  />
                  <Route path="drama/strategies" element={<StrategiesPage />} />
                  <Route
                    path="drama/strategies/:slug"
                    element={<StrategyPage />}
                  />
                  <Route path="drama/subjects" element={<SubjectsPage />} />
                  <Route
                    path="drama/subjects/:slug"
                    element={<SubjectPage />}
                  />
                </>
              )}
              <Route
                path="strand/:strand/:code"
                element={<CurriculumStrandPage />}
              />
              <Route
                path="*"
                element={<ComingSoon text="This page is next." />}
              />
            </Route>
          ))}

          {/* Other subjects show "Coming soon" for now */}
          <Route path="/:subject" element={<SubjectSectionPage />} />

          {/* Links from before the rename, and from before the Arts */}
          <Route path="/drama/*" element={<OldDramaRedirect />} />
          <Route path="/blog/*" element={<OldBlogRedirect />} />
          <Route path="/post/*" element={<Navigate to="/" replace />} />

          {/* Resources: Ministry documents first, Teaching resources second */}
          <Route
            path="/resources"
            element={
              <TwoColumnLayout sidebar={<ResourcesSidebar />} scrollable>
                <Outlet />
              </TwoColumnLayout>
            }
          >
            <Route index element={<MinistryDocumentsPage />} />
            <Route path="teaching" element={<TeachingResourcesPage />} />
            <Route path="documents/:slug" element={<DocumentPage />} />
          </Route>

          <Route path="/quick-game" element={<QuickGamePage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/music" element={<MusicPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
