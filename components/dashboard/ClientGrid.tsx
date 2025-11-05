'use client'

import { useState } from 'react'
import { 
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { Client } from './types'
import { formatCurrency, formatRelativeTime, getStatusColor } from '@/lib/utils'

interface ClientGridProps {
  clients: Client[]
  onRefresh: () => void
}

export default function ClientGrid({ clients, onRefresh }: ClientGridProps) {
  const [filter, setFilter] = useState<'all' | 'local_seo' | 'ecommerce'>('all')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredClients = clients.filter(client => {
    const matchesFilter = filter === 'all' || client.client_type === filter
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.website_domain.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'improving':
        return 'bg-green-500'
      case 'stable':
        return 'bg-yellow-500'
      case 'declined':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'improving':
        return '+'
      case 'declined':
        return '-'
      default:
        return '='
    }
  }

  return (
    <div className="bg-white shadow rounded-lg">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Client Portfolio</h3>
          <div className="flex items-center space-x-3">
            {/* Filter Buttons */}
            <div className="flex items-center space-x-2">
              <FunnelIcon className="h-4 w-4 text-gray-400" />
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1 text-xs font-medium rounded-full ${
                  filter === 'all' 
                    ? 'bg-primary-100 text-primary-800' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                All ({clients.length})
              </button>
              <button
                onClick={() => setFilter('local_seo')}
                className={`px-3 py-1 text-xs font-medium rounded-full ${
                  filter === 'local_seo' 
                    ? 'bg-primary-100 text-primary-800' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                Local SEO ({clients.filter(c => c.client_type === 'local_seo').length})
              </button>
              <button
                onClick={() => setFilter('ecommerce')}
                className={`px-3 py-1 text-xs font-medium rounded-full ${
                  filter === 'ecommerce' 
                    ? 'bg-primary-100 text-primary-800' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                E-commerce ({clients.filter(c => c.client_type === 'ecommerce').length})
              </button>
            </div>
            
            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            
            {/* Add Client Button */}
            <Link
              href="/dashboard/clients/new"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Client
            </Link>
          </div>
        </div>
      </div>

      {/* Client Grid */}
      <div className="p-6">
        {filteredClients.length === 0 ? (
          <div className="text-center py-12">
            <UserGroupIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No clients found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm ? 'Try adjusting your search terms.' : 'Get started by adding your first client.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredClients.map((client) => (
              <Link
                key={client.id}
                href={`/dashboard/clients/${client.id}`}
                className="client-card group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-500 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-200"
              >
                {/* Status indicator */}
                <div className="absolute top-4 right-4">
                  <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${getStatusColor(client.status)}`}>
                    <span className="mr-1">{getStatusIcon(client.status)}</span>
                    {client.status}
                  </div>
                </div>
                
                {/* Client info */}
                <div>
                  <div className="mt-2">
                    <h3 className="text-lg font-medium text-gray-900 group-hover:text-primary-600">
                      {client.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {client.website_domain}
                    </p>
                    <div className="flex items-center mt-2 space-x-4 text-sm text-gray-500">
                      <span className="capitalize">{client.client_type.replace('_', ' ')}</span>
                      <span>•</span>
                      <span>{formatCurrency(client.monthly_fee)}/mo</span>
                    </div>
                  </div>
                  
                  {/* Performance metric */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Monthly Performance</span>
                      <span className={`font-medium ${
                        client.status === 'improving' ? 'text-green-600' :
                        client.status === 'declined' ? 'text-red-600' : 'text-yellow-600'
                      }`}>
                        {client.status === 'improving' ? '+15% Clicks' :
                         client.status === 'declined' ? '-5% Traffic' : 'Stable'}
                      </span>
                    </div>
                  </div>
                  
                  {/* Last updated */}
                  <div className="mt-4 text-xs text-gray-400">
                    Updated {formatRelativeTime(client.updated_at)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}