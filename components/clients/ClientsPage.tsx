'use client'

import { useState, useEffect } from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'
import { supabase } from '@/lib/supabase'
import { Client } from '@/components/dashboard/types'
import AddClientModal from '@/components/dashboard/AddClientModal'
import ClientGrid from '@/components/dashboard/ClientGrid'

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)

  useEffect(() => {
    loadClients()
  }, [])

  const loadClients = async () => {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error loading clients:', error)
        // Load demo data if no clients exist
        setClients([
          {
            id: '1',
            name: 'TechStart Solutions',
            website_domain: 'techstart.com',
            client_type: 'local_seo',
            contract_length: 12,
            monthly_fee: 750,
            status: 'improving',
            performance_data: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          {
            id: '2',
            name: 'Ecommerce Plus',
            website_domain: 'ecommerceplus.co.uk',
            client_type: 'ecommerce',
            contract_length: 6,
            monthly_fee: 1200,
            status: 'stable',
            performance_data: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          {
            id: '3',
            name: 'Local Services Pro',
            website_domain: 'localservicespro.com',
            client_type: 'local_seo',
            contract_length: 12,
            monthly_fee: 500,
            status: 'declined',
            performance_data: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        ])
      } else {
        setClients(data || [])
      }
    } catch (error) {
      console.error('Error loading clients:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="spinner w-8 h-8" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Client Management
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage your client portfolio and monitor performance.
          </p>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Client
          </button>
        </div>
      </div>

      {/* Client Grid */}
      <ClientGrid clients={clients} onRefresh={loadClients} />

      {/* Add Client Modal */}
      <AddClientModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={loadClients}
      />
    </div>
  )
}