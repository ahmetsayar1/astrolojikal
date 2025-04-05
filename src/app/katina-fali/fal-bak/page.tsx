'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, AlertCircle, Shuffle, Eye, Sparkle } from 'lucide-react'
import useSupabase from '@/hooks/useSupabase'

type KatinaCard = {
  name: string
  image: string
  reversed?: boolean
}

export default function KatinaReadingPage() {
  const router = useRouter()
  const { user, loading: userLoading } = useSupabase()
  
  const [step, setStep] = useState(1)
  const [selectedCards, setSelectedCards] = useState<KatinaCard[]>([])
  const [availableCards, setAvailableCards] = useState<KatinaCard[]>([])
  const [birthDate, setBirthDate] = useState('')
  const [question, setQuestion] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<any>(null)
  
  // Kart konumlarının adları
  const cardPositions = [
    "Hayat Kartı",
    "Artı Kartı",
    "Risk Kartı",
    "Geçmiş Kartı",
    "Taç Kartı",
    "Gelecek Kartı",
    "Durum Kartı",
    "Evrenin Kartı",
    "İstek ve Beklentilerin Kartı",
    "Sonuç Kartı"
  ]
  
  // Katina kartlarını yükle
  useEffect(() => {
    const loadKatinaCards = async () => {
      try {
        // Klasörden tüm kart isimlerini al
        const cardImages = [
          "Agac.png", "Afyon.png", "Alyans.png", "Anahtar.png", "Ariman.jpg",
          "Assyranta.jpg", "Atart.png", "Abonoz.jpg", "Aral.jpg", "Adhamdeva.jpg",
          "Bahceler.png", "Balik.jpg", "Baykus.png", "Bedes.jpg", "Bulutlar.png",
          "Capa.png", "Cicekler.jpg", "Dastar.jpg", "Dag.png", "Dare.jpg",
          "Dervis.png", "Deve.png", "Elmas.jpg", "Eprahhat.jpg", "Ev.png",
          "Gamhat.jpg", "Gunes.png", "Hac.png", "Hesse.jpg", "İsfahan.jpg",
          "Kalif.jpg", "Kalp.png", "Kale.png", "Kapi.png", "Kareler.png",
          "Kiz_Cocugu.png", "Kitap.png", "Kopek.png", "Mektup.png", "Mezar.png",
          "Mida.jpg", "Munzur.jpg", "Nil_NEHRi.png", "Parsadra.jpg", "Saah.jpg",
          "Samyeli.png", "Selana.jpg", "Selçukassa.jpg", "Sunit.jpg", "Supurge.png",
          "Tagral.jpg", "Tattaret.jpg", "Tilki.png", "Turan.jpg", "Urmia.jpg",
          "Valide.png", "Yakut.jpg", "Yatagan.png", "Yelkenli.png", "Yildizlar.png", 
          "Yilan.png", "Yol.png", "Zara.jpg", "Zümrüt.jpg"
        ]
        
        // Kart objelerini oluştur
        const cards: KatinaCard[] = cardImages.map(filename => {
          const name = filename.replace(/\.(png|jpg)$/, '')
          return {
            name,
            image: `/images/katina/${filename}`
          }
        })
        
        setAvailableCards(cards)
      } catch (err) {
        console.error('Kartlar yüklenirken hata:', err)
        setError('Kartlar yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin.')
      }
    }
    
    loadKatinaCards()
  }, [])
  
  const handleShuffleCards = () => {
    // Kartları karıştır
    setAvailableCards(prevCards => {
      const shuffled = [...prevCards]
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
      }
      return shuffled
    })
  }
  
  const handleSelectCard = (card: KatinaCard) => {
    if (selectedCards.length >= 10) {
      setError('En fazla 10 kart seçebilirsiniz.')
      return
    }
    
    // %12 olasılıkla kartın ters gelmesi
    const isReversed = Math.random() <= 0.12
    
    // Kartı seçilenlere ekle
    setSelectedCards(prev => [...prev, {...card, reversed: isReversed}])
    
    // Kartı mevcut kartlardan çıkar
    setAvailableCards(prev => prev.filter(c => c.name !== card.name))
  }
  
  const handleRemoveCard = (index: number) => {
    // Çıkarılan kartı tekrar mevcut kartlara ekle
    const removedCard = selectedCards[index]
    setAvailableCards(prev => [...prev, {...removedCard, reversed: false}])
    
    // Kartı seçilenlerden çıkar
    setSelectedCards(prev => prev.filter((_, i) => i !== index))
  }
  
  const handleResetCards = () => {
    // Tüm seçili kartları mevcut kartlara geri ekle
    const resetCards = selectedCards.map(card => ({...card, reversed: false}))
    setAvailableCards(prev => [...prev, ...resetCards])
    
    // Seçili kartları temizle
    setSelectedCards([])
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Adım 1 - Kart Seçimi
    if (step === 1) {
      if (selectedCards.length < 10) {
        setError(`Lütfen 10 kart seçin (${selectedCards.length}/10)`)
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
        router.push('/auth/giris?redirect=/katina-fali/fal-bak')
        return
      }
      
      setError(null)
      setLoading(true)
      
      try {
        // Kart anlamlarını yükle
        const response = await fetch('/images/katina/KatinaKartAnlamlari.json')
        const cardMeanings = await response.json()
        
        // Seçilen kartlar için anlamları bul
        const cardsWithMeanings = selectedCards.map(card => {
          const meaning = cardMeanings.find((m: any) => m["Kartın Adı"] === card.name)
          return {
            name: card.name,
            image: card.image,
            reversed: card.reversed,
            meaning: meaning ? {
              description: meaning["Açıklaması"],
              upright: meaning["Düz Açılım Anlamı"],
              reversed: meaning["Ters Açılım Anlamı"]
            } : null
          }
        })
        
        // Katina falı yorumu al
        const { interpretKatinaReading } = await import('@/lib/ai/katina')
        const katinaReading = await interpretKatinaReading(cardsWithMeanings, birthDate, question)
        
        // Veritabanına kaydet
        const { supabase } = await import('@/lib/supabase/client')
        
        // Katina kartları için formatlama
        const selectedCardsData = selectedCards.map(card => ({
          name: card.name,
          image: card.image,
          reversed: card.reversed || false
        }))
        
        const readingData = {
          user_id: user.id,
          birth_date: birthDate,
          question: question,
          selected_cards: selectedCardsData,
          interpretation: katinaReading,
        }
        
        const { error: insertError } = await supabase
          .from('katina_card_readings')
          .insert([readingData])
        
        if (insertError) {
          console.error('Katina yorumu kaydedilemedi:', insertError)
          // Kayıt başarısız olduysa loglama yap ama devam et
          console.log('Kayıt hatası detayı:', insertError)
        }
        
        // Sonucu ayarla ve adım 3'e geç
        setResult(katinaReading)
        setStep(3)
      } catch (err) {
        console.error('Katina yorumu alınırken hata:', err)
        setError('Katina yorumu alınırken bir hata oluştu. Lütfen daha sonra tekrar deneyin.')
      } finally {
        setLoading(false)
      }
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
                  onClick={() => router.push('/katina-fali')}
                >
                  <ArrowLeft size={16} className="mr-2" />
                  Geri Dön
                </Button>
                <h1 className="text-2xl font-bold text-white">Katina Falı</h1>
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
                      <h2 className="text-xl font-semibold text-white">Katina Kartlarınızı Seçin</h2>
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
                      {selectedCards.length < 10 
                        ? `Lütfen 10 kart seçin (${selectedCards.length}/10)`
                        : "Tüm kartları seçtiniz. İsterseniz seçiminizi değiştirebilir veya devam edebilirsiniz."}
                    </p>
                  </motion.div>
                  
                  {/* Seçilen Kartlar */}
                  <motion.div variants={itemVariants} className="mb-8">
                    <h3 className="text-lg font-medium text-white mb-4">Seçilen Kartlar</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                      {Array.from({ length: 10 }).map((_, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <div className="mb-2 text-white/70">{cardPositions[index]}</div>
                          {selectedCards[index] ? (
                            <div className="relative">
                              <Image
                                src={selectedCards[index].image}
                                alt={selectedCards[index].name}
                                width={120}
                                height={180}
                                className={`rounded-lg shadow-lg ${selectedCards[index].reversed ? 'transform rotate-180' : ''}`}
                              />
                              <button
                                type="button"
                                onClick={() => handleRemoveCard(index)}
                                className="absolute -top-2 -right-2 bg-red-500/80 hover:bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                              >
                                &times;
                              </button>
                              {selectedCards[index].reversed && (
                                <div className="absolute bottom-0 right-0 bg-red-500/80 px-1.5 py-0.5 text-white text-xs rounded-tl-lg rounded-br-lg">
                                  Ters
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="w-[120px] h-[180px] bg-white/5 border border-white/10 rounded-lg flex items-center justify-center">
                              <div className="text-white/30 text-xs text-center p-2">
                                Kart seçiniz
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    {selectedCards.length > 0 && (
                      <div className="mt-4 flex justify-center">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleResetCards}
                          className="text-white border-white/20 hover:bg-white/10"
                        >
                          Seçimi Sıfırla
                        </Button>
                      </div>
                    )}
                  </motion.div>
                  
                  {/* Kart Seçimi */}
                  <motion.div variants={itemVariants}>
                    <h3 className="text-lg font-medium text-white mb-4">Kartlar</h3>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                      {availableCards.map((card) => (
                        <button
                          key={card.name}
                          type="button"
                          onClick={() => handleSelectCard(card)}
                          className="group relative"
                          disabled={selectedCards.length >= 10}
                        >
                          <Image
                            src={card.image}
                            alt={card.name}
                            width={100}
                            height={150}
                            className="rounded-lg transition-transform group-hover:scale-105"
                          />
                          <div className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-black/60 rounded-lg flex items-center justify-center transition-opacity">
                            <Eye size={24} className="text-white" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="mt-8 flex justify-end">
                    <Button
                      type="submit"
                      variant="gradient"
                      disabled={selectedCards.length !== 10}
                    >
                      Devam Et
                    </Button>
                  </motion.div>
                </motion.div>
              )}
            
              {/* Adım 2: Soru Sorun */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-6"
                >
                  <motion.div variants={itemVariants}>
                    <h2 className="text-xl font-semibold text-white mb-6">Katina Falınız İçin Bilgiler</h2>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="text-white mb-2 block">Doğum Tarihiniz</label>
                        <Input
                          type="date"
                          value={birthDate}
                          onChange={(e) => setBirthDate(e.target.value)}
                          className="bg-black/20 border-white/10 text-white"
                        />
                        <p className="text-white/50 text-sm mt-1">
                          Doğum tarihiniz daha doğru bir yorum için gereklidir.
                        </p>
                      </div>
                      
                      <div>
                        <label className="text-white mb-2 block">Sorunuz</label>
                        <Textarea
                          value={question}
                          onChange={(e) => setQuestion(e.target.value)}
                          placeholder="Hayatınızla ilgili merak ettiğiniz bir soru yazın..."
                          className="bg-black/20 border-white/10 text-white min-h-[120px]"
                        />
                        <p className="text-white/50 text-sm mt-1">
                          Net ve açık bir soru daha doğru bir yorum almanızı sağlar.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="mt-8 flex justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(1)}
                      className="text-white border-white/20 hover:bg-white/10"
                    >
                      <ArrowLeft size={16} className="mr-2" />
                      Geri Dön
                    </Button>
                    
                    <Button
                      type="submit"
                      variant="gradient"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin h-4 w-4 mr-2 border-2 border-white/20 border-t-white rounded-full"></div>
                          Yorumlanıyor...
                        </>
                      ) : (
                        <>
                          <Sparkle size={16} className="mr-2" />
                          Yorumu Al
                        </>
                      )}
                    </Button>
                  </motion.div>
                </motion.div>
              )}
              
              {/* Adım 3: Sonuç */}
              {step === 3 && result && (
                <motion.div
                  key="step3"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="bg-gradient-to-br from-[#2A1C5A]/50 to-[#4A287D]/50 rounded-xl p-8 border border-[#7B68EE]/30"
                >
                  <motion.div variants={itemVariants} className="mb-8">
                    <div className="flex items-center">
                      <div className="p-2 bg-[#7B68EE]/30 rounded-full mr-3">
                        <Sparkle size={24} className="text-[#FFD700]" />
                      </div>
                      <h2 className="text-2xl font-bold text-white">Katina Falı Yorumunuz</h2>
                    </div>
                  </motion.div>
                  
                  {/* Fal yorumu içeriği */}
                  <motion.div variants={itemVariants} className="mb-8">
                    <div className="bg-black/20 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-[#FFD700] mb-4">Genel Yorum</h3>
                      <div className="text-white/90 prose prose-invert max-w-none">
                        <p>{result.summary}</p>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Kartların tek tek yorumları */}
                  <motion.div variants={itemVariants} className="mb-8">
                    <h3 className="text-xl font-semibold text-white mb-4">Kart Yorumları</h3>
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                      {result.cards.map((card: any, index: number) => (
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
                        <p className="text-white/80 whitespace-pre-line">{result.future}</p>
                      </div>
                      
                      <div className="bg-black/20 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-[#FFD700] mb-3">Tavsiyeler</h3>
                        <div className="text-white/80 whitespace-pre-line">{result.advice}</div>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="text-center text-white/50 text-sm my-8">
                    <p>Bu yorum yapay zeka tarafından oluşturulmuştur.</p>
                    <p className="text-xs">Yorumlar tamamen eğlence amaçlıdır ve profesyonel tavsiye yerine geçmez.</p>
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="flex justify-center space-x-4">
                    <Button
                      variant="gradient"
                      onClick={() => {
                        setStep(1)
                        setSelectedCards([])
                        setQuestion('')
                        setResult(null)
                        
                        // Tüm kartları yeniden yükle
                        const loadKatinaCards = async () => {
                          try {
                            // Klasörden tüm kart isimlerini al
                            const cardImages = [
                              "Agac.png", "Afyon.png", "Alyans.png", "Anahtar.png", "Ariman.jpg",
                              "Assyranta.jpg", "Atart.png", "Abonoz.jpg", "Aral.jpg", "Adhamdeva.jpg",
                              "Bahceler.png", "Balik.jpg", "Baykus.png", "Bedes.jpg", "Bulutlar.png",
                              "Capa.png", "Cicekler.jpg", "Dastar.jpg", "Dag.png", "Dare.jpg",
                              "Dervis.png", "Deve.png", "Elmas.jpg", "Eprahhat.jpg", "Ev.png",
                              "Gamhat.jpg", "Gunes.png", "Hac.png", "Hesse.jpg", "İsfahan.jpg",
                              "Kalif.jpg", "Kalp.png", "Kale.png", "Kapi.png", "Kareler.png",
                              "Kiz_Cocugu.png", "Kitap.png", "Kopek.png", "Mektup.png", "Mezar.png",
                              "Mida.jpg", "Munzur.jpg", "Nil_NEHRi.png", "Parsadra.jpg", "Saah.jpg",
                              "Samyeli.png", "Selana.jpg", "Selçukassa.jpg", "Sunit.jpg", "Supurge.png",
                              "Tagral.jpg", "Tattaret.jpg", "Tilki.png", "Turan.jpg", "Urmia.jpg",
                              "Valide.png", "Yakut.jpg", "Yatagan.png", "Yelkenli.png", "Yildizlar.png", 
                              "Yilan.png", "Yol.png", "Zara.jpg", "Zümrüt.jpg"
                            ]
                            
                            // Kart objelerini oluştur
                            const cards: KatinaCard[] = cardImages.map(filename => {
                              const name = filename.replace(/\.(png|jpg)$/, '')
                              return {
                                name,
                                image: `/images/katina/${filename}`
                              }
                            })
                            
                            setAvailableCards(cards)
                          } catch (err) {
                            console.error('Kartlar yüklenirken hata:', err)
                            setError('Kartlar yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin.')
                          }
                        }
                        
                        loadKatinaCards()
                      }}
                    >
                      Yeniden Fal Bak
                    </Button>
                    
                    <Button
                      variant="outline"
                      className="text-white border-white/20 hover:bg-white/10"
                      onClick={() => router.push('/hesabim')}
                    >
                      Hesabıma Dön
                    </Button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      </div>
    </div>
  )
} 