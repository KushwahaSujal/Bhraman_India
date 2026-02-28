import { NextRequest, NextResponse } from 'next/server'
import { signToken } from '@/lib/auth'

// SIMPLE AUTH MODE: Accepts any credentials (for development)
export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      )
    }

    const userId = 'dev-user-' + Date.now()

    // Accept any credentials - no database check
    // Generate JWT token
    const token = signToken({
      userId,
      email: email
    })

    // Return mock user data
    const userData = {
      id: userId,
      name: name,
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
      message: 'User created successfully',
      user: userData,
      token
    }, { status: 201 })

  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
