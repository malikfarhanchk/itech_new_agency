CREATE TABLE audit_competitors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL,
    competitor_name VARCHAR(255),
    competitor_url TEXT,
    strengths TEXT,
    weaknesses TEXT,
    keywords_they_rank_for TEXT,
    backlink_profile_notes TEXT,
    content_strategy_notes TEXT,
    domain_authority DECIMAL(5,2),
    organic_traffic_estimate INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);