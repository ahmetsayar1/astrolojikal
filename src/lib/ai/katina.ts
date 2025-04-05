import { GoogleGenerativeAI } from '@google/generative-ai'

// API anahtarını çevre değişkenlerinden al
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || ''
const genAI = new GoogleGenerativeAI(apiKey)

export type KatinaCard = {
  name: string
  image: string
  reversed?: boolean
  meaning?: {
    description: string
    upright: string
    reversed: string
  }
}

export type KatinaReadingResponse = {
  summary: string;
  cards: Array<{
    position: string;
    name: string;
    interpretation: string;
  }>;
  future: string;
  advice: string;
}

/**
 * Katina falı yorumu için Gemini AI'yi kullanır
 * @param cards Seçilen katina kartları
 * @param birthDate Doğum tarihi
 * @param question Sorulan soru
 * @returns Katina falı yorumunu içeren obje
 */
export async function interpretKatinaReading(
  cards: KatinaCard[],
  birthDate: string,
  question: string
): Promise<KatinaReadingResponse> {
  try {
    // Gemini modelini hazırla
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    // Burç hesaplama
    const zodiacSign = calculateZodiacSign(birthDate)

    // Kartların pozisyonları
    const cardPositions = [
      "Hayat Kartı (Merkezin Kartı)",
      "Artı Kartı",
      "Risk Kartı",
      "Geçmiş Kartı",
      "Taç Kartı",
      "Gelecek Kartı",
      "Durum Kartı",
      "Evrenin Kartı",
      "İstek ve Beklentilerin Kartı",
      "Sonuç Kartı"
    ]

    // Kart açıklamalarını oluştur
    const cardsInfo = cards.map((card, index) => {
      return {
        position: cardPositions[index],
        name: card.name,
        image: card.image,
        reversed: card.reversed,
        meaning: card.reversed ? (card.meaning?.reversed || "Bilinmiyor") : (card.meaning?.upright || "Bilinmiyor"),
        description: card.meaning?.description || "Bilinmiyor"
      }
    })

    // Prompt şablonu oluştur
    const prompt = `
    Sen deneyimli bir Katina falcısı ve astrologsun. "Kelth Haçı" (İmparator Artısı) yöntemini kullanarak Katina falı yorumu yapacaksın. Aşağıdaki bilgileri kullanarak kişiye özel bir Katina falı yorumu yap.
    
    SEÇİLEN KARTLAR:
    ${cardsInfo.map((card, index) => (
      `${index + 1}. ${card.position}: ${card.name} ${card.reversed ? '(Ters)' : '(Düz)'}\n` +
      `   Anlamı: ${card.meaning}\n` +
      `   Açıklaması: ${card.description}`
    )).join('\n\n')}
    
    KİŞİNİN BURCU: ${zodiacSign}
    
    SORULAN SORU: ${question}
    
    KARTLARIN AÇILIM ANLAMLARI:

    1.Nolu Kart (Hayat Kartı): İçinde bulunduğumuz durumu gösterir. Sorumuzla ilgili olarak, bizi neyin etkisi altına aldığını ve ne ile mücadele etmek zorunda olduğumuzu, mevcut durumu ifade eder.

    2.Nolu Kart (Artı Kartı): Bu kart bizi veya danışılan kişinin neyin böldüğünü gösterir. İçinde bulunulan durumun iyi ve kötü yanlarını anlatır. Mevcut koşulların yaratacağı sıkıntıları, endişeleri, ayrıca arayış yollarını, karşı koyuşları ve olumsuz çevrenin kişi üzerindeki etkisini anlatır.

    3.Nolu Kart (Risk Kartı): Sabitlenmenin kök salmanın kartıdır. Danışan veya danışılan kişi, nasıl bir zemine basıyor? Olayların yarattığı korku ve bu olaylarda rol oynamış ya da oynayacak kişilerin ve soruyu soran kişinin bizzat kendisinin arzuları ve korkuları durumu nasıl etkiliyor.

    4.Nolu Kart (Geçmiş Kartı): Geçmişte yaşanılanları simgeler. Olmuş bitmiş olayları, kişide nasıl izler bırakmış ve bugünlere nasıl ne şekilde gelmiş, yaşanılan yakın geçmişle ilgili bilgiler verir.

    5.Nolu Kart (Taç Kartı): Kişiyi neyin taçlandırıp, neyin yönettiğini anlatır. Etkilendiği kişinin kim olduğunu, içinde bulunulan durumun kişiye ne faydası olduğunu ve ona neler verebileceğini söyler. Yapması gerekenler hakkında bilgiler verir. Kişinin umutlarıyla ve korkularıyla bağlantılı olarak neler yapabileceğini, ne gibi yetkinliklere sahip olduğunu gösterir.

    6.Nolu Kart (Gelecek Kartı): Yakın geleceğe işaret eder. Çok yakında karşılaşılacak yenilikleri ve gelişmeleri gösterir.

    7.Nolu Kart (Durum Kartı): Bu kart kişiyi simgeler. Olayları ele alışını ve bugüne kadarki tavırlarını, mevcut halini anlatır. Dış etkenleri, engelleri, aslında kişinin kendisinin yaratmakta olduğu engelleri anlatır. Ve bu durumdan kurtularak başarıya ulaşması için ne yapılması gerektiğini ifade eder.

    8.Nolu Kart (Evrenin Kartı): Kişinin çevresindeki arkadaşları, akrabaları ve tavsiye verenleri simgeler. Yardımlara işaret eder. Danışanın iyi çevresi ve kötü çevresinde kimler var anlatır. Bu çevrenin sorulan soruya ilişkin nasıl bir etki göstereceğini anlatır. Neye dikkat edilmeli? Ne tarafa yönelmeli veyahut neyden ya da kimden sakınmalı? Bunu söyler.

    9.Nolu Kart (İstek ve Beklentilerin Kartı): Ümitlerin kartıdır. Arzulara, umutlara, korkulara ve ertelemelere işaret eder.

    10.Nolu Kart (Sonuç Kartı): Gelecekte ne olacak sorusuna en net cevabı veren karttır. Sorulan soru ne ise onun hakkında olumlu ya da olumsuz yanıt verir.
    
    Yanıtını SADECE aşağıdaki JSON formatında ver. JSON formatı dışında hiçbir metin yazma:
    
    {
      "summary": "Falın genel özeti ve sorunun kısa bir yanıtı (birkaç paragraf)",
      "cards": [
        {
          "position": "Hayat Kartı (Merkezin Kartı)",
          "name": "${cardsInfo[0].name}",
          "interpretation": "Bu kartın yorumu ve kişinin hayatındaki etkisi"
        },
        {
          "position": "Artı Kartı",
          "name": "${cardsInfo[1].name}",
          "interpretation": "Bu kartın yorumu ve kişinin hayatındaki etkisi"
        },
        {
          "position": "Risk Kartı",
          "name": "${cardsInfo[2].name}",
          "interpretation": "Bu kartın yorumu ve kişinin hayatındaki etkisi"
        },
        {
          "position": "Geçmiş Kartı",
          "name": "${cardsInfo[3].name}",
          "interpretation": "Bu kartın yorumu ve kişinin hayatındaki etkisi"
        },
        {
          "position": "Taç Kartı",
          "name": "${cardsInfo[4].name}",
          "interpretation": "Bu kartın yorumu ve kişinin hayatındaki etkisi"
        },
        {
          "position": "Gelecek Kartı",
          "name": "${cardsInfo[5].name}",
          "interpretation": "Bu kartın yorumu ve kişinin hayatındaki etkisi"
        },
        {
          "position": "Durum Kartı",
          "name": "${cardsInfo[6].name}",
          "interpretation": "Bu kartın yorumu ve kişinin hayatındaki etkisi"
        },
        {
          "position": "Evrenin Kartı",
          "name": "${cardsInfo[7].name}",
          "interpretation": "Bu kartın yorumu ve kişinin hayatındaki etkisi"
        },
        {
          "position": "İstek ve Beklentilerin Kartı",
          "name": "${cardsInfo[8].name}",
          "interpretation": "Bu kartın yorumu ve kişinin hayatındaki etkisi"
        },
        {
          "position": "Sonuç Kartı",
          "name": "${cardsInfo[9].name}",
          "interpretation": "Bu kartın yorumu ve kişinin hayatındaki etkisi"
        }
      ],
      "future": "Gelecek öngörüsü ve kişinin soru hakkındaki cevabı (en az bir paragraf)",
      "advice": "Kişiye özel tavsiyeler (madde madde en az 3 tavsiye)"
    }
    
    ÖNEMLİ NOTLAR:
    1. Yorumunu tamamen sorulan soruya odakla.
    2. Kişinin burcunun özelliklerini mutlaka yoruma dahil et.
    3. Anlaşılır ve pozitif bir dil kullan, korkutucu ifadelerden kaçın.
    4. Yorumunu en az 1-2 paragraf olacak şekilde detaylandır.
    5. JSON formatına kesinlikle uy, tüm alanları eksiksiz doldur.
    6. Yaratıcı ve kişiye özel bir yorum sağla.
    7. "Ters" gelen kartların olumsuz anlamlarını yorumlarında belirt.
    8. Kelth Haçı (İmparator Artısı) Açılım metodunun kurallarına göre yorumla.
    `

    // Gemini'den yanıt al
    const result = await model.generateContent(prompt)
    const response = result.response
    const text = response.text()

    // JSON formatında yanıt al
    try {
      // Markdown kod bloğundan JSON çıkar
      let jsonText = text
      // Eğer markdown kod bloğu olarak geldiyse temizle
      if (text.includes('```json')) {
        jsonText = text.replace(/```json\n|\n```/g, '')
      } else if (text.includes('```')) {
        jsonText = text.replace(/```\n|\n```/g, '')
      }
      
      const jsonResponse = JSON.parse(jsonText)
      return jsonResponse as KatinaReadingResponse
    } catch (error) {
      console.error('JSON çözümleme hatası:', error)
      console.error('API yanıtı:', text)
      throw new Error('Katina falı yorumu alınamadı. Lütfen daha sonra tekrar deneyin.')
    }

  } catch (error) {
    console.error('Katina falı yorumu alınamadı:', error)
    throw new Error('Katina falı yorumu alınamadı. Lütfen daha sonra tekrar deneyin.')
  }
}

/**
 * Doğum tarihine göre burç hesaplar
 * @param birthDateStr Doğum tarihi (YYYY-MM-DD formatında)
 * @returns Burç adı
 */
function calculateZodiacSign(birthDateStr: string): string {
  const birthDate = new Date(birthDateStr)
  const day = birthDate.getDate()
  const month = birthDate.getMonth() + 1 // JavaScript'te aylar 0-11 arası

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
    return "Koç"
  } else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
    return "Boğa"
  } else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
    return "İkizler"
  } else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
    return "Yengeç"
  } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
    return "Aslan"
  } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
    return "Başak"
  } else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
    return "Terazi"
  } else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
    return "Akrep"
  } else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
    return "Yay"
  } else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
    return "Oğlak"
  } else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
    return "Kova"
  } else {
    return "Balık"
  }
} 