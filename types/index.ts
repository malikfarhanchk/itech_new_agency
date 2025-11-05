import { Database } from './database'

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Inserts<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type Updates<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']

export type User = Tables<'users'>
export type Client = Tables<'clients'>
export type Task = Tables<'tasks'>
export type Lead = Tables<'leads'>
export type SeoData = Tables<'seo_data'>
export type ClientLead = Tables<'client_leads'>

export type UserRole = 'super_admin' | 'admin' | 'client'
export type ClientStatus = 'improving' | 'stable' | 'declined'
export type ClientType = 'local_seo' | 'ecommerce'
export type TaskStatus = 'todo' | 'in_progress' | 'completed'
export type TaskPriority = 'low' | 'medium' | 'high'
export type LeadStatus = 'initial_contact' | 'proposal_sent' | 'negotiation' | 'won' | 'lost'

export interface DashboardStats {
  totalRevenue: number
  totalClients: number
  activeClients: number
  improvingClients: number
  stableClients: number
  decliningClients: number
  monthlyGrowth: number
}

export interface ClientPerformanceData {
  currentWeekTraffic: number
  previousWeekTraffic: number
  percentageChange: number
  status: ClientStatus
  keywords: number
  averagePosition: number
  leadsThisWeek: number
}

export interface NotificationItem {
  id: string
  type: 'info' | 'success' | 'warning' | 'error'
  title: string
  message: string
  timestamp: string
  read: boolean
}

export interface ChatMessage {
  id: string
  user_id: string
  user_name: string
  message: string
  timestamp: string
  mentions: string[] // client domains mentioned
  files: string[] // file attachments
}

export interface WhiteLabelSettings {
  agency_name: string
  agency_logo_url: string
  primary_color: string
  custom_url?: string
}