'use client';

import { useEffect, useState } from 'react';
import { supabase, getCurrentUser, getUserProfile } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Bell, MessageSquare, Users, DollarSign, TrendingUp, Target, FileText } from 'lucide-react';
import Sidebar from '@/components/admin/Sidebar';

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [clients, setClients] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    activeClients: 0,
    netBalance: 0,
    improvingCount: 0,
    stableCount: 0,
    declinedCount: 0
  });
  const [tasks, setTasks] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [filter, setFilter] = useState<'all' | 'local_seo' | 'ecommerce'>('all');
  const [loading, setLoading] = useState(true);
  const [liveAdminCount, setLiveAdminCount] = useState(1);

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      router.push('/auth/login');
      return;
    }

    const userProfile = await getUserProfile(currentUser.id);
    if (!userProfile || (userProfile.role !== 'admin' && userProfile.role !== 'super_admin')) {
      router.push('/auth/login');
      return;
    }

    setUser(currentUser);
    setProfile(userProfile);
    loadDashboardData();
  }

  async function loadDashboardData() {
    try {
      // Load all clients
      const { data: clientsData } = await supabase
        .from('clients')
        .select('*')
        .order('name');

      if (clientsData) {
        setClients(clientsData);
        
        // Calculate stats
        const active = clientsData.filter(c => c.status === 'active').length;
        const improving = clientsData.filter(c => c.performance_status === 'green').length;
        const stable = clientsData.filter(c => c.performance_status === 'yellow').length;
        const declining = clientsData.filter(c => c.performance_status === 'red').length;
        
        setStats(prev => ({
          ...prev,
          activeClients: active,
          improvingCount: improving,
          stableCount: stable,
          declinedCount: declining
        }));
      }

      // Load financial data
      const currentMonth = new Date();
      currentMonth.setDate(1);
      
      const { data: financialData } = await supabase
        .from('financial_records')
        .select('*')
        .eq('transaction_type', 'invoice')
        .eq('payment_status', 'paid')
        .gte('transaction_date', currentMonth.toISOString().split('T')[0]);

      if (financialData) {
        const revenue = financialData.reduce((sum, record) => sum + parseFloat(record.amount || '0'), 0);
        const netBalance = revenue * 0.75; // After 25% costs
        setStats(prev => ({
          ...prev,
          totalRevenue: revenue,
          netBalance: netBalance
        }));
      }

      // Load recent tasks
      const { data: tasksData } = await supabase
        .from('tasks')
        .select('*')
        .in('status', ['pending', 'in_progress', 'completed'])
        .order('created_at', { ascending: false })
        .limit(5);

      if (tasksData) {
        setTasks(tasksData);
      }

      // Load notifications
      const { data: notifData } = await supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (notifData) {
        setNotifications(notifData);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      setLoading(false);
    }
  }

  const filteredClients = filter === 'all' 
    ? clients 
    : clients.filter(c => c.client_type === filter);

  const unreadNotifications = notifications.filter(n => !n.is_read).length;

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/auth/login');
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
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
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-sm text-gray-500 mt-1">Welcome back, {profile?.full_name || 'Admin'}</p>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Live Admin Counter */}
                <div className="flex items-center space-x-2 px-3 py-2 bg-blue-50 rounded-lg">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">{liveAdminCount} online</span>
                </div>

                {/* Notifications */}
                <button className="relative p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                  <Bell className="w-6 h-6 text-gray-600" />
                  {unreadNotifications > 0 && (
                    <span className="absolute top-0 right-0 w-5 h-5 bg-red-600 text-white text-xs rounded-full flex items-center justify-center">
                      {unreadNotifications}
                    </span>
                  )}
                </button>

                {/* Chat */}
                <Link href="/admin/chat" className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                  <MessageSquare className="w-6 h-6 text-gray-600" />
                </Link>
              </div>
            </div>
          </div>
        </header>

        <div className="px-8 py-8">
          {/* Financial Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500">Total Monthly Revenue</h3>
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">${stats.totalRevenue.toLocaleString()}</p>
            <p className="text-sm text-green-600 mt-1">+12% from last month</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500">Total Active Clients</h3>
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.activeClients}</p>
            <p className="text-sm text-gray-600 mt-1">{clients.length} total clients</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500">Net Monthly Balance</h3>
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">${stats.netBalance.toLocaleString()}</p>
            <p className="text-sm text-gray-600 mt-1">After 25% costs</p>
          </div>
        </div>

        {/* Client Status Summary */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Health</h2>
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-700">
                Improving: <span className="font-semibold">{stats.improvingCount}</span>
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-sm text-gray-700">
                Stable: <span className="font-semibold">{stats.stableCount}</span>
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm text-gray-700">
                Declined: <span className="font-semibold">{stats.declinedCount}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Client Filters */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            All Clients ({clients.length})
          </button>
          <button
            onClick={() => setFilter('local_seo')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'local_seo'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Local SEO
          </button>
          <button
            onClick={() => setFilter('ecommerce')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'ecommerce'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            E-commerce
          </button>
        </div>

        {/* Client Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-8">
          {filteredClients.map((client) => (
            <Link
              key={client.id}
              href={`/admin/clients/${client.id}`}
              className={`p-6 rounded-lg aspect-square flex flex-col items-center justify-center text-center transition-all hover:scale-105 hover:shadow-lg cursor-pointer ${
                client.performance_status === 'green'
                  ? 'bg-green-500 text-white'
                  : client.performance_status === 'yellow'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-red-500 text-white'
              }`}
            >
              <h3 className="font-bold text-sm mb-1">{client.name}</h3>
              <p className="text-xs opacity-90">${client.monthly_budget || 0}/mo</p>
            </Link>
          ))}
          {filteredClients.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-500">
              No clients found. <Link href="/admin/clients/new" className="text-blue-600 hover:underline">Add your first client</Link>
            </div>
          )}
        </div>

        {/* Quick Actions & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Tasks */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Tasks</h2>
            <div className="space-y-3">
              {tasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900">{task.task_title}</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {task.due_date ? `Due: ${new Date(task.due_date).toLocaleDateString()}` : 'No due date'}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    task.status === 'completed' ? 'bg-green-100 text-green-800' :
                    task.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-200 text-gray-700'
                  }`}>
                    {task.status.replace('_', ' ')}
                  </span>
                </div>
              ))}
              {tasks.length === 0 && (
                <p className="text-gray-500 text-center py-4">No recent tasks</p>
              )}
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h2>
            <div className="space-y-3">
              {notifications.map((notif) => (
                <div key={notif.id} className={`p-3 rounded-lg ${notif.is_read ? 'bg-gray-50' : 'bg-blue-50 border border-blue-200'}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900">{notif.title}</h3>
                      <p className="text-xs text-gray-600 mt-1">{notif.message}</p>
                    </div>
                    {!notif.is_read && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-1"></div>
                    )}
                  </div>
                </div>
              ))}
              {notifications.length === 0 && (
                <p className="text-gray-500 text-center py-4">No notifications</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
