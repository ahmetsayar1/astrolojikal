import type { Config } from "tailwindcss"

const config = {
  darkMode: "class",
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#FFD700",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Astroloji renkleri
        zodiac: {
          // Burç elementleri renkleri
          fire: "#FF6B6B",     // Ateş (Koç, Aslan, Yay)
          earth: "#4DAA57",    // Toprak (Boğa, Başak, Oğlak)
          air: "#4A7AFF",      // Hava (İkizler, Terazi, Kova)
          water: "#5F9EA0",    // Su (Yengeç, Akrep, Balık)
          
          // Gökyüzü ve gece renkleri
          night: "#111133",    // Gece gökyüzü
          dusk: "#483D8B",     // Alacakaranlık
          cosmic: "#1A1A2E",   // Kozmik arka plan
          
          // Gezegen renkleri
          sun: "#FFD700",      // Güneş
          moon: "#F0F0F0",     // Ay
          mercury: "#B5B8B1",  // Merkür
          venus: "#D4AF37",    // Venüs
          mars: "#A52A2A",     // Mars
          jupiter: "#FFA07A",  // Jüpiter
          saturn: "#8B4513",   // Satürn
          uranus: "#40E0D0",   // Uranüs
          neptune: "#0000CD",  // Neptün
          pluto: "#800080",    // Plüton
          
          // Mistik / Tarot renkleri
          mystical: "#9370DB", // Mistik mor
          tarot: "#702963",    // Tarot kartı
          crystal: "#B9D9EB",  // Kristal
          aura: "#CCCCFF",     // Aura
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        spotlight: {
          "0%": {
            opacity: "0",
            transform: "translate(-72%, -62%) rotate(0deg)",
          },
          "100%": {
            opacity: "0.8",
            transform: "translate(-72%, -62%) rotate(360deg)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        spotlight: "spotlight 2s ease .75s 1 forwards",
      },
      fontFamily: {
        zodiac: ['var(--font-zodiac)', 'serif'],
        mystical: ['var(--font-mystical)', 'serif'],
      },
      backgroundImage: {
        'stars': "url('/images/stars-bg.png')",
        'cosmic': "linear-gradient(to bottom, #0F172A, #1E293B)",
        'mystical': "linear-gradient(to right, #480048, #C04848)",
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config 