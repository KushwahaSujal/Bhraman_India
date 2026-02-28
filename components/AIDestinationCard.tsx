'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  MapPin, 
  Star, 
  Clock, 
  Users, 
  Utensils, 
  Camera,
  Brain,
  Loader2,
  RefreshCw
} from 'lucide-react'

interface AIDestinationInfo {
  destination: string
  bestTimeToVisit: string
  highlights: string[]
  culturalSignificance: string
  localCuisine: string[]
  travelTips: string[]
  nearbyAttractions: string[]
  hindiName: string
  historicalContext: string
}

interface AIDestinationCardProps {
  destination: string
  compact?: boolean
}

export default function AIDestinationCard({ destination, compact = false }: AIDestinationCardProps) {
  const [destinationInfo, setDestinationInfo] = useState<AIDestinationInfo | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchDestinationInfo = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/ai/destination?destination=${encodeURIComponent(destination)}`)
      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch destination info')
      }

      setDestinationInfo(data.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load destination information')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (destination) {
      fetchDestinationInfo()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [destination])

  if (loading) {
    return (
      <div className="card-heritage p-6">
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <Loader2 className="animate-spin text-heritage-gold mx-auto mb-2" size={32} />
            <p className="text-heritage-maroon">Getting AI insights for {destination}...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="card-heritage p-6">
        <div className="text-center py-8">
          <div className="text-red-600 mb-4">
            <MapPin size={48} className="mx-auto mb-2 opacity-50" />
            <p className="font-medium">Unable to load destination info</p>
            <p className="text-sm text-gray-600 mt-1">{error}</p>
          </div>
          <button
            onClick={fetchDestinationInfo}
            className="btn-primary inline-flex items-center space-x-2"
          >
            <RefreshCw size={16} />
            <span>Try Again</span>
          </button>
        </div>
      </div>
    )
  }

  if (!destinationInfo) return null

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-heritage p-4"
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-semibold text-heritage-maroon">{destinationInfo.destination}</h3>
            <p className="text-sm text-heritage-gold font-hindi">{destinationInfo.hindiName}</p>
          </div>
          <Brain className="text-heritage-bronze opacity-60" size={20} />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <Clock size={14} className="mr-2 text-heritage-gold" />
            <span>Best time: {destinationInfo.bestTimeToVisit}</span>
          </div>
          
          <div className="text-sm text-gray-700">
            <strong>Highlights:</strong> {destinationInfo.highlights.slice(0, 2).join(', ')}
            {destinationInfo.highlights.length > 2 && '...'}
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-heritage p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-heritage font-bold text-heritage-maroon flex items-center">
            <MapPin className="mr-2" size={24} />
            {destinationInfo.destination}
          </h2>
          <p className="text-heritage-gold font-hindi text-lg">{destinationInfo.hindiName}</p>
        </div>
        <div className="flex items-center space-x-1 bg-heritage-gold/20 px-3 py-1 rounded-full">
          <Brain size={16} className="text-heritage-maroon" />
          <span className="text-xs font-medium text-heritage-maroon">AI Powered</span>
        </div>
      </div>

      {/* Quick Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-heritage-beige/30 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <Clock className="text-heritage-gold mr-2" size={18} />
            <span className="font-semibold text-heritage-maroon">Best Time to Visit</span>
          </div>
          <p className="text-gray-700">{destinationInfo.bestTimeToVisit}</p>
        </div>
        
        <div className="bg-heritage-beige/30 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <Star className="text-heritage-gold mr-2" size={18} />
            <span className="font-semibold text-heritage-maroon">Cultural Significance</span>
          </div>
          <p className="text-gray-700 text-sm">{destinationInfo.culturalSignificance}</p>
        </div>
      </div>

      {/* Historical Context */}
      <div className="mb-6">
        <h3 className="font-semibold text-heritage-maroon mb-2 flex items-center">
          <Camera className="mr-2" size={18} />
          Historical Context
        </h3>
        <p className="text-gray-700 text-sm leading-relaxed">{destinationInfo.historicalContext}</p>
      </div>

      {/* Highlights */}
      <div className="mb-6">
        <h3 className="font-semibold text-heritage-maroon mb-3">Must-See Highlights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {destinationInfo.highlights.map((highlight, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-heritage-gold rounded-full"></div>
              <span className="text-sm text-gray-700">{highlight}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Local Cuisine */}
      <div className="mb-6">
        <h3 className="font-semibold text-heritage-maroon mb-3 flex items-center">
          <Utensils className="mr-2" size={18} />
          Local Cuisine
        </h3>
        <div className="flex flex-wrap gap-2">
          {destinationInfo.localCuisine.map((dish, index) => (
            <span
              key={index}
              className="bg-heritage-gold/20 text-heritage-maroon px-3 py-1 rounded-full text-sm"
            >
              {dish}
            </span>
          ))}
        </div>
      </div>

      {/* Travel Tips */}
      <div className="mb-6">
        <h3 className="font-semibold text-heritage-maroon mb-3">AI Travel Tips</h3>
        <div className="space-y-2">
          {destinationInfo.travelTips.slice(0, 4).map((tip, index) => (
            <div key={index} className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-heritage-bronze rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-sm text-gray-700">{tip}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Nearby Attractions */}
      <div>
        <h3 className="font-semibold text-heritage-maroon mb-3 flex items-center">
          <Users className="mr-2" size={18} />
          Nearby Attractions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {destinationInfo.nearbyAttractions.map((attraction, index) => (
            <div key={index} className="flex items-center space-x-2">
              <MapPin size={14} className="text-heritage-bronze" />
              <span className="text-sm text-gray-700">{attraction}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-heritage-bronze/20 text-center">
        <p className="text-xs text-gray-500">
          Information powered by AI • Always verify current conditions before traveling
        </p>
      </div>
    </motion.div>
  )
}
