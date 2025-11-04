CREATE TABLE backlink_opportunities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    opportunity_type VARCHAR(50) CHECK (opportunity_type IN ('normal',
    'local_directory')),
    site_name VARCHAR(255) NOT NULL,
    site_url TEXT,
    domain_rating INTEGER,
    category VARCHAR(100),
    outreach_status VARCHAR(50) DEFAULT 'identified',
    contact_email VARCHAR(255),
    contact_name VARCHAR(255),
    last_contact_date DATE,
    response TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);