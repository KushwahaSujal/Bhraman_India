import { NextRequest, NextResponse } from 'next/server'
import { geminiService } from '@/lib/services/gemini'

export async function POST(request: NextRequest) {
  try {
    const { message, context } = await request.json()
    
    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    const response = await geminiService.chatAssistant(message, context)

    return NextResponse.json({
      success: true,
      response,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Chat assistant error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to get response',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
