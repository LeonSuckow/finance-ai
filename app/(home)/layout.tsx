import Navbar from '../_components/custom/navbar'

interface DashboardLayoutProps {
  children: React.ReactNode
}
const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  )
}

export default DashboardLayout
