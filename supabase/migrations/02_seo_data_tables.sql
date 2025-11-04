-- Batch 2: SEO Data Tables

-- seo_performance_data table
CREATE TABLE IF NOT EXISTS seo_performance_data (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL,
    data_source TEXT NOT NULL,
    metric_type TEXT NOT NULL,
    value DECIMAL(12,2),
    week_start_date DATE NOT NULL,
    week_end_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_seo_perf_client ON seo_performance_data(client_id);
CREATE INDEX idx_seo_perf_date ON seo_performance_data(week_start_date DESC);
CREATE INDEX idx_seo_perf_source ON seo_performance_data(data_source);

-- keyword_data table
CREATE TABLE IF NOT EXISTS keyword_data (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL,
    keyword TEXT NOT NULL,
    url TEXT,
    position DECIMAL(5,2),
    search_volume INTEGER,
    traffic INTEGER,
    source TEXT,
    tracked_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_keyword_client ON keyword_data(client_id);
CREATE INDEX idx_keyword_date ON keyword_data(tracked_date DESC);
CREATE INDEX idx_keyword_position ON keyword_data(position);

-- competitor_data table
CREATE TABLE IF NOT EXISTS competitor_data (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL,
    competitor_domain TEXT NOT NULL,
    metric_type TEXT,
    value DECIMAL(12,2),
    data_snapshot JSONB,
    tracked_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_competitor_client ON competitor_data(client_id);
CREATE INDEX idx_competitor_date ON competitor_data(tracked_date DESC);

-- backlink_data table
CREATE TABLE IF NOT EXISTS backlink_data (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL,
    source_url TEXT NOT NULL,
    target_url TEXT NOT NULL,
    anchor_text TEXT,
    domain_rating INTEGER,
    link_type TEXT,
    status TEXT DEFAULT 'active',
    first_seen DATE,
    last_checked DATE,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_backlink_client ON backlink_data(client_id);
CREATE INDEX idx_backlink_status ON backlink_data(status);

-- trends_data table
CREATE TABLE IF NOT EXISTS trends_data (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    keyword TEXT NOT NULL,
    region TEXT,
    timeframe TEXT,
    trend_data JSONB,
    fetched_at TIMESTAMP DEFAULT NOW(),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_trends_keyword ON trends_data(keyword);
CREATE INDEX idx_trends_fetched ON trends_data(fetched_at DESC);
