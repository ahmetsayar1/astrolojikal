import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // İstek gövdesini al
    const body = await request.json();
    
    // Aldığımız verileri doğrudan döndür
    return NextResponse.json({
      success: true,
      receivedData: body,
      message: 'Test API çağrısı başarılı'
    });
  } catch (error) {
    console.error('Test API hatası:', error);
    return NextResponse.json(
      { error: 'Bir hata oluştu', details: error instanceof Error ? error.message : 'Bilinmeyen hata' },
      { status: 500 }
    );
  }
} 