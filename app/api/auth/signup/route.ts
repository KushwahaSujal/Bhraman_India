import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import connectDB from '@/lib/mongodb'
import { User } from '@/lib/models'
import { signToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const { name, email, password } = await request.json()

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    })

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
