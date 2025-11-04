CREATE TABLE audit_headers_meta (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL,
    page_name VARCHAR(255),
    page_url TEXT,
    current_title VARCHAR(255),
    current_description TEXT,
    current_h1 VARCHAR(255),
    new_title VARCHAR(255),
    new_description TEXT,
    new_h1 VARCHAR(255),
    status VARCHAR(50) DEFAULT 'pending',
    implemented_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);