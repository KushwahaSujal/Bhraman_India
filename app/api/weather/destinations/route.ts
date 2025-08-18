import { NextRequest, NextResponse } from 'next/server'
import { weatherService, WEST_BENGAL_DESTINATIONS } from '@/lib/services/weather'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const count = searchParams.get('count')
    const locationsCount = count ? parseInt(count) : 5

    // Get weather for top West Bengal destinations
    const locations = WEST_BENGAL_DESTINATIONS.slice(0, locationsCount)
    const weatherData = await weatherService.getMultipleDestinationsWeather(locations)

    // Add recommendations for each location
    const weatherWithRecommendations = weatherData.map(weather => ({
      ...weather,
      recommendation: weatherService.getWeatherRecommendation(weather)
    }))

    return NextResponse.json({
      success: true,
      data: weatherWithRecommendations,
      total: weatherWithRecommendations.length
    })

  } catch (error) {
    console.error('Multiple destinations weather API error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch weather data for destinations',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
