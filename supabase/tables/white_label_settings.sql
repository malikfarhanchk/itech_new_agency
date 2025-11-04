CREATE TABLE white_label_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL,
    white_label_domain VARCHAR(255),
    agency_logo_url TEXT,
    primary_color VARCHAR(20),
    secondary_color VARCHAR(20),
    agency_name VARCHAR(255),
    contact_email VARCHAR(255),
    contact_phone VARCHAR(50),
    custom_css TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);