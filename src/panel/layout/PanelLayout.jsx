import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { supabasePanel } from '../lib/supabase'
import '../panel.css'

function IconGrid({ className }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  )
}

function IconTruck({ className }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="1" y="3" width="15" height="13" />
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  )
}

function IconDocument({ className }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  )
}

function IconChart({ className }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  )
}

function IconGlobe({ className }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

function IconPlus({ className }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}

function IconSale({ className }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="12" y1="18" x2="12" y2="12" />
      <line x1="9" y1="15" x2="15" y2="15" />
    </svg>
  )
}

function IconSettings({ className }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  )
}

function IconLogout({ className }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  )
}

function NavLabel({ children, first }) {
  return (
    <div
      className={`px-4 pb-1 text-[10px] font-semibold uppercase tracking-[.08em] text-white/35 ${
        first ? 'pt-3.5' : 'mt-5 border-t border-white/[0.08] pt-3.5'
      }`}
    >
      {children}
    </div>
  )
}

function NavItem({ to, icon, label, isActive }) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium transition-colors ${
        isActive ? 'bg-[rgba(59,130,246,0.15)] text-white' : 'text-white/70 hover:bg-white/[0.06] hover:text-white'
      }`}
    >
      <span className={`flex-shrink-0 ${isActive ? 'text-[#3B82F6] opacity-100' : 'opacity-80'}`}>{icon}</span>
      <span>{label}</span>
    </Link>
  )
}

export default function PanelLayout() {
  const location = useLocation()
  const navigate = useNavigate()

  const isVehiculosActive =
    location.pathname === '/panel-nuevo' || location.pathname.startsWith('/panel-nuevo/vehiculos')

  async function handleLogout() {
    await supabasePanel.auth.signOut()
    navigate('/login')
  }

  return (
    <div className="panel-root">
      <aside className="fixed left-0 top-0 z-[100] flex h-screen w-[220px] flex-col bg-[#0F172A]">
        {/* Logo */}
        <div className="flex items-center gap-2.5 border-b border-white/[0.08] px-4 pb-4 pt-5">
          <img src="/assets/logo.png" alt="StockDrive" className="h-8 w-8 flex-shrink-0 rounded-md object-contain" />
          <div className="min-w-0">
            <div className="text-[15px] font-bold leading-tight text-white">StockDrive</div>
            <div className="mt-px truncate text-[11px] leading-tight text-white/70">Panel Demo</div>
          </div>
        </div>

        {/* Navegación */}
        <nav className="flex-1 overflow-y-auto px-2.5 pb-2">
          <NavLabel first>Gestión</NavLabel>
          <div className="flex flex-col gap-0.5">
            <NavItem to="/panel-nuevo/inicio" icon={<IconGrid />} label="Inicio" isActive={false} />
            <NavItem to="/panel-nuevo" icon={<IconTruck />} label="Vehículos" isActive={isVehiculosActive} />
            <NavItem to="/panel-nuevo/ventas" icon={<IconDocument />} label="Ventas" isActive={false} />
          </div>

          <NavLabel>Presencia online</NavLabel>
          <div className="flex flex-col gap-0.5">
            <NavItem to="/panel-nuevo/rendimiento" icon={<IconChart />} label="Rendimiento web" isActive={false} />
            <NavItem to="/panel-nuevo/catalogo" icon={<IconGlobe />} label="Catálogo online" isActive={false} />
          </div>

          <NavLabel>Acciones rápidas</NavLabel>
          <div className="flex flex-col gap-1.5 px-0.5 pb-2">
            <button
              type="button"
              className="flex items-center gap-2 rounded-lg border border-white/[0.15] px-3 py-1.5 text-xs font-medium text-white/70 transition-colors hover:bg-white/[0.08] hover:text-white"
            >
              <IconPlus />
              Añadir vehículo
            </button>
            <button
              type="button"
              className="flex items-center gap-2 rounded-lg border border-white/[0.15] px-3 py-1.5 text-xs font-medium text-white/70 transition-colors hover:bg-white/[0.08] hover:text-white"
            >
              <IconSale />
              Registrar venta
            </button>
          </div>
        </nav>

        {/* Footer */}
        <div className="flex flex-col gap-0.5 border-t border-white/[0.08] px-2.5 py-2 pb-4">
          <button
            type="button"
            className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[13px] font-medium text-white/70 transition-colors hover:bg-white/[0.06] hover:text-white"
          >
            <IconSettings className="flex-shrink-0 opacity-80" />
            <span>Ajustes</span>
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[13px] font-medium text-white/70 transition-colors hover:bg-white/[0.06] hover:text-white"
          >
            <IconLogout className="flex-shrink-0 opacity-80" />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </aside>

      <main className="ml-[220px] min-h-screen">
        <Outlet />
      </main>
    </div>
  )
}
