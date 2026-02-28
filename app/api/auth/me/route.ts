import { NextRequest, NextResponse } from 'next/server'
import { verifyToken, getTokenFromAuthHeader } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    const token = getTokenFromAuthHeader(authHeader)
    const decoded = verifyToken(token)

    const userData = {
      id: decoded.userId,
      name: decoded.email.split('@')[0] || 'User',
      email: decoded.email,
      avatar: null,
      preferences: {
        language: 'en',
        currency: 'INR',
        notifications: true
      },
      isVerified: true
    }

    return NextResponse.json({ user: userData })
    
  } catch (error) {
    console.error('Get user error:', error)
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }
}
