'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Star, Users, History, Award, BookOpenCheck } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="flex justify-center items-center w-full py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#FFD700] pulse-glow">
            Hakkımızda
          </h1>
          <p className="text-lg max-w-3xl mx-auto text-white/80">
            Astrolojikal ile kadim bilgilerin ışığında geleceğinizi keşfedin, geçmişinizi anlayın 
            ve şimdiki anınıza yeni bir bakış açısı kazanın.
          </p>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-6"
          >
            <div className="mystical-card rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-4 text-[#FFD700]">Biz Kimiz?</h2>
              <p className="text-white/80">
                Astrolojikal olarak, astroloji ve fal kültürünün kadim bilgeliğini modern teknoloji ile birleştirerek 
                sizlere özel yorumlar sunuyoruz. Ekibimiz, alanında uzman astrologlar, tarot yorumcuları ve kahve falı 
                uzmanlarından oluşmaktadır.
              </p>
            </div>

            <div className="mystical-card rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-4 text-[#FFD700]">Misyonumuz</h2>
              <p className="text-white/80">
                Kadim bilgileri erişilebilir kılmak, hayatınızdaki karmaşık olayları anlamanıza yardımcı olmak 
                ve kendi kaderinizi şekillendirmeniz için size rehberlik etmek. Yorumlarımızla sizi aydınlatırken, 
                kararlarınızı kendinizin vermesi gerektiğine inanıyoruz.
              </p>
            </div>

            <div className="mystical-card rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-4 text-[#FFD700]">Vizyonumuz</h2>
              <p className="text-white/80">
                Türkiye'nin en güvenilir ve kapsamlı astroloji platformu olmak. Teknoloji ile geleneksel bilgeliği 
                harmanlayarak, her bireyin kişisel gelişimine katkıda bulunmak ve kendi içsel yolculuğunda rehberlik etmek.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="space-y-8"
          >
            <div className="bg-gradient-to-r from-[#111133]/50 to-[#483D8B]/30 p-1 rounded-xl">
              <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6 space-y-5">
                <h2 className="text-2xl font-bold text-[#FFD700] mb-5">Neden Astrolojikal?</h2>
                
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-full bg-[#702963]/30 backdrop-blur-md border border-[#702963]/50 shrink-0">
                    <Users size={24} className="text-[#FFD700]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Uzman Kadro</h3>
                    <p className="text-white/70 text-sm">Alanında uzman astrologlar ve falcılar ile çalışıyoruz</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-full bg-[#702963]/30 backdrop-blur-md border border-[#702963]/50 shrink-0">
                    <Star size={24} className="text-[#FFD700]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Kişiye Özel Yorumlar</h3>
                    <p className="text-white/70 text-sm">Her yorum sizin özel durumunuza göre hazırlanır</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-full bg-[#702963]/30 backdrop-blur-md border border-[#702963]/50 shrink-0">
                    <History size={24} className="text-[#FFD700]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Kadim Bilgelik</h3>
                    <p className="text-white/70 text-sm">Yüzyıllardır süregelen astrolojik bilgilerden yararlanıyoruz</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-full bg-[#702963]/30 backdrop-blur-md border border-[#702963]/50 shrink-0">
                    <Award size={24} className="text-[#FFD700]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Kaliteli Hizmet</h3>
                    <p className="text-white/70 text-sm">Yorumlarımızda kaliteyi ve gizliliği ön planda tutuyoruz</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-full bg-[#702963]/30 backdrop-blur-md border border-[#702963]/50 shrink-0">
                    <BookOpenCheck size={24} className="text-[#FFD700]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Modern Yaklaşım</h3>
                    <p className="text-white/70 text-sm">Geleneksel bilgileri günümüz teknolojisi ile birleştiriyoruz</p>
                  </div>
                </div>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mystical-card rounded-xl p-8 text-center"
            >
              <h2 className="text-2xl font-bold mb-4 text-[#FFD700]">Astroloji ve Fal Kültürü</h2>
              <p className="text-white/80 mb-6">
                Astroloji ve fal kültürü, insanlık tarihi kadar eskidir. Türk kültüründe de kahve falı, 
                yıldız falı gibi geleneklerimiz bugüne kadar gelmiştir. Bizler bu kültürel mirası 
                yaşatırken, bilimsel ve akılcı yaklaşımla destekliyoruz.
              </p>
              <Link 
                href="/servislerimiz" 
                className="inline-block px-6 py-3 bg-gradient-to-r from-[#702963] to-[#9370DB] text-white rounded-full hover:shadow-lg transition-all"
              >
                Servislerimizi Keşfedin
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mystical-card rounded-xl p-8 text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-2xl font-bold mb-4 text-[#FFD700]">Uzman Ekibimiz</h2>
          <p className="text-white/80 mb-6">
            Astrolojikal ekibi olarak alanında uzman ve deneyimli astrologlar, tarot okuyucuları ve kahve falı uzmanları ile çalışıyoruz. 
            Her bir ekip üyemiz, kendi alanında en az 5 yıllık profesyonel deneyime sahiptir ve sürekli kendini geliştirmektedir.
          </p>
          <div className="flex justify-center space-x-3">
            <span className="text-white/80">Bize katılın!</span>
            <Link href="/iletisim" className="text-[#FFD700] hover:underline">İletişime geçin</Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 