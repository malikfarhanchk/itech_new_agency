'use client';

import { useEffect, useState } from 'react';
import { supabase, getCurrentUser } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { TrendingUp, Users, Target, BarChart3, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function ClientPortal() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [client, setClient] = useState<any>(null);
  const [seoData, setSeoData] = useState<any[]>([]);
  const [keywords, setKeywords] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [whiteLabel, setWhiteLabel] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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
    loadClientData(currentUser.id);
  }

  async function loadClientData(userId: string) {
    try {
      // Get user's client profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (!profile) {
        router.push('/auth/login');
        return;
      }

      // Find associated client
      const { data: clientData } = await supabase
        .from('clients')
        .select('*')
        .eq('email', profile.email)
        .maybeSingle();

      if (clientData) {
        setClient(clientData);

        // Load white-label settings
        const { data: wlSettings } = await supabase
          .from('white_label_settings')
          .select('*')
          .eq('client_id', clientData.id)
          .maybeSingle();

        setWhiteLabel(wlSettings);

        // Load SEO data
        const { data: seoPerf } = await supabase
          .from('seo_performance_data')
          .select('*')
          .eq('client_id', clientData.id)
          .order('date', { ascending: true })
          .limit(30);

        if (seoPerf) {
          setSeoData(seoPerf);
        }

        // Load keywords
        const { data: keywordData } = await supabase
          .from('keyword_data')
          .select('*')
          .eq('client_id', clientData.id)
          .order('search_volume', { ascending: false })
          .limit(10);

        if (keywordData) {
          setKeywords(keywordData);
        }

        // Load tasks
        const { data: taskData } = await supabase
          .from('tasks')
          .select('*')
          .eq('client_id', clientData.id)
          .in('status', ['pending', 'in_progress'])
          .order('created_at', { ascending: false });

        if (taskData) {
          setTasks(taskData);
        }
      }

      setLoading(false);
    } catch (error) {
      console.error('Error loading client data:', error);
      setLoading(false);
    }
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push('/auth/login');
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const agencyName = whiteLabel?.agency_name || 'iTech Digital Agency';
  const primaryColor = whiteLabel?.primary_color || '#3b82f6';
  const logoUrl = whiteLabel?.agency_logo_url;

  const latestSeoData = seoData[seoData.length - 1];
  const trafficChange = seoData.length >= 2
    ? ((latestSeoData?.organic_traffic || 0) - (seoData[seoData.length - 2]?.organic_traffic || 0))
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b" style={{ borderColor: primaryColor }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              {logoUrl ? (
                <img src={logoUrl} alt={agencyName} className="h-10" />
              ) : (
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: primaryColor }}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              )}
              <div>
                <h1 className="text-xl font-bold text-gray-900">{agencyName}</h1>
                <p className="text-sm text-gray-500">Client Portal</p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Welcome back!</h2>
          <p className="text-gray-600">{client?.name || 'Client'} - Performance Dashboard</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Organic Traffic</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {(latestSeoData?.organic_traffic || 0).toLocaleString()}
                </p>
                <p className={`text-sm mt-1 ${trafficChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {trafficChange >= 0 ? '+' : ''}{trafficChange} this week
                </p>
              </div>
              <div className="p-3 rounded-full" style={{ backgroundColor: `${primaryColor}20` }}>
                <Users className="h-6 w-6" style={{ color: primaryColor }} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Keywords Ranking</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{keywords.length}</p>
                <p className="text-sm text-gray-500 mt-1">Top keywords</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Target className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Status</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {client?.performance_status === 'green' ? 'Excellent' :
                   client?.performance_status === 'yellow' ? 'Good' : 'Needs Attention'}
                </p>
                <p className="text-sm text-gray-500 mt-1">Overall health</p>
              </div>
              <div className={`p-3 rounded-full ${
                client?.performance_status === 'green' ? 'bg-green-100' :
                client?.performance_status === 'yellow' ? 'bg-yellow-100' : 'bg-red-100'
              }`}>
                <TrendingUp className={`h-6 w-6 ${
                  client?.performance_status === 'green' ? 'text-green-600' :
                  client?.performance_status === 'yellow' ? 'text-yellow-600' : 'text-red-600'
                }`} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Tasks</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{tasks.length}</p>
                <p className="text-sm text-gray-500 mt-1">In progress</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Traffic Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6 border mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Traffic Trend (Last 30 Days)</h3>
          {seoData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={seoData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="organic_traffic" stroke={primaryColor} strokeWidth={2} name="Organic Traffic" />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 text-center py-12">No traffic data available yet</p>
          )}
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Keywords */}
          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Top Performing Keywords</h3>
            <div className="space-y-3">
              {keywords.map((keyword, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{keyword.keyword}</p>
                    <p className="text-xs text-gray-500">Search Volume: {keyword.search_volume?.toLocaleString() || 0}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold" style={{ color: primaryColor }}>
                      #{keyword.current_position || 'N/A'}
                    </p>
                    <p className="text-xs text-gray-500">Position</p>
                  </div>
                </div>
              ))}
              {keywords.length === 0 && (
                <p className="text-gray-500 text-center py-8">No keywords data available yet</p>
              )}
            </div>
          </div>

          {/* Current Tasks */}
          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Current Tasks</h3>
            <div className="space-y-3">
              {tasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{task.task_title}</p>
                    <p className="text-xs text-gray-500">
                      {task.due_date ? `Due: ${new Date(task.due_date).toLocaleDateString()}` : 'No due date'}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    task.status === 'in_progress' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {task.status.replace('_', ' ')}
                  </span>
                </div>
              ))}
              {tasks.length === 0 && (
                <p className="text-gray-500 text-center py-8">No active tasks at the moment</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
