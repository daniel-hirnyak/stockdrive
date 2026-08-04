import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// persistSession: false — este cliente es para el formulario público (lead capture),
// no debe leer ni heredar ninguna sesión de auth guardada en localStorage por el
// cliente de auth (comparten el mismo project ref y, por tanto, la misma
// storageKey por defecto). Sin esto, si el navegador tiene una sesión logueada,
// el insert se envía como usuario autenticado en vez de "anon" y la policy de
// RLS (concedida solo a "anon") lo rechaza con 403.
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
  },
})

// Cliente separado para autenticación (Login.jsx): necesita persistir la
// sesión en localStorage para que el usuario siga logueado tras recargar.
export const supabaseAuth = createClient(supabaseUrl, supabaseAnonKey)
