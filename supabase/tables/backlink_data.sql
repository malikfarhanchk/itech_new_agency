CREATE TABLE backlink_data (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL,
    source_url TEXT,
    target_url TEXT,
    anchor_text VARCHAR(255),
    domain_authority DECIMAL(5,2),
    link_type VARCHAR(50),
    status VARCHAR(50) DEFAULT 'active',
    discovered_date DATE,
    last_checked_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);