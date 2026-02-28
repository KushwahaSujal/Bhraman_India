-- =====================================================
-- BHRAMAN WEST BENGAL TOURISM - SUPABASE DATABASE SCHEMA
-- =====================================================
-- This schema creates all necessary tables for the tourism platform
-- Run this in your Supabase SQL Editor

-- =====================================================
-- 1. NOTE: RLS is already enabled on auth.users by Supabase
-- =====================================================
-- No need to modify auth.users table - it's managed by Supabase

-- =====================================================
-- 2. CREATE MAIN TABLES
-- =====================================================

-- PROFILES TABLE - Extended user information
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  email TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'guide', 'admin', 'hotel_owner')),
  preferences JSONB DEFAULT '{}'::jsonb,
  bio TEXT,
  date_of_birth DATE,
  gender TEXT CHECK (gender IN ('male', 'female', 'other', 'prefer_not_to_say')),
  location TEXT,
  is_verified BOOLEAN DEFAULT false,
  total_bookings INTEGER DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  average_rating DECIMAL(2,1) DEFAULT 0.0
);

-- PLACES TABLE - Tourist destinations and heritage sites
CREATE TABLE public.places (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  name TEXT NOT NULL,
  bengali_name TEXT,
  description TEXT,
  short_description TEXT,
  location TEXT NOT NULL,
  district TEXT,
  coordinates JSONB, -- {"lat": 22.5726, "lng": 88.3639}
  category TEXT NOT NULL CHECK (category IN ('heritage', 'temple', 'museum', 'park', 'waterfall', 'beach', 'hill_station', 'cultural_site', 'historical', 'religious')),
  subcategory TEXT,
  images TEXT[] DEFAULT '{}',
  main_image TEXT,
  rating DECIMAL(2,1) DEFAULT 0.0,
  total_reviews INTEGER DEFAULT 0,
  entry_fee DECIMAL(10,2),
  opening_hours JSONB DEFAULT '{}'::jsonb, -- {"monday": {"open": "09:00", "close": "17:00"}}
  best_time_to_visit TEXT,
  cultural_significance TEXT,
  historical_importance TEXT,
  facilities TEXT[] DEFAULT '{}', -- ["parking", "restroom", "cafeteria", "guide_available"]
  nearby_attractions TEXT[] DEFAULT '{}',
  accessibility_features TEXT[] DEFAULT '{}',
  contact_info JSONB DEFAULT '{}'::jsonb,
  website_url TEXT,
  is_unesco_site BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  visit_duration_hours INTEGER, -- Estimated visit time
  difficulty_level TEXT CHECK (difficulty_level IN ('easy', 'moderate', 'challenging')),
  tags TEXT[] DEFAULT '{}',
  created_by UUID REFERENCES auth.users(id),
  approved_by UUID REFERENCES auth.users(id),
  approval_status TEXT DEFAULT 'pending' CHECK (approval_status IN ('pending', 'approved', 'rejected'))
);

-- HOTELS TABLE - Accommodation options
CREATE TABLE public.hotels (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  name TEXT NOT NULL,
  bengali_name TEXT,
  description TEXT,
  short_description TEXT,
  location TEXT NOT NULL,
  district TEXT,
  coordinates JSONB,
  address TEXT,
  price_range TEXT NOT NULL CHECK (price_range IN ('budget', 'mid_range', 'luxury', 'premium')),
  min_price DECIMAL(10,2),
  max_price DECIMAL(10,2),
  amenities TEXT[] DEFAULT '{}', -- ["wifi", "ac", "restaurant", "pool", "spa", "gym"]
  images TEXT[] DEFAULT '{}',
  main_image TEXT,
  rating DECIMAL(2,1) DEFAULT 0.0,
  total_reviews INTEGER DEFAULT 0,
  contact_info JSONB DEFAULT '{}'::jsonb, -- {"phone": "+91...", "email": "...", "website": "..."}
  room_types JSONB DEFAULT '[]'::jsonb, -- [{"type": "deluxe", "price": 3000, "capacity": 2}]
  heritage_status BOOLEAN DEFAULT false,
  star_rating INTEGER CHECK (star_rating >= 1 AND star_rating <= 5),
  check_in_time TIME DEFAULT '14:00',
  check_out_time TIME DEFAULT '11:00',
  cancellation_policy TEXT,
  policies TEXT[] DEFAULT '{}',
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  owner_id UUID REFERENCES auth.users(id),
  approval_status TEXT DEFAULT 'pending' CHECK (approval_status IN ('pending', 'approved', 'rejected'))
);

-- GUIDES TABLE - Local tour guides
CREATE TABLE public.guides (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  specialties TEXT[] DEFAULT '{}', -- ["heritage_tours", "food_tours", "cultural_tours", "adventure"]
  languages TEXT[] DEFAULT '{}', -- ["bengali", "english", "hindi", "urdu"]
  experience_years INTEGER DEFAULT 0,
  rating DECIMAL(2,1) DEFAULT 0.0,
  total_reviews INTEGER DEFAULT 0,
  hourly_rate DECIMAL(10,2),
  daily_rate DECIMAL(10,2),
  availability JSONB DEFAULT '{}'::jsonb, -- {"monday": {"available": true, "slots": ["09:00-13:00", "14:00-18:00"]}}
  bio TEXT,
  education TEXT,
  certifications TEXT[] DEFAULT '{}',
  license_number TEXT,
  areas_covered TEXT[] DEFAULT '{}', -- Districts or regions they cover
  vehicle_available BOOLEAN DEFAULT false,
  vehicle_type TEXT,
  emergency_contact TEXT,
  is_verified BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  total_tours_completed INTEGER DEFAULT 0,
  approval_status TEXT DEFAULT 'pending' CHECK (approval_status IN ('pending', 'approved', 'rejected'))
);

-- BOOKINGS TABLE - All types of bookings
CREATE TABLE public.bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  booking_number TEXT UNIQUE NOT NULL, -- Generated booking reference
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  guide_id UUID REFERENCES guides(id) ON DELETE SET NULL,
  hotel_id UUID REFERENCES hotels(id) ON DELETE SET NULL,
  place_id UUID REFERENCES places(id) ON DELETE SET NULL,
  booking_type TEXT NOT NULL CHECK (booking_type IN ('guide', 'hotel', 'experience', 'package', 'place_visit')),
  start_date DATE NOT NULL,
  end_date DATE,
  start_time TIME,
  end_time TIME,
  duration_hours INTEGER,
  guest_count INTEGER DEFAULT 1,
  children_count INTEGER DEFAULT 0,
  total_amount DECIMAL(10,2) NOT NULL,
  advance_amount DECIMAL(10,2) DEFAULT 0.00,
  remaining_amount DECIMAL(10,2) DEFAULT 0.00,
  currency TEXT DEFAULT 'INR',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled', 'refunded')),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'partial', 'paid', 'refunded')),
  payment_method TEXT,
  transaction_id TEXT,
  special_requests TEXT,
  booking_details JSONB DEFAULT '{}'::jsonb,
  cancellation_reason TEXT,
  cancelled_at TIMESTAMP WITH TIME ZONE,
  confirmed_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE
);

-- REVIEWS TABLE - Reviews and ratings
CREATE TABLE public.reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
  place_id UUID REFERENCES places(id) ON DELETE CASCADE,
  hotel_id UUID REFERENCES hotels(id) ON DELETE CASCADE,
  guide_id UUID REFERENCES guides(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  comment TEXT,
  images TEXT[] DEFAULT '{}',
  pros TEXT[] DEFAULT '{}',
  cons TEXT[] DEFAULT '{}',
  helpful_count INTEGER DEFAULT 0,
  verified_booking BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  is_approved BOOLEAN DEFAULT true,
  response_from_owner TEXT,
  response_date TIMESTAMP WITH TIME ZONE
);

-- ITINERARIES TABLE - Travel itineraries
CREATE TABLE public.itineraries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  duration_days INTEGER NOT NULL,
  total_cost DECIMAL(10,2),
  currency TEXT DEFAULT 'INR',
  difficulty_level TEXT DEFAULT 'easy' CHECK (difficulty_level IN ('easy', 'moderate', 'challenging')),
  season TEXT, -- "winter", "summer", "monsoon", "all_year"
  best_for TEXT[] DEFAULT '{}', -- ["families", "couples", "solo", "groups", "adventure"]
  is_public BOOLEAN DEFAULT false,
  is_ai_generated BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  itinerary_data JSONB NOT NULL, -- Detailed day-by-day plan
  places_covered UUID[] DEFAULT '{}', -- Array of place IDs
  hotels_included UUID[] DEFAULT '{}', -- Array of hotel IDs
  tags TEXT[] DEFAULT '{}',
  likes_count INTEGER DEFAULT 0,
  views_count INTEGER DEFAULT 0,
  bookings_count INTEGER DEFAULT 0,
  thumbnail_image TEXT,
  images TEXT[] DEFAULT '{}'
);

-- EXPERIENCES TABLE - Special experiences and packages
CREATE TABLE public.experiences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  title TEXT NOT NULL,
  bengali_title TEXT,
  description TEXT,
  short_description TEXT,
  category TEXT NOT NULL CHECK (category IN ('cultural', 'culinary', 'adventure', 'heritage', 'spiritual', 'festival', 'workshop', 'photography')),
  duration_hours INTEGER,
  duration_days INTEGER,
  price DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'INR',
  max_participants INTEGER,
  min_participants INTEGER DEFAULT 1,
  difficulty_level TEXT CHECK (difficulty_level IN ('easy', 'moderate', 'challenging')),
  age_restriction TEXT,
  included_services TEXT[] DEFAULT '{}',
  excluded_services TEXT[] DEFAULT '{}',
  what_to_bring TEXT[] DEFAULT '{}',
  meeting_point TEXT,
  coordinates JSONB,
  images TEXT[] DEFAULT '{}',
  main_image TEXT,
  guide_id UUID REFERENCES guides(id),
  places_visited UUID[] DEFAULT '{}',
  is_seasonal BOOLEAN DEFAULT false,
  available_months INTEGER[] DEFAULT '{}', -- [1,2,3] for Jan,Feb,Mar
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  rating DECIMAL(2,1) DEFAULT 0.0,
  total_reviews INTEGER DEFAULT 0,
  total_bookings INTEGER DEFAULT 0,
  created_by UUID REFERENCES auth.users(id),
  approval_status TEXT DEFAULT 'pending' CHECK (approval_status IN ('pending', 'approved', 'rejected'))
);

-- FESTIVALS TABLE - Cultural festivals and events
CREATE TABLE public.festivals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  name TEXT NOT NULL,
  bengali_name TEXT,
  description TEXT,
  short_description TEXT,
  category TEXT CHECK (category IN ('religious', 'cultural', 'harvest', 'seasonal', 'folk', 'classical')),
  start_date DATE,
  end_date DATE,
  is_annual BOOLEAN DEFAULT true,
  month_celebrated INTEGER, -- 1-12 for month
  location TEXT,
  places TEXT[] DEFAULT '{}', -- Where it's celebrated
  significance TEXT,
  rituals TEXT[] DEFAULT '{}',
  special_foods TEXT[] DEFAULT '{}',
  images TEXT[] DEFAULT '{}',
  main_image TEXT,
  is_featured BOOLEAN DEFAULT false,
  related_experiences UUID[] DEFAULT '{}'
);

-- FOOD ITEMS TABLE - Bengali cuisine and local specialties
CREATE TABLE public.food_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  name TEXT NOT NULL,
  bengali_name TEXT,
  description TEXT,
  category TEXT CHECK (category IN ('sweet', 'savory', 'main_course', 'appetizer', 'beverage', 'street_food', 'traditional')),
  ingredients TEXT[] DEFAULT '{}',
  dietary_info TEXT[] DEFAULT '{}', -- ["vegetarian", "vegan", "gluten_free"]
  origin_place TEXT,
  preparation_time INTEGER, -- in minutes
  images TEXT[] DEFAULT '{}',
  main_image TEXT,
  recipe TEXT,
  cultural_significance TEXT,
  best_places_to_try TEXT[] DEFAULT '{}',
  is_seasonal BOOLEAN DEFAULT false,
  season TEXT,
  price_range TEXT CHECK (price_range IN ('budget', 'moderate', 'expensive')),
  is_featured BOOLEAN DEFAULT false
);

-- NOTIFICATIONS TABLE - User notifications
CREATE TABLE public.notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT CHECK (type IN ('booking', 'review', 'system', 'promotion', 'reminder')),
  related_id UUID, -- ID of related booking, review, etc.
  is_read BOOLEAN DEFAULT false,
  action_url TEXT,
  expires_at TIMESTAMP WITH TIME ZONE
);

-- FAVORITES TABLE - User favorites
CREATE TABLE public.favorites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  item_type TEXT NOT NULL CHECK (item_type IN ('place', 'hotel', 'guide', 'experience', 'itinerary')),
  item_id UUID NOT NULL,
  UNIQUE(user_id, item_type, item_id)
);

-- =====================================================
-- 3. CREATE INDEXES FOR PERFORMANCE
-- =====================================================

-- Profiles indexes
CREATE INDEX idx_profiles_username ON public.profiles(username);
CREATE INDEX idx_profiles_role ON public.profiles(role);
CREATE INDEX idx_profiles_is_verified ON public.profiles(is_verified);

-- Places indexes
CREATE INDEX idx_places_category ON public.places(category);
CREATE INDEX idx_places_district ON public.places(district);
CREATE INDEX idx_places_rating ON public.places(rating);
CREATE INDEX idx_places_is_featured ON public.places(is_featured);
CREATE INDEX idx_places_is_active ON public.places(is_active);
CREATE INDEX idx_places_approval_status ON public.places(approval_status);

-- Hotels indexes
CREATE INDEX idx_hotels_district ON public.hotels(district);
CREATE INDEX idx_hotels_price_range ON public.hotels(price_range);
CREATE INDEX idx_hotels_rating ON public.hotels(rating);
CREATE INDEX idx_hotels_is_featured ON public.hotels(is_featured);
CREATE INDEX idx_hotels_is_active ON public.hotels(is_active);

-- Guides indexes
CREATE INDEX idx_guides_user_id ON public.guides(user_id);
CREATE INDEX idx_guides_rating ON public.guides(rating);
CREATE INDEX idx_guides_is_verified ON public.guides(is_verified);
CREATE INDEX idx_guides_is_active ON public.guides(is_active);

-- Bookings indexes
CREATE INDEX idx_bookings_user_id ON public.bookings(user_id);
CREATE INDEX idx_bookings_guide_id ON public.bookings(guide_id);
CREATE INDEX idx_bookings_hotel_id ON public.bookings(hotel_id);
CREATE INDEX idx_bookings_booking_type ON public.bookings(booking_type);
CREATE INDEX idx_bookings_status ON public.bookings(status);
CREATE INDEX idx_bookings_start_date ON public.bookings(start_date);
CREATE INDEX idx_bookings_booking_number ON public.bookings(booking_number);

-- Reviews indexes
CREATE INDEX idx_reviews_user_id ON public.reviews(user_id);
CREATE INDEX idx_reviews_place_id ON public.reviews(place_id);
CREATE INDEX idx_reviews_hotel_id ON public.reviews(hotel_id);
CREATE INDEX idx_reviews_guide_id ON public.reviews(guide_id);
CREATE INDEX idx_reviews_rating ON public.reviews(rating);
CREATE INDEX idx_reviews_is_approved ON public.reviews(is_approved);

-- Itineraries indexes
CREATE INDEX idx_itineraries_user_id ON public.itineraries(user_id);
CREATE INDEX idx_itineraries_is_public ON public.itineraries(is_public);
CREATE INDEX idx_itineraries_is_featured ON public.itineraries(is_featured);
CREATE INDEX idx_itineraries_duration_days ON public.itineraries(duration_days);

-- Experiences indexes
CREATE INDEX idx_experiences_category ON public.experiences(category);
CREATE INDEX idx_experiences_guide_id ON public.experiences(guide_id);
CREATE INDEX idx_experiences_is_active ON public.experiences(is_active);
CREATE INDEX idx_experiences_is_featured ON public.experiences(is_featured);

-- Notifications indexes
CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX idx_notifications_is_read ON public.notifications(is_read);
CREATE INDEX idx_notifications_type ON public.notifications(type);

-- Favorites indexes
CREATE INDEX idx_favorites_user_id ON public.favorites(user_id);
CREATE INDEX idx_favorites_item_type ON public.favorites(item_type);

-- =====================================================
-- 4. ENABLE ROW LEVEL SECURITY
-- =====================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.places ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hotels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.itineraries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.festivals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.food_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 5. CREATE ROW LEVEL SECURITY POLICIES
-- =====================================================

-- PROFILES POLICIES
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- PLACES POLICIES
CREATE POLICY "Places are viewable by everyone" ON public.places
  FOR SELECT USING (is_active = true AND approval_status = 'approved');

CREATE POLICY "Authenticated users can insert places" ON public.places
  FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their own places" ON public.places
  FOR UPDATE USING (auth.uid() = created_by);

-- HOTELS POLICIES
CREATE POLICY "Hotels are viewable by everyone" ON public.hotels
  FOR SELECT USING (is_active = true AND approval_status = 'approved');

CREATE POLICY "Hotel owners can insert hotels" ON public.hotels
  FOR INSERT WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Hotel owners can update their hotels" ON public.hotels
  FOR UPDATE USING (auth.uid() = owner_id);

-- GUIDES POLICIES
CREATE POLICY "Guides are viewable by everyone" ON public.guides
  FOR SELECT USING (is_active = true AND approval_status = 'approved');

CREATE POLICY "Users can insert their guide profile" ON public.guides
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Guides can update their own profile" ON public.guides
  FOR UPDATE USING (auth.uid() = user_id);

-- BOOKINGS POLICIES
CREATE POLICY "Users can view their own bookings" ON public.bookings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own bookings" ON public.bookings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own bookings" ON public.bookings
  FOR UPDATE USING (auth.uid() = user_id);

-- REVIEWS POLICIES
CREATE POLICY "Reviews are viewable by everyone" ON public.reviews
  FOR SELECT USING (is_approved = true);

CREATE POLICY "Users can insert their own reviews" ON public.reviews
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reviews" ON public.reviews
  FOR UPDATE USING (auth.uid() = user_id);

-- ITINERARIES POLICIES
CREATE POLICY "Public itineraries are viewable by everyone" ON public.itineraries
  FOR SELECT USING (is_public = true OR auth.uid() = user_id);

CREATE POLICY "Users can insert their own itineraries" ON public.itineraries
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own itineraries" ON public.itineraries
  FOR UPDATE USING (auth.uid() = user_id);

-- EXPERIENCES POLICIES
CREATE POLICY "Experiences are viewable by everyone" ON public.experiences
  FOR SELECT USING (is_active = true AND approval_status = 'approved');

CREATE POLICY "Users can insert experiences" ON public.experiences
  FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their own experiences" ON public.experiences
  FOR UPDATE USING (auth.uid() = created_by);

-- FESTIVALS POLICIES
CREATE POLICY "Festivals are viewable by everyone" ON public.festivals
  FOR SELECT USING (true);

-- FOOD ITEMS POLICIES
CREATE POLICY "Food items are viewable by everyone" ON public.food_items
  FOR SELECT USING (true);

-- NOTIFICATIONS POLICIES
CREATE POLICY "Users can view their own notifications" ON public.notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications" ON public.notifications
  FOR UPDATE USING (auth.uid() = user_id);

-- FAVORITES POLICIES
CREATE POLICY "Users can view their own favorites" ON public.favorites
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own favorites" ON public.favorites
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own favorites" ON public.favorites
  FOR DELETE USING (auth.uid() = user_id);

-- =====================================================
-- 6. CREATE FUNCTIONS AND TRIGGERS
-- =====================================================

-- Function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, username)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.email,
    COALESCE(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1))
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call function on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers to all tables
CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER places_updated_at BEFORE UPDATE ON public.places
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER hotels_updated_at BEFORE UPDATE ON public.hotels
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER guides_updated_at BEFORE UPDATE ON public.guides
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER bookings_updated_at BEFORE UPDATE ON public.bookings
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER reviews_updated_at BEFORE UPDATE ON public.reviews
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER itineraries_updated_at BEFORE UPDATE ON public.itineraries
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER experiences_updated_at BEFORE UPDATE ON public.experiences
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

-- Function to generate booking number
CREATE OR REPLACE FUNCTION public.generate_booking_number()
RETURNS trigger AS $$
BEGIN
  NEW.booking_number = 'BHR' || to_char(now(), 'YYYYMMDD') || lpad(nextval('booking_sequence')::text, 4, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create sequence for booking numbers
CREATE SEQUENCE IF NOT EXISTS booking_sequence START 1;

-- Trigger for booking number generation
CREATE TRIGGER generate_booking_number_trigger
  BEFORE INSERT ON public.bookings
  FOR EACH ROW EXECUTE PROCEDURE public.generate_booking_number();

-- Function to update ratings
CREATE OR REPLACE FUNCTION public.update_ratings()
RETURNS trigger AS $$
BEGIN
  -- Update place rating
  IF NEW.place_id IS NOT NULL THEN
    UPDATE public.places SET 
      rating = (SELECT AVG(rating)::decimal(2,1) FROM public.reviews WHERE place_id = NEW.place_id AND is_approved = true),
      total_reviews = (SELECT COUNT(*) FROM public.reviews WHERE place_id = NEW.place_id AND is_approved = true)
    WHERE id = NEW.place_id;
  END IF;
  
  -- Update hotel rating
  IF NEW.hotel_id IS NOT NULL THEN
    UPDATE public.hotels SET 
      rating = (SELECT AVG(rating)::decimal(2,1) FROM public.reviews WHERE hotel_id = NEW.hotel_id AND is_approved = true),
      total_reviews = (SELECT COUNT(*) FROM public.reviews WHERE hotel_id = NEW.hotel_id AND is_approved = true)
    WHERE id = NEW.hotel_id;
  END IF;
  
  -- Update guide rating
  IF NEW.guide_id IS NOT NULL THEN
    UPDATE public.guides SET 
      rating = (SELECT AVG(rating)::decimal(2,1) FROM public.reviews WHERE guide_id = NEW.guide_id AND is_approved = true),
      total_reviews = (SELECT COUNT(*) FROM public.reviews WHERE guide_id = NEW.guide_id AND is_approved = true)
    WHERE id = NEW.guide_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update ratings when review is added/updated
CREATE TRIGGER update_ratings_trigger
  AFTER INSERT OR UPDATE ON public.reviews
  FOR EACH ROW EXECUTE PROCEDURE public.update_ratings();

-- =====================================================
-- 7. INSERT SAMPLE DATA (OPTIONAL)
-- =====================================================

-- Sample places data
INSERT INTO public.places (name, bengali_name, description, location, district, category, images, rating, entry_fee, cultural_significance, is_featured, is_active, approval_status) VALUES
('Victoria Memorial', 'ভিক্টোরিয়া মেমোরিয়াল', 'A magnificent marble monument dedicated to Queen Victoria, showcasing Indo-Saracenic architecture and housing a museum with colonial artifacts.', 'Kolkata', 'Kolkata', 'heritage', '{"https://images.unsplash.com/photo-1578662996442-48f60103fc96"}', 4.5, 30.00, 'Symbol of British colonial legacy in Bengal, now serves as a museum showcasing Indian history and art.', true, true, 'approved'),
('Howrah Bridge', 'হাওড়া ব্রিজ', 'The iconic cantilever bridge over Hooghly River, connecting Kolkata with Howrah. A marvel of engineering and symbol of modern Bengal.', 'Kolkata', 'Kolkata', 'heritage', '{"https://images.unsplash.com/photo-1590736969955-71cc94901144"}', 4.3, 0.00, 'Engineering marvel and iconic symbol of Kolkata, representing the citys connection and progress.', true, true, 'approved'),
('Dakshineswar Kali Temple', 'দক্ষিণেশ্বর কালী মন্দির', 'Famous temple complex where Sri Ramakrishna Paramahamsa attained spiritual enlightenment. Sacred pilgrimage site for devotees.', 'Dakshineswar', 'North 24 Parganas', 'temple', '{"https://images.unsplash.com/photo-1582510003544-4d00b7f74220"}', 4.7, 0.00, 'Sacred temple associated with Sri Ramakrishna, representing the spiritual heritage of Bengal.', true, true, 'approved'),
('Sundarbans National Park', 'সুন্দরবন জাতীয় উদ্যান', 'Largest mangrove forest in the world and home to the Royal Bengal Tiger. UNESCO World Heritage Site.', 'Sundarbans', 'South 24 Parganas', 'park', '{"https://images.unsplash.com/photo-1571407970349-bc81e7e96d47"}', 4.6, 500.00, 'Unique ecosystem and biodiversity hotspot, representing Bengals natural heritage and conservation efforts.', true, true, 'approved'),
('Belur Math', 'বেলুড় মঠ', 'Headquarters of Ramakrishna Mission, founded by Swami Vivekananda. Beautiful architecture blending Hindu, Christian and Islamic motifs.', 'Belur', 'Howrah', 'religious', '{"https://images.unsplash.com/photo-1578761499019-d98e142b13e5"}', 4.4, 0.00, 'Center of spiritual learning and universal religion philosophy, showcasing Bengals philosophical traditions.', true, true, 'approved');

-- Sample festivals data
INSERT INTO public.festivals (name, bengali_name, description, category, month_celebrated, location, significance, is_featured) VALUES
('Durga Puja', 'দুর্গা পূজা', 'The grandest festival of Bengal celebrating Goddess Durga with magnificent pandals, cultural programs, and community celebrations.', 'religious', 10, 'Throughout West Bengal', 'Celebrates the victory of good over evil and showcases Bengals rich cultural traditions, art, and craftsmanship.', true),
('Poila Boishakh', 'পহেলা বৈশাখ', 'Bengali New Year celebration with traditional foods, cultural programs, and processions marking the beginning of the Bengali calendar.', 'cultural', 4, 'Throughout West Bengal', 'Marks the beginning of the Bengali calendar year and celebrates Bengali culture, traditions, and heritage.', true),
('Kali Puja', 'কালী পূজা', 'Festival dedicated to Goddess Kali, celebrated with beautiful lighting, firecrackers, and traditional sweets.', 'religious', 11, 'Throughout West Bengal', 'Worship of Goddess Kali representing divine feminine power and protection from evil forces.', true),
('Jagaddhatri Puja', 'জগদ্ধাত্রী পূজা', 'Festival celebrating Goddess Jagaddhatri, particularly famous in Chandannagar with elaborate decorations and processions.', 'religious', 11, 'Chandannagar, Hooghly', 'Celebrates the protective aspect of the divine mother and is known for its artistic pandals and celebrations.', false);

-- Sample food items data
INSERT INTO public.food_items (name, bengali_name, description, category, ingredients, origin_place, cultural_significance, is_featured) VALUES
('Rasgulla', 'রসগোল্লা', 'Soft, spongy sweet made from cottage cheese and soaked in light sugar syrup. The pride of Bengali confectionery.', 'sweet', '{"cottage cheese", "sugar", "cardamom", "rose water"}', 'Kolkata', 'Iconic Bengali sweet representing the sweetness of Bengali culture and hospitality.', true),
('Fish Curry', 'মাছের ঝোল', 'Traditional Bengali fish curry cooked with mustard oil, turmeric, and various spices. A staple of Bengali cuisine.', 'main_course', '{"fish", "mustard oil", "turmeric", "onion", "ginger", "garlic", "green chilies"}', 'West Bengal', 'Central to Bengali cuisine, reflecting the river-rich geography and fishing traditions of Bengal.', true),
('Sandesh', 'সন্দেশ', 'Delicate sweet made from fresh cottage cheese, often flavored with cardamom or rose water and shaped artistically.', 'sweet', '{"cottage cheese", "sugar", "cardamom", "pistachios"}', 'West Bengal', 'Traditional Bengali sweet showcasing the artistry and refinement of Bengali confectionery.', true),
('Puchka', 'ফুচকা', 'Crispy hollow puris filled with spiced water, chutneys, and various fillings. Popular street food across Bengal.', 'street_food', '{"semolina puris", "tamarind water", "mint chutney", "potatoes", "chickpeas", "spices"}', 'Kolkata', 'Popular street food representing the vibrant street food culture of Bengal.', false);

-- =====================================================
-- 8. GRANT PERMISSIONS
-- =====================================================

-- Grant usage on schema
GRANT USAGE ON SCHEMA public TO anon, authenticated;

-- Grant permissions on tables
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon;

-- Grant permissions on sequences
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- =====================================================
-- 9. CREATE STORAGE BUCKETS (Run separately in Storage section)
-- =====================================================

/*
-- Run these commands in the Supabase Storage section:

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('places', 'places', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('hotels', 'hotels', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('experiences', 'experiences', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('reviews', 'reviews', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('itineraries', 'itineraries', true);

-- Storage policies for avatars
CREATE POLICY "Avatar images are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'avatars');
CREATE POLICY "Users can upload their own avatar" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can update their own avatar" ON storage.objects FOR UPDATE USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can delete their own avatar" ON storage.objects FOR DELETE USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Storage policies for places
CREATE POLICY "Place images are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'places');
CREATE POLICY "Authenticated users can upload place images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'places' AND auth.role() = 'authenticated');

-- Storage policies for hotels
CREATE POLICY "Hotel images are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'hotels');
CREATE POLICY "Authenticated users can upload hotel images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'hotels' AND auth.role() = 'authenticated');

-- Storage policies for experiences
CREATE POLICY "Experience images are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'experiences');
CREATE POLICY "Authenticated users can upload experience images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'experiences' AND auth.role() = 'authenticated');

-- Storage policies for reviews
CREATE POLICY "Review images are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'reviews');
CREATE POLICY "Users can upload their own review images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'reviews' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Storage policies for itineraries
CREATE POLICY "Itinerary images are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'itineraries');
CREATE POLICY "Users can upload their own itinerary images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'itineraries' AND auth.uid()::text = (storage.foldername(name))[1]);
*/

-- =====================================================
-- SCHEMA SETUP COMPLETE! 🎉
-- =====================================================
-- 
-- Your Bhraman West Bengal Tourism database is now ready!
-- 
-- Next steps:
-- 1. Add your Supabase credentials to .env.local
-- 2. Test the authentication flow
-- 3. Start building your tourism features
-- 
-- Tables created:
-- ✅ profiles - User profiles and settings
-- ✅ places - Tourist destinations and heritage sites  
-- ✅ hotels - Accommodation options
-- ✅ guides - Local tour guides
-- ✅ bookings - All types of bookings
-- ✅ reviews - Reviews and ratings
-- ✅ itineraries - Travel itineraries
-- ✅ experiences - Special experiences and packages
-- ✅ festivals - Cultural festivals and events
-- ✅ food_items - Bengali cuisine and specialties
-- ✅ notifications - User notifications
-- ✅ favorites - User favorites
-- 
-- Features enabled:
-- ✅ Row Level Security (RLS)
-- ✅ Automatic profile creation
-- ✅ Automatic booking number generation
-- ✅ Automatic rating updates
-- ✅ Timestamp management
-- ✅ Performance indexes
-- ✅ Sample data for testing
-- 
-- Ready to explore the beauty of Bengal! 🌟
--
