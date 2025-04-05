import { createClient } from '@supabase/supabase-js';

// Supabase'e bağlanma için gerekli bilgileri tanımlıyoruz
// Bu bilgileri daha sonra .env dosyasından alacağız
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Supabase istemcisini oluşturup dışa aktarıyoruz
export const supabase = createClient(supabaseUrl, supabaseKey); 