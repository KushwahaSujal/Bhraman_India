'use client'

import { useState } from 'react'
import { 
  Brain, 
  MapPin, 
  Calendar, 
  Users, 
  DollarSign, 
  Heart,
  Clock,
  Download,
  Share2,
  Sparkles,
  Loader2
} from 'lucide-react'

interface ItineraryFormData {
  destination: string
  duration: number
  budget: 'budget' | 'mid-range' | 'luxury'
  interests: string[]
  travelStyle: 'solo' | 'couple' | 'family' | 'group'
  season: 'winter' | 'spring' | 'summer' | 'monsoon'
  specialRequests: string
}

interface GeneratedItinerary {
  title: string
  overview: string
  totalBudget: string
  dailyItinerary: any[]
  budgetBreakdown: any
  packingList: string[]
  culturalTips: string[]
  hindiPhrases: any[]
  emergencyContacts: string[]
  recommendedGuides?: any[]
  weatherConsiderations?: string[]
  localInsights?: string[]
  sustainableTravelTips?: string[]
}

const INDIA_DESTINATIONS = [
  'Delhi', 'Jaipur', 'Agra', 'Varanasi', 'Goa', 'Kerala',
  'Manali', 'Shimla', 'Udaipur', 'Mumbai', 'Rishikesh', 'Amritsar',
  'Hampi', 'Mysore', 'Leh Ladakh', 'Darjeeling'
]

const INTEREST_OPTIONS = [
  'Heritage & History', 'Cultural Festivals', 'Local Cuisine', 'Art & Crafts',
  'Nature & Wildlife', 'Photography', 'Religious Sites', 'Adventure Sports',
  'Local Markets', 'Traditional Music', 'Literature & Poetry', 'Tea Gardens'
]

export default function AIItineraryGenerator() {
  const [formData, setFormData] = useState<ItineraryFormData>({
    destination: '',
    duration: 3,
    budget: 'mid-range',
    interests: [],
    travelStyle: 'couple',
    season: 'winter',
    specialRequests: ''
  })
  
  const [generatedItinerary, setGeneratedItinerary] = useState<GeneratedItinerary | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }))
  }

  const generateItinerary = async () => {
    if (!formData.destination || formData.interests.length === 0) {
      setError('Please select a destination and at least one interest')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/ai/itinerary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error || 'Failed to generate itinerary')
      }

      setGeneratedItinerary(data.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate itinerary')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <Brain className="text-heritage-gold mr-3" size={32} />
          <h1 className="text-4xl font-heritage font-bold text-heritage-maroon">
            AI Itinerary Generator
          </h1>
        </div>
        <p className="text-heritage-gold font-hindi text-lg mb-2">
          एआई यात्रा योजना - Personalized India Travel Plans
        </p>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Create your perfect India adventure with our AI-powered itinerary generator. 
          Discover hidden gems, authentic experiences, and cultural treasures tailored to your preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Form Section */}
        <div className="card-heritage p-4 sm:p-6">
          <h2 className="text-xl font-semibold text-heritage-maroon mb-6 flex items-center">
            <Sparkles className="mr-2" size={20} />
            Tell us about your dream trip
          </h2>

          <div className="space-y-6">
            {/* Destination */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="inline mr-1" size={16} />
                Destination in India
              </label>
              <select
                value={formData.destination}
                onChange={(e) => setFormData(prev => ({ ...prev, destination: e.target.value }))}
                className="w-full px-4 py-2 border border-heritage-bronze/30 rounded-xl focus:ring-2 focus:ring-heritage-gold focus:border-transparent"
              >
                <option value="">Select a destination</option>
                {INDIA_DESTINATIONS.map(dest => (
                  <option key={dest} value={dest}>{dest}</option>
                ))}
              </select>
            </div>

            {/* Duration & Budget */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="inline mr-1" size={16} />
                  Duration (Days)
                </label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={formData.duration}
                  onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                  className="w-full px-4 py-2 border border-heritage-bronze/30 rounded-xl focus:ring-2 focus:ring-heritage-gold focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <DollarSign className="inline mr-1" size={16} />
                  Budget Category
                </label>
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value as any }))}
                  className="w-full px-4 py-2 border border-heritage-bronze/30 rounded-xl focus:ring-2 focus:ring-heritage-gold focus:border-transparent"
                >
                  <option value="budget">Budget (₹1-2K/day)</option>
                  <option value="mid-range">Mid-range (₹2-5K/day)</option>
                  <option value="luxury">Luxury (₹5K+/day)</option>
                </select>
              </div>
            </div>

            {/* Travel Style & Season */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Users className="inline mr-1" size={16} />
                  Travel Style
                </label>
                <select
                  value={formData.travelStyle}
                  onChange={(e) => setFormData(prev => ({ ...prev, travelStyle: e.target.value as any }))}
                  className="w-full px-4 py-2 border border-heritage-bronze/30 rounded-xl focus:ring-2 focus:ring-heritage-gold focus:border-transparent"
                >
                  <option value="solo">Solo Travel</option>
                  <option value="couple">Couple</option>
                  <option value="family">Family</option>
                  <option value="group">Group</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="inline mr-1" size={16} />
                  Season
                </label>
                <select
                  value={formData.season}
                  onChange={(e) => setFormData(prev => ({ ...prev, season: e.target.value as any }))}
                  className="w-full px-4 py-2 border border-heritage-bronze/30 rounded-xl focus:ring-2 focus:ring-heritage-gold focus:border-transparent"
                >
                  <option value="winter">Winter (Dec-Feb)</option>
                  <option value="spring">Spring (Mar-May)</option>
                  <option value="summer">Summer (Jun-Aug)</option>
                  <option value="monsoon">Monsoon (Sep-Nov)</option>
                </select>
              </div>
            </div>

            {/* Interests */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Heart className="inline mr-1" size={16} />
                Your Interests (Select multiple)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {INTEREST_OPTIONS.map(interest => (
                  <label key={interest} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.interests.includes(interest)}
                      onChange={() => handleInterestToggle(interest)}
                      className="rounded border-heritage-bronze/30 text-heritage-gold focus:ring-heritage-gold"
                    />
                    <span className="text-sm text-gray-700">{interest}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Special Requests */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Special Requests (Optional)
              </label>
              <textarea
                value={formData.specialRequests}
                onChange={(e) => setFormData(prev => ({ ...prev, specialRequests: e.target.value }))}
                placeholder="Any specific requirements, accessibility needs, or preferences..."
                className="w-full px-4 py-2 border border-heritage-bronze/30 rounded-xl focus:ring-2 focus:ring-heritage-gold focus:border-transparent"
                rows={3}
              />
            </div>

            {/* Generate Button */}
            <button
              onClick={generateItinerary}
              disabled={loading || !formData.destination || formData.interests.length === 0}
              className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span>Generating your perfect itinerary...</span>
                </>
              ) : (
                <>
                  <Brain size={20} />
                  <span>Generate AI Itinerary</span>
                </>
              )}
            </button>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                {error}
              </div>
            )}
          </div>
        </div>

        {/* Results Section */}
        <div className="card-heritage p-4 sm:p-6">
          {!generatedItinerary ? (
            <div className="text-center py-12">
              <Brain className="mx-auto text-heritage-bronze opacity-50 mb-4" size={64} />
              <h3 className="text-lg font-medium text-gray-500 mb-2">Ready to create your itinerary</h3>
              <p className="text-gray-400">Fill out the form and click generate to get your personalized India travel plan</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Itinerary Header */}
              <div className="border-b border-heritage-bronze/20 pb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-heritage-maroon">{generatedItinerary.title}</h3>
                  <div className="flex space-x-2">
                    <button className="text-heritage-gold hover:text-heritage-maroon">
                      <Download size={20} />
                    </button>
                    <button className="text-heritage-gold hover:text-heritage-maroon">
                      <Share2 size={20} />
                    </button>
                  </div>
                </div>
                <p className="text-gray-600 mb-2">{generatedItinerary.overview}</p>
                <div className="text-sm text-heritage-gold font-semibold">
                  Total Budget: {generatedItinerary.totalBudget}
                </div>
              </div>

              {/* Daily Itinerary Preview */}
              <div>
                <h4 className="font-semibold text-heritage-maroon mb-3">Daily Itinerary Preview</h4>
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {generatedItinerary.dailyItinerary.slice(0, 3).map((day, index) => (
                    <div key={index} className="bg-heritage-beige/30 rounded-lg p-4 border border-heritage-bronze/20">
                      <div className="font-medium text-heritage-maroon mb-2">
                        Day {day.day}: {day.title}
                      </div>
                      {day.dailyBudget && (
                        <div className="text-xs text-heritage-gold font-semibold mb-2">
                          Daily Budget: {day.dailyBudget}
                        </div>
                      )}
                      <div className="space-y-2">
                        {day.activities.slice(0, 3).map((activity: any, actIndex: number) => (
                          <div key={actIndex} className="text-sm">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium text-gray-800">
                                {activity.time} - {activity.activity}
                              </span>
                              {activity.duration && (
                                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                  {activity.duration}
                                </span>
                              )}
                            </div>
                            <div className="text-gray-600 text-xs">
                              📍 {activity.location}
                              {activity.cost && <span className="ml-2">💰 {activity.cost}</span>}
                            </div>
                            {activity.category && (
                              <div className="flex items-center mt-1">
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                  activity.category === 'heritage' ? 'bg-red-100 text-red-800' :
                                  activity.category === 'culture' ? 'bg-purple-100 text-purple-800' :
                                  activity.category === 'nature' ? 'bg-green-100 text-green-800' :
                                  activity.category === 'food' ? 'bg-orange-100 text-orange-800' :
                                  activity.category === 'spiritual' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                  {activity.category}
                                </span>
                                {activity.difficulty && (
                                  <span className={`text-xs px-2 py-1 rounded-full ml-1 ${
                                    activity.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                                    activity.difficulty === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-red-100 text-red-800'
                                  }`}>
                                    {activity.difficulty}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                        {day.activities.length > 3 && (
                          <div className="text-xs text-gray-500 font-medium">
                            ... and {day.activities.length - 3} more activities
                          </div>
                        )}
                      </div>
                      
                      {/* Accommodation info */}
                      {day.accommodation && typeof day.accommodation === 'object' && (
                        <div className="mt-3 pt-2 border-t border-heritage-bronze/20">
                          <div className="text-xs text-gray-600">
                            🏨 <span className="font-medium">{day.accommodation.name}</span>
                            {day.accommodation.cost && <span className="ml-2">({day.accommodation.cost})</span>}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  {generatedItinerary.dailyItinerary.length > 3 && (
                    <div className="text-center text-gray-500 text-sm bg-heritage-beige/20 rounded-lg p-3">
                      ... and {generatedItinerary.dailyItinerary.length - 3} more detailed days with complete schedules
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Tips */}
              <div>
                <h4 className="font-semibold text-heritage-maroon mb-2">Cultural Tips</h4>
                <div className="space-y-1">
                  {generatedItinerary.culturalTips.slice(0, 3).map((tip, index) => (
                    <div key={index} className="text-sm text-gray-600">• {tip}</div>
                  ))}
                </div>
              </div>

              {/* Hindi Phrases */}
              {generatedItinerary.hindiPhrases.length > 0 && (
                <div>
                  <h4 className="font-semibold text-heritage-maroon mb-2">Useful Hindi Phrases</h4>
                  <div className="space-y-1">
                    {generatedItinerary.hindiPhrases.slice(0, 2).map((phrase, index) => (
                      <div key={index} className="text-sm">
                        <span className="font-hindi text-heritage-gold">{phrase.phrase}</span>
                        <span className="text-gray-600 ml-2">({phrase.meaning})</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommended Guides */}
              {generatedItinerary.recommendedGuides && generatedItinerary.recommendedGuides.length > 0 && (
                <div>
                  <h4 className="font-semibold text-heritage-maroon mb-3 flex items-center">
                    <Users size={16} className="mr-2" />
                    Recommended Local Guides
                  </h4>
                  <div className="space-y-3">
                    {generatedItinerary.recommendedGuides.slice(0, 2).map((guide, index) => (
                      <div key={index} className="bg-white border border-heritage-bronze/20 rounded-lg p-3">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="font-medium text-heritage-maroon">{guide.name}</div>
                            <div className="text-xs text-heritage-gold font-hindi">{guide.hindiName}</div>
                            <div className="text-sm text-gray-600">{guide.specialty}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-semibold text-heritage-maroon">{guide.pricePerDay}</div>
                            <div className="text-xs text-gray-500">per day</div>
                          </div>
                        </div>
                        <div className="text-xs text-gray-600 mb-2">{guide.whyRecommended}</div>
                        <div className="flex flex-wrap gap-1">
                          {guide.bestFor?.slice(0, 3).map((specialty: string, idx: number) => (
                            <span key={idx} className="text-xs bg-heritage-beige text-heritage-maroon px-2 py-1 rounded-full">
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Local Insights */}
              {generatedItinerary.localInsights && generatedItinerary.localInsights.length > 0 && (
                <div>
                  <h4 className="font-semibold text-heritage-maroon mb-2 flex items-center">
                    <Sparkles size={16} className="mr-2" />
                    Local Insights
                  </h4>
                  <div className="space-y-1">
                    {generatedItinerary.localInsights.slice(0, 3).map((insight, index) => (
                      <div key={index} className="text-sm text-gray-600">💡 {insight}</div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-heritage-gold/10 rounded-lg p-4 text-center">
                <p className="text-sm text-heritage-maroon font-medium">
                  🎉 Your comprehensive India itinerary is ready!
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Complete with detailed daily plans, recommended local guides, budget breakdown, cultural tips, and practical travel advice.
                </p>
                <div className="mt-2 flex justify-center space-x-2">
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">✓ Detailed Activities</span>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">✓ Guide Recommendations</span>
                  <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">✓ Cultural Insights</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
