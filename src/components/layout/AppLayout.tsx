import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

function AppLayout() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Outlet />
    </div>
  )
}

export default AppLayout
