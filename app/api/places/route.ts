import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { Place } from '@/lib/models'

export async function GET() {
  try {
    await connectDB()
    
    const places = await Place.find()
      .sort({ rating: -1 })
      .limit(20)
      .select('-reviews')
    
    return NextResponse.json({ places })
  } catch (error) {
    console.error('Places fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch places' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const placeData = await request.json()
    const place = await Place.create(placeData)
    
    return NextResponse.json(
      { message: 'Place created successfully', place },
      { status: 201 }
    )
  } catch (error) {
    console.error('Place creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create place' },
      { status: 500 }
    )
  }
}
