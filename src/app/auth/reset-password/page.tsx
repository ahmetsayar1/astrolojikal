'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Lock, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { updatePassword } from '@/lib/auth'

export default function ResetPasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (password !== confirmPassword) {
      setError('Şifreler eşleşmiyor')
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır')
      setLoading(false)
      return
    }

    try {
      const { error } = await updatePassword(password)
      
      if (error) {
        setError(error.message || 'Şifre güncelleme işlemi sırasında bir hata oluştu')
        setLoading(false)
        return
      }
      
      setSuccess(true)
      setTimeout(() => {
        router.push('/auth/giris')
      }, 3000)
    } catch (error) {
      console.error('Şifre güncelleme hatası:', error)
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
            <h1 className="text-3xl font-bold text-[#FFD700]">Şifre Sıfırlama</h1>
            <p className="mt-2 text-white/70">
              Yeni şifrenizi belirleyin
            </p>
          </div>

          {success ? (
            <div className="bg-green-500/20 border border-green-500/50 text-white p-6 rounded-md text-center">
              <Shield className="mx-auto h-12 w-12 text-green-400 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Şifreniz Güncellendi!</h2>
              <p className="mb-4">Şifreniz başarıyla güncellenmiştir. Giriş sayfasına yönlendiriliyorsunuz...</p>
              <Button
                onClick={() => router.push('/auth/giris')}
                variant="gradient"
                size="sm"
                className="mt-2"
              >
                Giriş Sayfasına Git
              </Button>
            </div>
          ) : (
            <form onSubmit={handleResetPassword} className="space-y-6">
              {error && (
                <div className="bg-red-500/20 border border-red-500/50 text-white p-4 rounded-md text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <div className="relative">
                  <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-1">
                    Yeni Şifre
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full py-3 px-4 pl-10 pr-10 bg-black/30 border border-white/10 rounded-md focus:border-[#FFD700]/50 focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20 text-white placeholder-white/50"
                      placeholder="En az 6 karakter"
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

                <div className="relative">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-white/80 mb-1">
                    Şifre Tekrar
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full py-3 px-4 pl-10 pr-10 bg-black/30 border border-white/10 rounded-md focus:border-[#FFD700]/50 focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20 text-white placeholder-white/50"
                      placeholder="Şifrenizi tekrar girin"
                    />
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={18} />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
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
                    İşlem Yapılıyor...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Shield className="mr-2" size={18} />
                    Şifreyi Güncelle
                  </span>
                )}
              </Button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  )
} 