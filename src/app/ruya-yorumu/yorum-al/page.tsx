'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Book, ArrowRight, Sparkles, AlertCircle, Check } from 'lucide-react'
import useSupabase from '@/hooks/useSupabase'

export default function GetDreamInterpretationPage() {
  const router = useRouter()
  const { user, loading: userLoading } = useSupabase()
  
  const [dreamDescription, setDreamDescription] = useState('')
  const [emotions, setEmotions] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [step, setStep] = useState(1)
  
  // Yerel depolamadan kaydedilmiş rüya bilgilerini kontrol et
  useEffect(() => {
    if (user) {
      const savedDream = localStorage.getItem('pendingDreamInterpretation')
      if (savedDream) {
        try {
          const parsedDream = JSON.parse(savedDream)
          if (parsedDream.dreamDescription) {
            setDreamDescription(parsedDream.dreamDescription)
          }
          if (parsedDream.emotions) {
            setEmotions(parsedDream.emotions)
          }
          // Kayıtlı verileri temizle
          localStorage.removeItem('pendingDreamInterpretation')
          // Adım 3'e geç (özet)
          setStep(3)
        } catch (err) {
          console.error('Kaydedilmiş rüya bilgileri okunamadı:', err)
        }
      }
    }
  }, [user])

  const emotionOptions = [
    'Mutluluk', 'Korku', 'Endişe', 'Heyecan', 
    'Üzüntü', 'Şaşkınlık', 'Huzur', 'Rahatsızlık',
    'Kızgınlık', 'Özlem', 'Merak', 'Karışık'
  ]

  const toggleEmotion = (emotion: string) => {
    if (emotions.includes(emotion)) {
      setEmotions(emotions.filter(e => e !== emotion))
    } else {
      setEmotions([...emotions, emotion])
    }
  }

  // Form gönderme fonksiyonu - Anında yorum ekleme için düzenlendi
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Adım 1 - Rüya detayları
    if (step === 1) {
      if (dreamDescription.trim().length < 50) {
        setError('Lütfen rüyanızı daha detaylı açıklayın (en az 50 karakter)')
        return
      }
      setError(null)
      setStep(2)
      return
    }
    
    // Adım 2 - Duygular
    if (step === 2) {
      if (emotions.length === 0) {
        setError('Lütfen en az bir duygu seçin')
        return
      }
      setError(null)
      setStep(3)
      return
    }
    
    // Adım 3 - Gönderme ve anında yorumlama
    setLoading(true)
    setError(null)
    
    try {      
      // Kullanıcı kontrolü
      if (!user) {
        // Kullanıcı giriş yapmamışsa, bilgileri saklayıp giriş sayfasına yönlendir
        localStorage.setItem('pendingDreamInterpretation', JSON.stringify({
          dreamDescription,
          emotions
        }))
        router.push('/auth/giris?redirect=/ruya-yorumu/yorum-al')
        return
      }
      
      // Supabase API'yi dinamik olarak import et
      const { supabase } = await import('@/lib/supabase/client')
      
      if (!supabase) {
        throw new Error('Veritabanı bağlantısı kurulamadı')
      }
      
      console.log('Rüya yorumu oluşturuluyor...')
      
      // Gemini AI aracılığıyla rüya yorumunu al
      const { interpretDream } = await import('@/lib/ai/gemini')
      const interpretationResult = await interpretDream(dreamDescription, emotions)
      
      // Rüya yorumu verilerini hazırla
      const dreamData = {
        user_id: user.id,
        dream_description: dreamDescription,
        status: 'completed', // Direkt tamamlandı durumuna ayarla
        payment_status: 'completed', // Ödeme durumunu da tamamlandı olarak işaretle
        metadata: { emotions },
        interpretation: JSON.stringify(interpretationResult) // Yorumu direkt ekle
      }
      
      console.log('Rüya verileri gönderiliyor:', {
        ...dreamData,
        dream_description: dreamDescription.substring(0, 20) + '...' // Konsola tüm içeriği yazdırmamak için kısalt
      })
      
      // Rüya yorumunu veritabanına ekle
      const { data, error: insertError } = await supabase
        .from('dream_interpretations')
        .insert([dreamData])
        .select()
      
      // Hata kontrolü
      if (insertError) {
        console.error('Veritabanı ekleme hatası:', insertError)
        throw new Error(`Veritabanı hatası: ${insertError.message}`)
      }
      
      // Başarı durumu
      setSuccess(true)
      
      // Yönlendirme
      setTimeout(() => {
        if (data && data[0]) {
          // Rüya detay sayfasına yönlendir
          router.push(`/hesabim/ruya/${data[0].id}`)
        } else {
          // Ana sayfaya yönlendir
          router.push('/hesabim')
        }
      }, 2000)
      
    } catch (err) {
      // Hata yönetimi
      console.error('Rüya yorumu gönderme hatası:', err)
      
      // Hata mesajını kullanıcıya göster
      if (err instanceof Error) {
        setError(`İşlem sırasında bir hata oluştu: ${err.message}`)
      } else {
        setError('Bilinmeyen bir hata oluştu. Lütfen daha sonra tekrar deneyin.')
      }
    } finally {
      setLoading(false)
    }
  }
  
  // UI bileşenleri için animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1 
      }
    },
    exit: { opacity: 0 }
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          className="rounded-xl overflow-hidden bg-black/30 backdrop-blur-md border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="p-8">
            <div className="flex items-center mb-8">
              <div className="p-3 rounded-full bg-gradient-to-br from-[#2A1C5A] to-[#4A287D] mr-4">
                <Book size={28} className="text-[#FFD700]" />
              </div>
              <h1 className="text-3xl font-bold text-[#FFD700]">Rüya Yorumu Al</h1>
            </div>

            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                  <Check size={40} className="text-green-500" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">Rüya Yorumunuz Hazır!</h2>
                <p className="text-white/70 mb-8 max-w-md mx-auto">
                  Rüyanız yapay zeka tarafından başarıyla yorumlandı! 
                  Hesabınızdan detaylı yorumu görüntüleyebilirsiniz.
                </p>
                <Button 
                  variant="gradient" 
                  size="lg"
                  onClick={() => router.push('/hesabim')}
                  className="group"
                >
                  <span>Yorumu Görüntüle</span>
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-8">
                  <div className="relative mb-6">
                    <div className="flex justify-between mb-2">
                      <div className="flex space-x-2">
                        {[1, 2, 3].map((num) => (
                          <div
                            key={num}
                            className={`w-3 h-3 rounded-full ${
                              step >= num ? 'bg-[#FFD700]' : 'bg-white/20'
                            }`}
                          ></div>
                        ))}
                      </div>
                      <span className="text-sm text-white/60">Adım {step}/3</span>
                    </div>
                    <div className="w-full bg-white/10 h-1 rounded-full">
                      <motion.div
                        className="h-full bg-gradient-to-r from-[#4A287D] to-[#7B68EE] rounded-full"
                        initial={{ width: '0%' }}
                        animate={{ width: `${(step / 3) * 100}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-500/20 border border-red-500/50 text-white p-4 rounded-md mb-6 flex items-start"
                    >
                      <AlertCircle className="shrink-0 w-5 h-5 mr-3 mt-0.5 text-red-400" />
                      <p>{error}</p>
                    </motion.div>
                  )}

                  {step === 1 && (
                    <motion.div
                      key="step1"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <motion.h2 
                        variants={itemVariants}
                        className="text-xl font-semibold text-white mb-2"
                      >
                        Rüyanızı Detaylı Olarak Anlatın
                      </motion.h2>
                      <motion.p 
                        variants={itemVariants}
                        className="text-white/70 mb-6"
                      >
                        Lütfen gördüğünüz rüyayı tüm detaylarıyla, karakterleriyle ve olaylarıyla anlatın. 
                        Ne kadar detay verirseniz, o kadar doğru yorum alabileceğinizi unutmayın.
                      </motion.p>
                      
                      <motion.div variants={itemVariants}>
                        <textarea
                          value={dreamDescription}
                          onChange={(e) => setDreamDescription(e.target.value)}
                          className="w-full h-60 bg-black/30 border border-white/10 rounded-md focus:border-[#FFD700]/50 focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20 p-4 text-white resize-none"
                          placeholder="Rüyanızı detaylı olarak anlatın..."
                        ></textarea>
                        <div className="flex justify-between text-sm mt-2">
                          <span className="text-white/50">En az 50 karakter</span>
                          <span className={`${dreamDescription.length < 50 ? 'text-red-400' : 'text-green-400'}`}>
                            {dreamDescription.length} karakter
                          </span>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        variants={itemVariants}
                        className="mt-6 flex justify-end"
                      >
                        <Button
                          type="submit"
                          variant="gradient"
                          size="lg"
                          className="group"
                        >
                          <span>Devam Et</span>
                          <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                        </Button>
                      </motion.div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <motion.h2 
                        variants={itemVariants}
                        className="text-xl font-semibold text-white mb-2"
                      >
                        Rüyada Hissettiğiniz Duygular
                      </motion.h2>
                      <motion.p 
                        variants={itemVariants}
                        className="text-white/70 mb-6"
                      >
                        Rüyanızda hangi duyguları hissettiniz? Birden fazla seçebilirsiniz.
                      </motion.p>
                      
                      <motion.div 
                        variants={itemVariants}
                        className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6"
                      >
                        {emotionOptions.map((emotion) => (
                          <button
                            key={emotion}
                            type="button"
                            onClick={() => toggleEmotion(emotion)}
                            className={`py-3 px-4 rounded-md transition text-left ${
                              emotions.includes(emotion)
                                ? 'bg-[#4A287D] border border-[#7B68EE] text-white'
                                : 'bg-black/30 border border-white/10 text-white/70 hover:bg-black/40'
                            }`}
                          >
                            <div className="flex items-center">
                              <div className={`w-4 h-4 rounded-full mr-2 flex items-center justify-center ${
                                emotions.includes(emotion) ? 'bg-[#FFD700]' : 'bg-white/20'
                              }`}>
                                {emotions.includes(emotion) && (
                                  <Check size={12} className="text-[#2A1C5A]" />
                                )}
                              </div>
                              {emotion}
                            </div>
                          </button>
                        ))}
                      </motion.div>

                      <motion.div 
                        variants={itemVariants}
                        className="flex justify-between"
                      >
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setStep(1)}
                          className="border-white/20 text-white hover:bg-white/5"
                        >
                          Geri
                        </Button>
                        <Button
                          type="submit"
                          variant="gradient"
                          size="lg"
                          className="group"
                        >
                          <span>Devam Et</span>
                          <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                        </Button>
                      </motion.div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <motion.h2 
                        variants={itemVariants}
                        className="text-xl font-semibold text-white mb-2"
                      >
                        Rüya Yorumu Özeti
                      </motion.h2>
                      <motion.p 
                        variants={itemVariants}
                        className="text-white/70 mb-6"
                      >
                        Aşağıdaki bilgileri kontrol edin ve onaylayın.
                      </motion.p>
                      
                      <motion.div 
                        variants={itemVariants}
                        className="bg-black/20 rounded-lg p-5 border border-white/10 mb-6"
                      >
                        <h3 className="font-medium text-white mb-2">Rüya Detayı</h3>
                        <p className="text-white/70 text-sm mb-4">{dreamDescription}</p>
                        
                        <h3 className="font-medium text-white mb-2">Hissedilen Duygular</h3>
                        <div className="flex flex-wrap gap-2">
                          {emotions.map((emotion) => (
                            <span 
                              key={emotion}
                              className="bg-[#2A1C5A] text-xs text-white py-1 px-3 rounded-full"
                            >
                              {emotion}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        variants={itemVariants}
                        className="bg-[#2A1C5A]/30 rounded-lg p-5 border border-[#7B68EE]/30 mb-6"
                      >
                        <div className="flex items-start">
                          <Sparkles className="shrink-0 w-5 h-5 mr-3 mt-0.5 text-[#FFD700]" />
                          <div>
                            <h3 className="font-medium text-white mb-1">Nasıl İlerleyecek?</h3>
                            <p className="text-white/70 text-sm">
                              Yorumunuz yapay zeka tarafından anında analiz edilecek ve 
                              size özel yorumunuz hemen hazırlanacaktır. Yorumu gönderdikten sonra
                              detaylı yorumunuzu hemen görüntüleyebileceksiniz.
                            </p>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div 
                        variants={itemVariants}
                        className="flex justify-between"
                      >
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setStep(2)}
                          className="border-white/20 text-white hover:bg-white/5"
                        >
                          Geri
                        </Button>
                        <Button
                          type="submit"
                          variant="gradient"
                          size="lg"
                          disabled={loading}
                          className="group"
                        >
                          {loading ? (
                            <span className="flex items-center">
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              İşlem Yapılıyor...
                            </span>
                          ) : (
                            <>
                              <span>Yorumu Gönder</span>
                              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                            </>
                          )}
                        </Button>
                      </motion.div>
                    </motion.div>
                  )}
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
} 