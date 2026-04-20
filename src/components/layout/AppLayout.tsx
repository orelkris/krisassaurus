import { Outlet } from 'react-router-dom'
import Navbar from '@/components/layout/Navbar'

function AppLayout() {
  return (
    <div className="h-screen flex flex-col bg-white">
      <Navbar />
      <div className="flex-1 min-h-0">
        <Outlet />
      </div>
    </div>
  )
}

export default AppLayout
