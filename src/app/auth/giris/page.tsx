'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Eye, EyeOff, LogIn, Lock, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { signIn } from '@/lib/auth'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { user, error } = await signIn(email, password)
      
      if (error) {
        if (error.message === 'Invalid login credentials') {
          setError('E-posta veya şifre hatalı')
        } else if (error.message === 'Email not confirmed') {
          setError('Lütfen e-posta adresinizi onaylayın')
        } else {
          setError(error.message || 'Giriş yaparken bir hata oluştu')
        }
        setLoading(false)
        return
      }

      if (user) {
        router.push('/hesabim')
        router.refresh()
      }
    } catch (error) {
      console.error('Giriş hatası:', error)
      setError('Bir hata oluştu, lütfen daha sonra tekrar deneyin')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="w-full max-w-md mystical-card rounded-xl overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#FFD700]">Giriş Yap</h1>
            <p className="mt-2 text-white/70">
              Astrolojikal hesabınıza giriş yapın
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 text-white p-4 rounded-md text-sm">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div className="relative">
                <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-1">
                  E-posta Adresi
                </label>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full py-3 px-4 pl-10 bg-black/30 border border-white/10 rounded-md focus:border-[#FFD700]/50 focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20 text-white placeholder-white/50"
                    placeholder="ornekmail@gmail.com"
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={18} />
                </div>
              </div>

              <div className="relative">
                <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-1">
                  Şifre
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full py-3 px-4 pl-10 pr-10 bg-black/30 border border-white/10 rounded-md focus:border-[#FFD700]/50 focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20 text-white placeholder-white/50"
                    placeholder="Şifreniz"
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={18} />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 bg-black/30 border border-white/30 rounded focus:ring-[#FFD700]/20"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-white/70">
                  Beni Hatırla
                </label>
              </div>

              <div className="text-sm">
                <Link
                  href="/auth/sifremi-unuttum"
                  className="text-[#9370DB] hover:text-[#FFD700] transition-colors"
                >
                  Şifrenizi mi unuttunuz?
                </Link>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              variant="gradient"
              size="lg"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Giriş Yapılıyor...
                </span>
              ) : (
                <span className="flex items-center">
                  <LogIn className="mr-2" size={18} />
                  Giriş Yap
                </span>
              )}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-white/70 text-sm">
              Henüz hesabınız yok mu?{' '}
              <Link
                href="/auth/kayit"
                className="text-[#9370DB] hover:text-[#FFD700] transition-colors font-medium"
              >
                Hemen Kaydolun
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 