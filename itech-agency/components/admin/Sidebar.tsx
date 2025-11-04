'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Search, 
  FileSearch, 
  Users, 
  Wrench, 
  Plug,
  UserCircle,
  LogOut,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  userEmail?: string;
  onLogout?: () => void;
}

export default function Sidebar({ userEmail, onLogout }: SidebarProps) {
  const pathname = usePathname();

  const navigationItems = [
    {
      name: 'Dashboard',
      href: '/admin/dashboard',
      icon: LayoutDashboard,
      description: 'Overview & analytics'
    },
    {
      name: 'SEO Analysis',
      href: '/admin/seo-analysis',
      icon: Search,
      description: 'SEO audits & reports'
    },
    {
      name: 'Audit Workspace',
      href: '/admin/audit-workspace',
      icon: FileSearch,
      description: 'Client audits'
    },
    {
      name: 'CRM',
      href: '/admin/crm',
      icon: Users,
      description: 'Client management'
    },
    {
      name: 'Internal Tools',
      href: '/admin/tools',
      icon: Wrench,
      description: 'AI prompts & schemas'
    },
    {
      name: 'Integrations',
      href: '/admin/integrations',
      icon: Plug,
      description: 'OAuth & API connections'
    },
    {
      name: 'Client Portal',
      href: '/client-portal',
      icon: UserCircle,
      description: 'White-label dashboard'
    },
  ];

  const isActive = (href: string) => {
    if (href === '/admin/dashboard') {
      return pathname === href;
    }
    return pathname?.startsWith(href);
  };

  return (
    <aside className="w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white flex flex-col h-screen fixed left-0 top-0 shadow-xl">
      {/* Header */}
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          iTech Digital
        </h1>
        <p className="text-xs text-slate-400 mt-1">SEO Management Platform</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`
                    group flex items-start p-3 rounded-lg transition-all duration-200
                    ${active 
                      ? 'bg-blue-600 shadow-lg shadow-blue-600/50' 
                      : 'hover:bg-slate-700/50'
                    }
                  `}
                >
                  <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${active ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
                  <div className="ml-3 flex-1">
                    <div className={`text-sm font-medium ${active ? 'text-white' : 'text-slate-200'}`}>
                      {item.name}
                    </div>
                    <div className={`text-xs mt-0.5 ${active ? 'text-blue-100' : 'text-slate-500 group-hover:text-slate-400'}`}>
                      {item.description}
                    </div>
                  </div>
                  {active && (
                    <ChevronRight className="w-4 h-4 text-white ml-2 mt-1" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700">
        {userEmail && (
          <div className="mb-3 p-2 bg-slate-800/50 rounded-lg">
            <p className="text-xs text-slate-400">Logged in as</p>
            <p className="text-sm font-medium text-white truncate">{userEmail}</p>
          </div>
        )}
        {onLogout && (
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center p-3 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white rounded-lg transition-colors duration-200"
          >
            <LogOut className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        )}
      </div>
    </aside>
  );
}
