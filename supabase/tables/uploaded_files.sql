CREATE TABLE uploaded_files (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID,
    uploaded_by UUID NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_type VARCHAR(100),
    file_size INTEGER,
    file_url TEXT NOT NULL,
    storage_path TEXT,
    file_category VARCHAR(100),
    description TEXT,
    is_processed BOOLEAN DEFAULT false,
    processing_status VARCHAR(50),
    processing_results JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);