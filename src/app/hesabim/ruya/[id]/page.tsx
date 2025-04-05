'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import useSupabase from '@/hooks/useSupabase'
import { ArrowLeft, Book, Clock, Award, Moon, Sun, Sparkles, AlertCircle } from 'lucide-react'

type DreamInterpretation = {
  id: string
  user_id: string
  dream_description: string
  status: 'pending' | 'processing' | 'completed'
  payment_status: 'pending' | 'completed'
  created_at: string
  interpretation: string | null
  metadata?: {
    emotions: string[]
  }
}

type InterpretationResult = {
  summary: string
  interpretation: string
  symbols: Array<{
    name: string
    meaning: string
    emoji?: string
  }>
  emotions: Array<{
    name: string
    impact: string
  }>
  guidance: string
}

export default function DreamDetailPage() {
  const router = useRouter()
  const params = useParams()
  const { user, loading: userLoading } = useSupabase()
  
  const [dreamData, setDreamData] = useState<DreamInterpretation | null>(null)
  const [interpretation, setInterpretation] = useState<InterpretationResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [interpretLoading, setInterpretLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    // Kullanıcı giriş yapmamışsa giriş sayfasına yönlendir
    if (!userLoading && !user) {
      router.push('/auth/giris')
    }
  }, [user, userLoading, router])
  
  useEffect(() => {
    if (user && params.id) {
      loadDreamInterpretation(params.id as string)
    }
  }, [user, params.id])
  
  const loadDreamInterpretation = async (dreamId: string) => {
    try {
      setLoading(true)
      setError(null)
      
      const { supabase } = await import('@/lib/supabase/client')
      
      const { data, error } = await supabase
        .from('dream_interpretations')
        .select('*')
        .eq('id', dreamId)
        .eq('user_id', user?.id)
        .single()
      
      if (error) throw error
      
      setDreamData(data)
      
      // Eğer yorum varsa, JSON'a çevir ve state'e ata
      if (data.interpretation) {
        try {
          const parsedInterpretation = JSON.parse(data.interpretation)
          setInterpretation(parsedInterpretation)
        } catch (err) {
          console.error('Yorum JSON parse hatası:', err)
        }
      }
    } catch (err) {
      console.error('Rüya yorumu yüklenirken hata:', err)
      setError('Rüya yorumu yüklenirken bir hata oluştu.')
    } finally {
      setLoading(false)
    }
  }
  
  const handleRequestInterpretation = async () => {
    if (!dreamData) return
    
    try {
      setInterpretLoading(true)
      setError(null)
      
      // API'ye istek gönder
      const response = await fetch('/api/dreams/interpret', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dreamId: dreamData.id
        }),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Bir hata oluştu')
      }
      
      const data = await response.json()
      
      if (data.success && data.interpretation) {
        setInterpretation(data.interpretation)
        
        // Verileri yeniden yükle
        loadDreamInterpretation(dreamData.id)
      }
    } catch (err) {
      console.error('Rüya yorumu alınırken hata:', err)
      setError(`Rüya yorumu alınırken bir hata oluştu: ${err instanceof Error ? err.message : 'Bilinmeyen hata'}`)
    } finally {
      setInterpretLoading(false)
    }
  }
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('tr-TR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }
  
  if (userLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex items-center">
          <div className="h-8 w-8 bg-white/30 rounded-full mr-3"></div>
          <div className="h-6 w-32 bg-white/30 rounded"></div>
        </div>
      </div>
    )
  }
  
  if (!user) {
    return null // useEffect içinde zaten yönlendirme yapılıyor
  }
  
  if (!dreamData) {
    if (error) {
      return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-6 mb-8">
              <div className="flex items-center mb-6">
                <Button 
                  variant="outline" 
                  className="text-white border-white/20 hover:bg-white/10 mr-4"
                  onClick={() => router.push('/hesabim')}
                >
                  <ArrowLeft size={16} className="mr-2" />
                  Geri Dön
                </Button>
                <h1 className="text-2xl font-bold text-white">Rüya Yorumu</h1>
              </div>
              
              <div className="bg-red-500/20 border border-red-500/50 text-white p-4 rounded-md flex items-start">
                <AlertCircle className="shrink-0 w-5 h-5 mr-3 mt-0.5 text-red-400" />
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Üst Panel - Başlık ve Geri Butonu */}
          <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-6 mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
              <div className="flex items-center mb-4 sm:mb-0">
                <Button 
                  variant="outline" 
                  className="text-white border-white/20 hover:bg-white/10 mr-4"
                  onClick={() => router.push('/hesabim')}
                >
                  <ArrowLeft size={16} className="mr-2" />
                  Geri Dön
                </Button>
                <h1 className="text-2xl font-bold text-white">Rüya Yorumu #{dreamData.id.slice(0, 8)}</h1>
              </div>
              <div className="flex items-center text-white/60">
                <Clock size={14} className="mr-2" />
                <span className="text-sm">{formatDate(dreamData.created_at)}</span>
              </div>
            </div>
          </div>
          
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-white p-4 rounded-md mb-8 flex items-start">
              <AlertCircle className="shrink-0 w-5 h-5 mr-3 mt-0.5 text-red-400" />
              <p>{error}</p>
            </div>
          )}
          
          {/* Rüya İçeriği */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="md:col-span-1">
              <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-6 h-full">
                <div className="flex items-center mb-4">
                  <Book size={20} className="text-[#FFD700] mr-3" />
                  <h2 className="text-lg font-bold text-white">Rüya Detayları</h2>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-white/70 mb-1">Durum</h3>
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm 
                      ${dreamData.status === 'completed' ? 'bg-green-500/20 text-green-400' : 
                      dreamData.status === 'processing' ? 'bg-blue-500/20 text-blue-400' : 
                      'bg-yellow-500/20 text-yellow-400'}`}
                    >
                      <div className={`w-2 h-2 rounded-full mr-2 
                        ${dreamData.status === 'completed' ? 'bg-green-500' : 
                        dreamData.status === 'processing' ? 'bg-blue-500' : 
                        'bg-yellow-500'}`}
                      ></div>
                      {dreamData.status === 'completed' ? 'Tamamlandı' : 
                       dreamData.status === 'processing' ? 'İşleniyor' : 
                       'Beklemede'}
                    </div>
                  </div>
                  
                  {dreamData.metadata?.emotions && dreamData.metadata.emotions.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-white/70 mb-2">Hissedilen Duygular</h3>
                      <div className="flex flex-wrap gap-2">
                        {dreamData.metadata.emotions.map((emotion) => (
                          <span 
                            key={emotion}
                            className="bg-[#2A1C5A] text-xs text-white py-1 px-3 rounded-full"
                          >
                            {emotion}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <Moon size={20} className="text-[#FFD700] mr-3" />
                  <h2 className="text-lg font-bold text-white">Rüya Tanımı</h2>
                </div>
                <p className="text-white/90 mb-6 whitespace-pre-line">{dreamData.dream_description}</p>
                
                {!interpretation && dreamData.status !== 'completed' && (
                  <div className="mt-4">
                    <Button
                      variant="gradient"
                      disabled={interpretLoading}
                      onClick={handleRequestInterpretation}
                      className="w-full"
                    >
                      {interpretLoading ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Yorum İşleniyor...
                        </span>
                      ) : (
                        <span>Yorumu Göster</span>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Yorum Sonuçları - Eğer tamamlanmışsa */}
          {interpretation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-gradient-to-br from-[#2A1C5A]/50 to-[#4A287D]/50 rounded-xl p-8 border border-[#7B68EE]/30 mb-8">
                <div className="flex items-center mb-6">
                  <div className="p-2 bg-[#7B68EE]/30 rounded-full mr-3">
                    <Sparkles size={24} className="text-[#FFD700]" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Rüya Yorumu</h2>
                </div>
                
                <div className="bg-black/20 rounded-lg p-6 mb-8">
                  <h3 className="text-lg font-semibold text-[#FFD700] mb-3">Özet</h3>
                  <p className="text-white/90 whitespace-pre-line">{interpretation.summary}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-black/20 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <h3 className="text-lg font-semibold text-[#FFD700]">Semboller</h3>
                    </div>
                    <div className="space-y-4">
                      {interpretation.symbols.map((symbol, index) => (
                        <div key={index} className="border-b border-white/10 last:border-0 pb-3 last:pb-0">
                          <h4 className="font-medium text-white mb-1 flex items-center">
                            <span className="text-2xl mr-2">{symbol.emoji || "✨"}</span>
                            {symbol.name}
                          </h4>
                          <p className="text-white/70 text-sm">{symbol.meaning}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-black/20 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <h3 className="text-lg font-semibold text-[#FFD700]">Duygular</h3>
                    </div>
                    <div className="space-y-4">
                      {interpretation.emotions.map((emotion, index) => (
                        <div key={index} className="mb-4 last:mb-0">
                          <h4 className="font-medium text-white mb-1">{emotion.name}</h4>
                          <p className="text-white/70">{emotion.impact}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="bg-black/20 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <Award size={20} className="text-[#FFD700] mr-3" />
                    <h3 className="text-lg font-semibold text-white">Rehberlik & Tavsiyeler</h3>
                  </div>
                  <p className="text-white/90 whitespace-pre-line">{interpretation.guidance}</p>
                </div>
                
                <div className="mt-8 text-center">
                  <p className="text-white/50 text-sm mb-2">Bu yorum Astrolojikal AI tarafından oluşturulmuştur.</p>
                  <p className="text-white/50 text-xs">Yorumlar tamamen bilgilendirme amaçlıdır ve profesyonel tavsiye yerine geçmez.</p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
} 