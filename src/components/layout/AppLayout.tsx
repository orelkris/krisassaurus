import { Outlet } from 'react-router-dom'
import Navbar from '@/components/layout/Navbar'
import BackToTop from '@/components/ui/BackToTop'
import { SCROLL_CONTAINER_ID } from '@/lib/scroll'

function AppLayout() {
  return (
    <div className="h-screen flex flex-col bg-white">
      <Navbar />
      <div id={SCROLL_CONTAINER_ID} className="flex-1 min-h-0 overflow-y-auto">
        <Outlet />
      </div>
      <BackToTop />
    </div>
  )
}

export default AppLayout
