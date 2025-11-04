CREATE TABLE audit_surfer_pages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL,
    page_name VARCHAR(255),
    page_url TEXT,
    target_keyword VARCHAR(255),
    ranking_before INTEGER,
    ranking_after INTEGER,
    surfer_score_before INTEGER,
    surfer_score_after INTEGER,
    optimization_date DATE,
    traffic_before INTEGER,
    traffic_after INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);