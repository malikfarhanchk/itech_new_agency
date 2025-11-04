-- Batch 4: Audit Workspace Tables (Part 2)

-- audit_content_strategy table
CREATE TABLE IF NOT EXISTS audit_content_strategy (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL,
    page_name TEXT,
    page_type TEXT,
    word_count_needed INTEGER,
    target_keywords TEXT,
    status TEXT,
    assigned_to UUID,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_audit_content_client ON audit_content_strategy(client_id);
CREATE INDEX idx_audit_content_order ON audit_content_strategy(client_id, sort_order);

-- audit_local_citations table
CREATE TABLE IF NOT EXISTS audit_local_citations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL,
    site_name TEXT,
    domain_rating INTEGER,
    date_submitted DATE,
    live_link TEXT,
    status TEXT DEFAULT 'pending',
    notes TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_audit_citations_client ON audit_local_citations(client_id);
CREATE INDEX idx_audit_citations_order ON audit_local_citations(client_id, sort_order);
CREATE INDEX idx_audit_citations_status ON audit_local_citations(status);

-- audit_link_building table
CREATE TABLE IF NOT EXISTS audit_link_building (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL,
    page TEXT,
    competitor_page TEXT,
    links_needed INTEGER,
    links_acquired INTEGER DEFAULT 0,
    status TEXT,
    notes TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_audit_links_client ON audit_link_building(client_id);
CREATE INDEX idx_audit_links_order ON audit_link_building(client_id, sort_order);

-- audit_surfer_pages table
CREATE TABLE IF NOT EXISTS audit_surfer_pages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL,
    page TEXT,
    keyword TEXT,
    ranking_before INTEGER,
    surfer_score_before INTEGER,
    surfer_score_after INTEGER,
    ranking_after INTEGER,
    optimized_date DATE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_audit_surfer_client ON audit_surfer_pages(client_id);
CREATE INDEX idx_audit_surfer_order ON audit_surfer_pages(client_id, sort_order);

-- audit_task_sheet table
CREATE TABLE IF NOT EXISTS audit_task_sheet (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL,
    task_name TEXT NOT NULL,
    task_category TEXT,
    status TEXT DEFAULT 'not_started',
    priority TEXT,
    notes TEXT,
    assigned_to UUID,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_audit_tasks_client ON audit_task_sheet(client_id);
CREATE INDEX idx_audit_tasks_order ON audit_task_sheet(client_id, sort_order);
CREATE INDEX idx_audit_tasks_status ON audit_task_sheet(status);
