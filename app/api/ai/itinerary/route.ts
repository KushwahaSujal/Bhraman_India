import { NextRequest, NextResponse } from 'next/server'
import { geminiService, ItineraryRequest } from '@/lib/services/gemini'

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

    const itinerary = await geminiService.generateItinerary(body)

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
