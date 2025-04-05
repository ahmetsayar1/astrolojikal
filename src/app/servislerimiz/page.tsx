'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { Coffee, Moon, Sparkles, BookOpen, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// Animasyon varyantları tanımlıyoruz
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.2,
    }
  }
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1, 
    y: 0,
    transition: { 
      type: "spring", 
      damping: 12,
      stiffness: 100
    }
  },
  hover: {
    y: -10,
    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.5)",
    transition: { 
      type: "spring",
      stiffness: 300,
      damping: 15
    }
  }
}

const stepVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: (custom) => ({
    opacity: 1,
    x: 0,
    transition: { 
      delay: custom * 0.3,
      type: "spring",
      damping: 15
    }
  })
}

const services = [
  {
    title: 'Rüya Yorumu',
    description: 'Rüyalarınızın derin anlamlarını keşfedin ve geleceğiniz hakkında ipuçları elde edin.',
    icon: Moon,
    color: 'bg-gradient-to-br from-[#483D8B]/50 to-[#9370DB]/30',
    borderColor: 'border-[#9370DB]/50',
    iconColor: 'text-[#F0F0F0]',
    href: '/ruya-yorumu',
    steps: [
      'Rüyanızın detaylarını yazın',
      'Rüyanızın dönemini ve duygusal etkisini belirtin',
      'Yorumcularımız rüyanızı analiz eder',
      'Detaylı yorum ve tavsiyelerinizi alın'
    ]
  },
  {
    title: 'Tarot Falı',
    description: 'Tarot kartlarının rehberliğinde geleceğinizi, ilişkilerinizi ve kariyerinizi öğrenin.',
    icon: Sparkles,
    color: 'bg-gradient-to-br from-[#702963]/50 to-[#9370DB]/30',
    borderColor: 'border-[#702963]/50',
    iconColor: 'text-[#FFD700]',
    href: '/tarot-fali',
    steps: [
      'Sormak istediğiniz soruyu belirtin',
      'Kartlarınız sizin için seçilir',
      'Uzman falcılarımız kartları yorumlar',
      'Sorularınızın cevaplarını keşfedin'
    ]
  },
  {
    title: 'Katina Falı',
    description: 'Antik bir Yunan kehanet sistemi ile kaderinizi ve potansiyelinizi öğrenin.',
    icon: BookOpen,
    color: 'bg-gradient-to-br from-[#111133]/70 to-[#483D8B]/30',
    borderColor: 'border-[#483D8B]/50',
    iconColor: 'text-[#4A7AFF]',
    href: '/katina-fali',
    steps: [
      'Doğum bilgilerinizi girin',
      'Katina kartlarınız hesaplanır',
      'Astrolojik haritanız çıkarılır',
      'Detaylı yorumlarınızı inceleyin'
    ]
  },
  {
    title: 'Kahve Falı',
    description: 'Fincanınızdaki sembollerin anlamlarını keşfederek yakın geleceğinize ışık tutun.',
    icon: Coffee,
    color: 'bg-gradient-to-br from-[#8B4513]/50 to-[#702963]/30',
    borderColor: 'border-[#8B4513]/50',
    iconColor: 'text-[#D4AF37]',
    href: '/kahve-fali',
    steps: [
      'Fincanınızın fotoğraflarını yükleyin',
      'Kahve içerken dilediğiniz dileği belirtin',
      'Uzmanlarımız fincanınızı inceler',
      'Detaylı yorum ve tavsiyelerinizi alın'
    ]
  }
]

export default function ServicesPage() {
  const [isLoading, setIsLoading] = useState(true)
  
  // Sayfa yüklendiğinde animasyon için yükleme durumunu ayarlama
  useEffect(() => {
    // Sayfa içeriğinin yüklenmesi için kısa bir gecikme
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {!isLoading && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex justify-center items-center w-full py-12 px-4 sm:px-6 lg:px-8"
        >
          <div className="w-full max-w-6xl">
            <motion.header 
              className="text-center mb-16"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 100, 
                damping: 15,
                delay: 0.2
              }}
            >
              <motion.h1 
                className="text-4xl md:text-5xl font-bold mb-4 text-[#FFD700] pulse-glow"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 200,
                    delay: 0.4
                  }
                }}
              >
                Servislerimiz
              </motion.h1>
              <motion.p 
                className="text-lg max-w-3xl mx-auto text-white/80"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: 1,
                  transition: {
                    duration: 0.8,
                    delay: 0.6
                  }
                }}
              >
                Geleceğinizi aydınlatmak, geçmişinizi anlamak ve şu anınızı zenginleştirmek için astrolojik hizmetlerimizden yararlanın.
              </motion.p>
            </motion.header>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  className={cn(
                    "relative rounded-xl border p-6 shadow-lg overflow-hidden cursor-pointer",
                    service.color,
                    service.borderColor
                  )}
                  variants={cardVariants}
                  whileHover="hover"
                  custom={index}
                >
                  <div className="absolute inset-0 opacity-10">
                    <div className="stars-bg w-full h-full"></div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <motion.div 
                      className={cn("p-3 rounded-full bg-black/30 backdrop-blur-md", service.borderColor)}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <service.icon size={36} className={service.iconColor} />
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                      <p className="text-white/70 mb-6">{service.description}</p>
                      
                      <h4 className="text-lg font-semibold text-[#FFD700] mb-3">Nasıl Çalışır?</h4>
                      <ol className="space-y-2 mb-6">
                        {service.steps.map((step, i) => (
                          <motion.li 
                            key={i} 
                            className="flex items-start"
                            variants={stepVariants}
                            custom={i}
                          >
                            <motion.span 
                              className="flex items-center justify-center bg-[#FFD700]/20 text-[#FFD700] rounded-full w-6 h-6 text-xs font-bold mr-2 mt-0.5" 
                              whileHover={{ scale: 1.2, backgroundColor: 'rgba(255, 215, 0, 0.3)' }}
                            >
                              {i+1}
                            </motion.span>
                            <span className="text-white/80">{step}</span>
                          </motion.li>
                        ))}
                      </ol>

                      <Button asChild className="mt-2 w-full md:w-auto" size="lg" variant="gradient">
                        <Link href={service.href} prefetch={false}>
                          Şimdi Kullan <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>

                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tr from-transparent to-white/5 rounded-tl-full"></div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              className="mystical-card rounded-xl p-8 text-center max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: {
                  type: "spring",
                  stiffness: 50,
                  damping: 15,
                  delay: 1.2
                }
              }}
            >
              <h2 className="text-2xl font-bold mb-4 text-[#FFD700]">Hizmetlerimiz Hakkında</h2>
              <p className="mb-6 text-white/80">
                Astrolojikal olarak tüm hizmetlerimizde uzman falcılar ve astrologlar ile çalışmaktayız. 
                Verdiğimiz her yorum, yılların tecrübesi ve derin bilgi birikimi ile hazırlanmaktadır.
                Size özel hazırlanan yorumlarda gizlilik en önemli önceliğimizdir.
              </p>
              <div className="flex justify-center space-x-3">
                <span className="text-white/80">Sorularınız mı var?</span>
                <Link href="/iletisim" className="text-[#FFD700] hover:underline">Bize ulaşın</Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 