import ProtectedRoute from '@/components/auth/ProtectedRoute'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import AdminDashboard from '@/components/dashboard/AdminDashboard'

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <AdminDashboard />
      </DashboardLayout>
    </ProtectedRoute>
  )
}