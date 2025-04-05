import { TarotCard } from './ai/tarot';

/**
 * Tüm tarot kartlarını içeren array
 */
export const getAllTarotCards = (): TarotCard[] => {
  const majorArcana: TarotCard[] = [
    { name: "The Fool", image: "/images/tarot/Major_Kartlar/The_Fool.jpg" },
    { name: "The Magician", image: "/images/tarot/Major_Kartlar/The_Magician.jpg" },
    { name: "The High Priestess", image: "/images/tarot/Major_Kartlar/The_High_Priestess.jpg" },
    { name: "The Empress", image: "/images/tarot/Major_Kartlar/The_Empress.jpg" },
    { name: "The Emperor", image: "/images/tarot/Major_Kartlar/The_Emperor.jpg" },
    { name: "The Hierophant", image: "/images/tarot/Major_Kartlar/The_Hierophant.jpg" },
    { name: "The Lovers", image: "/images/tarot/Major_Kartlar/The_Lovers.png" },
    { name: "The Chariot", image: "/images/tarot/Major_Kartlar/The_Chariot.jpg" },
    { name: "Strength", image: "/images/tarot/Major_Kartlar/Strength.jpg" },
    { name: "The Hermit", image: "/images/tarot/Major_Kartlar/The_Hermit.jpg" },
    { name: "Wheel of Fortune", image: "/images/tarot/Major_Kartlar/Wheel_of_Fortune.jpg" },
    { name: "Justice", image: "/images/tarot/Major_Kartlar/Justice.jpg" },
    { name: "The Hanged Man", image: "/images/tarot/Major_Kartlar/The_Hanged_Man.jpg" },
    { name: "Death", image: "/images/tarot/Major_Kartlar/Death.jpg" },
    { name: "Temperance", image: "/images/tarot/Major_Kartlar/Temperance.jpg" },
    { name: "The Devil", image: "/images/tarot/Major_Kartlar/The_Devil.jpg" },
    { name: "The Tower", image: "/images/tarot/Major_Kartlar/The_Tower.jpg" },
    { name: "The Star", image: "/images/tarot/Major_Kartlar/The_Star.jpg" },
    { name: "The Moon", image: "/images/tarot/Major_Kartlar/The_Moon.jpg" },
    { name: "The Sun", image: "/images/tarot/Major_Kartlar/The_Sun.jpg" },
    { name: "Judgement", image: "/images/tarot/Major_Kartlar/Judgement.jpg" },
    { name: "The World", image: "/images/tarot/Major_Kartlar/The_World.jpg" }
  ];

  const cups: TarotCard[] = [
    { name: "Ace of Cups", suit: "Kupalar", image: "/images/tarot/Minor_Kartlar/Kupalar/Kupa_Asi.jpg" },
    { name: "Two of Cups", suit: "Kupalar", image: "/images/tarot/Minor_Kartlar/Kupalar/Kupa_ikilisi.jpg" },
    { name: "Three of Cups", suit: "Kupalar", image: "/images/tarot/Minor_Kartlar/Kupalar/Kupa_Uclusu.jpg" },
    { name: "Four of Cups", suit: "Kupalar", image: "/images/tarot/Minor_Kartlar/Kupalar/Kupa_Dortlusu.jpg" },
    { name: "Five of Cups", suit: "Kupalar", image: "/images/tarot/Minor_Kartlar/Kupalar/Kupa_Beslisi.jpg" },
    { name: "Six of Cups", suit: "Kupalar", image: "/images/tarot/Minor_Kartlar/Kupalar/Kupa_Altilisi.jpg" },
    { name: "Seven of Cups", suit: "Kupalar", image: "/images/tarot/Minor_Kartlar/Kupalar/Kupa_Yedilisi.jpg" },
    { name: "Eight of Cups", suit: "Kupalar", image: "/images/tarot/Minor_Kartlar/Kupalar/Kupa_Sekizlisi.jpg" },
    { name: "Nine of Cups", suit: "Kupalar", image: "/images/tarot/Minor_Kartlar/Kupalar/Kupa_Dokuzlusu.jpg" },
    { name: "Ten of Cups", suit: "Kupalar", image: "/images/tarot/Minor_Kartlar/Kupalar/Kupa_Onlusu.jpg" },
    { name: "Page of Cups", suit: "Kupalar", image: "/images/tarot/Minor_Kartlar/Kupalar/Page_Of_Cups.jpg" },
    { name: "Knight of Cups", suit: "Kupalar", image: "/images/tarot/Minor_Kartlar/Kupalar/Kupa_Sovalyesi.jpg" },
    { name: "Queen of Cups", suit: "Kupalar", image: "/images/tarot/Minor_Kartlar/Kupalar/Kupa_Kralicesi.jpg" },
    { name: "King of Cups", suit: "Kupalar", image: "/images/tarot/Minor_Kartlar/Kupalar/Kupa_Krali.jpg" }
  ];

  const swords: TarotCard[] = Array.from({ length: 14 }, (_, i) => {
    const num = i + 1;
    let name: string;
    
    if (num === 1) name = "Ace of Swords";
    else if (num === 11) name = "Page of Swords";
    else if (num === 12) name = "Knight of Swords";
    else if (num === 13) name = "Queen of Swords";
    else if (num === 14) name = "King of Swords";
    else name = `${getNumberName(num)} of Swords`;
    
    return {
      name,
      suit: "Kılıçlar",
      image: `/images/tarot/Minor_Kartlar/Kiliclar/Kilic_${num}.jpg`
    };
  });

  const wands: TarotCard[] = Array.from({ length: 14 }, (_, i) => {
    const num = i + 1;
    let name: string;
    
    if (num === 1) name = "Ace of Wands";
    else if (num === 11) name = "Page of Wands";
    else if (num === 12) name = "Knight of Wands";
    else if (num === 13) name = "Queen of Wands";
    else if (num === 14) name = "King of Wands";
    else name = `${getNumberName(num)} of Wands`;
    
    return {
      name,
      suit: "Değnekler",
      image: `/images/tarot/Minor_Kartlar/Degnekler/Degnek_${num}.jpg`
    };
  });

  const pentacles: TarotCard[] = Array.from({ length: 14 }, (_, i) => {
    const num = i + 1;
    let name: string;
    
    if (num === 1) name = "Ace of Pentacles";
    else if (num === 11) name = "Page of Pentacles";
    else if (num === 12) name = "Knight of Pentacles";
    else if (num === 13) name = "Queen of Pentacles";
    else if (num === 14) name = "King of Pentacles";
    else name = `${getNumberName(num)} of Pentacles`;
    
    return {
      name,
      suit: "Tilsımlar",
      image: `/images/tarot/Minor_Kartlar/Tilsimlar/Tilsim_${num}.jpg`
    };
  });

  return [...majorArcana, ...cups, ...swords, ...wands, ...pentacles];
};

/**
 * Sayıları ingilizce yazıya çevirir
 */
function getNumberName(num: number): string {
  switch(num) {
    case 2: return "Two";
    case 3: return "Three";
    case 4: return "Four";
    case 5: return "Five";
    case 6: return "Six";
    case 7: return "Seven";
    case 8: return "Eight";
    case 9: return "Nine";
    case 10: return "Ten";
    default: return num.toString();
  }
}

/**
 * Kartları karıştırır
 */
export function shuffleCards(cards: TarotCard[]): TarotCard[] {
  const shuffled = [...cards];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
} 