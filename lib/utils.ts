import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { formatDistanceToNow, format, parseISO } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(amount)
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

export function formatPercentage(value: number, decimals: number = 1): string {
  return `${value > 0 ? '+' : ''}${value.toFixed(decimals)}%`
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'improving':
    case 'completed':
    case 'won':
      return 'text-green-600 bg-green-100'
    case 'stable':
    case 'in_progress':
    case 'negotiation':
      return 'text-yellow-600 bg-yellow-100'
    case 'declined':
    case 'lost':
      return 'text-red-600 bg-red-100'
    default:
      return 'text-gray-600 bg-gray-100'
  }
}

export function formatRelativeTime(date: string | Date): string {
  return formatDistanceToNow(typeof date === 'string' ? parseISO(date) : date, { addSuffix: true })
}

export function formatDate(date: string | Date, formatString: string = 'PPP'): string {
  return format(typeof date === 'string' ? parseISO(date) : date, formatString)
}

export function generateRandomPassword(length: number = 12): string {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*'
  let password = ''
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length))
  }
  return password
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function calculatePercentageChange(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0
  return ((current - previous) / previous) * 100
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}