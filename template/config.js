// ============================================
// CONFIGURACIÓN DEL CLIENTE — STOCKDRIVE
// Rellena todos los campos antes de entregar al cliente
// ============================================
const CLIENT_CONFIG = {
  // SUPABASE
  supabaseUrl: 'PONER_URL_SUPABASE_CLIENTE',
  supabaseKey: 'PONER_ANON_KEY_SUPABASE_CLIENTE',
  bucket: 'vehiculos-fotos',

  // DATOS DEL NEGOCIO
  businessName: 'Nombre del concesionario',
  clientName: 'Nombre del responsable',
  phone: '+34 000 000 000',
  phoneDisplay: '000 000 000',
  whatsapp: '+34 000 000 000',
  address: 'Calle, número, CP, ciudad',
  city: 'Ciudad',
  schedule: 'Lunes a viernes: 9h-18h / Sábados: 9h-14h',
  email: '',

  // WEB Y CATÁLOGO
  catalogUrl: 'https://stockdrive.es/[SLUG]/catalogo/',
  catalogTitle: 'Vehículos de ocasión seleccionados',
  catalogHero: 'Furgonetas y vehículos de ocasión, listos para ti',
  catalogColor: '#16255C',
  catalogMapUrl: 'PONER_URL_EMBED_GOOGLE_MAPS'
};
