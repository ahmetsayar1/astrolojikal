'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Sparkles, Share2, Download } from 'lucide-react'
import useSupabase from '@/hooks/useSupabase'

export default function TarotDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { user, loading: userLoading } = useSupabase()
  
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [tarotReading, setTarotReading] = useState<any>(null)
  const [selectedCards, setSelectedCards] = useState<any[]>([])
  
  useEffect(() => {
    // Kullanıcı giriş yapmamışsa giriş sayfasına yönlendir
    if (!userLoading && !user) {
      router.push('/auth/giris')
    }
  }, [user, userLoading, router])
  
  useEffect(() => {
    if (user && params.id) {
      loadTarotReading()
    }
  }, [user, params.id])
  
  const loadTarotReading = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const { supabase } = await import('@/lib/supabase/client')
      
      // Yeni tablo adını kullan
      let { data, error } = await supabase
        .from('tarot_card_readings')
        .select('*')
        .eq('id', params.id)
        .eq('user_id', user?.id)
        .single()
      
      // Eğer kayıt bulunamazsa hata göster
      if (error) {
        console.error('Tarot falı bulunamadı:', error)
        setError('Tarot falı bulunamadı veya görüntüleme yetkiniz yok.')
        return
      }
      
      // tarot_card_readings tablosundan veri geldi
      setTarotReading(data.interpretation)
      setSelectedCards(data.selected_cards)
      
    } catch (err) {
      console.error('Tarot falı yüklenirken hata:', err)
      setError('Tarot falı yüklenirken bir hata oluştu.')
    } finally {
      setLoading(false)
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
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1 
      }
    }
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }
  
  if (userLoading || loading) {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-24 w-24 bg-white/30 rounded-full mb-8"></div>
          <div className="h-6 w-48 bg-white/30 rounded mb-4"></div>
          <div className="h-4 w-64 bg-white/30 rounded"></div>
        </div>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-red-500/20 border border-red-500/50 text-white p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-2">Hata Oluştu</h2>
            <p>{error}</p>
            <Button
              variant="outline"
              className="mt-4 text-white border-white/20 hover:bg-white/10"
              onClick={() => router.push('/hesabim')}
            >
              <ArrowLeft size={16} className="mr-2" />
              Hesabıma Dön
            </Button>
          </div>
        </div>
      </div>
    )
  }
  
  if (!tarotReading) {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Tarot Falı Bulunamadı</h2>
            <p className="text-white/70 mb-6">
              İstediğiniz tarot falı bulunamadı veya bu fala erişim yetkiniz yok.
            </p>
            <Button
              variant="outline"
              className="text-white border-white/20 hover:bg-white/10"
              onClick={() => router.push('/hesabim')}
            >
              <ArrowLeft size={16} className="mr-2" />
              Hesabıma Dön
            </Button>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Üst Panel - Başlık */}
          <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-6 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Button 
                  variant="outline" 
                  className="text-white border-white/20 hover:bg-white/10 mr-4"
                  onClick={() => router.push('/hesabim')}
                >
                  <ArrowLeft size={16} className="mr-2" />
                  Geri Dön
                </Button>
                <h1 className="text-2xl font-bold text-white">Tarot Falı Detayı</h1>
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  variant="outline"
                  className="text-white border-white/20 hover:bg-white/10"
                >
                  <Share2 size={16} className="mr-2" />
                  Paylaş
                </Button>
                <Button 
                  variant="outline"
                  className="text-white border-white/20 hover:bg-white/10"
                >
                  <Download size={16} className="mr-2" />
                  İndir
                </Button>
              </div>
            </div>
          </div>
          
          {/* Tarot Falı İçeriği */}
          <div className="bg-gradient-to-br from-[#2A1C5A]/50 to-[#4A287D]/50 rounded-xl p-8 border border-[#7B68EE]/30 mb-8">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="flex items-center mb-8">
                <div className="p-2 bg-[#7B68EE]/30 rounded-full mr-3">
                  <Sparkles size={24} className="text-[#FFD700]" />
                </div>
                <h2 className="text-2xl font-bold text-white">Tarot Falı Yorumunuz</h2>
              </div>
              
              {/* Özet */}
              <motion.div variants={itemVariants} className="bg-black/20 rounded-lg p-6 mb-8">
                <div className="flex items-center mb-2">
                  <h3 className="text-lg font-semibold text-[#FFD700]">Özet</h3>
                </div>
                <p className="text-white/90 text-lg">{tarotReading.summary}</p>
              </motion.div>
              
              {/* Kartlar */}
              <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {tarotReading.cards.map((card: any, index: number) => (
                  <div key={index} className="bg-black/20 rounded-lg p-6">
                    <div className="flex flex-col items-center mb-4">
                      <Image
                        src={selectedCards[index]?.image || "/images/tarot/tarot-karti-arkasi.png"}
                        alt={card.name}
                        width={150}
                        height={250}
                        className="rounded-lg mb-3"
                      />
                      <div className="text-center">
                        <h4 className="text-[#FFD700] font-medium">{card.position}</h4>
                        <div className="text-white font-semibold">{card.name}</div>
                        {selectedCards[index]?.suit && (
                          <div className="text-white/60 text-sm">{selectedCards[index].suit}</div>
                        )}
                      </div>
                    </div>
                    <p className="text-white/80">{card.interpretation}</p>
                  </div>
                ))}
              </motion.div>
              
              {/* İlişki ve Gelecek */}
              <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-black/20 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-[#FFD700] mb-3">Kartların İlişkisi</h3>
                  <p className="text-white/80 whitespace-pre-line">{tarotReading.relationship}</p>
                </div>
                
                <div className="bg-black/20 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-[#FFD700] mb-3">Gelecek Öngörüsü</h3>
                  <p className="text-white/80 whitespace-pre-line">{tarotReading.future}</p>
                </div>
              </motion.div>
              
              {/* Tavsiyeler ve Burç Etkisi */}
              <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-black/20 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-[#FFD700] mb-3">Tavsiyeler</h3>
                  <div className="text-white/80 whitespace-pre-line">{tarotReading.advice}</div>
                </div>
                
                <div className="bg-black/20 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-[#FFD700] mb-3">Burç Etkisi</h3>
                  <p className="text-white/80 whitespace-pre-line">{tarotReading.zodiacInfluence}</p>
                </div>
              </motion.div>
              
              <div className="text-center text-white/50 text-sm">
                <p>Bu yorum yapay zeka tarafından oluşturulmuştur.</p>
                <p className="text-xs">Yorumlar tamamen eğlence amaçlıdır ve profesyonel tavsiye yerine geçmez.</p>
              </div>
            </motion.div>
          </div>
          
          {/* Alt Butonlar */}
          <div className="flex justify-center space-x-4">
            <Button
              variant="gradient"
              onClick={() => router.push('/tarot-fali/fal-bak')}
            >
              Yeni Fal Bak
            </Button>
            <Button
              variant="outline"
              className="text-white border-white/20 hover:bg-white/10"
              onClick={() => router.push('/hesabim')}
            >
              Hesabıma Dön
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 