import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { FilterProvider } from '@/context/FilterContext'
import AppLayout from '@/components/layout/AppLayout'
import BlogListPage from '@/pages/BlogListPage'
import BlogPostPage from '@/pages/BlogPostPage'
import ResourcesPage from '@/pages/ResourcesPage'

function App() {
  return (
    <BrowserRouter>
      <FilterProvider>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<BlogListPage />} />
            <Route path="/post/:id" element={<BlogPostPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
          </Route>
        </Routes>
      </FilterProvider>
    </BrowserRouter>
  )
}

export default App
