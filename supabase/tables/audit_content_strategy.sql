CREATE TABLE audit_content_strategy (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL,
    page_name VARCHAR(255),
    content_type VARCHAR(100),
    target_keyword VARCHAR(255),
    word_count_needed INTEGER,
    current_word_count INTEGER,
    content_outline TEXT,
    writer_assigned VARCHAR(255),
    deadline DATE,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);