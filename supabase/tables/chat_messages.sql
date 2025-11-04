CREATE TABLE chat_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sender_id UUID NOT NULL,
    message_text TEXT NOT NULL,
    mentioned_client_id UUID,
    channel VARCHAR(50) DEFAULT 'general',
    is_read BOOLEAN DEFAULT false,
    parent_message_id UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);