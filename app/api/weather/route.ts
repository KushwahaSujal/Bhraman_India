import { NextRequest, NextResponse } from 'next/server'
import { weatherService } from '@/lib/services/weather'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const location = searchParams.get('location')
    const days = searchParams.get('days')

    if (!location) {
      return NextResponse.json(
        { error: 'Location parameter is required' },
        { status: 400 }
      )
    }

    let weatherData
    if (days) {
      weatherData = await weatherService.getWeatherForecast(location, parseInt(days))
    } else {
      weatherData = await weatherService.getCurrentWeather(location)
    }

    const recommendation = weatherService.getWeatherRecommendation(weatherData)

    return NextResponse.json({
      success: true,
      data: weatherData,
      recommendation
    })

  } catch (error) {
    console.error('Weather API error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch weather data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
