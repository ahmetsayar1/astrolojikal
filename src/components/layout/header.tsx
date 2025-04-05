'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { AnimeNavBar } from "@/components/ui/anime-navbar"
import { Home, BookOpen, Coffee, Moon, Sparkles, Star, Users, BookText, LogIn, UserCircle, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import useSupabase from '@/hooks/useSupabase'
import { motion, AnimatePresence } from 'framer-motion'

const navigation = [
  { name: 'Anasayfa', url: '/', icon: Home },
  { name: 'Servislerimiz', url: '/servislerimiz', icon: Star },
  { name: 'Rüya Yorumu', url: '/ruya-yorumu', icon: Moon },
  { name: 'Tarot Falı', url: '/tarot-fali', icon: Sparkles },
  { name: 'Katina Falı', url: '/katina-fali', icon: BookOpen },
  { name: 'Kahve Falı', url: '/kahve-fali', icon: Coffee },
  { name: 'Hakkımızda', url: '/hakkimizda', icon: Users },
  { name: 'Blog', url: '/blog', icon: BookText }
]

export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [activeItem, setActiveItem] = useState('Anasayfa')
  const { user, loading } = useSupabase()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const currentPath = pathname || '/'
    const current = navigation.find(item => item.url === currentPath || currentPath.startsWith(item.url + '/'))
    if (current) {
      setActiveItem(current.name)
    }
  }, [pathname])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev)
  }

  return (
    <>
      <motion.header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'py-2 bg-black/60 backdrop-blur-lg shadow-lg' : 'py-4'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="flex-1">
            <Link href="/" className="text-2xl font-bold text-[#FFD700] flex items-center">
              <span className="text-3xl mr-1">✨</span>
              <span className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-transparent bg-clip-text">
                Astrolojikal
              </span>
            </Link>
          </div>
          
          <div className="flex-1 flex justify-center">
            <div className="hidden md:block">
              <AnimeNavBar items={navigation} defaultActive={activeItem} />
            </div>
          </div>
          
          <div className="flex-1 flex justify-end items-center space-x-4">
            {loading ? (
              <div className="w-24 h-10 bg-white/10 rounded-full animate-pulse"></div>
            ) : user ? (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden sm:block"
              >
                <Button
                  variant="cosmic"
                  size="sm"
                  className="rounded-full px-4"
                  onClick={() => router.push('/hesabim')}
                >
                  <UserCircle className="mr-2 h-4 w-4" />
                  <span>Hesabım</span>
                </Button>
              </motion.div>
            ) : (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden sm:block"
              >
                <Button
                  variant="gradient"
                  size="sm"
                  className="rounded-full px-4"
                  onClick={() => router.push('/auth/giris')}
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  <span>Giriş Yap</span>
                </Button>
              </motion.div>
            )}
            
            <button 
              className="md:hidden p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              onClick={toggleMobileMenu}
              aria-label="Menü"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>
      
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-md" onClick={toggleMobileMenu} />
            
            <motion.div
              className="absolute top-[4.5rem] right-4 w-56 bg-gradient-to-b from-[#1E1E3A] to-[#111133] rounded-2xl shadow-lg overflow-hidden border border-white/10"
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-4">
                <div className="flex flex-col space-y-3">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.url}
                      className={`flex items-center p-2 rounded-lg ${
                        activeItem === item.name
                          ? 'bg-white/10 text-[#FFD700]'
                          : 'text-white/80 hover:bg-white/5'
                      }`}
                      onClick={() => {
                        setActiveItem(item.name)
                        setMobileMenuOpen(false)
                      }}
                    >
                      <item.icon size={18} className="mr-3" />
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </div>
                
                <div className="mt-6 pt-6 border-t border-white/10">
                  {user ? (
                    <Button
                      variant="cosmic"
                      size="sm"
                      className="w-full"
                      onClick={() => {
                        router.push('/hesabim')
                        setMobileMenuOpen(false)
                      }}
                    >
                      <UserCircle className="mr-2 h-4 w-4" />
                      <span>Hesabım</span>
                    </Button>
                  ) : (
                    <Button
                      variant="gradient"
                      size="sm"
                      className="w-full"
                      onClick={() => {
                        router.push('/auth/giris')
                        setMobileMenuOpen(false)
                      }}
                    >
                      <LogIn className="mr-2 h-4 w-4" />
                      <span>Giriş Yap</span>
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
} 