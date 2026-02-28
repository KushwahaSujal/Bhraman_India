'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { 
  Camera, 
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

export const dynamic = 'force-dynamic'

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = maxScroll > 0 ? currentScrollY / maxScroll : 0
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
      description: 'Explore centuries-old temples, forts, palaces, and architectural marvels across India',
      color: 'from-heritage-maroon to-heritage-bronze',
      bgImage: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&h=300&fit=crop',
      culturalIcon: '\u{1F3DB}\uFE0F'
    },
    {
      icon: Users,
      title: 'Expert Guides',
      description: 'Connect with certified local guides for authentic cultural experiences nationwide',
      color: 'from-indian-blue to-indian-green',
      bgImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
      culturalIcon: '\u{1F468}\u200D\u{1F393}'
    },
    {
      icon: Hotel,
      title: 'Heritage Hotels',
      description: 'Stay in beautifully restored havelis, palaces, and heritage properties',
      color: 'from-heritage-bronze to-heritage-gold',
      bgImage: 'https://images.unsplash.com/photo-1561501900-3701fa6a0864?w=400&h=300&fit=crop',
      culturalIcon: '\u{1F3E8}'
    },
    {
      icon: ChefHat,
      title: 'Cuisine',
      description: 'Discover authentic regional cuisines and food trails from every corner of India',
      color: 'from-indian-saffron to-heritage-gold',
      bgImage: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop',
      culturalIcon: '\u{1F35B}'
    },
    {
      icon: Brain,
      title: 'AI Itinerary',
      description: 'Smart travel planning with AI-powered recommendations and customized routes',
      color: 'from-heritage-sage to-indian-green',
      bgImage: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=400&h=300&fit=crop',
      culturalIcon: '\u{1F9E0}'
    },
    {
      icon: ShoppingCart,
      title: 'Local Artisans',
      description: 'Support local craftsmen and buy authentic Indian handicrafts & textiles',
      color: 'from-heritage-terracotta to-heritage-gold',
      bgImage: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=300&fit=crop',
      culturalIcon: '\u{1F3A8}'
    },
    {
      icon: Calendar,
      title: 'Cultural Events',
      description: 'Join live cultural performances, festivals, and traditional celebrations',
      color: 'from-indian-blue to-heritage-maroon',
      bgImage: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop',
      culturalIcon: '\u{1F3AD}'
    },
    {
      icon: Star,
      title: 'Special Packages',
      description: 'Curated experiences combining culture, adventure, food, and local traditions',
      color: 'from-heritage-gold to-heritage-bronze',
      bgImage: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=400&h=300&fit=crop',
      culturalIcon: '\u2B50'
    }
  ]

  return (
    <div className="min-h-screen bg-heritage-beige">
      {/* Scroll Progress - Tricolor */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indian-saffron via-white to-indian-green z-50 origin-left"
        style={{ scaleX: scrollProgress }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />

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
                whileHover={{ scale: 1.1, rotate: 5, boxShadow: "0 10px 30px rgba(139,0,0,0.3)" }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <span className="text-white font-bold text-xl font-hindi">{'\u092D'}</span>
              </motion.div>
              <h1 className="text-2xl font-heritage font-bold text-heritage-gradient">Bhraman</h1>
            </motion.div>

            <div className="hidden md:flex items-center space-x-8">
              {['Features', 'About', 'Contact'].map((item) => (
                <motion.div key={item} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href={item === 'Contact' ? '/contact' : `#${item.toLowerCase()}`}
                    className="relative text-gray-700 hover:text-heritage-maroon transition-colors duration-300 font-medium group"
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-heritage-maroon to-heritage-gold group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </motion.div>
              ))}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/auth" className="btn-heritage relative overflow-hidden group">
                  <span className="relative z-10">Login / Signup</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-heritage-bronze to-heritage-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </Link>
              </motion.div>
            </div>

            <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t"
            >
              <div className="px-4 py-4 space-y-4">
                <Link href="#features" className="block text-gray-700 hover:text-heritage-maroon">Features</Link>
                <Link href="#about" className="block text-gray-700 hover:text-heritage-maroon">About</Link>
                <Link href="/contact" className="block text-gray-700 hover:text-heritage-maroon">Contact</Link>
                <Link href="/auth" className="btn-heritage block text-center">Login / Signup</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-heritage-maroon/90 via-heritage-deepMaroon/85 to-heritage-bronze/80 z-10" />
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1920&h=1080&fit=crop')",
              transform: `translateY(${scrollY * 0.5}px)`,
            }}
          />
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=1920&h=1080&fit=crop')",
              transform: `translateY(${scrollY * 0.3}px)`,
            }}
          />
        </div>

        <div className="absolute inset-0 z-20">
          <div className="absolute inset-0 bg-heritage-pattern opacity-20" />
        </div>

        {/* Floating Cultural Elements */}
        <motion.div
          animate={{ y: [0, -30, 0], rotate: [0, 5, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-32 h-32 opacity-25 z-30"
        >
          <div className="w-full h-full bg-gradient-to-r from-heritage-gold to-heritage-bronze rounded-full flex items-center justify-center shadow-2xl">
            <span className="text-heritage-maroon text-4xl">{'\u{1FA94}'}</span>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0], scale: [1, 0.9, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-10 w-40 h-40 opacity-25 z-30"
        >
          <div className="w-full h-full bg-gradient-to-r from-indian-saffron to-heritage-gold rounded-full flex items-center justify-center shadow-2xl">
            <span className="text-white text-5xl">{'\u{1F54C}'}</span>
          </div>
        </motion.div>

        <div className="relative z-40 text-center px-4 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-heritage font-bold text-white leading-tight">
              Discover the Soul of
              <span className="block text-heritage-gold font-hindi text-6xl md:text-8xl">{'\u092D\u093E\u0930\u0924'}</span>
            </h1>

            <p className="text-xl md:text-2xl text-heritage-beige max-w-2xl mx-auto leading-relaxed">
              Experience the rich heritage, vibrant culture, and timeless beauty of India
              through personalized journeys and authentic local experiences.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
              <Link href="/auth" className="btn-heritage text-lg px-8 py-4">
                Start Your Journey <ArrowRight className="ml-2 inline-block" size={20} />
              </Link>
              <button className="btn-heritage-outline bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-heritage-maroon text-lg px-8 py-4">
                Watch Story
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute top-20 left-10 w-16 h-16 bg-indian-saffron/20 rounded-full blur-xl" />
        <motion.div animate={{ y: [0, 20, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute bottom-20 right-10 w-24 h-24 bg-heritage-bronze/20 rounded-full blur-xl" />
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-heritage-beige via-white to-heritage-beige"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heritage font-bold text-heritage-gradient mb-6">Your Complete India Experience</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From ancient temples to modern conveniences, from traditional art to AI-powered planning, discover Incredible India like never before.
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
                <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                  <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${feature.bgImage})` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/70 to-transparent" />
                </div>
                <div className="relative z-10 p-6 text-center">
                  <div className="relative mb-4">
                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <feature.icon className="text-white" size={32} />
                    </div>
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
                      className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md text-lg opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      {feature.culturalIcon}
                    </motion.div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800 group-hover:text-heritage-maroon transition-colors duration-300">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-heritage-maroon to-heritage-gold group-hover:w-full transition-all duration-500"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 indian-cultural"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <h2 className="text-4xl md:text-5xl font-heritage font-bold text-heritage-gradient mb-6">Where Heritage Meets Innovation</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Bhraman bridges the gap between India&apos;s rich cultural heritage and modern travel needs.
                Our platform combines traditional wisdom with cutting-edge technology to create unforgettable experiences across the entire nation.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                From AI-powered itinerary planning to authentic cultural immersion, we&apos;re redefining how you explore and experience Incredible India.
              </p>
              <Link href="/auth" className="btn-heritage">Explore Now <ArrowRight className="ml-2 inline-block" size={20} /></Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="relative">
              <div className="bg-gradient-heritage rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-semibold mb-4">Why Choose Bhraman?</h3>
                <ul className="space-y-4">
                  {[
                    'Authentic local experiences with certified guides across 29 states',
                    'AI-powered personalized itinerary planning',
                    'Direct support for local artisans and communities',
                    'Comprehensive travel solutions covering all of India'
                  ].map((text, i) => (
                    <li key={i} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-heritage-gold rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-heritage-maroon text-sm">{'\u2713'}</span>
                      </div>
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 festival-vibes"></div>
        <div className="absolute inset-0 heritage-gradient opacity-90"></div>
        <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <motion.h2
              className="text-4xl md:text-5xl font-heritage font-bold text-white mb-6"
              animate={{ textShadow: ["0 0 20px rgba(255,215,0,0.5)", "0 0 30px rgba(255,215,0,0.8)", "0 0 20px rgba(255,215,0,0.5)"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              Ready to Begin Your <span className="font-hindi">{'\u092D\u093E\u0930\u0924'}</span> Adventure?
            </motion.h2>
            <p className="text-xl text-heritage-beige mb-8 max-w-2xl mx-auto">
              Join thousands of travelers who have discovered the magic of India through authentic experiences and expert guidance.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/auth" className="inline-flex items-center bg-white text-heritage-maroon font-semibold py-4 px-8 rounded-lg hover:bg-heritage-beige transition-colors duration-300 text-lg shadow-2xl">
                Get Started Today <ArrowRight className="ml-2" size={20} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* India Heritage Showcase */}
      <section className="py-20 bg-gradient-to-br from-heritage-beige via-heritage-cream to-heritage-sage relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-heritage-maroon mb-4">India&apos;s Cultural Treasures</h2>
            <p className="text-heritage-bronze text-lg max-w-3xl mx-auto leading-relaxed font-hindi">{'\u0905\u0924\u0941\u0932\u094D\u092F \u092D\u093E\u0930\u0924 \u0915\u0940 \u0905\u092E\u0942\u0932\u094D\u092F \u0938\u093E\u0902\u0938\u094D\u0915\u0943\u0924\u093F\u0915 \u0935\u093F\u0930\u093E\u0938\u0924'}</p>
            <p className="text-heritage-sage text-base max-w-3xl mx-auto mt-2">Explore the timeless heritage and vibrant traditions that make India incredible</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              { title: 'Taj Mahal', hindi: '\u0924\u093E\u091C \u092E\u0939\u0932', description: 'A timeless symbol of love, this white marble masterpiece in Agra is one of the Seven Wonders of the World', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=500&h=400&fit=crop', icon: '\u{1F54C}', color: 'from-heritage-maroon to-heritage-bronze' },
              { title: 'Varanasi Ghats', hindi: '\u0935\u093E\u0930\u093E\u0923\u0938\u0940 \u0915\u0947 \u0918\u093E\u091F', description: 'The spiritual capital of India, where ancient rituals meet the sacred Ganges river', image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=500&h=400&fit=crop', icon: '\u{1FA94}', color: 'from-heritage-bronze to-heritage-gold' },
              { title: 'Hawa Mahal, Jaipur', hindi: '\u0939\u0935\u093E \u092E\u0939\u0932, \u091C\u092F\u092A\u0941\u0930', description: 'The Palace of Winds, an iconic pink sandstone facade with 953 windows in the Pink City', image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=500&h=400&fit=crop', icon: '\u{1F3F0}', color: 'from-heritage-gold to-indian-saffron' },
              { title: 'Kerala Backwaters', hindi: '\u0915\u0947\u0930\u0932 \u0915\u0947 \u092C\u0948\u0915\u0935\u0949\u091F\u0930', description: 'Serene houseboat journeys through lush green waterways and coconut-fringed canals', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=500&h=400&fit=crop', icon: '\u{1F6A2}', color: 'from-indian-green to-heritage-sage' },
              { title: 'Golden Temple, Amritsar', hindi: '\u0938\u094D\u0935\u0930\u094D\u0923 \u092E\u0902\u0926\u093F\u0930, \u0905\u092E\u0943\u0924\u0938\u0930', description: 'The holiest Gurdwara of Sikhism, a stunning golden shrine reflecting in sacred waters', image: 'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=500&h=400&fit=crop', icon: '\u{1F549}\uFE0F', color: 'from-heritage-sage to-heritage-bronze' },
              { title: 'Hampi Ruins', hindi: '\u0939\u092E\u094D\u092A\u0940 \u0915\u0947 \u0916\u0902\u0921\u0939\u0930', description: 'UNESCO World Heritage Site with magnificent ruins of the Vijayanagara Empire in Karnataka', image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=500&h=400&fit=crop', icon: '\u{1F3DB}\uFE0F', color: 'from-heritage-bronze to-heritage-maroon' }
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
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                </div>
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <div className={`absolute top-4 right-4 w-12 h-12 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform`}>{item.icon}</div>
                  <div className="transform group-hover:translate-y-[-8px] transition-transform duration-300">
                    <h3 className="text-white font-playfair text-xl font-bold mb-1">{item.title}</h3>
                    <p className="text-heritage-gold font-hindi text-sm mb-2">{item.hindi}</p>
                    <p className="text-heritage-cream text-sm leading-relaxed opacity-90">{item.description}</p>
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
              Festival Calendar - <span className="font-hindi">{'\u092D\u093E\u0930\u0924 \u0915\u0947 \u0924\u094D\u092F\u094B\u0939\u093E\u0930'}</span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                { name: 'Holi', hindi: '\u0939\u094B\u0932\u0940', season: 'Spring', icon: '\u{1F3A8}' },
                { name: 'Diwali', hindi: '\u0926\u0940\u092A\u093E\u0935\u0932\u0940', season: 'Autumn', icon: '\u{1FA94}' },
                { name: 'Navratri', hindi: '\u0928\u0935\u0930\u093E\u0924\u094D\u0930\u093F', season: 'Autumn', icon: '\u{1F483}' },
                { name: 'Eid ul-Fitr', hindi: '\u0908\u0926 \u0909\u0932-\u092B\u093C\u093F\u0924\u094D\u0930', season: 'Varies', icon: '\u{1F319}' },
                { name: 'Pongal', hindi: '\u092A\u094B\u0902\u0917\u0932', season: 'Winter', icon: '\u{1F33E}' },
                { name: 'Onam', hindi: '\u0913\u0923\u092E', season: 'Monsoon', icon: '\u{1F6A3}' }
              ].map((festival, index) => (
                <motion.div
                  key={index}
                  className="text-center p-4 bg-white/50 rounded-xl hover:bg-white/70 transition-all duration-300 group cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="text-3xl mb-2 group-hover:animate-bounce">{festival.icon}</div>
                  <h4 className="font-semibold text-heritage-maroon text-sm">{festival.name}</h4>
                  <p className="text-heritage-bronze font-hindi text-xs">{festival.hindi}</p>
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
        <div className="h-2 bg-gradient-to-r from-indian-saffron via-white to-indian-green"></div>
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <motion.div className="col-span-1 md:col-span-2" initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
              <div className="flex items-center mb-6">
                <div className="bg-heritage-gold p-3 rounded-full mr-4"><Compass className="w-8 h-8 text-heritage-maroon" /></div>
                <div>
                  <h3 className="text-3xl font-bold font-playfair">Bhraman</h3>
                  <p className="text-heritage-gold font-hindi">{'\u092D\u094D\u0930\u092E\u0923 - \u0905\u0924\u0941\u0932\u094D\u092F \u092D\u093E\u0930\u0924 \u0915\u0940 \u092F\u093E\u0924\u094D\u0930\u093E'}</p>
                </div>
              </div>
              <p className="text-heritage-beige leading-relaxed mb-6 max-w-md">
                Experience the rich cultural heritage of India through authentic local experiences, time-honored traditions, and the warmth of Indian hospitality across 29 states.
              </p>
              <div className="flex space-x-4">
                {[
                  { icon: '\u{1F3AD}', label: 'Cultural Tours' },
                  { icon: '\u{1F3DB}\uFE0F', label: 'Heritage Sites' },
                  { icon: '\u{1F35B}', label: 'Food Trails' },
                  { icon: '\u{1F3A8}', label: 'Art & Crafts' }
                ].map((item, index) => (
                  <motion.div key={index} className="text-center group cursor-pointer" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                    <div className="text-2xl mb-1 group-hover:animate-bounce">{item.icon}</div>
                    <div className="text-xs text-heritage-beige group-hover:text-heritage-gold transition-colors">{item.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
              <h4 className="text-heritage-gold font-playfair text-xl mb-6 flex items-center"><span className="mr-2">{'\u{1F5FA}\uFE0F'}</span> Explore</h4>
              <ul className="space-y-3">
                {['Heritage Sites', 'Cultural Tours', 'Food Experiences', 'Festival Calendar', 'Local Guides', 'Art Galleries'].map((link, index) => (
                  <li key={index}>
                    <Link href="#" className="text-heritage-beige hover:text-heritage-gold transition-colors group flex items-center">
                      <span className="w-2 h-2 bg-heritage-bronze rounded-full mr-3 group-hover:bg-heritage-gold transition-colors"></span>{link}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
              <h4 className="text-heritage-gold font-playfair text-xl mb-6 flex items-center"><span className="mr-2">{'\u{1F31F}'}</span> Connect</h4>
              <div className="space-y-4">
                <div className="flex items-center text-heritage-beige"><span className="text-heritage-gold mr-3">{'\u{1F4CD}'}</span><span>New Delhi, India</span></div>
                <div className="flex items-center text-heritage-beige"><span className="text-heritage-gold mr-3">{'\u{1F4E7}'}</span><span>hello@bhraman.in</span></div>
                <div className="flex items-center text-heritage-beige"><span className="text-heritage-gold mr-3">{'\u{1F4F1}'}</span><span>+91 98765 43210</span></div>
                <div className="pt-4">
                  <p className="text-heritage-beige text-sm mb-3">Follow our cultural journey:</p>
                  <div className="flex space-x-3">
                    {['\u{1F4F1}', '\u{1F4AC}', '\u{1F4F8}', '\u{1F3A5}'].map((social, index) => (
                      <motion.a key={index} href="#" className="text-2xl hover:scale-110 transition-transform" whileHover={{ rotate: 15 }} whileTap={{ scale: 0.9 }}>{social}</motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div className="border-t border-heritage-bronze mt-12 pt-8 flex flex-col md:flex-row justify-between items-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <div className="text-heritage-beige text-sm mb-4 md:mb-0 flex items-center">
              <span className="mr-2">{'\u{1F3DB}\uFE0F'}</span>{'\u00A9'} 2026 Bhraman. Celebrating India&apos;s Cultural Legacy.
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <Link href="#" className="text-heritage-beige hover:text-heritage-gold transition-colors flex items-center"><span className="mr-1">{'\u{1F6E1}\uFE0F'}</span> Privacy</Link>
              <Link href="#" className="text-heritage-beige hover:text-heritage-gold transition-colors flex items-center"><span className="mr-1">{'\u{1F4CB}'}</span> Terms</Link>
              <Link href="#" className="text-heritage-beige hover:text-heritage-gold transition-colors flex items-center"><span className="mr-1">{'\u{1F91D}'}</span> Partnership</Link>
            </div>
          </motion.div>

          <motion.div className="text-center mt-8 p-6 bg-gradient-to-r from-heritage-bronze/20 to-heritage-gold/20 rounded-lg border border-heritage-gold/30" initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ delay: 0.6 }}>
            <p className="text-heritage-gold font-hindi text-lg mb-2">{'\u201C\u0935\u0938\u0941\u0927\u0948\u0935 \u0915\u0941\u091F\u0941\u092E\u094D\u092C\u0915\u092E\u094D\u201D'}</p>
            <p className="text-heritage-beige text-sm italic">&quot;The world is one family&quot; - Ancient Indian philosophy</p>
          </motion.div>
        </div>
        <div className="h-3 bg-gradient-to-r from-indian-saffron via-white to-indian-green"></div>
      </motion.footer>
    </div>
  )
}
