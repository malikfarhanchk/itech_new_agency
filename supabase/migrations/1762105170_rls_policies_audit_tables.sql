-- Migration: rls_policies_audit_tables
-- Created at: 1762105170

-- Audit workspace tables: Admin-only access
CREATE POLICY "admin_all_access_audit_details" ON audit_client_details FOR ALL USING (
  auth.role() IN ('anon', 'service_role') OR
  EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role IN ('super_admin', 'admin'))
);

CREATE POLICY "admin_all_access_audit_pages" ON audit_pages FOR ALL USING (
  auth.role() IN ('anon', 'service_role') OR
  EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role IN ('super_admin', 'admin'))
);

CREATE POLICY "admin_all_access_audit_keywords" ON audit_keywords FOR ALL USING (
  auth.role() IN ('anon', 'service_role') OR
  EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role IN ('super_admin', 'admin'))
);

CREATE POLICY "admin_all_access_audit_headers" ON audit_headers_meta FOR ALL USING (
  auth.role() IN ('anon', 'service_role') OR
  EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role IN ('super_admin', 'admin'))
);

CREATE POLICY "admin_all_access_audit_competitors" ON audit_competitors FOR ALL USING (
  auth.role() IN ('anon', 'service_role') OR
  EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role IN ('super_admin', 'admin'))
);

CREATE POLICY "admin_all_access_audit_content" ON audit_content_strategy FOR ALL USING (
  auth.role() IN ('anon', 'service_role') OR
  EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role IN ('super_admin', 'admin'))
);

CREATE POLICY "admin_all_access_audit_citations" ON audit_local_citations FOR ALL USING (
  auth.role() IN ('anon', 'service_role') OR
  EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role IN ('super_admin', 'admin'))
);

CREATE POLICY "admin_all_access_audit_links" ON audit_link_building FOR ALL USING (
  auth.role() IN ('anon', 'service_role') OR
  EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role IN ('super_admin', 'admin'))
);

CREATE POLICY "admin_all_access_audit_surfer" ON audit_surfer_pages FOR ALL USING (
  auth.role() IN ('anon', 'service_role') OR
  EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role IN ('super_admin', 'admin'))
);

CREATE POLICY "admin_all_access_audit_tasks" ON audit_task_sheet FOR ALL USING (
  auth.role() IN ('anon', 'service_role') OR
  EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role IN ('super_admin', 'admin'))
);

CREATE POLICY "admin_all_access_ai_prompts" ON ai_prompts FOR ALL USING (
  auth.role() IN ('anon', 'service_role') OR
  EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role IN ('super_admin', 'admin'))
);

CREATE POLICY "admin_all_access_ai_responses" ON ai_responses FOR ALL USING (
  auth.role() IN ('anon', 'service_role') OR
  EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role IN ('super_admin', 'admin'))
);

CREATE POLICY "admin_all_access_schemas" ON schema_templates FOR ALL USING (
  auth.role() IN ('anon', 'service_role') OR
  EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role IN ('super_admin', 'admin'))
);

CREATE POLICY "admin_all_access_trends" ON trends_data FOR ALL USING (
  auth.role() IN ('anon', 'service_role') OR
  EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role IN ('super_admin', 'admin'))
);

CREATE POLICY "admin_all_access_tracking" ON lead_tracking FOR ALL USING (
  auth.role() IN ('anon', 'service_role') OR
  EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role IN ('super_admin', 'admin'))
);

CREATE POLICY "admin_all_access_backlink_opps" ON backlink_opportunities FOR ALL USING (
  auth.role() IN ('anon', 'service_role') OR
  EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role IN ('super_admin', 'admin'))
);

CREATE POLICY "admin_all_access_settings" ON system_settings FOR ALL USING (
  auth.role() IN ('anon', 'service_role') OR
  EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role IN ('super_admin', 'admin'))
);

CREATE POLICY "admin_all_access_white_label" ON white_label_settings FOR ALL USING (
  auth.role() IN ('anon', 'service_role') OR
  EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role IN ('super_admin', 'admin'))
);;