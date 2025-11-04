CREATE TABLE seo_performance_data (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL,
    date DATE NOT NULL,
    organic_traffic INTEGER DEFAULT 0,
    keyword_rankings_improved INTEGER DEFAULT 0,
    keyword_rankings_declined INTEGER DEFAULT 0,
    total_keywords INTEGER DEFAULT 0,
    average_position DECIMAL(5,2),
    backlinks_total INTEGER DEFAULT 0,
    domain_authority DECIMAL(5,2),
    page_authority DECIMAL(5,2),
    bounce_rate DECIMAL(5,2),
    avg_session_duration INTEGER,
    pages_per_session DECIMAL(5,2),
    conversions INTEGER DEFAULT 0,
    revenue DECIMAL(10,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);