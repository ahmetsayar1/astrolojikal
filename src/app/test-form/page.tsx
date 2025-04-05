'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase/client'
import useSupabase from '@/hooks/useSupabase'

export default function TestFormPage() {
  const { user } = useSupabase()
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  
  const handleTestSupabase = async () => {
    try {
      setLoading(true)
      setError(null)
      
      if (!user) {
        setError('Kullanıcı giriş yapmamış!')
        return
      }
      
      console.log('Supabase test başlıyor...')
      console.log('Kullanıcı ID:', user.id)
      
      const { data, error } = await supabase
        .from('dream_interpretations')
        .insert([{
          user_id: user.id,
          dream_description: 'Test rüyası',
          status: 'pending',
          payment_status: 'pending',
          metadata: { emotions: ['Test'] }
        }])
        .select()
      
      if (error) {
        console.error('Supabase hatası:', error)
        setError(`Supabase hatası: ${error.message}`)
        return
      }
      
      setResult({
        success: true,
        data
      })
      
    } catch (err) {
      console.error('Test hatası:', err)
      setError(`Bir hata oluştu: ${err instanceof Error ? err.message : 'Bilinmeyen hata'}`)
    } finally {
      setLoading(false)
    }
  }
  
  const handleTestAPI = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Test API'sine istek at
      const response = await fetch('/api/test-client', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          test: true,
          userId: user?.id || 'no-user',
          timestamp: new Date().toISOString()
        }),
      })
      
      const data = await response.json()
      
      setResult({
        success: response.ok,
        status: response.status,
        data
      })
      
    } catch (err) {
      console.error('API test hatası:', err)
      setError(`API hatası: ${err instanceof Error ? err.message : 'Bilinmeyen hata'}`)
    } finally {
      setLoading(false)
    }
  }
  
  const handleTestDBInsert = async () => {
    try {
      setLoading(true)
      setError(null)
      setResult(null)

      const response = await fetch('/api/test-dream-insert')
      const data = await response.json()

      setResult(data)
    } catch (err) {
      console.error('Test DB Insert Error:', err)
      setError(err instanceof Error ? err.message : 'Bilinmeyen hata')
    } finally {
      setLoading(false)
    }
  }

  // Rüya yorumunu tamamlama fonksiyonu
  const handleCompleteDreamInterpretation = async () => {
    try {
      setLoading(true)
      setError(null)
      setResult(null)

      if (!user) {
        setError('Bu işlem için giriş yapmanız gerekiyor')
        return
      }

      // Supabase'den bekleyen rüya yorumlarını al
      const { supabase } = await import('@/lib/supabase/client')
      
      // İlk bekleyen rüya yorumunu al
      const { data: pendingDreams, error: fetchError } = await supabase
        .from('dream_interpretations')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'pending')
        .order('created_at', { ascending: false })
        .limit(1)
      
      if (fetchError) {
        throw new Error(`Veritabanı hatası: ${fetchError.message}`)
      }
      
      if (!pendingDreams || pendingDreams.length === 0) {
        setError('Bekleyen rüya yorumu bulunamadı')
        return
      }

      const dreamId = pendingDreams[0].id
      
      // API'yi çağır ve yorumu tamamla
      const response = await fetch('/api/dreams/interpret', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dreamId }),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Bir hata oluştu')
      }
      
      const data = await response.json()
      setResult(data)
      
    } catch (err) {
      console.error('Rüya yorumu tamamlama hatası:', err)
      setError(err instanceof Error ? err.message : 'Bilinmeyen hata')
    } finally {
      setLoading(false)
    }
  }

  // Rüya yorumunu doğrudan oluşturma fonksiyonu
  const handleCreateCompletedDream = async () => {
    try {
      setLoading(true)
      setError(null)
      setResult(null)

      if (!user) {
        setError('Bu işlem için giriş yapmanız gerekiyor')
        return
      }

      // Supabase'i import et
      const { supabase } = await import('@/lib/supabase/client')
      
      // Test rüya açıklaması
      const dreamDescription = "Rüyamda mavi bir denizde yüzüyordum. Denizin dibinde parlak ışıklar gördüm. Işıklara doğru yüzmeye başladım. Işıklar beni karşılarına aldılar ve benimle konuşmaya başladılar. Ne dediklerini tam hatırlamıyorum ama çok huzur vericiydi."
      const emotions = ["Huzur", "Merak", "Şaşkınlık"]
      
      // Gemini AI aracılığıyla rüya yorumunu al
      const { interpretDream } = await import('@/lib/ai/gemini')
      console.log('Rüya yorumu oluşturuluyor...')
      const interpretationResult = await interpretDream(dreamDescription, emotions)
      
      // Rüya yorumu verilerini hazırla
      const dreamData = {
        user_id: user.id,
        dream_description: dreamDescription,
        status: 'completed',
        payment_status: 'completed',
        metadata: { emotions },
        interpretation: JSON.stringify(interpretationResult)
      }
      
      // Rüya yorumunu veritabanına ekle
      const { data, error: insertError } = await supabase
        .from('dream_interpretations')
        .insert([dreamData])
        .select()
      
      if (insertError) {
        throw new Error(`Veritabanı hatası: ${insertError.message}`)
      }
      
      setResult({
        success: true,
        message: 'Tamamlanmış rüya yorumu oluşturuldu',
        data
      })
      
    } catch (err) {
      console.error('Tamamlanmış rüya oluşturma hatası:', err)
      setError(err instanceof Error ? err.message : 'Bilinmeyen hata')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-6">
          <h1 className="text-2xl font-bold text-white mb-6">Test Sayfası</h1>
          
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-white mb-3">Kullanıcı Durumu</h2>
              <pre className="bg-black/50 p-4 rounded-md text-white overflow-auto">
                {JSON.stringify(user, null, 2) || 'Giriş yapılmamış'}
              </pre>
            </div>
            
            <div className="flex space-x-4">
              <Button 
                onClick={handleTestSupabase}
                disabled={loading}
                variant="gradient"
              >
                {loading ? 'İşleniyor...' : 'Supabase Testi'}
              </Button>
              
              <Button
                onClick={handleTestAPI}
                disabled={loading}
                variant="outline"
              >
                {loading ? 'İşleniyor...' : 'API Testi'}
              </Button>
              
              <Button
                onClick={handleTestDBInsert}
                disabled={loading}
                variant="secondary"
              >
                {loading ? 'İşleniyor...' : 'DB Insert Testi'}
              </Button>
              
              <Button
                onClick={handleCreateCompletedDream}
                disabled={loading || !user}
                variant="default"
              >
                {loading ? 'İşleniyor...' : 'Tamamlanmış Rüya Oluştur'}
              </Button>
            </div>
            
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 p-4 rounded-md">
                <h3 className="text-white font-medium mb-2">Hata</h3>
                <p className="text-white/80">{error}</p>
              </div>
            )}
            
            {result && (
              <div className="bg-green-500/20 border border-green-500/50 p-4 rounded-md">
                <h3 className="text-white font-medium mb-2">Sonuç</h3>
                <pre className="text-white/80 overflow-auto">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            )}

            <div className="p-4 border rounded">
              <h2 className="text-xl font-semibold mb-4">Bekleyen Rüya Yorumunu Tamamla</h2>
              <div className="mb-2">
                <p>Kullanıcı: {user ? user.email : 'Giriş yapılmadı'}</p>
              </div>
              <button 
                onClick={handleCompleteDreamInterpretation}
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
                disabled={loading || !user}
              >
                {loading ? 'İşleniyor...' : 'Rüya Yorumunu Tamamla'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 