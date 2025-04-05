import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Kullanıcı paneli için kimlik doğrulama kontrolü
  if (req.nextUrl.pathname.startsWith('/hesabim') && !session) {
    return NextResponse.redirect(new URL('/auth/giris', req.url));
  }

  // Güvenli sayfalar için kimlik doğrulama kontrolü
  if (
    (req.nextUrl.pathname.startsWith('/ruya-yorumu/yorum-al') ||
    req.nextUrl.pathname.startsWith('/tarot-fali/fal-bak') ||
    req.nextUrl.pathname.startsWith('/katina-fali/fal-bak') ||
    req.nextUrl.pathname.startsWith('/kahve-fali/fal-bak')) &&
    !session
  ) {
    return NextResponse.redirect(new URL('/auth/giris', req.url));
  }

  // Giriş yapan kullanıcıların auth sayfalarına erişimini engelle
  if (
    (req.nextUrl.pathname.startsWith('/auth/giris') ||
    req.nextUrl.pathname.startsWith('/auth/kayit')) &&
    session
  ) {
    return NextResponse.redirect(new URL('/hesabim', req.url));
  }

  return res;
}

export const config = {
  matcher: [
    '/hesabim/:path*',
    '/auth/:path*',
    '/ruya-yorumu/yorum-al/:path*',
    '/tarot-fali/fal-bak/:path*',
    '/katina-fali/fal-bak/:path*',
    '/kahve-fali/fal-bak/:path*',
  ],
}; 