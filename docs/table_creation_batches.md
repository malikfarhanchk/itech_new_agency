# Database Table Creation Batches

## Batch 1: Core User & Client Tables (READY)
1. profiles
2. clients  
3. client_goals
4. client_notes
5. client_communication_log

## Batch 2: SEO Data Tables
1. seo_performance_data
2. keyword_data
3. competitor_data
4. backlink_data
5. google_trends_data

## Batch 3: Audit Workspace Tables (Part 1)
1. audit_client_details
2. audit_pages
3. audit_keywords
4. audit_headers_meta
5. audit_competitors

## Batch 4: Audit Workspace Tables (Part 2)
1. audit_content_strategy
2. audit_local_citations
3. audit_link_building
4. audit_surfer_pages
5. audit_task_sheet

## Batch 5: CRM & Lead Management
1. leads
2. proposals
3. lead_tracking
4. backlink_opportunities

## Batch 6: Project Management & Financial
1. tasks
2. financial_records

## Batch 7: Internal Tools & Integration
1. ai_prompts
2. schema_templates
3. google_api_credentials

## Batch 8: Communication & Files
1. chat_messages
2. notifications
3. uploaded_files

## Batch 9: Settings & Configuration
1. system_settings
2. trends_data

## Post-Creation Tasks
1. Create indexes for performance
2. Enable RLS on all tables
3. Create RLS policies for each role (super_admin, admin, client)
4. Create storage buckets for file uploads
5. Set up automated weekly status calculation cron job
