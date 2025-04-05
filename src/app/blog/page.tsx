'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CalendarDays, Clock, User, ChevronRight, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Örnek blog yazıları
const blogPosts = [
  {
    id: 1,
    title: 'Rüya Yorumlarında Sık Görülen Semboller ve Anlamları',
    excerpt: 'Rüyalarınızda sık görülen semboller ve bunların hayatınızla olan bağlantıları hakkında kapsamlı bir rehber.',
    image: '/images/blog/dreams.jpg',
    category: 'Rüya Yorumu',
    date: '15 Mart 2023',
    readTime: '8 dk okuma',
    author: 'Ayşe Yıldız',
    slug: 'ruya-yorumlarinda-sik-gorulen-semboller'
  },
  {
    id: 2,
    title: 'Tarot Falında Major Arkana Kartlarının Gizli Anlamları',
    excerpt: 'Tarot destesinin en güçlü kartları olan Major Arkana kartlarının derin ve gizli anlamlarını keşfedin.',
    image: '/images/blog/tarot.jpg',
    category: 'Tarot Falı',
    date: '22 Şubat 2023',
    readTime: '10 dk okuma',
    author: 'Mehmet Kara',
    slug: 'tarot-falinda-major-arkana-kartlarinin-gizli-anlamlari'
  },
  {
    id: 3,
    title: 'Burçların 2023 Yılı Astrolojik Yorumları',
    excerpt: 'Her burç için detaylı 2023 yılı yorumları. Gezegenlerin konumları ve etkilerini içeren kapsamlı analiz.',
    image: '/images/blog/zodiac.jpg',
    category: 'Astroloji',
    date: '5 Ocak 2023',
    readTime: '15 dk okuma',
    author: 'Zeynep Aydın',
    slug: 'burclarin-2023-yili-astrolojik-yorumlari'
  },
  {
    id: 4,
    title: 'Kahve Falında Fincan Nasıl Tutulur ve Çevrilir?',
    excerpt: 'Doğru kahve falı baktırmak için fincanınızı nasıl tutmanız ve çevirmeniz gerektiğini öğrenin.',
    image: '/images/blog/coffee.jpg',
    category: 'Kahve Falı',
    date: '18 Aralık 2022',
    readTime: '6 dk okuma',
    author: 'Ali Demir',
    slug: 'kahve-falinda-fincan-nasil-tutulur-ve-cevrilir'
  },
  {
    id: 5,
    title: 'Katina Falı Nedir ve Nasıl Yorumlanır?',
    excerpt: 'Antik Yunan kehanet sistemi olan Katina falı hakkında detaylı bilgiler ve yorum teknikleri.',
    image: '/images/blog/katina.jpg',
    category: 'Katina Falı',
    date: '3 Kasım 2022',
    readTime: '9 dk okuma',
    author: 'Selin Yılmaz',
    slug: 'katina-fali-nedir-ve-nasil-yorumlanir'
  }
]

// Örnek kategoriler
const categories = [
  { name: 'Astroloji', count: 12 },
  { name: 'Rüya Yorumu', count: 18 },
  { name: 'Tarot Falı', count: 8 },
  { name: 'Kahve Falı', count: 10 },
  { name: 'Katina Falı', count: 6 },
  { name: 'Burçlar', count: 15 }
]

export default function BlogPage() {
  return (
    <div className="flex justify-center w-full py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#FFD700] pulse-glow">
            Blog
          </h1>
          <p className="text-lg max-w-3xl mx-auto text-white/80">
            Astroloji, rüya yorumları, tarot, kahve falı ve daha fazlası hakkında 
            bilgilendirici ve ilham verici içerikler
          </p>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ana İçerik */}
          <motion.div 
            className="lg:col-span-2 space-y-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Arama Çubuğu */}
            <div className="relative">
              <input
                type="text"
                placeholder="Blog yazılarında ara..."
                className="w-full py-3 px-5 pl-12 bg-black/30 border border-white/10 rounded-full focus:border-[#FFD700]/50 focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20 text-white placeholder-white/50"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50" size={18} />
            </div>

            {/* Blog Yazıları */}
            <div className="space-y-8">
              {blogPosts.map((post) => (
                <motion.article 
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: post.id * 0.1 }}
                  className="mystical-card rounded-xl overflow-hidden flex flex-col md:flex-row"
                >
                  {/* Görselsiz versiyonu yorum olarak ekledim */}
                  {/* <div className="w-full md:w-1/3 aspect-video md:aspect-auto relative bg-gradient-to-br from-[#111133]/70 to-[#702963]/30">
                    <div className="flex items-center justify-center h-full p-6 md:p-8">
                      <div className="p-4 rounded-full bg-[#702963]/30 backdrop-blur-md border border-[#702963]/50">
                        <div className="w-12 h-12 flex items-center justify-center">
                          {post.category === 'Rüya Yorumu' && <Moon className="text-[#F0F0F0]" size={30} />}
                          {post.category === 'Tarot Falı' && <Sparkles className="text-[#FFD700]" size={30} />}
                          {post.category === 'Astroloji' && <Star className="text-[#FFD700]" size={30} />}
                          {post.category === 'Kahve Falı' && <Coffee className="text-[#D4AF37]" size={30} />}
                          {post.category === 'Katina Falı' && <BookOpen className="text-[#4A7AFF]" size={30} />}
                        </div>
                      </div>
                    </div>
                  </div> */}
                  
                  <div className="p-6 md:p-8 w-full md:w-2/3">
                    <span className="inline-block px-3 py-1 bg-[#702963]/30 text-[#FFD700] text-xs font-semibold rounded-full mb-3">
                      {post.category}
                    </span>
                    <Link href={`/blog/${post.slug}`}>
                      <h2 className="text-xl md:text-2xl font-bold mb-3 text-white hover:text-[#FFD700] transition-colors">
                        {post.title}
                      </h2>
                    </Link>
                    <p className="text-white/70 text-sm mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap items-center text-xs text-white/60 space-x-4 mb-4">
                      <div className="flex items-center">
                        <User size={14} className="mr-1" />
                        {post.author}
                      </div>
                      <div className="flex items-center">
                        <CalendarDays size={14} className="mr-1" />
                        {post.date}
                      </div>
                      <div className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                    <Link href={`/blog/${post.slug}`} className="inline-flex items-center text-[#9370DB] hover:text-[#FFD700] text-sm">
                      Devamını Oku <ChevronRight size={16} className="ml-1" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* Sayfalama */}
            <div className="flex justify-center mt-12">
              <nav className="flex space-x-2" aria-label="Sayfalama">
                <Button variant="outline" size="sm" className="border-white/10 text-white/70">
                  Önceki
                </Button>
                <Button variant="cosmic" size="sm">1</Button>
                <Button variant="outline" size="sm" className="border-white/10 text-white/70">2</Button>
                <Button variant="outline" size="sm" className="border-white/10 text-white/70">3</Button>
                <Button variant="outline" size="sm" className="border-white/10 text-white/70">
                  Sonraki
                </Button>
              </nav>
            </div>
          </motion.div>

          {/* Yan Sütun */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            {/* Kategoriler */}
            <div className="mystical-card rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 text-[#FFD700]">Kategoriler</h3>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category.name} className="border-b border-white/10 last:border-none">
                    <Link 
                      href={`/blog/kategori/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className="flex justify-between items-center py-2 text-white/80 hover:text-[#FFD700] transition-colors"
                    >
                      <span>{category.name}</span>
                      <span className="bg-black/30 px-2 py-1 text-xs rounded-full text-white/60">
                        {category.count}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Popüler Yazılar */}
            <div className="mystical-card rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 text-[#FFD700]">Popüler Yazılar</h3>
              <div className="space-y-4">
                {blogPosts.slice(0, 3).map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`} className="block">
                    <div className="flex items-start space-x-3 group">
                      <div className="shrink-0 w-16 h-16 rounded-md bg-gradient-to-br from-[#111133]/70 to-[#702963]/30 flex items-center justify-center">
                        <span className="text-3xl text-[#FFD700]">
                          {post.id}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white group-hover:text-[#FFD700] transition-colors">
                          {post.title}
                        </h4>
                        <p className="text-xs text-white/50 mt-1">{post.date}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Bülten */}
            <div className="mystical-card rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 text-[#FFD700]">Bültenimize Abone Olun</h3>
              <p className="text-sm text-white/80 mb-4">
                En yeni blog yazılarımızdan, fallarımızdan ve etkinliklerimizden haberdar olmak için abone olun.
              </p>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="E-posta adresiniz"
                  className="w-full py-2 px-4 bg-black/30 border border-white/10 rounded-md focus:border-[#FFD700]/50 focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20 text-white placeholder-white/50"
                />
                <Button className="w-full" variant="gradient">
                  Abone Ol
                </Button>
              </form>
            </div>

            {/* Etiketler */}
            <div className="mystical-card rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 text-[#FFD700]">Etiketler</h3>
              <div className="flex flex-wrap gap-2">
                {['Astroloji', 'Rüya', 'Tarot', 'Kahve Falı', 'Burçlar', 'Gezegenler', 'Yıldızlar', 'Meditasyon', 'Enerji', 'Feng Shui', 'Şifa', 'Taşlar'].map((tag) => (
                  <Link 
                    key={tag} 
                    href={`/blog/etiket/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                    className="px-3 py-1 text-xs rounded-full bg-black/30 border border-white/10 text-white/70 hover:bg-[#702963]/30 hover:text-white hover:border-[#702963]/50 transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 