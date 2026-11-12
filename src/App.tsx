import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
  useLocation,
  useParams,
} from 'react-router-dom'
import AppLayout from '@/components/layout/AppLayout'
import SubjectSectionPage from '@/pages/SubjectSectionPage'
import AboutPage from '@/pages/AboutPage'
import MusicPage from '@/pages/MusicPage'
import QuickGamePage from '@/pages/QuickGamePage'
import ScrollToTop from '@/components/ui/ScrollToTop'
import TwoColumnLayout from '@/components/layout/TwoColumnLayout'
import StrategiesPage from '@/pages/drama/StrategiesPage'
import StrategyPage from '@/pages/drama/StrategyPage'
import SubjectPage from '@/pages/drama/SubjectPage'
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

// Drama's overall expectations used to be its strands, with their own
// addresses: /drama/strand/creating-and-presenting?code=b1.2 and
// /drama/grade/4/strand/creating-and-presenting
const OLD_DRAMA_STRANDS: Record<string, string> = {
  'creating-and-presenting': 'b1',
  'reflecting-responding-and-analysing': 'b2',
  'exploring-forms-and-cultural-contexts': 'b3',
}

function OldDramaStrandRedirect() {
  const { grade } = useParams<{ grade?: string }>()
  const { pathname, search } = useLocation()
  const slug = pathname.split('/').pop() ?? ''
  const overall = OLD_DRAMA_STRANDS[slug]
  const code = new URLSearchParams(search).get('code')
  if (!overall) return <Navigate to="/drama" replace />
  if (grade) return <Navigate to={`/drama/grade/${grade}/${overall}`} replace />
  return (
    <Navigate
      to={`/drama/strand/b/${overall}${code ? `#${code.replace('.', '-')}` : ''}`}
      replace
    />
  )
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

          {/* Every subject made from its curriculum data (Math, Drama, Gym,
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
              {/* Drama's own pages: strategies and Drama & other subjects */}
              {curriculum.subject === 'drama' && (
                <>
                  <Route path="strategies" element={<StrategiesPage />} />
                  <Route path="strategies/:slug" element={<StrategyPage />} />
                  <Route path="subjects/:slug" element={<SubjectPage />} />
                  {Object.keys(OLD_DRAMA_STRANDS).map((slug) => (
                    <Route
                      key={slug}
                      path={`strand/${slug}`}
                      element={<OldDramaStrandRedirect />}
                    />
                  ))}
                  <Route
                    path="grade/:grade/strand/:slug"
                    element={<OldDramaStrandRedirect />}
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

          {/* Links from before the rename */}
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
          <Route path="/about" element={<AboutPage />} />
          <Route path="/music" element={<MusicPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
