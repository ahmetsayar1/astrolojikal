import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { interpretDream } from '@/lib/ai/gemini';

export async function POST(request: NextRequest) {
  try {
    // Supabase Server Client'ı oluştur
    const supabase = createServerClient();
    
    // Kullanıcı oturumunu kontrol et
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Oturum açmanız gerekiyor' },
        { status: 401 }
      );
    }

    // İstek gövdesini al
    const body = await request.json();
    const { dreamId } = body;

    if (!dreamId) {
      return NextResponse.json(
        { error: 'Rüya ID gereklidir' },
        { status: 400 }
      );
    }

    // Rüya kaydını veritabanından al
    const { data: dreamData, error: dreamError } = await supabase
      .from('dream_interpretations')
      .select('*')
      .eq('id', dreamId)
      .eq('user_id', session.user.id)
      .single();

    if (dreamError || !dreamData) {
      return NextResponse.json(
        { error: 'Rüya kaydı bulunamadı' },
        { status: 404 }
      );
    }

    // Rüya yorumunu kontrol et
    if (dreamData.interpretation) {
      // Yorum zaten varsa mevcut yorumu döndür
      return NextResponse.json({
        success: true,
        interpretation: JSON.parse(dreamData.interpretation)
      });
    }

    // Rüyayı yorumla
    const dreamDescription = dreamData.dream_description;
    const emotions = dreamData.metadata?.emotions || [];
    
    // API'den rüya yorumu al
    const interpretationResult = await interpretDream(dreamDescription, emotions);

    // Yorumu veritabanına kaydet
    const { error: updateError } = await supabase
      .from('dream_interpretations')
      .update({
        interpretation: JSON.stringify(interpretationResult),
        status: 'completed'
      })
      .eq('id', dreamId);

    if (updateError) {
      console.error('Rüya yorumu kaydedilemedi:', updateError);
      return NextResponse.json(
        { error: 'Rüya yorumu kaydedilemedi' },
        { status: 500 }
      );
    }

    // Başarılı sonuç döndür
    return NextResponse.json({
      success: true,
      interpretation: interpretationResult
    });
  } catch (error) {
    console.error('Rüya yorumu hatası:', error);
    return NextResponse.json(
      { error: 'Bir hata oluştu' },
      { status: 500 }
    );
  }
} 