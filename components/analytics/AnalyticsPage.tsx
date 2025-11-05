'use client'

import { useState } from 'react'
import {
  ChartBarIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'

const performanceData = [
  { month: 'Jan', clicks: 12500, conversions: 89, revenue: 15200 },
  { month: 'Feb', clicks: 13200, conversions: 94, revenue: 16800 },
  { month: 'Mar', clicks: 14100, conversions: 102, revenue: 18200 },
  { month: 'Apr', clicks: 13800, conversions: 98, revenue: 17900 },
  { month: 'May', clicks: 15200, conversions: 108, revenue: 19600 },
  { month: 'Jun', clicks: 16800, conversions: 119, revenue: 21400 },
]

const clientTypesData = [
  { name: 'Local SEO', value: 65, color: '#3b82f6' },
  { name: 'E-commerce', value: 35, color: '#10b981' },
]

const topClientsData = [
  { name: 'TechStart Solutions', clicks: 4200, revenue: 750 },
  { name: 'Ecommerce Plus', clicks: 3800, revenue: 1200 },
  { name: 'Local Services Pro', clicks: 2100, revenue: 500 },
  { name: 'Digital Marketing Co', clicks: 1900, revenue: 680 },
  { name: 'E-commerce Store', clicks: 1600, revenue: 950 },
]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('6m')

  const StatCard = ({ title, value, change, icon: Icon, color = 'blue' }: {
    title: string
    value: string
    change?: number
    icon: any
    color?: string
  }) => {
    return (
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className={`inline-flex items-center justify-center p-3 rounded-md bg-${color}-100 text-${color}-600`}>
                <Icon className="h-6 w-6" />
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
                        <TrendingUpIcon className="self-center flex-shrink-0 h-4 w-4 text-green-500" />
                      ) : (
                        <TrendingDownIcon className="self-center flex-shrink-0 h-4 w-4 text-red-500" />
                      )}
                      <span className="ml-1">{Math.abs(change)}%</span>
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Analytics Dashboard
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Comprehensive insights into your agency's performance and client metrics.
          </p>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="input"
          >
            <option value="1m">Last Month</option>
            <option value="3m">Last 3 Months</option>
            <option value="6m">Last 6 Months</option>
            <option value="1y">Last Year</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Clicks"
          value="72.4K"
          change={12.5}
          icon={ChartBarIcon}
          color="blue"
        />
        <StatCard
          title="Conversions"
          value="510"
          change={8.2}
          icon={TrendingUpIcon}
          color="green"
        />
        <StatCard
          title="Revenue"
          value="£109K"
          change={15.3}
          icon={TrendingUpIcon}
          color="green"
        />
        <StatCard
          title="Active Clients"
          value="23"
          change={4.5}
          icon={UserGroupIcon}
          color="purple"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Trends */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="clicks" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="conversions" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Client Types Distribution */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Client Types</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={clientTypesData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {clientTypesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Top Performing Clients */}
        <div className="bg-white p-6 rounded-lg shadow lg:col-span-2">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Top Performing Clients</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topClientsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="clicks" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Summary Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600">4.2%</div>
            <div className="text-sm text-gray-500">Average Conversion Rate</div>
            <div className="text-xs text-green-600 mt-1">+0.3% from last month</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600">£243</div>
            <div className="text-sm text-gray-500">Average Revenue per Client</div>
            <div className="text-xs text-green-600 mt-1">+£15 from last month</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600">98.2%</div>
            <div className="text-sm text-gray-500">Client Retention Rate</div>
            <div className="text-xs text-green-600 mt-1">+1.2% from last month</div>
          </div>
        </div>
      </div>
    </div>
  )
}