import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    // Supabase istemcisini oluştur
    const supabase = createServerClient();
    
    // dream_interpretations tablosunun yapısını kontrol et
    const { data: tableInfo, error: tableError } = await supabase
      .rpc('get_table_definition', { table_name: 'dream_interpretations' });
      
    if (tableError) {
      console.error('Tablo bilgisi hatası:', tableError);
      return NextResponse.json(
        { error: tableError.message },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      tableInfo
    });
  } catch (error) {
    console.error('Test DB hatası:', error);
    return NextResponse.json(
      { error: 'Bir hata oluştu' },
      { status: 500 }
    );
  }
} 