import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import { FilterProvider } from '@/context/FilterContext'
import AppLayout from '@/components/layout/AppLayout'
import BlogListPage from '@/pages/BlogListPage'
import BlogPostPage from '@/pages/BlogPostPage'
import BlogSectionPage from '@/pages/BlogSectionPage'
import AboutPage from '@/pages/AboutPage'
import MusicPage from '@/pages/MusicPage'
import ScrollToTop from '@/components/ui/ScrollToTop'
import TwoColumnLayout from '@/components/layout/TwoColumnLayout'
import DramaSidebar from '@/components/drama/DramaSidebar'
import DramaOverviewPage from '@/pages/drama/DramaOverviewPage'
import StrategiesPage from '@/pages/drama/StrategiesPage'
import StrategyPage from '@/pages/drama/StrategyPage'
import SubjectPage from '@/pages/drama/SubjectPage'
import ResourcesSidebar from '@/components/resources/ResourcesSidebar'
import MinistryDocumentsPage from '@/pages/resources/MinistryDocumentsPage'
import TeachingResourcesPage from '@/pages/resources/TeachingResourcesPage'
import DocumentPage from '@/pages/resources/DocumentPage'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <FilterProvider>
        <Routes>
          <Route element={<AppLayout />}>
            {/* Personal blog (the original posts) */}
            <Route path="/" element={<BlogListPage />} />
            <Route path="/post/:id" element={<BlogPostPage />} />

            {/* Drama blog: the sidebar stays mounted while child pages swap in */}
            <Route
              path="/blog/drama"
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
            </Route>

            {/* Other blog sections show "Coming soon" for now */}
            <Route path="/blog/:section" element={<BlogSectionPage />} />

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

            <Route path="/about" element={<AboutPage />} />
            <Route path="/music" element={<MusicPage />} />
          </Route>
        </Routes>
      </FilterProvider>
    </BrowserRouter>
  )
}

export default App
