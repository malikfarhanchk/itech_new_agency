import ProtectedRoute from '@/components/auth/ProtectedRoute'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import AnalyticsPage from '@/components/analytics/AnalyticsPage'

export default function AnalyticsPageWrapper() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <AnalyticsPage />
      </DashboardLayout>
    </ProtectedRoute>
  )
}