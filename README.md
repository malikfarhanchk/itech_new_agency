# iTech Digital Agency - Management Platform

A comprehensive Digital Agency Management Platform built with Next.js 14, featuring SEO analytics, client management, task tracking, and intelligent reporting capabilities.

## 🚀 Features

### Core Functionality
- **User Authentication** - Role-based access (Super Admin, Admin, Client)
- **Client Management** - Complete client onboarding and portfolio management
- **Task Management** - Team collaboration and project tracking
- **SEO Analytics** - Comprehensive SEO reporting and analysis
- **Lead Management** - CRM-style lead tracking and pipeline management
- **Financial Tracking** - Revenue monitoring and client billing
- **Real-time Chat** - Team communication with client mentions
- **White-labeling** - Custom branding for client-facing features

### Dashboard Features
- **Admin Dashboard** - Real-time overview of all clients and performance
- **Client Portfolio Grid** - Visual client status tracking with color coding
- **Performance Analytics** - Charts and metrics for data-driven decisions
- **SEO Tools** - Built-in SEO analysis and optimization tools
- **Task Board** - Kanban-style task management
- **Lead Pipeline** - Visual sales pipeline tracking

### Technical Stack
- **Frontend**: Next.js 14 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **UI Components**: Headless UI + Heroicons
- **Forms**: React Hook Form + Zod validation

## 🛠️ Setup & Installation

### Prerequisites
- Node.js 18+ 
- Supabase account
- Git

### Environment Variables

Create a `.env.local` file with the following variables:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# App Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# White Label Settings (Optional)
NEXT_PUBLIC_AGENCY_NAME=iTech Digital Agency
NEXT_PUBLIC_PRIMARY_COLOR=#3b82f6
```

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/malikfarhanchk/itech_new_agency.git
   cd itech_new_agency
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new Supabase project
   - Run the SQL setup scripts (see Database Schema section)
   - Copy your project URL and anon key to `.env.local`

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📊 Database Schema

The application uses the following main tables:

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  role TEXT CHECK (role IN ('super_admin', 'admin', 'client')) DEFAULT 'client',
  avatar_url TEXT,
  client_id UUID REFERENCES clients(id),
  pending_approval BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Clients Table
```sql
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  website_domain TEXT NOT NULL,
  client_type TEXT CHECK (client_type IN ('local_seo', 'ecommerce')) NOT NULL,
  contract_length INTEGER NOT NULL,
  monthly_fee DECIMAL(10,2) NOT NULL,
  status TEXT CHECK (status IN ('improving', 'stable', 'declined')) DEFAULT 'stable',
  performance_data JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Tasks Table
```sql
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT CHECK (status IN ('todo', 'in_progress', 'completed')) DEFAULT 'todo',
  priority TEXT CHECK (priority IN ('low', 'medium', 'high')) DEFAULT 'medium',
  assigned_to TEXT,
  due_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## 🔐 Authentication & Roles

### User Roles

1. **Super Admin**
   - Full system access
   - User management
   - System settings
   - White-labeling configuration

2. **Admin**
   - Client management
   - Task assignment
   - Team collaboration
   - Analytics access

3. **Client**
   - Read-only access to their dashboard
   - View their performance metrics
   - Access to reports

### Demo Accounts

For testing purposes, use these demo credentials:

- **Super Admin**: `admin@itech.com` / `admin123`
- **Admin**: `admin2@itech.com` / `admin123`  
- **Client**: `client@tech.com` / `client123`

## 🎯 Key Features

### Client Management
- Add new clients with automated account creation
- Client status tracking (Improving/Stable/Declined)
- Performance monitoring with color-coded indicators
- Client type filtering (Local SEO vs E-commerce)

### Task Management
- Create, assign, and track tasks
- Priority-based task organization
- Due date management
- Status-based filtering
- Team collaboration

### Analytics Dashboard
- Revenue tracking and growth metrics
- Client performance overview
- Conversion rate monitoring
- Top performing clients analysis
- Custom time range filtering

### SEO Tools
- Keyword tracking integration
- Competitor analysis
- Performance reporting
- Automated status updates

## 🚀 Deployment

### Vercel Deployment

1. **Connect to Vercel**
   - Connect your GitHub repository to Vercel
   - Vercel will auto-detect Next.js and configure the build

2. **Set Environment Variables**
   Add all environment variables from `.env.local` to your Vercel project settings

3. **Deploy**
   - Vercel will automatically build and deploy
   - Your app will be available at `https://your-project.vercel.app`

### Manual Deployment

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

### Project Structure

```
app/                          # Next.js 14 App Router
├── auth/                     # Authentication pages
├── dashboard/               # Dashboard pages
├── globals.css              # Global styles
├── layout.tsx               # Root layout
└── page.tsx                 # Homepage

components/                  # Reusable components
├── auth/                    # Authentication components
├── dashboard/               # Dashboard components
├── clients/                 # Client management
├── tasks/                   # Task management
├── analytics/               # Analytics components
└── providers/               # Context providers

lib/                        # Utilities and configurations
├── supabase.ts             # Supabase client
├── utils.ts                # Helper functions
└── database.ts             # Database types

types/                      # TypeScript type definitions
└── index.ts                # Main type exports
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@itechagency.com or create an issue in this repository.

## 🔗 Links

- **Live Demo**: [https://itech-new-agency.vercel.app](https://itech-new-agency.vercel.app)
- **Documentation**: [Wiki](https://github.com/malikfarhanchk/itech_new_agency/wiki)
- **Issues**: [GitHub Issues](https://github.com/malikfarhanchk/itech_new_agency/issues)

---

**Built with ❤️ by iTech Digital Agency Team**