'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { 
  Camera, 
  MapPin, 
  Users, 
  Hotel, 
  ChefHat, 
  Brain, 
  ShoppingCart, 
  Calendar,
  Star,
  ArrowRight,
  Menu,
  X,
  Compass
} from 'lucide-react'

// Ensure this page is rendered dynamically to avoid build-time env requirements
export const dynamic = 'force-dynamic'

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = currentScrollY / maxScroll
      
      setScrollY(currentScrollY)
      setScrollProgress(progress)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const features = [
    {
      icon: Camera,
      title: 'Heritage Sights',
      description: 'Explore centuries-old temples, palaces, and architectural marvels of Bengal',
      color: 'from-heritage-maroon to-heritage-bronze',
      bgImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center', // Victoria Memorial
      culturalIcon: '🏛️'
    },
    {
      icon: Users,
      title: 'Expert Guides',
      description: 'Connect with certified local guides for authentic cultural experiences',
      color: 'from-bengali-blue to-bengali-green',
      bgImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop&crop=center', // Local Guide
      culturalIcon: '👨‍🎓'
    },
    {
      icon: Hotel,
      title: 'Heritage Hotels',
      description: 'Stay in beautifully restored heritage properties and boutique hotels',
      color: 'from-heritage-bronze to-heritage-gold',
      bgImage: 'https://images.unsplash.com/photo-1561501900-3701fa6a0864?w=400&h=300&fit=crop&crop=center', // Heritage Hotel
      culturalIcon: '🏨'
    },
    {
      icon: ChefHat,
      title: 'Bengali Cuisine',
      description: 'Discover authentic recipes and food experiences from local chefs',
      color: 'from-bengali-red to-bengali-yellow',
      bgImage: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop&crop=center', // Bengali Sweets
      culturalIcon: '🍛'
    },
    {
      icon: Brain,
      title: 'AI Itinerary',
      description: 'Smart travel planning with AI-powered recommendations and routes',
      color: 'from-heritage-sage to-bengali-green',
      bgImage: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=300&fit=crop&crop=center', // Howrah Bridge
      culturalIcon: '🧠'
    },
    {
      icon: ShoppingCart,
      title: 'Local Artisans',
      description: 'Support local craftsmen and buy authentic Bengali handicrafts',
      color: 'from-heritage-terracotta to-heritage-gold',
      bgImage: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=300&fit=crop&crop=center', // Handicrafts
      culturalIcon: '🎨'
    },
    {
      icon: Calendar,
      title: 'Cultural Events',
      description: 'Join live cultural performances and traditional celebrations',
      color: 'from-bengali-blue to-heritage-maroon',
      bgImage: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop&crop=center', // Durga Puja
      culturalIcon: '🎭'
    },
    {
      icon: Star,
      title: 'Special Packages',
      description: 'Curated experiences combining culture, food, and local traditions',
      color: 'from-heritage-gold to-heritage-bronze',
      bgImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&h=300&fit=crop&crop=center', // Dakshineswar Temple
      culturalIcon: '⭐'
    }
  ]

  return (
    <div className="min-h-screen bg-heritage-beige">
      {/* Cultural Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-heritage-maroon via-heritage-gold to-heritage-bronze z-50 origin-left"
        style={{ scaleX: scrollProgress }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
      
      {/* Floating Cultural Scroll Indicator */}
      <motion.div
        className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: scrollY > 100 ? 1 : 0, x: scrollY > 100 ? 0 : 50 }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center">
          <motion.div
            className="w-8 h-8 rounded-full border-2 border-heritage-maroon relative"
            style={{
              background: `conic-gradient(from 0deg, #8B0000 ${scrollProgress * 360}deg, transparent ${scrollProgress * 360}deg)`
            }}
          >
            <div className="absolute inset-1 bg-white rounded-full flex items-center justify-center">
              <span className="text-heritage-maroon text-xs font-bengali">ভ</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-heritage-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <motion.div 
                className="w-10 h-10 bg-gradient-heritage rounded-lg flex items-center justify-center shadow-lg"
                whileHover={{ 
                  scale: 1.1,
                  rotate: 5,
                  boxShadow: "0 10px 30px rgba(139, 0, 0, 0.3)"
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <span className="text-white font-bold text-xl">ভ</span>
              </motion.div>
              <h1 className="text-2xl font-heritage font-bold text-heritage-gradient">
                Bhromon
              </h1>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {['Features', 'About', 'Contact'].map((item, index) => (
                <motion.div
                  key={item}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    href={item === 'Contact' ? '/contact' : `#${item.toLowerCase()}`} 
                    className="relative text-gray-700 hover:text-heritage-maroon transition-colors duration-300 font-medium group"
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-heritage-maroon to-heritage-gold group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </motion.div>
              ))}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/auth/supabase" className="btn-heritage relative overflow-hidden group">
                  <span className="relative z-10">Login / Signup</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-heritage-bronze to-heritage-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </Link>
              </motion.div>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t"
            >
              <div className="px-4 py-4 space-y-4">
                <Link href="#features" className="block text-gray-700 hover:text-heritage-maroon">
                  Features
                </Link>
                <Link href="#about" className="block text-gray-700 hover:text-heritage-maroon">
                  About
                </Link>
                <Link href="/contact" className="block text-gray-700 hover:text-heritage-maroon">
                  Contact
                </Link>
                <Link href="/auth/supabase" className="btn-heritage block text-center">
                  Login / Signup
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Images */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-heritage-maroon/90 via-heritage-deepMaroon/85 to-heritage-bronze/80 z-10" />
          
          {/* Primary Background - Howrah Bridge */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1590736969955-71cc94901144?w=1920&h=1080&fit=crop&crop=center')`,
              transform: `translateY(${scrollY * 0.5}px)`,
            }}
          />
          
          {/* Secondary Background - Durga Puja */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1920&h=1080&fit=crop&crop=center')`,
              transform: `translateY(${scrollY * 0.3}px)`,
            }}
          />
          
          {/* Tertiary Background - Bengali Heritage */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=1080&fit=crop&crop=center')`,
              transform: `translateY(${scrollY * 0.2}px)`,
            }}
          />
        </div>
        
        {/* Cultural Pattern Overlay */}
        <div className="absolute inset-0 z-20">
          <div className="absolute inset-0 bg-heritage-pattern opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-heritage-maroon/30 via-transparent to-heritage-maroon/30" />
        </div>

        {/* Floating Cultural Elements */}
        <motion.div
          animate={{ 
            y: [0, -30, 0],
            rotate: [0, 5, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-32 h-32 opacity-25 z-30"
        >
          <div className="w-full h-full bg-gradient-to-r from-heritage-gold to-heritage-bronze rounded-full flex items-center justify-center shadow-2xl">
            <span className="text-heritage-maroon text-4xl">🪔</span>
          </div>
        </motion.div>
        
        <motion.div
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -5, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-10 w-40 h-40 opacity-25 z-30"
        >
          <div className="w-full h-full bg-gradient-to-r from-bengali-red to-bengali-yellow rounded-full flex items-center justify-center shadow-2xl">
            <span className="text-white text-5xl">🎭</span>
          </div>
        </motion.div>

        <motion.div
          animate={{ 
            x: [0, 20, 0],
            y: [0, -20, 0],
            rotate: [0, 10, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 right-20 w-24 h-24 opacity-30 z-30"
        >
          <div className="w-full h-full bg-gradient-to-r from-heritage-sage to-bengali-green rounded-full flex items-center justify-center shadow-xl">
            <span className="text-heritage-maroon text-3xl">🏛️</span>
          </div>
        </motion.div>
        
        {/* Additional Bengali Festival Elements */}
        <motion.div
          animate={{ 
            x: [0, -25, 0],
            y: [0, 15, 0],
            rotate: [0, -8, 0]
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-20 h-20 opacity-20 z-30"
        >
          <div className="w-full h-full bg-gradient-to-r from-bengali-blue to-heritage-maroon rounded-full flex items-center justify-center shadow-lg">
            <span className="text-heritage-gold text-2xl">🌺</span>
          </div>
        </motion.div>
        
        <motion.div
          animate={{ 
            x: [0, 30, 0],
            y: [0, -25, 0],
            rotate: [0, 15, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/3 left-1/3 w-28 h-28 opacity-25 z-30"
        >
          <div className="w-full h-full bg-gradient-to-r from-heritage-terracotta to-heritage-gold rounded-full flex items-center justify-center shadow-xl">
            <span className="text-heritage-maroon text-3xl">🥘</span>
          </div>
        </motion.div>
        
        <motion.div
          animate={{ 
            y: [0, -35, 0],
            x: [0, 10, 0],
            rotate: [0, -12, 0]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-2/3 right-1/3 w-16 h-16 opacity-20 z-30"
        >
          <div className="w-full h-full bg-gradient-to-r from-bengali-green to-heritage-bronze rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white text-xl">�</span>
          </div>
        </motion.div>
        
        <div className="relative z-40 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-5xl md:text-7xl font-heritage font-bold text-white leading-tight">
              Discover the Soul of
              <span className="block text-heritage-gold font-bengali text-6xl md:text-8xl">
                বাংলা
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-heritage-beige max-w-2xl mx-auto leading-relaxed">
              Experience the rich heritage, vibrant culture, and timeless beauty of Bengal 
              through personalized journeys and authentic local experiences.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
              <Link href="/auth/supabase" className="btn-heritage text-lg px-8 py-4">
                Start Your Journey
                <ArrowRight className="ml-2 inline-block" size={20} />
              </Link>
              <button className="btn-heritage-outline bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-heritage-maroon text-lg px-8 py-4">
                Watch Story
              </button>
            </div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-20 left-10 w-16 h-16 bg-heritage-gold/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute bottom-20 right-10 w-24 h-24 bg-heritage-bronze/20 rounded-full blur-xl"
        />
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-heritage-beige via-white to-heritage-beige">
          <div className="absolute inset-0 opacity-5">
            <div 
              className="w-full h-full bg-repeat"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23CD7F32' fill-opacity='0.3'%3E%3Cpath d='M30 30m-20 0a20 20 0 1 1 40 0a20 20 0 1 1 -40 0'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>
        </div>
        
        {/* Floating Cultural Elements */}
        <motion.div
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 3, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 right-20 w-20 h-20 opacity-20"
        >
          <div className="w-full h-full bg-heritage-maroon rounded-full flex items-center justify-center">
            <span className="text-heritage-gold text-2xl">🎪</span>
          </div>
        </motion.div>
        
        <motion.div
          animate={{ 
            x: [0, 15, 0],
            y: [0, -10, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 left-10 w-24 h-24 opacity-15"
        >
          <div className="w-full h-full bg-bengali-green rounded-full flex items-center justify-center">
            <span className="text-white text-3xl">🏺</span>
          </div>
        </motion.div>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-heritage font-bold text-heritage-gradient mb-6">
              Your Complete Bengal Experience
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From ancient temples to modern conveniences, from traditional art to AI-powered planning,
              discover Bengal like never before.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="card-heritage overflow-hidden group cursor-pointer relative"
              >
                {/* Background Image */}
                <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                  <div 
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${feature.bgImage})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/70 to-transparent" />
                </div>
                
                {/* Content */}
                <div className="relative z-10 p-6 text-center">
                  <div className="relative mb-4">
                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <feature.icon className="text-white" size={32} />
                    </div>
                    
                    {/* Cultural Icon Overlay */}
                    <motion.div
                      animate={{ 
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 4, 
                        repeat: Infinity, 
                        ease: "easeInOut",
                        delay: index * 0.5
                      }}
                      className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md text-lg opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      {feature.culturalIcon}
                    </motion.div>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3 text-gray-800 group-hover:text-heritage-maroon transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  
                  {/* Decorative Border */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-heritage-maroon to-heritage-gold group-hover:w-full transition-all duration-500"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white relative overflow-hidden">
        {/* Cultural Background Elements */}
        <div className="absolute inset-0 bengali-cultural"></div>
        
        {/* Floating Elements */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-32 h-32 opacity-10"
        >
          <div 
            className="w-full h-full bg-cover bg-center rounded-full"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=200&h=200&fit=crop&crop=center')" }}
          />
        </motion.div>
        
        <motion.div
          animate={{ 
            x: [0, 15, 0],
            y: [0, -15, 0],
            rotate: [0, -3, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-20 w-40 h-40 opacity-10"
        >
          <div 
            className="w-full h-full bg-cover bg-center rounded-full"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=200&h=200&fit=crop&crop=center')" }}
          />
        </motion.div>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-heritage font-bold text-heritage-gradient mb-6">
                Where Heritage Meets Innovation
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Bhromon bridges the gap between Bengal&apos;s rich cultural heritage and modern travel needs. 
                Our platform combines traditional wisdom with cutting-edge technology to create 
                unforgettable experiences.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                From AI-powered itinerary planning to authentic cultural immersion, 
                we&apos;re redefining how you explore and experience West Bengal.
              </p>
              <Link href="/auth/supabase" className="btn-heritage">
                Explore Now
                <ArrowRight className="ml-2 inline-block" size={20} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="bg-gradient-heritage rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-semibold mb-4">Why Choose Bhromon?</h3>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-heritage-gold rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-heritage-maroon text-sm">✓</span>
                    </div>
                    <span>Authentic local experiences with certified guides</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-heritage-gold rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-heritage-maroon text-sm">✓</span>
                    </div>
                    <span>AI-powered personalized itinerary planning</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-heritage-gold rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-heritage-maroon text-sm">✓</span>
                    </div>
                    <span>Direct support for local artisans and communities</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-heritage-gold rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-heritage-maroon text-sm">✓</span>
                    </div>
                    <span>Comprehensive travel solutions in one platform</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Animated Festival Background */}
        <div className="absolute inset-0 festival-vibes"></div>
        <div className="absolute inset-0 heritage-gradient opacity-90"></div>
        
        {/* Cultural Floating Elements */}
        <motion.div
          animate={{ 
            y: [0, -25, 0],
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 left-20 w-20 h-20 opacity-30"
        >
          <div className="w-full h-full bg-heritage-gold rounded-full flex items-center justify-center">
            <span className="text-heritage-maroon text-3xl">🪔</span>
          </div>
        </motion.div>
        
        <motion.div
          animate={{ 
            y: [0, 25, 0],
            x: [0, 20, 0],
            rotate: [0, -180],
            scale: [1, 0.8, 1]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 right-20 w-24 h-24 opacity-30"
        >
          <div className="w-full h-full bg-bengali-yellow rounded-full flex items-center justify-center">
            <span className="text-heritage-maroon text-4xl">🎭</span>
          </div>
        </motion.div>
        
        <motion.div
          animate={{ 
            x: [0, -30, 0],
            y: [0, -20, 0],
            rotate: [0, 180]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-10 w-16 h-16 opacity-25"
        >
          <div className="w-full h-full bg-bengali-red rounded-full flex items-center justify-center">
            <span className="text-white text-2xl">🌺</span>
          </div>
        </motion.div>
        <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-heritage font-bold text-white mb-6"
              animate={{ 
                textShadow: [
                  "0 0 20px rgba(255,215,0,0.5)",
                  "0 0 30px rgba(255,215,0,0.8)",
                  "0 0 20px rgba(255,215,0,0.5)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              Ready to Begin Your <span className="font-bengali">বাংলা</span> Adventure?
            </motion.h2>
            <motion.p 
              className="text-xl text-heritage-beige mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Join thousands of travelers who have discovered the magic of West Bengal 
              through authentic experiences and expert guidance.
            </motion.p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="/auth/supabase" 
                className="inline-flex items-center bg-white text-heritage-maroon font-semibold py-4 px-8 rounded-lg hover:bg-heritage-beige transition-colors duration-300 text-lg shadow-2xl"
              >
                Get Started Today
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Bengal Heritage Showcase */}
      <section className="py-20 bg-gradient-to-br from-heritage-beige via-heritage-cream to-heritage-sage relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-repeat" style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%238B0000' fill-opacity='0.1'%3E%3Cpath d='M30,5 L35,15 L25,15 Z M30,55 L35,45 L25,45 Z M5,30 L15,35 L15,25 Z M55,30 L45,35 L45,25 Z'/%3E%3C/g%3E%3C/svg%3E")` 
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-heritage-maroon mb-4">
              Bengal's Cultural Treasures
            </h2>
            <p className="text-heritage-bronze text-lg max-w-3xl mx-auto leading-relaxed font-bengali">
              ঐতিহ্যবাহী বাংলার অমূল্য সাংস্কৃতিক সম্পদ
            </p>
            <p className="text-heritage-sage text-base max-w-3xl mx-auto mt-2">
              Explore the timeless heritage and vibrant traditions that make West Bengal unique
            </p>
          </motion.div>

          {/* Heritage Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: 'Victoria Memorial',
                bengali: 'ভিক্টোরিয়া মেমোরিয়াল',
                description: 'A stunning marble monument dedicated to Queen Victoria, showcasing Indo-Saracenic architecture',
                image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=400&fit=crop&crop=center',
                icon: '🏛️',
                color: 'from-heritage-maroon to-heritage-bronze'
              },
              {
                title: 'Howrah Bridge',
                bengali: 'হাওড়া ব্রিজ',
                description: 'The iconic cantilever bridge connecting Kolkata with Howrah, a symbol of modern Bengal',
                image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=500&h=400&fit=crop&crop=center',
                icon: '🌉',
                color: 'from-heritage-bronze to-heritage-gold'
              },
              {
                title: 'Durga Puja',
                bengali: 'দুর্গা পূজা',
                description: 'The grandest festival of Bengal celebrating Goddess Durga with magnificent pandals',
                image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500&h=400&fit=crop&crop=center',
                icon: '🎭',
                color: 'from-heritage-gold to-bengali-red'
              },
              {
                title: 'Dakshineswar Temple',
                bengali: 'দক্ষিণেশ্বর মন্দির',
                description: 'Sacred temple complex where Sri Ramakrishna attained spiritual enlightenment',
                image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=500&h=400&fit=crop&crop=center',
                icon: '🕉️',
                color: 'from-bengali-red to-heritage-sage'
              },
              {
                title: 'Bengali Sweets',
                bengali: 'বাঙালি মিষ্টি',
                description: 'Exquisite confections like rasgulla, sandesh, and mishti doi that define Bengali cuisine',
                image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&h=400&fit=crop&crop=center',
                icon: '🍯',
                color: 'from-heritage-sage to-heritage-bronze'
              },
              {
                title: 'Traditional Crafts',
                bengali: 'ঐতিহ্যবাহী কারুশিল্প',
                description: 'Handwoven textiles, pottery, and artworks that preserve Bengal\'s artistic legacy',
                image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=500&h=400&fit=crop&crop=center',
                icon: '🎨',
                color: 'from-heritage-bronze to-heritage-maroon'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                </div>
                
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <div className={`absolute top-4 right-4 w-12 h-12 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform`}>
                    {item.icon}
                  </div>
                  
                  <div className="transform group-hover:translate-y-[-8px] transition-transform duration-300">
                    <h3 className="text-white font-playfair text-xl font-bold mb-1">
                      {item.title}
                    </h3>
                    <p className="text-heritage-gold font-bengali text-sm mb-2">
                      {item.bengali}
                    </p>
                    <p className="text-heritage-cream text-sm leading-relaxed opacity-90">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Festival Timeline */}
          <motion.div 
            className="bg-gradient-to-r from-heritage-maroon/10 via-heritage-gold/10 to-heritage-bronze/10 rounded-3xl p-8 border border-heritage-gold/20"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-playfair font-bold text-heritage-maroon text-center mb-8">
              Festival Calendar - বাংলার উৎসবের পঞ্জিকা
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                { name: 'Poila Boishakh', bengali: 'পহেলা বৈশাখ', season: 'Spring', icon: '🌸' },
                { name: 'Rabindra Jayanti', bengali: 'রবীন্দ্র জয়ন্তী', season: 'Summer', icon: '📚' },
                { name: 'Rath Yatra', bengali: 'রথযাত্রা', season: 'Monsoon', icon: '🛺' },
                { name: 'Durga Puja', bengali: 'দুর্গা পূজা', season: 'Autumn', icon: '🎭' },
                { name: 'Kali Puja', bengali: 'কালী পূজা', season: 'Late Autumn', icon: '🪔' },
                { name: 'Poush Mela', bengali: 'পৌষ মেলা', season: 'Winter', icon: '🎪' }
              ].map((festival, index) => (
                <motion.div
                  key={index}
                  className="text-center p-4 bg-white/50 rounded-xl hover:bg-white/70 transition-all duration-300 group cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="text-3xl mb-2 group-hover:animate-bounce">{festival.icon}</div>
                  <h4 className="font-semibold text-heritage-maroon text-sm">{festival.name}</h4>
                  <p className="text-heritage-bronze font-bengali text-xs">{festival.bengali}</p>
                  <p className="text-heritage-sage text-xs mt-1">{festival.season}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer 
        className="bg-gradient-to-b from-heritage-maroon via-heritage-bronze to-heritage-sage text-heritage-cream"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Bengali Pattern Border */}
        <div className="h-2 bg-gradient-to-r from-heritage-gold via-bengali-red to-heritage-bronze">
          <div className="h-full bg-repeat-x opacity-50" style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='8' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,4 Q10,0 20,4 Q30,8 40,4' stroke='%23FFD700' stroke-width='1' fill='none'/%3E%3C/svg%3E")` 
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <motion.div 
              className="col-span-1 md:col-span-2"
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center mb-6">
                <div className="bg-heritage-gold p-3 rounded-full mr-4">
                  <Compass className="w-8 h-8 text-heritage-maroon" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold font-playfair">Bhromon</h3>
                  <p className="text-heritage-gold font-bengali">ভ্রমণ - বাংলার সুন্দর যাত্রা</p>
                </div>
              </div>
              <p className="text-heritage-beige leading-relaxed mb-6 max-w-md">
                Experience the rich cultural heritage of West Bengal through authentic local experiences, 
                time-honored traditions, and the warmth of Bengali hospitality.
              </p>
              <div className="flex space-x-4">
                {[
                  { icon: '🎭', label: 'Cultural Tours' },
                  { icon: '🏛️', label: 'Heritage Sites' },
                  { icon: '🍛', label: 'Food Trails' },
                  { icon: '🎨', label: 'Art & Crafts' }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="text-center group cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="text-2xl mb-1 group-hover:animate-bounce">{item.icon}</div>
                    <div className="text-xs text-heritage-beige group-hover:text-heritage-gold transition-colors">
                      {item.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h4 className="text-heritage-gold font-playfair text-xl mb-6 flex items-center">
                <span className="mr-2">🗺️</span> Explore
              </h4>
              <ul className="space-y-3">
                {[
                  'Heritage Sites',
                  'Cultural Tours',
                  'Food Experiences',
                  'Festival Calendar',
                  'Local Guides',
                  'Art Galleries'
                ].map((link, index) => (
                  <li key={index}>
                    <Link href="#" className="text-heritage-beige hover:text-heritage-gold transition-colors group flex items-center">
                      <span className="w-2 h-2 bg-heritage-bronze rounded-full mr-3 group-hover:bg-heritage-gold transition-colors"></span>
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h4 className="text-heritage-gold font-playfair text-xl mb-6 flex items-center">
                <span className="mr-2">🌟</span> Connect
              </h4>
              <div className="space-y-4">
                <div className="flex items-center text-heritage-beige">
                  <span className="text-heritage-gold mr-3">📍</span>
                  <span>Kolkata, West Bengal</span>
                </div>
                <div className="flex items-center text-heritage-beige">
                  <span className="text-heritage-gold mr-3">📧</span>
                  <span>hello@bhromon.com</span>
                </div>
                <div className="flex items-center text-heritage-beige">
                  <span className="text-heritage-gold mr-3">📱</span>
                  <span>+91 98765 43210</span>
                </div>
                
                <div className="pt-4">
                  <p className="text-heritage-beige text-sm mb-3">Follow our cultural journey:</p>
                  <div className="flex space-x-3">
                    {['📱', '💬', '📸', '🎥'].map((social, index) => (
                      <motion.a
                        key={index}
                        href="#"
                        className="text-2xl hover:scale-110 transition-transform"
                        whileHover={{ rotate: 15 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {social}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Section */}
          <motion.div 
            className="border-t border-heritage-bronze mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="text-heritage-beige text-sm mb-4 md:mb-0 flex items-center">
              <span className="mr-2">🏛️</span>
              © 2024 Bhromon. Celebrating Bengal's Cultural Legacy.
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <Link href="#" className="text-heritage-beige hover:text-heritage-gold transition-colors flex items-center">
                <span className="mr-1">🛡️</span> Privacy
              </Link>
              <Link href="#" className="text-heritage-beige hover:text-heritage-gold transition-colors flex items-center">
                <span className="mr-1">📋</span> Terms
              </Link>
              <Link href="#" className="text-heritage-beige hover:text-heritage-gold transition-colors flex items-center">
                <span className="mr-1">🤝</span> Partnership
              </Link>
            </div>
          </motion.div>
          
          {/* Cultural Quote */}
          <motion.div 
            className="text-center mt-8 p-6 bg-gradient-to-r from-heritage-bronze/20 to-heritage-gold/20 rounded-lg border border-heritage-gold/30"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p className="text-heritage-gold font-bengali text-lg mb-2">
              "যেথায় থাকে সবার উপরে মানুষের স্থান"
            </p>
            <p className="text-heritage-beige text-sm italic">
              "Where humanity stands above all" - Rabindranath Tagore
            </p>
          </motion.div>
        </div>
        
        {/* Final Cultural Pattern */}
        <div className="h-3 bg-gradient-to-r from-heritage-gold via-heritage-bronze to-heritage-gold">
          <div className="h-full bg-repeat-x opacity-60" style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='12' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='6' cy='6' r='2' fill='%23FFD700'/%3E%3Ccircle cx='15' cy='6' r='2' fill='%23CD7F32'/%3E%3Ccircle cx='24' cy='6' r='2' fill='%23FFD700'/%3E%3C/svg%3E")` 
          }}></div>
        </div>
      </motion.footer>
    </div>
  )
}
