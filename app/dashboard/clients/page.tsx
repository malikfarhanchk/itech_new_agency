import ProtectedRoute from '@/components/auth/ProtectedRoute'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import ClientsPage from '@/components/clients/ClientsPage'

export default function ClientsPageWrapper() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <ClientsPage />
      </DashboardLayout>
    </ProtectedRoute>
  )
}