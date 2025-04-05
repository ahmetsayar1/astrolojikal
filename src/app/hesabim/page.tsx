'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import useSupabase from '@/hooks/useSupabase'
import { User, Book, Clock, Eye, LogOut, AlertCircle, Settings, Star, Sparkles, User2, Sparkle } from 'lucide-react'
import Link from 'next/link'

type DreamInterpretation = {
  id: string
  user_id: string
  dream_description: string
  status: 'pending' | 'processing' | 'completed'
  payment_status: 'pending' | 'completed'
  created_at: string
  updated_at: string
  interpretation: string | null
  metadata: any | null
}

type TarotReading = {
  id: string
  user_id: string
  birth_date: string
  question: string
  selected_cards: any
  interpretation: any
  created_at: string
}

type KatinaReading = {
  id: string
  user_id: string
  birth_date: string
  question: string
  selected_cards: any
  interpretation: any
  created_at: string
}

export default function UserDashboardPage() {
  const router = useRouter()
  const { user, loading: userLoading, signOut } = useSupabase()
  
  const [activeTab, setActiveTab] = useState('dreams')
  const [dreamInterpretations, setDreamInterpretations] = useState<DreamInterpretation[]>([])
  const [tarotReadings, setTarotReadings] = useState<TarotReading[]>([])
  const [katinaReadings, setKatinaReadings] = useState<KatinaReading[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    // Kullanıcı giriş yapmamışsa giriş sayfasına yönlendir
    if (!userLoading && !user) {
      router.push('/auth/giris')
    }
  }, [user, userLoading, router])
  
  useEffect(() => {
    // Kullanıcı giriş yaptıysa içerikleri yükle
    if (user) {
      if (activeTab === 'dreams') {
        loadDreamInterpretations()
      } else if (activeTab === 'tarot') {
        loadTarotReadings()
      } else if (activeTab === 'katina') {
        loadKatinaReadings()
      }
    }
  }, [user, activeTab])
  
  const loadDreamInterpretations = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const { supabase } = await import('@/lib/supabase/client')
      
      const { data, error } = await supabase
        .from('dream_interpretations')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })
      
      if (error) throw error
      
      setDreamInterpretations(data || [])
    } catch (err) {
      console.error('Rüya yorumları yüklenirken hata:', err)
      setError('Rüya yorumları yüklenirken bir hata oluştu.')
    } finally {
      setLoading(false)
    }
  }

  const loadTarotReadings = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const { supabase } = await import('@/lib/supabase/client')
      
      // Yeni tablo adını kullan
      let { data, error } = await supabase
        .from('tarot_card_readings')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })
      
      // Eğer tablo yoksa veya başka bir hata varsa, readings tablosunu deneyelim
      if (error) {
        console.log('tarot_card_readings tablosundan veri alınamadı, alternatif tablo kontrolü yapılıyor')
        console.error(error)
        
        // Veri olmadığında boş array dön
        setTarotReadings([])
        return
      }
      
      setTarotReadings(data || [])
    } catch (err) {
      console.error('Tarot falları yüklenirken hata:', err)
      setError('Tarot falları yüklenirken bir hata oluştu.')
    } finally {
      setLoading(false)
    }
  }

  const loadKatinaReadings = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const { supabase } = await import('@/lib/supabase/client')
      
      // Katina okumalarını yükle
      let { data, error } = await supabase
        .from('katina_card_readings')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })
      
      // Hata varsa kayıt gösterme
      if (error) {
        console.log('katina_card_readings tablosundan veri alınamadı:', error)
        setKatinaReadings([])
        return
      }
      
      setKatinaReadings(data || [])
    } catch (err) {
      console.error('Katina falları yüklenirken hata:', err)
      setError('Katina falları yüklenirken bir hata oluştu.')
    } finally {
      setLoading(false)
    }
  }
  
  const handleLogout = async () => {
    await signOut()
    router.push('/')
  }
  
  const handleViewDream = async (dreamId: string) => {
    router.push(`/hesabim/ruya/${dreamId}`)
  }

  const handleViewTarot = async (tarotId: string) => {
    router.push(`/hesabim/tarot/${tarotId}`)
  }

  const handleViewKatina = async (katinaId: string) => {
    router.push(`/hesabim/katina/${katinaId}`)
  }
  
  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Bekliyor'
      case 'processing': return 'İşleniyor'
      case 'completed': return 'Tamamlandı'
      default: return status
    }
  }
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500'
      case 'processing': return 'bg-blue-500'
      case 'completed': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('tr-TR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(date)
  }
  
  if (userLoading) {
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

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Üst Panel - Kullanıcı Bilgileri */}
          <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-6 mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
              <div className="flex items-center mb-4 sm:mb-0">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#2A1C5A] to-[#4A287D] flex items-center justify-center mr-4">
                  <User2 size={28} className="text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white mb-1">
                    {user.user_metadata?.name || 'Kullanıcı'}
                  </h1>
                  <p className="text-white/60">{user.email}</p>
                </div>
              </div>
              <div className="flex space-x-3 w-full sm:w-auto">
                <Button 
                  variant="outline" 
                  className="text-white border-white/20 hover:bg-white/10 flex-1 sm:flex-grow-0"
                  onClick={() => router.push('/hesabim/ayarlar')}
                >
                  <Settings size={16} className="mr-2" />
                  Ayarlar
                </Button>
                <Button 
                  variant="destructive" 
                  className="flex-1 sm:flex-grow-0"
                  onClick={handleLogout}
                >
                  <LogOut size={16} className="mr-2" />
                  Çıkış Yap
                </Button>
              </div>
            </div>
          </div>
          
          {/* Ana İçerik */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sol Sidebar - Menü */}
            <div className="md:col-span-1">
              <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-4">
                <nav>
                  <ul className="space-y-1">
                    <li>
                      <button
                        onClick={() => setActiveTab('dreams')}
                        className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${activeTab === 'dreams' ? 'bg-[#2A1C5A]' : 'hover:bg-white/5'}`}
                      >
                        <Book size={18} className={`mr-3 ${activeTab === 'dreams' ? 'text-[#FFD700]' : 'text-white/60'}`} />
                        <span className={activeTab === 'dreams' ? 'text-white' : 'text-white/70'}>Rüya Yorumlarım</span>
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setActiveTab('tarot')}
                        className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${activeTab === 'tarot' ? 'bg-[#2A1C5A]' : 'hover:bg-white/5'}`}
                      >
                        <Sparkle size={18} className={`mr-3 ${activeTab === 'tarot' ? 'text-[#FFD700]' : 'text-white/60'}`} />
                        <span className={activeTab === 'tarot' ? 'text-white' : 'text-white/70'}>Tarot Fallarım</span>
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setActiveTab('katina')}
                        className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${activeTab === 'katina' ? 'bg-[#2A1C5A]' : 'hover:bg-white/5'}`}
                      >
                        <Star size={18} className={`mr-3 ${activeTab === 'katina' ? 'text-[#FFD700]' : 'text-white/60'}`} />
                        <span className={activeTab === 'katina' ? 'text-white' : 'text-white/70'}>Katina Fallarım</span>
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setActiveTab('profile')}
                        className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${activeTab === 'profile' ? 'bg-[#2A1C5A]' : 'hover:bg-white/5'}`}
                      >
                        <User size={18} className={`mr-3 ${activeTab === 'profile' ? 'text-[#FFD700]' : 'text-white/60'}`} />
                        <span className={activeTab === 'profile' ? 'text-white' : 'text-white/70'}>Profilim</span>
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setActiveTab('favorite')}
                        className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${activeTab === 'favorite' ? 'bg-[#2A1C5A]' : 'hover:bg-white/5'}`}
                      >
                        <Star size={18} className={`mr-3 ${activeTab === 'favorite' ? 'text-[#FFD700]' : 'text-white/60'}`} />
                        <span className={activeTab === 'favorite' ? 'text-white' : 'text-white/70'}>Favorilerim</span>
                      </button>
                    </li>
                  </ul>
                </nav>
                
                <div className="mt-8 bg-gradient-to-br from-[#2A1C5A]/50 to-[#4A287D]/50 rounded-lg p-4 border border-[#7B68EE]/30">
                  <div className="flex items-center mb-3">
                    <Sparkles size={16} className="text-[#FFD700] mr-2" />
                    <h3 className="font-medium text-white">Rüya Paketi</h3>
                  </div>
                  <p className="text-sm text-white/70 mb-4">
                    Aylık paketinizde 3 rüya yorumu hakkı kaldı. Daha fazla yorum için paketinizi yükseltin.
                  </p>
                  <Button
                    variant="gradient"
                    size="sm"
                    className="w-full"
                    onClick={() => router.push('/paketler')}
                  >
                    Paketleri İncele
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Sağ İçerik - Seçilen Sekme */}
            <div className="md:col-span-3">
              <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-6">
                {activeTab === 'dreams' && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold text-white">Rüya Yorumlarım</h2>
                      <Button 
                        variant="gradient"
                        onClick={() => router.push('/ruya-yorumu/yorum-al')}
                      >
                        <span>Yeni Rüya Yorumu</span>
                      </Button>
                    </div>
                    
                    {error && (
                      <div className="bg-red-500/20 border border-red-500/50 text-white p-4 rounded-md mb-6 flex items-start">
                        <AlertCircle className="shrink-0 w-5 h-5 mr-3 mt-0.5 text-red-400" />
                        <p>{error}</p>
                      </div>
                    )}
                    
                    {loading ? (
                      <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="animate-pulse bg-white/5 rounded-lg p-4">
                            <div className="h-6 bg-white/10 rounded w-1/3 mb-4"></div>
                            <div className="h-4 bg-white/10 rounded w-full mb-2"></div>
                            <div className="h-4 bg-white/10 rounded w-5/6"></div>
                            <div className="flex justify-between mt-4">
                              <div className="h-8 bg-white/10 rounded w-24"></div>
                              <div className="h-8 bg-white/10 rounded w-24"></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : dreamInterpretations.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#2A1C5A] flex items-center justify-center">
                          <Book size={28} className="text-[#FFD700]" />
                        </div>
                        <h3 className="text-lg font-medium text-white mb-2">Henüz Rüya Yorumu Bulunmuyor</h3>
                        <p className="text-white/60 mb-6 max-w-md mx-auto">
                          Rüyanızı yorumlatmak için yeni bir rüya yorumu talebi oluşturun.
                        </p>
                        <Button 
                          variant="gradient"
                          onClick={() => router.push('/ruya-yorumu/yorum-al')}
                        >
                          <span>Yeni Rüya Yorumu</span>
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {dreamInterpretations.map((dream) => (
                          <motion.div 
                            key={dream.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white/5 rounded-lg p-5 border border-white/10 hover:border-white/20 transition-colors"
                          >
                            <div className="flex justify-between mb-3">
                              <span className="text-white/60 text-sm">{formatDate(dream.created_at)}</span>
                              <div className="flex items-center">
                                <div className={`w-2 h-2 rounded-full ${getStatusColor(dream.status)} mr-2`}></div>
                                <span className="text-white/60 text-sm">{getStatusText(dream.status)}</span>
                              </div>
                            </div>
                            
                            <h3 className="text-lg font-medium text-white mb-2">
                              Rüya Yorumu #{dream.id.substring(0, 8)}
                            </h3>
                            
                            <p className="text-white/70 line-clamp-2 mb-4">
                              {dream.dream_description}
                            </p>
                            
                            <div className="flex justify-between">
                              <div>
                                {dream.payment_status === 'pending' && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-white border-white/20 hover:bg-white/10"
                                  >
                                    Ödeme Yap
                                  </Button>
                                )}
                              </div>
                              
                              <Button
                                variant={dream.status === 'completed' ? 'gradient' : 'outline'} 
                                size="sm"
                                onClick={() => handleViewDream(dream.id)}
                                disabled={dream.status !== 'completed'}
                                className={dream.status !== 'completed' ? "text-white border-white/20 hover:bg-white/10" : ""}
                              >
                                <Eye size={14} className="mr-1" />
                                {dream.status === 'completed' ? 'Yorumu Gör' : 'Hazırlanıyor'}
                              </Button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'tarot' && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold text-white">Tarot Fallarım</h2>
                      <Button 
                        variant="gradient"
                        onClick={() => router.push('/tarot-fali/fal-bak')}
                      >
                        <span>Yeni Tarot Falı</span>
                      </Button>
                    </div>
                    
                    {error && (
                      <div className="bg-red-500/20 border border-red-500/50 text-white p-4 rounded-md mb-6 flex items-start">
                        <AlertCircle className="shrink-0 w-5 h-5 mr-3 mt-0.5 text-red-400" />
                        <p>{error}</p>
                      </div>
                    )}
                    
                    {loading ? (
                      <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="animate-pulse bg-white/5 rounded-lg p-4">
                            <div className="h-6 bg-white/10 rounded w-1/3 mb-4"></div>
                            <div className="h-4 bg-white/10 rounded w-full mb-2"></div>
                            <div className="h-4 bg-white/10 rounded w-5/6"></div>
                            <div className="flex justify-between mt-4">
                              <div className="h-8 bg-white/10 rounded w-24"></div>
                              <div className="h-8 bg-white/10 rounded w-24"></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : tarotReadings.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#2A1C5A] flex items-center justify-center">
                          <Sparkle size={28} className="text-[#FFD700]" />
                        </div>
                        <h3 className="text-lg font-medium text-white mb-2">Henüz Tarot Falı Bulunmuyor</h3>
                        <p className="text-white/60 mb-6 max-w-md mx-auto">
                          Tarot falınızı görmek için yeni bir tarot falı baktırın.
                        </p>
                        <Button 
                          variant="gradient"
                          onClick={() => router.push('/tarot-fali/fal-bak')}
                        >
                          <span>Yeni Tarot Falı</span>
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {tarotReadings.map((tarot) => (
                          <motion.div 
                            key={tarot.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white/5 rounded-lg p-5 border border-white/10 hover:border-white/20 transition-colors"
                          >
                            <div className="flex justify-between mb-3">
                              <span className="text-white/60 text-sm">{formatDate(tarot.created_at)}</span>
                            </div>
                            
                            <h3 className="text-lg font-medium text-white mb-2">
                              Tarot Falı #{tarot.id.substring(0, 8)}
                            </h3>
                            
                            <p className="text-white/70 line-clamp-2 mb-4">
                              {tarot.question || "Genel tarot falı"}
                            </p>
                            
                            <Button
                              variant="gradient" 
                              size="sm"
                              onClick={() => handleViewTarot(tarot.id)}
                              className="ml-auto"
                            >
                              <Eye size={14} className="mr-1" />
                              Yorumu Gör
                            </Button>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'katina' && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold text-white">Katina Fallarım</h2>
                      <Button 
                        variant="gradient"
                        onClick={() => router.push('/katina-fali/fal-bak')}
                      >
                        <span>Yeni Katina Falı</span>
                      </Button>
                    </div>
                    
                    {error && (
                      <div className="bg-red-500/20 border border-red-500/50 text-white p-4 rounded-md mb-6 flex items-start">
                        <AlertCircle className="shrink-0 w-5 h-5 mr-3 mt-0.5 text-red-400" />
                        <p>{error}</p>
                      </div>
                    )}
                    
                    {loading ? (
                      <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="animate-pulse bg-white/5 rounded-lg p-4">
                            <div className="h-6 bg-white/10 rounded w-1/3 mb-4"></div>
                            <div className="h-4 bg-white/10 rounded w-full mb-2"></div>
                            <div className="h-4 bg-white/10 rounded w-5/6"></div>
                            <div className="flex justify-between mt-4">
                              <div className="h-8 bg-white/10 rounded w-24"></div>
                              <div className="h-8 bg-white/10 rounded w-24"></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : katinaReadings.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#2A1C5A] flex items-center justify-center">
                          <Star size={28} className="text-[#FFD700]" />
                        </div>
                        <h3 className="text-lg font-medium text-white mb-2">Henüz Katina Falı Bulunmuyor</h3>
                        <p className="text-white/60 mb-6 max-w-md mx-auto">
                          Katina falınızı görmek için yeni bir fal baktırın.
                        </p>
                        <Button 
                          variant="gradient"
                          onClick={() => router.push('/katina-fali/fal-bak')}
                        >
                          <span>Yeni Katina Falı</span>
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {katinaReadings.map((katina) => (
                          <motion.div 
                            key={katina.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white/5 rounded-lg p-5 border border-white/10 hover:border-white/20 transition-colors"
                          >
                            <div className="flex justify-between mb-3">
                              <span className="text-white/60 text-sm">{formatDate(katina.created_at)}</span>
                            </div>
                            
                            <h3 className="text-lg font-medium text-white mb-2">
                              Katina Falı #{katina.id.substring(0, 8)}
                            </h3>
                            
                            <p className="text-white/70 line-clamp-2 mb-4">
                              {katina.question || "Genel katina falı"}
                            </p>
                            
                            <Button
                              variant="gradient" 
                              size="sm"
                              onClick={() => handleViewKatina(katina.id)}
                              className="ml-auto"
                            >
                              <Eye size={14} className="mr-1" />
                              Yorumu Gör
                            </Button>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                
                {activeTab === 'profile' && (
                  <div>
                    <h2 className="text-xl font-bold text-white mb-6">Profilim</h2>
                    <p className="text-white/70">Bu alan yakında aktif olacaktır.</p>
                  </div>
                )}
                
                {activeTab === 'favorite' && (
                  <div>
                    <h2 className="text-xl font-bold text-white mb-6">Favorilerim</h2>
                    <p className="text-white/70">Bu alan yakında aktif olacaktır.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 