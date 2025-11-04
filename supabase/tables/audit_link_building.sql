CREATE TABLE audit_link_building (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL,
    target_page TEXT,
    competitor_page TEXT,
    links_needed INTEGER,
    links_acquired INTEGER,
    outreach_status VARCHAR(50),
    contact_email VARCHAR(255),
    last_contact_date DATE,
    status VARCHAR(50) DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);