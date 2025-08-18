'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useAuth } from '@/lib/providers/auth-provider'
import { useRouter } from 'next/navigation'
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
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  Heart,
  Clock,
  Cloud
} from 'lucide-react'
import WeatherCard from '@/components/WeatherCard'
import DestinationsWeather from '@/components/DestinationsWeather'
import AIItineraryGenerator from '@/components/AIItineraryGenerator'
import AIChatAssistant from '@/components/AIChatAssistant'

export const dynamic = 'force-dynamic'

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState('overview')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    city: '',
    state: 'West Bengal',
    pincode: '',
    travelPreferences: '',
    culturalInterests: [] as string[],
    emergencyContact: '',
    bio: ''
  })
  const [updateStatus, setUpdateStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [isChatOpen, setIsChatOpen] = useState(false)
  const { user, loading, signOut } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/supabase')
    } else if (user) {
      // Debug: Check user data
      console.log('User data:', user)
      console.log('User metadata:', user.user_metadata)
      console.log('Full name from metadata:', user.user_metadata?.full_name)
      
      // Load existing profile data
      setProfileData(prev => ({
        ...prev,
        fullName: user.user_metadata?.full_name || '',
        email: user.email || '',
        phone: user.user_metadata?.phone || '',
        // Load other data from local storage or API if needed
      }))
    }
  }, [user, loading, router])

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setUpdateStatus('loading')
    
    try {
      // Simulate API call - Replace with actual Supabase update
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Here you would typically update user metadata in Supabase
      // const { error } = await supabase.auth.updateUser({
      //   data: {
      //     full_name: profileData.fullName,
      //     phone: profileData.phone,
      //     // other fields
      //   }
      // })
      
      setUpdateStatus('success')
      setIsEditingProfile(false)
      
      // Show success message
      setTimeout(() => setUpdateStatus('idle'), 3000)
    } catch (error) {
      setUpdateStatus('error')
      setTimeout(() => setUpdateStatus('idle'), 3000)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleInterestToggle = (interest: string) => {
    setProfileData(prev => ({
      ...prev,
      culturalInterests: prev.culturalInterests.includes(interest)
        ? prev.culturalInterests.filter(i => i !== interest)
        : [...prev.culturalInterests, interest]
    }))
  }

  const handleSignOut = async () => {
    await signOut()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-heritage-beige to-heritage-cream flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-heritage-maroon border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-heritage-bronze font-bengali">লোড হচ্ছে...</p>
          <p className="text-heritage-sage">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect to auth page
  }

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: Star },
    { id: 'weather', label: 'Weather Info', icon: Cloud },
    { id: 'heritage', label: 'Heritage Sights', icon: Camera },
    { id: 'guides', label: 'Guide Selection', icon: Users },
    { id: 'hotels', label: 'Hotels', icon: Hotel },
    { id: 'food', label: 'Food & Culture', icon: ChefHat },
    { id: 'itinerary', label: 'AI Itinerary', icon: Brain },
    { id: 'ecommerce', label: 'Local Shopping', icon: ShoppingCart },
    { id: 'experiences', label: 'Cultural Events', icon: Calendar },
    { id: 'packages', label: 'Special Packages', icon: MapPin },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  const quickStats = [
    { 
      label: 'Heritage Sites Explored', 
      bengali: 'ঐতিহ্যবাহী স্থান',
      value: '12', 
      icon: '🏛️',
      color: 'from-heritage-maroon to-heritage-bronze',
      description: 'Ancient temples & monuments'
    },
    { 
      label: 'Cultural Festivals', 
      bengali: 'সাংস্কৃতিক উৎসব',
      value: '3', 
      icon: '🎭',
      color: 'from-red-600 to-orange-500',
      description: 'Durga Puja, Kali Puja experiences'
    },
    { 
      label: 'Artisan Purchases', 
      bengali: 'কারুশিল্প কেনাকাটা',
      value: '₹2,450', 
      icon: '🎨',
      color: 'from-heritage-gold to-amber-600',
      description: 'Handloom & handicrafts'
    },
    { 
      label: 'Food Adventures', 
      bengali: 'খাদ্য অভিজ্ঞতা',
      value: '8', 
      icon: '🍛',
      color: 'from-green-600 to-emerald-500',
      description: 'Authentic Bengali cuisine'
    },
  ]

  const recentActivities = [
    { 
      action: 'Visited Dakshineswar Kali Temple', 
      location: 'Dakshineswar, Kolkata',
      time: '2 hours ago', 
      icon: Camera,
      bengali: 'দক্ষিণেশ্বর কালী মন্দির',
      type: 'heritage'
    },
    { 
      action: 'Booked Heritage Walk with Local Guide', 
      location: 'North Kolkata Heritage Trail',
      time: '1 day ago', 
      icon: Users,
      bengali: 'ঐতিহ্য ভ্রমণ',
      type: 'guide'
    },
    { 
      action: 'Purchased Kantha Embroidered Saree', 
      location: 'Shyambazar Traditional Market',
      time: '2 days ago', 
      icon: ShoppingCart,
      bengali: 'কাঁথা শাড়ি',
      type: 'shopping'
    },
    { 
      action: 'Attended Rabindra Sangeet Evening', 
      location: 'Rabindra Sadan Cultural Center',
      time: '3 days ago', 
      icon: Calendar,
      bengali: 'রবীন্দ্র সংগীত সন্ধ্যা',
      type: 'cultural'
    },
    {
      action: 'Enjoyed Hilsa Fish Thali',
      location: 'Oh! Calcutta Restaurant',
      time: '4 days ago',
      icon: ChefHat,
      bengali: 'ইলিশ মাছ',
      type: 'food'
    }
  ]

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-8">
            {/* Welcome Section with Bengali Culture */}
            <div className="relative heritage-gradient rounded-3xl p-8 text-white overflow-hidden">
              <div className="absolute top-0 right-0 opacity-10 text-9xl">🏛️</div>
              <div className="absolute bottom-0 left-0 opacity-10 text-8xl">🎭</div>
              <div className="relative z-10">
                <h1 className="text-4xl font-heritage font-bold mb-2">
                  স্বাগতম! Welcome back, {user?.user_metadata?.full_name || profileData.fullName || 'Traveler'}!
                </h1>
                <p className="text-heritage-beige text-lg mb-4">
                  Continue your journey through the rich cultural tapestry of পশ্চিমবঙ্গ (West Bengal)
                </p>
                <div className="flex items-center space-x-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-heritage-gold rounded-full animate-pulse"></div>
                    <span>Current Season: শীত (Winter) - Perfect for Heritage Tours</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card-heritage p-6 group hover:shadow-2xl transition-all duration-300"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-3xl">{stat.icon}</span>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1">{stat.label}</h3>
                  <p className="text-heritage-gold font-noto-bengali text-sm mb-2">{stat.bengali}</p>
                  <p className="text-3xl font-bold text-heritage-maroon mb-2">{stat.value}</p>
                  <p className="text-xs text-gray-600">{stat.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Cultural Highlights Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Activities - Enhanced */}
              <div className="lg:col-span-2 card-heritage p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-gray-800">Recent Adventures</h2>
                  <span className="text-heritage-gold font-noto-bengali">সাম্প্রতিক অভিজ্ঞতা</span>
                </div>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <motion.div 
                      key={index} 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-r from-heritage-beige/50 to-white hover:from-heritage-beige to-heritage-cream transition-all duration-300 border border-heritage-bronze/10"
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        activity.type === 'heritage' ? 'bg-red-100 text-red-600' :
                        activity.type === 'guide' ? 'bg-blue-100 text-blue-600' :
                        activity.type === 'shopping' ? 'bg-green-100 text-green-600' :
                        activity.type === 'cultural' ? 'bg-purple-100 text-purple-600' :
                        'bg-orange-100 text-orange-600'
                      }`}>
                        <activity.icon size={20} />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">{activity.action}</p>
                        <p className="text-heritage-gold font-noto-bengali text-sm">{activity.bengali}</p>
                        <p className="text-sm text-gray-600">{activity.location}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Cultural Calendar & Recommendations */}
              <div className="space-y-6">
                {/* Upcoming Festivals */}
                <div className="card-heritage p-6">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-heritage-maroon" />
                    Bengali Festivals
                  </h3>
                  <div className="space-y-4 max-h-80 overflow-y-auto">
                    <div className="border-l-4 border-heritage-maroon pl-4">
                      <h4 className="font-semibold text-heritage-maroon">Durga Puja</h4>
                      <p className="text-heritage-gold font-noto-bengali text-sm">দুর্গা পূজা</p>
                      <p className="text-xs text-gray-600 mt-1">Sep-Oct • Biggest Bengali festival celebrating Goddess Durga's victory over evil. 5-day celebration with elaborate pandals, cultural programs, and community feasting.</p>
                    </div>
                    
                    <div className="border-l-4 border-heritage-bronze pl-4">
                      <h4 className="font-semibold text-heritage-bronze">Kali Puja</h4>
                      <p className="text-heritage-gold font-noto-bengali text-sm">কালী পূজা</p>
                      <p className="text-xs text-gray-600 mt-1">Oct-Nov • Night festival dedicated to Goddess Kali, celebrated with elaborate decorations, fireworks, and traditional sweets.</p>
                    </div>
                    
                    <div className="border-l-4 border-heritage-gold pl-4">
                      <h4 className="font-semibold text-heritage-gold">Poila Boishakh</h4>
                      <p className="text-heritage-gold font-noto-bengali text-sm">পহেলা বৈশাখ</p>
                      <p className="text-xs text-gray-600 mt-1">Apr 14 • Bengali New Year with traditional processions, cultural performances, and special Bengali cuisine.</p>
                    </div>
                    
                    <div className="border-l-4 border-purple-500 pl-4">
                      <h4 className="font-semibold text-purple-500">Saraswati Puja</h4>
                      <p className="text-heritage-gold font-noto-bengali text-sm">সরস্বতী পূজা</p>
                      <p className="text-xs text-gray-600 mt-1">Jan-Feb • Celebration of knowledge and arts, when students worship books and musical instruments.</p>
                    </div>
                    
                    <div className="border-l-4 border-green-500 pl-4">
                      <h4 className="font-semibold text-green-500">Jagaddhatri Puja</h4>
                      <p className="text-heritage-gold font-noto-bengali text-sm">জগদ্ধাত্রী পূজা</p>
                      <p className="text-xs text-gray-600 mt-1">Nov • Post-Kali Puja celebration, especially grand in Chandernagore with beautiful clay idols and processions.</p>
                    </div>
                    
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-semibold text-blue-500">Lakshmi Puja</h4>
                      <p className="text-heritage-gold font-noto-bengali text-sm">লক্ষ্মী পূজা</p>
                      <p className="text-xs text-gray-600 mt-1">Oct-Nov • Wealth and prosperity celebration with alpana (rangoli) decorations and traditional offerings.</p>
                    </div>
                    
                    <div className="border-l-4 border-red-500 pl-4">
                      <h4 className="font-semibold text-red-500">Bhai Phonta</h4>
                      <p className="text-heritage-gold font-noto-bengali text-sm">ভাই ফোঁটা</p>
                      <p className="text-xs text-gray-600 mt-1">Oct-Nov • Sister-brother bonding festival similar to Raksha Bandhan, with tilaka ceremony and special meals.</p>
                    </div>
                    
                    <div className="border-l-4 border-orange-500 pl-4">
                      <h4 className="font-semibold text-orange-500">Basanti Puja</h4>
                      <p className="text-heritage-gold font-noto-bengali text-sm">বাসন্তী পূজা</p>
                      <p className="text-xs text-gray-600 mt-1">Feb-Mar • Spring celebration of Goddess Durga with yellow theme, cultural programs, and seasonal delicacies.</p>
                    </div>
                    
                    <div className="border-l-4 border-pink-500 pl-4">
                      <h4 className="font-semibold text-pink-500">Rash Yatra</h4>
                      <p className="text-heritage-gold font-noto-bengali text-sm">রাস যাত্রা</p>
                      <p className="text-xs text-gray-600 mt-1">Nov • Krishna's divine dance celebration with traditional folk performances and chariot processions.</p>
                    </div>
                    
                    <div className="border-l-4 border-teal-500 pl-4">
                      <h4 className="font-semibold text-teal-500">Ganga Aarti</h4>
                      <p className="text-heritage-gold font-noto-bengali text-sm">গঙ্গা আরতি</p>
                      <p className="text-xs text-gray-600 mt-1">Daily • Evening river worship at ghats with floating diyas, devotional songs, and spiritual atmosphere.</p>
                    </div>
                    
                    <div className="border-l-4 border-indigo-500 pl-4">
                      <h4 className="font-semibold text-indigo-500">Rabindra Jayanti</h4>
                      <p className="text-heritage-gold font-noto-bengali text-sm">রবীন্দ্র জয়ন্তী</p>
                      <p className="text-xs text-gray-600 mt-1">May 7 • Tagore's birth anniversary with cultural programs, Rabindra Sangeet performances, and poetry recitations.</p>
                    </div>
                    
                    <div className="border-l-4 border-yellow-500 pl-4">
                      <h4 className="font-semibold text-yellow-500">Netaji Jayanti</h4>
                      <p className="text-heritage-gold font-noto-bengali text-sm">নেতাজি জয়ন্তী</p>
                      <p className="text-xs text-gray-600 mt-1">Jan 23 • Subhas Chandra Bose's birthday with patriotic programs and cultural events across Bengal.</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-heritage-beige/50">
                    <button className="w-full btn-heritage-outline text-sm py-2 hover:bg-heritage-maroon hover:text-white transition-colors">
                      View Festival Calendar
                    </button>
                  </div>
                </div>

                {/* Weather & Season Info */}
                <div className="card-heritage p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">
                    Weather in Kolkata
                  </h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-gray-800">23°C</p>
                      <p className="text-sm text-gray-600">Pleasant & Clear</p>
                      <p className="text-heritage-gold font-noto-bengali text-sm">মনোরম আবহাওয়া</p>
                    </div>
                    <div className="text-4xl">☀️</div>
                  </div>
                  <p className="text-sm text-gray-600 mt-3">
                    Perfect weather for heritage site visits and outdoor cultural events!
                  </p>
                </div>
              </div>
            </div>

            {/* Recommendations Section - Enhanced */}
            <div className="card-heritage p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Curated for You</h2>
                <span className="text-heritage-gold font-noto-bengali">আপনার জন্য নির্বাচিত</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="border border-heritage-beige rounded-2xl p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-heritage-beige/20"
                >
                  <div className="flex items-center mb-4">
                    <span className="text-3xl mr-3">🐅</span>
                    <div>
                      <h3 className="font-semibold text-heritage-maroon">Sundarbans Mangrove Tour</h3>
                      <p className="text-heritage-gold font-noto-bengali text-sm">সুন্দরবন ভ্রমণ</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">3-day Royal Bengal Tiger expedition with experienced forest guides</p>
                  <div className="flex justify-between items-center">
                    <span className="text-heritage-bronze font-bold text-lg">₹8,500</span>
                    <button className="btn-heritage text-sm px-4 py-2">Book Now</button>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="border border-heritage-beige rounded-2xl p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-heritage-beige/20"
                >
                  <div className="flex items-center mb-4">
                    <span className="text-3xl mr-3">🏺</span>
                    <div>
                      <h3 className="font-semibold text-heritage-maroon">Bishnupur Pottery Workshop</h3>
                      <p className="text-heritage-gold font-noto-bengali text-sm">বিষ্ণুপুর মৃৎশিল্প</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Learn traditional terracotta art from master craftsmen</p>
                  <div className="flex justify-between items-center">
                    <span className="text-heritage-bronze font-bold text-lg">₹2,200</span>
                    <button className="btn-heritage text-sm px-4 py-2">Book Now</button>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="border border-heritage-beige rounded-2xl p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-heritage-beige/20"
                >
                  <div className="flex items-center mb-4">
                    <span className="text-3xl mr-3">🎵</span>
                    <div>
                      <h3 className="font-semibold text-heritage-maroon">Rabindra Sangeet Night</h3>
                      <p className="text-heritage-gold font-noto-bengali text-sm">রবীন্দ্র সংগীত</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Evening of Tagore's music at Rabindra Sadan</p>
                  <div className="flex justify-between items-center">
                    <span className="text-heritage-bronze font-bold text-lg">₹750</span>
                    <button className="btn-heritage text-sm px-4 py-2">Book Now</button>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Weather Information Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <DestinationsWeather />
              </div>
              <div>
                <WeatherCard 
                  location="Kolkata, West Bengal" 
                  showForecast={true}
                />
              </div>
            </div>
          </div>
        )

      case 'heritage':
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-heritage font-bold text-heritage-maroon">Heritage Sights</h1>
                <p className="text-heritage-gold font-noto-bengali text-lg">ঐতিহ্যবাহী দর্শনীয় স্থান</p>
              </div>
              <div className="flex items-center space-x-4">
                <select className="px-4 py-2 border border-heritage-bronze/30 rounded-xl focus:border-heritage-maroon">
                  <option>All Districts</option>
                  <option>Kolkata</option>
                  <option>Darjeeling</option>
                  <option>Murshidabad</option>
                  <option>Bishnupur</option>
                </select>
                <button className="btn-heritage">Add to Wishlist</button>
              </div>
            </div>
            
            {/* Featured Heritage Sites */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: 'Victoria Memorial',
                  bengali: 'ভিক্টোরিয়া মেমোরিয়াল',
                  location: 'Kolkata',
                  image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
                  description: 'Iconic white marble monument built in memory of Queen Victoria, showcasing Indo-Saracenic architecture',
                  rating: 4.8,
                  timeNeeded: '2-3 hours',
                  entryFee: '₹30',
                  highlights: ['British Architecture', 'Museum', 'Gardens', 'Light & Sound Show'],
                  bestTime: 'Morning & Evening'
                },
                {
                  name: 'Dakshineswar Kali Temple',
                  bengali: 'দক্ষিণেশ্বর কালী মন্দির',
                  location: 'Dakshineswar, Kolkata',
                  image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400',
                  description: 'Famous Kali temple by the river Ganges, associated with Sri Ramakrishna Paramahamsa',
                  rating: 4.9,
                  timeNeeded: '1-2 hours',
                  entryFee: 'Free',
                  highlights: ['Spiritual Experience', 'River Ganges', 'Architecture', 'Aarti Ceremony'],
                  bestTime: 'Early Morning'
                },
                {
                  name: 'Bishnupur Terracotta Temples',
                  bengali: 'বিষ্ণুপুর টেরাকোটা মন্দির',
                  location: 'Bishnupur',
                  image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400',
                  description: 'Ancient terracotta temples showcasing exquisite Bengali temple architecture and craftsmanship',
                  rating: 4.7,
                  timeNeeded: 'Full day',
                  entryFee: '₹25',
                  highlights: ['Terracotta Art', 'Malla Dynasty', 'Archaeological Site', 'Photography'],
                  bestTime: 'Winter Season'
                },
                {
                  name: 'Murshidabad Hazarduari Palace',
                  bengali: 'মুর্শিদাবাদ হাজারদুয়ারী প্রাসাদ',
                  location: 'Murshidabad',
                  image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
                  description: 'Magnificent palace with 1000 doors, former capital of Bengal Nawabs with rich Mughal heritage',
                  rating: 4.6,
                  timeNeeded: 'Half day',
                  entryFee: '₹15',
                  highlights: ['Mughal Architecture', 'Royal Artifacts', 'History Museum', 'Nawabi Culture'],
                  bestTime: 'Morning'
                },
                {
                  name: 'Cooch Behar Rajbari',
                  bengali: 'কুচবিহার রাজবাড়ি',
                  location: 'Cooch Behar',
                  image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400',
                  description: 'Italian Renaissance style royal palace of Koch dynasty, inspired by Buckingham Palace',
                  rating: 4.5,
                  timeNeeded: '2-3 hours',
                  entryFee: '₹20',
                  highlights: ['Royal Palace', 'Italian Architecture', 'Koch Dynasty', 'Royal Gardens'],
                  bestTime: 'All Day'
                },
                {
                  name: 'Malda Gour Archaeological Site',
                  bengali: 'মালদা গৌড় প্রত্নতাত্ত্বিক স্থান',
                  location: 'Malda',
                  image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400',
                  description: 'Ancient capital of Bengal Sultanate with mosques, tombs and fortifications dating back to 13th century',
                  rating: 4.4,
                  timeNeeded: 'Full day',
                  entryFee: '₹25',
                  highlights: ['Sultanate Architecture', 'Ancient Mosques', 'Historical Ruins', 'Archaeological Value'],
                  bestTime: 'Winter Morning'
                }
              ].map((site, index) => (
                <motion.div
                  key={site.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card-heritage overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-500"
                >
                  <div className="relative h-56 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-heritage-beige to-heritage-bronze" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute top-4 right-4">
                      <Heart className="w-6 h-6 text-white hover:text-heritage-gold cursor-pointer transition-colors" />
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-heritage-maroon text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {site.entryFee}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="flex items-center space-x-2 mb-2">
                        <Star className="w-4 h-4 fill-heritage-gold text-heritage-gold" />
                        <span className="font-semibold">{site.rating}</span>
                        <span className="text-sm opacity-80">• {site.bestTime}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">{site.name}</h3>
                    <p className="text-heritage-gold font-noto-bengali text-sm mb-2">{site.bengali}</p>
                    <p className="text-heritage-maroon flex items-center mb-3">
                      <MapPin size={16} className="mr-1" />
                      {site.location}
                    </p>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{site.description}</p>
                    
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {site.highlights.slice(0, 3).map((highlight, idx) => (
                          <span key={idx} className="text-xs bg-heritage-beige text-heritage-maroon px-2 py-1 rounded-full">
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 flex items-center">
                        <Clock size={16} className="mr-1" />
                        {site.timeNeeded}
                      </span>
                      <button className="btn-heritage-outline text-sm px-6 py-2 hover:bg-heritage-maroon hover:text-white transition-colors">
                        Explore
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Heritage Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {[
                { name: 'Temples & Monuments', count: '25+', icon: '🏛️', color: 'from-red-500 to-red-700' },
                { name: 'Colonial Architecture', count: '15+', icon: '🏢', color: 'from-blue-500 to-blue-700' },
                { name: 'Museums & Galleries', count: '12+', icon: '🎨', color: 'from-green-500 to-green-700' },
                { name: 'Historical Sites', count: '20+', icon: '📜', color: 'from-purple-500 to-purple-700' },
              ].map((category, index) => (
                <motion.div
                  key={category.name}
                  whileHover={{ scale: 1.05 }}
                  className="card-heritage p-6 text-center cursor-pointer group"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <span className="text-3xl">{category.icon}</span>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1">{category.name}</h3>
                  <p className="text-heritage-maroon font-bold text-lg">{category.count}</p>
                </motion.div>
              ))}
            </div>

            {/* Offbeat Heritage Places */}
            <div className="mt-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-heritage-maroon mb-2">Hidden Gems of Bengal</h2>
                <p className="text-heritage-gold font-noto-bengali text-lg">বাংলার গুপ্ত রত্ন</p>
                <p className="text-gray-600 mt-2">Discover the lesser-known heritage treasures of West Bengal</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    name: 'Kantaji Temple',
                    bengali: 'কান্তজীর মন্দির',
                    location: 'Dinajpur (now in Bangladesh border)',
                    description: 'Exquisite 18th-century terracotta temple dedicated to Krishna, finest example of late medieval Bengali temple architecture with intricate terracotta panels depicting mythological scenes.',
                    highlights: ['Terracotta Artistry', 'Krishna Legends', 'Architectural Marvel'],
                    uniqueness: 'Most ornate terracotta temple in Bengal'
                  },
                  {
                    name: 'Adina Mosque',
                    bengali: 'আদিনা মসজিদ',
                    location: 'Malda',
                    description: 'Largest mosque in Indian subcontinent built in 1374 by Sultan Sikandar Shah. Ruined but magnificent structure showcasing Islamic architecture blended with Bengali elements.',
                    highlights: ['Islamic Architecture', 'Historical Ruins', 'Archaeological Site'],
                    uniqueness: 'Largest medieval mosque in India'
                  },
                  {
                    name: 'Garhbeta Palace',
                    bengali: 'গড়বেতা প্রাসাদ',
                    location: 'Paschim Medinipur',
                    description: 'Hidden royal palace of Kshatriya Rajput rulers with stunning Indo-European architecture. Features beautiful gardens, vintage cars collection, and royal artifacts.',
                    highlights: ['Royal Palace', 'Vintage Collection', 'Architecture'],
                    uniqueness: 'Best preserved royal palace in rural Bengal'
                  },
                  {
                    name: 'Mayurbhanj Palace',
                    bengali: 'ময়ূরভঞ্জ প্রাসাদ',
                    location: 'Kalimpong',
                    description: 'Charming hilltop palace of Bhutanese architecture with panoramic Himalayan views. Former residence of Bhutanese royal family, now a heritage hotel.',
                    highlights: ['Himalayan Views', 'Bhutanese Architecture', 'Royal Heritage'],
                    uniqueness: 'Only Bhutanese palace in West Bengal'
                  },
                  {
                    name: 'Chandrakona Rajbari',
                    bengali: 'চন্দ্রকোণা রাজবাড়ি',
                    location: 'Paschim Medinipur',
                    description: 'Magnificent 300-year-old palace complex with beautiful frescoes, vintage furniture, and traditional Bengali architecture. Still inhabited by royal descendants.',
                    highlights: ['Living Heritage', 'Frescoes', 'Royal Family'],
                    uniqueness: 'Active royal residence with public access'
                  },
                  {
                    name: 'Deulpara Temples',
                    bengali: 'দেউলপাড়া মন্দির',
                    location: 'Bankura',
                    description: 'Cluster of ancient temples from 7th-8th century showcasing early Bengali temple architecture. Less crowded archaeological site with peaceful rural setting.',
                    highlights: ['Ancient Temples', 'Archaeological Value', 'Rural Setting'],
                    uniqueness: 'Oldest temple complex in Bankura'
                  },
                  {
                    name: 'Lalbagh Fort Remnants',
                    bengali: 'লালবাগ দুর্গের ধ্বংসাবশেষ',
                    location: 'Murshidabad',
                    description: 'Ruins of Mughal fortification overlooking Bhagirathi River. Contains remnants of palaces, mosques, and gardens from Nawabi period with archaeological significance.',
                    highlights: ['Mughal Ruins', 'River Views', 'Archaeological Site'],
                    uniqueness: 'Hidden Mughal fort with river panorama'
                  },
                  {
                    name: 'Raipur Jagannath Temple',
                    bengali: 'রায়পুর জগন্নাথ মন্দির',
                    location: 'Purulia',
                    description: 'Ancient Jagannath temple complex in tribal region showcasing unique fusion of Odishan and Bengali architectural styles. Famous for annual Rath Yatra celebrations.',
                    highlights: ['Jagannath Worship', 'Tribal Culture', 'Rath Yatra'],
                    uniqueness: 'Jagannath temple outside Odisha'
                  },
                  {
                    name: 'Jaldapara Palace Ruins',
                    bengali: 'জলদাপাড়া প্রাসাদের ধ্বংসাবশেষ',
                    location: 'Alipurduar',
                    description: 'Mysterious ruined palace in the heart of Jaldapara forest. British-era hunting lodge with Gothic architecture, now reclaimed by nature creating mystical atmosphere.',
                    highlights: ['Forest Palace', 'Gothic Architecture', 'Wildlife Setting'],
                    uniqueness: 'Palace ruins inside national park'
                  }
                ].map((place, index) => (
                  <motion.div
                    key={place.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="card-heritage p-6 hover:shadow-2xl transition-all duration-300 border-l-4 border-heritage-gold"
                  >
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold text-gray-800 mb-1">{place.name}</h3>
                      <p className="text-heritage-gold font-noto-bengali text-sm mb-2">{place.bengali}</p>
                      <p className="text-heritage-maroon text-sm flex items-center">
                        <MapPin size={16} className="mr-1" />
                        {place.location}
                      </p>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">{place.description}</p>

                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1 mb-3">
                        {place.highlights.map((highlight, idx) => (
                          <span key={idx} className="text-xs bg-heritage-beige text-heritage-maroon px-2 py-1 rounded-full">
                            {highlight}
                          </span>
                        ))}
                      </div>
                      <div className="bg-gradient-to-r from-heritage-gold/10 to-heritage-bronze/10 p-2 rounded-lg">
                        <p className="text-xs text-heritage-maroon font-semibold">
                          ✨ {place.uniqueness}
                        </p>
                      </div>
                    </div>

                    <button className="btn-heritage-outline w-full text-sm py-2 hover:bg-heritage-maroon hover:text-white transition-colors">
                      Discover Hidden Gem
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )

      case 'weather':
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-heritage font-bold text-heritage-maroon">Weather Information</h1>
                <p className="text-heritage-gold font-noto-bengali text-lg">আবহাওয়ার তথ্য - Travel Planning Made Easy</p>
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-noto-bengali">আপডেট: </span>
                {new Date().toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit',
                  hour12: true 
                })}
              </div>
            </div>

            {/* Main Weather Dashboard */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Featured Location Weather */}
              <div className="lg:col-span-1">
                <div className="space-y-6">
                  <WeatherCard 
                    location="Kolkata, West Bengal" 
                    showForecast={true}
                  />
                  <WeatherCard 
                    location="Darjeeling, West Bengal" 
                    showForecast={false}
                    compact={false}
                  />
                </div>
              </div>
              
              {/* Multi-destination Weather */}
              <div className="lg:col-span-2">
                <DestinationsWeather />
              </div>
            </div>

            {/* Weather Tips for Tourists */}
            <div className="card-heritage p-6">
              <h3 className="text-xl font-heritage font-bold text-heritage-maroon mb-4">
                Travel Weather Tips
                <span className="text-heritage-gold font-noto-bengali text-lg ml-3">ভ্রমণের আবহাওয়া টিপস</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="text-green-600 font-semibold mb-2">🌞 Excellent Weather</div>
                  <div className="text-sm text-green-700">
                    <p>15-28°C, Clear skies</p>
                    <p className="font-noto-bengali mt-1">নিখুঁত ভ্রমণের আবহাওয়া</p>
                  </div>
                  <div className="text-xs text-green-600 mt-2">
                    Perfect for heritage sites, photography, walking tours
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="text-blue-600 font-semibold mb-2">🌤️ Good Weather</div>
                  <div className="text-sm text-blue-700">
                    <p>10-35°C, Partly cloudy</p>
                    <p className="font-noto-bengali mt-1">ভাল আবহাওয়া</p>
                  </div>
                  <div className="text-xs text-blue-600 mt-2">
                    Great for museums, cultural events, indoor attractions
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="text-yellow-600 font-semibold mb-2">⛅ Fair Weather</div>
                  <div className="text-sm text-yellow-700">
                    <p>5-40°C, Mixed conditions</p>
                    <p className="font-noto-bengali mt-1">মধ্যম আবহাওয়া</p>
                  </div>
                  <div className="text-xs text-yellow-600 mt-2">
                    Indoor activities recommended, flexible planning needed
                  </div>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="text-red-600 font-semibold mb-2">🌧️ Poor Weather</div>
                  <div className="text-sm text-red-700">
                    <p>Extreme conditions</p>
                    <p className="font-noto-bengali mt-1">প্রতিকূল আবহাওয়া</p>
                  </div>
                  <div className="text-xs text-red-600 mt-2">
                    Consider postponing outdoor activities, stay indoors
                  </div>
                </div>
              </div>

              {/* Seasonal Guide for West Bengal */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">🌨️ Winter (Dec-Feb)</h4>
                  <p className="text-sm text-blue-700 mb-2 font-noto-bengali">শীতকাল - সেরা ভ্রমণের সময়</p>
                  <ul className="text-xs text-blue-600 space-y-1">
                    <li>• Perfect for all outdoor activities</li>
                    <li>• Temperature: 10-25°C</li>
                    <li>• Best time for heritage tours</li>
                    <li>• Ideal for Darjeeling hill stations</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">🌸 Spring (Mar-May)</h4>
                  <p className="text-sm text-green-700 mb-2 font-noto-bengali">বসন্তকাল - ফুলের সময়</p>
                  <ul className="text-xs text-green-600 space-y-1">
                    <li>• Warm but pleasant mornings</li>
                    <li>• Temperature: 20-35°C</li>
                    <li>• Great for cultural festivals</li>
                    <li>• Morning activities recommended</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">🌧️ Monsoon (Jun-Sep)</h4>
                  <p className="text-sm text-gray-700 mb-2 font-noto-bengali">বর্ষাকাল - বৃষ্টির সময়</p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Indoor attractions preferred</li>
                    <li>• Temperature: 25-35°C</li>
                    <li>• High humidity, heavy rains</li>
                    <li>• Museums, galleries, cultural centers</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )

      case 'guides':
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-heritage font-bold text-heritage-maroon">Local Guides</h1>
                <p className="text-heritage-gold font-noto-bengali text-lg">স্থানীয় গাইড নির্বাচন</p>
              </div>
              <div className="flex items-center space-x-4">
                <select className="px-4 py-2 border border-heritage-bronze/30 rounded-xl">
                  <option>All Specialties</option>
                  <option>Heritage Tours</option>
                  <option>Cultural Experiences</option>
                  <option>Food Tours</option>
                  <option>Photography Tours</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: 'Ravi Chatterjee',
                  bengali: 'রবি চ্যাটার্জী',
                  specialty: 'Heritage & History Expert',
                  experience: '12 years',
                  rating: 4.9,
                  reviews: 156,
                  languages: ['Bengali', 'English', 'Hindi'],
                  price: '₹1,500/day',
                  image: '👨‍🎓',
                  description: 'Specialized in Kolkata heritage walks and Mughal history',
                  achievements: ['Certified Tour Guide', 'History Graduate', 'Museum Volunteer'],
                  areas: ['Kolkata', 'Murshidabad', 'Bishnupur']
                },
                {
                  name: 'Priya Das',
                  bengali: 'প্রিয়া দাস',
                  specialty: 'Cultural & Arts Guide',
                  experience: '8 years',
                  rating: 4.8,
                  reviews: 203,
                  languages: ['Bengali', 'English'],
                  price: '₹1,200/day',
                  image: '👩‍🎨',
                  description: 'Expert in Bengali culture, festivals, and traditional arts',
                  achievements: ['Folk Arts Scholar', 'Festival Organizer', 'Cultural Ambassador'],
                  areas: ['Kolkata', 'Shantiniketan', 'Kalighat']
                },
                {
                  name: 'Sandip Kumar',
                  bengali: 'সন্দীপ কুমার',
                  specialty: 'Food & Culinary Tours',
                  experience: '10 years',
                  rating: 4.7,
                  reviews: 189,
                  languages: ['Bengali', 'English', 'Hindi'],
                  price: '₹1,300/day',
                  image: '👨‍🍳',
                  description: 'Authentic Bengali cuisine and street food expert',
                  achievements: ['Culinary Expert', 'Restaurant Consultant', 'Food Blogger'],
                  areas: ['Kolkata', 'Howrah', 'Dakshineshwar']
                },
                {
                  name: 'Anita Mondal',
                  bengali: 'অনিতা মণ্ডল',
                  specialty: 'Nature & Adventure Guide',
                  experience: '9 years',
                  rating: 4.8,
                  reviews: 142,
                  languages: ['Bengali', 'English', 'Hindi', 'Nepali'],
                  price: '₹1,400/day',
                  image: '🏔️',
                  description: 'Expert in Darjeeling, hill stations, and wildlife tours',
                  achievements: ['Mountain Guide', 'Wildlife Expert', 'Eco-Tourism Specialist'],
                  areas: ['Darjeeling', 'Kalimpong', 'Sundarbans']
                },
                {
                  name: 'Debashish Roy',
                  bengali: 'দেবাশীষ রায়',
                  specialty: 'Photography & Film Guide',
                  experience: '7 years',
                  rating: 4.6,
                  reviews: 98,
                  languages: ['Bengali', 'English'],
                  price: '₹1,600/day',
                  image: '📸',
                  description: 'Professional photographer specializing in heritage and cultural documentation',
                  achievements: ['Award-winning Photographer', 'Film Location Scout', 'Visual Storyteller'],
                  areas: ['Kolkata', 'Murshidabad', 'Mayurbhanj']
                },
                {
                  name: 'Meera Banerjee',
                  bengali: 'মীরা ব্যানার্জী',
                  specialty: 'Spiritual & Temple Guide',
                  experience: '15 years',
                  rating: 4.9,
                  reviews: 275,
                  languages: ['Bengali', 'English', 'Hindi', 'Sanskrit'],
                  price: '₹1,100/day',
                  image: '🕉️',
                  description: 'Expert in spiritual sites, temple architecture, and religious traditions',
                  achievements: ['Religious Studies Scholar', 'Temple Historian', 'Spiritual Counselor'],
                  areas: ['Kalighat', 'Dakshineswar', 'Mayapur']
                },
                {
                  name: 'Subrata Ghosh',
                  bengali: 'সুব্রত ঘোষ',
                  specialty: 'River & Coastal Guide',
                  experience: '11 years',
                  rating: 4.7,
                  reviews: 164,
                  languages: ['Bengali', 'English', 'Hindi'],
                  price: '₹1,250/day',
                  image: '🚢',
                  description: 'Specializes in Ganges cruises, coastal areas, and fishing communities',
                  achievements: ['Marine Expert', 'Boat Captain License', 'Coastal Tourism Specialist'],
                  areas: ['Hooghly River', 'Digha', 'Mandarmani']
                },
                {
                  name: 'Kavita Sen',
                  bengali: 'কবিতা সেন',
                  specialty: 'Literature & Arts Guide',
                  experience: '6 years',
                  rating: 4.8,
                  reviews: 117,
                  languages: ['Bengali', 'English'],
                  price: '₹1,350/day',
                  image: '📚',
                  description: 'Expert in Bengali literature, Tagore heritage, and literary sites',
                  achievements: ['Literature Professor', 'Tagore Scholar', 'Poetry Enthusiast'],
                  areas: ['Shantiniketan', 'Jorasanko', 'Rabindra Sarobar']
                },
                {
                  name: 'Amit Dutta',
                  bengali: 'অমিত দত্ত',
                  specialty: 'Business & Industrial Heritage',
                  experience: '8 years',
                  rating: 4.5,
                  reviews: 89,
                  languages: ['Bengali', 'English', 'Hindi'],
                  price: '₹1,450/day',
                  image: '🏭',
                  description: 'Specialist in colonial commercial history and industrial heritage sites',
                  achievements: ['Business Historian', 'Industrial Expert', 'Economic Researcher'],
                  areas: ['Kolkata', 'Durgapur', 'Asansol']
                }
              ].map((guide, index) => (
                <motion.div
                  key={guide.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card-heritage p-6 hover:shadow-2xl transition-all duration-300"
                >
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-heritage-maroon to-heritage-bronze rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">
                      {guide.image}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">{guide.name}</h3>
                    <p className="text-heritage-gold font-noto-bengali text-sm">{guide.bengali}</p>
                    <p className="text-heritage-maroon font-medium">{guide.specialty}</p>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Experience:</span>
                      <span className="font-semibold">{guide.experience}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Rating:</span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 fill-heritage-gold text-heritage-gold mr-1" />
                        <span className="font-semibold">{guide.rating}</span>
                        <span className="text-gray-500 text-sm ml-1">({guide.reviews})</span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price:</span>
                      <span className="font-bold text-heritage-maroon">{guide.price}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-600 text-sm mb-3">{guide.description}</p>
                    <div className="mb-3">
                      <span className="text-xs text-gray-500 mb-1 block">Coverage Areas:</span>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {guide.areas.map((area, idx) => (
                          <span key={idx} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {guide.languages.map((lang, idx) => (
                        <span key={idx} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          {lang}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {guide.achievements.map((achievement, idx) => (
                        <span key={idx} className="text-xs bg-heritage-beige text-heritage-maroon px-2 py-1 rounded-full">
                          {achievement}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button className="flex-1 btn-heritage-outline text-sm py-2">View Profile</button>
                    <button className="flex-1 btn-heritage text-sm py-2">Book Now</button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )

      case 'hotels':
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-heritage font-bold text-heritage-maroon">Heritage Hotels</h1>
                <p className="text-heritage-gold font-noto-bengali text-lg">ঐতিহ্যবাহী হোটেল</p>
              </div>
              <div className="flex items-center space-x-4">
                <select className="px-4 py-2 border border-heritage-bronze/30 rounded-xl">
                  <option>All Categories</option>
                  <option>Heritage Palaces</option>
                  <option>Boutique Hotels</option>
                  <option>Traditional Homestays</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {[
                {
                  name: 'The Oberoi Grand Kolkata',
                  bengali: 'ওবেরয় গ্র্যান্ড কলকাতা',
                  category: 'Luxury Heritage',
                  location: 'Chowringhee, Kolkata',
                  rating: 4.8,
                  price: '₹15,000',
                  image: '🏰',
                  amenities: ['Heritage Architecture', 'Spa', 'Fine Dining', 'Business Center'],
                  description: 'Victorian elegance meets modern luxury in the heart of Kolkata'
                },
                {
                  name: 'Rajbari Bawali Heritage Hotel',
                  bengali: 'রাজবাড়ি বাওয়ালি',
                  category: 'Heritage Palace',
                  location: 'Bawali, South 24 Parganas',
                  rating: 4.6,
                  price: '₹8,500',
                  image: '🏛️',
                  amenities: ['Royal Suites', 'Traditional Cuisine', 'Cultural Programs', 'Gardens'],
                  description: '200-year-old zamindari palace offering authentic Bengali royal experience'
                },
                {
                  name: 'Glenburn Tea Estate',
                  bengali: 'গ্লেনবার্ন চা বাগান',
                  category: 'Tea Estate Bungalow',
                  location: 'Darjeeling',
                  rating: 4.9,
                  price: '₹12,000',
                  image: '🍃',
                  amenities: ['Tea Tasting', 'Mountain Views', 'Organic Garden', 'Himalayan Cuisine'],
                  description: 'Colonial-era tea estate with breathtaking Himalayan views'
                },
                {
                  name: 'Traditional Bengali Homestay',
                  bengali: 'ঐতিহ্যবাহী বাঙালি গৃহ',
                  category: 'Cultural Homestay',
                  location: 'Shantiniketan',
                  rating: 4.4,
                  price: '₹2,500',
                  image: '🏠',
                  amenities: ['Home Cooked Meals', 'Cultural Activities', 'Local Experience', 'Family Stay'],
                  description: 'Experience authentic Bengali family life and traditions'
                }
              ].map((hotel, index) => (
                <motion.div
                  key={hotel.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card-heritage overflow-hidden hover:shadow-2xl transition-all duration-300"
                >
                  <div className="flex">
                    <div className="w-1/3 bg-gradient-to-br from-heritage-beige to-heritage-bronze flex items-center justify-center text-6xl">
                      {hotel.image}
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800">{hotel.name}</h3>
                          <p className="text-heritage-gold font-noto-bengali text-sm">{hotel.bengali}</p>
                          <p className="text-heritage-maroon text-sm">{hotel.category}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 fill-heritage-gold text-heritage-gold mr-1" />
                            <span className="font-semibold">{hotel.rating}</span>
                          </div>
                          <p className="text-heritage-maroon font-bold text-lg">{hotel.price}/night</p>
                        </div>
                      </div>

                      <p className="text-gray-600 text-sm mb-4">{hotel.description}</p>
                      <p className="text-gray-500 text-sm mb-4 flex items-center">
                        <MapPin size={16} className="mr-1" />
                        {hotel.location}
                      </p>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {hotel.amenities.map((amenity, idx) => (
                          <span key={idx} className="text-xs bg-heritage-beige text-heritage-maroon px-2 py-1 rounded-full">
                            {amenity}
                          </span>
                        ))}
                      </div>

                      <div className="flex space-x-3">
                        <button className="flex-1 btn-heritage-outline text-sm py-2">View Details</button>
                        <button className="flex-1 btn-heritage text-sm py-2">Book Now</button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )

      case 'food':
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-heritage font-bold text-heritage-maroon">Bengali Cuisine</h1>
                <p className="text-heritage-gold font-noto-bengali text-lg">বাঙালি খাবার ও সংস্কৃতি</p>
              </div>
            </div>

            {/* Food Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'Fish Dishes', bengali: 'মাছের পদ', icon: '🐟', count: '25+ varieties' },
                { name: 'Sweets', bengali: 'মিষ্টি', icon: '🍰', count: '40+ types' },
                { name: 'Rice Dishes', bengali: 'ভাতের পদ', icon: '🍚', count: '15+ styles' },
                { name: 'Street Food', bengali: 'স্ট্রিট ফুড', icon: '🥘', count: '20+ snacks' },
              ].map((category, index) => (
                <motion.div
                  key={category.name}
                  whileHover={{ scale: 1.05 }}
                  className="card-heritage p-6 text-center cursor-pointer"
                >
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="font-semibold text-gray-800">{category.name}</h3>
                  <p className="text-heritage-gold font-noto-bengali text-sm">{category.bengali}</p>
                  <p className="text-heritage-maroon text-sm">{category.count}</p>
                </motion.div>
              ))}
            </div>

            {/* Featured Restaurants */}
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                Recommended Restaurants <span className="text-heritage-gold font-noto-bengali">প্রস্তাবিত রেস্তোরাঁ</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    name: 'Oh! Calcutta',
                    specialty: 'Authentic Bengali Cuisine',
                    signature: 'Hilsa Fish Curry, Chingri Malai Curry',
                    price: '₹₹₹',
                    rating: 4.6,
                    location: 'Forum Mall, Kolkata'
                  },
                  {
                    name: 'Bhojohori Manna',
                    specialty: 'Traditional Bengali Thali',
                    signature: 'Fish Thali, Mutton Curry',
                    price: '₹₹',
                    rating: 4.4,
                    location: 'Multiple locations'
                  },
                  {
                    name: 'Kewpies Kitchen',
                    specialty: 'Home-style Bengali Food',
                    signature: 'Kosha Mangsho, Posto Bata',
                    price: '₹₹',
                    rating: 4.7,
                    location: 'Elgin Road, Kolkata'
                  },
                  {
                    name: 'Street Food Tours',
                    specialty: 'Kolkata Street Food',
                    signature: 'Puchka, Kathi Roll, Jhal Muri',
                    price: '₹',
                    rating: 4.8,
                    location: 'Various street corners'
                  }
                ].map((restaurant, index) => (
                  <motion.div
                    key={restaurant.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="card-heritage p-6"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{restaurant.name}</h3>
                        <p className="text-heritage-maroon text-sm">{restaurant.specialty}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 fill-heritage-gold text-heritage-gold mr-1" />
                          <span className="font-semibold">{restaurant.rating}</span>
                        </div>
                        <p className="text-heritage-bronze font-bold">{restaurant.price}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">Signature: {restaurant.signature}</p>
                    <p className="text-gray-500 text-sm mb-4 flex items-center">
                      <MapPin size={16} className="mr-1" />
                      {restaurant.location}
                    </p>
                    <button className="btn-heritage-outline w-full text-sm py-2">View Menu & Book</button>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )

      case 'experiences':
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-heritage font-bold text-heritage-maroon">Cultural Events</h1>
                <p className="text-heritage-gold font-noto-bengali text-lg">সাংস্কৃতিক অনুষ্ঠান ও ঐতিহ্য</p>
              </div>
              <div className="flex items-center space-x-4">
                <select className="px-4 py-2 border border-heritage-bronze/30 rounded-xl">
                  <option>All Categories</option>
                  <option>Music & Dance</option>
                  <option>Theater & Arts</option>
                  <option>Festivals</option>
                  <option>Traditional Crafts</option>
                </select>
              </div>
            </div>

            {/* Featured Cultural Events */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: 'Rabindra Sangeet Evening',
                  bengali: 'রবীন্দ্র সংগীত সন্ধ্যা',
                  category: 'Classical Music',
                  venue: 'Rabindra Sadan, Kolkata',
                  description: 'Experience the soul-stirring melodies of Tagore\'s compositions performed by renowned artists. Evening includes poetry recitations and discussions on Tagore\'s philosophy.',
                  duration: '3 hours',
                  price: '₹500-2000',
                  highlights: ['Nobel Laureate Poetry', 'Classical Music', 'Cultural Heritage', 'Spiritual Experience'],
                  nextEvent: 'Every Friday 7:00 PM',
                  icon: '🎵'
                },
                {
                  name: 'Baul Folk Music Performance',
                  bengali: 'বাউল লোকসংগীত',
                  category: 'Folk Music',
                  venue: 'Shantiniketan & Rural Villages',
                  description: 'Mystic minstrels of Bengal perform traditional Baul songs with ektara and dotara. Experience the spiritual philosophy through music and dance.',
                  duration: '2-4 hours',
                  price: '₹300-800',
                  highlights: ['Mystical Philosophy', 'Traditional Instruments', 'Village Setting', 'Spiritual Songs'],
                  nextEvent: 'Weekends at Shantiniketan',
                  icon: '🎶'
                },
                {
                  name: 'Kathak Dance Recital',
                  bengali: 'কথক নৃত্য',
                  category: 'Classical Dance',
                  venue: 'Various Cultural Centers',
                  description: 'Classical Indian dance form with Bengali interpretations, storytelling through graceful movements, costumes, and traditional music accompaniment.',
                  duration: '2 hours',
                  price: '₹400-1200',
                  highlights: ['Classical Dance', 'Storytelling', 'Traditional Costumes', 'Live Music'],
                  nextEvent: 'Monthly Performances',
                  icon: '💃'
                },
                {
                  name: 'Jatra Folk Theater',
                  bengali: 'যাত্রা নাটক',
                  category: 'Traditional Theater',
                  venue: 'Village Grounds & Open Spaces',
                  description: 'Traditional Bengali folk theater with mythological stories, elaborate costumes, live music, and audience interaction. Performed under open sky.',
                  duration: '4-6 hours',
                  price: '₹100-500',
                  highlights: ['Folk Theater', 'Mythological Stories', 'Community Event', 'Night Performance'],
                  nextEvent: 'Festival Seasons',
                  icon: '🎭'
                },
                {
                  name: 'Kantha Embroidery Workshop',
                  bengali: 'কাঁথা সূচিকর্ম',
                  category: 'Traditional Craft',
                  venue: 'Rural Bengal Villages',
                  description: 'Learn the ancient art of Kantha embroidery from master craftswomen. Create your own piece while understanding the cultural significance and patterns.',
                  duration: 'Full Day',
                  price: '₹1500-3000',
                  highlights: ['Hands-on Learning', 'Traditional Craft', 'Rural Experience', 'Take Home Art'],
                  nextEvent: 'Weekend Workshops',
                  icon: '🧵'
                },
                {
                  name: 'Dhak-Dhol Traditional Drumming',
                  bengali: 'ঢাক-ঢোল বাদন',
                  category: 'Percussion Music',
                  venue: 'During Festivals & Events',
                  description: 'Experience the powerful rhythms of Bengali traditional drums. Learn about different beats used in festivals and their cultural significance.',
                  duration: '1-2 hours',
                  price: '₹200-600',
                  highlights: ['Traditional Percussion', 'Festival Music', 'Rhythmic Patterns', 'Cultural Context'],
                  nextEvent: 'During Durga Puja',
                  icon: '🥁'
                },
                {
                  name: 'Alpana (Rangoli) Art Workshop',
                  bengali: 'আলপনা শিল্প',
                  category: 'Traditional Art',
                  venue: 'Cultural Centers & Homes',
                  description: 'Learn the intricate floor art of Bengal with rice paste and natural colors. Understand the spiritual and cultural symbolism behind different patterns.',
                  duration: '2-3 hours',
                  price: '₹300-800',
                  highlights: ['Floor Art', 'Natural Colors', 'Spiritual Symbols', 'Traditional Patterns'],
                  nextEvent: 'Before Festivals',
                  icon: '🎨'
                },
                {
                  name: 'Chhau Masked Dance',
                  bengali: 'ছৌ নৃত্য',
                  category: 'Folk Dance',
                  venue: 'Purulia District',
                  description: 'Martial arts-influenced dance with elaborate masks depicting mythological characters. Night performances with fire effects and traditional music.',
                  duration: '3-4 hours',
                  price: '₹600-1500',
                  highlights: ['Masked Dance', 'Martial Arts', 'Mythological Stories', 'Fire Effects'],
                  nextEvent: 'Seasonal Festivals',
                  icon: '🎪'
                },
                {
                  name: 'Patachitra Scroll Painting',
                  bengali: 'পটচিত্র',
                  category: 'Traditional Art',
                  venue: 'Kalighat & Medinipur',
                  description: 'Ancient art of scroll painting with mythological narratives. Watch artists create stories on cloth and learn about this UNESCO-recognized art form.',
                  duration: 'Half Day',
                  price: '₹800-2000',
                  highlights: ['Scroll Painting', 'Mythological Stories', 'UNESCO Heritage', 'Master Artists'],
                  nextEvent: 'Artist Studio Visits',
                  icon: '📜'
                },
                {
                  name: 'Kirtan Devotional Singing',
                  bengali: 'কীর্তন গান',
                  category: 'Devotional Music',
                  venue: 'Temples & Cultural Centers',
                  description: 'Participate in traditional Bengali devotional singing with call-and-response format. Experience the spiritual energy and community bonding.',
                  duration: '2-3 hours',
                  price: 'Free-₹300',
                  highlights: ['Devotional Music', 'Community Singing', 'Spiritual Experience', 'Traditional Format'],
                  nextEvent: 'Evening Sessions',
                  icon: '🙏'
                },
                {
                  name: 'Adda (Cultural Discussions)',
                  bengali: 'আড্ডা',
                  category: 'Social Culture',
                  venue: 'Tea Stalls & Cultural Spaces',
                  description: 'Join traditional Bengali intellectual discussions over tea and snacks. Experience the famous Bengali adda culture with literature, politics, and arts.',
                  duration: '1-2 hours',
                  price: '₹50-200',
                  highlights: ['Intellectual Discussions', 'Tea Culture', 'Literature Talks', 'Social Bonding'],
                  nextEvent: 'Daily Evening',
                  icon: '☕'
                },
                {
                  name: 'Gombhira Folk Performance',
                  bengali: 'গম্ভীরা',
                  category: 'Folk Theater',
                  venue: 'Malda & Murshidabad',
                  description: 'Satirical folk performance addressing social issues through humor and music. Traditional form of social commentary with local dialect and customs.',
                  duration: '2-3 hours',
                  price: '₹150-400',
                  highlights: ['Social Satire', 'Folk Humor', 'Local Dialect', 'Community Issues'],
                  nextEvent: 'Festival Times',
                  icon: '🎤'
                }
              ].map((event, index) => (
                <motion.div
                  key={event.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card-heritage p-6 hover:shadow-2xl transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="text-4xl mr-4">{event.icon}</div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 group-hover:text-heritage-maroon transition-colors">
                          {event.name}
                        </h3>
                        <p className="text-heritage-gold font-noto-bengali text-sm">{event.bengali}</p>
                        <p className="text-heritage-maroon text-sm">{event.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-heritage-bronze font-bold">{event.price}</p>
                      <p className="text-xs text-gray-500">{event.duration}</p>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{event.description}</p>

                  <div className="mb-4">
                    <p className="text-gray-500 text-sm mb-2 flex items-center">
                      <MapPin size={16} className="mr-1" />
                      {event.venue}
                    </p>
                    <p className="text-heritage-maroon text-sm font-medium flex items-center">
                      <Clock size={16} className="mr-1" />
                      {event.nextEvent}
                    </p>
                  </div>

                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {event.highlights.map((highlight, idx) => (
                        <span key={idx} className="text-xs bg-heritage-beige text-heritage-maroon px-2 py-1 rounded-full">
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button className="flex-1 btn-heritage-outline text-sm py-2 hover:bg-heritage-maroon hover:text-white transition-colors">
                      Learn More
                    </button>
                    <button className="flex-1 btn-heritage text-sm py-2">
                      Book Experience
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Cultural Categories */}
            <div className="mt-16">
              <h2 className="text-3xl font-bold text-heritage-maroon mb-8 text-center">
                Explore Bengal's Rich Cultural Heritage
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    name: 'Classical Arts',
                    bengali: 'শাস্ত্রীয় শিল্প',
                    count: '15+ Events',
                    icon: '🎭',
                    color: 'from-purple-500 to-purple-700',
                    description: 'Rabindra Sangeet, Classical Dance, Theater'
                  },
                  {
                    name: 'Folk Traditions',
                    bengali: 'লোক ঐতিহ্য',
                    count: '20+ Forms',
                    icon: '🎪',
                    color: 'from-green-500 to-green-700',
                    description: 'Baul Music, Jatra, Chhau Dance'
                  },
                  {
                    name: 'Traditional Crafts',
                    bengali: 'ঐতিহ্যবাহী কারুশিল্প',
                    count: '12+ Crafts',
                    icon: '🎨',
                    color: 'from-orange-500 to-orange-700',
                    description: 'Kantha, Patachitra, Pottery'
                  },
                  {
                    name: 'Spiritual Practices',
                    bengali: 'আধ্যাত্মিক অনুশীলন',
                    count: '8+ Traditions',
                    icon: '🙏',
                    color: 'from-blue-500 to-blue-700',
                    description: 'Kirtan, Meditation, Temple Rituals'
                  }
                ].map((category, index) => (
                  <motion.div
                    key={category.name}
                    whileHover={{ scale: 1.05 }}
                    className="card-heritage p-6 text-center cursor-pointer group"
                  >
                    <div className={`w-20 h-20 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      <span className="text-4xl">{category.icon}</span>
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-1">{category.name}</h3>
                    <p className="text-heritage-gold font-noto-bengali text-sm mb-2">{category.bengali}</p>
                    <p className="text-heritage-maroon font-bold mb-2">{category.count}</p>
                    <p className="text-xs text-gray-600">{category.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Cultural Calendar */}
            <div className="mt-16 card-heritage p-8">
              <h2 className="text-2xl font-bold text-heritage-maroon mb-6 text-center">
                Cultural Calendar <span className="text-heritage-gold font-noto-bengali">সাংস্কৃতিক ক্যালেন্ডার</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    month: 'January',
                    bengali: 'জানুয়ারি',
                    events: ['Netaji Jayanti', 'Saraswati Puja', 'Kite Festival']
                  },
                  {
                    month: 'February-March',
                    bengali: 'ফেব্রুয়ারি-মার্চ',
                    events: ['Basanti Puja', 'Holi', 'International Book Fair']
                  },
                  {
                    month: 'April',
                    bengali: 'এপ্রিল',
                    events: ['Poila Boishakh', 'Rabindra Jayanti', 'Spring Festival']
                  },
                  {
                    month: 'September-October',
                    bengali: 'সেপ্টেম্বর-অক্টোবর',
                    events: ['Durga Puja', 'Kali Puja', 'Bhai Phonta']
                  },
                  {
                    month: 'November',
                    bengali: 'নভেম্বর',
                    events: ['Jagaddhatri Puja', 'Rash Yatra', 'Film Festival']
                  },
                  {
                    month: 'December',
                    bengali: 'ডিসেম্বর',
                    events: ['Christmas', 'Year End Celebrations', 'Winter Festivals']
                  }
                ].map((period, index) => (
                  <motion.div
                    key={period.month}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-br from-heritage-beige/30 to-white p-4 rounded-xl border border-heritage-bronze/20"
                  >
                    <h3 className="font-semibold text-heritage-maroon mb-1">{period.month}</h3>
                    <p className="text-heritage-gold font-noto-bengali text-sm mb-3">{period.bengali}</p>
                    <ul className="space-y-1">
                      {period.events.map((event, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-center">
                          <span className="w-1.5 h-1.5 bg-heritage-maroon rounded-full mr-2"></span>
                          {event}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )

      case 'itinerary':
        return <AIItineraryGenerator />

      case 'settings':
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-heritage font-bold text-heritage-maroon">Settings</h1>
                <p className="text-heritage-gold font-noto-bengali text-lg">সেটিংস ও প্রোফাইল</p>
              </div>
              {updateStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border border-green-200 rounded-xl px-4 py-2"
                >
                  <p className="text-green-800 text-sm">✅ Profile updated successfully!</p>
                </motion.div>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Section */}
              <div className="lg:col-span-2">
                <div className="card-heritage p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">
                      Profile Information
                    </h2>
                    <button
                      onClick={() => setIsEditingProfile(!isEditingProfile)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                        isEditingProfile 
                          ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' 
                          : 'btn-heritage'
                      }`}
                    >
                      {isEditingProfile ? 'Cancel' : 'Edit Profile'}
                    </button>
                  </div>

                  {isEditingProfile ? (
                    <form onSubmit={handleProfileUpdate} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-heritage-maroon font-medium mb-2">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            name="fullName"
                            value={profileData.fullName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 rounded-xl border border-heritage-bronze/30 focus:border-heritage-maroon focus:ring-2 focus:ring-heritage-maroon/20 outline-none transition-all"
                            placeholder="Your full name"
                          />
                        </div>
                        <div>
                          <label className="block text-heritage-maroon font-medium mb-2">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={profileData.phone}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border border-heritage-bronze/30 focus:border-heritage-maroon focus:ring-2 focus:ring-heritage-maroon/20 outline-none transition-all"
                            placeholder="+91 9876543210"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-heritage-maroon font-medium mb-2">
                            Date of Birth
                          </label>
                          <input
                            type="date"
                            name="dateOfBirth"
                            value={profileData.dateOfBirth}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border border-heritage-bronze/30 focus:border-heritage-maroon focus:ring-2 focus:ring-heritage-maroon/20 outline-none transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-heritage-maroon font-medium mb-2">
                            City
                          </label>
                          <input
                            type="text"
                            name="city"
                            value={profileData.city}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border border-heritage-bronze/30 focus:border-heritage-maroon focus:ring-2 focus:ring-heritage-maroon/20 outline-none transition-all"
                            placeholder="Kolkata"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-heritage-maroon font-medium mb-2">
                          Cultural Interests
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {[
                            'Heritage Sites', 'Classical Music', 'Folk Arts', 'Traditional Dance',
                            'Local Cuisine', 'Festivals', 'Handicrafts', 'Literature', 'Spiritual Tours'
                          ].map((interest) => (
                            <label key={interest} className="flex items-center space-x-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={profileData.culturalInterests.includes(interest)}
                                onChange={() => handleInterestToggle(interest)}
                                className="w-4 h-4 text-heritage-maroon border-heritage-bronze/30 rounded focus:ring-heritage-maroon"
                              />
                              <span className="text-sm text-gray-700">{interest}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-heritage-maroon font-medium mb-2">
                          Bio
                        </label>
                        <textarea
                          name="bio"
                          value={profileData.bio}
                          onChange={handleInputChange}
                          rows={3}
                          className="w-full px-4 py-3 rounded-xl border border-heritage-bronze/30 focus:border-heritage-maroon focus:ring-2 focus:ring-heritage-maroon/20 outline-none transition-all resize-none"
                          placeholder="Tell us about yourself and your travel interests..."
                        />
                      </div>

                      <div className="flex space-x-4">
                        <button
                          type="submit"
                          disabled={updateStatus === 'loading'}
                          className="flex-1 bg-gradient-to-r from-heritage-maroon to-heritage-bronze text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                        >
                          {updateStatus === 'loading' ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              Updating...
                            </>
                          ) : (
                            'Save Changes'
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsEditingProfile(false)}
                          className="px-6 py-3 border border-heritage-bronze/30 text-heritage-maroon rounded-xl font-semibold hover:bg-heritage-beige transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 mb-1">Full Name</h3>
                          <p className="text-gray-800">{profileData.fullName || 'Not provided'}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 mb-1">Email</h3>
                          <p className="text-gray-800">{profileData.email || 'Not provided'}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 mb-1">Phone</h3>
                          <p className="text-gray-800">{profileData.phone || 'Not provided'}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 mb-1">City</h3>
                          <p className="text-gray-800">{profileData.city || 'Not provided'}</p>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Cultural Interests</h3>
                        <div className="flex flex-wrap gap-2">
                          {profileData.culturalInterests.length > 0 ? 
                            profileData.culturalInterests.map((interest, idx) => (
                              <span key={idx} className="text-xs bg-heritage-beige text-heritage-maroon px-3 py-1 rounded-full">
                                {interest}
                              </span>
                            )) : 
                            <p className="text-gray-600">No interests selected</p>
                          }
                        </div>
                      </div>

                      {profileData.bio && (
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 mb-1">Bio</h3>
                          <p className="text-gray-800">{profileData.bio}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Settings Sidebar */}
              <div className="space-y-6">
                {/* Account Settings */}
                <div className="card-heritage p-6">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">Account Settings</h3>
                  <div className="space-y-3">
                    <button className="w-full text-left p-3 rounded-lg hover:bg-heritage-beige transition-colors flex items-center justify-between">
                      <span className="text-gray-700">Change Password</span>
                      <span className="text-heritage-maroon">→</span>
                    </button>
                    <button className="w-full text-left p-3 rounded-lg hover:bg-heritage-beige transition-colors flex items-center justify-between">
                      <span className="text-gray-700">Email Preferences</span>
                      <span className="text-heritage-maroon">→</span>
                    </button>
                  </div>
                </div>

                {/* Preferences */}
                <div className="card-heritage p-6">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">
                    Preferences <span className="text-heritage-gold font-noto-bengali text-sm">পছন্দসমূহ</span>
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Language</span>
                      <select className="px-3 py-1 border border-heritage-bronze/30 rounded-lg text-sm">
                        <option>English</option>
                        <option>Bengali</option>
                        <option>Hindi</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Currency</span>
                      <select className="px-3 py-1 border border-heritage-bronze/30 rounded-lg text-sm">
                        <option>INR (₹)</option>
                        <option>USD ($)</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Email Notifications</span>
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-heritage-maroon border-heritage-bronze/30 rounded" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      default:
    }
  }

  return (
    <div className="min-h-screen bg-heritage-beige">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-heritage-beige/30">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-heritage-maroon"
            >
              <Menu size={24} />
            </button>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-heritage rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">ভ</span>
              </div>
              <h1 className="text-xl font-heritage font-bold text-heritage-gradient">
                Bhromon
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search places, guides, experiences..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-heritage-maroon focus:border-transparent w-80"
              />
            </div>
            
            <button className="p-2 text-gray-600 hover:text-heritage-maroon relative">
              <Bell size={24} />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-heritage-maroon text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-heritage-maroon rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">
                  {(user?.user_metadata?.full_name || profileData.fullName || 'U').charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="hidden md:block font-medium text-gray-800">
                {user?.user_metadata?.full_name || profileData.fullName || 'User'}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          flex flex-col h-full lg:h-screen
        `}>
          <div className="p-6 border-b border-heritage-beige/30 flex-shrink-0">
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden absolute top-4 right-4 p-2 text-gray-600"
            >
              <X size={20} />
            </button>
            <h2 className="text-lg font-semibold text-gray-800">Dashboard</h2>
          </div>
          
          <nav className="p-4 flex-1 overflow-y-auto">
            <ul className="space-y-2">
              {sidebarItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveSection(item.id)
                      setIsSidebarOpen(false)
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                      activeSection === item.id
                        ? 'bg-heritage-maroon text-white'
                        : 'text-gray-600 hover:bg-heritage-beige hover:text-heritage-maroon'
                    }`}
                  >
                    <item.icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="p-4 border-t border-heritage-beige/30 flex-shrink-0 space-y-2">
            <button 
              onClick={handleSignOut}
              className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-heritage-beige hover:text-heritage-maroon rounded-lg transition-colors duration-200"
            >
              <LogOut size={20} />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          {renderContent()}
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* AI Chat Assistant */}
      <AIChatAssistant 
        isOpen={isChatOpen} 
        onToggle={() => setIsChatOpen(!isChatOpen)} 
      />
    </div>
  )
}
