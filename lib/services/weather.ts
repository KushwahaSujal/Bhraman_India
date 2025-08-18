// Weather service for tourist destinations in West Bengal
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

// Popular tourist destinations in West Bengal
export const WEST_BENGAL_DESTINATIONS = [
  'Kolkata, West Bengal',
  'Darjeeling, West Bengal',
  'Kalimpong, West Bengal',
  'Siliguri, West Bengal',
  'Digha, West Bengal',
  'Mandarmani, West Bengal',
  'Sundarbans, West Bengal',
  'Durgapur, West Bengal',
  'Asansol, West Bengal',
  'Shantiniketan, West Bengal',
  'Murshidabad, West Bengal',
  'Cooch Behar, West Bengal',
  'Malda, West Bengal',
  'Purulia, West Bengal',
  'Bankura, West Bengal'
]

class WeatherService {
  private apiKey: string
  private baseUrl: string

  constructor() {
    this.apiKey = process.env.RAPIDAPI_WEATHER_KEY || ''
    this.baseUrl = 'https://weatherapi-com.p.rapidapi.com'
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
      const mockData = mockWeatherData[location as keyof typeof mockWeatherData]
      if (mockData) {
        return mockData
      }
      throw error
    }
  }

  // Get weather forecast for a location (up to 3 days)
  async getWeatherForecast(location: string, days: number = 3): Promise<WeatherData> {
    try {
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
      const mockData = mockWeatherData[location as keyof typeof mockWeatherData]
      if (mockData) {
        return mockData
      }
      throw error
    }
  }

  // Get weather for multiple West Bengal destinations
  async getMultipleDestinationsWeather(locations: string[] = WEST_BENGAL_DESTINATIONS.slice(0, 5)) {
    const weatherPromises = locations.map(location => 
      this.getCurrentWeather(location).catch(error => {
        console.error(`Failed to get weather for ${location}:`, error)
        // Try to get mock data for this location
        const mockData = mockWeatherData[location as keyof typeof mockWeatherData]
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
    bengaliMessage: string
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
