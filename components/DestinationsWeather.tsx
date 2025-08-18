'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import WeatherCard from './WeatherCard'
import { 
  MapPin, 
  RefreshCw, 
  Thermometer,
  Sun,
  Cloud,
  CloudRain
} from 'lucide-react'

interface DestinationWeather {
  location: string
  current: {
    temp_c: number
    condition: {
      text: string
      icon: string
    }
    humidity: number
    wind_kph: number
  }
  recommendation: {
    suitability: 'excellent' | 'good' | 'fair' | 'poor'
    message: string
    bengaliMessage: string
    activities: string[]
  }
}

export default function DestinationsWeather() {
  const [destinations, setDestinations] = useState<DestinationWeather[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDestinationsWeather = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('/api/weather/destinations?count=8')
      const data = await response.json()
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch destinations weather')
      }
      
      setDestinations(data.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load weather data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDestinationsWeather()
  }, [])

  const getWeatherIcon = (condition: string) => {
    const conditionLower = condition.toLowerCase()
    if (conditionLower.includes('sunny') || conditionLower.includes('clear')) {
      return <Sun className="text-yellow-500" size={20} />
    } else if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
      return <CloudRain className="text-blue-500" size={20} />
    } else {
      return <Cloud className="text-gray-500" size={20} />
    }
  }

  const getSuitabilityColor = (suitability: string) => {
    switch (suitability) {
      case 'excellent': return 'text-green-600 bg-green-50 border-green-200'
      case 'good': return 'text-blue-600 bg-blue-50 border-blue-200'
      case 'fair': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'poor': return 'text-red-600 bg-red-50 border-red-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-heritage font-bold text-heritage-maroon">
            পশ্চিমবঙ্গের আবহাওয়া (West Bengal Weather)
          </h3>
          <RefreshCw className="animate-spin text-heritage-gold" size={20} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-200 rounded-lg h-32"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="text-center">
          <div className="text-red-600 mb-4">
            <Cloud size={48} className="mx-auto mb-2" />
            <p className="font-medium">Weather data temporarily unavailable</p>
            <p className="text-sm text-gray-600 mt-1">{error}</p>
          </div>
          <button
            onClick={fetchDestinationsWeather}
            className="btn-primary inline-flex items-center space-x-2"
          >
            <RefreshCw size={16} />
            <span>Try Again</span>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-heritage font-bold text-heritage-maroon mb-1">
            পশ্চিমবঙ্গের আবহাওয়া
          </h3>
          <p className="text-sm text-gray-600">West Bengal Weather Conditions</p>
        </div>
        <button
          onClick={fetchDestinationsWeather}
          className="text-heritage-gold hover:text-heritage-maroon transition-colors"
          title="Refresh weather data"
        >
          <RefreshCw size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {destinations.map((destination, index) => (
          <motion.div
            key={destination.location}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gradient-to-br from-heritage-beige/50 to-white rounded-lg p-4 border border-heritage-bronze/20 hover:shadow-md transition-all duration-300"
          >
            {/* Location Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <MapPin size={14} className="text-heritage-gold" />
                <h4 className="font-medium text-heritage-maroon text-sm">
                  {destination.location.replace(', West Bengal', '')}
                </h4>
              </div>
              {getWeatherIcon(destination.current.condition.text)}
            </div>

            {/* Temperature */}
            <div className="mb-3">
              <div className="text-2xl font-bold text-heritage-maroon">
                {Math.round(destination.current.temp_c)}°C
              </div>
              <div className="text-xs text-gray-600">
                {destination.current.condition.text}
              </div>
            </div>

            {/* Weather Details */}
            <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
              <div className="flex items-center space-x-1">
                <Thermometer size={12} className="text-heritage-bronze" />
                <span className="text-gray-600">Humidity: {destination.current.humidity}%</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 rounded-full bg-heritage-gold opacity-60"></div>
                <span className="text-gray-600">Wind: {destination.current.wind_kph} km/h</span>
              </div>
            </div>

            {/* Tourism Suitability */}
            <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getSuitabilityColor(destination.recommendation.suitability)}`}>
              <div className="flex items-center justify-center space-x-1">
                <span>{destination.recommendation.suitability.toUpperCase()}</span>
              </div>
            </div>

            {/* Bengali Message */}
            <div className="mt-2 text-xs text-heritage-maroon font-noto-bengali">
              {destination.recommendation.bengaliMessage}
            </div>

            {/* Activities Preview */}
            <div className="mt-2">
              <div className="text-xs text-gray-500 mb-1">Best for:</div>
              <div className="flex flex-wrap gap-1">
                {destination.recommendation.activities.slice(0, 2).map((activity, actIndex) => (
                  <span
                    key={actIndex}
                    className="text-xs bg-heritage-beige/30 text-heritage-maroon px-2 py-0.5 rounded"
                  >
                    {activity}
                  </span>
                ))}
                {destination.recommendation.activities.length > 2 && (
                  <span className="text-xs text-gray-400">
                    +{destination.recommendation.activities.length - 2} more
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Update Info */}
      <div className="text-center mt-6 text-xs text-gray-500">
        <p>Weather data updates every hour • Powered by WeatherAPI</p>
        <p className="font-noto-bengali mt-1">
          আবহাওয়ার তথ্য প্রতি ঘন্টায় আপডেট হয়
        </p>
      </div>
    </div>
  )
}
