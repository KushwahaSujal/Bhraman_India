'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'
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

function decodeEscapedUnicode(text: string): string {
  return text
    .replace(/\\u\{([0-9a-fA-F]+)\}/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
}

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
    state: 'India',
    pincode: '',
    travelPreferences: '',
    culturalInterests: [] as string[],
    emergencyContact: '',
    bio: ''
  })
  const [updateStatus, setUpdateStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [isChatOpen, setIsChatOpen] = useState(false)
  const dashboardRef = useRef<HTMLDivElement>(null)
  const { user, loading, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth')
    } else if (user) {
      setProfileData(prev => ({
        ...prev,
        fullName: user.name || '',
        email: user.email || '',
        phone: '',
      }))
    }
  }, [user, loading, router])

  useEffect(() => {
    if (!dashboardRef.current) return

    const walker = document.createTreeWalker(dashboardRef.current, NodeFilter.SHOW_TEXT)
    const nodes: Text[] = []

    let currentNode = walker.nextNode()
    while (currentNode) {
      nodes.push(currentNode as Text)
      currentNode = walker.nextNode()
    }

    nodes.forEach((textNode) => {
      if (textNode.nodeValue && textNode.nodeValue.includes('\\u')) {
        textNode.nodeValue = decodeEscapedUnicode(textNode.nodeValue)
      }
    })
  }, [activeSection, loading, user, profileData.fullName])

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setUpdateStatus('loading')
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setUpdateStatus('success')
      setIsEditingProfile(false)
      setTimeout(() => setUpdateStatus('idle'), 3000)
    } catch {
      setUpdateStatus('error')
      setTimeout(() => setUpdateStatus('idle'), 3000)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setProfileData(prev => ({ ...prev, [name]: value }))
  }

  const handleInterestToggle = (interest: string) => {
    setProfileData(prev => ({
      ...prev,
      culturalInterests: prev.culturalInterests.includes(interest)
        ? prev.culturalInterests.filter(i => i !== interest)
        : [...prev.culturalInterests, interest]
    }))
  }

  const handleSignOut = async () => { logout() }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-heritage-beige to-heritage-cream flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-heritage-maroon border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-heritage-bronze font-hindi">लोड हो रहा है...</p>
          <p className="text-heritage-sage">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) { return null }

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
    { label: 'Heritage Sites Explored', hindi: '\u0910\u0924\u093F\u0939\u093E\u0938\u093F\u0915 \u0938\u094D\u0925\u0932', value: '12', icon: '\u{1F3DB}\uFE0F', color: 'from-heritage-maroon to-heritage-bronze', description: 'Ancient temples & monuments' },
    { label: 'Cultural Festivals', hindi: '\u0938\u093E\u0902\u0938\u094D\u0915\u0943\u0924\u093F\u0915 \u0924\u094D\u092F\u094B\u0939\u093E\u0930', value: '3', icon: '\u{1F3AD}', color: 'from-red-600 to-orange-500', description: 'Diwali, Holi, Navratri experiences' },
    { label: 'Artisan Purchases', hindi: '\u0915\u093E\u0930\u0940\u0917\u0930\u0940 \u0916\u0930\u0940\u0926\u093E\u0930\u0940', value: '\u20B92,450', icon: '\u{1F3A8}', color: 'from-heritage-gold to-amber-600', description: 'Handloom & handicrafts' },
    { label: 'Food Adventures', hindi: '\u0916\u093E\u0928\u093E \u0905\u0928\u0941\u092D\u0935', value: '8', icon: '\u{1F35B}', color: 'from-green-600 to-emerald-500', description: 'Authentic Indian cuisine' },
  ]

  const recentActivities = [
    { action: 'Visited Taj Mahal', location: 'Agra, Uttar Pradesh', time: '2 hours ago', icon: Camera, hindi: '\u0924\u093E\u091C \u092E\u0939\u0932', type: 'heritage' },
    { action: 'Booked Heritage Walk with Local Guide', location: 'Old Delhi Heritage Trail', time: '1 day ago', icon: Users, hindi: '\u0935\u093F\u0930\u093E\u0938\u0924 \u092D\u094D\u0930\u092E\u0923', type: 'guide' },
    { action: 'Purchased Banarasi Silk Saree', location: 'Varanasi Silk Market', time: '2 days ago', icon: ShoppingCart, hindi: '\u092C\u0928\u093E\u0930\u0938\u0940 \u0938\u093E\u0921\u093C\u0940', type: 'shopping' },
    { action: 'Attended Kathak Dance Recital', location: 'India Habitat Centre, Delhi', time: '3 days ago', icon: Calendar, hindi: '\u0915\u0925\u0915 \u0928\u0943\u0924\u094D\u092F', type: 'cultural' },
    { action: 'Enjoyed Rajasthani Thali', location: 'Chokhi Dhani, Jaipur', time: '4 days ago', icon: ChefHat, hindi: '\u0930\u093E\u091C\u0938\u094D\u0925\u093E\u0928\u0940 \u0925\u093E\u0932\u0940', type: 'food' }
  ]

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-8">
            <div className="relative heritage-gradient rounded-3xl p-8 text-white overflow-hidden">
              <div className="absolute top-0 right-0 opacity-10 text-9xl">🏛️</div>
              <div className="absolute bottom-0 left-0 opacity-10 text-8xl">🎭</div>
              <div className="relative z-10">
                <h1 className="text-4xl font-heritage font-bold mb-2">
                  <span className="font-hindi">\u0938\u094D\u0935\u093E\u0917\u0924\u092E!</span> Welcome back, {user?.name || profileData.fullName || 'Traveler'}!
                </h1>
                <p className="text-heritage-beige text-lg mb-4">
                  Continue your journey through the rich cultural tapestry of <span className="font-hindi">\u0905\u0924\u0941\u0932\u094D\u092F \u092D\u093E\u0930\u0924</span> (Incredible India)
                </p>
                <div className="flex items-center space-x-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-heritage-gold rounded-full animate-pulse"></div>
                    <span>Current Season: <span className="font-hindi">\u0938\u0930\u094D\u0926\u0940</span> (Winter) - Perfect for Heritage Tours</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickStats.map((stat, index) => (
                <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="card-heritage p-6 group hover:shadow-2xl transition-all duration-300">
                  <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-3xl">{stat.icon}</span>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1">{stat.label}</h3>
                  <p className="text-heritage-gold font-hindi text-sm mb-2">{stat.hindi}</p>
                  <p className="text-3xl font-bold text-heritage-maroon mb-2">{stat.value}</p>
                  <p className="text-xs text-gray-600">{stat.description}</p>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 card-heritage p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-gray-800">Recent Adventures</h2>
                  <span className="text-heritage-gold font-hindi">\u0939\u093E\u0932 \u0915\u0947 \u0905\u0928\u0941\u092D\u0935</span>
                </div>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <motion.div key={index} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} className="flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-r from-heritage-beige/50 to-white hover:from-heritage-beige to-heritage-cream transition-all duration-300 border border-heritage-bronze/10">
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
                        <p className="text-heritage-gold font-hindi text-sm">{activity.hindi}</p>
                        <p className="text-sm text-gray-600">{activity.location}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="card-heritage p-6">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-heritage-maroon" />
                    Indian Festivals
                  </h3>
                  <div className="space-y-4 max-h-80 overflow-y-auto">
                    <div className="border-l-4 border-heritage-maroon pl-4">
                      <h4 className="font-semibold text-heritage-maroon">Diwali</h4>
                      <p className="text-heritage-gold font-hindi text-sm">\u0926\u0940\u092A\u093E\u0935\u0932\u0940</p>
                      <p className="text-xs text-gray-600 mt-1">Oct-Nov \u2022 Festival of Lights celebrated across India with lamps, fireworks, sweets, and family gatherings.</p>
                    </div>
                    <div className="border-l-4 border-heritage-bronze pl-4">
                      <h4 className="font-semibold text-heritage-bronze">Holi</h4>
                      <p className="text-heritage-gold font-hindi text-sm">\u0939\u094B\u0932\u0940</p>
                      <p className="text-xs text-gray-600 mt-1">Mar \u2022 Festival of Colors celebrating spring, love, and the triumph of good over evil.</p>
                    </div>
                    <div className="border-l-4 border-heritage-gold pl-4">
                      <h4 className="font-semibold text-heritage-gold">Navratri</h4>
                      <p className="text-heritage-gold font-hindi text-sm">\u0928\u0935\u0930\u093E\u0924\u094D\u0930\u093F</p>
                      <p className="text-xs text-gray-600 mt-1">Sep-Oct \u2022 Nine nights of dance, devotion, and celebration honoring Goddess Durga.</p>
                    </div>
                    <div className="border-l-4 border-purple-500 pl-4">
                      <h4 className="font-semibold text-purple-500">Ganesh Chaturthi</h4>
                      <p className="text-heritage-gold font-hindi text-sm">\u0917\u0923\u0947\u0936 \u091A\u0924\u0941\u0930\u094D\u0925\u0940</p>
                      <p className="text-xs text-gray-600 mt-1">Aug-Sep \u2022 Grand festival celebrating Lord Ganesha with beautiful idols and processions.</p>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4">
                      <h4 className="font-semibold text-green-500">Pongal</h4>
                      <p className="text-heritage-gold font-hindi text-sm">\u092A\u094B\u0902\u0917\u0932</p>
                      <p className="text-xs text-gray-600 mt-1">Jan \u2022 Tamil harvest festival thanking the Sun God, celebrated over four days.</p>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-semibold text-blue-500">Onam</h4>
                      <p className="text-heritage-gold font-hindi text-sm">\u0913\u0923\u092E</p>
                      <p className="text-xs text-gray-600 mt-1">Aug-Sep \u2022 Kerala's grand harvest festival with boat races, floral designs, and feasts.</p>
                    </div>
                    <div className="border-l-4 border-red-500 pl-4">
                      <h4 className="font-semibold text-red-500">Eid ul-Fitr</h4>
                      <p className="text-heritage-gold font-hindi text-sm">\u0908\u0926 \u0909\u0932-\u092B\u093C\u093F\u0924\u094D\u0930</p>
                      <p className="text-xs text-gray-600 mt-1">Varies \u2022 Joyous celebration marking end of Ramadan with prayers, feasting, and charity.</p>
                    </div>
                    <div className="border-l-4 border-orange-500 pl-4">
                      <h4 className="font-semibold text-orange-500">Baisakhi</h4>
                      <p className="text-heritage-gold font-hindi text-sm">\u092C\u0948\u0938\u093E\u0916\u0940</p>
                      <p className="text-xs text-gray-600 mt-1">Apr \u2022 Sikh New Year and harvest festival celebrated with Bhangra and community gatherings.</p>
                    </div>
                    <div className="border-l-4 border-pink-500 pl-4">
                      <h4 className="font-semibold text-pink-500">Durga Puja</h4>
                      <p className="text-heritage-gold font-hindi text-sm">\u0926\u0941\u0930\u094D\u0917\u093E \u092A\u0942\u091C\u093E</p>
                      <p className="text-xs text-gray-600 mt-1">Sep-Oct \u2022 East India's grandest festival celebrating Goddess Durga with elaborate pandals.</p>
                    </div>
                    <div className="border-l-4 border-teal-500 pl-4">
                      <h4 className="font-semibold text-teal-500">Makar Sankranti</h4>
                      <p className="text-heritage-gold font-hindi text-sm">\u092E\u0915\u0930 \u0938\u0902\u0915\u094D\u0930\u093E\u0902\u0924\u093F</p>
                      <p className="text-xs text-gray-600 mt-1">Jan \u2022 Harvest festival celebrated with kite flying, sesame sweets, and river dips.</p>
                    </div>
                    <div className="border-l-4 border-indigo-500 pl-4">
                      <h4 className="font-semibold text-indigo-500">Bihu</h4>
                      <p className="text-heritage-gold font-hindi text-sm">\u092C\u093F\u0939\u0942</p>
                      <p className="text-xs text-gray-600 mt-1">Apr \u2022 Assamese New Year with traditional dance, music, and feasting.</p>
                    </div>
                    <div className="border-l-4 border-yellow-500 pl-4">
                      <h4 className="font-semibold text-yellow-500">Pushkar Mela</h4>
                      <p className="text-heritage-gold font-hindi text-sm">\u092A\u0941\u0937\u094D\u0915\u0930 \u092E\u0947\u0932\u093E</p>
                      <p className="text-xs text-gray-600 mt-1">Nov \u2022 Famous camel fair in Rajasthan with cultural programs and spiritual gatherings.</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-heritage-beige/50">
                    <button className="w-full btn-heritage-outline text-sm py-2 hover:bg-heritage-maroon hover:text-white transition-colors">View Festival Calendar</button>
                  </div>
                </div>

                <div className="card-heritage p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">Weather in Delhi</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-gray-800">23\u00B0C</p>
                      <p className="text-sm text-gray-600">Pleasant & Clear</p>
                      <p className="text-heritage-gold font-hindi text-sm">\u0938\u0941\u0939\u093E\u0935\u0928\u093E \u092E\u094C\u0938\u092E</p>
                    </div>
                    <div className="text-4xl">\u2600\uFE0F</div>
                  </div>
                  <p className="text-sm text-gray-600 mt-3">Perfect weather for heritage site visits and outdoor cultural events!</p>
                </div>
              </div>
            </div>

            <div className="card-heritage p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Curated for You</h2>
                <span className="text-heritage-gold font-hindi">\u0906\u092A\u0915\u0947 \u0932\u093F\u090F \u091A\u0941\u0928\u093E \u0939\u0941\u0906</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <motion.div whileHover={{ scale: 1.02 }} className="border border-heritage-beige rounded-2xl p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-heritage-beige/20">
                  <div className="flex items-center mb-4">
                    <span className="text-3xl mr-3">🏛️</span>
                    <div>
                      <h3 className="font-semibold text-heritage-maroon">Golden Triangle Tour</h3>
                      <p className="text-heritage-gold font-hindi text-sm">\u0938\u094D\u0935\u0930\u094D\u0923 \u0924\u094D\u0930\u093F\u0915\u094B\u0923 \u092F\u093E\u0924\u094D\u0930\u093E</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">5-day tour covering Delhi, Agra & Jaipur with expert heritage guides</p>
                  <div className="flex justify-between items-center">
                    <span className="text-heritage-bronze font-bold text-lg">\u20B918,500</span>
                    <button className="btn-heritage text-sm px-4 py-2">Book Now</button>
                  </div>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} className="border border-heritage-beige rounded-2xl p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-heritage-beige/20">
                  <div className="flex items-center mb-4">
                    <span className="text-3xl mr-3">🪔</span>
                    <div>
                      <h3 className="font-semibold text-heritage-maroon">Varanasi Spiritual Journey</h3>
                      <p className="text-heritage-gold font-hindi text-sm">\u0935\u093E\u0930\u093E\u0923\u0938\u0940 \u0906\u0927\u094D\u092F\u093E\u0924\u094D\u092E\u093F\u0915 \u092F\u093E\u0924\u094D\u0930\u093E</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">3-day spiritual experience with Ganga Aarti and temple visits</p>
                  <div className="flex justify-between items-center">
                    <span className="text-heritage-bronze font-bold text-lg">\u20B98,500</span>
                    <button className="btn-heritage text-sm px-4 py-2">Book Now</button>
                  </div>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} className="border border-heritage-beige rounded-2xl p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-heritage-beige/20">
                  <div className="flex items-center mb-4">
                    <span className="text-3xl mr-3">🎵</span>
                    <div>
                      <h3 className="font-semibold text-heritage-maroon">Rajasthani Folk Night</h3>
                      <p className="text-heritage-gold font-hindi text-sm">\u0930\u093E\u091C\u0938\u094D\u0925\u093E\u0928\u0940 \u0932\u094B\u0915 \u0938\u0902\u0917\u0940\u0924</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Evening of traditional Rajasthani music and dance at a desert camp</p>
                  <div className="flex justify-between items-center">
                    <span className="text-heritage-bronze font-bold text-lg">\u20B92,750</span>
                    <button className="btn-heritage text-sm px-4 py-2">Book Now</button>
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2"><DestinationsWeather /></div>
              <div><WeatherCard location="Delhi, India" showForecast={true} /></div>
            </div>
          </div>
        )

      case 'heritage':
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-heritage font-bold text-heritage-maroon">Heritage Sights</h1>
                <p className="text-heritage-gold font-hindi text-lg">\u0910\u0924\u093F\u0939\u093E\u0938\u093F\u0915 \u0926\u0930\u094D\u0936\u0928\u0940\u092F \u0938\u094D\u0925\u0932</p>
              </div>
              <div className="flex items-center space-x-4">
                <select className="px-4 py-2 border border-heritage-bronze/30 rounded-xl focus:border-heritage-maroon">
                  <option>All States</option>
                  <option>Uttar Pradesh</option>
                  <option>Rajasthan</option>
                  <option>Karnataka</option>
                  <option>Tamil Nadu</option>
                  <option>Kerala</option>
                  <option>Maharashtra</option>
                </select>
                <button className="btn-heritage">Add to Wishlist</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: 'Taj Mahal', hindi: '\u0924\u093E\u091C \u092E\u0939\u0932', location: 'Agra, Uttar Pradesh', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Taj_Mahal-10_(cropped).jpg', description: 'Iconic white marble mausoleum, a UNESCO World Heritage Site and one of the Seven Wonders of the World', rating: 4.9, timeNeeded: '3-4 hours', entryFee: '\u20B950', highlights: ['Mughal Architecture', 'UNESCO Heritage', 'Marble Inlay', 'Gardens'], bestTime: 'Sunrise & Sunset' },
                { name: 'Hawa Mahal', hindi: '\u0939\u0935\u093E \u092E\u0939\u0932', location: 'Jaipur, Rajasthan', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/East_facade_Hawa_Mahal_Jaipur_from_ground_level_(July_2022)_-_img_03.jpg', description: 'Palace of Winds with 953 windows, an iconic pink sandstone marvel of Rajput architecture', rating: 4.7, timeNeeded: '1-2 hours', entryFee: '\u20B950', highlights: ['Rajput Architecture', 'Pink City Icon', '953 Windows', 'Photography'], bestTime: 'Morning' },
                { name: 'Hampi Ruins', hindi: '\u0939\u092E\u094D\u092A\u0940 \u0915\u0947 \u0916\u0902\u0921\u0939\u0930', location: 'Hampi, Karnataka', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Hampi,_India,_Community_hall_(sabha_mandapa)_of_Vijaya_Vitthala_Temple.jpg', description: 'Magnificent ruins of the Vijayanagara Empire, a UNESCO World Heritage Site spanning 26 sq km', rating: 4.8, timeNeeded: 'Full Day', entryFee: '\u20B940', highlights: ['Vijayanagara Empire', 'Stone Chariot', 'Temple Complex', 'UNESCO Site'], bestTime: 'Winter Season' },
                { name: 'Meenakshi Temple', hindi: '\u092E\u0940\u0928\u093E\u0915\u094D\u0937\u0940 \u092E\u0902\u0926\u093F\u0930', location: 'Madurai, Tamil Nadu', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Meenakshi_Amman_West_Tower.jpg', description: 'Ancient Dravidian temple with 14 colorful gopurams covered in thousands of mythological figures', rating: 4.8, timeNeeded: '2-3 hours', entryFee: 'Free', highlights: ['Dravidian Architecture', 'Colorful Gopurams', 'Spiritual Experience', 'Sculptures'], bestTime: 'Early Morning' },
                { name: 'Amber Fort', hindi: '\u0906\u092E\u0947\u0930 \u0915\u093F\u0932\u093E', location: 'Jaipur, Rajasthan', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Amber_Palace_Jaipur_Pano.JPG', description: 'Majestic Rajput hilltop fort with artistic Hindu elements and stunning mirror work palace', rating: 4.7, timeNeeded: '3-4 hours', entryFee: '\u20B9200', highlights: ['Rajput Fort', 'Sheesh Mahal', 'Elephant Rides', 'Light Show'], bestTime: 'Morning & Evening' },
                { name: 'Ajanta & Ellora Caves', hindi: '\u0905\u091C\u0902\u0924\u093E \u0914\u0930 \u090F\u0932\u094B\u0930\u093E \u0917\u0941\u092B\u093E\u090F\u0902', location: 'Aurangabad, Maharashtra', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Ellora_cave16_001.jpg', description: 'Rock-cut cave monuments with Buddhist, Hindu & Jain art spanning centuries', rating: 4.8, timeNeeded: 'Full Day', entryFee: '\u20B940', highlights: ['Rock-Cut Caves', 'Buddhist Art', 'Jain Sculptures', 'UNESCO Heritage'], bestTime: 'Winter Morning' }
              ].map((site, index) => (
                <motion.div key={site.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="card-heritage overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-500">
                  <div className="relative h-56 overflow-hidden">
                    <img src={site.image} alt={site.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute top-4 right-4"><Heart className="w-6 h-6 text-white hover:text-heritage-gold cursor-pointer transition-colors" /></div>
                    <div className="absolute top-4 left-4"><span className="bg-heritage-maroon text-white px-3 py-1 rounded-full text-sm font-semibold">{site.entryFee}</span></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="flex items-center space-x-2 mb-2">
                        <Star className="w-4 h-4 fill-heritage-gold text-heritage-gold" />
                        <span className="font-semibold">{site.rating}</span>
                        <span className="text-sm opacity-80">\u2022 {site.bestTime}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">{site.name}</h3>
                    <p className="text-heritage-gold font-hindi text-sm mb-2">{site.hindi}</p>
                    <p className="text-heritage-maroon flex items-center mb-3"><MapPin size={16} className="mr-1" />{site.location}</p>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{site.description}</p>
                    <div className="mb-4"><div className="flex flex-wrap gap-1">{site.highlights.slice(0, 3).map((h, i) => (<span key={i} className="text-xs bg-heritage-beige text-heritage-maroon px-2 py-1 rounded-full">{h}</span>))}</div></div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 flex items-center"><Clock size={16} className="mr-1" />{site.timeNeeded}</span>
                      <button className="btn-heritage-outline text-sm px-6 py-2 hover:bg-heritage-maroon hover:text-white transition-colors">Explore</button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {[
                { name: 'Temples & Monuments', count: '50+', icon: '\u{1F3DB}\uFE0F', color: 'from-red-500 to-red-700' },
                { name: 'Forts & Palaces', count: '30+', icon: '\u{1F3F0}', color: 'from-blue-500 to-blue-700' },
                { name: 'Museums & Galleries', count: '25+', icon: '\u{1F3A8}', color: 'from-green-500 to-green-700' },
                { name: 'UNESCO World Heritage', count: '40+', icon: '\u{1F4DC}', color: 'from-purple-500 to-purple-700' },
              ].map((category) => (
                <motion.div key={category.name} whileHover={{ scale: 1.05 }} className="card-heritage p-6 text-center cursor-pointer group">
                  <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <span className="text-3xl">{category.icon}</span>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1">{category.name}</h3>
                  <p className="text-heritage-maroon font-bold text-lg">{category.count}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-heritage-maroon mb-2">Hidden Gems of India</h2>
                <p className="text-heritage-gold font-hindi text-lg">\u092D\u093E\u0930\u0924 \u0915\u0947 \u091B\u0941\u092A\u0947 \u0930\u0924\u094D\u0928</p>
                <p className="text-gray-600 mt-2">Discover the lesser-known heritage treasures across India</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { name: 'Chand Baori', hindi: '\u091A\u093E\u0901\u0926 \u092C\u093E\u0935\u0921\u093C\u0940', location: 'Abhaneri, Rajasthan', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Chand_Baori.png', description: 'One of the deepest and largest stepwells in India with 3,500 narrow steps across 13 levels, creating a mesmerizing geometric pattern.', highlights: ['Stepwell Architecture', 'Geometric Marvel', 'Photography'], uniqueness: 'Deepest stepwell in the world' },
                  { name: 'Lepakshi Temple', hindi: '\u0932\u0947\u092A\u093E\u0915\u094D\u0937\u0940 \u092E\u0902\u0926\u093F\u0930', location: 'Anantapur, Andhra Pradesh', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Front_side_of_Veerabhadra_Temple,_Lepakshi.jpg', description: 'Vijayanagara-era temple with a famous hanging pillar that defies gravity and exquisite frescoes.', highlights: ['Hanging Pillar', 'Frescoes', 'Vijayanagara Art'], uniqueness: 'Gravity-defying hanging pillar' },
                  { name: 'Bhangarh Fort', hindi: '\u092D\u093E\u0928\u0917\u0922\u093C \u0915\u093F\u0932\u093E', location: 'Alwar, Rajasthan', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bhangarh_Fort_-_Royal_Palace_Bhangarh_(July_2022)_-_img_22.jpg', description: 'Mysterious abandoned 17th-century fort surrounded by legends and stories, attracting history and adventure lovers.', highlights: ['Mysterious Fort', 'Historical Legends', 'Adventure'], uniqueness: 'Most haunted place in India' },
                  { name: 'Dholavira', hindi: '\u0927\u094B\u0932\u093E\u0935\u0940\u0930\u093E', location: 'Kutch, Gujarat', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Dholavira1.JPG', description: 'Ancient Indus Valley Civilization site with remarkably well-preserved water harvesting system and city planning.', highlights: ['Indus Valley', 'Ancient City', 'UNESCO Site'], uniqueness: 'Best preserved Harappan city' },
                  { name: 'Ziro Valley', hindi: '\u091C\u093C\u0940\u0930\u094B \u0918\u093E\u091F\u0940', location: 'Arunachal Pradesh', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Ziro_valley_-_a_possible_world_heritage_site.jpg', description: 'Stunning valley home to the Apatani tribe with unique nose plugs tradition and UNESCO tentative list rice cultivation.', highlights: ['Tribal Culture', 'Rice Terraces', 'Music Festival'], uniqueness: 'Living tribal heritage community' },
                  { name: 'Mawlynnong', hindi: '\u092E\u093E\u0935\u0932\u093F\u0928\u0949\u0902\u0917', location: 'East Khasi Hills, Meghalaya', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Street_in_Mawlynnong.jpg', description: 'Asia\'s cleanest village with living root bridges, bamboo dustbins, and pristine natural beauty.', highlights: ['Cleanest Village', 'Root Bridges', 'Eco Tourism'], uniqueness: 'Cleanest village in Asia' }
                ].map((place, index) => (
                  <motion.div key={place.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="card-heritage p-6 hover:shadow-2xl transition-all duration-300 border-l-4 border-heritage-gold">
                    <div className="relative h-44 mb-4 rounded-xl overflow-hidden">
                      <img src={place.image} alt={place.name} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold text-gray-800 mb-1">{place.name}</h3>
                      <p className="text-heritage-gold font-hindi text-sm mb-2">{place.hindi}</p>
                      <p className="text-heritage-maroon text-sm flex items-center"><MapPin size={16} className="mr-1" />{place.location}</p>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">{place.description}</p>
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1 mb-3">{place.highlights.map((h, i) => (<span key={i} className="text-xs bg-heritage-beige text-heritage-maroon px-2 py-1 rounded-full">{h}</span>))}</div>
                      <div className="bg-gradient-to-r from-heritage-gold/10 to-heritage-bronze/10 p-2 rounded-lg"><p className="text-xs text-heritage-maroon font-semibold">\u2728 {place.uniqueness}</p></div>
                    </div>
                    <button className="btn-heritage-outline w-full text-sm py-2 hover:bg-heritage-maroon hover:text-white transition-colors">Discover Hidden Gem</button>
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
                <p className="text-heritage-gold font-hindi text-lg">\u092E\u094C\u0938\u092E \u0915\u0940 \u091C\u093E\u0928\u0915\u093E\u0930\u0940 - Travel Planning Made Easy</p>
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-hindi">\u0905\u092A\u0921\u0947\u091F: </span>
                {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <div className="space-y-6">
                  <WeatherCard location="Delhi, India" showForecast={true} />
                  <WeatherCard location="Jaipur, Rajasthan" showForecast={false} compact={false} />
                </div>
              </div>
              <div className="lg:col-span-2"><DestinationsWeather /></div>
            </div>
            <div className="card-heritage p-6">
              <h3 className="text-xl font-heritage font-bold text-heritage-maroon mb-4">
                Travel Weather Tips <span className="text-heritage-gold font-hindi text-lg ml-3">\u092F\u093E\u0924\u094D\u0930\u093E \u092E\u094C\u0938\u092E \u0938\u0941\u091D\u093E\u0935</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="text-green-600 font-semibold mb-2">🌞 Excellent Weather</div>
                  <div className="text-sm text-green-700"><p>15-28\u00B0C, Clear skies</p><p className="font-hindi mt-1">\u0909\u0924\u094D\u0924\u092E \u092E\u094C\u0938\u092E</p></div>
                  <div className="text-xs text-green-600 mt-2">Perfect for heritage sites, photography, walking tours</div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="text-blue-600 font-semibold mb-2">🌤️ Good Weather</div>
                  <div className="text-sm text-blue-700"><p>10-35\u00B0C, Partly cloudy</p><p className="font-hindi mt-1">\u0905\u091A\u094D\u091B\u093E \u092E\u094C\u0938\u092E</p></div>
                  <div className="text-xs text-blue-600 mt-2">Great for museums, cultural events, indoor attractions</div>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="text-yellow-600 font-semibold mb-2">\u26C5 Fair Weather</div>
                  <div className="text-sm text-yellow-700"><p>5-40\u00B0C, Mixed conditions</p><p className="font-hindi mt-1">\u0938\u093E\u092E\u093E\u0928\u094D\u092F \u092E\u094C\u0938\u092E</p></div>
                  <div className="text-xs text-yellow-600 mt-2">Indoor activities recommended, flexible planning needed</div>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="text-red-600 font-semibold mb-2">🌧️ Poor Weather</div>
                  <div className="text-sm text-red-700"><p>Extreme conditions</p><p className="font-hindi mt-1">\u0916\u0930\u093E\u092C \u092E\u094C\u0938\u092E</p></div>
                  <div className="text-xs text-red-600 mt-2">Consider postponing outdoor activities, stay indoors</div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">🌨️ Winter (Dec-Feb)</h4>
                  <p className="text-sm text-blue-700 mb-2 font-hindi">\u0938\u0930\u094D\u0926\u0940 - \u0938\u092C\u0938\u0947 \u0905\u091A\u094D\u091B\u093E \u0938\u092E\u092F</p>
                  <ul className="text-xs text-blue-600 space-y-1"><li>\u2022 Perfect for Rajasthan, South India</li><li>\u2022 Temperature: 5-25\u00B0C across regions</li><li>\u2022 Best for heritage tours</li><li>\u2022 Ideal for hill stations</li></ul>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">🌸 Spring (Mar-May)</h4>
                  <p className="text-sm text-green-700 mb-2 font-hindi">\u0935\u0938\u0902\u0924 - \u092B\u0942\u0932\u094B\u0902 \u0915\u093E \u0938\u092E\u092F</p>
                  <ul className="text-xs text-green-600 space-y-1"><li>\u2022 Warm but pleasant mornings</li><li>\u2022 Temperature: 20-40\u00B0C</li><li>\u2022 Great for Himalayan regions</li><li>\u2022 Holi & spring festivals</li></ul>
                </div>
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">🌧️ Monsoon (Jun-Sep)</h4>
                  <p className="text-sm text-gray-700 mb-2 font-hindi">\u092C\u0930\u0938\u093E\u0924 - \u092C\u093E\u0930\u093F\u0936 \u0915\u093E \u0938\u092E\u092F</p>
                  <ul className="text-xs text-gray-600 space-y-1"><li>\u2022 Lush green landscapes</li><li>\u2022 Temperature: 25-35\u00B0C</li><li>\u2022 Kerala & Northeast ideal</li><li>\u2022 Waterfalls at their best</li></ul>
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
                <p className="text-heritage-gold font-hindi text-lg">\u0938\u094D\u0925\u093E\u0928\u0940\u092F \u0917\u093E\u0907\u0921</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: 'Rajesh Sharma', hindi: '\u0930\u093E\u091C\u0947\u0936 \u0936\u0930\u094D\u092E\u093E', specialty: 'Heritage & History Expert', experience: '12 years', rating: 4.9, reviews: 256, languages: ['Hindi', 'English', 'Urdu'], price: '\u20B91,500/day', image: '\u{1F468}\u200D\u{1F393}', description: 'Specialized in Mughal heritage walks and Delhi history', achievements: ['Certified Guide', 'History Scholar', 'Museum Expert'], areas: ['Delhi', 'Agra', 'Jaipur'] },
                { name: 'Lakshmi Nair', hindi: '\u0932\u0915\u094D\u0937\u094D\u092E\u0940 \u0928\u093E\u092F\u0930', specialty: 'South India Cultural Guide', experience: '10 years', rating: 4.8, reviews: 203, languages: ['Malayalam', 'English', 'Hindi', 'Tamil'], price: '\u20B91,300/day', image: '\u{1F469}\u200D\u{1F3A8}', description: 'Expert in Kerala backwaters and South Indian temples', achievements: ['Temple Scholar', 'Ayurveda Expert', 'Cultural Ambassador'], areas: ['Kerala', 'Tamil Nadu', 'Karnataka'] },
                { name: 'Vikram Singh', hindi: '\u0935\u093F\u0915\u094D\u0930\u092E \u0938\u093F\u0902\u0939', specialty: 'Rajasthan Desert Expert', experience: '15 years', rating: 4.9, reviews: 312, languages: ['Hindi', 'English', 'Rajasthani'], price: '\u20B91,800/day', image: '\u{1F3DC}\uFE0F', description: 'Expert in Rajasthani forts, palaces and desert safaris', achievements: ['Royal Heritage Expert', 'Desert Guide', 'Folk Culture Specialist'], areas: ['Jaipur', 'Udaipur', 'Jaisalmer'] },
                { name: 'Priya Banerjee', hindi: '\u092A\u094D\u0930\u093F\u092F\u093E \u092C\u0928\u0930\u094D\u091C\u0940', specialty: 'Food & Culinary Tours', experience: '8 years', rating: 4.7, reviews: 189, languages: ['Bengali', 'English', 'Hindi'], price: '\u20B91,200/day', image: '\u{1F468}\u200D\u{1F373}', description: 'Authentic Indian street food and regional cuisine expert', achievements: ['Culinary Expert', 'Food Blogger', 'Restaurant Guide'], areas: ['Kolkata', 'Delhi', 'Mumbai'] },
                { name: 'Tenzing Dorji', hindi: '\u0924\u0947\u0928\u091C\u093F\u0902\u0917 \u0926\u094B\u0930\u094D\u091C\u0940', specialty: 'Himalayan Adventure Guide', experience: '14 years', rating: 4.8, reviews: 175, languages: ['Nepali', 'English', 'Hindi', 'Tibetan'], price: '\u20B92,000/day', image: '\u{1F3D4}\uFE0F', description: 'Expert in trekking, mountaineering, and Himalayan culture', achievements: ['Mountain Guide', 'Wildlife Expert', 'Eco-Tourism Pioneer'], areas: ['Ladakh', 'Sikkim', 'Darjeeling'] },
                { name: 'Meera Iyer', hindi: '\u092E\u0940\u0930\u093E \u0905\u092F\u094D\u092F\u0930', specialty: 'Spiritual & Wellness Guide', experience: '11 years', rating: 4.9, reviews: 275, languages: ['Hindi', 'English', 'Sanskrit', 'Tamil'], price: '\u20B91,400/day', image: '\u{1F549}\uFE0F', description: 'Expert in yoga retreats, Ayurveda, and spiritual sites', achievements: ['Yoga Instructor', 'Ayurveda Practitioner', 'Temple Historian'], areas: ['Varanasi', 'Rishikesh', 'Haridwar'] },
                { name: 'Arjun Reddy', hindi: '\u0905\u0930\u094D\u091C\u0941\u0928 \u0930\u0947\u0921\u094D\u0921\u0940', specialty: 'Photography & Film Guide', experience: '7 years', rating: 4.6, reviews: 128, languages: ['Telugu', 'English', 'Hindi'], price: '\u20B91,600/day', image: '\u{1F4F8}', description: 'Professional photographer specializing in heritage and cultural documentation', achievements: ['Award Photographer', 'Film Location Scout', 'Visual Storyteller'], areas: ['Hampi', 'Hyderabad', 'Goa'] },
                { name: 'Fatima Khan', hindi: '\u092B\u093C\u093E\u0924\u093F\u092E\u093E \u0916\u093E\u0928', specialty: 'Mughal Heritage Specialist', experience: '9 years', rating: 4.8, reviews: 198, languages: ['Urdu', 'Hindi', 'English'], price: '\u20B91,350/day', image: '\u{1F4DA}', description: 'Expert in Mughal architecture, Islamic art, and medieval Indian history', achievements: ['Islamic Art Scholar', 'Heritage Conservator', 'Mughal Historian'], areas: ['Delhi', 'Agra', 'Lucknow'] },
                { name: 'Kiran Desai', hindi: '\u0915\u093F\u0930\u0923 \u0926\u0947\u0938\u093E\u0908', specialty: 'Wildlife & Nature Guide', experience: '13 years', rating: 4.7, reviews: 164, languages: ['Hindi', 'English', 'Gujarati'], price: '\u20B91,500/day', image: '\u{1F42F}', description: 'Specializes in wildlife safaris and eco-tourism experiences', achievements: ['Naturalist', 'Tiger Expert', 'Eco-Tourism Specialist'], areas: ['Ranthambore', 'Jim Corbett', 'Gir Forest'] }
              ].map((guide, index) => (
                <motion.div key={guide.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="card-heritage p-6 hover:shadow-2xl transition-all duration-300">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-heritage-maroon to-heritage-bronze rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">{guide.image}</div>
                    <h3 className="text-xl font-semibold text-gray-800">{guide.name}</h3>
                    <p className="text-heritage-gold font-hindi text-sm">{guide.hindi}</p>
                    <p className="text-heritage-maroon font-medium">{guide.specialty}</p>
                  </div>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between"><span className="text-gray-600">Experience:</span><span className="font-semibold">{guide.experience}</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Rating:</span><div className="flex items-center"><Star className="w-4 h-4 fill-heritage-gold text-heritage-gold mr-1" /><span className="font-semibold">{guide.rating}</span><span className="text-gray-500 text-sm ml-1">({guide.reviews})</span></div></div>
                    <div className="flex justify-between"><span className="text-gray-600">Price:</span><span className="font-bold text-heritage-maroon">{guide.price}</span></div>
                  </div>
                  <div className="mb-4">
                    <p className="text-gray-600 text-sm mb-3">{guide.description}</p>
                    <div className="mb-3"><span className="text-xs text-gray-500 mb-1 block">Coverage Areas:</span><div className="flex flex-wrap gap-1 mb-2">{guide.areas.map((a, i) => (<span key={i} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">{a}</span>))}</div></div>
                    <div className="flex flex-wrap gap-1 mb-3">{guide.languages.map((l, i) => (<span key={i} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{l}</span>))}</div>
                    <div className="flex flex-wrap gap-1">{guide.achievements.map((a, i) => (<span key={i} className="text-xs bg-heritage-beige text-heritage-maroon px-2 py-1 rounded-full">{a}</span>))}</div>
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
                <p className="text-heritage-gold font-hindi text-lg">\u0935\u093F\u0930\u093E\u0938\u0924 \u0939\u094B\u091F\u0932</p>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {[
                { name: 'Taj Lake Palace, Udaipur', hindi: '\u0924\u093E\u091C \u0932\u0947\u0915 \u092A\u0948\u0932\u0947\u0938', category: 'Luxury Heritage', location: 'Lake Pichola, Udaipur', rating: 4.9, price: '\u20B925,000', image: '\u{1F3F0}', amenities: ['Lake Palace', 'Royal Spa', 'Fine Dining', 'Boat Rides'], description: 'Floating palace on Lake Pichola offering royal Rajasthani luxury' },
                { name: 'Rambagh Palace, Jaipur', hindi: '\u0930\u093E\u092E\u092C\u093E\u0917 \u092A\u0948\u0932\u0947\u0938', category: 'Heritage Palace', location: 'Bhawani Singh Road, Jaipur', rating: 4.8, price: '\u20B918,000', image: '\u{1F3DB}\uFE0F', amenities: ['Royal Suites', 'Polo Ground', 'Mughal Gardens', 'Heritage Walk'], description: 'Former residence of the Maharaja of Jaipur, ultimate royal experience' },
                { name: 'Kumarakom Lake Resort', hindi: '\u0915\u0941\u092E\u093E\u0930\u0915\u094B\u092E \u0932\u0947\u0915 \u0930\u093F\u091C\u093C\u0949\u0930\u094D\u091F', category: 'Backwater Resort', location: 'Kumarakom, Kerala', rating: 4.7, price: '\u20B912,000', image: '\u{1F343}', amenities: ['Ayurveda Spa', 'Backwater Views', 'Houseboat', 'Kerala Cuisine'], description: 'Luxury resort on Vembanad Lake with traditional Kerala architecture' },
                { name: 'Neemrana Fort Palace', hindi: '\u0928\u0940\u092E\u0930\u093E\u0923\u093E \u0915\u093F\u0932\u093E \u092E\u0939\u0932', category: 'Fort Hotel', location: 'Neemrana, Rajasthan', rating: 4.6, price: '\u20B98,500', image: '\u{1F3E0}', amenities: ['Fort Heritage', 'Zip-lining', 'Cultural Evenings', 'Pool'], description: '15th-century fort palace with panoramic Aravalli views' }
              ].map((hotel, index) => (
                <motion.div key={hotel.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="card-heritage overflow-hidden hover:shadow-2xl transition-all duration-300">
                  <div className="flex">
                    <div className="w-1/3 bg-gradient-to-br from-heritage-beige to-heritage-bronze flex items-center justify-center text-6xl">{hotel.image}</div>
                    <div className="flex-1 p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800">{hotel.name}</h3>
                          <p className="text-heritage-gold font-hindi text-sm">{hotel.hindi}</p>
                          <p className="text-heritage-maroon text-sm">{hotel.category}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center"><Star className="w-4 h-4 fill-heritage-gold text-heritage-gold mr-1" /><span className="font-semibold">{hotel.rating}</span></div>
                          <p className="text-heritage-maroon font-bold text-lg">{hotel.price}/night</p>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">{hotel.description}</p>
                      <p className="text-gray-500 text-sm mb-4 flex items-center"><MapPin size={16} className="mr-1" />{hotel.location}</p>
                      <div className="flex flex-wrap gap-1 mb-4">{hotel.amenities.map((a, i) => (<span key={i} className="text-xs bg-heritage-beige text-heritage-maroon px-2 py-1 rounded-full">{a}</span>))}</div>
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
                <h1 className="text-4xl font-heritage font-bold text-heritage-maroon">Indian Cuisine</h1>
                <p className="text-heritage-gold font-hindi text-lg">\u092D\u093E\u0930\u0924\u0940\u092F \u0935\u094D\u092F\u0902\u091C\u0928 \u0914\u0930 \u0938\u0902\u0938\u094D\u0915\u0943\u0924\u093F</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'North Indian', hindi: '\u0909\u0924\u094D\u0924\u0930 \u092D\u093E\u0930\u0924\u0940\u092F', icon: '\u{1F35B}', count: '30+ dishes' },
                { name: 'South Indian', hindi: '\u0926\u0915\u094D\u0937\u093F\u0923 \u092D\u093E\u0930\u0924\u0940\u092F', icon: '\u{1F958}', count: '25+ varieties' },
                { name: 'Street Food', hindi: '\u0938\u094D\u091F\u094D\u0930\u0940\u091F \u092B\u0942\u0921', icon: '\u{1F959}', count: '40+ snacks' },
                { name: 'Sweets & Desserts', hindi: '\u092E\u093F\u0920\u093E\u0908', icon: '\u{1F370}', count: '50+ types' },
              ].map((category) => (
                <motion.div key={category.name} whileHover={{ scale: 1.05 }} className="card-heritage p-6 text-center cursor-pointer">
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="font-semibold text-gray-800">{category.name}</h3>
                  <p className="text-heritage-gold font-hindi text-sm">{category.hindi}</p>
                  <p className="text-heritage-maroon text-sm">{category.count}</p>
                </motion.div>
              ))}
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">Recommended Restaurants <span className="text-heritage-gold font-hindi">\u0905\u0928\u0941\u0936\u0902\u0938\u093F\u0924 \u0930\u0947\u0938\u094D\u0924\u0930\u093E\u0902</span></h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { name: 'Bukhara, ITC Maurya', specialty: 'Frontier Cuisine', signature: 'Dal Bukhara, Tandoori Raan', price: '\u20B9\u20B9\u20B9\u20B9', rating: 4.8, location: 'New Delhi' },
                  { name: 'Karavalli', specialty: 'Coastal Karnataka Cuisine', signature: 'Mangalore Prawn Fry, Appam', price: '\u20B9\u20B9\u20B9', rating: 4.7, location: 'Bangalore' },
                  { name: 'Tunday Kababi', specialty: 'Lucknowi Kebabs', signature: 'Galouti Kebab, Biryani', price: '\u20B9\u20B9', rating: 4.6, location: 'Lucknow' },
                  { name: 'Chandni Chowk Food Trail', specialty: 'Delhi Street Food', signature: 'Paranthe, Chole Bhature, Jalebi', price: '\u20B9', rating: 4.9, location: 'Old Delhi' }
                ].map((restaurant, index) => (
                  <motion.div key={restaurant.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} className="card-heritage p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div><h3 className="text-lg font-semibold text-gray-800">{restaurant.name}</h3><p className="text-heritage-maroon text-sm">{restaurant.specialty}</p></div>
                      <div className="text-right"><div className="flex items-center"><Star className="w-4 h-4 fill-heritage-gold text-heritage-gold mr-1" /><span className="font-semibold">{restaurant.rating}</span></div><p className="text-heritage-bronze font-bold">{restaurant.price}</p></div>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">Signature: {restaurant.signature}</p>
                    <p className="text-gray-500 text-sm mb-4 flex items-center"><MapPin size={16} className="mr-1" />{restaurant.location}</p>
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
                <p className="text-heritage-gold font-hindi text-lg">\u0938\u093E\u0902\u0938\u094D\u0915\u0943\u0924\u093F\u0915 \u0915\u093E\u0930\u094D\u092F\u0915\u094D\u0930\u092E</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: 'Kathak Dance Recital', hindi: '\u0915\u0925\u0915 \u0928\u0943\u0924\u094D\u092F', category: 'Classical Dance', venue: 'India Habitat Centre, Delhi', description: 'Classical North Indian dance form with intricate footwork and expressive storytelling through graceful movements.', duration: '2 hours', price: '\u20B9500-2000', highlights: ['Classical Dance', 'Storytelling', 'Live Music', 'Cultural Heritage'], nextEvent: 'Every Saturday 7:00 PM', icon: '\u{1F483}' },
                { name: 'Rajasthani Folk Night', hindi: '\u0930\u093E\u091C\u0938\u094D\u0925\u093E\u0928\u0940 \u0932\u094B\u0915 \u0938\u0902\u0917\u0940\u0924', category: 'Folk Music', venue: 'Desert Camps, Jaisalmer', description: 'Experience Ghoomar dance, Kalbeliya performers, and Manganiyar musicians under the stars in the Thar Desert.', duration: '3-4 hours', price: '\u20B91500-4000', highlights: ['Desert Setting', 'Traditional Music', 'Fire Dance', 'Star Gazing'], nextEvent: 'Nightly shows Oct-Mar', icon: '\u{1F3B6}' },
                { name: 'Bharatanatyam Performance', hindi: '\u092D\u0930\u0924\u0928\u093E\u091F\u094D\u092F\u092E', category: 'Classical Dance', venue: 'Music Academy, Chennai', description: 'Ancient Tamil dance form combining nritta, nritya, and natya elements with Carnatic music accompaniment.', duration: '2 hours', price: '\u20B9400-1200', highlights: ['Classical Dance', 'Carnatic Music', 'Temple Art', 'Mythology'], nextEvent: 'December Season', icon: '\u{1F3AD}' },
                { name: 'Kerala Kathakali Show', hindi: '\u0915\u0925\u0915\u0932\u0940 \u092A\u094D\u0930\u0926\u0930\u094D\u0936\u0928', category: 'Classical Dance-Drama', venue: 'Cochin Cultural Centre', description: 'Elaborate classical dance-drama with colorful costumes, face paint, and stories from Hindu epics.', duration: '2-3 hours', price: '\u20B9350-800', highlights: ['Face Painting', 'Epic Stories', 'Classical Art', 'Costumes'], nextEvent: 'Daily Evening Shows', icon: '\u{1F3A8}' },
                { name: 'Block Printing Workshop', hindi: '\u092C\u094D\u0932\u0949\u0915 \u092A\u094D\u0930\u093F\u0902\u091F\u093F\u0902\u0917', category: 'Traditional Craft', venue: 'Sanganer, Jaipur', description: 'Learn the ancient art of hand block printing on fabric from master artisans using carved wooden blocks.', duration: 'Full Day', price: '\u20B91500-3000', highlights: ['Hands-on Learning', 'Traditional Craft', 'Take Home Art', 'Artisan Meet'], nextEvent: 'Weekend Workshops', icon: '\u{1F9F5}' },
                { name: 'Ganga Aarti Ceremony', hindi: '\u0917\u0902\u0917\u093E \u0906\u0930\u0924\u0940', category: 'Spiritual Experience', venue: 'Dashashwamedh Ghat, Varanasi', description: 'Mesmerizing evening fire ritual on the banks of the Ganges with chanting, bells, and floating diyas.', duration: '1.5 hours', price: 'Free', highlights: ['Spiritual Experience', 'Fire Ritual', 'River Setting', 'Ancient Tradition'], nextEvent: 'Daily at Sunset', icon: '\u{1FA94}' },
                { name: 'Mehndi Art Workshop', hindi: '\u092E\u0947\u0939\u0902\u0926\u0940 \u0915\u0932\u093E', category: 'Traditional Art', venue: 'Various cities', description: 'Learn intricate henna designs with professional artists, covering traditional and modern patterns.', duration: '2-3 hours', price: '\u20B9500-1000', highlights: ['Henna Art', 'Traditional Patterns', 'Hands-on', 'Cultural Significance'], nextEvent: 'On Request', icon: '\u{1F58C}\uFE0F' },
                { name: 'Chhau Masked Dance', hindi: '\u091B\u094C \u0928\u0943\u0924\u094D\u092F', category: 'Folk Dance', venue: 'Purulia & Mayurbhanj', description: 'Martial arts-influenced dance with elaborate masks depicting mythological characters. Night performances with fire effects.', duration: '3-4 hours', price: '\u20B9600-1500', highlights: ['Masked Dance', 'Martial Arts', 'Mythology', 'Fire Effects'], nextEvent: 'Festival Seasons', icon: '\u{1F3AA}' },
                { name: 'Pottery of Khurja', hindi: '\u0916\u0941\u0930\u094D\u091C\u093E \u0915\u0940 \u092E\u093F\u091F\u094D\u091F\u0940', category: 'Traditional Craft', venue: 'Khurja, Uttar Pradesh', description: 'Visit India\'s ceramic capital and learn pottery making from generations-old craftsmen in their workshops.', duration: 'Half Day', price: '\u20B9800-1500', highlights: ['Pottery Making', 'Traditional Craft', 'Factory Visit', 'Take Home'], nextEvent: 'Weekdays', icon: '\u{1F3FA}' }
              ].map((event, index) => (
                <motion.div key={event.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="card-heritage p-6 hover:shadow-2xl transition-all duration-300 group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="text-4xl mr-4">{event.icon}</div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 group-hover:text-heritage-maroon transition-colors">{event.name}</h3>
                        <p className="text-heritage-gold font-hindi text-sm">{event.hindi}</p>
                        <p className="text-heritage-maroon text-sm">{event.category}</p>
                      </div>
                    </div>
                    <div className="text-right"><p className="text-heritage-bronze font-bold">{event.price}</p><p className="text-xs text-gray-500">{event.duration}</p></div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{event.description}</p>
                  <div className="mb-4">
                    <p className="text-gray-500 text-sm mb-2 flex items-center"><MapPin size={16} className="mr-1" />{event.venue}</p>
                    <p className="text-heritage-maroon text-sm font-medium flex items-center"><Clock size={16} className="mr-1" />{event.nextEvent}</p>
                  </div>
                  <div className="mb-4"><div className="flex flex-wrap gap-1">{event.highlights.map((h, i) => (<span key={i} className="text-xs bg-heritage-beige text-heritage-maroon px-2 py-1 rounded-full">{h}</span>))}</div></div>
                  <div className="flex space-x-2">
                    <button className="flex-1 btn-heritage-outline text-sm py-2 hover:bg-heritage-maroon hover:text-white transition-colors">Learn More</button>
                    <button className="flex-1 btn-heritage text-sm py-2">Book Experience</button>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-16">
              <h2 className="text-3xl font-bold text-heritage-maroon mb-8 text-center">Explore India's Rich Cultural Heritage</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { name: 'Classical Arts', hindi: '\u0936\u093E\u0938\u094D\u0924\u094D\u0930\u0940\u092F \u0915\u0932\u093E', count: '20+ Events', icon: '\u{1F3AD}', color: 'from-purple-500 to-purple-700', description: 'Kathak, Bharatanatyam, Hindustani Music' },
                  { name: 'Folk Traditions', hindi: '\u0932\u094B\u0915 \u092A\u0930\u0902\u092A\u0930\u093E', count: '30+ Forms', icon: '\u{1F3AA}', color: 'from-green-500 to-green-700', description: 'Ghoomar, Bhangra, Lavani, Bihu' },
                  { name: 'Traditional Crafts', hindi: '\u092A\u093E\u0930\u0902\u092A\u0930\u093F\u0915 \u0936\u093F\u0932\u094D\u092A', count: '25+ Crafts', icon: '\u{1F3A8}', color: 'from-orange-500 to-orange-700', description: 'Block Print, Madhubani, Warli, Pottery' },
                  { name: 'Spiritual Practices', hindi: '\u0906\u0927\u094D\u092F\u093E\u0924\u094D\u092E\u093F\u0915 \u0905\u0928\u0941\u0937\u094D\u0920\u093E\u0928', count: '15+ Traditions', icon: '\u{1F64F}', color: 'from-blue-500 to-blue-700', description: 'Yoga, Meditation, Temple Rituals, Aarti' }
                ].map((category) => (
                  <motion.div key={category.name} whileHover={{ scale: 1.05 }} className="card-heritage p-6 text-center cursor-pointer group">
                    <div className={`w-20 h-20 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      <span className="text-4xl">{category.icon}</span>
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-1">{category.name}</h3>
                    <p className="text-heritage-gold font-hindi text-sm mb-2">{category.hindi}</p>
                    <p className="text-heritage-maroon font-bold mb-2">{category.count}</p>
                    <p className="text-xs text-gray-600">{category.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-16 card-heritage p-8">
              <h2 className="text-2xl font-bold text-heritage-maroon mb-6 text-center">
                Cultural Calendar <span className="text-heritage-gold font-hindi">\u0938\u093E\u0902\u0938\u094D\u0915\u0943\u0924\u093F\u0915 \u0915\u0948\u0932\u0947\u0902\u0921\u0930</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { month: 'January', hindi: '\u091C\u0928\u0935\u0930\u0940', events: ['Makar Sankranti', 'Pongal', 'Republic Day'] },
                  { month: 'March-April', hindi: '\u092E\u093E\u0930\u094D\u091A-\u0905\u092A\u094D\u0930\u0948\u0932', events: ['Holi', 'Baisakhi', 'Gudi Padwa'] },
                  { month: 'August-September', hindi: '\u0905\u0917\u0938\u094D\u0924-\u0938\u093F\u0924\u0902\u092C\u0930', events: ['Onam', 'Ganesh Chaturthi', 'Independence Day'] },
                  { month: 'October-November', hindi: '\u0905\u0915\u094D\u091F\u0942\u092C\u0930-\u0928\u0935\u0902\u092C\u0930', events: ['Navratri', 'Diwali', 'Durga Puja'] },
                  { month: 'November-December', hindi: '\u0928\u0935\u0902\u092C\u0930-\u0926\u093F\u0938\u0902\u092C\u0930', events: ['Pushkar Mela', 'Hornbill Festival', 'Christmas'] },
                  { month: 'Year Round', hindi: '\u092A\u0942\u0930\u0947 \u0938\u093E\u0932', events: ['Classical Music Concerts', 'Temple Festivals', 'Craft Fairs'] }
                ].map((period, index) => (
                  <motion.div key={period.month} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} className="bg-gradient-to-br from-heritage-beige/30 to-white p-4 rounded-xl border border-heritage-bronze/20">
                    <h3 className="font-semibold text-heritage-maroon mb-1">{period.month}</h3>
                    <p className="text-heritage-gold font-hindi text-sm mb-3">{period.hindi}</p>
                    <ul className="space-y-1">{period.events.map((ev, i) => (<li key={i} className="text-sm text-gray-600 flex items-center"><span className="w-1.5 h-1.5 bg-heritage-maroon rounded-full mr-2"></span>{ev}</li>))}</ul>
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
                <p className="text-heritage-gold font-hindi text-lg">\u0938\u0947\u091F\u093F\u0902\u0917\u094D\u0938 \u0914\u0930 \u092A\u094D\u0930\u094B\u092B\u093E\u0907\u0932</p>
              </div>
              {updateStatus === 'success' && (
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="bg-green-50 border border-green-200 rounded-xl px-4 py-2">
                  <p className="text-green-800 text-sm">\u2705 Profile updated successfully!</p>
                </motion.div>
              )}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="card-heritage p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Profile Information</h2>
                    <button onClick={() => setIsEditingProfile(!isEditingProfile)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${isEditingProfile ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' : 'btn-heritage'}`}>
                      {isEditingProfile ? 'Cancel' : 'Edit Profile'}
                    </button>
                  </div>
                  {isEditingProfile ? (
                    <form onSubmit={handleProfileUpdate} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><label className="block text-heritage-maroon font-medium mb-2">Full Name *</label><input type="text" name="fullName" value={profileData.fullName} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl border border-heritage-bronze/30 focus:border-heritage-maroon focus:ring-2 focus:ring-heritage-maroon/20 outline-none transition-all" placeholder="Your full name" /></div>
                        <div><label className="block text-heritage-maroon font-medium mb-2">Phone Number</label><input type="tel" name="phone" value={profileData.phone} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-heritage-bronze/30 focus:border-heritage-maroon focus:ring-2 focus:ring-heritage-maroon/20 outline-none transition-all" placeholder="+91 9876543210" /></div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><label className="block text-heritage-maroon font-medium mb-2">Date of Birth</label><input type="date" name="dateOfBirth" value={profileData.dateOfBirth} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-heritage-bronze/30 focus:border-heritage-maroon focus:ring-2 focus:ring-heritage-maroon/20 outline-none transition-all" /></div>
                        <div><label className="block text-heritage-maroon font-medium mb-2">City</label><input type="text" name="city" value={profileData.city} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-heritage-bronze/30 focus:border-heritage-maroon focus:ring-2 focus:ring-heritage-maroon/20 outline-none transition-all" placeholder="New Delhi" /></div>
                      </div>
                      <div>
                        <label className="block text-heritage-maroon font-medium mb-2">Cultural Interests</label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {['Heritage Sites', 'Classical Music', 'Folk Arts', 'Traditional Dance', 'Local Cuisine', 'Festivals', 'Handicrafts', 'Literature', 'Spiritual Tours'].map((interest) => (
                            <label key={interest} className="flex items-center space-x-2 cursor-pointer">
                              <input type="checkbox" checked={profileData.culturalInterests.includes(interest)} onChange={() => handleInterestToggle(interest)} className="w-4 h-4 text-heritage-maroon border-heritage-bronze/30 rounded focus:ring-heritage-maroon" />
                              <span className="text-sm text-gray-700">{interest}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div><label className="block text-heritage-maroon font-medium mb-2">Bio</label><textarea name="bio" value={profileData.bio} onChange={handleInputChange} rows={3} className="w-full px-4 py-3 rounded-xl border border-heritage-bronze/30 focus:border-heritage-maroon focus:ring-2 focus:ring-heritage-maroon/20 outline-none transition-all resize-none" placeholder="Tell us about yourself and your travel interests..." /></div>
                      <div className="flex space-x-4">
                        <button type="submit" disabled={updateStatus === 'loading'} className="flex-1 bg-gradient-to-r from-heritage-maroon to-heritage-bronze text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3">
                          {updateStatus === 'loading' ? (<><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Updating...</>) : ('Save Changes')}
                        </button>
                        <button type="button" onClick={() => setIsEditingProfile(false)} className="px-6 py-3 border border-heritage-bronze/30 text-heritage-maroon rounded-xl font-semibold hover:bg-heritage-beige transition-colors">Cancel</button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div><h3 className="text-sm font-medium text-gray-500 mb-1">Full Name</h3><p className="text-gray-800">{profileData.fullName || 'Not provided'}</p></div>
                        <div><h3 className="text-sm font-medium text-gray-500 mb-1">Email</h3><p className="text-gray-800">{profileData.email || 'Not provided'}</p></div>
                        <div><h3 className="text-sm font-medium text-gray-500 mb-1">Phone</h3><p className="text-gray-800">{profileData.phone || 'Not provided'}</p></div>
                        <div><h3 className="text-sm font-medium text-gray-500 mb-1">City</h3><p className="text-gray-800">{profileData.city || 'Not provided'}</p></div>
                      </div>
                      <div><h3 className="text-sm font-medium text-gray-500 mb-1">Cultural Interests</h3><div className="flex flex-wrap gap-2">{profileData.culturalInterests.length > 0 ? profileData.culturalInterests.map((i, idx) => (<span key={idx} className="text-xs bg-heritage-beige text-heritage-maroon px-3 py-1 rounded-full">{i}</span>)) : <p className="text-gray-600">No interests selected</p>}</div></div>
                      {profileData.bio && (<div><h3 className="text-sm font-medium text-gray-500 mb-1">Bio</h3><p className="text-gray-800">{profileData.bio}</p></div>)}
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-6">
                <div className="card-heritage p-6">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">Account Settings</h3>
                  <div className="space-y-3">
                    <button className="w-full text-left p-3 rounded-lg hover:bg-heritage-beige transition-colors flex items-center justify-between"><span className="text-gray-700">Change Password</span><span className="text-heritage-maroon">\u2192</span></button>
                    <button className="w-full text-left p-3 rounded-lg hover:bg-heritage-beige transition-colors flex items-center justify-between"><span className="text-gray-700">Email Preferences</span><span className="text-heritage-maroon">\u2192</span></button>
                  </div>
                </div>
                <div className="card-heritage p-6">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">Preferences <span className="text-heritage-gold font-hindi text-sm">\u092A\u0938\u0902\u0926</span></h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between"><span className="text-gray-700">Language</span><select className="px-3 py-1 border border-heritage-bronze/30 rounded-lg text-sm"><option>English</option><option>Hindi</option><option>Tamil</option><option>Bengali</option></select></div>
                    <div className="flex items-center justify-between"><span className="text-gray-700">Currency</span><select className="px-3 py-1 border border-heritage-bronze/30 rounded-lg text-sm"><option>INR (\u20B9)</option><option>USD ($)</option></select></div>
                    <div className="flex items-center justify-between"><span className="text-gray-700">Email Notifications</span><input type="checkbox" defaultChecked className="w-4 h-4 text-heritage-maroon border-heritage-bronze/30 rounded" /></div>
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
    <div ref={dashboardRef} className="min-h-screen bg-heritage-beige">
      <header className="bg-white shadow-sm border-b border-heritage-beige/30">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center space-x-4">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden p-2 text-gray-600 hover:text-heritage-maroon"><Menu size={24} /></button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-heritage rounded-lg flex items-center justify-center"><span className="text-white font-bold font-hindi">भ</span></div>
              <h1 className="text-xl font-heritage font-bold text-heritage-gradient">Bhraman</h1>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input type="text" placeholder="Search places, guides, experiences..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-heritage-maroon focus:border-transparent w-80" />
            </div>
            <button className="p-2 text-gray-600 hover:text-heritage-maroon relative"><Bell size={24} /><span className="absolute -top-1 -right-1 w-5 h-5 bg-heritage-maroon text-white text-xs rounded-full flex items-center justify-center">3</span></button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-heritage-maroon rounded-full flex items-center justify-center"><span className="text-white text-sm font-semibold">{(user?.name || profileData.fullName || 'U').charAt(0).toUpperCase()}</span></div>
              <span className="hidden md:block font-medium text-gray-800">{user?.name || profileData.fullName || 'User'}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} flex flex-col h-full lg:h-screen`}>
          <div className="p-6 border-b border-heritage-beige/30 flex-shrink-0">
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden absolute top-4 right-4 p-2 text-gray-600"><X size={20} /></button>
            <h2 className="text-lg font-semibold text-gray-800">Dashboard</h2>
          </div>
          <nav className="p-4 flex-1 overflow-y-auto">
            <ul className="space-y-2">
              {sidebarItems.map((item) => (
                <li key={item.id}>
                  <button onClick={() => { setActiveSection(item.id); setIsSidebarOpen(false) }} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${activeSection === item.id ? 'bg-heritage-maroon text-white' : 'text-gray-600 hover:bg-heritage-beige hover:text-heritage-maroon'}`}>
                    <item.icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <div className="p-4 border-t border-heritage-beige/30 flex-shrink-0 space-y-2">
            <button onClick={handleSignOut} className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-heritage-beige hover:text-heritage-maroon rounded-lg transition-colors duration-200">
              <LogOut size={20} /><span className="font-medium">Logout</span>
            </button>
          </div>
        </aside>
        <main className="flex-1 p-6 lg:p-8">{renderContent()}</main>
      </div>

      {isSidebarOpen && (<div className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden" onClick={() => setIsSidebarOpen(false)} />)}
      <AIChatAssistant isOpen={isChatOpen} onToggle={() => setIsChatOpen(!isChatOpen)} />
    </div>
  )
}
