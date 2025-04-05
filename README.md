# Astrolojikal

Modern ve kullanıcı dostu bir astroloji ve fal uygulaması.

## Özellikler

- 🌙 Rüya Yorumları
- 🔮 Tarot Falı
- ⭐ Katina Falı
- 👤 Kullanıcı Profili
- 💫 Yapay Zeka Destekli Yorumlar

## Teknolojiler

- Next.js 14
- React
- TypeScript
- Tailwind CSS
- Supabase
- Framer Motion
- Google Gemini AI

## Kurulum

1. Repository'yi klonlayın:
```bash
git clone https://github.com/ahmetsayar1/astrolojikal.git
cd astrolojikal
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Gerekli çevre değişkenlerini ayarlayın:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
```

4. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

## Veritabanı Yapısı

Proje Supabase veritabanını kullanmaktadır. Aşağıdaki tablolar gereklidir:

- dream_interpretations
- tarot_readings
- katina_card_readings

SQL şemaları `database` klasöründe bulunabilir.

## Katkıda Bulunma

1. Bu repository'yi fork'layın
2. Feature branch'i oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit'leyin (`git commit -m 'Add some amazing feature'`)
4. Branch'inizi push'layın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## İletişim

Proje Sahibi - [@ahmetsayar1](https://github.com/ahmetsayar1)

Proje Linki: [https://github.com/ahmetsayar1/astrolojikal](https://github.com/ahmetsayar1/astrolojikal) 