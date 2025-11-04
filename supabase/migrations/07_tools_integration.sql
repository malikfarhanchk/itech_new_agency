-- Batch 7: Internal Tools & Integration

-- ai_prompts table
CREATE TABLE IF NOT EXISTS ai_prompts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    prompt_text TEXT NOT NULL,
    category TEXT,
    use_case TEXT,
    created_by UUID,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_prompts_category ON ai_prompts(category);
CREATE INDEX idx_prompts_created ON ai_prompts(created_at DESC);

-- schema_templates table
CREATE TABLE IF NOT EXISTS schema_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    schema_type TEXT NOT NULL,
    template JSONB NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_schema_type ON schema_templates(schema_type);

-- google_api_credentials table
CREATE TABLE IF NOT EXISTS google_api_credentials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL,
    service TEXT NOT NULL,
    access_token TEXT,
    refresh_token TEXT,
    expires_at TIMESTAMP,
    property_id TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_google_creds_client ON google_api_credentials(client_id);
CREATE INDEX idx_google_creds_service ON google_api_credentials(service);
CREATE UNIQUE INDEX idx_google_creds_unique ON google_api_credentials(client_id, service);
