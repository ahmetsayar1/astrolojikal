'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Star, Users, Clock, Shield } from 'lucide-react'

export default function DreamInterpretationPage() {
  const router = useRouter()

  const testimonials = [
    {
      id: 1,
      name: 'Ayşe Yılmaz',
      dream: 'Uçmak',
      comment: 'Rüyamın yorumu hayatıma yön verdi. Çok teşekkür ederim!',
      rating: 5
    },
    {
      id: 2,
      name: 'Mehmet Kaya',
      dream: 'Deniz',
      comment: 'Çok detaylı bir yorum aldım, beklentimin üzerindeydi.',
      rating: 5
    },
    {
      id: 3,
      name: 'Zeynep Demir',
      dream: 'Yılan',
      comment: 'Rüyamın anlamını anlamama yardım etti, profesyonel yaklaşım.',
      rating: 4
    }
  ]

  const dreamTypes = [
    {
      title: 'Kabus',
      description: 'Korku ve endişe içerikli rüyaların altında yatan mesajları keşfedin.',
      image: '/images/nightmare.jpg'
    },
    {
      title: 'Tekrarlayan Rüyalar',
      description: 'Tekrar eden rüyalarınızın size vermek istediği mesajları öğrenin.',
      image: '/images/recurring.jpg'
    },
    {
      title: 'Sembolik Rüyalar',
      description: 'Sembollerin ve metaforların rüyanızdaki gerçek anlamlarını anlayın.',
      image: '/images/symbolic.jpg'
    },
    {
      title: 'Öngörü Rüyaları',
      description: 'Geleceğe dair işaretler içeren rüyalarınızın yorumlarını alın.',
      image: '/images/premonition.jpg'
    }
  ]

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
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 bg-[url('/images/stars-bg.png')] bg-repeat"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-[#FFD700] mb-6">
                Rüyalarınızın Gizli Mesajlarını Keşfedin
              </h1>
              <p className="text-white/80 text-lg mb-8">
                Profesyonel astrologlarımız tarafından yapılan rüya yorumları ile
                bilinçaltınızın mesajlarını anlayın ve hayatınıza yön verin.
              </p>
              
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center">
                  <Users className="text-[#FFD700] mr-2" size={20} />
                  <span className="text-white">10,000+ Yorum</span>
                </div>
                <div className="flex items-center">
                  <Star className="text-[#FFD700] mr-2" size={20} />
                  <span className="text-white">4.9 Puan</span>
                </div>
                <div className="flex items-center">
                  <Clock className="text-[#FFD700] mr-2" size={20} />
                  <span className="text-white">24 Saat İçinde</span>
                </div>
                <div className="flex items-center">
                  <Shield className="text-[#FFD700] mr-2" size={20} />
                  <span className="text-white">%100 Gizlilik</span>
                </div>
              </div>
              
              <Button 
                variant="gradient" 
                size="lg"
                onClick={() => router.push('/ruya-yorumu/yorum-al')}
                className="group"
              >
                <span>Rüya Yorumu Al</span>
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden border-4 border-[#2A1C5A]/50 shadow-[0_0_30px_rgba(138,43,226,0.3)]">
                <Image
                  src="/images/dream-interpretation.jpg"
                  alt="Rüya Yorumu"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Nasıl Çalışır Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-[#FFD700] mb-4">Nasıl Çalışır?</h2>
            <p className="text-white/70 max-w-3xl mx-auto">
              Rüya yorumlarımız, mistik bilgi ve modern psikoloji arasında köprü kurar. İşte rüya yorumu hizmetimizin basit adımları:
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-[#1E1E3A]/50 rounded-xl p-6 border border-[#4A287D]/30 backdrop-blur-sm"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#4A287D] to-[#7B68EE] rounded-full flex items-center justify-center mb-4 text-white font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Rüyanızı Anlatın</h3>
              <p className="text-white/70">
                Gördüğünüz rüyanın detaylarını, duygularınızı ve rüyada hissettiklerinizi paylaşın.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-[#1E1E3A]/50 rounded-xl p-6 border border-[#4A287D]/30 backdrop-blur-sm"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#4A287D] to-[#7B68EE] rounded-full flex items-center justify-center mb-4 text-white font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Uzmanlar İnceler</h3>
              <p className="text-white/70">
                Astroloji ve rüya yorumu konusunda deneyimli uzmanlarımız rüyanızı inceler.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-[#1E1E3A]/50 rounded-xl p-6 border border-[#4A287D]/30 backdrop-blur-sm"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#4A287D] to-[#7B68EE] rounded-full flex items-center justify-center mb-4 text-white font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Detaylı Analiz</h3>
              <p className="text-white/70">
                Rüyanızdaki semboller, karakterler ve olayların detaylı ve kişiselleştirilmiş analizini yaparız.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-[#1E1E3A]/50 rounded-xl p-6 border border-[#4A287D]/30 backdrop-blur-sm"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#4A287D] to-[#7B68EE] rounded-full flex items-center justify-center mb-4 text-white font-bold">
                4
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Yorumu Alın</h3>
              <p className="text-white/70">
                24 saat içinde detaylı rüya yorumunuzu e-posta veya hesabınız üzerinden alın.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Rüya Türleri */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-[#FFD700] mb-4">Rüya Türleri</h2>
            <p className="text-white/70 max-w-3xl mx-auto">
              Her rüya türü farklı bir anlam taşır. İşte yorumlayabileceğimiz başlıca rüya türleri:
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {dreamTypes.map((dreamType, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-[#1E1E3A]/50 rounded-xl overflow-hidden border border-[#4A287D]/30"
              >
                <div className="h-48 relative">
                  <Image
                    src={dreamType.image}
                    alt={dreamType.title}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{dreamType.title}</h3>
                  <p className="text-white/70 mb-4">{dreamType.description}</p>
                  <Button
                    variant="cosmic"
                    size="sm"
                    onClick={() => router.push('/ruya-yorumu/yorum-al')}
                    className="w-full"
                  >
                    Yorum Al
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Yorumlar */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-[#FFD700] mb-4">Müşteri Yorumları</h2>
            <p className="text-white/70 max-w-3xl mx-auto">
              Rüya yorumu hizmetimizden memnun kalan danışanlarımızın deneyimleri:
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                variants={itemVariants}
                className="bg-[#1E1E3A]/50 rounded-xl p-6 border border-[#4A287D]/30 relative"
              >
                <div className="absolute -top-3 -right-3 bg-[#4A287D] rounded-full p-2">
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={14} className="text-[#FFD700] fill-[#FFD700]" />
                    ))}
                  </div>
                </div>
                <p className="text-white/80 mb-4 italic">"{testimonial.comment}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">{testimonial.name}</p>
                    <p className="text-white/60 text-sm">Rüya: {testimonial.dream}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 text-center"
          >
            <Button 
              variant="gradient" 
              size="lg"
              onClick={() => router.push('/ruya-yorumu/yorum-al')}
              className="group"
            >
              <span>Rüya Yorumu Al</span>
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* SSS - Sıkça Sorulan Sorular */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-[#FFD700] mb-4">Sıkça Sorulan Sorular</h2>
            <p className="text-white/70 max-w-3xl mx-auto">
              Rüya yorumu hizmetimiz hakkında merak edilenler:
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="bg-[#1E1E3A]/50 rounded-xl p-6 border border-[#4A287D]/30">
                <h3 className="text-xl font-semibold text-white mb-2">Rüya yorumunu ne kadar sürede alırım?</h3>
                <p className="text-white/70">
                  Rüya yorumunuz genellikle 24 saat içinde tamamlanır ve size iletilir. Yoğunluk durumuna göre bu süre nadiren 48 saate kadar uzayabilir.
                </p>
              </div>
              
              <div className="bg-[#1E1E3A]/50 rounded-xl p-6 border border-[#4A287D]/30">
                <h3 className="text-xl font-semibold text-white mb-2">Rüya yorumu hizmetiniz ücretli mi?</h3>
                <p className="text-white/70">
                  Evet, profesyonel rüya yorumu hizmetimiz ücretlidir. Detaylı ve kişiselleştirilmiş yorum alabilmeniz için uzmanlarımız her bir rüyaya özel zaman ayırmaktadır.
                </p>
              </div>
              
              <div className="bg-[#1E1E3A]/50 rounded-xl p-6 border border-[#4A287D]/30">
                <h3 className="text-xl font-semibold text-white mb-2">Rüyamı ne kadar detaylı anlatmalıyım?</h3>
                <p className="text-white/70">
                  Rüyanızı mümkün olduğunca detaylı anlatmanız, daha doğru ve kapsamlı bir yorum almanızı sağlar. Rüyadaki renkler, duygular, kişiler ve olayların akışı gibi detaylar önemlidir.
                </p>
              </div>
              
              <div className="bg-[#1E1E3A]/50 rounded-xl p-6 border border-[#4A287D]/30">
                <h3 className="text-xl font-semibold text-white mb-2">Hangi konular hakkında rüya yorumları yapıyorsunuz?</h3>
                <p className="text-white/70">
                  Her türlü rüya için yorum hizmeti sunuyoruz. Kabus, tekrarlayan rüyalar, sembolik rüyalar, öngörü rüyaları ve daha fazlası için uzmanlarımız sizin için hazır.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA - Çağrı */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto bg-gradient-to-r from-[#2A1C5A] to-[#4A287D] rounded-2xl p-10 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('/images/stars-bg.png')] bg-repeat"></div>
          </div>
          
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-[#FFD700] mb-4">
              Rüyanızın Sırlarını Keşfetmeye Hazır mısınız?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Bilinçaltınızın size iletmek istediği mesajları, deneyimli astrologlarımızın yorumlarıyla keşfedin.
            </p>
            
            <Button 
              variant="gradient" 
              size="lg"
              onClick={() => router.push('/ruya-yorumu/yorum-al')}
              className="group"
            >
              <span>Hemen Rüya Yorumu Al</span>
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  )
} 