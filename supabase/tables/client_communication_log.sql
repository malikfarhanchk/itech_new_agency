CREATE TABLE client_communication_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL,
    admin_id UUID NOT NULL,
    communication_type VARCHAR(50),
    subject VARCHAR(255),
    message TEXT,
    response TEXT,
    status VARCHAR(50),
    scheduled_date TIMESTAMP WITH TIME ZONE,
    completed_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);