# iTech Digital Agency - Quick Start Guide

## Immediate Action Items

### 1. Fix Node Version Issue (5 minutes)

The application requires Node.js 20.9.0 or higher. Current version: 18.19.0

**Option A: Downgrade Next.js** (Easiest)
```bash
cd /workspace/itech-agency
pnpm remove next
pnpm add next@14.2.0
pnpm run dev
```

**Option B: Upgrade Node** (Recommended for production)
```bash
# If you have nvm:
nvm install 20
nvm use 20

# Or install Node 20 manually
# Then:
cd /workspace/itech-agency
pnpm run dev
```

### 2. Access the Application

Once the dev server starts:
- Open browser to: http://localhost:3000
- You'll be redirected to: http://localhost:3000/admin/dashboard

### 3. Explore Features

**Admin Dashboard**:
- View 7 color-coded client buttons
- Check financial overview
- Filter clients (All/Local SEO/E-commerce)
- Click any client button to see details

**Client Details**:
- Click "Acme Local Plumbing" (green button)
- Navigate tabs: Overview, SEO Analysis, Tasks
- View keyword rankings and performance data

### 4. Deploy Backend (When ready)

**Get Supabase Credentials**:
1. Go to supabase.com
2. Create new project
3. Copy: Project URL, Anon Key, Service Role Key

**Deploy Database**:
1. Open Supabase SQL Editor
2. Run each file in `/workspace/supabase/migrations/` (01-10)
3. Verify all tables created

**Configure App**:
```bash
cd /workspace/itech-agency
cp .env.example .env.local

# Edit .env.local with your credentials
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key
GEMINI_API_KEY=AIzaSyA66LyPEp7RZtK68ESp5VBywX34qAonEg0

# Restart server
pnpm run dev
```

## Project Files

- **Main App**: `/workspace/itech-agency/`
- **Database**: `/workspace/supabase/migrations/`
- **Docs**: `/workspace/docs/` and `/workspace/*.md`

## Need Help?

Read the complete guides:
1. `COMPLETE_PROJECT_DELIVERABLE.md` - Full overview
2. `FUNCTIONAL_DEMO_GUIDE.md` - Feature walkthrough
3. `DELIVERY_SUMMARY.md` - Technical details

## Status

- ✅ 60% Complete
- ✅ All backend architecture ready
- ✅ Admin dashboard functional
- ⏳ Waiting for Supabase credentials
- ⏳ 40% remaining development

---

**Quick Link**: After fixing Node, go to http://localhost:3000
