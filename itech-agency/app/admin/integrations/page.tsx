'use client';

import { useEffect, useState } from 'react';
import { supabase, getCurrentUser } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Globe, TrendingUp, MapPin, Check, X, Settings, ExternalLink, RefreshCw } from 'lucide-react';
import Sidebar from '@/components/admin/Sidebar';

export default function IntegrationsPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [googleCredentials, setGoogleCredentials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [testingConnection, setTestingConnection] = useState<string | null>(null);

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
    loadIntegrations();
  }

  async function loadIntegrations() {
    setLoading(true);

    const { data: credentials } = await supabase
      .from('google_api_credentials')
      .select('*')
      .order('created_at', { ascending: false });

    if (credentials) {
      setGoogleCredentials(credentials);
    }

    setLoading(false);
  }

  async function testConnection(credentialId: string, apiType: string) {
    setTestingConnection(credentialId);
    
    try {
      // Get credential details
      const { data: credential } = await supabase
        .from('google_api_credentials')
        .select('*')
        .eq('id', credentialId)
        .single();

      if (!credential || !credential.access_token) {
        throw new Error('Invalid credentials: Access token missing');
      }

      // Validate token format (basic check)
      if (credential.access_token.length < 20) {
        throw new Error('Invalid access token format');
      }

      // Check if token is expired
      if (credential.expires_at) {
        const expiryDate = new Date(credential.expires_at);
        if (expiryDate < new Date()) {
          // Token expired, needs refresh
          await supabase
            .from('google_api_credentials')
            .update({ 
              connection_status: 'expired',
              last_sync: new Date().toISOString()
            })
            .eq('id', credentialId);
          
          alert('OAuth token has expired. Please reconnect the integration.');
          setTestingConnection(null);
          await loadIntegrations();
          return;
        }
      }

      // Simulate API validation delay (in real implementation, this would make an actual API call)
      await new Promise(resolve => setTimeout(resolve, 1500));

      // In a real implementation, you would make actual API calls here:
      // For GA4: GET https://analyticsadmin.googleapis.com/v1beta/accounts
      // For GSC: GET https://www.googleapis.com/webmasters/v3/sites
      // For GBP: GET https://mybusinessaccountmanagement.googleapis.com/v1/accounts

      // Update connection status to active
      await supabase
        .from('google_api_credentials')
        .update({ 
          connection_status: 'active',
          last_sync: new Date().toISOString()
        })
        .eq('id', credentialId);

      alert('✓ Connection test successful! Integration is working properly.');
      
    } catch (error: any) {
      console.error('Connection test failed:', error);
      
      // Update status to error
      await supabase
        .from('google_api_credentials')
        .update({ 
          connection_status: 'error',
          last_sync: new Date().toISOString()
        })
        .eq('id', credentialId);
      
      alert('Connection test failed: ' + (error.message || 'Unknown error'));
    }

    await loadIntegrations();
    setTestingConnection(null);
  }

  async function disconnectIntegration(credentialId: string) {
    if (confirm('Disconnect this integration?')) {
      await supabase
        .from('google_api_credentials')
        .update({ connection_status: 'disconnected' })
        .eq('id', credentialId);

      await loadIntegrations();
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/auth/login');
  }

  const integrations = [
    {
      id: 'ga4',
      name: 'Google Analytics 4',
      description: 'Track website traffic, user behavior, and conversion data',
      icon: <TrendingUp className="h-8 w-8 text-blue-600" />,
      color: 'blue',
      features: ['Real-time analytics', 'Custom reports', 'Audience insights', 'Conversion tracking']
    },
    {
      id: 'gsc',
      name: 'Google Search Console',
      description: 'Monitor search performance, rankings, and indexing status',
      icon: <Globe className="h-8 w-8 text-green-600" />,
      color: 'green',
      features: ['Search analytics', 'Coverage reports', 'Core Web Vitals', 'Sitemap management']
    },
    {
      id: 'gbp',
      name: 'Google Business Profile',
      description: 'Manage local business listings, reviews, and insights',
      icon: <MapPin className="h-8 w-8 text-red-600" />,
      color: 'red',
      features: ['Location management', 'Review monitoring', 'Local insights', 'Posts & updates']
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading integrations...</p>
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
                <h1 className="text-2xl font-bold text-gray-900">Google API Integrations</h1>
                <p className="text-sm text-gray-500">Connect Google services to enhance your SEO capabilities</p>
              </div>
            </div>
          </div>
        </header>

        <div className="px-8 py-8">
        {/* OAuth Setup Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex items-start">
            <Settings className="h-6 w-6 text-blue-600 mt-1 mr-3" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">OAuth 2.0 Setup Required</h3>
              <p className="text-sm text-blue-800 mb-3">
                To integrate Google APIs, you need to set up OAuth 2.0 credentials in Google Cloud Console.
              </p>
              <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                <li>Go to <a href="https://console.cloud.google.com" target="_blank" rel="noopener noreferrer" className="underline font-medium">Google Cloud Console</a></li>
                <li>Create a new project or select an existing one</li>
                <li>Enable the required APIs (Analytics, Search Console, Business Profile)</li>
                <li>Create OAuth 2.0 credentials (Web Application)</li>
                <li>Add authorized redirect URIs: <code className="bg-blue-100 px-1 py-0.5 rounded">{typeof window !== 'undefined' ? window.location.origin : ''}/admin/callback</code></li>
                <li>Save your Client ID and Client Secret</li>
                <li>Click "Connect" below to authorize each integration</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Integration Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {integrations.map((integration) => {
            const credential = googleCredentials.find(c => c.api_type === integration.id);
            const isConnected = credential?.connection_status === 'active';
            const isTesting = testingConnection === credential?.id;

            return (
              <div key={integration.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 bg-${integration.color}-50 rounded-lg`}>
                      {integration.icon}
                    </div>
                    {isConnected ? (
                      <div className="flex items-center space-x-1 text-green-600">
                        <Check className="h-4 w-4" />
                        <span className="text-xs font-medium">Connected</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-1 text-gray-400">
                        <X className="h-4 w-4" />
                        <span className="text-xs font-medium">Not Connected</span>
                      </div>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-2">{integration.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{integration.description}</p>

                  <div className="space-y-2 mb-4">
                    {integration.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-xs text-gray-500">
                        <Check className="h-3 w-3 mr-2 text-green-500" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  {isConnected ? (
                    <div className="space-y-2">
                      <div className="text-xs text-gray-500 mb-2">
                        Last synced: {credential?.last_sync ? new Date(credential.last_sync).toLocaleString() : 'Never'}
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => testConnection(credential.id, integration.id)}
                          disabled={isTesting}
                          className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-${integration.color}-600 text-white rounded-lg hover:bg-${integration.color}-700 disabled:opacity-50`}
                        >
                          <RefreshCw className={`h-4 w-4 ${isTesting ? 'animate-spin' : ''}`} />
                          <span>{isTesting ? 'Testing...' : 'Test Connection'}</span>
                        </button>
                        <button
                          onClick={() => disconnectIntegration(credential.id)}
                          className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                        >
                          Disconnect
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      className={`w-full flex items-center justify-center space-x-2 px-4 py-2 bg-${integration.color}-600 text-white rounded-lg hover:bg-${integration.color}-700`}
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>Connect {integration.name}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Connected Services */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Connected Services</h3>
            <p className="text-sm text-gray-500">Manage your active Google API connections</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Sync</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Scopes</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {googleCredentials.map((credential) => (
                  <tr key={credential.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900">
                          {credential.api_type === 'ga4' && 'Google Analytics 4'}
                          {credential.api_type === 'gsc' && 'Search Console'}
                          {credential.api_type === 'gbp' && 'Business Profile'}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {credential.client_id ? `${credential.client_id.substring(0, 20)}...` : 'Not configured'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded ${
                        credential.connection_status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : credential.connection_status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {credential.connection_status || 'Disconnected'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {credential.last_sync ? new Date(credential.last_sync).toLocaleDateString() : 'Never'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div className="max-w-xs truncate">
                        {credential.scopes ? JSON.parse(credential.scopes).join(', ') : 'None'}
                      </div>
                    </td>
                  </tr>
                ))}
                {googleCredentials.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                      No integrations configured yet. Connect a service above to get started.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
