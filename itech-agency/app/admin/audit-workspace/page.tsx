'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { supabase, getCurrentUser } from '@/lib/supabase';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Download, Upload, Plus, Trash2 } from 'lucide-react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Sidebar from '@/components/admin/Sidebar';

const TABS = [
  { id: 'client_details', label: 'Client Details', table: 'audit_client_details' },
  { id: 'pages', label: 'Pages', table: 'audit_pages' },
  { id: 'keywords', label: 'Keywords', table: 'audit_keywords' },
  { id: 'headers_meta', label: 'Headers & Meta', table: 'audit_headers_meta' },
  { id: 'competitors', label: 'Competitors', table: 'audit_competitors' },
  { id: 'content_strategy', label: 'Content Strategy', table: 'audit_content_strategy' },
  { id: 'local_citations', label: 'Local Citations', table: 'audit_local_citations' },
  { id: 'link_building', label: 'Link Building', table: 'audit_link_building' },
  { id: 'surfer_pages', label: 'Surfer Pages', table: 'audit_surfer_pages' },
  { id: 'task_sheet', label: 'Task Sheet', table: 'audit_task_sheet' }
];

export default function AuditWorkspace() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const gridRef = useRef<any>(null);
  
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [clientId, setClientId] = useState<string | null>(null);
  const [client, setClient] = useState<any>(null);
  const [rowData, setRowData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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
  }

  useEffect(() {
    const cid = searchParams.get('clientId');
    if (cid) {
      setClientId(cid);
      loadClient(cid);
    } else {
      // Show client selector
      setLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    if (clientId) {
      loadTabData();
    }
  }, [activeTab, clientId]);

  async function loadClient(id: string) {
    const { data } = await supabase
      .from('clients')
      .select('*')
      .eq('id', id)
      .maybeSingle();
    
    if (data) {
      setClient(data);
    }
  }

  async function loadTabData() {
    if (!clientId) return;
    
    setLoading(true);
    const currentTab = TABS[activeTab];
    
    const { data, error } = await supabase
      .from(currentTab.table)
      .select('*')
      .eq('client_id', clientId);

    if (error) {
      console.error('Error loading tab data:', error);
    }

    setRowData(data || []);
    setLoading(false);
  }

  async function saveData() {
    if (!clientId || !gridRef.current) return;

    setSaving(true);
    const currentTab = TABS[activeTab];
    
    // Get all data from grid
    const allRows: any[] = [];
    gridRef.current.api.forEachNode((node: any) => allRows.push(node.data));

    try {
      // Delete existing data for this client
      await supabase
        .from(currentTab.table)
        .delete()
        .eq('client_id', clientId);

      // Insert new data
      if (allRows.length > 0) {
        const dataToInsert = allRows.map(row => ({
          ...row,
          client_id: clientId,
          id: row.id || undefined // Remove id for new rows
        }));

        const { error } = await supabase
          .from(currentTab.table)
          .insert(dataToInsert);

        if (error) {
          console.error('Error saving data:', error);
          alert('Error saving data: ' + error.message);
        } else {
          alert('Data saved successfully!');
          loadTabData(); // Reload to get IDs
        }
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error saving data');
    }

    setSaving(false);
  }

  function addRow() {
    if (!gridRef.current) return;
    
    const newRow: any = { client_id: clientId };
    gridRef.current.api.applyTransaction({ add: [newRow] });
  }

  function deleteSelectedRows() {
    if (!gridRef.current) return;
    
    const selectedRows = gridRef.current.api.getSelectedRows();
    if (selectedRows.length === 0) {
      alert('Please select rows to delete');
      return;
    }
    
    if (confirm(`Delete ${selectedRows.length} row(s)?`)) {
      gridRef.current.api.applyTransaction({ remove: selectedRows });
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/auth/login');
  }

  // Column definitions for each tab
  const getColumnDefs = () => {
    switch (activeTab) {
      case 0: // Client Details
        return [
          { field: 'business_name', headerName: 'Business Name', editable: true, minWidth: 200 },
          { field: 'contact_person', headerName: 'Contact Person', editable: true, minWidth: 150 },
          { field: 'address', headerName: 'Address', editable: true, minWidth: 200 },
          { field: 'city', headerName: 'City', editable: true, minWidth: 120 },
          { field: 'phone', headerName: 'Phone', editable: true, minWidth: 120 },
          { field: 'email', headerName: 'Email', editable: true, minWidth: 180 },
          { field: 'website_url', headerName: 'Website', editable: true, minWidth: 180 },
          { field: 'unique_selling_proposition', headerName: 'USP', editable: true, minWidth: 250 },
        ];

      case 1: // Pages
        return [
          { field: 'page_name', headerName: 'Page Name', editable: true, minWidth: 150, checkboxSelection: true },
          { field: 'page_url', headerName: 'URL', editable: true, minWidth: 200 },
          { field: 'page_type', headerName: 'Type', editable: true, minWidth: 120 },
          { field: 'current_content_status', headerName: 'Content Status', editable: true, minWidth: 150 },
          { field: 'content_action_needed', headerName: 'Content Action', editable: true, minWidth: 200 },
          { field: 'technical_issues', headerName: 'Technical Issues', editable: true, minWidth: 200 },
          { field: 'technical_action_needed', headerName: 'Technical Action', editable: true, minWidth: 200 },
          { field: 'priority', headerName: 'Priority', editable: true, minWidth: 100 },
          { field: 'status', headerName: 'Status', editable: true, minWidth: 100 },
        ];

      case 2: // Keywords
        return [
          { field: 'keyword', headerName: 'Keyword', editable: true, minWidth: 200, checkboxSelection: true },
          { field: 'monthly_search_volume', headerName: 'Search Volume', editable: true, minWidth: 130, type: 'numericColumn' },
          { field: 'competition_level', headerName: 'Competition', editable: true, minWidth: 120 },
          { field: 'current_ranking', headerName: 'Current Rank', editable: true, minWidth: 120, type: 'numericColumn' },
          { field: 'target_page', headerName: 'Target Page', editable: true, minWidth: 180 },
          { field: 'keyword_intent', headerName: 'Intent', editable: true, minWidth: 120 },
          { field: 'priority', headerName: 'Priority', editable: true, minWidth: 100 },
        ];

      case 3: // Headers & Meta
        return [
          { field: 'page_name', headerName: 'Page Name', editable: true, minWidth: 150, checkboxSelection: true },
          { field: 'page_url', headerName: 'URL', editable: true, minWidth: 200 },
          { field: 'current_title', headerName: 'Current Title', editable: true, minWidth: 250 },
          { field: 'new_title', headerName: 'New Title', editable: true, minWidth: 250 },
          { field: 'current_description', headerName: 'Current Description', editable: true, minWidth: 300 },
          { field: 'new_description', headerName: 'New Description', editable: true, minWidth: 300 },
          { field: 'current_h1', headerName: 'Current H1', editable: true, minWidth: 200 },
          { field: 'new_h1', headerName: 'New H1', editable: true, minWidth: 200 },
          { field: 'status', headerName: 'Status', editable: true, minWidth: 100 },
        ];

      case 4: // Competitors
        return [
          { field: 'competitor_name', headerName: 'Competitor', editable: true, minWidth: 180, checkboxSelection: true },
          { field: 'competitor_url', headerName: 'URL', editable: true, minWidth: 200 },
          { field: 'domain_authority', headerName: 'DA', editable: true, minWidth: 80, type: 'numericColumn' },
          { field: 'organic_traffic_estimate', headerName: 'Traffic Est.', editable: true, minWidth: 120, type: 'numericColumn' },
          { field: 'strengths', headerName: 'Strengths', editable: true, minWidth: 250 },
          { field: 'weaknesses', headerName: 'Weaknesses', editable: true, minWidth: 250 },
          { field: 'keywords_they_rank_for', headerName: 'Their Keywords', editable: true, minWidth: 250 },
          { field: 'content_strategy_notes', headerName: 'Content Notes', editable: true, minWidth: 250 },
        ];

      case 5: // Content Strategy
        return [
          { field: 'page_name', headerName: 'Page Name', editable: true, minWidth: 150, checkboxSelection: true },
          { field: 'content_type', headerName: 'Content Type', editable: true, minWidth: 130 },
          { field: 'target_keyword', headerName: 'Target Keyword', editable: true, minWidth: 180 },
          { field: 'word_count_needed', headerName: 'Words Needed', editable: true, minWidth: 120, type: 'numericColumn' },
          { field: 'current_word_count', headerName: 'Current Words', editable: true, minWidth: 120, type: 'numericColumn' },
          { field: 'content_outline', headerName: 'Outline', editable: true, minWidth: 300 },
          { field: 'writer_assigned', headerName: 'Writer', editable: true, minWidth: 130 },
          { field: 'deadline', headerName: 'Deadline', editable: true, minWidth: 120 },
          { field: 'status', headerName: 'Status', editable: true, minWidth: 100 },
        ];

      case 6: // Local Citations
        return [
          { field: 'site_name', headerName: 'Site Name', editable: true, minWidth: 180, checkboxSelection: true },
          { field: 'domain_rating', headerName: 'DR', editable: true, minWidth: 80, type: 'numericColumn' },
          { field: 'date_submitted', headerName: 'Date Submitted', editable: true, minWidth: 130 },
          { field: 'live_link', headerName: 'Live Link', editable: true, minWidth: 250 },
          { field: 'status', headerName: 'Status', editable: true, minWidth: 120 },
          { field: 'login_credentials', headerName: 'Credentials', editable: true, minWidth: 180 },
          { field: 'notes', headerName: 'Notes', editable: true, minWidth: 250 },
        ];

      case 7: // Link Building
        return [
          { field: 'target_page', headerName: 'Target Page', editable: true, minWidth: 200, checkboxSelection: true },
          { field: 'competitor_page', headerName: 'Competitor Page', editable: true, minWidth: 200 },
          { field: 'links_needed', headerName: 'Links Needed', editable: true, minWidth: 120, type: 'numericColumn' },
          { field: 'links_acquired', headerName: 'Links Acquired', editable: true, minWidth: 130, type: 'numericColumn' },
          { field: 'outreach_status', headerName: 'Outreach Status', editable: true, minWidth: 150 },
          { field: 'contact_email', headerName: 'Contact Email', editable: true, minWidth: 180 },
          { field: 'last_contact_date', headerName: 'Last Contact', editable: true, minWidth: 130 },
          { field: 'status', headerName: 'Status', editable: true, minWidth: 100 },
          { field: 'notes', headerName: 'Notes', editable: true, minWidth: 250 },
        ];

      case 8: // Surfer Pages
        return [
          { field: 'page_name', headerName: 'Page Name', editable: true, minWidth: 150, checkboxSelection: true },
          { field: 'page_url', headerName: 'URL', editable: true, minWidth: 200 },
          { field: 'target_keyword', headerName: 'Target Keyword', editable: true, minWidth: 180 },
          { field: 'ranking_before', headerName: 'Rank Before', editable: true, minWidth: 110, type: 'numericColumn' },
          { field: 'ranking_after', headerName: 'Rank After', editable: true, minWidth: 110, type: 'numericColumn' },
          { field: 'surfer_score_before', headerName: 'Score Before', editable: true, minWidth: 120, type: 'numericColumn' },
          { field: 'surfer_score_after', headerName: 'Score After', editable: true, minWidth: 120, type: 'numericColumn' },
          { field: 'optimization_date', headerName: 'Opt. Date', editable: true, minWidth: 130 },
          { field: 'traffic_before', headerName: 'Traffic Before', editable: true, minWidth: 130, type: 'numericColumn' },
          { field: 'traffic_after', headerName: 'Traffic After', editable: true, minWidth: 130, type: 'numericColumn' },
        ];

      case 9: // Task Sheet
        return [
          { field: 'task_name', headerName: 'Task', editable: true, minWidth: 200, checkboxSelection: true },
          { field: 'task_category', headerName: 'Category', editable: true, minWidth: 130 },
          { field: 'due_date', headerName: 'Due Date', editable: true, minWidth: 120 },
          { field: 'priority', headerName: 'Priority', editable: true, minWidth: 100 },
          { field: 'status', headerName: 'Status', editable: true, minWidth: 120 },
          { field: 'notes', headerName: 'Notes', editable: true, minWidth: 300 },
          { field: 'completion_date', headerName: 'Completed', editable: true, minWidth: 120 },
        ];

      default:
        return [];
    }
  };

  if (!clientId) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar userEmail={user?.email} onLogout={handleLogout} />
        <div className="flex-1 ml-64 p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Select a Client for Audit Workspace</h1>
            <ClientSelector onSelect={(id) => router.push(`/admin/audit-workspace?clientId=${id}`)} />
          </div>
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
              <div className="flex items-center space-x-4">
                <Link href="/admin/dashboard" className="p-2 hover:bg-gray-100 rounded-lg">
                  <ArrowLeft className="h-5 w-5 text-gray-600" />
                </Link>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Audit Workspace</h1>
                  <p className="text-sm text-gray-500">{client?.name || 'Loading...'}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
              <button
                onClick={addRow}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Plus className="h-4 w-4" />
                <span>Add Row</span>
              </button>
              <button
                onClick={deleteSelectedRows}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                <Trash2 className="h-4 w-4" />
                <span>Delete</span>
              </button>
              <button
                onClick={saveData}
                disabled={saving}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                <Save className="h-4 w-4" />
                <span>{saving ? 'Saving...' : 'Save'}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-full mx-auto px-4 overflow-x-auto">
          <div className="flex space-x-1">
            {TABS.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(index)}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === index
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="p-4">
        <div className="ag-theme-alpine" style={{ height: 'calc(100vh - 220px)', width: '100%' }}>
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <AgGridReact
              ref={gridRef}
              rowData={rowData}
              columnDefs={getColumnDefs()}
              defaultColDef={{
                sortable: true,
                filter: true,
                resizable: true,
                minWidth: 100,
              }}
              rowSelection="multiple"
              suppressRowClickSelection={true}
              animateRows={true}
              pagination={true}
              paginationPageSize={50}
            />
          )}
        </div>
      </div>
      </div>
    </div>
  );
}

function ClientSelector({ onSelect }: { onSelect: (id: string) => void }) {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadClients();
  }, []);

  async function loadClients() {
    const { data } = await supabase
      .from('clients')
      .select('*')
      .order('name');
    
    if (data) {
      setClients(data);
    }
    setLoading(false);
  }

  if (loading) {
    return <div className="text-center py-12">Loading clients...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {clients.map(client => (
        <button
          key={client.id}
          onClick={() => onSelect(client.id)}
          className="p-6 bg-white rounded-lg shadow-sm border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all text-left"
        >
          <h3 className="font-semibold text-lg text-gray-900">{client.name}</h3>
          <p className="text-sm text-gray-500 mt-1">{client.website_url}</p>
          <span className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-medium ${
            client.performance_status === 'green' ? 'bg-green-100 text-green-800' :
            client.performance_status === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {client.performance_status}
          </span>
        </button>
      ))}
    </div>
  );
}
