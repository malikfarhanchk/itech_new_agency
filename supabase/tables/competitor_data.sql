CREATE TABLE competitor_data (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL,
    competitor_name VARCHAR(255),
    competitor_url TEXT,
    domain_authority DECIMAL(5,2),
    organic_traffic INTEGER,
    total_keywords INTEGER,
    common_keywords INTEGER,
    keyword_gaps INTEGER,
    backlinks INTEGER,
    content_score DECIMAL(5,2),
    analysis_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);