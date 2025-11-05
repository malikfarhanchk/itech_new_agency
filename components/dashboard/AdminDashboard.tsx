'use client'

import { useState, useEffect } from 'react'
import { 
  CurrencyDollarIcon, 
  UserGroupIcon, 
  ChartBarIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from '@heroicons/react/24/outline'
import { supabase } from '@/lib/supabase'
import { formatCurrency, formatPercentage } from '@/lib/utils'
import ClientGrid from './ClientGrid'
import { Client } from './types'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalClients: 0,
    activeClients: 0,
    improvingClients: 0,
    stableClients: 0,
    decliningClients: 0,
    monthlyGrowth: 0
  })
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      // Load clients data
      const { data: clientsData, error: clientsError } = await supabase
        .from('clients')
        .select('*')
        .order('updated_at', { ascending: false })

      if (clientsError) {
        console.error('Error loading clients:', clientsError)
        return
      }

      // Calculate stats
      const totalClients = clientsData?.length || 0
      const improvingClients = clientsData?.filter(c => c.status === 'improving').length || 0
      const stableClients = clientsData?.filter(c => c.status === 'stable').length || 0
      const decliningClients = clientsData?.filter(c => c.status === 'declined').length || 0
      const totalRevenue = clientsData?.reduce((sum, c) => sum + c.monthly_fee, 0) || 0

      setClients(clientsData || [])
      setStats({
        totalRevenue,
        totalClients,
        activeClients: totalClients, // All clients are considered active for now
        improvingClients,
        stableClients,
        decliningClients,
        monthlyGrowth: 12.5 // Mock data - would calculate from historical data
      })
    } catch (error) {
      console.error('Error loading dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const StatCard = ({ 
    title, 
    value, 
    change, 
    icon: Icon, 
    color = 'primary' 
  }: {
    title: string
    value: string | number
    change?: number
    icon: any
    color?: 'primary' | 'success' | 'warning' | 'error'
  }) => {
    const colorClasses = {
      primary: 'bg-blue-100 text-blue-600',
      success: 'bg-green-100 text-green-600',
      warning: 'bg-yellow-100 text-yellow-600',
      error: 'bg-red-100 text-red-600'
    }

    return (
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className={`inline-flex items-center justify-center p-3 rounded-md ${colorClasses[color]}`}>
                <Icon className="h-6 w-6" aria-hidden="true" />
              </div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">{value}</div>
                  {change !== undefined && (
                    <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                      change >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {change >= 0 ? (
                        <ArrowUpIcon className="self-center flex-shrink-0 h-4 w-4 text-green-500" />
                      ) : (
                        <ArrowDownIcon className="self-center flex-shrink-0 h-4 w-4 text-red-500" />
                      )}
                      <span className="ml-1">{formatPercentage(Math.abs(change))}</span>
                    </div>
                  )}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    )
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
            Dashboard Overview
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Welcome back! Here's what's happening with your clients.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Monthly Revenue"
          value={formatCurrency(stats.totalRevenue)}
          change={stats.monthlyGrowth}
          icon={CurrencyDollarIcon}
          color="success"
        />
        <StatCard
          title="Total Active Clients"
          value={stats.totalClients}
          icon={UserGroupIcon}
          color="primary"
        />
        <StatCard
          title="Portfolio Health"
          value={`${stats.improvingClients} | ${stats.stableClients} | ${stats.decliningClients}`}
          icon={ChartBarIcon}
          color="primary"
        />
        <StatCard
          title="Net Monthly Balance"
          value={formatCurrency(stats.totalRevenue * 0.85)} // After 15% operational costs
          icon={CurrencyDollarIcon}
          color="success"
        />
      </div>

      {/* Client Status Summary */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Portfolio Health Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center">
            <div className="flex-shrink-0 w-4 h-4 bg-green-500 rounded-full"></div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Improving</p>
              <p className="text-sm text-gray-500">{stats.improvingClients} clients showing positive growth</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0 w-4 h-4 bg-yellow-500 rounded-full"></div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Stable</p>
              <p className="text-sm text-gray-500">{stats.stableClients} clients maintaining current performance</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0 w-4 h-4 bg-red-500 rounded-full"></div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Declined</p>
              <p className="text-sm text-gray-500">{stats.decliningClients} clients needing attention</p>
            </div>
          </div>
        </div>
      </div>

      {/* Client Grid */}
      <ClientGrid clients={clients} onRefresh={loadDashboardData} />
    </div>
  )
}