import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    // Supabase istemcisini oluştur
    const supabase = createServerClient();
    
    // Test verisi oluştur
    const testData = {
      user_id: '00000000-0000-0000-0000-000000000000', // Test kullanıcı ID'si
      dream_description: 'Bu bir test rüyasıdır',
      status: 'pending',
      payment_status: 'pending',
      metadata: { emotions: ['Mutluluk', 'Heyecan'] }
    };
    
    // Rüya yorumu ekle
    const { data, error } = await supabase
      .from('dream_interpretations')
      .insert([testData])
      .select();
      
    if (error) {
      console.error('Test ekleme hatası:', error);
      return NextResponse.json(
        { error: error.message, details: error.details, hint: error.hint, code: error.code },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      insertedData: data
    });
  } catch (error) {
    console.error('Test ekleme API hatası:', error);
    return NextResponse.json(
      { error: 'Bir hata oluştu', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
} 