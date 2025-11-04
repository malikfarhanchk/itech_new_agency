-- Batch 6: Project Management & Financial

-- tasks table
CREATE TABLE IF NOT EXISTS tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'todo',
    priority TEXT DEFAULT 'medium',
    assigned_to UUID,
    due_date DATE,
    completed_at TIMESTAMP,
    created_by UUID,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_tasks_client ON tasks(client_id);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_assigned ON tasks(assigned_to);
CREATE INDEX idx_tasks_due ON tasks(due_date);

-- financial_records table
CREATE TABLE IF NOT EXISTS financial_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID,
    record_type TEXT NOT NULL,
    amount DECIMAL(12,2) NOT NULL,
    category TEXT,
    description TEXT,
    transaction_date DATE NOT NULL,
    created_by UUID,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_financial_client ON financial_records(client_id);
CREATE INDEX idx_financial_type ON financial_records(record_type);
CREATE INDEX idx_financial_date ON financial_records(transaction_date DESC);
