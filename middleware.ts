import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Simple middleware without Supabase
export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  return res
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
