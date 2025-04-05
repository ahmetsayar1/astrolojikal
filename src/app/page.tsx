'use client'

import Image from "next/image";
import Link from "next/link";
import { SplineScene } from "@/components/ui/spline";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Vortex } from "@/components/ui/vortex";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const hizmetler = [
  {
    image: "/images/ruya-yorulama-servis.png",
    title: 'Rüya Yorumu',
    description: 'Rüyalarınızdaki gizli anlamları keşfedin, bilinçaltınızın mesajlarını çözümleyin.',
    href: '/ruya-yorumu',
    area: 'md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]'
  },
  {
    image: "/images/tarot-fali-servis.png",
    title: 'Tarot Falı',
    description: 'Tarot kartlarının rehberliğinde geleceğinize ışık tutun, sorularınıza cevap bulun.',
    href: '/tarot-fali',
    area: 'md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]'
  },
  {
    image: "/images/katina-fali-servis.png",
    title: 'Katina Falı',
    description: 'Kadim bilgelikle donatılmış Katina kartları ile yaşamınızdaki gizli potansiyeli keşfedin.',
    href: '/katina-fali',
    area: 'md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]'
  },
  {
    image: "/images/kahve-fali-servis.png",
    title: 'Kahve Falı',
    description: 'Fincanınızın içindeki şekillerin sırlarını çözün, geleceğinizi aydınlatın.',
    href: '/kahve-fali',
    area: 'md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]'
  }
]

export default function Home() {
  return (
    <div className="relative">
      {/* Tüm sayfayı kaplayan Vortex arka planı */}
      <Vortex 
        backgroundColor="#000000" 
        baseHue={50} 
        rangeY={200}
        particleCount={300}
        baseSpeed={0.1}
        rangeSpeed={0.6}
        baseRadius={0.8}
        rangeRadius={1.5}
        containerClassName="fixed inset-0 z-[-1]"
      />
      
      <div className="flex flex-col gap-20 relative z-10">
        {/* Hero Section */}
        <section className="relative h-[90vh] overflow-hidden">
          <div className="flex h-full">
            {/* Sol içerik */}
            <div className="flex-1 p-8 relative z-10 flex flex-col justify-center">
              <h1 className="text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 mb-6">
                Geleceğinizi<br />Keşfedin
              </h1>
              <p className="mt-4 text-neutral-300 max-w-lg text-lg md:text-xl">
                Rüya yorumu, tarot falı, kahve falı ve astroloji hizmetleri ile hayatınızdaki gizli anlamları çözün.
              </p>
              <div className="flex gap-4 mt-8">
                <Link
                  href="/hizmetler"
                  className="rounded-full bg-[#FFD700] px-8 py-3 text-lg font-semibold text-background transition-transform hover:scale-105"
                >
                  Hizmetlerimiz
                </Link>
                <Link
                  href="/hakkimizda"
                  className="rounded-full border border-[#FFD700] px-8 py-3 text-lg font-semibold text-[#FFD700] transition-transform hover:scale-105"
                >
                  Hakkımızda
                </Link>
              </div>
            </div>

            {/* Sağ içerik */}
            <div className="flex-1 relative hidden md:block">
              <SplineScene 
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </div>
          </div>
        </section>

        {/* Hizmetler Section */}
        <section id="hizmetler" className="container mx-auto px-4 py-16 relative rounded-3xl backdrop-blur-sm bg-black/20">
          <h2 className="mb-12 text-center text-3xl font-bold text-[#FFD700] md:text-4xl">
            Sunduğumuz Hizmetler
          </h2>
          <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-2 lg:gap-4 xl:max-h-[34rem]">
            {hizmetler.map((hizmet) => (
              <li key={hizmet.title} className={cn("min-h-[14rem] list-none", hizmet.area)}>
                <Link href={hizmet.href} className="block h-full">
                  <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-border p-2 md:rounded-[1.5rem] md:p-3">
                    <GlowingEffect
                      spread={40}
                      glow={true}
                      disabled={false}
                      proximity={64}
                      inactiveZone={0.01}
                      borderWidth={3}
                    />
                    <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] bg-black/60 backdrop-blur-sm p-6 shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)] md:p-6">
                      <div className="relative flex flex-1 flex-col justify-between gap-3">
                        <div className="w-fit mb-3">
                          <Image
                            src={hizmet.image}
                            alt={hizmet.title}
                            width={80}
                            height={80}
                            className="h-16 w-16 object-contain image-float"
                          />
                        </div>
                        <div className="space-y-3">
                          <h3 className="pt-0.5 text-xl leading-[1.375rem] font-semibold font-sans tracking-[-0.04em] md:text-2xl md:leading-[1.875rem] text-balance text-[#FFD700]">
                            {hizmet.title}
                          </h3>
                          <h2 className="[&_b]:md:font-semibold [&_strong]:md:font-semibold font-sans text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem] text-muted-foreground">
                            {hizmet.description}
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* CTA Section */}
        <section id="cta" className="container mx-auto px-4 py-16 mb-20">
          <div className="relative overflow-hidden rounded-2xl bg-black/40 backdrop-blur-sm p-8 md:p-12 lg:p-16">
            <div className="relative z-10">
              <h2 className="mb-6 text-center text-3xl font-bold text-[#FFD700] md:text-4xl">
                Geleceğinizi Şekillendirin
              </h2>
              <p className="mb-8 text-center text-lg text-foreground/80">
                Uzman yorumcularımız ile hayatınızdaki sorulara cevap bulun.
              </p>
              <div className="flex justify-center">
                <Link
                  href="/uye-ol"
                  className="rounded-full bg-[#FFD700] px-8 py-3 text-lg font-semibold text-background transition-transform hover:scale-105"
                >
                  Hemen Başlayın
                </Link>
              </div>
            </div>
            <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-[#9370DB] opacity-20 blur-3xl" />
            <div className="absolute -bottom-12 -left-12 h-64 w-64 rounded-full bg-[#FFD700] opacity-20 blur-3xl" />
          </div>
        </section>
      </div>
      
      {/* Aşağıya indikçe renkleri değiştiren ek Vortex bileşenleri */}
      <Vortex 
        backgroundColor="transparent" 
        baseHue={270} // Mor
        rangeY={200}
        particleCount={100}
        baseSpeed={0.05}
        rangeSpeed={0.4}
        baseRadius={0.5}
        rangeRadius={1.0}
        containerClassName="fixed inset-0 z-[-2] opacity-0 transition-opacity duration-1000"
        className="scroll-color-change"
        id="vortex-mor"
      />
      
      <Vortex 
        backgroundColor="transparent" 
        baseHue={220} // Mavi
        rangeY={200}
        particleCount={100}
        baseSpeed={0.05}
        rangeSpeed={0.4}
        baseRadius={0.5}
        rangeRadius={1.0}
        containerClassName="fixed inset-0 z-[-3] opacity-0 transition-opacity duration-1000"
        className="scroll-color-change"
        id="vortex-mavi"
      />
      
      {/* Scroll efekti için JavaScript */}
      <script dangerouslySetInnerHTML={{
        __html: `
          document.addEventListener('DOMContentLoaded', function() {
            const vortexMor = document.getElementById('vortex-mor');
            const vortexMavi = document.getElementById('vortex-mavi');
            
            window.addEventListener('scroll', function() {
              const scrollTop = window.scrollY;
              const docHeight = document.body.offsetHeight;
              const winHeight = window.innerHeight;
              const scrollPercent = scrollTop / (docHeight - winHeight);
              
              // İlk yarıda mor efekti görünür hale getir
              if (scrollPercent > 0.2 && scrollPercent < 0.6) {
                const opacity = Math.min((scrollPercent - 0.2) * 2.5, 1);
                vortexMor.style.opacity = opacity;
              } else if (scrollPercent <= 0.2) {
                vortexMor.style.opacity = 0;
              }
              
              // İkinci yarıda mavi efekti görünür hale getir
              if (scrollPercent > 0.5) {
                const opacity = Math.min((scrollPercent - 0.5) * 2, 1);
                vortexMavi.style.opacity = opacity;
              } else {
                vortexMavi.style.opacity = 0;
              }
            });
          });
        `
      }} />
    </div>
  );
}
