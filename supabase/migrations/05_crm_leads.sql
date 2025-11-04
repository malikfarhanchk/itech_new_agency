-- Batch 5: CRM & Lead Management

-- leads table
CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_name TEXT NOT NULL,
    contact_name TEXT,
    email TEXT,
    phone TEXT,
    website TEXT,
    industry TEXT,
    stage TEXT DEFAULT 'initial_contact',
    value DECIMAL(10,2),
    probability INTEGER DEFAULT 50,
    source TEXT,
    assigned_to UUID,
    notes TEXT,
    won_date DATE,
    lost_reason TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_leads_stage ON leads(stage);
CREATE INDEX idx_leads_assigned ON leads(assigned_to);
CREATE INDEX idx_leads_created ON leads(created_at DESC);

-- proposals table
CREATE TABLE IF NOT EXISTS proposals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID,
    proposal_number TEXT UNIQUE,
    services JSONB DEFAULT '[]',
    monthly_fee DECIMAL(10,2),
    contract_length INTEGER,
    status TEXT DEFAULT 'draft',
    pdf_url TEXT,
    sent_date DATE,
    created_by UUID,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_proposals_lead ON proposals(lead_id);
CREATE INDEX idx_proposals_status ON proposals(status);
CREATE INDEX idx_proposals_number ON proposals(proposal_number);

-- lead_tracking table (for Local SEO clients)
CREATE TABLE IF NOT EXISTS lead_tracking (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL,
    date DATE NOT NULL,
    lead_count INTEGER NOT NULL DEFAULT 0,
    source TEXT,
    notes TEXT,
    added_by UUID,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_lead_tracking_client ON lead_tracking(client_id);
CREATE INDEX idx_lead_tracking_date ON lead_tracking(date DESC);

-- backlink_opportunities table
CREATE TABLE IF NOT EXISTS backlink_opportunities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    domain TEXT NOT NULL,
    domain_rating INTEGER,
    spam_score INTEGER,
    link_type TEXT,
    niche TEXT,
    contact_email TEXT,
    cost DECIMAL(10,2),
    notes TEXT,
    is_local_directory BOOLEAN DEFAULT false,
    city TEXT,
    verification_needed BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_backlink_opp_type ON backlink_opportunities(link_type);
CREATE INDEX idx_backlink_opp_local ON backlink_opportunities(is_local_directory);
CREATE INDEX idx_backlink_opp_niche ON backlink_opportunities(niche);
