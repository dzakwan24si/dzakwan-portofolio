import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Menggunakan client standar agar tidak perlu berurusan dengan cookies saat cron berjalan
export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  // Ambil 1 baris data asal (hanya untuk memancing aktivitas database)
  const { data, error } = await supabase.from('projects').select('id').limit(1);

  if (error) {
    return NextResponse.json({ status: 'Error', message: error.message }, { status: 500 });
  }

  return NextResponse.json({ 
    status: 'Success', 
    message: 'Supabase is awake!', 
    timestamp: new Date().toISOString() 
  });
}