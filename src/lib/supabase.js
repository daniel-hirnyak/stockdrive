import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://farpikktngdcydpserjl.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhcnBpa2t0bmdkY3lkcHNlcmpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUzMDY2NjUsImV4cCI6MjEwMDg4MjY2NX0.RTFDhdbqDz74GcPlnSE7ZKKKGcQld-u8UOOVcXUii7Y'

// persistSession: false — este cliente es para el formulario público (lead capture),
// no debe leer ni heredar ninguna sesión de auth guardada en localStorage por el
// cliente de Login.jsx (comparten el mismo project ref y, por tanto, la misma
// storageKey por defecto). Sin esto, si el navegador tiene una sesión logueada,
// el insert se envía como usuario autenticado en vez de "anon" y la policy de
// RLS (concedida solo a "anon") lo rechaza con 403.
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
  },
})
