CREATE TABLE audit_keywords (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL,
    keyword VARCHAR(255) NOT NULL,
    monthly_search_volume INTEGER,
    competition_level VARCHAR(50),
    current_ranking INTEGER,
    target_page TEXT,
    keyword_intent VARCHAR(50),
    priority VARCHAR(20) DEFAULT 'medium',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);