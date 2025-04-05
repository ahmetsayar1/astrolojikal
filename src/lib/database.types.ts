export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          password: string
          created_at: string
          updated_at: string
          is_admin: boolean
          profile_complete: boolean
          is_premium: boolean
          premium_until: string | null
        }
        Insert: {
          id?: string
          email: string
          password: string
          created_at?: string
          updated_at?: string
          is_admin?: boolean
          profile_complete?: boolean
          is_premium?: boolean
          premium_until?: string | null
        }
        Update: {
          id?: string
          email?: string
          password?: string
          created_at?: string
          updated_at?: string
          is_admin?: boolean
          profile_complete?: boolean
          is_premium?: boolean
          premium_until?: string | null
        }
      }
      dreams: {
        Row: {
          id: string
          user_id: string | null
          age: number | null
          gender: string | null
          dream_content: string
          emotions: string | null
          interpretation: Json
          created_at: string
          is_public: boolean
        }
        Insert: {
          id?: string
          user_id?: string | null
          age?: number | null
          gender?: string | null
          dream_content: string
          emotions?: string | null
          interpretation: Json
          created_at?: string
          is_public?: boolean
        }
        Update: {
          id?: string
          user_id?: string | null
          age?: number | null
          gender?: string | null
          dream_content?: string
          emotions?: string | null
          interpretation?: Json
          created_at?: string
          is_public?: boolean
        }
      }
      tarot_readings: {
        Row: {
          id: string
          user_id: string | null
          birth_date: string | null
          question: string | null
          selected_cards: Json
          interpretation: Json
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          birth_date?: string | null
          question?: string | null
          selected_cards: Json
          interpretation: Json
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          birth_date?: string | null
          question?: string | null
          selected_cards?: Json
          interpretation?: Json
          created_at?: string
        }
      }
      katina_readings: {
        Row: {
          id: string
          user_id: string | null
          question: string | null
          selected_cards: Json
          reversed_cards: Json | null
          interpretation: Json
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          question?: string | null
          selected_cards: Json
          reversed_cards?: Json | null
          interpretation: Json
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          question?: string | null
          selected_cards?: Json
          reversed_cards?: Json | null
          interpretation?: Json
          created_at?: string
        }
      }
      coffee_readings: {
        Row: {
          id: string
          user_id: string | null
          age: number | null
          gender: string | null
          education: string | null
          relationship_status: string | null
          image_url: string
          interpretation: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          age?: number | null
          gender?: string | null
          education?: string | null
          relationship_status?: string | null
          image_url: string
          interpretation: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          age?: number | null
          gender?: string | null
          education?: string | null
          relationship_status?: string | null
          image_url?: string
          interpretation?: string
          created_at?: string
        }
      }
      blog_posts: {
        Row: {
          id: string
          title: string
          slug: string
          content: string
          image_url: string | null
          meta_title: string | null
          meta_description: string | null
          keywords: string[] | null
          author_id: string | null
          published_at: string | null
          created_at: string
          updated_at: string
          is_published: boolean
          post_type: string
          zodiac_sign: string | null
        }
        Insert: {
          id?: string
          title: string
          slug: string
          content: string
          image_url?: string | null
          meta_title?: string | null
          meta_description?: string | null
          keywords?: string[] | null
          author_id?: string | null
          published_at?: string | null
          created_at?: string
          updated_at?: string
          is_published?: boolean
          post_type: string
          zodiac_sign?: string | null
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          content?: string
          image_url?: string | null
          meta_title?: string | null
          meta_description?: string | null
          keywords?: string[] | null
          author_id?: string | null
          published_at?: string | null
          created_at?: string
          updated_at?: string
          is_published?: boolean
          post_type?: string
          zodiac_sign?: string | null
        }
      }
      zodiac_signs: {
        Row: {
          id: number
          name: string
          name_en: string
          date_range: string
          element: string
          ruling_planet: string
          symbol: string
          description: string
        }
        Insert: {
          id?: number
          name: string
          name_en: string
          date_range: string
          element: string
          ruling_planet: string
          symbol: string
          description: string
        }
        Update: {
          id?: number
          name?: string
          name_en?: string
          date_range?: string
          element?: string
          ruling_planet?: string
          symbol?: string
          description?: string
        }
      }
      tarot_cards: {
        Row: {
          id: number
          name: string
          image_url: string | null
          meaning_upright: string
          meaning_reversed: string
          description: string
        }
        Insert: {
          id?: number
          name: string
          image_url?: string | null
          meaning_upright: string
          meaning_reversed: string
          description: string
        }
        Update: {
          id?: number
          name?: string
          image_url?: string | null
          meaning_upright?: string
          meaning_reversed?: string
          description?: string
        }
      }
      katina_cards: {
        Row: {
          id: number
          name: string
          image_url: string | null
          meaning_upright: string
          meaning_reversed: string
          description: string
        }
        Insert: {
          id?: number
          name: string
          image_url?: string | null
          meaning_upright: string
          meaning_reversed: string
          description: string
        }
        Update: {
          id?: number
          name?: string
          image_url?: string | null
          meaning_upright?: string
          meaning_reversed?: string
          description?: string
        }
      }
      dream_interpretations: {
        Row: {
          id: string
          user_id: string
          dream_description: string
          status: 'pending' | 'processing' | 'completed'
          payment_status: 'pending' | 'completed'
          created_at: string
          updated_at: string
          interpretation: string | null
          metadata: Json | null
        }
        Insert: {
          id?: string
          user_id: string
          dream_description: string
          status?: 'pending' | 'processing' | 'completed'
          payment_status?: 'pending' | 'completed'
          created_at?: string
          updated_at?: string
          interpretation?: string | null
          metadata?: Json | null
        }
        Update: {
          id?: string
          user_id?: string
          dream_description?: string
          status?: 'pending' | 'processing' | 'completed'
          payment_status?: 'pending' | 'completed'
          created_at?: string
          updated_at?: string
          interpretation?: string | null
          metadata?: Json | null
        }
      }
      fortune_readings: {
        Row: {
          id: string
          created_at: string
          user_id: string
          type: 'tarot' | 'coffee' | 'katina'
          question: string | null
          reading_result: string | null
          image_url: string | null
          status: 'pending' | 'completed' | 'rejected'
          payment_status: 'pending' | 'completed' | 'failed'
          payment_id: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          type: 'tarot' | 'coffee' | 'katina'
          question?: string | null
          reading_result?: string | null
          image_url?: string | null
          status?: 'pending' | 'completed' | 'rejected'
          payment_status?: 'pending' | 'completed' | 'failed'
          payment_id?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          type?: 'tarot' | 'coffee' | 'katina'
          question?: string | null
          reading_result?: string | null
          image_url?: string | null
          status?: 'pending' | 'completed' | 'rejected'
          payment_status?: 'pending' | 'completed' | 'failed'
          payment_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fortune_readings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          id: string
          user_id: string
          name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      comments: {
        Row: {
          id: string
          created_at: string
          user_id: string
          content: string
          rating: number
          service_type: 'dream' | 'tarot' | 'coffee' | 'katina'
          service_id: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          content: string
          rating: number
          service_type: 'dream' | 'tarot' | 'coffee' | 'katina'
          service_id?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          content?: string
          rating?: number
          service_type?: 'dream' | 'tarot' | 'coffee' | 'katina'
          service_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
  }
} 