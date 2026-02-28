'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  Wind, 
  Droplets, 
  Eye,
  MapPin,
  RefreshCw
} from 'lucide-react'

interface WeatherData {
  location: string
  current: {
    temp_c: number
    temp_f: number
    condition: {
      text: string
      icon: string
    }
    humidity: number
    wind_kph: number
    feelslike_c: number
    uv: number
  }
  forecast?: {
    forecastday: Array<{
      date: string
      day: {
        maxtemp_c: number
        mintemp_c: number
        condition: {
          text: string
          icon: string
        }
        chance_of_rain: number
      }
    }>
  }
}

interface WeatherRecommendation {
  suitability: 'excellent' | 'good' | 'fair' | 'poor'
  message: string
  hindiMessage: string
  activities: string[]
}

interface WeatherCardProps {
  location?: string
  showForecast?: boolean
  compact?: boolean
}

export default function WeatherCard({ 
  location = 'Delhi, India', 
  showForecast = false,
  compact = false 
}: WeatherCardProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [recommendation, setRecommendation] = useState<WeatherRecommendation | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchWeather = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const params = new URLSearchParams({
        location,
        ...(showForecast && { days: '3' })
      })
      
      const response = await fetch(`/api/weather?${params}`)
      const data = await response.json()
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch weather')
      }
      
      setWeather(data.data)
      setRecommendation(data.recommendation)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load weather')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWeather()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, showForecast])

  const getWeatherIcon = (condition: string) => {
    const conditionLower = condition.toLowerCase()
    if (conditionLower.includes('sunny') || conditionLower.includes('clear')) {
      return <Sun className="text-yellow-500" size={compact ? 20 : 24} />
    } else if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
      return <CloudRain className="text-blue-500" size={compact ? 20 : 24} />
    } else {
      return <Cloud className="text-gray-500" size={compact ? 20 : 24} />
    }
  }

  const getSuitabilityColor = (suitability: string) => {
    switch (suitability) {
      case 'excellent': return 'text-green-600 bg-green-50'
      case 'good': return 'text-blue-600 bg-blue-50'
      case 'fair': return 'text-yellow-600 bg-yellow-50'
      case 'poor': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  if (loading) {
    return (
      <div className={`heritage-gradient rounded-xl ${compact ? 'p-4' : 'p-6'} text-white`}>
        <div className="animate-pulse flex items-center space-x-2">
          <RefreshCw className="animate-spin" size={20} />
          <span>Loading weather...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700">
        <p className="text-sm">Weather temporarily unavailable</p>
        <button 
          onClick={fetchWeather}
          className="text-xs underline hover:no-underline mt-1"
        >
          Try again
        </button>
      </div>
    )
  }

  if (!weather) return null

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="heritage-gradient rounded-lg p-4 text-white"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MapPin size={16} />
            <span className="text-sm font-medium">{weather.location}</span>
          </div>
          <button onClick={fetchWeather} className="text-heritage-beige hover:text-white">
            <RefreshCw size={14} />
          </button>
        </div>
        
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center space-x-2">
            {getWeatherIcon(weather.current.condition.text)}
            <span className="text-2xl font-bold">{Math.round(weather.current.temp_c)}°C</span>
          </div>
          <div className="text-right text-sm">
            <p className="text-heritage-beige">{weather.current.condition.text}</p>
            <p className="text-xs">Feels like {Math.round(weather.current.feelslike_c)}°</p>
          </div>
        </div>

        {recommendation && (
          <div className="mt-3 text-xs">
            <span className={`px-2 py-1 rounded-full ${getSuitabilityColor(recommendation.suitability)} text-black`}>
              {recommendation.suitability.toUpperCase()}
            </span>
          </div>
        )}
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="heritage-gradient rounded-xl p-6 text-white relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 opacity-10 text-6xl">🌤️</div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <MapPin size={20} />
            <h3 className="font-heritage font-semibold text-lg">{weather.location}</h3>
          </div>
          <button 
            onClick={fetchWeather}
            className="text-heritage-beige hover:text-white transition-colors"
          >
            <RefreshCw size={18} />
          </button>
        </div>

        {/* Current Weather */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            {getWeatherIcon(weather.current.condition.text)}
            <div>
              <div className="text-4xl font-bold">{Math.round(weather.current.temp_c)}°C</div>
              <div className="text-heritage-beige text-sm">
                Feels like {Math.round(weather.current.feelslike_c)}°
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-medium">{weather.current.condition.text}</div>
            <div className="text-heritage-beige text-sm">
              {Math.round(weather.current.temp_f)}°F
            </div>
          </div>
        </div>

        {/* Weather Details */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <Wind size={18} className="mx-auto mb-1 text-heritage-beige" />
            <div className="text-sm font-medium">{weather.current.wind_kph} km/h</div>
            <div className="text-xs text-heritage-beige">Wind</div>
          </div>
          <div className="text-center">
            <Droplets size={18} className="mx-auto mb-1 text-heritage-beige" />
            <div className="text-sm font-medium">{weather.current.humidity}%</div>
            <div className="text-xs text-heritage-beige">Humidity</div>
          </div>
          <div className="text-center">
            <Eye size={18} className="mx-auto mb-1 text-heritage-beige" />
            <div className="text-sm font-medium">UV {weather.current.uv}</div>
            <div className="text-xs text-heritage-beige">Index</div>
          </div>
        </div>

        {/* Tourism Recommendation */}
        {recommendation && (
          <div className="border-t border-heritage-beige/30 pt-4">
            <div className="flex items-center justify-between mb-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSuitabilityColor(recommendation.suitability)} text-black`}>
                {recommendation.suitability.toUpperCase()} FOR TOURISM
              </span>
            </div>
            <p className="text-sm mb-1">{recommendation.message}</p>
            <p className="text-sm text-heritage-beige font-hindi mb-3">
              {recommendation.hindiMessage || recommendation.message}
            </p>
            <div className="text-xs">
              <p className="text-heritage-beige mb-1">Recommended activities:</p>
              <div className="flex flex-wrap gap-1">
                {recommendation.activities.map((activity, index) => (
                  <span 
                    key={index}
                    className="bg-heritage-beige/20 px-2 py-1 rounded text-xs"
                  >
                    {activity}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Forecast */}
        {showForecast && weather.forecast && (
          <div className="border-t border-heritage-beige/30 pt-4 mt-4">
            <h4 className="text-sm font-medium mb-3">3-Day Forecast</h4>
            <div className="grid grid-cols-3 gap-2">
              {weather.forecast.forecastday.map((day, index) => (
                <div key={index} className="text-center text-xs">
                  <div className="text-heritage-beige mb-1">
                    {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                  </div>
                  {getWeatherIcon(day.day.condition.text)}
                  <div className="mt-1">
                    <div className="font-medium">{Math.round(day.day.maxtemp_c)}°</div>
                    <div className="text-heritage-beige">{Math.round(day.day.mintemp_c)}°</div>
                  </div>
                  {day.day.chance_of_rain > 0 && (
                    <div className="text-blue-200 text-xs mt-1">
                      {day.day.chance_of_rain}% rain
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}
