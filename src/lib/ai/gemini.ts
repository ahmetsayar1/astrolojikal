import { GoogleGenerativeAI } from '@google/generative-ai';

// API anahtarını çevresel değişkenlerden al
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';

// Gemini AI istemcisini başlat
const genAI = new GoogleGenerativeAI(apiKey);

type DreamInterpretationResponse = {
  summary: string;
  interpretation: string;
  symbols: {
    name: string;
    meaning: string;
    emoji: string;
  }[];
  emotions: {
    name: string;
    impact: string;
  }[];
  guidance: string;
}

/**
 * Rüya yorumu için Gemini AI'yi kullanır
 * @param dreamDescription Rüyanın detaylı açıklaması
 * @param emotions Rüyada hissedilen duygular
 * @returns Yorumlanmış rüya bilgilerini içeren obje
 */
export async function interpretDream(
  dreamDescription: string,
  emotions: string[]
): Promise<DreamInterpretationResponse> {
  try {
    // Gemini modelini hazırla - Eski: gemini-2-0-flash, Yeni: gemini-1.5-flash
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    // Prompt şablonu oluştur - JSON yapısını ve emoji gerekliliğini vurgula
    const prompt = `
    Sen deneyimli bir rüya yorumcusu ve astrolog olarak çalışıyorsun. Aşağıdaki rüyayı analiz edip yorumlayacaksın.
    
    RüYA AÇIKLAMASI:
    ${dreamDescription}
    
    HİSSEDİLEN DUYGULAR:
    ${emotions.join(', ')}
    
    Analiz sonucunu SADECE aşağıdaki JSON formatında döndür. JSON formatı dışında hiçbir metin yazma:
    
    {
      "interpretation": "Rüyanın genel anlamı ve yorumu (en az 3 paragraf)",
      "symbols": [
        {
          "name": "Rüyada geçen sembol 1",
          "meaning": "Bu sembolün anlamı ve psikolojik/spiritüel yorumu",
          "emoji": "Sembolü en iyi temsil eden tek bir emoji"
        },
        {
          "name": "Rüyada geçen sembol 2",
          "meaning": "Bu sembolün anlamı ve psikolojik/spiritüel yorumu",
          "emoji": "Sembolü en iyi temsil eden tek bir emoji"
        }
        // Rüyada en az 3-5 sembol belirle, her birine uygun bir emoji ekle
      ],
      "emotions": [
        {
          "name": "Duygu 1",
          "impact": "Bu duygunun rüyadaki etkisi ve anlam"
        },
        {
          "name": "Duygu 2",
          "impact": "Bu duygunun rüyadaki etkisi ve anlam"
        }
        // Kullanıcının belirttiği duyguları analiz et
      ],
      "guidance": "Rüya ile ilgili tavsiye, öneri ve yönlendirme",
      "summary": "Rüyanın tek bir cümlelik özeti"
    }
    
    ÖNEMLİ NOTLAR:
    1. Yanıtını SADECE JSON formatında ver. Açıklama, giriş veya kapanış cümlesi ekleme.
    2. Her sembol için MUTLAKA bir emoji ekle (emoji özelliği zorunludur).
    3. JSON formatının geçerli olduğundan emin ol, ekstra virgül veya sözdizimi hatası olmamalı.
    4. JSON dışında hiçbir karakter veya metin olmamalı.
    5. Yaratıcı, derin ve anlamlı bir rüya yorumu oluştur.
    6. Akademik ya da psikolojik terimler yerine spiritüel ve kolay anlaşılır bir dil kullan.
    `;

    // Gemini'den yanıt al
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // JSON metnini çıkar ve parse et
    try {
      // Bazen AI düz metin yanıtı verebilir, bu durumda JSON formatını çıkarmamız gerekir
      let jsonText = text;
      
      // Eğer yanıt JSON formatında değilse, JSON bloğunu bulmaya çalış
      if (!text.trim().startsWith('{')) {
        const jsonStartIndex = text.indexOf('{');
        const jsonEndIndex = text.lastIndexOf('}') + 1;
        
        if (jsonStartIndex !== -1 && jsonEndIndex !== -1) {
          jsonText = text.substring(jsonStartIndex, jsonEndIndex);
        } else {
          throw new Error('API yanıtında geçerli JSON formatı bulunamadı');
        }
      }
      
      // JSON'ı parse et
      const parsedData = JSON.parse(jsonText) as DreamInterpretationResponse;
      
      // Eksik alanları kontrol et
      if (!parsedData.summary) parsedData.summary = "Rüyanın özeti";
      if (!parsedData.interpretation) parsedData.interpretation = "Rüya yorumu yapılamadı.";
      if (!parsedData.symbols || !Array.isArray(parsedData.symbols)) parsedData.symbols = [];
      
      // Semboller için eksik emoji kontrolü
      parsedData.symbols = parsedData.symbols.map(symbol => {
        if (!symbol.emoji) {
          // Sembol türüne göre varsayılan emojiler
          const defaultEmojis: {[key: string]: string} = {
            'su': '💧', 'deniz': '🌊', 'gökyüzü': '🌌', 'yıldız': '⭐', 
            'ağaç': '🌳', 'güneş': '☀️', 'ay': '🌙', 'ev': '🏠',
            'araba': '🚗', 'uçak': '✈️', 'insan': '👤', 'hayvan': '🐾',
            'kuş': '🦅', 'yılan': '🐍', 'dağ': '⛰️', 'yol': '🛣️',
            'kapı': '🚪', 'anahtar': '🔑', 'kitap': '📚', 'kalem': '✏️'
          };
          
          // Sembol adına göre emoji bul
          const lowerName = symbol.name.toLowerCase();
          for (const [key, emoji] of Object.entries(defaultEmojis)) {
            if (lowerName.includes(key)) {
              return {...symbol, emoji};
            }
          }
          
          // Hiçbiri eşleşmezse genel bir emoji kullan
          return {...symbol, emoji: '✨'};
        }
        return symbol;
      });
      
      if (!parsedData.emotions || !Array.isArray(parsedData.emotions)) parsedData.emotions = [];
      if (!parsedData.guidance) parsedData.guidance = "Tavsiye bulunmuyor.";
      
      return parsedData;
    } catch (parseError) {
      console.error('JSON parse hatası:', parseError, 'Alınan metin:', text);
      
      // Fallback olarak bir yanıt oluştur
      return {
        summary: "Rüya yorumu oluşturulurken bir hata oluştu.",
        interpretation: "Üzgünüz, rüya yorumu işlenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.",
        symbols: [
          { name: "Hata", meaning: "Rüya yorumlama sisteminde geçici bir sorun oluştu.", emoji: "⚠️" },
          { name: "Teknik Sorun", meaning: "Yapay zeka yanıtı işlenirken teknik bir problem oluştu.", emoji: "🔧" }
        ],
        emotions: [{ name: "Belirsiz", impact: "Rüyanızdaki duygular analiz edilemedi." }],
        guidance: "Lütfen daha sonra tekrar deneyiniz."
      };
    }
  } catch (error) {
    console.error('Rüya yorumlama hatası:', error);
    throw new Error('Rüya yorumlanırken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
  }
} 