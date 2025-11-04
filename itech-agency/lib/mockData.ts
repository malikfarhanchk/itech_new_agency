// Mock data for development and testing
// This allows the application to function without backend connectivity

import { UserRole, ClientStatus, LeadStage, TaskStatus } from '@/types/database'

export interface MockClient {
  id: string
  name: string
  domain: string
  client_type: 'local_seo' | 'ecommerce'
  monthly_fee: number
  status: ClientStatus
  status_color: string
  status_metric: string
  created_at: string
}

export interface MockTask {
  id: string
  client_id: string | null
  title: string
  status: TaskStatus
  priority: 'low' | 'medium' | 'high' | 'urgent'
  assigned_to: string | null
  due_date: string | null
}

export interface MockLead {
  id: string
  business_name: string
  contact_name: string
  email: string
  stage: LeadStage
  value: number
  probability: number
}

export interface MockNotification {
  id: string
  title: string
  message: string
  is_read: boolean
  created_at: string
}

export const mockClients: MockClient[] = [
  {
    id: '1',
    name: 'Acme Local Plumbing',
    domain: 'acmeplumbing.com',
    client_type: 'local_seo',
    monthly_fee: 1500,
    status: 'improving',
    status_color: 'green',
    status_metric: '+450 Clicks',
    created_at: '2024-01-15'
  },
  {
    id: '2',
    name: 'TechGear E-commerce',
    domain: 'techgear.shop',
    client_type: 'ecommerce',
    monthly_fee: 2500,
    status: 'improving',
    status_color: 'green',
    status_metric: '+15% Traffic',
    created_at: '2024-02-01'
  },
  {
    id: '3',
    name: 'Green Gardens Landscaping',
    domain: 'greengardens.co.uk',
    client_type: 'local_seo',
    monthly_fee: 1200,
    status: 'stable',
    status_color: 'yellow',
    status_metric: 'Stable',
    created_at: '2024-03-10'
  },
  {
    id: '4',
    name: 'Fashion Forward Store',
    domain: 'fashionforward.com',
    client_type: 'ecommerce',
    monthly_fee: 3000,
    status: 'improving',
    status_color: 'green',
    status_metric: '+22% Revenue',
    created_at: '2024-02-20'
  },
  {
    id: '5',
    name: 'City Dental Practice',
    domain: 'citydental.com',
    client_type: 'local_seo',
    monthly_fee: 1800,
    status: 'stable',
    status_color: 'yellow',
    status_metric: '+2% Calls',
    created_at: '2024-01-05'
  },
  {
    id: '6',
    name: 'Home Essentials Online',
    domain: 'homeessentials.shop',
    client_type: 'ecommerce',
    monthly_fee: 2200,
    status: 'declined',
    status_color: 'red',
    status_metric: '-12% Traffic',
    created_at: '2024-03-01'
  },
  {
    id: '7',
    name: 'Legal Eagles Law Firm',
    domain: 'legaleagles.co.uk',
    client_type: 'local_seo',
    monthly_fee: 2000,
    status: 'improving',
    status_color: 'green',
    status_metric: '+18% Leads',
    created_at: '2024-01-20'
  }
]

export const mockTasks: MockTask[] = [
  {
    id: '1',
    client_id: '1',
    title: 'Update meta descriptions for top 10 pages',
    status: 'in_progress',
    priority: 'high',
    assigned_to: 'admin',
    due_date: '2025-11-10'
  },
  {
    id: '2',
    client_id: '1',
    title: 'Build 5 local citations',
    status: 'todo',
    priority: 'medium',
    assigned_to: 'admin',
    due_date: '2025-11-15'
  },
  {
    id: '3',
    client_id: '2',
    title: 'Content optimization for product pages',
    status: 'review',
    priority: 'high',
    assigned_to: 'admin',
    due_date: '2025-11-08'
  },
  {
    id: '4',
    client_id: null,
    title: 'Weekly performance report generation',
    status: 'completed',
    priority: 'medium',
    assigned_to: 'admin',
    due_date: '2025-11-03'
  }
]

export const mockLeads: MockLead[] = [
  {
    id: '1',
    business_name: 'Sunshine Cleaning Services',
    contact_name: 'Sarah Johnson',
    email: 'sarah@sunshinecleaning.com',
    stage: 'proposal_sent',
    value: 1500,
    probability: 70
  },
  {
    id: '2',
    business_name: 'Premium Auto Repair',
    contact_name: 'Mike Davis',
    email: 'mike@premiumauto.com',
    stage: 'negotiation',
    value: 2000,
    probability: 85
  },
  {
    id: '3',
    business_name: 'Bella Boutique',
    contact_name: 'Emma Wilson',
    email: 'emma@bellaboutique.com',
    stage: 'initial_contact',
    value: 2500,
    probability: 40
  }
]

export const mockNotifications: MockNotification[] = [
  {
    id: '1',
    title: 'New user signup',
    message: 'John Smith requested admin access',
    is_read: false,
    created_at: '2025-11-03T10:30:00Z'
  },
  {
    id: '2',
    title: 'Client status changed',
    message: 'Home Essentials Online moved to Declined status',
    is_read: false,
    created_at: '2025-11-03T09:15:00Z'
  },
  {
    id: '3',
    title: 'Task completed',
    message: 'Weekly performance report has been generated',
    is_read: true,
    created_at: '2025-11-03T08:00:00Z'
  }
]

export const mockFinancialData = {
  totalMonthlyRevenue: mockClients.reduce((sum, c) => sum + c.monthly_fee, 0),
  totalActiveClients: mockClients.filter(c => c.status !== 'declined').length,
  netMonthlyBalance: mockClients.reduce((sum, c) => sum + c.monthly_fee, 0) * 0.75, // After 25% costs
  improvingCount: mockClients.filter(c => c.status === 'improving').length,
  stableCount: mockClients.filter(c => c.status === 'stable').length,
  declinedCount: mockClients.filter(c => c.status === 'declined').length
}

export const mockPerformanceData = [
  { month: 'May', revenue: 12000, clients: 5 },
  { month: 'Jun', revenue: 14500, clients: 6 },
  { month: 'Jul', revenue: 16000, clients: 6 },
  { month: 'Aug', revenue: 17200, clients: 7 },
  { month: 'Sep', revenue: 18500, clients: 7 },
  { month: 'Oct', revenue: 19400, clients: 7 },
  { month: 'Nov', revenue: 14400, clients: 7 }
]

export const mockSEOData = {
  clicks: [120, 145, 165, 180, 195, 210, 245],
  impressions: [8500, 9200, 9800, 10200, 11000, 11500, 12200],
  avgPosition: [12.5, 11.8, 10.9, 10.2, 9.8, 9.2, 8.7],
  dates: ['Oct 27', 'Oct 28', 'Oct 29', 'Oct 30', 'Oct 31', 'Nov 1', 'Nov 2']
}

export const mockKeywordData = [
  { keyword: 'plumbing services', position: 3, volume: 5400, clicks: 450 },
  { keyword: 'emergency plumber', position: 5, volume: 3200, clicks: 280 },
  { keyword: 'local plumbing company', position: 2, volume: 1900, clicks: 320 },
  { keyword: 'water heater repair', position: 7, volume: 2800, clicks: 180 },
  { keyword: 'drain cleaning service', position: 4, volume: 2100, clicks: 210 }
]
