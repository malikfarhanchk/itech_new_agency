export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string | null
          role: 'super_admin' | 'admin' | 'client'
          avatar_url: string | null
          client_id: string | null
          pending_approval: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name?: string | null
          role?: 'super_admin' | 'admin' | 'client'
          avatar_url?: string | null
          client_id?: string | null
          pending_approval?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          role?: 'super_admin' | 'admin' | 'client'
          avatar_url?: string | null
          client_id?: string | null
          pending_approval?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      clients: {
        Row: {
          id: string
          name: string
          website_domain: string
          client_type: 'local_seo' | 'ecommerce'
          contract_length: number
          monthly_fee: number
          status: 'improving' | 'stable' | 'declined'
          performance_data: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          website_domain: string
          client_type: 'local_seo' | 'ecommerce'
          contract_length: number
          monthly_fee: number
          status?: 'improving' | 'stable' | 'declined'
          performance_data?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          website_domain?: string
          client_type?: 'local_seo' | 'ecommerce'
          contract_length?: number
          monthly_fee?: number
          status?: 'improving' | 'stable' | 'declined'
          performance_data?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      tasks: {
        Row: {
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
        Insert: {
          id?: string
          client_id: string
          title: string
          description?: string | null
          status?: 'todo' | 'in_progress' | 'completed'
          priority?: 'low' | 'medium' | 'high'
          assigned_to?: string | null
          due_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          client_id?: string
          title?: string
          description?: string | null
          status?: 'todo' | 'in_progress' | 'completed'
          priority?: 'low' | 'medium' | 'high'
          assigned_to?: string | null
          due_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      leads: {
        Row: {
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
        Insert: {
          id?: string
          name: string
          email?: string | null
          phone?: string | null
          company?: string | null
          source?: string | null
          status?: 'initial_contact' | 'proposal_sent' | 'negotiation' | 'won' | 'lost'
          expected_value?: number | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string | null
          phone?: string | null
          company?: string | null
          source?: string | null
          status?: 'initial_contact' | 'proposal_sent' | 'negotiation' | 'won' | 'lost'
          expected_value?: number | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      seo_data: {
        Row: {
          id: string
          client_id: string
          keyword: string
          url: string
          position: number | null
          traffic: number | null
          search_volume: number | null
          date_recorded: string
          created_at: string
        }
        Insert: {
          id?: string
          client_id: string
          keyword: string
          url: string
          position?: number | null
          traffic?: number | null
          search_volume?: number | null
          date_recorded: string
          created_at?: string
        }
        Update: {
          id?: string
          client_id?: string
          keyword?: string
          url?: string
          position?: number | null
          traffic?: number | null
          search_volume?: number | null
          date_recorded?: string
          created_at?: string
        }
      }
      client_leads: {
        Row: {
          id: string
          client_id: string
          date: string
          lead_count: number
          source: string | null
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          client_id: string
          date: string
          lead_count: number
          source?: string | null
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          client_id?: string
          date?: string
          lead_count?: number
          source?: string | null
          notes?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}