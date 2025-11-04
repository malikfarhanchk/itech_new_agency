'use client';

import { useEffect, useState } from 'react';
import { supabase, getCurrentUser } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Plus, Edit2, Trash2, Sparkles, FileCode, TrendingUp } from 'lucide-react';
import Sidebar from '@/components/admin/Sidebar';

export default function InternalToolsPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'prompts' | 'schemas' | 'tracking'>('prompts');
  const [aiPrompts, setAiPrompts] = useState<any[]>([]);
  const [schemaTemplates, setSchemaTemplates] = useState<any[]>([]);
  const [leadTracking, setLeadTracking] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      router.push('/auth/login');
      return;
    }
    setUser(currentUser);
    loadData();
  }

  async function loadData() {
    setLoading(true);

    // Load AI Prompts
    const { data: promptsData } = await supabase
      .from('ai_prompts')
      .select('*')
      .order('created_at', { ascending: false });

    if (promptsData) {
      setAiPrompts(promptsData);
    }

    // Load Schema Templates
    const { data: schemasData } = await supabase
      .from('schema_templates')
      .select('*')
      .order('created_at', { ascending: false });

    if (schemasData) {
      setSchemaTemplates(schemasData);
    }

    // Load Lead Tracking
    const { data: trackingData } = await supabase
      .from('lead_tracking')
      .select('*')
      .order('tracking_date', { ascending: false })
      .limit(30);

    if (trackingData) {
      setLeadTracking(trackingData);
    }

    setLoading(false);
  }

  async function deletePrompt(id: string) {
    if (confirm('Delete this prompt?')) {
      await supabase.from('ai_prompts').delete().eq('id', id);
      loadData();
    }
  }

  async function deleteSchema(id: string) {
    if (confirm('Delete this schema template?')) {
      await supabase.from('schema_templates').delete().eq('id', id);
      loadData();
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/auth/login');
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading tools...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar userEmail={user?.email} onLogout={handleLogout} />

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="px-8 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Internal Tools</h1>
                <p className="text-sm text-gray-500">Manage AI prompts, schemas, and tracking</p>
              </div>
            </div>
          </div>
        </header>

        <div className="px-8 py-8">
          {/* Navigation Tabs */}
          <div className="flex space-x-2 mb-6">
          <button
            onClick={() => setActiveTab('prompts')}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === 'prompts' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            AI Prompts ({aiPrompts.length})
          </button>
          <button
            onClick={() => setActiveTab('schemas')}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === 'schemas' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Schema Templates ({schemaTemplates.length})
          </button>
          <button
            onClick={() => setActiveTab('tracking')}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === 'tracking' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Lead Tracking ({leadTracking.length})
          </button>
        </div>

        {/* AI Prompts */}
        {activeTab === 'prompts' && (
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">AI Prompt Library</h3>
                <p className="text-sm text-gray-500">Manage Gemini AI prompts for SEO analysis</p>
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Plus className="h-4 w-4" />
                <span>Add Prompt</span>
              </button>
            </div>
            <div className="divide-y divide-gray-200">
              {aiPrompts.map((prompt) => (
                <div key={prompt.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Sparkles className="h-5 w-5 text-blue-600" />
                        <h4 className="font-semibold text-gray-900">{prompt.prompt_name}</h4>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                          {prompt.prompt_category}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{prompt.prompt_description}</p>
                      <div className="bg-gray-50 p-3 rounded border border-gray-200">
                        <p className="text-xs text-gray-700 font-mono">{prompt.prompt_text.substring(0, 200)}...</p>
                      </div>
                      {prompt.use_case && (
                        <p className="text-xs text-gray-500 mt-2">Use Case: {prompt.use_case}</p>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <button className="p-2 text-gray-400 hover:text-blue-600">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deletePrompt(prompt.id)}
                        className="p-2 text-gray-400 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {aiPrompts.length === 0 && (
                <div className="p-12 text-center text-gray-500">
                  No AI prompts yet. Create your first prompt to get started.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Schema Templates */}
        {activeTab === 'schemas' && (
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Schema Markup Templates</h3>
                <p className="text-sm text-gray-500">JSON-LD schema templates for different business types</p>
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Plus className="h-4 w-4" />
                <span>Add Template</span>
              </button>
            </div>
            <div className="divide-y divide-gray-200">
              {schemaTemplates.map((schema) => (
                <div key={schema.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <FileCode className="h-5 w-5 text-green-600" />
                        <h4 className="font-semibold text-gray-900">{schema.schema_name}</h4>
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                          {schema.schema_type}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{schema.description}</p>
                      {schema.industry && (
                        <p className="text-xs text-gray-500 mb-2">Industry: {schema.industry}</p>
                      )}
                      <div className="bg-gray-900 p-3 rounded">
                        <pre className="text-xs text-green-400 font-mono overflow-x-auto">
                          {JSON.stringify(JSON.parse(schema.json_ld_template), null, 2).substring(0, 300)}...
                        </pre>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <button className="p-2 text-gray-400 hover:text-blue-600">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteSchema(schema.id)}
                        className="p-2 text-gray-400 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {schemaTemplates.length === 0 && (
                <div className="p-12 text-center text-gray-500">
                  No schema templates yet. Create your first template.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Lead Tracking */}
        {activeTab === 'tracking' && (
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Lead Tracking (Local SEO)</h3>
              <p className="text-sm text-gray-500">Track form submissions, calls, and inquiries</p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Form Submissions</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone Calls</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email Inquiries</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Chat</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Leads</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {leadTracking.map((tracking) => (
                    <tr key={tracking.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(tracking.tracking_date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {tracking.form_submissions || 0}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {tracking.phone_calls || 0}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {tracking.email_inquiries || 0}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {tracking.chat_conversations || 0}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                        {tracking.total_leads || 0}
                      </td>
                    </tr>
                  ))}
                  {leadTracking.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                        No lead tracking data yet. Start tracking to see analytics.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
