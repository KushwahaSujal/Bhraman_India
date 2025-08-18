# Supabase Setup Guide for Bhromon

## 🚀 Quick Setup Instructions

### 1. Create a Supabase Project
1. Go to [https://supabase.com](https://supabase.com)
2. Sign up/Login and create a new project
3. Choose a name like "bhromon-bengal-tourism"
4. Select a region close to your users

### 2. Get Your API Keys
1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (e.g., `https://your-project.supabase.co`)
   - **Anon (public) Key** (starts with `eyJ...`)
   - **Service Role Key** (starts with `eyJ...`)

### 3. Configure Environment Variables
1. Create a `.env.local` file in your project root
2. Add your Supabase credentials:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# App Configuration
NEXTAUTH_URL=http://localhost:3002
NEXTAUTH_SECRET=your-random-secret-key

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3002
```

### 4. Set Up Database Tables
Run these SQL commands in your Supabase SQL editor:

```sql
-- Enable RLS (Row Level Security)
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  updated_at TIMESTAMP WITH TIME ZONE,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  email TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'guide', 'admin')),
  preferences JSONB,
  PRIMARY KEY (id)
);

-- Create places table
CREATE TABLE public.places (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  name TEXT NOT NULL,
  description TEXT,
  location TEXT NOT NULL,
  coordinates JSONB,
  category TEXT NOT NULL,
  images TEXT[],
  rating DECIMAL(2,1),
  entry_fee DECIMAL(10,2),
  opening_hours JSONB,
  best_time_to_visit TEXT,
  cultural_significance TEXT,
  facilities TEXT[],
  nearby_attractions TEXT[]
);

-- Create hotels table
CREATE TABLE public.hotels (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  name TEXT NOT NULL,
  description TEXT,
  location TEXT NOT NULL,
  coordinates JSONB,
  price_range TEXT NOT NULL,
  amenities TEXT[],
  images TEXT[],
  rating DECIMAL(2,1),
  contact_info JSONB,
  room_types JSONB,
  heritage_status BOOLEAN DEFAULT false
);

-- Create guides table
CREATE TABLE public.guides (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  specialties TEXT[],
  languages TEXT[],
  experience_years INTEGER,
  rating DECIMAL(2,1),
  hourly_rate DECIMAL(10,2),
  availability JSONB,
  bio TEXT,
  certifications TEXT[],
  reviews_count INTEGER DEFAULT 0
);

-- Create bookings table
CREATE TABLE public.bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  guide_id UUID REFERENCES guides(id),
  hotel_id UUID REFERENCES hotels(id),
  booking_type TEXT NOT NULL CHECK (booking_type IN ('guide', 'hotel', 'experience', 'package')),
  start_date DATE NOT NULL,
  end_date DATE,
  total_amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  special_requests TEXT,
  booking_details JSONB
);

-- Create reviews table
CREATE TABLE public.reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  images TEXT[],
  helpful_count INTEGER DEFAULT 0
);

-- Create itineraries table
CREATE TABLE public.itineraries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  duration_days INTEGER NOT NULL,
  total_cost DECIMAL(10,2),
  difficulty_level TEXT DEFAULT 'easy' CHECK (difficulty_level IN ('easy', 'moderate', 'challenging')),
  is_public BOOLEAN DEFAULT false,
  is_ai_generated BOOLEAN DEFAULT false,
  itinerary_data JSONB NOT NULL,
  tags TEXT[],
  likes_count INTEGER DEFAULT 0
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.places ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hotels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.itineraries ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Public profiles are viewable by everyone." ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile." ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile." ON profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Places are viewable by everyone." ON places FOR SELECT USING (true);
CREATE POLICY "Hotels are viewable by everyone." ON hotels FOR SELECT USING (true);
CREATE POLICY "Guides are viewable by everyone." ON guides FOR SELECT USING (true);

CREATE POLICY "Users can view own bookings." ON bookings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own bookings." ON bookings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own bookings." ON bookings FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own reviews." ON reviews FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own reviews." ON reviews FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view public itineraries." ON itineraries FOR SELECT USING (is_public = true OR auth.uid() = user_id);
CREATE POLICY "Users can insert own itineraries." ON itineraries FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own itineraries." ON itineraries FOR UPDATE USING (auth.uid() = user_id);

-- Function to automatically create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.email);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the function on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
```

### 5. Configure Authentication
1. In Supabase dashboard, go to **Authentication** → **Settings**
2. Set up **Site URL**: `http://localhost:3002`
3. Add **Redirect URLs**: `http://localhost:3002/auth/callback`
4. Enable **Email confirmations** if desired

### 6. Test the Integration
1. Start your development server: `npm run dev`
2. Visit `http://localhost:3002`
3. Click "Get Started" to test the authentication flow
4. Create an account and verify it works

## 🎯 Features Available

✅ **User Authentication** - Sign up, Sign in, Sign out
✅ **Protected Routes** - Dashboard requires authentication
✅ **User Profiles** - Automatic profile creation
✅ **Database Tables** - All tourism-related data structures
✅ **Row Level Security** - Secure data access
✅ **TypeScript Support** - Full type safety

## 🔗 Useful Links

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Auth Helpers](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

## 🎨 Custom Features for Bhromon

The integration includes Bengali cultural elements:
- Bengali typography in auth forms
- Heritage color scheme
- Cultural quotes and design elements
- West Bengal tourism-specific database schema

Ready to explore the beauty of Bengal! 🌟
