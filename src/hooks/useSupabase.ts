'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import { Database } from '@/lib/database.types'

// Kullanıcı için tip tanımı
export type User = {
  id: string
  email: string | null | undefined
  user_metadata: {
    name?: string
    avatar_url?: string
  } | null
  created_at: string
}

// Hook'un dönüş değerinin tip tanımı
type UseSupabaseReturn = {
  user: User | null
  loading: boolean
  error: Error | null
  signIn: (email: string, password: string) => Promise<{ user: User | null; error: Error | null }>
  signUp: (email: string, password: string, name: string) => Promise<{ user: User | null; error: Error | null }>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{ error: Error | null }>
  updatePassword: (password: string) => Promise<{ error: Error | null }>
}

export default function useSupabase(): UseSupabaseReturn {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    // Supabase'den mevcut kullanıcı bilgisini alır
    async function getUser() {
      try {
        setLoading(true)
        const { data: { user } } = await supabase.auth.getUser()
        
        if (user) {
          setUser({
            id: user.id,
            email: user.email ?? null,
            user_metadata: user.user_metadata,
            created_at: user.created_at
          })
        }
      } catch (err) {
        console.error('Kullanıcı getirilemedi:', err)
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    getUser()

    // Auth durumu değişikliklerini dinler
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email ?? null,
            user_metadata: session.user.user_metadata,
            created_at: session.user.created_at
          })
        } else {
          setUser(null)
        }
        setLoading(false)
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const signIn = async (email: string, password: string): Promise<{ user: User | null; error: Error | null }> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        throw error
      }

      if (data.user) {
        return {
          user: {
            id: data.user.id,
            email: data.user.email ?? null,
            user_metadata: data.user.user_metadata,
            created_at: data.user.created_at
          },
          error: null
        }
      }

      return { user: null, error: null }
    } catch (err) {
      console.error('Giriş hatası:', err)
      return { user: null, error: err as Error }
    }
  }

  const signUp = async (email: string, password: string, name: string): Promise<{ user: User | null; error: Error | null }> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name
          }
        }
      })

      if (error) {
        throw error
      }

      // Yeni kullanıcı profili oluştur
      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              user_id: data.user.id,
              name
            }
          ])

        if (profileError) {
          console.error('Profil oluşturma hatası:', profileError)
        }

        return {
          user: {
            id: data.user.id,
            email: data.user.email ?? null,
            user_metadata: data.user.user_metadata,
            created_at: data.user.created_at
          },
          error: null
        }
      }

      return { user: null, error: null }
    } catch (err) {
      console.error('Kayıt hatası:', err)
      return { user: null, error: err as Error }
    }
  }

  const signOut = async (): Promise<void> => {
    try {
      await supabase.auth.signOut()
      setUser(null)
    } catch (err) {
      console.error('Çıkış hatası:', err)
      setError(err as Error)
    }
  }

  const resetPassword = async (email: string): Promise<{ error: Error | null }> => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })
      
      if (error) {
        throw error
      }
      
      return { error: null }
    } catch (err) {
      console.error('Şifre sıfırlama hatası:', err)
      return { error: err as Error }
    }
  }

  const updatePassword = async (password: string): Promise<{ error: Error | null }> => {
    try {
      const { error } = await supabase.auth.updateUser({
        password
      })
      
      if (error) {
        throw error
      }
      
      return { error: null }
    } catch (err) {
      console.error('Şifre güncelleme hatası:', err)
      return { error: err as Error }
    }
  }

  return {
    user,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updatePassword
  }
} 