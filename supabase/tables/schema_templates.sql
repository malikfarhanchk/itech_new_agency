CREATE TABLE schema_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    schema_type VARCHAR(100) NOT NULL,
    schema_name VARCHAR(255) NOT NULL,
    json_ld_template TEXT NOT NULL,
    description TEXT,
    industry VARCHAR(100),
    use_case TEXT,
    created_by UUID,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);