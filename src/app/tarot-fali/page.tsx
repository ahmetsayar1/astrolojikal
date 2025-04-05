'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Sparkles, ExternalLink, ArrowRight, Star, Clock, Info } from 'lucide-react'

export default function TarotHomePage() {
  const router = useRouter()
  
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Hero Bölümü */}
        <motion.div
          className="rounded-xl overflow-hidden bg-black/30 backdrop-blur-md border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="p-8 md:p-12 lg:p-16">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
              <div className="max-w-2xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                    <span className="text-[#FFD700]">Tarot Falı</span> ile Geleceğe Bakış
                  </h1>
                  <p className="text-lg text-white/80 mb-6">
                    Tarot kartları, kadim bilgeliğin ve evrensel sembollerin gücünü kullanarak hayatınızın farklı yönlerini aydınlatır. Geçmiş, şimdiki zaman ve geleceğin enerjilerini okuyarak size rehberlik eder.
                  </p>
                  
                  <div className="flex flex-wrap gap-4 mb-8">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-[#4A287D] flex items-center justify-center mr-2">
                        <Star size={16} className="text-[#FFD700]" />
                      </div>
                      <span className="text-white/80">Kişiselleştirilmiş Yorum</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-[#4A287D] flex items-center justify-center mr-2">
                        <Clock size={16} className="text-[#FFD700]" />
                      </div>
                      <span className="text-white/80">Anında Sonuç</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-[#4A287D] flex items-center justify-center mr-2">
                        <Info size={16} className="text-[#FFD700]" />
                      </div>
                      <span className="text-white/80">Derin Analiz</span>
                    </div>
                  </div>
                  
                  <Button 
                    variant="gradient" 
                    size="lg"
                    onClick={() => router.push('/tarot-fali/fal-bak')}
                    className="group"
                  >
                    <span>Tarot Falı Bak</span>
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                  </Button>
                </motion.div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="relative h-[350px] w-[250px] lg:h-[450px] lg:w-[320px]"
              >
                <div className="absolute top-0 left-0 w-full h-full transform rotate-[-8deg] z-10">
                  <Image 
                    src="/images/tarot/Major_Kartlar/The_Star.jpg" 
                    alt="Tarot Kartı" 
                    width={300} 
                    height={450}
                    className="rounded-lg shadow-lg"
                  />
                </div>
                <div className="absolute top-0 left-0 w-full h-full transform rotate-[5deg] z-20">
                  <Image 
                    src="/images/tarot/Major_Kartlar/The_Sun.jpg" 
                    alt="Tarot Kartı" 
                    width={300} 
                    height={450}
                    className="rounded-lg shadow-lg"
                  />
                </div>
                <div className="absolute top-0 left-0 w-full h-full transform z-30">
                  <Image 
                    src="/images/tarot/Major_Kartlar/The_Moon.jpg" 
                    alt="Tarot Kartı" 
                    width={300} 
                    height={450}
                    className="rounded-lg shadow-lg"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
        
        {/* Nasıl Çalışır Bölümü */}
        <motion.div
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-6">
            <div className="w-12 h-12 rounded-full bg-[#4A287D]/50 flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-[#FFD700]">1</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Kart Seçimi</h3>
            <p className="text-white/70">
              3 kart seçersiniz. Bu kartlar geçmişinizi, şimdiki zamanınızı ve geleceğinizi temsil eder.
            </p>
          </div>
          
          <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-6">
            <div className="w-12 h-12 rounded-full bg-[#4A287D]/50 flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-[#FFD700]">2</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Soru & Doğum Tarihi</h3>
            <p className="text-white/70">
              Cevap aradığınız soruyu belirtin ve doğum tarihinizi girin. Burcunuz yorumunuzu etkiler.
            </p>
          </div>
          
          <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-6">
            <div className="w-12 h-12 rounded-full bg-[#4A287D]/50 flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-[#FFD700]">3</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Detaylı Yorum</h3>
            <p className="text-white/70">
              Seçtiğiniz kartlara, sorunuza ve burcunuza özel detaylı bir yorum alırsınız.
            </p>
          </div>
        </motion.div>
        
        {/* Kart Anlamları Bölümü */}
        <motion.div
          className="mt-12 bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="flex items-center mb-6">
            <div className="p-2 bg-[#4A287D]/50 rounded-full mr-3">
              <Sparkles size={24} className="text-[#FFD700]" />
            </div>
            <h2 className="text-2xl font-bold text-white">Tarot Kartları Hakkında</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-[#FFD700] mb-3">Major Arcana</h3>
              <p className="text-white/80 mb-4">
                Major Arcana kartları, hayattaki büyük manevi dersleri, karmik etkileri ve önemli yaşam aşamalarını temsil eder. Bu 22 kart, ruhsal yolculuğunuzun en güçlü göstergeleridir.
              </p>
              <p className="text-white/80">
                "Fool" (Aptal) kartı ile başlayan ve "World" (Dünya) kartı ile biten bu deste, hayattaki dönüşüm ve öğrenme sürecini sembolize eder.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-[#FFD700] mb-3">Minor Arcana</h3>
              <p className="text-white/80 mb-4">
                Minor Arcana kartları, günlük yaşamın detaylarını, anlık zorlukları ve geçici etkileri gösterir. Değnekler, Kupalar, Kılıçlar ve Tilsımlar olmak üzere dört suit'e ayrılır.
              </p>
              <ul className="text-white/80 list-disc pl-5 space-y-1">
                <li>Değnekler: Enerji, tutku, yaratıcılık</li>
                <li>Kupalar: Duygular, ilişkiler, sezgiler</li>
                <li>Kılıçlar: Düşünceler, zorluklar, kararlar</li>
                <li>Tilsımlar: Maddi dünya, iş, finans</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <Button
              variant="outline"
              size="lg"
              onClick={() => router.push('/tarot-fali/fal-bak')}
              className="border-white/20 text-white hover:bg-white/10 group"
            >
              <span>Tarot Falı Baktır</span>
              <ExternalLink className="ml-2 group-hover:rotate-12 transition-transform" size={18} />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 