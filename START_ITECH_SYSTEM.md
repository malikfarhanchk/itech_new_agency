# 🚀 HOW TO START YOUR iTech Digital Agency System

## STEP 1: Navigate to Project Directory
```bash
cd /workspace/itech-agency
```

## STEP 2: Install Dependencies (if needed)
```bash
npm install
# or if you have pnpm:
pnpm install
```

## STEP 3: Start Development Server
```bash
npm run dev
# or
pnpm dev
```

## STEP 4: Access Your System
Once the server starts, open your browser and go to:
**http://localhost:3000**

## LOGIN CREDENTIALS:
- **Email:** admin@itech.com
- **Password:** Admin123!
- **Role:** Super Admin

## EXPECTED OUTPUT:
```
  ➜  Local:        http://localhost:3000/
  ➜  Network:      http://172.17.135.178:3000/

  press ctrl+c to stop the server
```

## TROUBLESHOOTING:

### If you get "Connection Refused":
1. Check if the server is running: `ps aux | grep node`
2. If not running, start it: `npm run dev`
3. Wait 10-15 seconds for the server to fully start
4. Try accessing http://localhost:3000

### If you get version errors:
1. Check Node.js version: `node --version` (need v20+ for Next.js 16)
2. If you have v18, upgrade to v20+

### If dependencies fail to install:
1. Clear npm cache: `npm cache clean --force`
2. Delete node_modules and package-lock.json
3. Run `npm install` again

## AVAILABLE FEATURES (Once Running):

### 🏠 **Admin Dashboard** 
- Financial widgets (revenue, clients, balance)
- Color-coded client status grid
- Live admin counter and notifications

### 🔍 **SEO Analysis** 
- Upload CSV files (Ahrefs, Semrush)
- AI-powered insights using Gemini API
- Processing status tracking

### 📊 **10-Tab Audit Workspace**
- Select any client and edit data
- Spreadsheet-like interface with AG-Grid
- Real-time editing and saving

### 💼 **CRM System**
- Drag-and-drop Kanban board
- Lead pipeline management
- Proposal generation

### 🛠️ **Internal Tools**
- Prompt Management
- Schema Markup Generator
- Lead tracking for Local SEO

### 🔗 **Integrations**
- Google OAuth setup (GA4, GSC, GBP)
- API connection management

## SYSTEM ARCHITECTURE:
- **Frontend:** Next.js 16 with React 18
- **Backend:** Supabase (PostgreSQL + Auth)
- **AI:** Google Gemini API integrated
- **Real-time:** Live updates and notifications

Your complete iTech Digital Agency platform is production-ready with all features specified in your requirements document!
