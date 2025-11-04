-- Batch 3: Audit Workspace Tables (Part 1)

-- audit_client_details table
CREATE TABLE IF NOT EXISTS audit_client_details (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL UNIQUE,
    data JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_audit_details_client ON audit_client_details(client_id);

-- audit_pages table
CREATE TABLE IF NOT EXISTS audit_pages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL,
    page_name TEXT,
    page_url TEXT,
    page_type TEXT,
    content_action TEXT,
    technical_action TEXT,
    priority TEXT,
    notes TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_audit_pages_client ON audit_pages(client_id);
CREATE INDEX idx_audit_pages_order ON audit_pages(client_id, sort_order);

-- audit_keywords table
CREATE TABLE IF NOT EXISTS audit_keywords (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL,
    keyword TEXT NOT NULL,
    monthly_search_volume INTEGER,
    difficulty INTEGER,
    priority TEXT,
    target_page TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_audit_keywords_client ON audit_keywords(client_id);
CREATE INDEX idx_audit_keywords_order ON audit_keywords(client_id, sort_order);

-- audit_headers_meta table
CREATE TABLE IF NOT EXISTS audit_headers_meta (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL,
    page TEXT,
    current_title TEXT,
    current_description TEXT,
    current_h1 TEXT,
    new_title TEXT,
    new_description TEXT,
    new_h1 TEXT,
    status TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_audit_meta_client ON audit_headers_meta(client_id);
CREATE INDEX idx_audit_meta_order ON audit_headers_meta(client_id, sort_order);

-- audit_competitors table
CREATE TABLE IF NOT EXISTS audit_competitors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL,
    competitor_name TEXT,
    competitor_url TEXT,
    strengths TEXT,
    weaknesses TEXT,
    opportunities TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_audit_comp_client ON audit_competitors(client_id);
CREATE INDEX idx_audit_comp_order ON audit_competitors(client_id, sort_order);
