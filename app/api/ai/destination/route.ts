import { NextRequest, NextResponse } from 'next/server'
import { geminiService } from '@/lib/services/gemini'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const destination = searchParams.get('destination')
    
    if (!destination) {
      return NextResponse.json(
        { error: 'Destination parameter is required' },
        { status: 400 }
      )
    }

    const info = await geminiService.getDestinationInfo(destination)

    return NextResponse.json({
      success: true,
      data: info
    })

  } catch (error) {
    console.error('Destination info error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to get destination information',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
