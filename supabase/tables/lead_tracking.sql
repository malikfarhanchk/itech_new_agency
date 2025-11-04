CREATE TABLE lead_tracking (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL,
    tracking_date DATE NOT NULL,
    form_submissions INTEGER DEFAULT 0,
    phone_calls INTEGER DEFAULT 0,
    email_inquiries INTEGER DEFAULT 0,
    chat_conversations INTEGER DEFAULT 0,
    total_leads INTEGER DEFAULT 0,
    lead_source_breakdown JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);