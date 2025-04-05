'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Star, Share2, Download } from 'lucide-react'
import useSupabase from '@/hooks/useSupabase'

export default function KatinaDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { user, loading: userLoading } = useSupabase()
  
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [katinaReading, setKatinaReading] = useState<any>(null)
  const [selectedCards, setSelectedCards] = useState<any[]>([])
  
  useEffect(() => {
    // Kullanıcı giriş yapmamışsa giriş sayfasına yönlendir
    if (!userLoading && !user) {
      router.push('/auth/giris')
    }
  }, [user, userLoading, router])
  
  useEffect(() => {
    if (user && params.id) {
      loadKatinaReading()
    }
  }, [user, params.id])
  
  const loadKatinaReading = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const { supabase } = await import('@/lib/supabase/client')
      
      // Katina falı verisini yükle
      let { data, error } = await supabase
        .from('katina_card_readings')
        .select('*')
        .eq('id', params.id)
        .eq('user_id', user?.id)
        .single()
      
      // Eğer kayıt bulunamazsa hata göster
      if (error) {
        console.error('Katina falı bulunamadı:', error)
        setError('Katina falı bulunamadı veya görüntüleme yetkiniz yok.')
        return
      }
      
      // Veriyi state'e yükle
      setKatinaReading(data.interpretation)
      setSelectedCards(data.selected_cards)
      
    } catch (err) {
      console.error('Katina falı yüklenirken hata:', err)
      setError('Katina falı yüklenirken bir hata oluştu.')
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
  
  if (!katinaReading) {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Katina Falı Bulunamadı</h2>
            <p className="text-white/70 mb-6">
              İstediğiniz katina falı bulunamadı veya bu fala erişim yetkiniz yok.
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
                <h1 className="text-2xl font-bold text-white">Katina Falı Detayı</h1>
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
          
          {/* Katina Falı İçeriği */}
          <div className="bg-gradient-to-br from-[#2A1C5A]/50 to-[#4A287D]/50 rounded-xl p-8 border border-[#7B68EE]/30 mb-8">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="flex items-center mb-8">
                <div className="p-2 bg-[#7B68EE]/30 rounded-full mr-3">
                  <Star size={24} className="text-[#FFD700]" />
                </div>
                <h2 className="text-2xl font-bold text-white">Katina Falı Yorumunuz</h2>
              </div>
              
              {/* Genel Yorum */}
              <motion.div variants={itemVariants} className="bg-black/20 rounded-lg p-6 mb-8">
                <div className="flex items-center mb-4">
                  <h3 className="text-lg font-semibold text-[#FFD700]">Genel Yorum</h3>
                </div>
                <div className="text-white/90 prose prose-invert max-w-none">
                  <p>{katinaReading.summary}</p>
                </div>
              </motion.div>
              
              {/* Kartların yorumları */}
              <motion.div variants={itemVariants} className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">Kart Yorumları</h3>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  {katinaReading.cards.map((card: any, index: number) => (
                    <div key={index} className="bg-black/20 rounded-lg p-5">
                      <div className="flex items-start gap-4">
                        <div className="shrink-0">
                          <div className="relative">
                            <Image
                              src={selectedCards[index].image}
                              alt={card.name}
                              width={80}
                              height={120}
                              className={`rounded-lg ${selectedCards[index].reversed ? 'transform rotate-180' : ''}`}
                            />
                            {selectedCards[index].reversed && (
                              <div className="absolute bottom-0 right-0 bg-red-500/80 px-1.5 py-0.5 text-white text-xs rounded-tl-lg rounded-br-lg">
                                Ters
                              </div>
                            )}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-[#FFD700] font-medium">{card.position}</h4>
                          <div className="text-white font-semibold">{card.name}</div>
                          <p className="text-white/80 mt-2">{card.interpretation}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
              
              {/* Gelecek ve Tavsiyeler */}
              <motion.div variants={itemVariants} className="mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-black/20 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-[#FFD700] mb-3">Geleceğiniz</h3>
                    <p className="text-white/80 whitespace-pre-line">{katinaReading.future}</p>
                  </div>
                  
                  <div className="bg-black/20 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-[#FFD700] mb-3">Tavsiyeler</h3>
                    <div className="text-white/80 whitespace-pre-line">{katinaReading.advice}</div>
                  </div>
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
              onClick={() => router.push('/katina-fali/fal-bak')}
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