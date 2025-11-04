CREATE TABLE client_goals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL,
    goal_type VARCHAR(100),
    description TEXT,
    target_value DECIMAL(10,2),
    current_value DECIMAL(10,2),
    deadline DATE,
    status VARCHAR(50) DEFAULT 'active',
    priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low',
    'medium',
    'high')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);