'use client'

import { useState } from 'react'
import Link from 'next/link'
import { mockClients, mockSEOData, mockKeywordData, mockTasks } from '@/lib/mockData'

export default function ClientDetailPage({ params }: { params: { id: string } }) {
  const client = mockClients.find(c => c.id === params.id)
  const [activeTab, setActiveTab] = useState('overview')

  if (!client) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Client Not Found</h1>
          <Link href="/admin/dashboard" className="text-primary hover:underline mt-4 inline-block">
            Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  const clientTasks = mockTasks.filter(t => t.client_id === client.id)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/admin/dashboard" className="text-gray-600 hover:text-gray-900">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{client.name}</h1>
                <p className="text-sm text-gray-500">{client.domain}</p>
              </div>
            </div>
            
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${
              client.status_color === 'green' ? 'bg-success text-white' :
              client.status_color === 'yellow' ? 'bg-warning text-white' :
              'bg-danger text-white'
            }`}>
              {client.status_metric}
            </span>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {['overview', 'seo_analysis', 'tasks', 'goals', 'audit_workspace'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Client Info */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Client Information</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Type</p>
                  <p className="font-medium text-gray-900 capitalize">{client.client_type.replace('_', ' ')}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Monthly Fee</p>
                  <p className="font-medium text-gray-900">£{client.monthly_fee}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p className="font-medium text-gray-900 capitalize">{client.status}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Onboarded</p>
                  <p className="font-medium text-gray-900">{new Date(client.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Total Clicks (7 days)</h3>
                <p className="text-3xl font-bold text-gray-900">{mockSEOData.clicks[mockSEOData.clicks.length - 1]}</p>
                <p className="text-sm text-success mt-1">+27% vs previous week</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Avg Position</h3>
                <p className="text-3xl font-bold text-gray-900">{mockSEOData.avgPosition[mockSEOData.avgPosition.length - 1]}</p>
                <p className="text-sm text-success mt-1">Improved from 12.5</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Active Tasks</h3>
                <p className="text-3xl font-bold text-gray-900">{clientTasks.filter(t => t.status !== 'completed').length}</p>
                <p className="text-sm text-gray-600 mt-1">{clientTasks.length} total tasks</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'seo_analysis' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Keywords</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Keyword</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Volume</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clicks</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockKeywordData.map((kw, idx) => (
                      <tr key={idx}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{kw.keyword}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{kw.position}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{kw.volume.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{kw.clicks}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tasks' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Tasks</h2>
              <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors">
                Add Task
              </button>
            </div>
            <div className="space-y-3">
              {clientTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900">{task.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">Due: {task.due_date}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    task.status === 'completed' ? 'bg-success-light text-success' :
                    task.status === 'in_progress' ? 'bg-primary/10 text-primary' :
                    task.status === 'review' ? 'bg-warning-light text-warning' :
                    'bg-gray-200 text-gray-700'
                  }`}>
                    {task.status.replace('_', ' ')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'audit_workspace' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">SEO Audit & Strategy Workspace</h2>
            <p className="text-gray-600 mb-4">10-tab spreadsheet interface for comprehensive SEO audits</p>
            <div className="bg-gray-100 rounded-lg p-8 text-center">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-gray-600">Advanced spreadsheet workspace with AG-Grid</p>
              <p className="text-sm text-gray-500 mt-2">Client Details, Pages, Keywords, Meta, Competitors, Content, Citations, Links, Surfer, Tasks</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
