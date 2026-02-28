import { NextRequest, NextResponse } from 'next/server'
import { signToken } from '@/lib/auth'

export const dynamic = 'force-dynamic'

// SIMPLE AUTH MODE: Accepts any credentials (for development)
export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Accept any credentials - no database check
    // Generate JWT token
    const token = signToken({
      userId: 'dev-user-' + Date.now(),
      email: email
    })

    // Return mock user data
    const userData = {
      id: 'dev-user-' + Date.now(),
      name: email.split('@')[0] || 'User',
      email: email,
      avatar: null,
      preferences: {
        language: 'en',
        currency: 'INR',
        notifications: true
      },
      isVerified: true
    }

    return NextResponse.json({
      message: 'Login successful',
      user: userData,
      token
    })

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
