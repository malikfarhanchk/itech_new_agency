CREATE TABLE ai_prompts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    prompt_category VARCHAR(100) NOT NULL,
    prompt_name VARCHAR(255) NOT NULL,
    prompt_text TEXT NOT NULL,
    prompt_description TEXT,
    use_case VARCHAR(255),
    created_by UUID,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);