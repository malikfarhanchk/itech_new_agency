CREATE TABLE audit_task_sheet (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL,
    task_name VARCHAR(255) NOT NULL,
    task_category VARCHAR(100),
    assigned_to UUID,
    due_date DATE,
    priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low',
    'medium',
    'high')),
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending',
    'in_progress',
    'completed',
    'on_hold')),
    notes TEXT,
    completion_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);