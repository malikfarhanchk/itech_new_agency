-- Row Level Security Policies

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_communication_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_performance_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE keyword_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE competitor_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE backlink_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE trends_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_client_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_keywords ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_headers_meta ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_competitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_content_strategy ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_local_citations ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_link_building ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_surfer_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_task_sheet ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE backlink_opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE financial_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE schema_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE google_api_credentials ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE uploaded_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;

-- Helper function to get user role
CREATE OR REPLACE FUNCTION get_user_role()
RETURNS TEXT AS $$
  SELECT role FROM profiles WHERE id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER;

-- Helper function to check if user is admin or super_admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
  SELECT role IN ('admin', 'super_admin') FROM profiles WHERE id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER;

-- Helper function to get client_id for current client user
CREATE OR REPLACE FUNCTION get_client_id()
RETURNS UUID AS $$
  SELECT primary_contact_user_id FROM clients WHERE primary_contact_user_id = auth.uid() LIMIT 1;
$$ LANGUAGE SQL SECURITY DEFINER;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON profiles FOR SELECT USING (id = auth.uid() OR is_admin());
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (id = auth.uid());
CREATE POLICY "Admins can view all profiles" ON profiles FOR SELECT USING (is_admin());
CREATE POLICY "Admins can update all profiles" ON profiles FOR ALL USING (is_admin());

-- Clients policies
CREATE POLICY "Admins full access to clients" ON clients FOR ALL USING (is_admin());
CREATE POLICY "Clients can view their own data" ON clients FOR SELECT USING (primary_contact_user_id = auth.uid());

-- Client goals policies
CREATE POLICY "Admins full access to goals" ON client_goals FOR ALL USING (is_admin());
CREATE POLICY "Clients can view their goals" ON client_goals FOR SELECT USING (
  client_id IN (SELECT id FROM clients WHERE primary_contact_user_id = auth.uid())
);

-- Client notes policies
CREATE POLICY "Admins full access to notes" ON client_notes FOR ALL USING (is_admin());

-- Communication log policies
CREATE POLICY "Admins full access to comm log" ON client_communication_log FOR ALL USING (is_admin());

-- SEO data policies (clients can view their own data)
CREATE POLICY "Admins full access to seo_performance" ON seo_performance_data FOR ALL USING (is_admin());
CREATE POLICY "Clients view their seo_performance" ON seo_performance_data FOR SELECT USING (
  client_id IN (SELECT id FROM clients WHERE primary_contact_user_id = auth.uid())
);

CREATE POLICY "Admins full access to keywords" ON keyword_data FOR ALL USING (is_admin());
CREATE POLICY "Clients view their keywords" ON keyword_data FOR SELECT USING (
  client_id IN (SELECT id FROM clients WHERE primary_contact_user_id = auth.uid())
);

CREATE POLICY "Admins full access to competitors" ON competitor_data FOR ALL USING (is_admin());
CREATE POLICY "Clients view their competitors" ON competitor_data FOR SELECT USING (
  client_id IN (SELECT id FROM clients WHERE primary_contact_user_id = auth.uid())
);

CREATE POLICY "Admins full access to backlinks" ON backlink_data FOR ALL USING (is_admin());
CREATE POLICY "Clients view their backlinks" ON backlink_data FOR SELECT USING (
  client_id IN (SELECT id FROM clients WHERE primary_contact_user_id = auth.uid())
);

-- Trends data (public read, admin write)
CREATE POLICY "Anyone can read trends" ON trends_data FOR SELECT USING (true);
CREATE POLICY "Admins can write trends" ON trends_data FOR ALL USING (is_admin());

-- Audit workspace policies (clients can view their audit data)
CREATE POLICY "Admins full access to audit_details" ON audit_client_details FOR ALL USING (is_admin());
CREATE POLICY "Clients view their audit_details" ON audit_client_details FOR SELECT USING (
  client_id IN (SELECT id FROM clients WHERE primary_contact_user_id = auth.uid())
);

CREATE POLICY "Admins full access to audit_pages" ON audit_pages FOR ALL USING (is_admin());
CREATE POLICY "Clients view their audit_pages" ON audit_pages FOR SELECT USING (
  client_id IN (SELECT id FROM clients WHERE primary_contact_user_id = auth.uid())
);

CREATE POLICY "Admins full access to audit_keywords" ON audit_keywords FOR ALL USING (is_admin());
CREATE POLICY "Clients view their audit_keywords" ON audit_keywords FOR SELECT USING (
  client_id IN (SELECT id FROM clients WHERE primary_contact_user_id = auth.uid())
);

CREATE POLICY "Admins full access to audit_meta" ON audit_headers_meta FOR ALL USING (is_admin());
CREATE POLICY "Clients view their audit_meta" ON audit_headers_meta FOR SELECT USING (
  client_id IN (SELECT id FROM clients WHERE primary_contact_user_id = auth.uid())
);

CREATE POLICY "Admins full access to audit_comp" ON audit_competitors FOR ALL USING (is_admin());
CREATE POLICY "Clients view their audit_comp" ON audit_competitors FOR SELECT USING (
  client_id IN (SELECT id FROM clients WHERE primary_contact_user_id = auth.uid())
);

CREATE POLICY "Admins full access to audit_content" ON audit_content_strategy FOR ALL USING (is_admin());
CREATE POLICY "Clients view their audit_content" ON audit_content_strategy FOR SELECT USING (
  client_id IN (SELECT id FROM clients WHERE primary_contact_user_id = auth.uid())
);

CREATE POLICY "Admins full access to audit_citations" ON audit_local_citations FOR ALL USING (is_admin());
CREATE POLICY "Clients view their audit_citations" ON audit_local_citations FOR SELECT USING (
  client_id IN (SELECT id FROM clients WHERE primary_contact_user_id = auth.uid())
);

CREATE POLICY "Admins full access to audit_links" ON audit_link_building FOR ALL USING (is_admin());
CREATE POLICY "Clients view their audit_links" ON audit_link_building FOR SELECT USING (
  client_id IN (SELECT id FROM clients WHERE primary_contact_user_id = auth.uid())
);

CREATE POLICY "Admins full access to audit_surfer" ON audit_surfer_pages FOR ALL USING (is_admin());
CREATE POLICY "Clients view their audit_surfer" ON audit_surfer_pages FOR SELECT USING (
  client_id IN (SELECT id FROM clients WHERE primary_contact_user_id = auth.uid())
);

CREATE POLICY "Admins full access to audit_tasks" ON audit_task_sheet FOR ALL USING (is_admin());
CREATE POLICY "Clients view their audit_tasks" ON audit_task_sheet FOR SELECT USING (
  client_id IN (SELECT id FROM clients WHERE primary_contact_user_id = auth.uid())
);

-- CRM policies (admin only)
CREATE POLICY "Admins full access to leads" ON leads FOR ALL USING (is_admin());
CREATE POLICY "Admins full access to proposals" ON proposals FOR ALL USING (is_admin());
CREATE POLICY "Admins full access to lead_tracking" ON lead_tracking FOR ALL USING (is_admin());
CREATE POLICY "Admins full access to backlink_opp" ON backlink_opportunities FOR ALL USING (is_admin());

-- Task policies
CREATE POLICY "Admins full access to tasks" ON tasks FOR ALL USING (is_admin());
CREATE POLICY "Clients view their tasks" ON tasks FOR SELECT USING (
  client_id IN (SELECT id FROM clients WHERE primary_contact_user_id = auth.uid())
);

-- Financial policies (admin only)
CREATE POLICY "Admins full access to financials" ON financial_records FOR ALL USING (is_admin());

-- Tools policies (admin only)
CREATE POLICY "Admins full access to prompts" ON ai_prompts FOR ALL USING (is_admin());
CREATE POLICY "Anyone can read schema templates" ON schema_templates FOR SELECT USING (true);
CREATE POLICY "Admins can write schema templates" ON schema_templates FOR ALL USING (is_admin());

-- Google credentials policies (admin only)
CREATE POLICY "Admins full access to google_creds" ON google_api_credentials FOR ALL USING (is_admin());

-- Chat policies (admin only)
CREATE POLICY "Admins can read all chat" ON chat_messages FOR SELECT USING (is_admin());
CREATE POLICY "Admins can send chat" ON chat_messages FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "Users can edit their own messages" ON chat_messages FOR UPDATE USING (user_id = auth.uid() AND is_admin());

-- Notification policies
CREATE POLICY "Users can view their notifications" ON notifications FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can update their notifications" ON notifications FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "System can create notifications" ON notifications FOR INSERT WITH CHECK (auth.role() IN ('anon', 'service_role'));

-- File upload policies
CREATE POLICY "Admins full access to files" ON uploaded_files FOR ALL USING (is_admin());

-- Settings policies (super admin only)
CREATE POLICY "Anyone can read settings" ON system_settings FOR SELECT USING (true);
CREATE POLICY "Super admin can modify settings" ON system_settings FOR ALL USING (
  (SELECT role FROM profiles WHERE id = auth.uid()) = 'super_admin'
);
