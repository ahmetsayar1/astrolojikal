'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Sparkle, Star, Coffee, BookOpen, Info, Play, Sun, Clock, ArrowRight } from 'lucide-react'

export default function KatinaFaliPage() {
  const router = useRouter()
  
  const features = [
    {
      icon: <Sparkle className="h-10 w-10 text-[#FFD700]" />,
      title: "Katina Falı",
      description: "Katina falı, 65 adet karttan oluşan, kökleri Osmanlı ve Mısır kültürüne dayanan geleneksel bir fal türüdür. Geçmiş, şimdiki durum ve gelecek hakkında detaylı bilgiler verir."
    },
    {
      icon: <Star className="h-10 w-10 text-[#FFD700]" />,
      title: "Kişiye Özel Yorumlar",
      description: "Kartlar sizin enerji alanınızla etkileşime girerek, durumunuza özel mesajlar verir. Her açılım benzersizdir ve sadece size özeldir."
    },
    {
      icon: <BookOpen className="h-10 w-10 text-[#FFD700]" />,
      title: "Kelth Haçı (İmparator Artısı)",
      description: "Genel Açılım olarak nitelendirilen bu yöntem, kişinin yalnızca kendine odaklanarak seçim yapması gereken ve hayatın tüm alanlarını kapsayan bir yorum metodudur."
    },
    {
      icon: <Sun className="h-10 w-10 text-[#FFD700]" />,
      title: "Hızlı ve Detaylı",
      description: "Yapay zeka destekli yorumlarla anında ve detaylı bilgiler alarak, kararlarınızda size rehberlik edecek içgörüler elde edin."
    }
  ]
  
  return (
    <div className="min-h-screen">
      {/* Hero Bölümü */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-[#2A1C5A] to-black opacity-70"></div>
          <Image 
            src="/images/katina/bg-katina.jpg" 
            alt="Katina Falı Arkaplan" 
            fill 
            priority
            className="object-cover"
          />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <div className="inline-block p-2 bg-[#7B68EE]/20 rounded-full mb-4">
                <Sparkle className="h-12 w-12 text-[#FFD700]" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Katina Falı ile Geleceğe Bakın
              </h1>
              <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
                65 karttan oluşan geleneksel Katina falı ile hayatınızın her alanında cevap arayın.
                Geleceğinizi öğrenmek için hemen başlayın!
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Button 
                variant="gradient"
                size="lg"
                className="text-lg"
                onClick={() => router.push('/katina-fali/fal-bak')}
              >
                <Sparkle className="mr-2 h-5 w-5" />
                Hemen Fal Baktır
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Özellikler Bölümü */}
      <div className="py-20 bg-black/70">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Katina Falı Nedir?</h2>
            <p className="text-lg text-white/70 max-w-3xl mx-auto">
              Katina falı, kökleri eski çağlara dayanan, geçmiş zamanlardan günümüze ulaşan gizemli bir fal yöntemidir.
              Yaşamınızdaki sorulara yanıt bulmak için güçlü bir araç olarak kullanılır.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-6 flex flex-col items-center text-center"
              >
                <div className="p-3 bg-[#4A287D]/30 rounded-full mb-5">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Nasıl Çalışır Bölümü */}
      <div className="py-20 bg-gradient-to-b from-[#2A1C5A]/30 to-black/90">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Nasıl Çalışır?</h2>
            <p className="text-lg text-white/70 max-w-3xl mx-auto">
              Katina falı bakım süreci kolay ve hızlıdır. Sadece birkaç adımda geleceğiniz hakkında bilgi sahibi olabilirsiniz.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-6 flex flex-col items-center text-center"
            >
              <div className="w-14 h-14 bg-[#7B68EE]/20 rounded-full flex items-center justify-center mb-5 relative">
                <span className="text-2xl font-bold text-[#FFD700]">1</span>
                <div className="absolute -right-8 top-1/2 h-0.5 w-8 bg-[#7B68EE]/20 hidden md:block"></div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Kartları Seçin</h3>
              <p className="text-white/70">
                65 Katina kartı arasından 10 kart seçerek açılımınızı oluşturun.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-6 flex flex-col items-center text-center"
            >
              <div className="w-14 h-14 bg-[#7B68EE]/20 rounded-full flex items-center justify-center mb-5 relative">
                <span className="text-2xl font-bold text-[#FFD700]">2</span>
                <div className="absolute -right-8 top-1/2 h-0.5 w-8 bg-[#7B68EE]/20 hidden md:block"></div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Sorunuzu Sorun</h3>
              <p className="text-white/70">
                Hayatınızdaki bir durumla ilgili merak ettiğiniz soruyu yöneltin.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-6 flex flex-col items-center text-center"
            >
              <div className="w-14 h-14 bg-[#7B68EE]/20 rounded-full flex items-center justify-center mb-5">
                <span className="text-2xl font-bold text-[#FFD700]">3</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Yorumunuzu Alın</h3>
              <p className="text-white/70">
                Yapay zeka destekli sistemimiz, kartlarınıza özel detaylı bir yorum hazırlar.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* CTA Bölümü */}
      <div className="py-20 bg-black/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-[#4A287D]/50 to-[#7B68EE]/20 rounded-xl p-8 md:p-12 max-w-5xl mx-auto border border-[#7B68EE]/30"
          >
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-8 md:mb-0 md:mr-8">
                <h2 className="text-3xl font-bold text-white mb-4">Haydi Geleceğe Bakalım!</h2>
                <p className="text-lg text-white/80 mb-4">
                  Katina kartları sizi bekliyor. Geleceğinizi keşfetmek için hemen başlayın.
                </p>
                <div className="flex items-center text-[#FFD700]">
                  <Clock className="h-5 w-5 mr-2" />
                  <span className="text-sm">Ortalama okuma süresi: 5 dakika</span>
                </div>
              </div>
              
              <Button 
                variant="gradient"
                size="lg"
                className="text-lg px-8"
                onClick={() => router.push('/katina-fali/fal-bak')}
              >
                <Sparkle className="mr-2 h-5 w-5" />
                Fal Baktır
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 