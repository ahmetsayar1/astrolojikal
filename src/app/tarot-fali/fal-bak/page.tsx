'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Sparkles, ArrowLeft, ArrowRight, CheckCircle, AlertCircle, Shuffle, Calendar } from 'lucide-react'
import useSupabase from '@/hooks/useSupabase'
import { getAllTarotCards, shuffleCards } from '@/lib/tarot-cards'
import { TarotCard, TarotReadingResponse } from '@/lib/ai/tarot'

export default function TarotReadingPage() {
  const router = useRouter()
  const { user, loading: userLoading } = useSupabase()
  
  const [step, setStep] = useState(1)
  
  // Kartlarla ilgili state
  const [allCards, setAllCards] = useState<TarotCard[]>([])
  const [selectedCards, setSelectedCards] = useState<TarotCard[]>([])
  const [currentSelectionPosition, setCurrentSelectionPosition] = useState<string>("Geçmiş")
  
  // Form verileri
  const [birthDate, setBirthDate] = useState('')
  const [question, setQuestion] = useState('')
  
  // UI state
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<TarotReadingResponse | null>(null)
  
  // Kartları yükle ve karıştır
  useEffect(() => {
    const cards = getAllTarotCards()
    setAllCards(shuffleCards(cards))
  }, [])
  
  // Kart seçim pozisyonu kontrolü
  useEffect(() => {
    if (selectedCards.length === 0) {
      setCurrentSelectionPosition("Geçmiş")
    } else if (selectedCards.length === 1) {
      setCurrentSelectionPosition("Şimdiki Zaman")
    } else if (selectedCards.length === 2) {
      setCurrentSelectionPosition("Gelecek")
    }
  }, [selectedCards])
  
  const handleShuffleCards = () => {
    setAllCards(shuffleCards([...allCards]))
  }
  
  const handleSelectCard = (card: TarotCard) => {
    if (selectedCards.length >= 3) return
    
    // Eğer kart zaten seçilmişse, engelle
    if (selectedCards.some(c => c.name === card.name && c.suit === card.suit)) return
    
    setSelectedCards([...selectedCards, card])
  }
  
  const handleRemoveCard = (index: number) => {
    setSelectedCards(selectedCards.filter((_, i) => i !== index))
  }
  
  const handleResetCards = () => {
    setSelectedCards([])
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Adım 1 - Kart seçimi
    if (step === 1) {
      if (selectedCards.length < 3) {
        setError("Lütfen 3 kart seçin")
        return
      }
      setError(null)
      setStep(2)
      return
    }
    
    // Adım 2 - Form bilgileri
    if (step === 2) {
      if (!birthDate) {
        setError("Lütfen doğum tarihinizi girin")
        return
      }
      if (!question) {
        setError("Lütfen bir soru sorun")
        return
      }
      
      // Kullanıcı giriş yapmış mı kontrol et
      if (!user) {
        router.push('/auth/giris?redirect=/tarot-fali/fal-bak')
        return
      }
      
      setError(null)
      setLoading(true)
      
      try {
        // Tarot yorumu al
        const { interpretTarotReading } = await import('@/lib/ai/tarot')
        const tarotReading = await interpretTarotReading(selectedCards, birthDate, question)
        
        // Veritabanına kaydet
        const { supabase } = await import('@/lib/supabase/client')
        
        // Tarot kartları için formatlama
        const selectedCardsData = selectedCards.map(card => ({
          name: card.name,
          suit: card.suit || null,
          image: card.image
        }))
        
        const readingData = {
          user_id: user.id,
          birth_date: birthDate,
          question: question,
          selected_cards: selectedCardsData,
          interpretation: tarotReading,
        }
        
        const { error: insertError } = await supabase
          .from('tarot_card_readings')
          .insert([readingData])
        
        if (insertError) {
          console.error('Tarot yorumu kaydedilemedi:', insertError)
          
          // Kayıt başarısız olduysa loglama yap ama devam et
          // Hatayı UI'da gösterme, yorum hala gösterilecek
          console.log('Kayıt hatası detayı:', insertError)
        }
        
        // Sonucu ayarla ve adım 3'e geç
        setResult(tarotReading)
        setStep(3)
      } catch (err) {
        console.error('Tarot yorumu alınırken hata:', err)
        setError('Tarot yorumu alınırken bir hata oluştu. Lütfen daha sonra tekrar deneyin.')
      } finally {
        setLoading(false)
      }
    }
  }
  
  // Tanım fonksiyonları
  const cardPositionName = (index: number) => {
    switch(index) {
      case 0: return "Geçmiş";
      case 1: return "Şimdiki Zaman";
      case 2: return "Gelecek";
      default: return "";
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
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Üst Panel - Başlık ve Adımlar */}
          <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-6 mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center">
                <Button 
                  variant="outline" 
                  className="text-white border-white/20 hover:bg-white/10 mr-4"
                  onClick={() => router.push('/tarot-fali')}
                >
                  <ArrowLeft size={16} className="mr-2" />
                  Geri Dön
                </Button>
                <h1 className="text-2xl font-bold text-white">Tarot Falı</h1>
              </div>
              
              <div className="relative w-full md:w-auto">
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
                <div className="w-full md:w-60 bg-white/10 h-1 rounded-full">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#4A287D] to-[#7B68EE] rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: `${(step / 3) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Hata Mesajı */}
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
          
          <form onSubmit={handleSubmit}>
            {/* Adım 1: Kart Seçimi */}
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-6"
                >
                  <motion.div variants={itemVariants} className="mb-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold text-white">Tarot Kartlarınızı Seçin</h2>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleShuffleCards}
                        className="text-white border-white/20 hover:bg-white/10"
                      >
                        <Shuffle size={16} className="mr-2" />
                        Desteyi Karıştır
                      </Button>
                    </div>
                    <p className="text-white/70 mt-2">
                      {selectedCards.length < 3 
                        ? `Lütfen ${currentSelectionPosition} için bir kart seçin (${selectedCards.length + 1}/3)`
                        : "Tüm kartları seçtiniz. İsterseniz seçiminizi değiştirebilir veya devam edebilirsiniz."}
                    </p>
                  </motion.div>
                  
                  {/* Seçilen Kartlar */}
                  <motion.div variants={itemVariants} className="mb-8">
                    <h3 className="text-lg font-medium text-white mb-4">Seçilen Kartlar</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      {[0, 1, 2].map((index) => (
                        <div key={index} className="flex flex-col items-center">
                          <div className="mb-2 text-white/70">{cardPositionName(index)}</div>
                          {selectedCards[index] ? (
                            <div className="relative">
                              <Image
                                src={selectedCards[index].image}
                                alt={selectedCards[index].name}
                                width={180}
                                height={300}
                                className="rounded-lg"
                              />
                              <Button
                                type="button"
                                size="sm"
                                variant="destructive"
                                className="absolute -top-2 -right-2 w-6 h-6 p-0 rounded-full"
                                onClick={() => handleRemoveCard(index)}
                              >
                                ✕
                              </Button>
                              <div className="mt-2 text-center text-white text-sm">
                                {selectedCards[index].name}
                                {selectedCards[index].suit && <div className="text-white/60">{selectedCards[index].suit}</div>}
                              </div>
                            </div>
                          ) : (
                            <div className="w-[120px] h-[180px] sm:w-[180px] sm:h-[300px] bg-black/40 border border-white/10 rounded-lg flex items-center justify-center">
                              <span className="text-white/40">Kart Seçilmedi</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                  
                  {/* Tüm Kartlar */}
                  <motion.div variants={itemVariants} className="mb-6">
                    <h3 className="text-lg font-medium text-white mb-4">Tarot Destesi</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                      {allCards.slice(0, 72).map((card, index) => (
                        <div
                          key={index}
                          className={`relative cursor-pointer transition-transform ${
                            selectedCards.some(c => c.name === card.name && c.suit === card.suit)
                              ? 'opacity-40 pointer-events-none'
                              : 'hover:scale-105'
                          }`}
                          onClick={() => handleSelectCard(card)}
                        >
                          <Image
                            src="/images/tarot/tarot-karti-arkasi.png"
                            alt="Tarot Card Back"
                            width={120}
                            height={180}
                            className="rounded-lg"
                          />
                        </div>
                      ))}
                    </div>
                  </motion.div>
                  
                  {/* Butonlar */}
                  <motion.div variants={itemVariants} className="flex justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleResetCards}
                      className="border-white/20 text-white hover:bg-white/10"
                      disabled={selectedCards.length === 0}
                    >
                      Seçimleri Sıfırla
                    </Button>
                    <Button
                      type="submit"
                      variant="gradient"
                      disabled={selectedCards.length < 3}
                      className="group"
                    >
                      <span>Devam Et</span>
                      <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                    </Button>
                  </motion.div>
                </motion.div>
              )}
              
              {/* Adım 2: Bilgi Formu */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-6"
                >
                  <motion.div variants={itemVariants} className="mb-6">
                    <h2 className="text-xl font-semibold text-white mb-2">Bilgilerinizi Girin</h2>
                    <p className="text-white/70">
                      Tarot yorumunuzu kişiselleştirmek için aşağıdaki bilgileri girin.
                    </p>
                  </motion.div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    {/* Seçilen Kartlar Özeti */}
                    <motion.div variants={itemVariants}>
                      <h3 className="text-lg font-medium text-white mb-4">Seçilen Kartlar</h3>
                      <div className="grid grid-cols-3 gap-3">
                        {selectedCards.map((card, index) => (
                          <div key={index} className="flex flex-col items-center">
                            <div className="mb-1 text-sm text-white/70">{cardPositionName(index)}</div>
                            <Image
                              src={card.image}
                              alt={card.name}
                              width={120}
                              height={200}
                              className="rounded-lg"
                            />
                            <div className="mt-2 text-center text-white text-xs">
                              {card.name}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                    
                    {/* Form Alanları */}
                    <motion.div variants={itemVariants}>
                      <div className="space-y-6">
                        <div>
                          <label htmlFor="birthDate" className="block text-white font-medium mb-2">
                            Doğum Tarihi
                          </label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" size={16} />
                            <Input
                              id="birthDate"
                              type="date"
                              value={birthDate}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBirthDate(e.target.value)}
                              className="pl-10 bg-black/30 border-white/10 text-white"
                            />
                          </div>
                          <p className="mt-1 text-white/50 text-xs">
                            Doğum tarihiniz burcunuzu belirlememizi sağlar.
                          </p>
                        </div>
                        
                        <div>
                          <label htmlFor="question" className="block text-white font-medium mb-2">
                            Sorunuz
                          </label>
                          <Textarea
                            id="question"
                            value={question}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setQuestion(e.target.value)}
                            placeholder="Tarot falında cevap aradığınız soruyu yazın..."
                            className="bg-black/30 border-white/10 text-white h-32"
                          />
                          <p className="mt-1 text-white/50 text-xs">
                            Belirli ve net bir soru, daha doğru bir yorum almanızı sağlar.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Butonlar */}
                  <motion.div variants={itemVariants} className="flex justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(1)}
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      Geri
                    </Button>
                    <Button
                      type="submit"
                      variant="gradient"
                      disabled={loading}
                      className="group"
                    >
                      {loading ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Yorumunuz Hazırlanıyor...
                        </span>
                      ) : (
                        <>
                          <span>Yorumu Göster</span>
                          <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                        </>
                      )}
                    </Button>
                  </motion.div>
                </motion.div>
              )}
              
              {/* Adım 3: Tarot Yorumu */}
              {step === 3 && result && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-gradient-to-br from-[#2A1C5A]/50 to-[#4A287D]/50 rounded-xl p-8 border border-[#7B68EE]/30 mb-8"
                >
                  <div className="flex items-center mb-8">
                    <div className="p-2 bg-[#7B68EE]/30 rounded-full mr-3">
                      <Sparkles size={24} className="text-[#FFD700]" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Tarot Falı Yorumunuz</h2>
                  </div>
                  
                  {/* Özet */}
                  <div className="bg-black/20 rounded-lg p-6 mb-8">
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-semibold text-[#FFD700]">Özet</h3>
                    </div>
                    <p className="text-white/90 text-lg">{result.summary}</p>
                  </div>
                  
                  {/* Kartlar */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {result.cards.map((card, index) => (
                      <div key={index} className="bg-black/20 rounded-lg p-6">
                        <div className="flex flex-col items-center mb-4">
                          <Image
                            src={selectedCards[index].image}
                            alt={card.name}
                            width={150}
                            height={250}
                            className="rounded-lg mb-3"
                          />
                          <div className="text-center">
                            <h4 className="text-[#FFD700] font-medium">{card.position}</h4>
                            <div className="text-white font-semibold">{card.name}</div>
                            {selectedCards[index].suit && (
                              <div className="text-white/60 text-sm">{selectedCards[index].suit}</div>
                            )}
                          </div>
                        </div>
                        <p className="text-white/80">{card.interpretation}</p>
                      </div>
                    ))}
                  </div>
                  
                  {/* İlişki ve Gelecek */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="bg-black/20 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-[#FFD700] mb-3">Kartların İlişkisi</h3>
                      <p className="text-white/80 whitespace-pre-line">{result.relationship}</p>
                    </div>
                    
                    <div className="bg-black/20 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-[#FFD700] mb-3">Gelecek Öngörüsü</h3>
                      <p className="text-white/80 whitespace-pre-line">{result.future}</p>
                    </div>
                  </div>
                  
                  {/* Tavsiyeler ve Burç Etkisi */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="bg-black/20 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-[#FFD700] mb-3">Tavsiyeler</h3>
                      <div className="text-white/80 whitespace-pre-line">{result.advice}</div>
                    </div>
                    
                    <div className="bg-black/20 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-[#FFD700] mb-3">Burç Etkisi</h3>
                      <p className="text-white/80 whitespace-pre-line">{result.zodiacInfluence}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedCards([])
                        setStep(1)
                        setResult(null)
                      }}
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      Yeni Fal Bak
                    </Button>
                    
                    <div className="text-center text-white/50 text-sm">
                      <p>Bu yorum yapay zeka tarafından oluşturulmuştur.</p>
                      <p className="text-xs">Yorumlar tamamen eğlence amaçlıdır ve profesyonel tavsiye yerine geçmez.</p>
                    </div>
                    
                    <Button
                      variant="gradient"
                      onClick={() => router.push('/hesabim')}
                    >
                      Hesabıma Git
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      </div>
    </div>
  )
} 