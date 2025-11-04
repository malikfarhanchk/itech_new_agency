CREATE TABLE audit_pages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL,
    page_name VARCHAR(255),
    page_url TEXT,
    page_type VARCHAR(100),
    current_content_status TEXT,
    content_action_needed TEXT,
    technical_issues TEXT,
    technical_action_needed TEXT,
    priority VARCHAR(20) DEFAULT 'medium',
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);