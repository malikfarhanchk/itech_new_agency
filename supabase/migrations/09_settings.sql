-- Batch 9: Settings & Configuration

-- system_settings table
CREATE TABLE IF NOT EXISTS system_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    setting_key TEXT UNIQUE NOT NULL,
    setting_value JSONB DEFAULT '{}',
    updated_by UUID,
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_settings_key ON system_settings(setting_key);

-- Insert default white-labeling settings
INSERT INTO system_settings (setting_key, setting_value) VALUES
('agency_logo_url', '""'),
('agency_primary_color', '"#3B82F6"'),
('agency_name', '"iTech Digital Agency"'),
('custom_domain', '""')
ON CONFLICT (setting_key) DO NOTHING;
