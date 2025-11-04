'use client';

import { useEffect, useState } from 'react';
import { supabase, getCurrentUser } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Upload, TrendingUp, Search, BarChart3, Download, Sparkles } from 'lucide-react';
import Sidebar from '@/components/admin/Sidebar';

export default function SEOAnalysisPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [clients, setClients] = useState<any[]>([]);
  const [selectedClient, setSelectedClient] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [recentUploads, setRecentUploads] = useState<any[]>([]);
  const [aiInsights, setAiInsights] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'upload' | 'keywords' | 'competitors' | 'insights'>('upload');

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
    // Load clients
    const { data: clientsData } = await supabase
      .from('clients')
      .select('*')
      .order('name');

    if (clientsData) {
      setClients(clientsData);
      if (clientsData.length > 0) {
        setSelectedClient(clientsData[0].id);
      }
    }

    // Load recent uploads
    const { data: uploadsData } = await supabase
      .from('uploaded_files')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);

    if (uploadsData) {
      setRecentUploads(uploadsData);
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/auth/login');
  }

  async function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>, dataType: string) {
    const file = event.target.files?.[0];
    if (!file || !selectedClient) {
      alert('Please select a client first');
      return;
    }

    setUploading(true);

    try {
      // Get current user
      const user = await getCurrentUser();
      if (!user) return;

      // Upload file to Supabase Storage
      const fileName = `${Date.now()}-${file.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('client-files')
        .upload(fileName, file);

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('client-files')
        .getPublicUrl(fileName);

      // Save file metadata
      const { data: fileRecord, error: metaError } = await supabase
        .from('uploaded_files')
        .insert({
          client_id: selectedClient,
          uploaded_by: user.id,
          file_name: file.name,
          file_type: file.type,
          file_size: file.size,
          file_url: publicUrl,
          storage_path: fileName,
          file_category: dataType,
          is_processed: false,
          processing_status: 'pending'
        })
        .select()
        .single();

      if (metaError) {
        throw metaError;
      }

      // Process CSV via Edge Function
      const { data, error } = await supabase.functions.invoke('process-csv', {
        body: {
          fileUrl: publicUrl,
          clientId: selectedClient,
          dataType: dataType
        }
      });

      if (error) {
        console.error('Processing error:', error);
        alert('File uploaded but processing failed: ' + error.message);
      } else {
        alert(`File processed successfully! ${data.data.recordsInserted} records inserted.`);
        loadData();
      }

    } catch (error: any) {
      console.error('Upload error:', error);
      alert('Error uploading file: ' + error.message);
    }

    setUploading(false);
  }

  async function getAIInsights(analysisType: string) {
    if (!selectedClient) {
      alert('Please select a client first');
      return;
    }

    setAnalyzing(true);
    setAiInsights('');

    try {
      // Get relevant data for analysis
      let data: any = {};
      
      if (analysisType === 'keyword_opportunities') {
        const { data: keywords } = await supabase
          .from('keyword_data')
          .select('*')
          .eq('client_id', selectedClient)
          .order('search_volume', { ascending: false })
          .limit(20);
        data = keywords;
      } else if (analysisType === 'competitor_analysis') {
        const { data: competitors } = await supabase
          .from('competitor_data')
          .select('*')
          .eq('client_id', selectedClient);
        data = competitors;
      } else if (analysisType === 'performance_summary') {
        const { data: performance } = await supabase
          .from('seo_performance_data')
          .select('*')
          .eq('client_id', selectedClient)
          .order('date', { ascending: false })
          .limit(7);
        data = performance;
      }

      // Call AI Analysis Edge Function
      const { data: aiResponse, error } = await supabase.functions.invoke('ai-analysis', {
        body: {
          clientId: selectedClient,
          analysisType: analysisType,
          data: data
        }
      });

      if (error) {
        throw error;
      }

      setAiInsights(aiResponse.data.analysis);
      setActiveTab('insights');

    } catch (error: any) {
      console.error('AI Analysis error:', error);
      alert('Error getting AI insights: ' + error.message);
    }

    setAnalyzing(false);
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
                <h1 className="text-2xl font-bold text-gray-900">SEO Analysis & Data Management</h1>
                <p className="text-sm text-gray-500">Upload CSV data and get AI-powered insights</p>
              </div>
            </div>
          </div>
        </header>

        <div className="px-8 py-8">
          {/* Navigation Tabs */}
          <div className="flex space-x-2 mb-6">
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === 'upload' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Upload Data
          </button>
          <button
            onClick={() => setActiveTab('keywords')}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === 'keywords' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Keywords
          </button>
          <button
            onClick={() => setActiveTab('competitors')}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === 'competitors' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Competitors
          </button>
          <button
            onClick={() => setActiveTab('insights')}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === 'insights' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            AI Insights
          </button>
        </div>

        {/* Client Selector */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Client</label>
          <select
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
            className="w-full md:w-96 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Choose a client...</option>
            {clients.map(client => (
              <option key={client.id} value={client.id}>{client.name}</option>
            ))}
          </select>
        </div>

        {/* Upload Section */}
        {activeTab === 'upload' && (
          <div className="space-y-6">
            {/* Upload Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Keywords Upload */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center mb-4">
                  <Search className="h-6 w-6 text-blue-600 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900">Keywords Data</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Upload keyword rankings from Ahrefs, Semrush, or similar tools
                </p>
                <label className="flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer">
                  <Upload className="h-4 w-4 mr-2" />
                  <span>{uploading ? 'Uploading...' : 'Upload CSV'}</span>
                  <input
                    type="file"
                    accept=".csv"
                    onChange={(e) => handleFileUpload(e, 'keywords')}
                    disabled={uploading || !selectedClient}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Backlinks Upload */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center mb-4">
                  <TrendingUp className="h-6 w-6 text-green-600 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900">Backlinks Data</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Upload backlink profile data from your SEO tools
                </p>
                <label className="flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer">
                  <Upload className="h-4 w-4 mr-2" />
                  <span>{uploading ? 'Uploading...' : 'Upload CSV'}</span>
                  <input
                    type="file"
                    accept=".csv"
                    onChange={(e) => handleFileUpload(e, 'backlinks')}
                    disabled={uploading || !selectedClient}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Competitors Upload */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center mb-4">
                  <BarChart3 className="h-6 w-6 text-purple-600 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900">Competitors Data</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Upload competitor analysis and comparison data
                </p>
                <label className="flex items-center justify-center px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 cursor-pointer">
                  <Upload className="h-4 w-4 mr-2" />
                  <span>{uploading ? 'Uploading...' : 'Upload CSV'}</span>
                  <input
                    type="file"
                    accept=".csv"
                    onChange={(e) => handleFileUpload(e, 'competitors')}
                    disabled={uploading || !selectedClient}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Recent Uploads */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="px-6 py-4 border-b">
                <h3 className="text-lg font-semibold text-gray-900">Recent Uploads</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">File Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Size</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Uploaded</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentUploads.map(upload => (
                      <tr key={upload.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {upload.file_name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {upload.file_category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {(upload.file_size / 1024).toFixed(1)} KB
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            upload.is_processed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {upload.is_processed ? 'Processed' : upload.processing_status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(upload.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                    {recentUploads.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                          No uploads yet. Upload your first CSV file to get started.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* AI Insights Section */}
        {activeTab === 'insights' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">AI-Powered Analysis</h3>
              <p className="text-sm text-gray-600 mb-6">
                Get intelligent insights from your SEO data using Google Gemini AI
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <button
                  onClick={() => getAIInsights('keyword_opportunities')}
                  disabled={analyzing || !selectedClient}
                  className="flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  <Sparkles className="h-5 w-5" />
                  <span>Keyword Opportunities</span>
                </button>

                <button
                  onClick={() => getAIInsights('competitor_analysis')}
                  disabled={analyzing || !selectedClient}
                  className="flex items-center justify-center space-x-2 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
                >
                  <Sparkles className="h-5 w-5" />
                  <span>Competitor Insights</span>
                </button>

                <button
                  onClick={() => getAIInsights('performance_summary')}
                  disabled={analyzing || !selectedClient}
                  className="flex items-center justify-center space-x-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                >
                  <Sparkles className="h-5 w-5" />
                  <span>Performance Summary</span>
                </button>

                <button
                  onClick={() => getAIInsights('content_strategy')}
                  disabled={analyzing || !selectedClient}
                  className="flex items-center justify-center space-x-2 px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50"
                >
                  <Sparkles className="h-5 w-5" />
                  <span>Content Strategy</span>
                </button>
              </div>

              {analyzing && (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Analyzing data with AI...</p>
                </div>
              )}

              {aiInsights && !analyzing && (
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <div className="flex items-center mb-4">
                    <Sparkles className="h-5 w-5 text-blue-600 mr-2" />
                    <h4 className="font-semibold text-gray-900">AI Analysis Results</h4>
                  </div>
                  <div className="prose prose-sm max-w-none">
                    <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans">
                      {aiInsights}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
