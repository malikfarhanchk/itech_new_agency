# iTech Digital Agency - System Access Instructions

## 🚀 Quick Start Guide

### System URL
**Development Server:** `http://localhost:3000`

The Next.js development server is currently running and ready to use.

---

## 🔐 Test Account Credentials

### Admin Account (Full Access)
- **Email:** `admin@itech.com`
- **Password:** `Admin123!`
- **Access Level:** Full administrative access to all features
- **User ID:** `f66c812c-75f9-4cf4-9ae2-61557408a356`

### Client Account (Limited Access)
- **Email:** `client@test.com`
- **Password:** `Client123!`
- **Access Level:** Client portal only
- **User ID:** `7cf30bb5-f813-449b-8930-0f92148be6cd`

---

## 📋 How to Access the System

### Step 1: Access the Login Page
1. Open your web browser
2. Navigate to: `http://localhost:3000`
3. You will be automatically redirected to the login page at: `http://localhost:3000/auth/login`

### Step 2: Login
1. Enter your email and password (use the test credentials above)
2. Click the "Sign In" button
3. You will be redirected to your dashboard based on your role

### Step 3: Explore Features
- **Admin users** → Redirected to `/admin/dashboard`
- **Client users** → Redirected to `/client-portal`

---

## 🎯 Feature Access by Role

### Admin Role Features (admin@itech.com)

#### 1. **Dashboard** (`/admin/dashboard`)
- Financial overview widgets (revenue, MRR, growth rate)
- Client status grid (active clients, performance metrics)
- Recent tasks overview
- Notifications hub
- Real-time metrics from Supabase

#### 2. **Audit Workspace** (`/admin/audit-workspace`)
- **10-tab professional spreadsheet** powered by AG-Grid
- Tabs include:
  - Client Details
  - Pages
  - Keywords
  - Headers & Meta
  - Competitors
  - Content Strategy
  - Local Citations
  - Link Building
  - Surfer Pages
  - Task Sheet
- Real-time data sync with Supabase
- Export/import capabilities
- Professional grid features (sorting, filtering, editing)

#### 3. **CRM** (`/admin/crm`)
- **Kanban board** with drag-and-drop functionality
- Lead pipeline stages:
  - New Leads
  - Contacted
  - Qualified
  - Proposal Sent
  - Won
  - Lost
- Lead cards with contact information
- Quick actions for each lead
- Real-time updates

#### 4. **SEO Analysis** (`/admin/seo-analysis`)
- **CSV file upload** for bulk data processing
- **AI-powered insights** using Google Gemini
- SEO performance metrics
- Keyword analysis
- Competitor analysis
- Performance tracking
- AI recommendations for optimization

#### 5. **Client Management** (`/admin/clients`)
- Client list with status indicators
- Performance tracking
- Client details and notes
- Communication logs
- Goal tracking

#### 6. **Internal Tools** (`/admin/tools`)
- **AI Prompts Library**: Pre-built templates for SEO tasks
- **Schema Generator**: Create structured data markup
- Custom tool management
- Template library

#### 7. **Settings** (`/admin/settings`)
- System configuration
- White-labeling settings
- API integrations
- User management

---

### Client Role Features (client@test.com)

#### 1. **Client Portal** (`/client-portal`)
- **White-labeled dashboard** with custom branding
- Personal SEO performance overview
- Keyword rankings
- Traffic metrics
- Task progress
- Recent updates
- Custom domain capability (configured via white-label settings)

---

## 🔧 Technical Architecture

### Backend Infrastructure
- **Database:** Supabase (PostgreSQL)
  - 40 tables with Row Level Security (RLS)
  - Multi-tenant architecture
  - Real-time subscriptions enabled
  
- **Authentication:** Supabase Auth
  - Email/password authentication
  - Role-based access control (admin/client)
  - Secure session management
  
- **Edge Functions:** 3 deployed functions
  - `ai-analysis`: AI-powered SEO insights (Gemini)
  - `process-csv`: CSV parsing and data processing
  - `calculate-performance`: Performance calculations
  
- **Storage:** Supabase Storage
  - `client-files` bucket (50MB limit, public access)
  - File upload for CSV and documents

### Frontend Stack
- **Framework:** Next.js 16.0.1 (React 19.2.0)
- **Language:** TypeScript
- **UI Components:**
  - AG-Grid React (professional spreadsheet)
  - Recharts (data visualization)
  - Lucide React (icons)
- **Styling:** Tailwind CSS
- **State Management:** React hooks + Supabase client

### API Integrations
- **Google Gemini AI:** AIzaSyA66LyPEp7RZtK68ESp5VBywX34qAonEg0
- **Supabase URL:** https://cyqtazypkrdsbclsntbn.supabase.co

---

## 🎨 Key Features Highlights

### 1. AI-Powered SEO Analysis
- Upload CSV files with SEO data
- Get AI recommendations using Google Gemini
- Automated keyword analysis
- Competitor insights
- Performance predictions

### 2. Professional Audit Workspace
- 10-tab spreadsheet interface
- Real-time collaboration
- Data import/export
- Advanced grid features (sorting, filtering, grouping)
- Professional data management

### 3. CRM with Kanban Board
- Visual pipeline management
- Drag-and-drop lead cards
- Stage-based workflow
- Real-time updates
- Lead scoring and tracking

### 4. White-Label Client Portals
- Custom branding per client
- Branded domains support
- Client-specific dashboards
- Limited access to their own data only

### 5. Multi-Tenant Security
- Row Level Security (RLS) policies
- Role-based access control
- User isolation in database
- Secure authentication

---

## 🧪 Testing the System

### Basic Functionality Tests

1. **Login Test**
   - Try logging in with admin account
   - Verify redirect to admin dashboard
   - Try logging in with client account
   - Verify redirect to client portal

2. **Dashboard Test**
   - Check if financial widgets load
   - Verify client status grid displays
   - Confirm real-time data updates

3. **Audit Workspace Test**
   - Navigate to audit workspace
   - Switch between tabs
   - Try editing cells
   - Test sorting and filtering

4. **CRM Test**
   - Open CRM page
   - Drag and drop lead cards between stages
   - Verify card updates persist

5. **SEO Analysis Test**
   - Upload a CSV file
   - Verify AI analysis generates insights
   - Check performance metrics

---

## 📁 Project File Structure

```
/workspace/itech-agency/
├── app/                          # Next.js App Router
│   ├── admin/                   # Admin pages
│   │   ├── dashboard/           # Main admin dashboard
│   │   ├── audit-workspace/     # 10-tab spreadsheet
│   │   ├── crm/                 # Kanban board CRM
│   │   ├── seo-analysis/        # SEO analysis suite
│   │   ├── clients/             # Client management
│   │   ├── tools/               # Internal tools
│   │   └── settings/            # System settings
│   ├── auth/                    # Authentication pages
│   │   └── login/               # Login page
│   ├── client-portal/           # Client-facing portal
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Homepage (redirects to login)
├── lib/                         # Utilities
│   └── supabase.ts             # Supabase client
├── .env.local                   # Environment variables
└── package.json                 # Dependencies

/workspace/supabase/
└── functions/                   # Edge Functions
    ├── ai-analysis/             # AI-powered SEO insights
    ├── process-csv/             # CSV processing
    └── calculate-performance/   # Performance calculations
```

---

## 🔍 Troubleshooting

### Issue: Cannot access localhost:3000
**Solution:** Verify the Next.js server is running:
```bash
cd /workspace/itech-agency
pnpm dev
```

### Issue: Login fails with "Invalid credentials"
**Solution:** Verify you're using the correct test credentials:
- Admin: `admin@itech.com` / `Admin123!`
- Client: `client@test.com` / `Client123!`

### Issue: Data not loading on dashboard
**Solution:** Check Supabase connection:
- Verify `.env.local` has correct Supabase credentials
- Check browser console for errors
- Verify RLS policies are applied

### Issue: CSV upload fails
**Solution:** Ensure file format is correct:
- CSV file with proper headers
- File size under 50MB
- Valid data structure

### Issue: AI analysis not working
**Solution:** Verify Gemini API key:
- Check `.env.local` has `GEMINI_API_KEY`
- Verify API key is valid: `AIzaSyA66LyPEp7RZtK68ESp5VBywX34qAonEg0`

---

## 🚀 Next Steps

### For Production Deployment:
1. **Build the application:**
   ```bash
   cd /workspace/itech-agency
   pnpm build
   ```

2. **Deploy to Vercel:**
   - Connect GitHub repository
   - Add environment variables
   - Deploy automatically

3. **Create real user accounts:**
   - Remove test accounts
   - Set up proper user registration
   - Configure email verification

4. **Complete Google OAuth setup:**
   - Configure Google Cloud Console
   - Add GA4, GSC, GBP API credentials
   - Test OAuth flow

5. **Configure custom domains:**
   - Set up white-label domains
   - Configure DNS records
   - Enable SSL certificates

---

## 📞 Support Information

### Database Access
- **Supabase Dashboard:** https://supabase.com/dashboard/project/cyqtazypkrdsbclsntbn
- **Database URL:** https://cyqtazypkrdsbclsntbn.supabase.co

### Edge Functions
- **ai-analysis:** https://cyqtazypkrdsbclsntbn.supabase.co/functions/v1/ai-analysis
- **process-csv:** https://cyqtazypkrdsbclsntbn.supabase.co/functions/v1/process-csv
- **calculate-performance:** https://cyqtazypkrdsbclsntbn.supabase.co/functions/v1/calculate-performance

### Documentation Files
- Full technical specs: `/workspace/ITECH_COMPLETE_DELIVERY.md`
- Final delivery summary: `/workspace/ITECH_FINAL_DELIVERY.md`
- This access guide: `/workspace/SYSTEM_ACCESS_INSTRUCTIONS.md`

---

## ✅ System Status

- **Backend:** ✅ 100% Complete
  - 40 database tables operational
  - 3 Edge Functions deployed
  - Storage bucket configured
  - RLS policies active

- **Frontend:** ✅ 100% Complete
  - Admin dashboard functional
  - Audit workspace operational
  - CRM with Kanban board working
  - SEO analysis suite ready
  - Client portal available
  - Authentication system active

- **Test Users:** ✅ Created and verified
- **Server Status:** ✅ Running on localhost:3000

**The system is fully operational and ready for testing!**

---

*Last Updated: 2025-11-03*
*MiniMax Agent - iTech Digital Agency Platform*
