'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Coffee } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function CoffeeReadingPage() {
  return (
    <div className="flex justify-center items-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl">
        <Link href="/servislerimiz" className="inline-flex items-center text-[#9370DB] hover:text-[#FFD700] mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          <span>Servislerimize Dön</span>
        </Link>

        <motion.div 
          className="mystical-card rounded-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="p-8 md:p-12">
            <div className="flex items-center mb-8">
              <div className="p-3 rounded-full bg-[#8B4513]/50 border border-[#8B4513]/50 mr-4">
                <Coffee size={32} className="text-[#D4AF37]" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#FFD700]">Kahve Falı</h1>
            </div>

            <p className="text-lg text-white/80 mb-8">
              Fincanınızdaki sembollerin anlamlarını keşfederek yakın geleceğinize ışık tutun.
              Uzman falcılarımız kahve fincanınızdaki desenleri yorumlayarak size özel bilgiler sunar.
            </p>

            <motion.div 
              className="bg-black/20 backdrop-blur-sm rounded-lg p-6 mb-8 border border-[#8B4513]/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              <h2 className="text-xl font-semibold text-[#FFD700] mb-4">Bu Servis Hâlâ Yapım Aşamasında</h2>
              <p className="text-white/70 mb-4">
                Kahve Falı servisimiz yakında aktif olacaktır. Şu anda geliştirme aşamasındayız ve 
                en kısa sürede hizmetinize sunacağız.
              </p>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-[#8B4513] to-[#D4AF37]"
                  initial={{ width: 0 }}
                  animate={{ width: "75%" }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
              <p className="text-right text-sm text-white/50 mt-1">%75 tamamlandı</p>
            </motion.div>

            <div className="space-y-6">
              <motion.h3 
                className="text-xl font-semibold text-[#FFD700]"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                Kahve Falı Nasıl Çalışır?
              </motion.h3>
              
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <div className="bg-black/30 rounded-lg p-5 border border-white/10">
                  <div className="flex items-center mb-2">
                    <span className="flex items-center justify-center bg-[#FFD700]/20 text-[#FFD700] rounded-full w-6 h-6 text-xs font-bold mr-2">1</span>
                    <h4 className="font-medium text-white">Fincanınızı Yükleyin</h4>
                  </div>
                  <p className="text-white/70 text-sm">Kahve fincanınızın alt, üst ve yan fotoğraflarını sisteme yükleyin.</p>
                </div>
                
                <div className="bg-black/30 rounded-lg p-5 border border-white/10">
                  <div className="flex items-center mb-2">
                    <span className="flex items-center justify-center bg-[#FFD700]/20 text-[#FFD700] rounded-full w-6 h-6 text-xs font-bold mr-2">2</span>
                    <h4 className="font-medium text-white">Dileğinizi Belirtin</h4>
                  </div>
                  <p className="text-white/70 text-sm">Kahve içerken tuttuğunuz dileği veya odaklandığınız soruyu paylaşın.</p>
                </div>
                
                <div className="bg-black/30 rounded-lg p-5 border border-white/10">
                  <div className="flex items-center mb-2">
                    <span className="flex items-center justify-center bg-[#FFD700]/20 text-[#FFD700] rounded-full w-6 h-6 text-xs font-bold mr-2">3</span>
                    <h4 className="font-medium text-white">Fincan İncelemesi</h4>
                  </div>
                  <p className="text-white/70 text-sm">Uzman falcılarımız fincanınızdaki desenleri ve sembolleri inceler.</p>
                </div>
                
                <div className="bg-black/30 rounded-lg p-5 border border-white/10">
                  <div className="flex items-center mb-2">
                    <span className="flex items-center justify-center bg-[#FFD700]/20 text-[#FFD700] rounded-full w-6 h-6 text-xs font-bold mr-2">4</span>
                    <h4 className="font-medium text-white">Detaylı Yorum</h4>
                  </div>
                  <p className="text-white/70 text-sm">Yakın geleceğinize dair öngörüler ve tavsiyelerle yorumunuzu alın.</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex justify-center mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                <Button disabled size="lg" variant="gradient" className="px-8">
                  Yakında Aktif Olacak
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 