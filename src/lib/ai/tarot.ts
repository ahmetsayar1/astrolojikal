import { GoogleGenerativeAI } from '@google/generative-ai';

// API anahtarını çevresel değişkenlerden al
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';

// Gemini AI istemcisini başlat
const genAI = new GoogleGenerativeAI(apiKey);

export type TarotCard = {
  name: string;
  suit?: string;
  image: string;
}

export type TarotReadingResponse = {
  summary: string;
  cards: Array<{
    position: string; // "Geçmiş", "Şimdiki Zaman", "Gelecek"
    name: string;
    interpretation: string;
  }>;
  relationship: string; // Kartların birbiriyle ilişkisi
  future: string; // Gelecek öngörüsü
  advice: string; // Tavsiyeler
  zodiacInfluence: string; // Burç etkisi
}

/**
 * Tarot falı yorumu için Gemini AI'yi kullanır
 * @param cards Seçilen tarot kartları
 * @param birthDate Doğum tarihi
 * @param question Sorulan soru
 * @returns Tarot falı yorumunu içeren obje
 */
export async function interpretTarotReading(
  cards: TarotCard[],
  birthDate: string,
  question: string
): Promise<TarotReadingResponse> {
  try {
    // Gemini modelini hazırla
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Burç hesaplama
    const zodiacSign = calculateZodiacSign(birthDate);

    // Kart listesini oluştur
    const pastCard = cards[0];
    const presentCard = cards[1];
    const futureCard = cards[2];

    // Prompt şablonu oluştur
    const prompt = `
    Sen deneyimli bir tarot falcısı ve astrologsun. Aşağıdaki bilgileri kullanarak kişiye özel bir tarot yorumu yapacaksın.
    
    SEÇİLEN KARTLAR:
    1. Geçmiş: ${pastCard.name} ${pastCard.suit ? `(${pastCard.suit})` : ''}
    2. Şimdiki Zaman: ${presentCard.name} ${presentCard.suit ? `(${presentCard.suit})` : ''}
    3. Gelecek: ${futureCard.name} ${futureCard.suit ? `(${futureCard.suit})` : ''}
    
    KİŞİNİN BURCU: ${zodiacSign}
    
    SORULAN SORU: ${question}
    
    Yanıtını SADECE aşağıdaki JSON formatında ver. JSON formatı dışında hiçbir metin yazma:
    
    {
      "summary": "Tarot falının genel özeti ve sorunun kısa bir yanıtı (1-2 cümle)",
      "cards": [
        {
          "position": "Geçmiş",
          "name": "${pastCard.name}",
          "interpretation": "Bu kartın geçmiş pozisyonundaki anlamı ve kişinin hayatındaki etkisi"
        },
        {
          "position": "Şimdiki Zaman",
          "name": "${presentCard.name}",
          "interpretation": "Bu kartın şimdiki zaman pozisyonundaki anlamı ve kişinin mevcut durumuna etkisi"
        },
        {
          "position": "Gelecek",
          "name": "${futureCard.name}",
          "interpretation": "Bu kartın gelecek pozisyonundaki anlamı ve kişinin olası geleceğine etkisi"
        }
      ],
      "relationship": "Üç kartın birbiriyle ilişkisi ve oluşturdukları genel hikaye",
      "future": "Gelecek öngörüsü ve kişinin soru hakkındaki cevabı (en az bir paragraf)",
      "advice": "Kişiye özel tavsiyeler (madde madde en az 3 tavsiye)",
      "zodiacInfluence": "Kişinin burcunun tarot falı üzerindeki etkisi"
    }
    
    ÖNEMLİ NOTLAR:
    1. Yorumunu tamamen sorulan soruya odakla.
    2. Kişinin burcunun özelliklerini mutlaka yoruma dahil et.
    3. Anlaşılır ve pozitif bir dil kullan, korkutucu ifadelerden kaçın.
    4. Yorumunu en az 1-2 paragraf olacak şekilde detaylandır.
    5. JSON formatına kesinlikle uy, tüm alanları eksiksiz doldur.
    6. Yaratıcı ve kişiye özel bir yorum sağla.
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
      const parsedData = JSON.parse(jsonText) as TarotReadingResponse;
      
      // Eksik alanları kontrol et
      if (!parsedData.summary) parsedData.summary = "Tarot falı yorumu hazır.";
      if (!parsedData.cards || !Array.isArray(parsedData.cards)) parsedData.cards = [];
      if (!parsedData.relationship) parsedData.relationship = "Kartlar arasında güçlü bir bağlantı görünüyor.";
      if (!parsedData.future) parsedData.future = "Gelecek, seçimlerinizle şekillenecektir.";
      if (!parsedData.advice) parsedData.advice = "Sezgilerinize güvenin ve kalbinizin sesini dinleyin.";
      if (!parsedData.zodiacInfluence) parsedData.zodiacInfluence = `${zodiacSign} burcunun özellikleri bu yorumu etkilemektedir.`;
      
      return parsedData;
    } catch (parseError) {
      console.error('JSON parse hatası:', parseError, 'Alınan metin:', text);
      
      // Fallback olarak bir yanıt oluştur
      return {
        summary: "Tarot falı yorumlanırken bir hata oluştu.",
        cards: [
          { position: "Geçmiş", name: pastCard.name, interpretation: "Kart yorumlanamadı." },
          { position: "Şimdiki Zaman", name: presentCard.name, interpretation: "Kart yorumlanamadı." },
          { position: "Gelecek", name: futureCard.name, interpretation: "Kart yorumlanamadı." }
        ],
        relationship: "Kartlar arasındaki ilişki yorumlanamadı.",
        future: "Gelecek öngörüsü oluşturulamadı.",
        advice: "Teknik bir hatadan dolayı tavsiye verilemiyor.",
        zodiacInfluence: `${zodiacSign} burcunuzun etkisi hesaplanamadı.`
      };
    }
  } catch (error) {
    console.error('Tarot falı yorumlama hatası:', error);
    throw new Error('Tarot falı yorumlanırken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
  }
}

/**
 * Doğum tarihinden burç hesaplar
 */
function calculateZodiacSign(birthDate: string): string {
  const date = new Date(birthDate);
  const day = date.getDate();
  const month = date.getMonth() + 1; // JavaScript ayları 0'dan başlar
  
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Kova";
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "Balık";
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Koç";
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Boğa";
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "İkizler";
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Yengeç";
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Aslan";
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Başak";
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Terazi";
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Akrep";
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Yay";
  return "Oğlak"; // (month === 12 && day >= 22) || (month === 1 && day <= 19)
} 