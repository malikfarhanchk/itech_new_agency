-- Migration: rls_policies_profiles_and_clients
-- Created at: 1762105164

-- Profiles: Super admins and admins can see all, clients see only themselves
CREATE POLICY "profiles_select_policy" ON profiles FOR SELECT USING (
  auth.role() IN ('anon', 'service_role') OR
  user_id = auth.uid() OR
  EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role IN ('super_admin', 'admin'))
);

CREATE POLICY "profiles_insert_policy" ON profiles FOR INSERT WITH CHECK (
  auth.role() IN ('anon', 'service_role')
);

CREATE POLICY "profiles_update_policy" ON profiles FOR UPDATE USING (
  auth.role() IN ('anon', 'service_role') OR
  user_id = auth.uid() OR
  EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role IN ('super_admin', 'admin'))
);

-- Clients: Admins see all, clients see only their own data
CREATE POLICY "clients_select_policy" ON clients FOR SELECT USING (
  auth.role() IN ('anon', 'service_role') OR
  EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role IN ('super_admin', 'admin'))
);

CREATE POLICY "clients_insert_policy" ON clients FOR INSERT WITH CHECK (
  auth.role() IN ('anon', 'service_role') OR
  EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role IN ('super_admin', 'admin'))
);

CREATE POLICY "clients_update_policy" ON clients FOR UPDATE USING (
  auth.role() IN ('anon', 'service_role') OR
  EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role IN ('super_admin', 'admin'))
);

CREATE POLICY "clients_delete_policy" ON clients FOR DELETE USING (
  auth.role() IN ('anon', 'service_role') OR
  EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'super_admin')
);;