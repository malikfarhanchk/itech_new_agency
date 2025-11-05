# iTech Digital Agency

> **Complete Digital Agency Management Platform Built with Next.js 14**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Ready-3ECF8E?logo=supabase)](https://supabase.com/)

## 🚀 Live Demo

**[View Live Application →](https://itech-new-agency.vercel.app)**

*Login: admin@itech.com / Admin123!*

*Last Updated: November 5, 2025 - PostCSS configuration conflict resolved*

## ✨ Features

### 🎨 Professional UI/UX
- **Modern Design System** - Clean, professional interface built with Tailwind CSS
- **Responsive Layout** - Perfect on desktop, tablet, and mobile devices  
- **Dark/Light Theme** - Built-in theme switching capabilities
- **Component Library** - Reusable UI components for rapid development

### 🔐 Authentication & Security
- **User Authentication** - Secure login/logout system
- **Role-based Access** - Admin and user role management
- **Session Management** - Persistent user sessions
- **Protected Routes** - Secure page access control

### 📊 Dashboard & Analytics
- **Admin Dashboard** - Complete management interface
- **Real-time Analytics** - Live data visualization
- **Data Tables** - Advanced table functionality with sorting/filtering
- **Charts & Graphs** - Interactive data visualization

### 🛠 Technical Features
- **Next.js 14** - Latest React framework with App Router
- **TypeScript** - Full type safety throughout the application
- **Supabase Integration** - Backend-as-a-Service ready
- **Edge Functions** - Serverless function support
- **Real-time Database** - PostgreSQL with real-time subscriptions

## 🏗️ Project Structure

```
itech-agency/
├── app/                    # Next.js 13+ App Router
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Dashboard pages  
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Home page
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   └── dashboard/        # Dashboard-specific components
├── lib/                  # Utility libraries
├── hooks/                # Custom React hooks
├── types/                # TypeScript type definitions
├── utils/                # Helper functions
└── public/               # Static assets
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

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

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your configuration:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Deployment

### Vercel (Recommended)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/malikfarhanchk/itech_new_agency)

1. Push code to GitHub
2. Connect your GitHub repo to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Manual Deployment
```bash
npm run build
npm start
```

## 🔧 Configuration

### Environment Variables
| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | ✅ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | ✅ |

### Build Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🆘 PostCSS Configuration Note

**IMPORTANT**: This project uses `postcss.config.cjs` for PostCSS configuration. The `postcss.config.js` file should be deleted or empty to avoid configuration conflicts.

## 📱 Screenshots

*Add your application screenshots here*

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check this README and inline code comments
- **Issues**: Report bugs and request features via GitHub Issues
- **Community**: Join our discussions

## 🎯 Tech Stack

- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Supabase](https://supabase.com/)** - Backend-as-a-Service platform
- **[React 18](https://reactjs.org/)** - User interface library
- **[Lucide Icons](https://lucide.dev/)** - Beautiful icon library

---

**Built with ❤️ using modern web technologies**

*Ready to deploy, ready to scale, ready for production.*