import connectDB from '@/lib/mongodb'
import { Place, Hotel, Guide, Experience, Product } from '@/lib/models'

export async function seedDatabase() {
  try {
    await connectDB()
    
    // Clear existing data
    await Place.deleteMany({})
    await Hotel.deleteMany({})
    await Guide.deleteMany({})
    await Experience.deleteMany({})
    await Product.deleteMany({})

    // Seed Places
    const places = [
      {
        name: 'Victoria Memorial',
        description: 'A magnificent marble monument built in memory of Queen Victoria, showcasing Indo-British architecture.',
        location: {
          city: 'Kolkata',
          district: 'Kolkata',
          coordinates: { latitude: 22.5448, longitude: 88.3426 }
        },
        category: 'monument',
        images: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800'],
        rating: 4.8,
        visitInfo: {
          bestTimeToVisit: 'October to March',
          timeNeeded: '2-3 hours',
          entryFee: 30,
          openingHours: '10:00 AM - 6:00 PM'
        },
        accessibility: {
          wheelchairAccessible: true,
          publicTransport: true,
          parking: true
        }
      },
      {
        name: 'Dakshineswar Temple',
        description: 'Famous Kali temple by the river Ganges, associated with Ramakrishna Paramahamsa.',
        location: {
          city: 'Kolkata',
          district: 'North 24 Parganas',
          coordinates: { latitude: 22.6551, longitude: 88.3572 }
        },
        category: 'temple',
        images: ['https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800'],
        rating: 4.7,
        visitInfo: {
          bestTimeToVisit: 'Year round',
          timeNeeded: '1-2 hours',
          entryFee: 0,
          openingHours: '6:00 AM - 12:30 PM, 3:00 PM - 8:30 PM'
        },
        accessibility: {
          wheelchairAccessible: false,
          publicTransport: true,
          parking: true
        }
      },
      {
        name: 'Bishnupur Temples',
        description: 'Ancient terracotta temples showcasing the unique Bengali temple architecture.',
        location: {
          city: 'Bishnupur',
          district: 'Bankura',
          coordinates: { latitude: 23.0787, longitude: 87.3191 }
        },
        category: 'temple',
        images: ['https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=800'],
        rating: 4.6,
        visitInfo: {
          bestTimeToVisit: 'October to March',
          timeNeeded: 'Full day',
          entryFee: 15,
          openingHours: '9:00 AM - 5:00 PM'
        },
        accessibility: {
          wheelchairAccessible: false,
          publicTransport: true,
          parking: true
        }
      }
    ]

    // Seed Hotels
    const hotels = [
      {
        name: 'The Oberoi Grand',
        description: 'Luxury heritage hotel in the heart of Kolkata',
        location: {
          address: '15 Jawaharlal Nehru Road',
          city: 'Kolkata',
          district: 'Kolkata',
          coordinates: { latitude: 22.5579, longitude: 88.3511 }
        },
        type: 'heritage',
        images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'],
        amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant', 'Fitness Center'],
        rooms: [
          { type: 'Deluxe Room', capacity: 2, price: 8500, features: ['AC', 'TV', 'Minibar'] },
          { type: 'Suite', capacity: 4, price: 15000, features: ['AC', 'TV', 'Minibar', 'Living Area'] }
        ],
        rating: 4.9,
        contact: {
          phone: '+91-33-2249-2323',
          email: 'reservations@oberoigroup.com',
          website: 'www.oberoihotels.com'
        }
      }
    ]

    // Seed Guides
    const guides = [
      {
        name: 'Ravi Bhattacharya',
        email: 'ravi@guides.com',
        phone: '+91-98765-43210',
        bio: 'Expert heritage guide with 15 years of experience in Bengal culture and history.',
        specialties: ['Heritage Sites', 'Cultural Tours', 'Temple Architecture'],
        languages: ['English', 'Bengali', 'Hindi'],
        experience: 15,
        rating: 4.9,
        pricing: {
          halfDay: 2500,
          fullDay: 4500,
          multiDay: 4000
        },
        isVerified: true
      }
    ]

    // Seed Experiences
    const experiences = [
      {
        title: 'Traditional Bengali Cooking Class',
        description: 'Learn to cook authentic Bengali dishes with a local family',
        type: 'food',
        duration: '4 hours',
        price: 2500,
        capacity: 8,
        location: {
          venue: 'Traditional Bengali Home',
          city: 'Kolkata',
          coordinates: { latitude: 22.5626, longitude: 88.3630 }
        },
        host: {
          name: 'Sujata Devi',
          bio: 'Traditional Bengali cook with 30 years of experience',
          avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=200'
        },
        includes: ['All ingredients', 'Recipe booklet', 'Traditional meal'],
        requirements: ['Comfortable clothes', 'Basic hygiene'],
        images: ['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800'],
        rating: 4.8
      }
    ]

    // Seed Products
    const products = [
      {
        name: 'Authentic Kantha Embroidery Scarf',
        description: 'Handcrafted Kantha embroidery scarf by rural Bengali artisans',
        category: 'textiles',
        artisan: {
          name: 'Meera Das',
          location: 'Shantiniketan',
          story: 'Third generation Kantha embroidery artist preserving traditional techniques',
          avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=200'
        },
        price: 1800,
        images: ['https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=800'],
        specifications: {
          material: 'Pure Cotton',
          dimensions: '200cm x 70cm',
          weight: '200g',
          origin: 'Shantiniketan'
        },
        inventory: {
          quantity: 25,
          inStock: true
        },
        rating: 4.7
      }
    ]

    // Insert data
    await Place.insertMany(places)
    await Hotel.insertMany(hotels)
    await Guide.insertMany(guides)
    await Experience.insertMany(experiences)
    await Product.insertMany(products)

    console.log('Database seeded successfully!')
    
  } catch (error) {
    console.error('Error seeding database:', error)
  }
}
