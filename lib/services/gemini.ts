import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export interface ItineraryRequest {
  destination: string
  duration: number // days
  budget: 'budget' | 'mid-range' | 'luxury'
  interests: string[]
  travelStyle: 'solo' | 'couple' | 'family' | 'group'
  season: 'winter' | 'spring' | 'summer' | 'monsoon'
  specialRequests?: string
}

export interface ItineraryResponse {
  title: string
  overview: string
  totalBudget: string
  dailyItinerary: {
    day: number
    title: string
    activities: {
      time: string
      activity: string
      location: string
      description: string
      cost: string
      tips: string
      duration: string
      difficulty: 'easy' | 'moderate' | 'challenging'
      category: 'heritage' | 'culture' | 'nature' | 'food' | 'shopping' | 'spiritual'
    }[]
    meals: {
      breakfast: {
        restaurant: string
        dish: string
        cost: string
        address: string
      }
      lunch: {
        restaurant: string
        dish: string
        cost: string
        address: string
      }
      dinner: {
        restaurant: string
        dish: string
        cost: string
        address: string
      }
    }
    accommodation: {
      name: string
      type: string
      cost: string
      amenities: string[]
      bookingTips: string
    }
    transportTips: string
    dailyBudget: string
  }[]
  budgetBreakdown: {
    accommodation: string
    food: string
    transport: string
    activities: string
    miscellaneous: string
    guideServices: string
  }
  packingList: string[]
  culturalTips: string[]
  hindiPhrases: {
    phrase: string
    pronunciation: string
    meaning: string
  }[]
  emergencyContacts: string[]
  recommendedGuides: {
    name: string
    hindiName: string
    specialty: string
    experience: string
    rating: number
    pricePerDay: string
    contactInfo: string
    bestFor: string[]
    coverageAreas: string[]
    languages: string[]
    whyRecommended: string
  }[]
  weatherConsiderations: string[]
  localInsights: string[]
  sustainableTravelTips: string[]
}

export interface TravelRecommendation {
  destination: string
  bestTimeToVisit: string
  highlights: string[]
  culturalSignificance: string
  localCuisine: string[]
  travelTips: string[]
  nearbyAttractions: string[]
  hindiName: string
  historicalContext: string
}

class GeminiService {
  private getModel() {
    // Start with the most reliable model
    return genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  }

  // Generate personalized India itinerary
  async generateItinerary(request: ItineraryRequest): Promise<ItineraryResponse> {
    const prompt = `
    Create a comprehensive and detailed ${request.duration}-day travel itinerary for ${request.destination}, India.

    Travel Details:
    - Budget Category: ${request.budget}
    - Travel Style: ${request.travelStyle}
    - Interests: ${request.interests.join(', ')}
    - Season: ${request.season}
    ${request.specialRequests ? `- Special Requests: ${request.specialRequests}` : ''}

    Please provide a highly detailed itinerary in JSON format with the following structure:
    {
      "title": "Engaging title for the trip",
      "overview": "Detailed 4-5 sentence overview highlighting unique Indian experiences",
      "totalBudget": "Estimated total budget in INR with range",
      "dailyItinerary": [
        {
          "day": 1,
          "title": "Descriptive day title",
          "activities": [
            {
              "time": "9:00 AM",
              "activity": "Specific activity name",
              "location": "Exact location with address",
              "description": "Detailed 3-4 sentence description with historical/cultural context",
              "cost": "Specific cost in INR",
              "tips": "Practical local tips and insider advice",
              "duration": "Time required (e.g., 2 hours)",
              "difficulty": "easy/moderate/challenging",
              "category": "heritage/culture/nature/food/shopping/spiritual"
            }
          ],
          "meals": {
            "breakfast": {
              "restaurant": "Specific restaurant name",
              "dish": "Recommended local dish",
              "cost": "Price range in INR",
              "address": "Complete address"
            },
            "lunch": {
              "restaurant": "Specific restaurant name", 
              "dish": "Authentic local cuisine",
              "cost": "Price range in INR",
              "address": "Complete address"
            },
            "dinner": {
              "restaurant": "Specific restaurant name",
              "dish": "Traditional regional dinner",
              "cost": "Price range in INR", 
              "address": "Complete address"
            }
          },
          "accommodation": {
            "name": "Specific hotel/homestay name",
            "type": "Heritage hotel/boutique/homestay/luxury",
            "cost": "Per night cost in INR",
            "amenities": ["WiFi", "AC", "Breakfast", "etc"],
            "bookingTips": "Best booking platform or direct contact advice"
          },
          "transportTips": "Detailed local transport options with costs",
          "dailyBudget": "Expected daily expense in INR"
        }
      ],
      "budgetBreakdown": {
        "accommodation": "Detailed cost breakdown",
        "food": "Meal costs with ranges",
        "transport": "All transport costs",
        "activities": "Entry fees and activity costs",
        "miscellaneous": "Shopping, tips, extras",
        "guideServices": "Recommended guide costs"
      },
      "packingList": ["Detailed items for ${request.season} season and activities"],
      "culturalTips": ["Important etiquette, customs, and cultural insights"],
      "hindiPhrases": [
        {
          "phrase": "Essential Hindi phrase",
          "pronunciation": "Clear English pronunciation",
          "meaning": "English translation with context"
        }
      ],
      "emergencyContacts": ["Police, hospital, tourist helpline numbers"],
      "recommendedGuides": [
        {
          "name": "Guide full name",
          "hindiName": "Name in Devanagari script",
          "specialty": "Specific expertise area",
          "experience": "Years of experience",
          "rating": 4.8,
          "pricePerDay": "Cost in INR per day",
          "contactInfo": "Phone/email contact",
          "bestFor": ["Activities this guide excels at"],
          "coverageAreas": ["Areas they cover"],
          "languages": ["Languages spoken"],
          "whyRecommended": "Specific reason why this guide is perfect for this itinerary"
        }
      ],
      "weatherConsiderations": ["${request.season} specific weather advice"],
      "localInsights": ["Insider tips from locals"],
      "sustainableTravelTips": ["Eco-friendly and responsible travel advice"]
    }

    IMPORTANT REQUIREMENTS:
    1. Make activities VERY detailed with specific timings, locations, and cultural context
    2. Include exact restaurant names, addresses, and signature dishes
    3. Recommend 2-3 guides that match the traveler's interests and destination
    4. Provide realistic costs for ${request.budget} budget category
     5. Include Indian cultural elements throughout
     6. Focus on authentic Indian experiences including:
       - Heritage architecture and historical sites
       - Traditional Indian festivals and cultural events
       - Authentic regional cuisines across India
       - Local artisan workshops and craft centers
       - Natural attractions across different Indian regions
       - Spiritual and religious sites
       - Literature and arts from diverse Indian traditions
       - Local markets and shopping experiences
    7. Ensure all recommendations are practical and currently accessible
    8. Include seasonal considerations for ${request.season}
    9. Provide transportation details between locations
    10. Add safety tips and cultural sensitivity guidelines

    Create an itinerary that showcases the rich heritage of भारत (India) with deep cultural immersion.
    
    RETURN ONLY THE JSON OBJECT, no additional text or formatting.
    `

    try {
      console.log('Generating detailed itinerary with guide recommendations...')
      const model = this.getModel()
      const result = await model.generateContent(prompt)
      const response = await result.response
      const text = response.text()
      
      console.log('Raw Gemini response length:', text.length)
      
      // Clean up the response text
      let cleanedText = text.trim()
      
      // Remove markdown code blocks if present
      if (cleanedText.startsWith('```json')) {
        cleanedText = cleanedText.replace(/^```json\s*/, '').replace(/\s*```$/, '')
      } else if (cleanedText.startsWith('```')) {
        cleanedText = cleanedText.replace(/^```\s*/, '').replace(/\s*```$/, '')
      }
      
      // Extract JSON from the response
      const jsonMatch = cleanedText.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        const jsonData = JSON.parse(jsonMatch[0])
        console.log('Successfully parsed detailed itinerary JSON')
        return jsonData
      }
      
      console.error('No valid JSON found in response')
      throw new Error('Failed to parse itinerary response')
    } catch (error) {
      console.error('Gemini API error:', error)
      
      // If it's a parsing error, provide more details
      if (error instanceof SyntaxError) {
        console.error('JSON parsing failed:', error.message)
      }
      
      throw new Error('Failed to generate itinerary')
    }
  }

  // Get detailed destination information
  async getDestinationInfo(destination: string): Promise<TravelRecommendation> {
    const prompt = `
    Provide comprehensive travel information about ${destination}, India.

    Return the information in JSON format:
    {
      "destination": "${destination}",
      "bestTimeToVisit": "Best months and season to visit",
      "highlights": ["Top 5-7 attractions/experiences"],
      "culturalSignificance": "Historical and cultural importance",
      "localCuisine": ["Must-try local dishes and specialties"],
      "travelTips": ["Practical travel advice"],
      "nearbyAttractions": ["Places to visit nearby"],
      "hindiName": "Name in Devanagari script",
      "historicalContext": "Brief historical background"
    }

    Focus on authentic, accurate information about India's rich cultural heritage.
    `

    try {
      const model = this.getModel()
      const result = await model.generateContent(prompt)
      const response = await result.response
      const text = response.text()
      
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0])
      }
      
      throw new Error('Failed to parse destination info')
    } catch (error) {
      console.error('Gemini API error:', error)
      throw new Error('Failed to get destination information')
    }
  }

  // Generate travel tips based on user preferences
  async getTravelTips(destination: string, travelStyle: string, season: string): Promise<string[]> {
    const prompt = `
    Generate 8-10 practical travel tips for visiting ${destination}, India during ${season} season for a ${travelStyle} traveler.
    
    Include tips about:
    - Local customs and etiquette
    - Transportation
    - Food and dining
    - Shopping
    - Safety
    - Cultural experiences
    - Weather-specific advice
    - Money and budgeting
    
    Return as a simple JSON array of strings: ["tip1", "tip2", ...]
    `

    try {
      const model = this.getModel()
      const result = await model.generateContent(prompt)
      const response = await result.response
      const text = response.text()
      
      const jsonMatch = text.match(/\[[\s\S]*\]/)
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0])
      }
      
      throw new Error('Failed to parse travel tips')
    } catch (error) {
      console.error('Gemini API error:', error)
      return [
        "Respect local customs and traditions",
        "Try authentic regional Indian cuisine",
        "Learn basic Hindi phrases",
        "Carry cash for local markets",
        "Dress modestly when visiting religious sites"
      ]
    }
  }

  // Generate cultural event recommendations
  async getCulturalEvents(month: string): Promise<any[]> {
    const prompt = `
    List cultural events, festivals, and celebrations happening across India during ${month}.
    
    Return as JSON array:
    [
      {
        "name": "Event name",
        "hindiName": "Hindi name",
        "date": "Approximate date/period",
        "location": "Where it's celebrated",
        "description": "Brief description",
        "significance": "Cultural/religious significance",
        "experienceLevel": "beginner/intermediate/advanced",
        "tips": "Visitor tips"
      }
    ]
    
    Include both major festivals and local cultural events.
    `

    try {
      const model = this.getModel()
      const result = await model.generateContent(prompt)
      const response = await result.response
      const text = response.text()
      
      const jsonMatch = text.match(/\[[\s\S]*\]/)
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0])
      }
      
      return []
    } catch (error) {
      console.error('Gemini API error:', error)
      return []
    }
  }

  // Chat assistant for travel queries
  async chatAssistant(message: string, context?: string): Promise<string> {
    const prompt = `
    You are a knowledgeable India tourism assistant. Answer the following question about travel in India:
    
    Question: ${message}
    ${context ? `Context: ${context}` : ''}
    
    Provide a helpful, accurate response focusing on:
    - Practical travel advice
    - Cultural insights
    - Local recommendations
    - Indian heritage and traditions
    
    Keep the response conversational and informative, under 200 words.
    `

    try {
      const model = this.getModel()
      const result = await model.generateContent(prompt)
      const response = await result.response
      return response.text()
    } catch (error) {
      console.error('Gemini API error:', error)
      return "I'm sorry, I'm temporarily unable to help with that question. Please try again later."
    }
  }
}

export const geminiService = new GeminiService()
export default geminiService
