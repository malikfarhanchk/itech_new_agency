CREATE TABLE keyword_data (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL,
    keyword VARCHAR(255) NOT NULL,
    search_volume INTEGER,
    current_position INTEGER,
    previous_position INTEGER,
    url TEXT,
    difficulty INTEGER,
    cpc DECIMAL(10,2),
    monthly_searches INTEGER,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);