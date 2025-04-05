import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    // Supabase Server Client'ı oluştur
    const supabase = createServerClient();
    
    // readings tablosunu oluştur
    const { error: createError } = await supabase.rpc('create_readings_table');
    
    if (createError) {
      // RPC fonksiyonu mevcut değilse SQL sorgusu ile tablo oluştur
      const { error: sqlError } = await supabase.from('_sql').execute(`
        CREATE TABLE IF NOT EXISTS readings (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          user_id UUID NOT NULL REFERENCES auth.users(id),
          cards TEXT,
          question TEXT,
          birth_date DATE,
          reading JSONB,
          reading_type TEXT NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `);
      
      if (sqlError) {
        console.error('SQL ile tablo oluşturma hatası:', sqlError);
        return NextResponse.json({ 
          success: false, 
          error: sqlError.message 
        }, { status: 500 });
      }
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Readings tablosu başarıyla oluşturuldu veya zaten mevcut' 
    });
  } catch (error) {
    console.error('Tablo oluşturma hatası:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Tablo oluşturma sırasında bir hata oluştu' 
    }, { status: 500 });
  }
} 