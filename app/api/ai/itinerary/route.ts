import { NextRequest, NextResponse } from 'next/server'
import { geminiService, ItineraryRequest } from '@/lib/services/gemini'
import { generateFallbackItinerary } from '@/lib/services/fallbackItinerary'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body: ItineraryRequest = await request.json()
    
    // Validate required fields
    if (!body.destination || !body.duration || !body.budget || !body.interests) {
      return NextResponse.json(
        { error: 'Missing required fields: destination, duration, budget, interests' },
        { status: 400 }
      )
    }

    let itinerary;

    // Try Gemini API first, fall back to offline data if no API key
    if (process.env.GEMINI_API_KEY) {
      try {
        itinerary = await geminiService.generateItinerary(body)
      } catch (apiError) {
        console.warn('Gemini API failed, using fallback itinerary:', apiError)
        itinerary = generateFallbackItinerary(body)
      }
    } else {
      console.log('No GEMINI_API_KEY set, using fallback itinerary generator')
      itinerary = generateFallbackItinerary(body)
    }

    return NextResponse.json({
      success: true,
      data: itinerary,
      generatedAt: new Date().toISOString()
    })

  } catch (error) {
    console.error('Itinerary generation error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to generate itinerary',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
