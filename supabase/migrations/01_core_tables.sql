-- Batch 1: Core User & Client Tables

-- profiles table
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY,
    email TEXT NOT NULL,
    full_name TEXT,
    role TEXT DEFAULT 'client',
    status TEXT DEFAULT 'pending_approval',
    avatar_url TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_status ON profiles(status);

-- clients table
CREATE TABLE IF NOT EXISTS clients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    domain TEXT NOT NULL,
    client_type TEXT,
    contract_length INTEGER,
    monthly_fee DECIMAL(10,2),
    status TEXT DEFAULT 'stable',
    status_color TEXT DEFAULT 'yellow',
    status_metric TEXT,
    status_updated_at TIMESTAMP,
    primary_contact_user_id UUID,
    onboarded_at TIMESTAMP,
    created_by UUID,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true
);

CREATE INDEX idx_clients_domain ON clients(domain);
CREATE INDEX idx_clients_status ON clients(status);
CREATE INDEX idx_clients_active ON clients(is_active);
CREATE INDEX idx_clients_type ON clients(client_type);

-- client_goals table
CREATE TABLE IF NOT EXISTS client_goals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL,
    goal_type TEXT NOT NULL,
    target_value DECIMAL(12,2),
    current_value DECIMAL(12,2),
    period TEXT,
    deadline DATE,
    status TEXT DEFAULT 'on_track',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_client_goals_client ON client_goals(client_id);
CREATE INDEX idx_client_goals_status ON client_goals(status);

-- client_notes table
CREATE TABLE IF NOT EXISTS client_notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL,
    author_id UUID NOT NULL,
    content TEXT,
    is_pinned BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_client_notes_client ON client_notes(client_id);
CREATE INDEX idx_client_notes_pinned ON client_notes(is_pinned);

-- client_communication_log table
CREATE TABLE IF NOT EXISTS client_communication_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL,
    user_id UUID NOT NULL,
    communication_type TEXT,
    subject TEXT,
    notes TEXT,
    occurred_at TIMESTAMP DEFAULT NOW(),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_comm_log_client ON client_communication_log(client_id);
CREATE INDEX idx_comm_log_date ON client_communication_log(occurred_at DESC);
