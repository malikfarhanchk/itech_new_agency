import ProtectedRoute from '@/components/auth/ProtectedRoute'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import TasksPage from '@/components/tasks/TasksPage'

export default function TasksPageWrapper() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <TasksPage />
      </DashboardLayout>
    </ProtectedRoute>
  )
}