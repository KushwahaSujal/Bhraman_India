'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function SupabaseTest() {
  const [connectionStatus, setConnectionStatus] = useState<'testing' | 'connected' | 'error' | 'not-configured'>('testing')
  const [error, setError] = useState<string>('')

  useEffect(() => {
    async function testConnection() {
      try {
        // Ensure NEXT_PUBLIC envs exist before attempting to use Supabase
        const hasEnv = !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        if (!hasEnv) {
          setConnectionStatus('not-configured')
          return
        }

        const supabase = createClient()
        if (!supabase) {
          setConnectionStatus('not-configured')
          return
        }

        const { data, error } = await supabase.auth.getSession()
        
        if (error) {
          setError(error.message)
          setConnectionStatus('error')
        } else {
          setConnectionStatus('connected')
          console.log('Supabase connection successful!', data)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
        setConnectionStatus('error')
      }
    }

    testConnection()
  }, [])

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-heritage-maroon mb-4">
        🧪 Supabase Connection Test
      </h2>
      
      <div className="space-y-2">
        <div className="flex items-center">
          <span className="font-semibold">Status:</span>
          <span className={`ml-2 px-2 py-1 rounded text-sm ${
            connectionStatus === 'testing' ? 'bg-yellow-100 text-yellow-800' :
            connectionStatus === 'connected' ? 'bg-green-100 text-green-800' :
            connectionStatus === 'not-configured' ? 'bg-gray-100 text-gray-800' :
            'bg-red-100 text-red-800'
          }`}>
            {connectionStatus === 'testing' && '🔄 Testing...'}
            {connectionStatus === 'connected' && '✅ Connected'}
            {connectionStatus === 'not-configured' && '⚙️ Not configured'}
            {connectionStatus === 'error' && '❌ Error'}
          </span>
        </div>
        
        <div className="text-sm text-gray-600">
          <p><strong>Project URL:</strong> https://fcraxpbaorbkuspkfzgi.supabase.co</p>
        </div>
        
        {error && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}
        
        {connectionStatus === 'connected' && (
          <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded">
            <p className="text-green-700 text-sm">
              🎉 Supabase is ready! You can now create your database tables.
            </p>
          </div>
        )}
        {connectionStatus === 'not-configured' && (
          <div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded">
            <p className="text-gray-700 text-sm">
              Supabase environment variables are not set. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to enable this feature.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
