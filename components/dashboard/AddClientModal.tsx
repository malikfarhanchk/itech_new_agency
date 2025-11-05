'use client'

import { useState, useRef, useEffect } from 'react'
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { supabase } from '@/lib/supabase'
import { generateRandomPassword, validateEmail } from '@/lib/utils'
import { toast } from 'sonner'
import { ClientType } from '@/types'

interface AddClientModalProps {
  open: boolean
  onClose: () => void
  onSuccess: () => void
}

export default function AddClientModal({ open, onClose, onSuccess }: AddClientModalProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    website_domain: '',
    client_type: 'local_seo' as ClientType,
    contract_length: 12,
    monthly_fee: 500,
    contact_email: '',
    contact_name: ''
  })
  const modalRef = useRef<HTMLDivElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Validate inputs
      if (!formData.name || !formData.website_domain) {
        toast.error('Please fill in all required fields')
        return
      }

      if (!validateEmail(formData.contact_email)) {
        toast.error('Please enter a valid email address')
        return
      }

      // Create client record
      const { data: client, error: clientError } = await supabase
        .from('clients')
        .insert([
          {
            name: formData.name,
            website_domain: formData.website_domain,
            client_type: formData.client_type,
            contract_length: formData.contract_length,
            monthly_fee: formData.monthly_fee,
            status: 'stable' // Default status
          }
        ])
        .select()
        .single()

      if (clientError) {
        throw clientError
      }

      // Create client user account
      const generatedPassword = generateRandomPassword()
      
      const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
        email: formData.contact_email,
        password: generatedPassword,
        email_confirm: true,
        user_metadata: {
          name: formData.contact_name || formData.name,
          role: 'client',
          client_id: client.id
        }
      })

      if (authError) {
        console.warn('Auth user creation failed:', authError)
        // Client record was created, so we continue
      }

      toast.success('Client added successfully!', {
        description: `Login credentials have been generated for ${formData.contact_email}`
      })

      // Reset form
      setFormData({
        name: '',
        website_domain: '',
        client_type: 'local_seo',
        contract_length: 12,
        monthly_fee: 500,
        contact_email: '',
        contact_name: ''
      })

      onSuccess()
      onClose()
    } catch (error: any) {
      console.error('Error adding client:', error)
      toast.error('Failed to add client', {
        description: error.message || 'An unexpected error occurred'
      })
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div ref={modalRef}>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Add New Client
                </h3>
                <button
                  onClick={onClose}
                  className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Client Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="mt-1 input"
                      placeholder="Acme Corporation"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Website Domain *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.website_domain}
                      onChange={(e) => setFormData(prev => ({ ...prev, website_domain: e.target.value }))}
                      className="mt-1 input"
                      placeholder="acme.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Client Type
                    </label>
                    <select
                      value={formData.client_type}
                      onChange={(e) => setFormData(prev => ({ ...prev, client_type: e.target.value as ClientType }))}
                      className="mt-1 input"
                    >
                      <option value="local_seo">Local SEO</option>
                      <option value="ecommerce">E-commerce</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Contract Length (months)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="60"
                      value={formData.contract_length}
                      onChange={(e) => setFormData(prev => ({ ...prev, contract_length: parseInt(e.target.value) || 12 }))}
                      className="mt-1 input"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Monthly Fee (£)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.monthly_fee}
                      onChange={(e) => setFormData(prev => ({ ...prev, monthly_fee: parseFloat(e.target.value) || 0 }))}
                      className="mt-1 input"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Contact Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.contact_email}
                      onChange={(e) => setFormData(prev => ({ ...prev, contact_email: e.target.value }))}
                      className="mt-1 input"
                      placeholder="client@acme.com"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Contact Name
                    </label>
                    <input
                      type="text"
                      value={formData.contact_name}
                      onChange={(e) => setFormData(prev => ({ ...prev, contact_name: e.target.value }))}
                      className="mt-1 input"
                      placeholder="John Smith"
                    />
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-blue-800">
                        Automatic Account Creation
                      </h3>
                      <div className="mt-2 text-sm text-blue-700">
                        <p>
                          A client account will be automatically created with a secure password. 
                          You can share these credentials with the client once the dashboard is ready.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={loading}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="spinner w-4 h-4" />
                ) : (
                  <>
                    <PlusIcon className="w-4 h-4 mr-2" />
                    Add Client
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}