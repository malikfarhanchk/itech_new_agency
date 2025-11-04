'use client';

import { useEffect, useState } from 'react';
import { supabase, getCurrentUser } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Plus, DollarSign, TrendingUp, Users, FileText, Mail, Phone, Calendar } from 'lucide-react';
import Sidebar from '@/components/admin/Sidebar';

const PIPELINE_STAGES = [
  { id: 'initial_contact', label: 'Initial Contact', color: 'bg-gray-100 border-gray-300' },
  { id: 'proposal_sent', label: 'Proposal Sent', color: 'bg-blue-100 border-blue-300' },
  { id: 'negotiation', label: 'Negotiation', color: 'bg-yellow-100 border-yellow-300' },
  { id: 'won', label: 'Won', color: 'bg-green-100 border-green-300' },
  { id: 'lost', label: 'Lost', color: 'bg-red-100 border-red-300' },
];

export default function CRMPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [leads, setLeads] = useState<any[]>([]);
  const [proposals, setProposals] = useState<any[]>([]);
  const [backlinkOpps, setBacklinkOpps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState<'kanban' | 'proposals' | 'backlinks'>('kanban');
  const [draggedLead, setDraggedLead] = useState<any>(null);

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
    loadCRMData();
  }

  async function loadCRMData() {
    setLoading(true);

    // Load leads
    const { data: leadsData } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (leadsData) {
      setLeads(leadsData);
    }

    // Load proposals
    const { data: proposalsData } = await supabase
      .from('proposals')
      .select('*')
      .order('created_at', { ascending: false });

    if (proposalsData) {
      setProposals(proposalsData);
    }

    // Load backlink opportunities
    const { data: backlinksData } = await supabase
      .from('backlink_opportunities')
      .select('*')
      .order('created_at', { ascending: false });

    if (backlinksData) {
      setBacklinkOpps(backlinksData);
    }

    setLoading(false);
  }

  async function updateLeadStatus(leadId: string, newStatus: string) {
    const { error } = await supabase
      .from('leads')
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq('id', leadId);

    if (!error) {
      loadCRMData();
    }
  }

  function handleDragStart(lead: any) {
    setDraggedLead(lead);
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
  }

  function handleDrop(e: React.DragEvent, newStatus: string) {
    e.preventDefault();
    if (draggedLead && draggedLead.status !== newStatus) {
      updateLeadStatus(draggedLead.id, newStatus);
    }
    setDraggedLead(null);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/auth/login');
  }

  const getLeadsByStage = (stage: string) => {
    return leads.filter(lead => lead.status === stage);
  };

  const totalLeadValue = leads.reduce((sum, lead) => sum + (parseFloat(lead.estimated_value) || 0), 0);
  const wonDeals = leads.filter(l => l.status === 'won').length;
  const activeLeads = leads.filter(l => !['won', 'lost'].includes(l.status)).length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading CRM data...</p>
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
                <h1 className="text-2xl font-bold text-gray-900">CRM & Leads Management</h1>
                <p className="text-sm text-gray-500">Manage your sales pipeline and opportunities</p>
              </div>
              <Link
                href="/admin/crm/new-lead"
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Plus className="h-4 w-4" />
                <span>New Lead</span>
              </Link>
            </div>
          </div>
        </header>

        <div className="px-8 py-8">
          {/* Navigation Tabs */}
          <div className="flex space-x-2 mb-6">
            onClick={() => setActiveView('kanban')}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeView === 'kanban' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Kanban Board
          </button>
          <button
            onClick={() => setActiveView('proposals')}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeView === 'proposals' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Proposals ({proposals.length})
          </button>
          <button
            onClick={() => setActiveView('backlinks')}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeView === 'backlinks' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Backlink Opportunities ({backlinkOpps.length})
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Pipeline Value</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">${totalLeadValue.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Leads</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{activeLeads}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Won Deals</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{wonDeals}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Proposals</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{proposals.length}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <FileText className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Content Views */}
        {activeView === 'kanban' && (
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {PIPELINE_STAGES.map(stage => (
              <div
                key={stage.id}
                className="flex-shrink-0 w-80"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, stage.id)}
              >
                <div className={`rounded-lg border-2 ${stage.color} p-4`}>
                  <h3 className="font-semibold text-gray-900 mb-4">
                    {stage.label}
                    <span className="ml-2 text-sm text-gray-600">({getLeadsByStage(stage.id).length})</span>
                  </h3>
                  <div className="space-y-3">
                    {getLeadsByStage(stage.id).map(lead => (
                      <div
                        key={lead.id}
                        draggable
                        onDragStart={() => handleDragStart(lead)}
                        className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 cursor-move hover:shadow-md transition-shadow"
                      >
                        <h4 className="font-medium text-gray-900">{lead.company_name || lead.contact_name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{lead.contact_name}</p>
                        
                        <div className="mt-3 space-y-2">
                          {lead.email && (
                            <div className="flex items-center text-xs text-gray-500">
                              <Mail className="h-3 w-3 mr-2" />
                              {lead.email}
                            </div>
                          )}
                          {lead.phone && (
                            <div className="flex items-center text-xs text-gray-500">
                              <Phone className="h-3 w-3 mr-2" />
                              {lead.phone}
                            </div>
                          )}
                          {lead.estimated_value && (
                            <div className="flex items-center text-xs text-gray-500">
                              <DollarSign className="h-3 w-3 mr-2" />
                              ${parseFloat(lead.estimated_value).toLocaleString()}
                            </div>
                          )}
                          {lead.next_followup_date && (
                            <div className="flex items-center text-xs text-gray-500">
                              <Calendar className="h-3 w-3 mr-2" />
                              Follow up: {new Date(lead.next_followup_date).toLocaleDateString()}
                            </div>
                          )}
                        </div>

                        {lead.service_interest && (
                          <div className="mt-3">
                            <span className="inline-block px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                              {lead.service_interest}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                    {getLeadsByStage(stage.id).length === 0 && (
                      <p className="text-sm text-gray-400 text-center py-8">No leads in this stage</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeView === 'proposals' && (
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Proposal</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Monthly Fee</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sent Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {proposals.map(proposal => (
                    <tr key={proposal.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{proposal.proposal_title}</div>
                        <div className="text-sm text-gray-500">{proposal.proposal_type}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Client ID: {proposal.client_id || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${proposal.monthly_fee || 0}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          proposal.proposal_status === 'accepted' ? 'bg-green-100 text-green-800' :
                          proposal.proposal_status === 'sent' ? 'bg-blue-100 text-blue-800' :
                          proposal.proposal_status === 'rejected' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {proposal.proposal_status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {proposal.sent_date ? new Date(proposal.sent_date).toLocaleDateString() : 'Not sent'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button className="text-blue-600 hover:text-blue-900">View</button>
                      </td>
                    </tr>
                  ))}
                  {proposals.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                        No proposals yet. Create your first proposal.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeView === 'backlinks' && (
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Backlink Opportunities Database</h3>
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                  <Plus className="h-4 w-4" />
                  <span>Add Opportunity</span>
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Site Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">URL</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">DR</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Contact</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {backlinkOpps.map(opp => (
                    <tr key={opp.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          opp.opportunity_type === 'local_directory' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {opp.opportunity_type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {opp.site_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:underline">
                        <a href={opp.site_url} target="_blank" rel="noopener noreferrer">
                          {opp.site_url?.substring(0, 30)}...
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {opp.domain_rating || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {opp.contact_email || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          opp.status === 'completed' ? 'bg-green-100 text-green-800' :
                          opp.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {opp.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {opp.last_contact_date ? new Date(opp.last_contact_date).toLocaleDateString() : 'Never'}
                      </td>
                    </tr>
                  ))}
                  {backlinkOpps.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                        No backlink opportunities yet. Start building your database.
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
