// Weather service for tourist destinations across India
import { mockWeatherData, getMockWeatherRecommendation } from './mockWeatherData'

export interface WeatherData {
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

// Popular tourist destinations across India
export const INDIA_DESTINATIONS = [
  'Delhi, India',
  'Jaipur, Rajasthan',
  'Goa, India',
  'Varanasi, Uttar Pradesh',
  'Manali, Himachal Pradesh',
  'Kerala, India',
  'Mumbai, Maharashtra',
  'Shimla, Himachal Pradesh',
  'Agra, Uttar Pradesh',
  'Udaipur, Rajasthan',
  'Rishikesh, Uttarakhand',
  'Amritsar, Punjab',
  'Mysore, Karnataka',
  'Hampi, Karnataka',
  'Leh, Ladakh'
]

class WeatherService {
  private apiKey: string
  private baseUrl: string

  constructor() {
    this.apiKey = process.env.RAPIDAPI_WEATHER_KEY || ''
    this.baseUrl = 'https://weatherapi-com.p.rapidapi.com'
  }

  private getMockFallback(location: string): WeatherData | undefined {
    const direct = mockWeatherData[location as keyof typeof mockWeatherData]
    if (direct) return direct

    const normalized = location.toLowerCase().trim()
    const entries = Object.entries(mockWeatherData)

    const partialMatch = entries.find(([key]) => {
      const keyNormalized = key.toLowerCase()
      return keyNormalized.includes(normalized) || normalized.includes(keyNormalized)
    })
    if (partialMatch) return partialMatch[1]

    const cityMatch = entries.find(([key]) => {
      const city = key.split(',')[0].toLowerCase().trim()
      return normalized.includes(city) || city.includes(normalized)
    })

    return cityMatch?.[1]
  }

  private createFallbackForecast(weather: WeatherData, days: number): WeatherData {
    const today = new Date()
    const baseTemp = weather.current.temp_c
    const forecastday = Array.from({ length: Math.max(1, Math.min(days, 3)) }, (_, idx) => {
      const date = new Date(today)
      date.setDate(today.getDate() + idx)

      return {
        date: date.toISOString().split('T')[0],
        day: {
          maxtemp_c: Math.round(baseTemp + 2 + (idx % 2)),
          mintemp_c: Math.round(baseTemp - 3 - (idx % 2)),
          condition: {
            text: weather.current.condition.text,
            icon: weather.current.condition.icon
          },
          chance_of_rain: weather.current.condition.text.toLowerCase().includes('rain') ? 60 : 20
        }
      }
    })

    return {
      ...weather,
      forecast: { forecastday }
    }
  }

  private async makeRequest(endpoint: string, params: URLSearchParams) {
    const url = `${this.baseUrl}${endpoint}?${params.toString()}`
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': this.apiKey,
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  // Get current weather for a location
  async getCurrentWeather(location: string): Promise<WeatherData> {
    try {
      if (!this.apiKey) {
        const mockData = this.getMockFallback(location)
        if (mockData) return mockData
      }

      const params = new URLSearchParams({
        q: location,
        aqi: 'no'
      })

      const data = await this.makeRequest('/current.json', params)
      
      return {
        location: data.location.name,
        current: {
          temp_c: data.current.temp_c,
          temp_f: data.current.temp_f,
          condition: {
            text: data.current.condition.text,
            icon: data.current.condition.icon
          },
          humidity: data.current.humidity,
          wind_kph: data.current.wind_kph,
          feelslike_c: data.current.feelslike_c,
          uv: data.current.uv
        }
      }
    } catch (error) {
      // Fallback to mock data if API fails or rate limited
      console.warn(`Weather API failed for ${location}, using mock data:`, error)
      const mockData = this.getMockFallback(location)
      if (mockData) {
        return mockData
      }
      throw error
    }
  }

  // Get weather forecast for a location (up to 3 days)
  async getWeatherForecast(location: string, days: number = 3): Promise<WeatherData> {
    try {
      if (!this.apiKey) {
        const mockData = this.getMockFallback(location)
        if (mockData) {
          return mockData.forecast ? mockData : this.createFallbackForecast(mockData, days)
        }
      }

      const params = new URLSearchParams({
        q: location,
        days: days.toString(),
        aqi: 'no',
        alerts: 'no'
      })

      const data = await this.makeRequest('/forecast.json', params)
      
      return {
        location: data.location.name,
        current: {
          temp_c: data.current.temp_c,
          temp_f: data.current.temp_f,
          condition: {
            text: data.current.condition.text,
            icon: data.current.condition.icon
          },
          humidity: data.current.humidity,
          wind_kph: data.current.wind_kph,
          feelslike_c: data.current.feelslike_c,
          uv: data.current.uv
        },
        forecast: {
          forecastday: data.forecast.forecastday.map((day: any) => ({
            date: day.date,
            day: {
              maxtemp_c: day.day.maxtemp_c,
              mintemp_c: day.day.mintemp_c,
              condition: {
                text: day.day.condition.text,
                icon: day.day.condition.icon
              },
              chance_of_rain: day.day.chance_of_rain
            }
          }))
        }
      }
    } catch (error) {
      // Fallback to mock data if API fails or rate limited
      console.warn(`Weather API failed for ${location}, using mock data:`, error)
      const mockData = this.getMockFallback(location)
      if (mockData) {
        return mockData.forecast ? mockData : this.createFallbackForecast(mockData, days)
      }
      throw error
    }
  }

  // Get weather for multiple Indian destinations
  async getMultipleDestinationsWeather(locations: string[] = INDIA_DESTINATIONS.slice(0, 5)) {
    const weatherPromises = locations.map(location => 
      this.getCurrentWeather(location).catch(error => {
        console.error(`Failed to get weather for ${location}:`, error)
        // Try to get mock data for this location
        const mockData = this.getMockFallback(location)
        return mockData || null
      })
    )

    const results = await Promise.all(weatherPromises)
    return results.filter(result => result !== null)
  }

  // Get weather recommendation for tourism
  getWeatherRecommendation(weather: WeatherData): {
    suitability: 'excellent' | 'good' | 'fair' | 'poor'
    message: string
    hindiMessage: string
    activities: string[]
  } {
    const temp = weather.current.temp_c
    const condition = weather.current.condition.text.toLowerCase()
    
    // Use mock recommendation logic for consistency
    return getMockWeatherRecommendation(temp, condition)
  }
}

export const weatherService = new WeatherService()
export default weatherService
