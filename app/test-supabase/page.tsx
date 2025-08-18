import SupabaseTest from '@/components/SupabaseTest'

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-heritage-beige to-heritage-cream py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-playfair font-bold text-heritage-maroon mb-2">
            Bhromon Supabase Setup
          </h1>
          <p className="text-heritage-bronze">Testing database connection...</p>
        </div>
        
        <SupabaseTest />
        
        <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-heritage-maroon mb-4">
            📋 Next Steps
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-heritage-bronze">
            <li>✅ Environment variables configured</li>
            <li>🔄 Test Supabase connection (above)</li>
            <li>📊 Run database schema in Supabase SQL Editor</li>
            <li>🧪 Test authentication flow</li>
            <li>🎉 Start building tourism features!</li>
          </ol>
          
          <div className="mt-6 p-4 bg-heritage-beige/30 rounded-lg">
            <h3 className="font-bold text-heritage-maroon mb-2">Database Schema Ready:</h3>
            <p className="text-sm text-heritage-bronze">
              Copy the SQL from <code>database_schema.sql</code> and run it in your 
              Supabase project's SQL Editor to create all tables.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
