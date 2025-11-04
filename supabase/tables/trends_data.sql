CREATE TABLE trends_data (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID,
    keyword VARCHAR(255) NOT NULL,
    trend_date DATE NOT NULL,
    search_interest INTEGER,
    rising_related_queries JSONB,
    top_related_queries JSONB,
    geographic_interest JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);