CREATE TABLE ai_responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID,
    prompt_id UUID,
    input_data TEXT,
    ai_response TEXT,
    response_type VARCHAR(100),
    tokens_used INTEGER,
    cost DECIMAL(10,4),
    execution_time_ms INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);