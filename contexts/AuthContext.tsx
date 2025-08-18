'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  preferences?: any
  isVerified: boolean
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  signup: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for stored auth token on mount
    const token = localStorage.getItem('auth-token')
    if (token) {
      // Verify token and get user data
      fetchUserData(token)
    } else {
      setLoading(false)
    }
  }, [])

  const fetchUserData = async (token: string) => {
    try {
      const response = await fetch('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      
      if (response.ok) {
        const userData = await response.json()
        setUser(userData.user)
      } else {
        // Token is invalid, remove it
        localStorage.removeItem('auth-token')
        document.cookie = 'auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
      localStorage.removeItem('auth-token')
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (response.ok) {
        // Store token
        localStorage.setItem('auth-token', data.token)
        document.cookie = `auth-token=${data.token}; path=/; max-age=604800` // 7 days
        
        setUser(data.user)
        return true
      } else {
        console.error('Login failed:', data.error)
        return false
      }
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
  }

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      })

      const data = await response.json()

      if (response.ok) {
        // Store token
        localStorage.setItem('auth-token', data.token)
        document.cookie = `auth-token=${data.token}; path=/; max-age=604800` // 7 days
        
        setUser(data.user)
        return true
      } else {
        console.error('Signup failed:', data.error)
        return false
      }
    } catch (error) {
      console.error('Signup error:', error)
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem('auth-token')
    document.cookie = 'auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    setUser(null)
    router.push('/')
  }

  const value = {
    user,
    login,
    signup,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
