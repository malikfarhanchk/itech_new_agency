-- Migration: rls_policies_all_data_tables
-- Created at: 1762105167

-- Generic policy for all data tables: Admins have full access
CREATE POLICY "admin_all_access_client_goals" ON client_goals FOR ALL USING (
  auth.role() IN ('anon', 'service_role') OR
  EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role IN ('super_admin', 'admin'))
);

CREATE POLICY "admin_all_access_client_notes" ON client_notes FOR ALL USING (
  auth.role() IN ('anon', 'service_role') OR
  EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role IN ('super_admin', 'admin'))
);

CREATE POLICY "admin_all_access_communications" ON client_communication_log FOR ALL USING (
  auth.role() IN ('anon', 'service_role') OR
  EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role IN ('super_admin', 'admin'))
);

CREATE POLICY "admin_all_access_seo_data" ON seo_performance_data FOR ALL USING (
  auth.role() IN ('anon', 'service_role') OR
  EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role IN ('super_admin', 'admin'))
);

CREATE POLICY "admin_all_access_keywords" ON keyword_data FOR ALL USING (
  auth.role() IN ('anon', 'service_role') OR
  EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role IN ('super_admin', 'admin'))
);

CREATE POLICY "admin_all_access_competitors" ON competitor_data FOR ALL USING (
  auth.role() IN ('anon', 'service_role') OR
  EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role IN ('super_admin', 'admin'))
);

CREATE POLICY "admin_all_access_backlinks" ON backlink_data FOR ALL USING (
  auth.role() IN ('anon', 'service_role') OR
  EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role IN ('super_admin', 'admin'))
);

CREATE POLICY "admin_all_access_google_api" ON google_api_credentials FOR ALL USING (
  auth.role() IN ('anon', 'service_role') OR
  EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role IN ('super_admin', 'admin'))
);

CREATE POLICY "admin_all_access_leads" ON leads FOR ALL USING (
  auth.role() IN ('anon', 'service_role') OR
  EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role IN ('super_admin', 'admin'))
);

CREATE POLICY "admin_all_access_proposals" ON proposals FOR ALL USING (
  auth.role() IN ('anon', 'service_role') OR
  EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role IN ('super_admin', 'admin'))
);

CREATE POLICY "admin_all_access_tasks" ON tasks FOR ALL USING (
  auth.role() IN ('anon', 'service_role') OR
  EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role IN ('super_admin', 'admin'))
);

CREATE POLICY "admin_all_access_financials" ON financial_records FOR ALL USING (
  auth.role() IN ('anon', 'service_role') OR
  EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role IN ('super_admin', 'admin'))
);

CREATE POLICY "admin_all_access_chat" ON chat_messages FOR ALL USING (
  auth.role() IN ('anon', 'service_role') OR
  EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role IN ('super_admin', 'admin'))
);

CREATE POLICY "admin_all_access_notifications" ON notifications FOR ALL USING (
  auth.role() IN ('anon', 'service_role') OR
  user_id = auth.uid()
);

CREATE POLICY "admin_all_access_files" ON uploaded_files FOR ALL USING (
  auth.role() IN ('anon', 'service_role') OR
  EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role IN ('super_admin', 'admin'))
);;