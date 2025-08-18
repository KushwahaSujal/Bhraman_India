import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import connectDB from '@/lib/mongodb'
import { User } from '@/lib/models'
import { signToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const { email, password } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Find user by email
    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Generate JWT token
    const token = signToken({
      userId: user._id.toString(),
      email: user.email
    })

    // Return user data without password
    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      preferences: user.preferences,
      isVerified: user.isVerified
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
