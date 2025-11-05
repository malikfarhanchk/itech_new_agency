export interface NavigationItem {
  name: string
  href: string
  icon: string
}

export interface DashboardStats {
  totalRevenue: number
  totalClients: number
  activeClients: number
  improvingClients: number
  stableClients: number
  decliningClients: number
  monthlyGrowth: number
}

export interface Client {
  id: string
  name: string
  website_domain: string
  client_type: 'local_seo' | 'ecommerce'
  contract_length: number
  monthly_fee: number
  status: 'improving' | 'stable' | 'declined'
  performance_data: any
  created_at: string
  updated_at: string
}

export interface Task {
  id: string
  client_id: string
  title: string
  description: string | null
  status: 'todo' | 'in_progress' | 'completed'
  priority: 'low' | 'medium' | 'high'
  assigned_to: string | null
  due_date: string | null
  created_at: string
  updated_at: string
}

export interface Lead {
  id: string
  name: string
  email: string | null
  phone: string | null
  company: string | null
  source: string | null
  status: 'initial_contact' | 'proposal_sent' | 'negotiation' | 'won' | 'lost'
  expected_value: number | null
  notes: string | null
  created_at: string
  updated_at: string
}