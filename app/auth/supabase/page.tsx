'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/lib/providers/auth-provider'
import { Mail, Lock, User, Phone, ArrowRight, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    phone: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const { signIn, signUp } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      if (isLogin) {
        const { error } = await signIn(formData.email, formData.password)
        if (error) {
          setError(error.message)
        } else {
          setSuccess('Successfully signed in!')
        }
      } else {
        const { error } = await signUp(formData.email, formData.password, {
          full_name: formData.fullName,
          phone: formData.phone
        })
        if (error) {
          setError(error.message)
        } else {
          setSuccess('Account created successfully! Please check your email to verify your account.')
        }
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-heritage-beige via-heritage-cream to-heritage-sage flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full bg-repeat" style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%238B0000' fill-opacity='0.1'%3E%3Cpath d='M30,5 L35,15 L25,15 Z M30,55 L35,45 L25,45 Z M5,30 L15,35 L15,25 Z M55,30 L45,35 L45,25 Z'/%3E%3C/g%3E%3C/svg%3E")` 
        }}></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link href="/" className="inline-flex items-center mb-6 group">
            <div className="w-12 h-12 bg-gradient-to-br from-heritage-maroon to-heritage-bronze rounded-full flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
              <span className="text-heritage-cream font-bold text-xl font-bengali">ভ</span>
            </div>
            <h1 className="text-3xl font-playfair font-bold text-heritage-maroon">Bhromon</h1>
          </Link>
          <p className="text-heritage-bronze font-bengali">বাংলার সুন্দর যাত্রায় স্বাগতম</p>
          <p className="text-heritage-sage mt-1">Welcome to Bengal's Beautiful Journey</p>
        </motion.div>

        {/* Auth Form */}
        <motion.div
          className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-heritage-gold/20"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Tab Buttons */}
          <div className="flex bg-heritage-beige/50 rounded-xl p-1 mb-8">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all ${
                isLogin 
                  ? 'bg-heritage-maroon text-heritage-cream shadow-md' 
                  : 'text-heritage-bronze hover:bg-heritage-cream/50'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all ${
                !isLogin 
                  ? 'bg-heritage-maroon text-heritage-cream shadow-md' 
                  : 'text-heritage-bronze hover:bg-heritage-cream/50'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Error/Success Messages */}
          {error && (
            <motion.div 
              className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 text-red-700 text-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.div>
          )}
          
          {success && (
            <motion.div 
              className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4 text-green-700 text-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {success}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name - Sign Up Only */}
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <label className="block text-heritage-bronze font-semibold mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-heritage-sage w-5 h-5" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-heritage-sage/30 rounded-lg focus:ring-2 focus:ring-heritage-maroon focus:border-heritage-maroon transition-colors bg-white/70"
                    placeholder="Enter your full name"
                    required={!isLogin}
                  />
                </div>
              </motion.div>
            )}

            {/* Email */}
            <div>
              <label className="block text-heritage-bronze font-semibold mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-heritage-sage w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-heritage-sage/30 rounded-lg focus:ring-2 focus:ring-heritage-maroon focus:border-heritage-maroon transition-colors bg-white/70"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Phone - Sign Up Only */}
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <label className="block text-heritage-bronze font-semibold mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-heritage-sage w-5 h-5" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-heritage-sage/30 rounded-lg focus:ring-2 focus:ring-heritage-maroon focus:border-heritage-maroon transition-colors bg-white/70"
                    placeholder="Enter your phone number"
                  />
                </div>
              </motion.div>
            )}

            {/* Password */}
            <div>
              <label className="block text-heritage-bronze font-semibold mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-heritage-sage w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 border border-heritage-sage/30 rounded-lg focus:ring-2 focus:ring-heritage-maroon focus:border-heritage-maroon transition-colors bg-white/70"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-heritage-sage hover:text-heritage-bronze transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-heritage-maroon to-heritage-bronze text-heritage-cream py-3 rounded-lg font-semibold flex items-center justify-center group hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="w-5 h-5 border-2 border-heritage-cream border-t-transparent rounded-full animate-spin mr-2"></div>
                  {isLogin ? 'Signing In...' : 'Creating Account...'}
                </div>
              ) : (
                <div className="flex items-center">
                  {isLogin ? 'Sign In' : 'Create Account'}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              )}
            </motion.button>
          </form>

          {/* Additional Links */}
          <div className="mt-6 text-center space-y-2">
            {isLogin && (
              <Link 
                href="/auth/forgot-password" 
                className="text-heritage-bronze hover:text-heritage-maroon transition-colors text-sm"
              >
                Forgot your password?
              </Link>
            )}
            
            <div className="text-heritage-sage text-sm">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-heritage-maroon hover:text-heritage-bronze font-semibold transition-colors"
              >
                {isLogin ? 'Sign up here' : 'Sign in here'}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Cultural Quote */}
        <motion.div 
          className="text-center mt-8 p-4 bg-gradient-to-r from-heritage-bronze/10 to-heritage-gold/10 rounded-lg border border-heritage-gold/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-heritage-bronze font-bengali text-sm mb-1">
            "সবার উপরে মানুষ সত্য, তাহার উপরে নাই"
          </p>
          <p className="text-heritage-sage text-xs">
            "Above all humans is truth, nothing is beyond that" - Chandridas
          </p>
        </motion.div>
      </div>
    </div>
  )
}
