// ============================================
// CONFIGURACIÓN DEL CLIENTE — STOCKDRIVE
// ============================================
// Rellena todos los campos antes de entregar
// el panel al cliente. No compartas este archivo
// públicamente — contiene las credenciales de Supabase.

const CLIENT_CONFIG = {
  // SUPABASE — credenciales del proyecto del cliente
  supabaseUrl: 'PONER_URL_SUPABASE_CLIENTE',
  supabaseKey: 'PONER_ANON_KEY_SUPABASE_CLIENTE',

  // DATOS DEL NEGOCIO
  businessName: 'Nombre del concesionario',  // Aparece en sidebar, PDF y ajustes
  clientName: 'Nombre del responsable',       // Aparece en el saludo del dashboard
  phone: '+34 000 000 000',                   // Teléfono de contacto (aparece en PDF)
  whatsapp: '+34 000 000 000',                // WhatsApp de contacto
  address: 'Calle, número, CP, ciudad',       // Dirección completa (aparece en PDF)
  city: 'Ciudad',                             // Ciudad (aparece en PDF)
  schedule: 'Lunes a viernes: 9h-18h / Sábados: 9h-14h', // Horario
  bucket: 'vehiculos-fotos'                   // Bucket de Supabase Storage para fotos
};
