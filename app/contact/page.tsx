'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  ArrowLeft,
  Facebook,
  Twitter,
  Instagram,
  Globe
} from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    tourType: 'heritage'
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus('success')
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        tourType: 'heritage'
      })
    }, 2000)
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Us',
      details: [
        'Bhromon Tourism Office',
        'Heritage Building, College Street',
        'Kolkata, West Bengal 700073',
        'Near University of Calcutta'
      ],
      bengali: 'আমাদের অফিসে আসুন'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: [
        '+91 9876543210',
        '+91 8765432109',
        'Toll Free: 1800-123-4567',
        'Available 24/7'
      ],
      bengali: 'ফোন করুন'
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: [
        'info@bhromon.com',
        'tours@bhromon.com',
        'support@bhromon.com',
        'Quick response guaranteed'
      ],
      bengali: 'ইমেইল করুন'
    },
    {
      icon: Clock,
      title: 'Office Hours',
      details: [
        'Monday - Saturday: 9:00 AM - 8:00 PM',
        'Sunday: 10:00 AM - 6:00 PM',
        'Public Holidays: 10:00 AM - 4:00 PM',
        'Emergency support: 24/7'
      ],
      bengali: 'অফিস সময়'
    }
  ]

  const socialLinks = [
    { icon: Facebook, name: 'Facebook', url: '#', color: 'text-blue-600' },
    { icon: Twitter, name: 'Twitter', url: '#', color: 'text-sky-500' },
    { icon: Instagram, name: 'Instagram', url: '#', color: 'text-pink-600' },
    { icon: Globe, name: 'Website', url: '#', color: 'text-heritage-maroon' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-heritage-beige via-white to-heritage-beige">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/90 backdrop-blur-md shadow-lg border-b border-heritage-bronze/20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/"
              className="flex items-center gap-3 text-heritage-maroon hover:text-heritage-bronze transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-semibold">Back to Home</span>
            </Link>
            
            <div className="text-center">
              <h1 className="text-2xl font-bold text-heritage-maroon">
                Contact <span className="text-heritage-gold font-noto-bengali">যোগাযোগ</span>
              </h1>
              <p className="text-gray-600 text-sm">Get in touch with Bhromon Tourism</p>
            </div>
            
            <div className="w-24"></div> {/* Spacer for centering */}
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-heritage-maroon mb-4">
            Let's Plan Your <span className="text-heritage-gold font-noto-bengali">বাংলা</span> Journey
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Connect with our heritage tourism experts to create unforgettable experiences 
            across the cultural treasures of West Bengal
          </p>
          
          {/* Floating Cultural Elements */}
          <div className="relative mt-8">
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-4 left-1/4 text-6xl opacity-20"
            >
              🏛️
            </motion.div>
            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-2 right-1/4 text-5xl opacity-20"
            >
              🎭
            </motion.div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-3xl font-bold text-heritage-maroon mb-8">
              Get In Touch <span className="text-heritage-gold font-noto-bengali">যোগাযোগ করুন</span>
            </h3>
            
            <div className="space-y-8">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-heritage-bronze/20 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-br from-heritage-maroon to-heritage-bronze p-3 rounded-xl text-white">
                      <info.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-heritage-maroon mb-1">
                        {info.title}
                      </h4>
                      <p className="text-heritage-gold font-noto-bengali text-sm mb-3">
                        {info.bengali}
                      </p>
                      <div className="space-y-1">
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-gray-700 text-sm leading-relaxed">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Media Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-12"
            >
              <h4 className="text-xl font-semibold text-heritage-maroon mb-6">
                Follow Us <span className="text-heritage-gold font-noto-bengali">আমাদের ফলো করুন</span>
              </h4>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-3 bg-white rounded-xl shadow-lg border border-heritage-bronze/20 hover:shadow-xl transition-all duration-300 ${social.color}`}
                  >
                    <social.icon className="w-6 h-6" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-heritage-bronze/20"
          >
            <h3 className="text-3xl font-bold text-heritage-maroon mb-2">
              Plan Your Tour
            </h3>
            <p className="text-heritage-gold font-noto-bengali mb-8">
              আপনার ভ্রমণ পরিকল্পনা করুন
            </p>

            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6"
              >
                <p className="text-green-800 text-center">
                  ✅ Your message has been sent successfully! We'll get back to you soon.
                </p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-heritage-maroon font-medium mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-heritage-bronze/30 focus:border-heritage-maroon focus:ring-2 focus:ring-heritage-maroon/20 outline-none transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-heritage-maroon font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-heritage-bronze/30 focus:border-heritage-maroon focus:ring-2 focus:ring-heritage-maroon/20 outline-none transition-all"
                    placeholder="+91 9876543210"
                  />
                </div>
              </div>

              <div>
                <label className="block text-heritage-maroon font-medium mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-heritage-bronze/30 focus:border-heritage-maroon focus:ring-2 focus:ring-heritage-maroon/20 outline-none transition-all"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-heritage-maroon font-medium mb-2">
                  Tour Interest
                </label>
                <select
                  name="tourType"
                  value={formData.tourType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-heritage-bronze/30 focus:border-heritage-maroon focus:ring-2 focus:ring-heritage-maroon/20 outline-none transition-all"
                >
                  <option value="heritage">Heritage & Cultural Tours</option>
                  <option value="festival">Festival Tours</option>
                  <option value="food">Food & Culinary Tours</option>
                  <option value="spiritual">Spiritual & Temple Tours</option>
                  <option value="nature">Nature & Hill Station Tours</option>
                  <option value="custom">Custom Tour Package</option>
                </select>
              </div>

              <div>
                <label className="block text-heritage-maroon font-medium mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-heritage-bronze/30 focus:border-heritage-maroon focus:ring-2 focus:ring-heritage-maroon/20 outline-none transition-all"
                  placeholder="Tour inquiry / Booking question / General inquiry"
                />
              </div>

              <div>
                <label className="block text-heritage-maroon font-medium mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-heritage-bronze/30 focus:border-heritage-maroon focus:ring-2 focus:ring-heritage-maroon/20 outline-none transition-all resize-none"
                  placeholder="Tell us about your travel plans, preferred dates, group size, special requirements..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-heritage-maroon to-heritage-bronze text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending Message...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>

            <p className="text-gray-600 text-sm mt-6 text-center">
              We typically respond within 2-4 hours during business hours
            </p>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16"
        >
          <h3 className="text-3xl font-bold text-heritage-maroon mb-8 text-center">
            Find Us <span className="text-heritage-gold font-noto-bengali">আমাদের খুঁজুন</span>
          </h3>
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-heritage-bronze/20">
            <div className="bg-gradient-to-br from-heritage-beige to-heritage-bronze/10 rounded-2xl p-8 text-center">
              <MapPin className="w-16 h-16 text-heritage-maroon mx-auto mb-4" />
              <h4 className="text-2xl font-bold text-heritage-maroon mb-2">Our Location</h4>
              <p className="text-gray-700 mb-4">
                Visit our heritage office in the heart of Kolkata's cultural district
              </p>
              <address className="text-gray-600 not-italic leading-relaxed">
                Bhromon Tourism Office<br />
                Heritage Building, College Street<br />
                Kolkata, West Bengal 700073<br />
                Near University of Calcutta
              </address>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-6 bg-heritage-maroon text-white px-6 py-3 rounded-xl font-semibold hover:bg-heritage-bronze transition-colors"
              >
                Get Directions
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
