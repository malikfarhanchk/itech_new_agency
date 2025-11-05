'use client'

import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon, PaperAirplaneIcon, DocumentIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { formatRelativeTime } from '@/lib/utils'
import { ChatMessage } from '@/types'

interface ChatPanelProps {
  open: boolean
  onClose: () => void
}

const mockMessages: ChatMessage[] = [
  {
    id: '1',
    user_id: 'user1',
    user_name: 'Sarah Johnson',
    message: 'Hey team, just finished the audit for techstart.com. The keyword rankings are looking great!',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 mins ago
    mentions: ['techstart.com'],
    files: []
  },
  {
    id: '2',
    user_id: 'user2',
    user_name: 'Mike Chen',
    message: '@techstart.com Could you share the link to their dashboard? I need to add some new keywords.',
    timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(), // 10 mins ago
    mentions: ['techstart.com'],
    files: []
  },
  {
    id: '3',
    user_id: 'user1',
    user_name: 'Sarah Johnson',
    message: 'Sure! Here you go: https://dashboard.techstart.com - they just integrated Google Analytics 4 which is showing great conversion improvements.',
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 mins ago
    mentions: [],
    files: []
  }
]

export default function ChatPanel({ open, onClose }: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages)
  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const message: ChatMessage = {
      id: Date.now().toString(),
      user_id: 'current_user',
      user_name: 'You',
      message: newMessage,
      timestamp: new Date().toISOString(),
      mentions: [],
      files: []
    }

    setMessages(prev => [...prev, message])
    setNewMessage('')
    setIsTyping(false)
  }

  const handleMentionClick = (domain: string) => {
    // Navigate to client dashboard
    window.location.href = `/dashboard/clients?search=${domain}`
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="transform transition ease-in-out duration-300"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transform transition ease-in-out duration-300"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col bg-white shadow-xl">
                      {/* Header */}
                      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                        <div className="flex items-center">
                          <h2 className="text-lg font-medium text-gray-900">Team Chat</h2>
                          <div className="ml-2 flex items-center">
                            <div className="h-2 w-2 bg-green-400 rounded-full"></div>
                            <span className="ml-1 text-sm text-gray-500">3 online</span>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                          onClick={onClose}
                        >
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>

                      {/* Messages */}
                      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 custom-scrollbar">
                        {messages.map((message) => (
                          <div key={message.id} className="flex items-start space-x-3">
                            <div className="flex-shrink-0">
                              <div className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center">
                                <span className="text-white text-sm font-medium">
                                  {message.user_name[0]}
                                </span>
                              </div>
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium text-gray-900">
                                  {message.user_name}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {formatRelativeTime(message.timestamp)}
                                </span>
                              </div>
                              <div className="mt-1">
                                <p className="text-sm text-gray-700">
                                  {message.message.split(' ').map((word, index) => {
                                    if (word.includes('@')) {
                                      const domain = word.replace('@', '').replace(/[^a-zA-Z0-9.-]/g, '')
                                      return (
                                        <button
                                          key={index}
                                          onClick={() => handleMentionClick(domain)}
                                          className="text-primary-600 hover:text-primary-800 font-medium"
                                        >
                                          {word}{' '}
                                        </button>
                                      )
                                    }
                                    return word + ' '
                                  })}
                                </p>
                              </div>
                              {message.files.length > 0 && (
                                <div className="mt-2 flex items-center space-x-2">
                                  {message.files.map((file, index) => (
                                    <div key={index} className="flex items-center space-x-1 text-xs text-gray-500">
                                      <DocumentIcon className="h-4 w-4" />
                                      <span>{file}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                        
                        {/* Typing indicator */}
                        {isTyping && (
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                            <span>Someone is typing...</span>
                          </div>
                        )}
                      </div>

                      {/* Message input */}
                      <form onSubmit={handleSendMessage} className="border-t border-gray-200 px-6 py-4">
                        <div className="flex items-end space-x-2">
                          <div className="flex-1">
                            <textarea
                              rows={1}
                              value={newMessage}
                              onChange={(e) => {
                                setNewMessage(e.target.value)
                                setIsTyping(e.target.value.length > 0)
                              }}
                              placeholder="Type a message... (use @domain to mention clients)"
                              className="block w-full resize-none border border-gray-300 rounded-md py-2 pl-3 pr-3 text-sm placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                  e.preventDefault()
                                  handleSendMessage(e)
                                }
                              }}
                            />
                          </div>
                          <button
                            type="submit"
                            disabled={!newMessage.trim()}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <PaperAirplaneIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </form>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  )
}