'use client'

import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { NavigationItem } from '@/components/dashboard/types'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

interface SidebarProps {
  open: boolean
  setOpen: (open: boolean) => void
}

const navigation: NavigationItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: 'ChartBarIcon' },
  { name: 'Clients', href: '/dashboard/clients', icon: 'UserGroupIcon' },
  { name: 'Tasks', href: '/dashboard/tasks', icon: 'ClipboardDocumentListIcon' },
  { name: 'Leads', href: '/dashboard/leads', icon: 'UserIcon' },
  { name: 'Analytics', href: '/dashboard/analytics', icon: 'ChartPieIcon' },
  { name: 'SEO Tools', href: '/dashboard/seo-tools', icon: 'MagnifyingGlassIcon' },
  { name: 'Backlinks', href: '/dashboard/backlinks', icon: 'LinkIcon' },
  { name: 'Financials', href: '/dashboard/financials', icon: 'CurrencyDollarIcon' },
  { name: 'Settings', href: '/dashboard/settings', icon: 'CogIcon' },
]

export default function Sidebar({ open, setOpen }: SidebarProps) {
  const pathname = usePathname()

  const getIcon = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      ChartBarIcon: require('@heroicons/react/24/outline').ChartBarIcon,
      UserGroupIcon: require('@heroicons/react/24/outline').UserGroupIcon,
      ClipboardDocumentListIcon: require('@heroicons/react/24/outline').ClipboardDocumentListIcon,
      UserIcon: require('@heroicons/react/24/outline').UserIcon,
      ChartPieIcon: require('@heroicons/react/24/outline').ChartPieIcon,
      MagnifyingGlassIcon: require('@heroicons/react/24/outline').MagnifyingGlassIcon,
      LinkIcon: require('@heroicons/react/24/outline').LinkIcon,
      CurrencyDollarIcon: require('@heroicons/react/24/outline').CurrencyDollarIcon,
      CogIcon: require('@heroicons/react/24/outline').CogIcon,
    }
    return iconMap[iconName] || require('@heroicons/react/24/outline').ChartBarIcon
  }

  return (
    <>
      {/* Mobile sidebar */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 md:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 flex z-40">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <SidebarContent navigation={navigation} pathname={pathname} getIcon={getIcon} />
              </Dialog.Panel>
            </Transition.Child>
            <div className="flex-shrink-0 w-14">{/* Force sidebar to shrink to fit close icon */}</div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <SidebarContent navigation={navigation} pathname={pathname} getIcon={getIcon} />
      </div>
    </>
  )
}

interface SidebarContentProps {
  navigation: NavigationItem[]
  pathname: string
  getIcon: (iconName: string) => any
}

function SidebarContent({ navigation, pathname, getIcon }: SidebarContentProps) {
  return (
    <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white">
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <div className="h-8 w-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">IT</span>
          </div>
          <h1 className="ml-3 text-xl font-semibold text-gray-900">iTech Agency</h1>
        </div>
        <nav className="mt-8 flex-1 px-2 space-y-1">
          {navigation.map((item) => {
            const Icon = getIcon(item.icon)
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  pathname === item.href
                    ? 'bg-primary-100 border-primary-500 text-primary-700'
                    : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                  'group flex items-center px-2 py-2 text-sm font-medium border-l-4'
                )}
              >
                <Icon
                  className={cn(
                    pathname === item.href ? 'text-primary-500' : 'text-gray-400 group-hover:text-gray-500',
                    'mr-3 flex-shrink-0 h-6 w-6'
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}