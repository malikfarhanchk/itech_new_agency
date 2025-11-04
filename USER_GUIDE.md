# iTech Digital Agency - Complete User Guide

## System Overview

iTech Digital Agency is a comprehensive SEO agency management platform with multi-tier authentication, client management, AI-powered insights, and real-time collaboration tools.

---

## Table of Contents

1. [Access Information](#access-information)
2. [Admin Features](#admin-features)
3. [Client Portal Features](#client-portal-features)
4. [Feature Walkthrough](#feature-walkthrough)
5. [Google API Integration](#google-api-integration)
6. [Technical Details](#technical-details)

---

## Access Information

### System URL
**Development Server:** `http://localhost:3000`

### Test Accounts

#### Admin Account
- **Email:** `admin@itech.com`
- **Password:** `Admin123!`
- **Role:** Administrator
- **Access:** Full system access with all features

#### Client Account
- **Email:** `client@test.com`
- **Password:** `Client123!`
- **Role:** Client
- **Access:** Client portal only

---

## Admin Features

### 1. Dashboard (`/admin/dashboard`)
Central hub for monitoring agency performance.

**Key Metrics:**
- Total Monthly Revenue
- Active Clients Count
- Net Balance
- Portfolio Health Status (Improving/Stable/Declined)

**Client Grid:**
- Color-coded status indicators (Green/Yellow/Red)
- Filter by business type (All/Local SEO/E-commerce)
- Quick actions for each client

**Recent Activity:**
- Latest tasks
- Notifications hub
- Live admin counter

### 2. Client Management (`/admin/clients`)
Comprehensive client relationship management.

**Features:**
- Client list with performance metrics
- Detailed client profiles
- Client goals and notes
- Communication history
- Performance tracking

**Client Detail Tabs:**
- Overview: Quick stats and KPIs
- SEO Analysis: Keyword rankings, traffic data
- Tasks: Project management
- Audit Workspace: Detailed SEO audit

### 3. Audit Workspace (`/admin/audit-workspace`)
**10-Tab SEO Strategy & Audit Spreadsheet** with AG-Grid

**Tabs:**
1. Client Details
2. Pages
3. Keywords
4. Headers & Meta
5. Competitors
6. Content Strategy
7. Local Citations
8. Link Building
9. Surfer Pages
10. Task Sheet

**Features:**
- Excel-like interface
- Real-time editing
- Data import/export
- Bulk operations

### 4. CRM & Leads (`/admin/crm`)
**Drag-and-drop Kanban board** for lead management.

**Pipeline Stages:**
- New Leads
- Contacted
- Proposal Sent
- Negotiation
- Won/Lost

**Features:**
- Lead cards with key information
- Drag-and-drop to change status
- Quick actions (Edit, View, Delete)
- Lead tracking metrics

### 5. SEO Analysis (`/admin/seo-analysis`)
AI-powered SEO analysis with Gemini integration.

**Features:**
- CSV file upload for data import
- Intelligent CSV parsing
- AI-generated insights and recommendations
- Keyword analysis
- Competitor analysis
- Performance trends

### 6. Internal Tools (`/admin/tools`)
Management tools for agency operations.

**Three Sections:**

**AI Prompts:**
- Manage Gemini AI prompts
- Categorize by use case
- Edit and delete prompts
- Used for SEO analysis and recommendations

**Schema Templates:**
- JSON-LD schema markup templates
- Organized by industry and schema type
- Copy and customize for clients
- Validator integration

**Lead Tracking (Local SEO):**
- Form submissions tracking
- Phone call monitoring
- Email inquiries
- Chat conversations
- Total leads calculation

### 7. Google API Integrations (`/admin/integrations`)
Connect Google services for enhanced data.

**Available Integrations:**

**Google Analytics 4 (GA4):**
- Real-time analytics
- Custom reports
- Audience insights
- Conversion tracking

**Google Search Console (GSC):**
- Search analytics
- Coverage reports
- Core Web Vitals
- Sitemap management

**Google Business Profile (GBP):**
- Location management
- Review monitoring
- Local insights
- Posts & updates

**Setup Instructions:**
1. Go to Google Cloud Console
2. Create OAuth 2.0 credentials
3. Enable required APIs
4. Add redirect URI: `http://localhost:3000/admin/callback`
5. Connect each service

### 8. Settings (`/admin/settings`)
Agency and system configuration.

**Features:**
- Profile settings
- Agency white-labeling
- Notification preferences
- System preferences

---

## Client Portal Features

### Client Dashboard (`/client-portal`)
Branded portal for client access with white-labeling support.

**Key Metrics:**
- Organic Traffic
- Keywords Ranking
- Overall Health Status
- Active Tasks Count

**Traffic Trend Chart:**
- 30-day traffic visualization
- Interactive chart with tooltips
- Responsive design

**Top Performing Keywords:**
- Keyword list with search volume
- Current position tracking
- Performance indicators

**Current Tasks:**
- In-progress tasks
- Due dates
- Status indicators

**White-Labeling:**
- Custom agency name
- Custom logo upload
- Brand color customization
- Personalized experience

---

## Feature Walkthrough

### Getting Started

1. **Login:**
   - Navigate to `http://localhost:3000`
   - Enter credentials
   - Click "Login"

2. **Admin Dashboard:**
   - View key metrics
   - Check client status
   - Review recent tasks

3. **Managing Clients:**
   - Click on a client card
   - View detailed information
   - Access client-specific tools

### Working with the Audit Workspace

1. Navigate to `/admin/audit-workspace`
2. Select a client
3. Choose a tab
4. Edit cells directly (Excel-like)
5. Data auto-saves
6. Export to CSV if needed

### Using the CRM

1. Go to `/admin/crm`
2. View leads in Kanban board
3. Drag cards between columns
4. Click "Add Lead" to create new
5. Edit or delete as needed

### Running SEO Analysis

1. Navigate to `/admin/seo-analysis`
2. Select a client
3. Upload CSV file with SEO data
4. AI processes and generates insights
5. Review recommendations
6. Export or save analysis

### Managing Internal Tools

1. Go to `/admin/tools`
2. **AI Prompts Tab:**
   - Click "Add Prompt"
   - Enter prompt details
   - Save for reuse

3. **Schema Templates Tab:**
   - Click "Add Template"
   - Select schema type
   - Paste JSON-LD code
   - Save template

4. **Lead Tracking Tab:**
   - View tracking data table
   - Monitor lead sources
   - Analyze conversion rates

---

## Google API Integration

### Prerequisites
- Google Cloud account
- OAuth 2.0 credentials
- Enabled APIs (GA4, GSC, GBP)

### Setup Process

1. **Google Cloud Console:**
   ```
   https://console.cloud.google.com
   ```

2. **Create Project:**
   - Name: "iTech Digital Agency"
   - Select project

3. **Enable APIs:**
   - Google Analytics Data API
   - Search Console API
   - Google Business Profile API

4. **Create OAuth Credentials:**
   - Type: Web Application
   - Authorized redirect URIs: 
     ```
     http://localhost:3000/admin/callback
     ```
   - Save Client ID and Secret

5. **Connect in Platform:**
   - Navigate to `/admin/integrations`
   - Click "Connect" for each service
   - Authorize access
   - Test connection

---

## Technical Details

### Technology Stack
- **Frontend:** Next.js 16.0.1 (React + TypeScript)
- **Backend:** Supabase (PostgreSQL + Edge Functions)
- **UI Framework:** Tailwind CSS
- **Icons:** Lucide React
- **Charts:** Recharts
- **Grid:** AG-Grid (Audit Workspace)
- **AI:** Google Gemini API

### Database Tables (40 total)
**Core:**
- profiles
- clients
- client_goals
- client_notes
- client_communication_log
- white_label_settings

**SEO Data:**
- seo_performance_data
- keyword_data
- competitor_data
- backlink_data
- trends_data

**Audit Workspace (10 tables):**
- audit_client_details
- audit_pages
- audit_keywords
- audit_headers_meta
- audit_competitors
- audit_content_strategy
- audit_local_citations
- audit_link_building
- audit_surfer_pages
- audit_task_sheet

**CRM:**
- leads
- proposals
- lead_tracking
- backlink_opportunities

**Project Management:**
- tasks
- financial_records

**Tools:**
- ai_prompts
- schema_templates
- google_api_credentials

**Communication:**
- chat_messages
- notifications
- uploaded_files

**Settings:**
- system_settings

### Environment Variables
```env
NEXT_PUBLIC_SUPABASE_URL=https://cyqtazypkrdsbclsntbn.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[Your Supabase Anon Key]
NEXT_PUBLIC_GEMINI_API_KEY=[Your Gemini API Key]
```

### Edge Functions (3)
1. **ai-analysis:** Processes SEO data with Gemini AI
2. **process-csv:** Intelligent CSV file parsing
3. **calculate-performance:** Client performance calculations

---

## Navigation Map

### Admin Routes
```
/admin/dashboard         - Main Dashboard
/admin/clients           - Client Management
/admin/clients/[id]      - Client Detail Page
/admin/audit-workspace   - 10-Tab Audit Spreadsheet
/admin/crm               - Kanban Lead Management
/admin/seo-analysis      - AI-Powered SEO Analysis
/admin/tools             - Internal Tools (Prompts, Schemas, Tracking)
/admin/integrations      - Google API Setup
/admin/settings          - System Settings
```

### Client Routes
```
/client-portal          - Client Dashboard (White-labeled)
```

### Auth Routes
```
/auth/login            - Login Page
/                      - Homepage (redirects to login or dashboard)
```

---

## Best Practices

### For Admins:

1. **Client Onboarding:**
   - Create client profile
   - Set up white-labeling
   - Configure access credentials
   - Import initial SEO data

2. **Daily Operations:**
   - Check dashboard metrics
   - Review client status
   - Process new leads in CRM
   - Update audit workspace

3. **Reporting:**
   - Export SEO analysis
   - Generate performance reports
   - Review trend data
   - Share insights with clients

### For Clients:

1. **Regular Monitoring:**
   - Check dashboard weekly
   - Review traffic trends
   - Monitor keyword rankings
   - Track task progress

2. **Engagement:**
   - Review recommendations
   - Provide feedback through tasks
   - Monitor white-labeled branding

---

## Support & Troubleshooting

### Common Issues

**Login Problems:**
- Verify credentials
- Check Supabase connection
- Clear browser cache

**Data Not Loading:**
- Check internet connection
- Verify Supabase is online
- Check browser console for errors

**Integration Issues:**
- Verify OAuth credentials
- Check API enablement
- Test connection status

### Getting Help

For technical support or questions:
1. Check this documentation
2. Review console errors
3. Contact system administrator

---

## Appendix

### Keyboard Shortcuts (Audit Workspace)
- `Ctrl+C` / `Cmd+C`: Copy cell
- `Ctrl+V` / `Cmd+V`: Paste cell
- `Tab`: Move to next cell
- `Enter`: Move down
- `Esc`: Cancel edit

### API Rate Limits
- Google Analytics: 10 requests/second
- Search Console: 600 requests/minute
- Business Profile: 1,000 requests/day

### Data Retention
- SEO Performance: 12 months
- Audit Data: Indefinite
- Lead Tracking: 24 months
- Chat Messages: 6 months

---

**Last Updated:** 2025-11-03  
**Version:** 1.0.0  
**Platform:** iTech Digital Agency
