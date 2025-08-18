import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  avatar: {
    type: String,
    default: ''
  },
  preferences: {
    favoriteDestinations: [String],
    interests: [String],
    budget: String,
    travelStyle: String
  },
  bookings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking'
  }],
  wishlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Place'
  }],
  isVerified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

const placeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    city: String,
    district: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  category: {
    type: String,
    enum: ['temple', 'palace', 'museum', 'monument', 'garden', 'beach', 'wildlife', 'cultural'],
    required: true
  },
  images: [String],
  rating: {
    type: Number,
    default: 0
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: Number,
    comment: String,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  visitInfo: {
    bestTimeToVisit: String,
    timeNeeded: String,
    entryFee: Number,
    openingHours: String
  },
  accessibility: {
    wheelchairAccessible: Boolean,
    publicTransport: Boolean,
    parking: Boolean
  }
}, {
  timestamps: true
})

const guideSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  avatar: String,
  bio: String,
  specialties: [String],
  languages: [String],
  experience: Number,
  rating: {
    type: Number,
    default: 0
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: Number,
    comment: String,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  pricing: {
    halfDay: Number,
    fullDay: Number,
    multiDay: Number
  },
  availability: {
    type: Map,
    of: Boolean
  },
  isVerified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  location: {
    address: String,
    city: String,
    district: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  type: {
    type: String,
    enum: ['heritage', 'boutique', 'budget', 'luxury', 'eco'],
    required: true
  },
  images: [String],
  amenities: [String],
  rooms: [{
    type: String,
    capacity: Number,
    price: Number,
    features: [String]
  }],
  rating: {
    type: Number,
    default: 0
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: Number,
    comment: String,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  contact: {
    phone: String,
    email: String,
    website: String
  }
}, {
  timestamps: true
})

const experienceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  type: {
    type: String,
    enum: ['cultural', 'food', 'workshop', 'performance', 'festival', 'nature'],
    required: true
  },
  duration: String,
  price: Number,
  capacity: Number,
  location: {
    venue: String,
    city: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  schedule: [{
    date: Date,
    time: String,
    availableSpots: Number
  }],
  host: {
    name: String,
    bio: String,
    avatar: String
  },
  includes: [String],
  requirements: [String],
  images: [String],
  rating: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  category: {
    type: String,
    enum: ['textiles', 'pottery', 'jewelry', 'art', 'books', 'food', 'crafts'],
    required: true
  },
  artisan: {
    name: String,
    location: String,
    story: String,
    avatar: String
  },
  price: {
    type: Number,
    required: true
  },
  images: [String],
  specifications: {
    material: String,
    dimensions: String,
    weight: String,
    origin: String
  },
  inventory: {
    quantity: Number,
    inStock: Boolean
  },
  rating: {
    type: Number,
    default: 0
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: Number,
    comment: String,
    images: [String],
    date: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
})

const itinerarySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: String,
  duration: Number,
  budget: Number,
  preferences: {
    interests: [String],
    travelStyle: String,
    groupSize: Number
  },
  days: [{
    day: Number,
    places: [{
      place: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Place'
      },
      timeSlot: String,
      duration: String
    }],
    activities: [String],
    meals: [String],
    accommodation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hotel'
    }
  }],
  transportation: [{
    from: String,
    to: String,
    mode: String,
    duration: String,
    cost: Number
  }],
  totalCost: Number,
  isAIGenerated: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

// Export models
export const User = mongoose.models.User || mongoose.model('User', userSchema)
export const Place = mongoose.models.Place || mongoose.model('Place', placeSchema)
export const Guide = mongoose.models.Guide || mongoose.model('Guide', guideSchema)
export const Hotel = mongoose.models.Hotel || mongoose.model('Hotel', hotelSchema)
export const Experience = mongoose.models.Experience || mongoose.model('Experience', experienceSchema)
export const Product = mongoose.models.Product || mongoose.model('Product', productSchema)
export const Itinerary = mongoose.models.Itinerary || mongoose.model('Itinerary', itinerarySchema)
