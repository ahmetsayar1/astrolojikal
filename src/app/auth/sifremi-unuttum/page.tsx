'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Mail, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { resetPassword } from '@/lib/auth'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { error } = await resetPassword(email)
      
      if (error) {
        setError(error.message || 'Şifre sıfırlama işlemi sırasında bir hata oluştu')
        setLoading(false)
        return
      }
      
      setSuccess(true)
    } catch (error) {
      console.error('Şifre sıfırlama hatası:', error)
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
          <Link href="/auth/giris" className="inline-flex items-center text-[#9370DB] hover:text-[#FFD700] mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span>Giriş Sayfasına Dön</span>
          </Link>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#FFD700]">Şifremi Unuttum</h1>
            <p className="mt-2 text-white/70">
              E-posta adresinizi girin, şifre sıfırlama bağlantısı göndereceğiz
            </p>
          </div>

          {success ? (
            <div className="bg-green-500/20 border border-green-500/50 text-white p-4 rounded-md text-sm mb-6">
              Şifre sıfırlama bağlantısı e-posta adresinize gönderildi. Lütfen e-postanızı kontrol edin.
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
                    Gönderiliyor...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Send className="mr-2" size={18} />
                    Sıfırlama Bağlantısı Gönder
                  </span>
                )}
              </Button>
            </form>
          )}

          <div className="mt-8 text-center">
            <p className="text-white/70 text-sm">
              Hesabınız yok mu?{' '}
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