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
import ScrollToTop from '@/components/ui/ScrollToTop'
import TwoColumnLayout from '@/components/layout/TwoColumnLayout'
import DramaSidebar from '@/components/drama/DramaSidebar'
import DramaGradePage from '@/pages/drama/DramaGradePage'
import DramaGradeStrandPage from '@/pages/drama/DramaGradeStrandPage'
import DramaStrandPage from '@/pages/drama/DramaStrandPage'
import DramaExpectationPage from '@/pages/drama/DramaExpectationPage'
import DramaOverviewPage from '@/pages/drama/DramaOverviewPage'
import StrategiesPage from '@/pages/drama/StrategiesPage'
import StrategyPage from '@/pages/drama/StrategyPage'
import SubjectPage from '@/pages/drama/SubjectPage'
import MathSidebar from '@/components/math/MathSidebar'
import MathOverviewPage from '@/pages/math/MathOverviewPage'
import GradePage from '@/pages/math/GradePage'
import StrandPage from '@/pages/math/StrandPage'
import GradeStrandPage from '@/pages/math/GradeStrandPage'
import ExpectationPage from '@/pages/math/ExpectationPage'
import ResourcesSidebar from '@/components/resources/ResourcesSidebar'
import MinistryDocumentsPage from '@/pages/resources/MinistryDocumentsPage'
import TeachingResourcesPage from '@/pages/resources/TeachingResourcesPage'
import DocumentPage from '@/pages/resources/DocumentPage'

// Old /blog/... links (e.g. /blog/math/grade/6) open the same page without /blog
function OldBlogRedirect() {
  const { pathname, search, hash } = useLocation()
  const to = pathname.replace(/^\/blog/, '') || '/'
  return <Navigate to={`${to}${search}${hash}`} replace />
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

          {/* Drama: the sidebar stays mounted while child pages swap in */}
          <Route
            path="/drama"
            element={
              <TwoColumnLayout sidebar={<DramaSidebar />} scrollable>
                <Outlet />
              </TwoColumnLayout>
            }
          >
            <Route index element={<DramaOverviewPage />} />
            <Route path="strategies" element={<StrategiesPage />} />
            <Route path="strategies/:slug" element={<StrategyPage />} />
            <Route path="subjects/:slug" element={<SubjectPage />} />
            {/* The Drama curriculum, routed like Math's */}
            <Route path="grade/:grade" element={<DramaGradePage />} />
            <Route
              path="grade/:grade/:code"
              element={<DramaExpectationPage />}
            />
            <Route
              path="grade/:grade/strand/:slug"
              element={<DramaGradeStrandPage />}
            />
            <Route path="strand/:slug" element={<DramaStrandPage />} />
            <Route path="grade" element={<Navigate to="/drama" replace />} />
            <Route path="strand" element={<Navigate to="/drama" replace />} />
          </Route>

          {/* Math: the curriculum by grade, by strand, both, and one page per expectation */}
          <Route
            path="/math"
            element={
              <TwoColumnLayout sidebar={<MathSidebar />} scrollable>
                <Outlet />
              </TwoColumnLayout>
            }
          >
            <Route index element={<MathOverviewPage />} />
            <Route path="grade/:grade" element={<GradePage />} />
            <Route path="grade/:grade/:code" element={<ExpectationPage />} />
            <Route
              path="grade/:grade/strand/:slug"
              element={<GradeStrandPage />}
            />
            <Route path="strand/:slug" element={<StrandPage />} />
            {/* /grade and /strand on their own have no page */}
            <Route path="grade" element={<Navigate to="/math" replace />} />
            <Route path="strand" element={<Navigate to="/math" replace />} />
          </Route>

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
