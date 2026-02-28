// Offline fallback itinerary data when Gemini API key is not set
import { ItineraryRequest, ItineraryResponse } from './gemini'

const destinationData: Record<string, {
  title: string
  overview: string
  activities: { time: string; activity: string; location: string; description: string; cost: string; tips: string; duration: string; difficulty: string; category: string }[]
  restaurants: { restaurant: string; dish: string; cost: string; address: string }[]
  hotels: { name: string; type: string; cost: string; amenities: string[]; bookingTips: string }[]
  culturalTips: string[]
  packingList: string[]
  hindiPhrases: { phrase: string; pronunciation: string; meaning: string }[]
}> = {
  Delhi: {
    title: 'Exploring the Heart of India – Delhi Heritage Tour',
    overview: 'Delhi, the capital city of India, is a magnificent blend of old-world charm and modern cosmopolitan culture. From the grand Red Fort and Humayun\'s Tomb to the bustling lanes of Chandni Chowk, Delhi offers an unparalleled journey through Mughal, British, and contemporary Indian history. This itinerary covers iconic heritage sites, authentic street food trails, vibrant markets, and cultural experiences that bring Delhi\'s 1,000-year history to life.',
    activities: [
      { time: '7:00 AM', activity: 'Sunrise at India Gate', location: 'Rajpath, New Delhi', description: 'Start the day at the iconic India Gate, a war memorial honoring Indian soldiers. The early morning light creates a golden glow on the 42-meter-high arch. Joggers, families, and vendors create a lively morning atmosphere.', cost: 'Free', tips: 'Arrive before 7 AM for fewer crowds. Carry water.', duration: '1 hour', difficulty: 'easy', category: 'heritage' },
      { time: '9:00 AM', activity: 'Red Fort (Lal Qila)', location: 'Netaji Subhash Marg, Chandni Chowk', description: 'Explore the massive red sandstone fort built by Mughal Emperor Shah Jahan in 1638. Walk through the Diwan-i-Aam, Diwan-i-Khas, and the beautiful Hayat Baksh gardens. The fort is a UNESCO World Heritage Site.', cost: '₹35 (Indian) / ₹500 (Foreign)', tips: 'Hire an audio guide (₹100) for full context. Closed on Mondays.', duration: '2.5 hours', difficulty: 'easy', category: 'heritage' },
      { time: '12:00 PM', activity: 'Chandni Chowk Food Walk', location: 'Chandni Chowk, Old Delhi', description: 'Dive into Delhi\'s most famous food street. Try paranthe at Paranthe Wali Gali, jalebi at Old Famous, and rabri-falooda at local stalls. The narrow lanes are packed with culinary treasures dating back centuries.', cost: '₹300-500', tips: 'Go on an empty stomach. Use hand sanitizer. Try the Daulat ki Chaat in winter.', duration: '2 hours', difficulty: 'easy', category: 'food' },
      { time: '2:30 PM', activity: 'Jama Masjid', location: 'Jama Masjid Road, Old Delhi', description: 'Visit India\'s largest mosque, built by Shah Jahan between 1644-1656. Climb the minaret for a panoramic view of Old Delhi. The courtyard can hold 25,000 worshippers.', cost: '₹300 for minaret (camera extra)', tips: 'Remove shoes. Women must cover heads. Avoid during prayer times.', duration: '1.5 hours', difficulty: 'easy', category: 'spiritual' },
      { time: '4:30 PM', activity: 'Humayun\'s Tomb', location: 'Mathura Road, Nizamuddin', description: 'Marvel at the precursor to the Taj Mahal. This stunning Mughal garden tomb was built in 1570 and is a UNESCO World Heritage Site. The symmetrical gardens and red sandstone-white marble design are breathtaking.', cost: '₹35 (Indian) / ₹500 (Foreign)', tips: 'Best visited in late afternoon for golden light. Combine with Nizamuddin Dargah visit.', duration: '2 hours', difficulty: 'easy', category: 'heritage' },
      { time: '7:00 PM', activity: 'Nizamuddin Dargah - Qawwali evening', location: 'Nizamuddin West', description: 'Experience soul-stirring Sufi qawwali music at the shrine of Hazrat Nizamuddin Auliya every Thursday evening. The devotional singing creates an unforgettable spiritual atmosphere.', cost: 'Free (donations welcome)', tips: 'Thursday evenings are best. Cover your head. Be respectful.', duration: '1.5 hours', difficulty: 'easy', category: 'spiritual' },
    ],
    restaurants: [
      { restaurant: 'Karim\'s', dish: 'Mutton Burra & Seekh Kebab', cost: '₹400-600', address: '16, Gali Kababian, Jama Masjid' },
      { restaurant: 'Paranthe Wali Gali', dish: 'Stuffed Paranthas (Aloo, Paneer, Mixed)', cost: '₹100-200', address: 'Chandni Chowk, Old Delhi' },
      { restaurant: 'Bukhara, ITC Maurya', dish: 'Dal Bukhara & Tandoori Raan', cost: '₹3,000-5,000', address: 'Sardar Patel Marg, Diplomatic Enclave' },
    ],
    hotels: [
      { name: 'The Imperial New Delhi', type: 'Luxury Heritage', cost: '₹18,000-25,000', amenities: ['Pool', 'Spa', 'Heritage Walk', 'Fine Dining'], bookingTips: 'Book on hotel website for heritage room upgrade' },
      { name: 'Haveli Dharampura', type: 'Heritage Haveli', cost: '₹6,000-10,000', amenities: ['Rooftop Restaurant', 'Cultural Programs', 'WiFi', 'AC'], bookingTips: 'Located in Old Delhi, perfect for heritage walking' },
      { name: 'Zostel Delhi', type: 'Budget Hostel', cost: '₹600-1,500', amenities: ['WiFi', 'Common Kitchen', 'Lockers', 'Tours'], bookingTips: 'Book directly for best rates. Great for solo travelers.' },
    ],
    culturalTips: [
      'Remove shoes before entering temples, mosques, and gurudwaras',
      'Dress modestly when visiting religious sites - cover shoulders and knees',
      'Bargain at street markets but be respectful about it',
      'Use Metro for getting around - clean, efficient, and affordable',
      'Carry small change for auto-rickshaws and street food',
      'Try local street food but from busy stalls with high turnover for freshness',
    ],
    packingList: ['Comfortable walking shoes', 'Sunscreen and sunglasses', 'Light scarf/dupatta for temple visits', 'Reusable water bottle', 'Small daypack', 'Hand sanitizer', 'Power bank'],
    hindiPhrases: [
      { phrase: 'नमस्ते', pronunciation: 'Namaste', meaning: 'Hello / Greetings' },
      { phrase: 'धन्यवाद', pronunciation: 'Dhanyavaad', meaning: 'Thank you' },
      { phrase: 'कितने का है?', pronunciation: 'Kitne ka hai?', meaning: 'How much does it cost?' },
      { phrase: 'यह कहाँ है?', pronunciation: 'Yeh kahaan hai?', meaning: 'Where is this?' },
      { phrase: 'मुझे मदद चाहिए', pronunciation: 'Mujhe madad chahiye', meaning: 'I need help' },
      { phrase: 'बहुत अच्छा!', pronunciation: 'Bahut achha!', meaning: 'Very good! / Excellent!' },
    ],
  },
  Jaipur: {
    title: 'Royal Rajasthan – The Pink City Experience',
    overview: 'Jaipur, the Pink City of India, is a royal tapestry of magnificent forts, opulent palaces, vibrant bazaars, and rich Rajasthani culture. Founded in 1727 by Maharaja Sawai Jai Singh II, it was India\'s first planned city. From the iconic Hawa Mahal to the imposing Amber Fort, every corner tells a story of Rajput valor and artistic brilliance. This itinerary covers the best of Jaipur\'s heritage, cuisine, shopping, and cultural experiences.',
    activities: [
      { time: '6:30 AM', activity: 'Hot Air Balloon Ride over Jaipur', location: 'Amber area, Jaipur outskirts', description: 'Soar above the Pink City at sunrise and see Amber Fort, Jal Mahal, and the Aravalli Hills from above. A magical way to start your Jaipur adventure.', cost: '₹8,000-12,000', tips: 'Book in advance. Available Oct-Mar only. Dress warmly.', duration: '1 hour', difficulty: 'easy', category: 'nature' },
      { time: '9:00 AM', activity: 'Amber Fort (Amer Fort)', location: 'Devisinghpura, Amer', description: 'Explore the majestic hilltop fort with its mix of Hindu and Mughal architecture. The Sheesh Mahal (Mirror Palace) is stunning. Walk through the Jaleb Chowk, Diwan-i-Aam, and the beautiful Sukh Niwas.', cost: '₹100 (Indian) / ₹500 (Foreign)', tips: 'Take the elephant ride up or walk. Visit early to avoid crowds.', duration: '3 hours', difficulty: 'moderate', category: 'heritage' },
      { time: '12:30 PM', activity: 'Jal Mahal Photo Stop', location: 'Amer Road, Man Sagar Lake', description: 'See the stunning Water Palace floating in the middle of Man Sagar Lake. While you cannot enter the palace, it\'s one of India\'s most photographed monuments.', cost: 'Free', tips: 'Best photos at sunset. The surrounding area has snack stalls.', duration: '30 minutes', difficulty: 'easy', category: 'heritage' },
      { time: '1:30 PM', activity: 'Lunch at LMB (Laxmi Mishthan Bhandar)', location: 'Johari Bazaar', description: 'Iconic Rajasthani restaurant since 1727. Try the famous Dal Baati Churma, Ghewar, and Pyaaz Kachori. A must-visit for authentic Rajasthani cuisine.', cost: '₹400-700', tips: 'Try the thali for best value. The sweets counter is legendary.', duration: '1.5 hours', difficulty: 'easy', category: 'food' },
      { time: '3:30 PM', activity: 'Hawa Mahal & City Palace', location: 'Hawa Mahal Road, Badi Choupad', description: 'Visit the iconic Palace of Winds with 953 small windows designed for royal women to observe street life. Then explore the City Palace complex with its museums, courtyards, and the Peacock Gate.', cost: '₹50/200 (Hawa Mahal) + ₹200/500 (City Palace)', tips: 'Best viewed from the café across the street for full facade. City Palace museum closes at 5 PM.', duration: '3 hours', difficulty: 'easy', category: 'heritage' },
      { time: '7:00 PM', activity: 'Chokhi Dhani Village Experience', location: 'Tonk Road, 20 km from Jaipur', description: 'Experience Rajasthani village life at this cultural resort. Enjoy folk dances, puppet shows, camel rides, traditional dinner, and live music. A complete Rajasthani cultural immersion.', cost: '₹800-1,200 (includes dinner)', tips: 'Book in advance for weekend visits. Allow 3-4 hours total.', duration: '3 hours', difficulty: 'easy', category: 'culture' },
    ],
    restaurants: [
      { restaurant: 'LMB (Laxmi Mishthan Bhandar)', dish: 'Dal Baati Churma & Ghewar', cost: '₹400-700', address: 'Johari Bazaar, Jaipur' },
      { restaurant: 'Rawat Mishthan Bhandar', dish: 'Pyaaz Kachori & Mawa Kachori', cost: '₹50-150', address: 'Station Road, Jaipur' },
      { restaurant: '1135 AD, Amber Fort', dish: 'Royal Rajasthani Thali', cost: '₹1,500-2,500', address: 'Inside Amber Fort Complex' },
    ],
    hotels: [
      { name: 'Rambagh Palace', type: 'Luxury Heritage Palace', cost: '₹18,000-35,000', amenities: ['Polo Ground', 'Royal Spa', 'Heritage Walk', 'Mughal Gardens'], bookingTips: 'Former Maharaja residence. Book heritage suite for royal experience.' },
      { name: 'Samode Haveli', type: 'Heritage Haveli', cost: '₹8,000-14,000', amenities: ['Pool', 'Rooftop Dining', 'Cultural Programs', 'AC'], bookingTips: 'Beautiful 150-year-old haveli. Book painted room for best experience.' },
      { name: 'Hotel Pearl Palace', type: 'Budget Heritage', cost: '₹1,500-3,000', amenities: ['Rooftop Café', 'WiFi', 'AC', 'Travel Desk'], bookingTips: 'Top-rated budget hotel in Jaipur. Book months in advance.' },
    ],
    culturalTips: [
      'Jaipur is called the Pink City - many buildings are painted terracotta pink',
      'Bargaining is expected at Johari Bazaar and Bapu Bazaar',
      'Try the famous Jaipur blue pottery and block-print textiles as souvenirs',
      'Carry cash - many smaller shops don\'t accept cards',
      'Jaipur is very hot in summer (Apr-Jun) - visit Oct-Mar for best weather',
      'Respect the dress code at religious sites - cover shoulders and knees',
    ],
    packingList: ['Comfortable walking shoes', 'Sunscreen SPF 50+', 'Wide-brimmed hat', 'Scarf for temple visits', 'Reusable water bottle', 'Camera with extra battery', 'Light cotton clothing'],
    hindiPhrases: [
      { phrase: 'नमस्ते', pronunciation: 'Namaste', meaning: 'Hello / Greetings' },
      { phrase: 'कितने का है?', pronunciation: 'Kitne ka hai?', meaning: 'How much does it cost?' },
      { phrase: 'बहुत सुंदर!', pronunciation: 'Bahut sundar!', meaning: 'Very beautiful!' },
      { phrase: 'ये रास्ता कहाँ जाता है?', pronunciation: 'Ye raasta kahaan jaata hai?', meaning: 'Where does this road go?' },
      { phrase: 'धन्यवाद', pronunciation: 'Dhanyavaad', meaning: 'Thank you' },
      { phrase: 'पानी चाहिए', pronunciation: 'Paani chahiye', meaning: 'I need water' },
    ],
  },
}

// Default fallback for unknown destinations
const defaultDestination = {
  title: 'Discover India – A Cultural Heritage Journey',
  overview: 'India is a land of incredible diversity, where every state offers a unique blend of heritage, cuisine, spirituality, and natural beauty. This personalized itinerary takes you through the highlights of your chosen destination, covering iconic landmarks, hidden gems, authentic food experiences, and cultural immersions. Prepare for an unforgettable journey through the heart of Incredible India.',
  activities: [
    { time: '8:00 AM', activity: 'Morning Heritage Walk', location: 'City Old Quarter', description: 'Start with a guided walk through the historic old quarter, exploring centuries-old architecture, local markets, and hidden temples. Your guide shares fascinating stories of the area\'s history.', cost: '₹500-800', tips: 'Wear comfortable shoes. Carry water and a camera.', duration: '2 hours', difficulty: 'easy', category: 'heritage' },
    { time: '10:30 AM', activity: 'Main Heritage Monument Visit', location: 'City Center', description: 'Visit the most iconic historical monument of the destination. Explore the architecture, learn about its historical significance, and capture stunning photographs.', cost: '₹50-500', tips: 'Arrive early for fewer crowds. Hire a guide for deeper context.', duration: '2.5 hours', difficulty: 'easy', category: 'heritage' },
    { time: '1:00 PM', activity: 'Traditional Cuisine Experience', location: 'Famous Local Restaurant', description: 'Enjoy an authentic meal at a renowned local restaurant known for regional specialties. Try the signature thali for the best sampling of local flavors.', cost: '₹300-800', tips: 'Ask the server for local specials. Vegetarian options are abundant.', duration: '1.5 hours', difficulty: 'easy', category: 'food' },
    { time: '3:00 PM', activity: 'Local Artisan Workshop', location: 'Artisan Quarter', description: 'Visit local craftsmen and learn about traditional arts and crafts of the region. Watch artisans at work and purchase authentic handmade souvenirs directly from the makers.', cost: '₹200-1,000', tips: 'Buying directly supports local artisans. Ask about the craft history.', duration: '2 hours', difficulty: 'easy', category: 'culture' },
    { time: '5:30 PM', activity: 'Sunset Point / Temple Visit', location: 'Elevated viewpoint or main temple', description: 'End the day with a visit to a local temple or sunset point. Experience the evening aarti (prayer ceremony) and enjoy panoramic views of the city bathed in golden light.', cost: 'Free - ₹100', tips: 'Carry a small flashlight for temple visits. Dress modestly.', duration: '1.5 hours', difficulty: 'easy', category: 'spiritual' },
  ],
  restaurants: [
    { restaurant: 'Heritage Restaurant', dish: 'Regional Thali', cost: '₹300-600', address: 'City Center, Main Market' },
    { restaurant: 'Street Food Corner', dish: 'Local Snacks & Chaat', cost: '₹50-200', address: 'Old Market Area' },
    { restaurant: 'Fine Dining Restaurant', dish: 'Contemporary Indian Cuisine', cost: '₹1,500-3,000', address: 'Premium Hotel Area' },
  ],
  hotels: [
    { name: 'Heritage Boutique Hotel', type: 'Heritage', cost: '₹4,000-8,000', amenities: ['WiFi', 'Restaurant', 'Cultural Tours', 'AC'], bookingTips: 'Book on hotel website for best deals' },
    { name: 'Mid-Range Comfort Hotel', type: 'Standard', cost: '₹2,000-4,000', amenities: ['WiFi', 'AC', 'Breakfast', 'Travel Desk'], bookingTips: 'Check MakeMyTrip for discounts' },
    { name: 'Budget Hostel', type: 'Backpacker', cost: '₹500-1,500', amenities: ['WiFi', 'Kitchen', 'Lockers', 'Common Area'], bookingTips: 'Great for solo travelers. Book on Hostelworld.' },
  ],
  culturalTips: [
    'Remove shoes before entering temples and religious sites',
    'Dress modestly - cover shoulders and knees at heritage sites',
    'Always ask permission before photographing people',
    'Carry small denomination notes for tips and small purchases',
    'Use official prepaid taxis or ride-sharing apps from airports/stations',
    'Try local street food from busy stalls with high customer turnover',
  ],
  packingList: ['Comfortable walking shoes', 'Sunscreen and hat', 'Light scarf for temple visits', 'Reusable water bottle', 'Hand sanitizer', 'Small daypack', 'Power bank', 'Prescription medications'],
  hindiPhrases: [
    { phrase: 'नमस्ते', pronunciation: 'Namaste', meaning: 'Hello / Greetings' },
    { phrase: 'धन्यवाद', pronunciation: 'Dhanyavaad', meaning: 'Thank you' },
    { phrase: 'कितने का है?', pronunciation: 'Kitne ka hai?', meaning: 'How much does it cost?' },
    { phrase: 'हाँ / नहीं', pronunciation: 'Haan / Nahi', meaning: 'Yes / No' },
    { phrase: 'माफ कीजिए', pronunciation: 'Maaf kijiye', meaning: 'Excuse me / Sorry' },
    { phrase: 'अच्छा', pronunciation: 'Achha', meaning: 'OK / Good / I understand' },
  ],
}

export function generateFallbackItinerary(request: ItineraryRequest): ItineraryResponse {
  const data = destinationData[request.destination] || {
    ...defaultDestination,
    title: `Discover ${request.destination} – A Cultural Heritage Journey`,
    overview: `${request.destination} is one of India\'s most captivating destinations, offering a rich blend of heritage, culture, and natural beauty. ${defaultDestination.overview}`,
  }

  const budgetMultiplier = request.budget === 'luxury' ? 3 : request.budget === 'mid-range' ? 1.5 : 1
  const hotelIndex = request.budget === 'luxury' ? 0 : request.budget === 'mid-range' ? 1 : 2

  const dailyItinerary = []
  for (let day = 1; day <= request.duration; day++) {
    const dayActivities = data.activities.map((a) => ({
      ...a,
      activity: day === 1 ? a.activity : `Day ${day}: ${a.activity}`,
      difficulty: a.difficulty as 'easy' | 'moderate' | 'challenging',
      category: a.category as 'heritage' | 'culture' | 'nature' | 'food' | 'shopping' | 'spiritual',
    }))
    // Rotate activities for subsequent days
    if (day > 1) {
      dayActivities.reverse()
      dayActivities.forEach((a, i) => {
        a.time = ['7:30 AM', '10:00 AM', '12:30 PM', '3:00 PM', '5:00 PM', '7:30 PM'][i] || a.time
      })
    }

    const hotel = data.hotels[hotelIndex] || data.hotels[0]
    dailyItinerary.push({
      day,
      title: day === 1 ? `Arrival & First Impressions of ${request.destination}` : day === request.duration ? `Farewell ${request.destination} – Last Explorations` : `Deep Dive into ${request.destination}'s Heritage – Day ${day}`,
      activities: dayActivities,
      meals: {
        breakfast: { ...data.restaurants[1], dish: `Morning ${data.restaurants[1].dish}` },
        lunch: { ...data.restaurants[0] },
        dinner: { ...data.restaurants[2] || data.restaurants[0] },
      },
      accommodation: hotel,
      transportTips: `Use local autos (₹50-200), ride-sharing apps (Ola/Uber), or metro where available. Negotiate auto fares before riding.`,
      dailyBudget: `₹${Math.round(3000 * budgetMultiplier).toLocaleString()} - ₹${Math.round(6000 * budgetMultiplier).toLocaleString()}`,
    })
  }

  return {
    title: data.title,
    overview: data.overview,
    totalBudget: `₹${Math.round(request.duration * 4000 * budgetMultiplier).toLocaleString()} - ₹${Math.round(request.duration * 8000 * budgetMultiplier).toLocaleString()}`,
    dailyItinerary,
    budgetBreakdown: {
      accommodation: `₹${Math.round(request.duration * 2000 * budgetMultiplier).toLocaleString()}`,
      food: `₹${Math.round(request.duration * 1000 * budgetMultiplier).toLocaleString()}`,
      transport: `₹${Math.round(request.duration * 500 * budgetMultiplier).toLocaleString()}`,
      activities: `₹${Math.round(request.duration * 800 * budgetMultiplier).toLocaleString()}`,
      miscellaneous: `₹${Math.round(request.duration * 500).toLocaleString()}`,
      guideServices: `₹${Math.round(request.duration * 1200 * budgetMultiplier).toLocaleString()}`,
    },
    packingList: data.packingList,
    culturalTips: data.culturalTips,
    hindiPhrases: data.hindiPhrases,
    emergencyContacts: ['Police: 100', 'Ambulance: 102', 'Tourist Helpline: 1363', 'Women Helpline: 1091'],
    recommendedGuides: [
      {
        name: 'Rajesh Kumar',
        hindiName: 'राजेश कुमार',
        specialty: `${request.destination} Heritage & History`,
        experience: '10 years',
        rating: 4.8,
        pricePerDay: '₹1,500/day',
        contactInfo: '+91 98765 43210',
        bestFor: ['Heritage Walks', 'Photography Tours', 'Cultural Immersion'],
        coverageAreas: [request.destination, 'Nearby towns'],
        languages: ['Hindi', 'English'],
        whyRecommended: `Expert in ${request.destination}'s heritage with decade-long experience conducting culturally immersive tours`,
      },
      {
        name: 'Priya Sharma',
        hindiName: 'प्रिया शर्मा',
        specialty: 'Food & Culture Tours',
        experience: '7 years',
        rating: 4.9,
        pricePerDay: '₹1,200/day',
        contactInfo: '+91 98765 67890',
        bestFor: ['Food Tours', 'Market Walks', 'Cooking Classes'],
        coverageAreas: [request.destination],
        languages: ['Hindi', 'English', 'Regional Language'],
        whyRecommended: `Passionate food guide who knows the best hidden food gems in ${request.destination}`,
      },
    ],
    weatherConsiderations: [
      `${request.season === 'winter' ? 'Winter (Oct-Feb): Pleasant 10-25°C, ideal for sightseeing. Carry light jacket for evenings.' : ''}`,
      `${request.season === 'summer' ? 'Summer (Mar-Jun): Hot 30-45°C. Start early, take afternoon breaks. Carry sunscreen and water.' : ''}`,
      `${request.season === 'monsoon' ? 'Monsoon (Jul-Sep): Rainy with 25-35°C. Carry rain gear. Some sites may be slippery.' : ''}`,
      `${request.season === 'spring' ? 'Spring (Feb-Apr): Warm 20-35°C with pleasant mornings. Great for outdoor activities.' : ''}`,
    ].filter(Boolean),
    localInsights: [
      `${request.destination} locals are known for their warm hospitality - don't hesitate to ask for directions`,
      'The best food is often found at small family-run stalls, not fancy restaurants',
      'Visit heritage sites early morning (before 9 AM) to beat crowds and heat',
      'Street markets come alive in the evening - best shopping time is after 5 PM',
    ],
    sustainableTravelTips: [
      'Carry a reusable water bottle and bag to reduce plastic waste',
      'Support local artisans by buying directly from workshops',
      'Use public transport or shared rides when possible',
      'Respect wildlife and natural habitats during nature visits',
    ],
  }
}
