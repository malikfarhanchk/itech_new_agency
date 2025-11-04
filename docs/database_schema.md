# iTech Digital Agency - Database Schema

## Overview
Comprehensive database design for SEO agency management platform with Supabase PostgreSQL.

## Core Principles
- No foreign key constraints (Supabase best practice)
- Manual relationship management
- UUID for all primary keys
- Timestamps on all tables
- Soft deletes where appropriate

## Tables

### 1. Authentication & Users

#### profiles
Extended user profile data (linked to auth.users)
```sql
- id (UUID, PK) - matches auth.users.id
- email (TEXT)
- full_name (TEXT)
- role (TEXT) - 'super_admin', 'admin', 'client'
- status (TEXT) - 'pending_approval', 'active', 'inactive'
- avatar_url (TEXT)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### 2. Client Management

#### clients
Main client/domain records
```sql
- id (UUID, PK)
- name (TEXT) - Client business name
- domain (TEXT) - Website domain
- client_type (TEXT) - 'local_seo', 'ecommerce'
- contract_length (INTEGER) - months
- monthly_fee (DECIMAL)
- status (TEXT) - 'improving', 'stable', 'declined'
- status_color (TEXT) - 'green', 'yellow', 'red'
- status_metric (TEXT) - Display metric on button
- status_updated_at (TIMESTAMP)
- primary_contact_user_id (UUID) - Link to profiles
- onboarded_at (TIMESTAMP)
- created_by (UUID) - Admin who added client
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
- is_active (BOOLEAN)
```

#### client_goals
Goals and KPIs for clients
```sql
- id (UUID, PK)
- client_id (UUID)
- goal_type (TEXT) - 'traffic', 'rankings', 'leads', 'revenue'
- target_value (DECIMAL)
- current_value (DECIMAL)
- period (TEXT) - 'monthly', 'quarterly', 'yearly'
- deadline (DATE)
- status (TEXT) - 'on_track', 'at_risk', 'achieved', 'missed'
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

#### client_notes
Shared team notes for clients
```sql
- id (UUID, PK)
- client_id (UUID)
- author_id (UUID)
- content (TEXT)
- is_pinned (BOOLEAN)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

#### client_communication_log
Track important client interactions
```sql
- id (UUID, PK)
- client_id (UUID)
- user_id (UUID) - Who logged this
- communication_type (TEXT) - 'email', 'call', 'meeting', 'other'
- subject (TEXT)
- notes (TEXT)
- occurred_at (TIMESTAMP)
- created_at (TIMESTAMP)
```

### 3. SEO Data & Analytics

#### seo_performance_data
Weekly performance snapshots for status calculation
```sql
- id (UUID, PK)
- client_id (UUID)
- data_source (TEXT) - 'gsc', 'ga4', 'gbp'
- metric_type (TEXT) - 'clicks', 'impressions', 'sessions', 'calls'
- value (DECIMAL)
- week_start_date (DATE)
- week_end_date (DATE)
- created_at (TIMESTAMP)
```

#### keyword_data
Keyword tracking and rankings
```sql
- id (UUID, PK)
- client_id (UUID)
- keyword (TEXT)
- url (TEXT)
- position (DECIMAL)
- search_volume (INTEGER)
- traffic (INTEGER)
- source (TEXT) - 'ahrefs', 'semrush', 'gsc', 'manual'
- tracked_date (DATE)
- created_at (TIMESTAMP)
```

#### competitor_data
Competitor analysis data
```sql
- id (UUID, PK)
- client_id (UUID)
- competitor_domain (TEXT)
- metric_type (TEXT) - 'traffic', 'keywords', 'backlinks'
- value (DECIMAL)
- data_snapshot (JSONB) - Full competitor data
- tracked_date (DATE)
- created_at (TIMESTAMP)
```

#### backlink_data
Backlink profile tracking
```sql
- id (UUID, PK)
- client_id (UUID)
- source_url (TEXT)
- target_url (TEXT)
- anchor_text (TEXT)
- domain_rating (INTEGER)
- link_type (TEXT)
- status (TEXT) - 'active', 'lost', 'broken'
- first_seen (DATE)
- last_checked (DATE)
- created_at (TIMESTAMP)
```

### 4. SEO Audit Workspace (10 Tabs)

#### audit_client_details
Tab 1: Client information
```sql
- id (UUID, PK)
- client_id (UUID)
- data (JSONB) - {name, company, address, usp, services, etc.}
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

#### audit_pages
Tab 2: Page audit data
```sql
- id (UUID, PK)
- client_id (UUID)
- page_name (TEXT)
- page_url (TEXT)
- page_type (TEXT)
- content_action (TEXT)
- technical_action (TEXT)
- priority (TEXT)
- notes (TEXT)
- sort_order (INTEGER)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

#### audit_keywords
Tab 3: Keyword research
```sql
- id (UUID, PK)
- client_id (UUID)
- keyword (TEXT)
- monthly_search_volume (INTEGER)
- difficulty (INTEGER)
- priority (TEXT)
- target_page (TEXT)
- sort_order (INTEGER)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

#### audit_headers_meta
Tab 4: On-page SEO
```sql
- id (UUID, PK)
- client_id (UUID)
- page (TEXT)
- current_title (TEXT)
- current_description (TEXT)
- current_h1 (TEXT)
- new_title (TEXT)
- new_description (TEXT)
- new_h1 (TEXT)
- status (TEXT)
- sort_order (INTEGER)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

#### audit_competitors
Tab 5: Competitor tracking
```sql
- id (UUID, PK)
- client_id (UUID)
- competitor_name (TEXT)
- competitor_url (TEXT)
- strengths (TEXT)
- weaknesses (TEXT)
- opportunities (TEXT)
- sort_order (INTEGER)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

#### audit_content_strategy
Tab 6: Content planning
```sql
- id (UUID, PK)
- client_id (UUID)
- page_name (TEXT)
- page_type (TEXT)
- word_count_needed (INTEGER)
- target_keywords (TEXT)
- status (TEXT)
- assigned_to (UUID)
- sort_order (INTEGER)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

#### audit_local_citations
Tab 7: Citation building
```sql
- id (UUID, PK)
- client_id (UUID)
- site_name (TEXT)
- domain_rating (INTEGER)
- date_submitted (DATE)
- live_link (TEXT)
- status (TEXT) - 'pending', 'submitted', 'live', 'rejected'
- notes (TEXT)
- sort_order (INTEGER)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

#### audit_link_building
Tab 8: Link building tracker
```sql
- id (UUID, PK)
- client_id (UUID)
- page (TEXT)
- competitor_page (TEXT)
- links_needed (INTEGER)
- links_acquired (INTEGER)
- status (TEXT)
- notes (TEXT)
- sort_order (INTEGER)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

#### audit_surfer_pages
Tab 9: Content optimization
```sql
- id (UUID, PK)
- client_id (UUID)
- page (TEXT)
- keyword (TEXT)
- ranking_before (INTEGER)
- surfer_score_before (INTEGER)
- surfer_score_after (INTEGER)
- ranking_after (INTEGER)
- optimized_date (DATE)
- sort_order (INTEGER)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

#### audit_task_sheet
Tab 10: SEO task checklist
```sql
- id (UUID, PK)
- client_id (UUID)
- task_name (TEXT)
- task_category (TEXT)
- status (TEXT) - 'not_started', 'in_progress', 'completed'
- priority (TEXT)
- notes (TEXT)
- assigned_to (UUID)
- sort_order (INTEGER)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### 5. CRM & Lead Management

#### leads
Sales pipeline management
```sql
- id (UUID, PK)
- business_name (TEXT)
- contact_name (TEXT)
- email (TEXT)
- phone (TEXT)
- website (TEXT)
- industry (TEXT)
- stage (TEXT) - 'initial_contact', 'proposal_sent', 'negotiation', 'won', 'lost'
- value (DECIMAL) - Estimated monthly value
- probability (INTEGER) - 0-100%
- source (TEXT) - Lead source
- assigned_to (UUID)
- notes (TEXT)
- won_date (DATE)
- lost_reason (TEXT)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

#### proposals
Generated proposals
```sql
- id (UUID, PK)
- lead_id (UUID)
- proposal_number (TEXT)
- services (JSONB) - Array of services
- monthly_fee (DECIMAL)
- contract_length (INTEGER)
- status (TEXT) - 'draft', 'sent', 'accepted', 'rejected'
- pdf_url (TEXT)
- sent_date (DATE)
- created_by (UUID)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

#### lead_tracking
Form submissions and qualified leads for Local SEO clients
```sql
- id (UUID, PK)
- client_id (UUID)
- date (DATE)
- lead_count (INTEGER)
- source (TEXT) - 'website_form', 'phone', 'email', 'chat', 'other'
- notes (TEXT)
- added_by (UUID)
- created_at (TIMESTAMP)
```

### 6. Backlink Opportunities Database

#### backlink_opportunities
Potential backlink sources
```sql
- id (UUID, PK)
- domain (TEXT)
- domain_rating (INTEGER)
- spam_score (INTEGER)
- link_type (TEXT) - 'blog', 'directory', 'guest_post', 'niche_edit'
- niche (TEXT)
- contact_email (TEXT)
- cost (DECIMAL)
- notes (TEXT)
- is_local_directory (BOOLEAN)
- city (TEXT)
- verification_needed (BOOLEAN)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### 7. Project Management

#### tasks
Task management system
```sql
- id (UUID, PK)
- client_id (UUID)
- title (TEXT)
- description (TEXT)
- status (TEXT) - 'todo', 'in_progress', 'review', 'completed'
- priority (TEXT) - 'low', 'medium', 'high', 'urgent'
- assigned_to (UUID)
- due_date (DATE)
- completed_at (TIMESTAMP)
- created_by (UUID)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### 8. Financial Tracking

#### financial_records
Revenue and expense tracking
```sql
- id (UUID, PK)
- client_id (UUID)
- record_type (TEXT) - 'revenue', 'expense'
- amount (DECIMAL)
- category (TEXT)
- description (TEXT)
- transaction_date (DATE)
- created_by (UUID)
- created_at (TIMESTAMP)
```

### 9. Internal Tools

#### ai_prompts
Saved AI prompts for team
```sql
- id (UUID, PK)
- title (TEXT)
- prompt_text (TEXT)
- category (TEXT)
- use_case (TEXT)
- created_by (UUID)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

#### schema_templates
Schema markup templates
```sql
- id (UUID, PK)
- schema_type (TEXT) - 'local_business', 'organization', 'product', etc.
- template (JSONB)
- description (TEXT)
- created_at (TIMESTAMP)
```

### 10. Google API Integration

#### google_api_credentials
OAuth tokens for Google services
```sql
- id (UUID, PK)
- client_id (UUID)
- service (TEXT) - 'ga4', 'gsc', 'gbp'
- access_token (TEXT) - Encrypted
- refresh_token (TEXT) - Encrypted
- expires_at (TIMESTAMP)
- property_id (TEXT) - GA4 property ID or GSC site URL
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### 11. Communication

#### chat_messages
Internal team chat
```sql
- id (UUID, PK)
- user_id (UUID)
- message (TEXT)
- mentions (JSONB) - Array of mentioned user IDs
- client_links (JSONB) - Array of linked client IDs
- attachments (JSONB)
- is_edited (BOOLEAN)
- edited_at (TIMESTAMP)
- created_at (TIMESTAMP)
```

#### notifications
User notifications
```sql
- id (UUID, PK)
- user_id (UUID)
- type (TEXT) - 'new_user', 'task_assigned', 'client_status_change', 'mention', etc.
- title (TEXT)
- message (TEXT)
- link (TEXT)
- is_read (BOOLEAN)
- created_at (TIMESTAMP)
```

### 12. File Management

#### uploaded_files
CSV/file upload tracking
```sql
- id (UUID, PK)
- client_id (UUID)
- file_name (TEXT)
- file_type (TEXT)
- file_size (INTEGER)
- storage_path (TEXT)
- upload_source (TEXT) - 'ahrefs', 'semrush', 'manual'
- processing_status (TEXT) - 'pending', 'processing', 'completed', 'failed'
- processed_data (JSONB)
- error_message (TEXT)
- uploaded_by (UUID)
- created_at (TIMESTAMP)
- processed_at (TIMESTAMP)
- deleted_at (TIMESTAMP) - Process and purge
```

### 13. Settings & White-labeling

#### system_settings
Global system configuration
```sql
- id (UUID, PK)
- setting_key (TEXT, UNIQUE)
- setting_value (JSONB)
- updated_by (UUID)
- updated_at (TIMESTAMP)
```

Keys will include:
- agency_logo_url
- agency_primary_color
- agency_name
- custom_domain

### 14. Google Trends Data

#### trends_data
Cached Google Trends data
```sql
- id (UUID, PK)
- keyword (TEXT)
- region (TEXT)
- timeframe (TEXT)
- trend_data (JSONB)
- fetched_at (TIMESTAMP)
- created_at (TIMESTAMP)
```

## Indexes

Key indexes for performance:
- profiles(email)
- clients(domain), clients(status), clients(is_active)
- tasks(client_id, status), tasks(assigned_to)
- chat_messages(created_at DESC)
- notifications(user_id, is_read)
- keyword_data(client_id, tracked_date)
- seo_performance_data(client_id, week_start_date)
- leads(stage), leads(assigned_to)

## RLS Policies

All tables will have RLS enabled with policies for:
- Super Admin: Full access to all data
- Admin: Full access to all data
- Client: Read-only access to their own client_id data only

## Data Flow Notes

1. **Client Status Automation**: Weekly cron job calculates performance change from seo_performance_data
2. **File Processing**: uploaded_files trigger processing → extract to keyword_data/competitor_data → delete file
3. **Live Admin Counter**: Count active WebSocket connections or recent chat_messages
4. **Notifications**: Triggered by events (new user signup, status change, @mentions)
