export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          updated_at: string | null
          username: string | null
          full_name: string | null
          avatar_url: string | null
          phone: string | null
          email: string | null
          role: 'user' | 'guide' | 'admin'
          preferences: Json | null
        }
        Insert: {
          id: string
          updated_at?: string | null
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          email?: string | null
          role?: 'user' | 'guide' | 'admin'
          preferences?: Json | null
        }
        Update: {
          id?: string
          updated_at?: string | null
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          email?: string | null
          role?: 'user' | 'guide' | 'admin'
          preferences?: Json | null
        }
      }
      places: {
        Row: {
          id: string
          created_at: string
          name: string
          description: string | null
          location: string
          coordinates: Json | null
          category: string
          images: string[] | null
          rating: number | null
          entry_fee: number | null
          opening_hours: Json | null
          best_time_to_visit: string | null
          cultural_significance: string | null
          facilities: string[] | null
          nearby_attractions: string[] | null
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          description?: string | null
          location: string
          coordinates?: Json | null
          category: string
          images?: string[] | null
          rating?: number | null
          entry_fee?: number | null
          opening_hours?: Json | null
          best_time_to_visit?: string | null
          cultural_significance?: string | null
          facilities?: string[] | null
          nearby_attractions?: string[] | null
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          description?: string | null
          location?: string
          coordinates?: Json | null
          category?: string
          images?: string[] | null
          rating?: number | null
          entry_fee?: number | null
          opening_hours?: Json | null
          best_time_to_visit?: string | null
          cultural_significance?: string | null
          facilities?: string[] | null
          nearby_attractions?: string[] | null
        }
      }
      hotels: {
        Row: {
          id: string
          created_at: string
          name: string
          description: string | null
          location: string
          coordinates: Json | null
          price_range: string
          amenities: string[] | null
          images: string[] | null
          rating: number | null
          contact_info: Json | null
          room_types: Json | null
          heritage_status: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          description?: string | null
          location: string
          coordinates?: Json | null
          price_range: string
          amenities?: string[] | null
          images?: string[] | null
          rating?: number | null
          contact_info?: Json | null
          room_types?: Json | null
          heritage_status?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          description?: string | null
          location?: string
          coordinates?: Json | null
          price_range?: string
          amenities?: string[] | null
          images?: string[] | null
          rating?: number | null
          contact_info?: Json | null
          room_types?: Json | null
          heritage_status?: boolean
        }
      }
      guides: {
        Row: {
          id: string
          created_at: string
          user_id: string
          specialties: string[] | null
          languages: string[] | null
          experience_years: number | null
          rating: number | null
          hourly_rate: number | null
          availability: Json | null
          bio: string | null
          certifications: string[] | null
          reviews_count: number | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          specialties?: string[] | null
          languages?: string[] | null
          experience_years?: number | null
          rating?: number | null
          hourly_rate?: number | null
          availability?: Json | null
          bio?: string | null
          certifications?: string[] | null
          reviews_count?: number | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          specialties?: string[] | null
          languages?: string[] | null
          experience_years?: number | null
          rating?: number | null
          hourly_rate?: number | null
          availability?: Json | null
          bio?: string | null
          certifications?: string[] | null
          reviews_count?: number | null
        }
      }
      bookings: {
        Row: {
          id: string
          created_at: string
          user_id: string
          guide_id: string | null
          hotel_id: string | null
          booking_type: 'guide' | 'hotel' | 'experience' | 'package'
          start_date: string
          end_date: string | null
          total_amount: number
          status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
          special_requests: string | null
          booking_details: Json | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          guide_id?: string | null
          hotel_id?: string | null
          booking_type: 'guide' | 'hotel' | 'experience' | 'package'
          start_date: string
          end_date?: string | null
          total_amount: number
          status?: 'pending' | 'confirmed' | 'cancelled' | 'completed'
          special_requests?: string | null
          booking_details?: Json | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          guide_id?: string | null
          hotel_id?: string | null
          booking_type?: 'guide' | 'hotel' | 'experience' | 'package'
          start_date?: string
          end_date?: string | null
          total_amount?: number
          status?: 'pending' | 'confirmed' | 'cancelled' | 'completed'
          special_requests?: string | null
          booking_details?: Json | null
        }
      }
      reviews: {
        Row: {
          id: string
          created_at: string
          user_id: string
          booking_id: string
          rating: number
          comment: string | null
          images: string[] | null
          helpful_count: number | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          booking_id: string
          rating: number
          comment?: string | null
          images?: string[] | null
          helpful_count?: number | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          booking_id?: string
          rating?: number
          comment?: string | null
          images?: string[] | null
          helpful_count?: number | null
        }
      }
      itineraries: {
        Row: {
          id: string
          created_at: string
          user_id: string
          title: string
          description: string | null
          duration_days: number
          total_cost: number | null
          difficulty_level: 'easy' | 'moderate' | 'challenging'
          is_public: boolean
          is_ai_generated: boolean
          itinerary_data: Json
          tags: string[] | null
          likes_count: number | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          title: string
          description?: string | null
          duration_days: number
          total_cost?: number | null
          difficulty_level: 'easy' | 'moderate' | 'challenging'
          is_public?: boolean
          is_ai_generated?: boolean
          itinerary_data: Json
          tags?: string[] | null
          likes_count?: number | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          title?: string
          description?: string | null
          duration_days?: number
          total_cost?: number | null
          difficulty_level?: 'easy' | 'moderate' | 'challenging'
          is_public?: boolean
          is_ai_generated?: boolean
          itinerary_data?: Json
          tags?: string[] | null
          likes_count?: number | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]
