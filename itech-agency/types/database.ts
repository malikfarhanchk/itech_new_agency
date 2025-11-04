// Database Types
// This file will be auto-generated from Supabase once database is deployed
// For now, providing manual types based on schema

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type UserRole = 'super_admin' | 'admin' | 'client'
export type UserStatus = 'pending_approval' | 'active' | 'inactive'
export type ClientType = 'local_seo' | 'ecommerce'
export type ClientStatus = 'improving' | 'stable' | 'declined'
export type LeadStage = 'initial_contact' | 'proposal_sent' | 'negotiation' | 'won' | 'lost'
export type TaskStatus = 'todo' | 'in_progress' | 'review' | 'completed'
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent'

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          role: UserRole
          status: UserStatus
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>
      }
      clients: {
        Row: {
          id: string
          name: string
          domain: string
          client_type: ClientType | null
          contract_length: number | null
          monthly_fee: number | null
          status: ClientStatus
          status_color: string
          status_metric: string | null
          status_updated_at: string | null
          primary_contact_user_id: string | null
          onboarded_at: string | null
          created_by: string | null
          created_at: string
          updated_at: string
          is_active: boolean
        }
        Insert: Omit<Database['public']['Tables']['clients']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['clients']['Insert']>
      }
      client_goals: {
        Row: {
          id: string
          client_id: string
          goal_type: string
          target_value: number | null
          current_value: number | null
          period: string | null
          deadline: string | null
          status: string
          created_at: string
          updated_at: string
        }
      }
      tasks: {
        Row: {
          id: string
          client_id: string | null
          title: string
          description: string | null
          status: TaskStatus
          priority: TaskPriority
          assigned_to: string | null
          due_date: string | null
          completed_at: string | null
          created_by: string | null
          created_at: string
          updated_at: string
        }
      }
      leads: {
        Row: {
          id: string
          business_name: string
          contact_name: string | null
          email: string | null
          phone: string | null
          website: string | null
          industry: string | null
          stage: LeadStage
          value: number | null
          probability: number
          source: string | null
          assigned_to: string | null
          notes: string | null
          won_date: string | null
          lost_reason: string | null
          created_at: string
          updated_at: string
        }
      }
      chat_messages: {
        Row: {
          id: string
          user_id: string
          message: string
          mentions: Json
          client_links: Json
          attachments: Json
          is_edited: boolean
          edited_at: string | null
          created_at: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          type: string
          title: string
          message: string | null
          link: string | null
          is_read: boolean
          created_at: string
        }
      }
      system_settings: {
        Row: {
          id: string
          setting_key: string
          setting_value: Json
          updated_by: string | null
          updated_at: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: Record<string, never>
        Returns: string
      }
      is_admin: {
        Args: Record<string, never>
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}
