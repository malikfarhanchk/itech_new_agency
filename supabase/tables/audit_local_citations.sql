CREATE TABLE audit_local_citations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL,
    site_name VARCHAR(255),
    domain_rating INTEGER,
    date_submitted DATE,
    live_link TEXT,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending',
    'submitted',
    'live',
    'rejected')),
    login_credentials TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);