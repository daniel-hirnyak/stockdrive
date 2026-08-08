import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { supabasePanel } from '../lib/supabase'
import { useAuth } from '../lib/auth'

const FILTERS = [
  { key: 'all', label: 'Todos' },
  { key: 'en_preparacion', label: 'En preparación' },
  { key: 'disponible', label: 'Disponibles' },
  { key: 'reservado', label: 'Reservados' },
  { key: 'vendido', label: 'Vendidos' },
  { key: 'archivado', label: 'Archivados' },
]

const STATUS_LABEL = {
  en_preparacion: 'En preparación',
  disponible: 'Disponible',
  reservado: 'Reservado',
  vendido: 'Vendido',
}

const STATUS_BADGE_STYLE = {
  en_preparacion: 'bg-[#FFF7ED] text-[#C2410C]',
  disponible: 'bg-[#ECFDF5] text-[#15803D]',
  reservado: 'bg-[#FFFBEB] text-[#D97706]',
  vendido: 'bg-[#F1F5F9] text-[#64748B]',
}

function IconPlus({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}

function IconSearch({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

function IconGallery({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </svg>
  )
}

function IconList({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}

function IconEye({ className }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function IconEditPencil({ className }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  )
}

function IconCar({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 17H3v-5l2.5-5h13L21 12v5h-2" />
      <circle cx="7.5" cy="17.5" r="1.5" />
      <circle cx="16.5" cy="17.5" r="1.5" />
      <line x1="3" y1="12" x2="21" y2="12" />
    </svg>
  )
}

function SearchInput({ query, setQuery, className }) {
  return (
    <div className={`relative ${className}`}>
      <IconSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Marca, modelo, matrícula..."
        className="w-full rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] py-1.5 pl-9 pr-3 text-[13px] text-[#1E293B] transition-colors focus:border-[#16255C] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#16255C]"
      />
    </div>
  )
}

function ViewToggle({ effectiveView, setView }) {
  return (
    <div className="inline-flex flex-shrink-0 items-center gap-1 rounded-lg border border-[#E2E8F0] p-1">
      <button
        type="button"
        onClick={() => setView('gallery')}
        title="Vista galería"
        className={`rounded-md py-[7px] px-[10px] transition-colors ${
          effectiveView === 'gallery' ? 'bg-[#16255C] text-white' : 'text-slate-400 hover:text-[#64748B]'
        }`}
      >
        <IconGallery className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => setView('list')}
        title="Vista lista"
        className={`rounded-md py-[7px] px-[10px] transition-colors ${
          effectiveView === 'list' ? 'bg-[#16255C] text-white' : 'text-slate-400 hover:text-[#64748B]'
        }`}
      >
        <IconList className="h-4 w-4" />
      </button>
    </div>
  )
}

function formatEur(value) {
  return (value ?? 0).toLocaleString('es-ES') + ' €'
}

function formatKm(value) {
  return (value ?? 0).toLocaleString('es-ES') + ' km'
}

// Precio a mostrar (venta final si ya está vendido y existe) + margen sobre
// precio de compra. No incluye gastos: en el listado usamos una cifra rápida
// de un vistazo; el desglose con gastos reales vive en VehiculoDetalle.jsx.
function calcVehicleMoney(vehicle) {
  const precio = vehicle.estado === 'vendido' && vehicle.precio_venta_final ? vehicle.precio_venta_final : vehicle.precio_venta
  const margen = (precio || 0) - (vehicle.precio_compra || 0)
  const margenPct = vehicle.precio_compra ? (margen / vehicle.precio_compra) * 100 : 0
  return { precio, margen, margenPct }
}

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < breakpoint)
  useEffect(() => {
    function onResize() {
      setIsMobile(window.innerWidth < breakpoint)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [breakpoint])
  return isMobile
}

// Menú contextual "⋯" — renderizado vía portal a document.body con posición
// fixed calculada desde el botón. Necesario porque las cards (GalleryCard/
// ListRow) usan overflow-hidden para recortar las esquinas redondeadas, lo
// que recortaría visualmente un dropdown absolute anidado dentro de ellas,
// sin importar su z-index. Mismo enfoque que ya usa el panel vanilla
// (appendChild a document.body + getBoundingClientRect).
function VehicleMenu({ vehicle }) {
  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const btnRef = useRef(null)
  const menuRef = useRef(null)

  useEffect(() => {
    if (!open) return
    function handleClickOutside(e) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        btnRef.current &&
        !btnRef.current.contains(e.target)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  function toggleOpen(e) {
    e.stopPropagation()
    if (!open && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect()
      setPosition({ top: rect.bottom + 4, left: rect.right - 192 }) // 192px = w-48
    }
    setOpen((o) => !o)
  }

  const items = []
  if (vehicle.archivado) {
    items.push({ label: '↩ Desarchivar' })
    items.push({ label: 'Eliminar', danger: true })
  } else if (vehicle.estado === 'vendido') {
    items.push({ label: 'Archivar' })
    items.push({ label: 'Eliminar', danger: true })
  } else {
    items.push({ label: vehicle.destacado ? '☆ Quitar destacado' : '★ Destacar' })
    items.push({ label: 'Archivar' })
    items.push({ label: 'Eliminar', danger: true })
  }

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        onClick={toggleOpen}
        className="flex flex-shrink-0 items-center justify-center rounded-lg border border-[#E2E8F0] px-[10px] py-[5px] text-base leading-none text-[#64748B] transition-colors hover:bg-[#F8FAFC]"
      >
        ⋯
      </button>
      {open &&
        createPortal(
          <div
            ref={menuRef}
            style={{ position: 'fixed', top: position.top, left: position.left }}
            className="z-50 w-48 overflow-hidden rounded-lg border border-[#E2E8F0] bg-white shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {items.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => setOpen(false)}
                className={`block w-full px-3.5 py-2.5 text-left text-[13px] transition-colors ${
                  item.danger ? 'text-[#DC2626] hover:bg-[#FEF2F2]' : 'text-[#1E293B] hover:bg-[#F8FAFC]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>,
          document.body
        )}
    </>
  )
}

function VehicleActions({ vehicle }) {
  const canVender = vehicle.estado === 'disponible' || vehicle.estado === 'reservado'
  return (
    <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
      {canVender && (
        <button
          type="button"
          className="flex-1 rounded-lg bg-[#16255C] px-[10px] py-[5px] text-xs font-semibold text-white transition-opacity hover:opacity-90"
        >
          Vender
        </button>
      )}
      <Link
        to={`/panel-nuevo/vehiculos/${vehicle.id}`}
        className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-[#E2E8F0] px-[10px] py-[5px] text-xs font-semibold text-[#1E293B] transition-colors hover:bg-[#F8FAFC]"
      >
        <IconEye />
        Ver
      </Link>
      <button
        type="button"
        className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-[#E2E8F0] px-[10px] py-[5px] text-xs font-semibold text-[#1E293B] transition-colors hover:bg-[#F8FAFC]"
      >
        <IconEditPencil />
        Editar
      </button>
      <VehicleMenu vehicle={vehicle} />
    </div>
  )
}

function GalleryCard({ vehicle, index }) {
  const navigate = useNavigate()
  const photo = vehicle.fotos && vehicle.fotos.length > 0 ? vehicle.fotos[0] : null
  const { precio, margen, margenPct } = calcVehicleMoney(vehicle)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.3), ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ y: -3 }}
      onClick={() => navigate(`/panel-nuevo/vehiculos/${vehicle.id}`)}
      className="flex cursor-pointer flex-col overflow-hidden rounded-xl border border-[#E2E8F0] bg-white transition-shadow duration-200 hover:shadow-lg"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-[#F3F4F6]">
        {photo ? (
          <img src={photo} alt={`${vehicle.marca} ${vehicle.modelo}`} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <IconCar className="h-10 w-10 text-slate-300" />
          </div>
        )}
        <span className={`absolute right-2 top-2 rounded-full px-2 py-0.5 text-[11px] font-semibold ${STATUS_BADGE_STYLE[vehicle.estado]}`}>
          {STATUS_LABEL[vehicle.estado]}
        </span>
        {vehicle.destacado && (
          <span className="absolute left-2 top-2 rounded-full bg-[#FBBF24] px-2 py-0.5 text-[11px] font-bold text-[#7C2D12]">★</span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-3.5">
        {vehicle.matricula && (
          <span className="mb-1 inline-block w-fit rounded border border-[#E2E8F0] bg-[#F8FAFC] px-1.5 py-px font-mono text-[11px] font-semibold tracking-[.04em] text-[#1E293B]">
            {vehicle.matricula}
          </span>
        )}
        <p className="line-clamp-2 text-sm font-bold leading-snug text-[#1E293B]">
          {vehicle.marca} {vehicle.modelo}
        </p>
        <p className="mt-1 text-xs text-[#64748B]">
          {[vehicle.anio, vehicle.kilometraje ? formatKm(vehicle.kilometraje) : null, vehicle.combustible].filter(Boolean).join(' · ')}
        </p>

        <div className="mt-auto pt-3">
          <div className="mb-2 h-px bg-[#E2E8F0]" />
          <p className="text-lg font-bold text-[#16255C]">{precio ? formatEur(precio) : '—'}</p>
          <div className="mt-1 flex items-center justify-between text-xs">
            <span className="text-[#64748B]">{formatEur(vehicle.precio_compra)}</span>
            <span className={`font-semibold ${margen >= 0 ? 'text-[#15803D]' : 'text-[#DC2626]'}`}>
              {margen >= 0 ? '+' : ''}
              {formatEur(margen)} · {margenPct >= 0 ? '+' : ''}
              {margenPct.toFixed(1)}%
            </span>
          </div>
          <div className="mt-1.5 flex items-center gap-1.5">
            <span className={`h-1.5 w-1.5 rounded-full ${vehicle.publicado ? 'bg-[#15803D]' : 'bg-[#CBD5E1]'}`} />
            <span className={`text-[11px] ${vehicle.publicado ? 'text-[#15803D]' : 'text-[#64748B]'}`}>
              {vehicle.publicado ? 'En web' : 'No publicado'}
            </span>
          </div>
        </div>
      </div>

      <div className="p-3.5 pt-0">
        <VehicleActions vehicle={vehicle} />
      </div>
    </motion.div>
  )
}

function ListRow({ vehicle, isExpanded, onToggle }) {
  const photo = vehicle.fotos && vehicle.fotos.length > 0 ? vehicle.fotos[0] : null
  const { precio, margen, margenPct } = calcVehicleMoney(vehicle)
  const diasEnStock = vehicle.fecha_entrada
    ? Math.max(0, Math.floor((Date.now() - new Date(vehicle.fecha_entrada)) / 86400000))
    : null

  return (
    <div className="overflow-hidden rounded-xl border border-[#E2E8F0] bg-white shadow-sm">
      <div onClick={onToggle} className="flex cursor-pointer select-none items-center gap-3 p-3">
        <div className="flex h-[38px] w-[52px] flex-shrink-0 items-center justify-center overflow-hidden rounded-md border border-[#E2E8F0] bg-[#F1F5F9]">
          {photo ? (
            <img src={photo} alt={`${vehicle.marca} ${vehicle.modelo}`} className="h-full w-full object-cover" />
          ) : (
            <IconCar className="h-5 w-5 text-slate-300" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-[#1E293B]">
            {vehicle.marca} {vehicle.modelo}
            {vehicle.destacado && <span className="ml-1.5 text-xs text-[#B45309]">★</span>}
          </p>
          <div className="mt-0.5 flex flex-wrap items-center gap-x-1.5 text-[11px] text-[#64748B]">
            {vehicle.matricula && <span className="font-mono">{vehicle.matricula}</span>}
            {vehicle.anio && <span>{vehicle.anio}</span>}
            {vehicle.kilometraje ? <span>{formatKm(vehicle.kilometraje)}</span> : null}
            <span className={vehicle.publicado ? 'text-[#15803D]' : ''}>{vehicle.publicado ? 'En web' : 'No publicado'}</span>
          </div>
        </div>

        <span className="flex-shrink-0 text-sm font-bold text-[#16255C]">{precio ? formatEur(precio) : '—'}</span>
        <span className={`flex-shrink-0 text-lg font-light text-[#CBD5E1] transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}>
          ›
        </span>
      </div>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden border-t border-[#E2E8F0]"
          >
            <div className="p-3.5">
              <div className="grid grid-cols-3 gap-x-5 gap-y-2.5 pb-3">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-semibold uppercase tracking-[.05em] text-[#64748B]">Coste total</span>
                  <span className="text-[13px] font-medium text-[#1E293B]">{formatEur(vehicle.precio_compra)}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-semibold uppercase tracking-[.05em] text-[#64748B]">Margen</span>
                  <span className={`text-[13px] font-medium ${margen >= 0 ? 'text-[#15803D]' : 'text-[#DC2626]'}`}>
                    {formatEur(margen)} <span className="font-normal text-[#64748B]">{margenPct.toFixed(1)}%</span>
                  </span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-semibold uppercase tracking-[.05em] text-[#64748B]">Días en stock</span>
                  <span className="text-[13px] font-medium text-[#1E293B]">{diasEnStock !== null ? `${diasEnStock}d` : '—'}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-semibold uppercase tracking-[.05em] text-[#64748B]">Año</span>
                  <span className="text-[13px] font-medium text-[#1E293B]">{vehicle.anio || '—'}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-semibold uppercase tracking-[.05em] text-[#64748B]">Kilómetros</span>
                  <span className="text-[13px] font-medium text-[#1E293B]">
                    {vehicle.kilometraje ? formatKm(vehicle.kilometraje) : '—'}
                  </span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-semibold uppercase tracking-[.05em] text-[#64748B]">Estado</span>
                  <span className={`w-fit rounded-full px-2 py-0.5 text-[11px] font-semibold ${STATUS_BADGE_STYLE[vehicle.estado]}`}>
                    {STATUS_LABEL[vehicle.estado]}
                  </span>
                </div>
              </div>
              <div className="border-t border-[#F1F5F9] pt-2.5">
                <VehicleActions vehicle={vehicle} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Vehiculos() {
  const session = useAuth()
  const isMobile = useIsMobile()

  const [filter, setFilter] = useState('all')
  const [query, setQuery] = useState('')
  const [view, setView] = useState(() => localStorage.getItem('stockdrive_vehicle_view') || 'gallery')
  const [expandedId, setExpandedId] = useState(null)

  const [vehiculos, setVehiculos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [archivedVehiculos, setArchivedVehiculos] = useState([])
  const [archivedLoaded, setArchivedLoaded] = useState(false)
  const [archivedLoading, setArchivedLoading] = useState(false)
  const [archivedError, setArchivedError] = useState(null)
  const [archivedCount, setArchivedCount] = useState(0)

  useEffect(() => {
    localStorage.setItem('stockdrive_vehicle_view', view)
  }, [view])

  // Vehículos activos (no archivados) — carga inicial
  useEffect(() => {
    async function fetchVehiculos() {
      setLoading(true)
      setError(null)
      const { data, error } = await supabasePanel
        .from('vehiculos')
        .select('*')
        .eq('archivado', false)
        .order('fecha_entrada', { ascending: false })

      if (error) {
        setError(error.message)
      } else {
        setVehiculos(data)
      }
      setLoading(false)
    }
    fetchVehiculos()
  }, [])

  // Contador de archivados (solo el número, sin traer las filas) para que el
  // tab muestre la cifra real aunque el usuario todavía no lo haya abierto.
  useEffect(() => {
    async function fetchArchivedCount() {
      const { count, error } = await supabasePanel
        .from('vehiculos')
        .select('id', { count: 'exact', head: true })
        .eq('archivado', true)

      if (!error) setArchivedCount(count || 0)
    }
    fetchArchivedCount()
  }, [])

  // Vehículos archivados — carga perezosa: solo al entrar en ese tab por
  // primera vez, ya que quedan excluidos de la query principal.
  useEffect(() => {
    if (filter !== 'archivado' || archivedLoaded) return

    async function fetchArchived() {
      setArchivedLoading(true)
      setArchivedError(null)
      const { data, error } = await supabasePanel
        .from('vehiculos')
        .select('*')
        .eq('archivado', true)
        .order('fecha_entrada', { ascending: false })

      if (error) {
        setArchivedError(error.message)
      } else {
        setArchivedVehiculos(data)
        setArchivedLoaded(true)
      }
      setArchivedLoading(false)
    }
    fetchArchived()
  }, [filter, archivedLoaded])

  const counts = useMemo(
    () => ({
      all: vehiculos.length,
      en_preparacion: vehiculos.filter((v) => v.estado === 'en_preparacion').length,
      disponible: vehiculos.filter((v) => v.estado === 'disponible').length,
      reservado: vehiculos.filter((v) => v.estado === 'reservado').length,
      vendido: vehiculos.filter((v) => v.estado === 'vendido').length,
      archivado: archivedCount,
    }),
    [vehiculos, archivedCount]
  )

  const featuredCount = useMemo(() => vehiculos.filter((v) => v.destacado).length, [vehiculos])

  const filtered = useMemo(() => {
    const source =
      filter === 'archivado'
        ? archivedVehiculos
        : vehiculos.filter((v) => filter === 'all' || v.estado === filter)

    const q = query.trim().toLowerCase()
    if (!q) return source
    return source.filter((v) =>
      [v.marca, v.modelo, v.matricula, v.color, v.bastidor].some((f) => (f || '').toLowerCase().includes(q))
    )
  }, [filter, query, vehiculos, archivedVehiculos])

  const isArchivedTab = filter === 'archivado'
  const isLoading = isArchivedTab ? archivedLoading : loading
  const currentError = isArchivedTab ? archivedError : error
  const effectiveView = isMobile ? 'gallery' : view

  if (session === undefined) {
    return <div className="p-8 text-center">Verificando sesión...</div>
  }

  if (session === null) {
    return (
      <div className="p-8 text-center">
        <p className="mb-4 text-slate-600">Necesitas iniciar sesión para acceder al panel.</p>
        <a href="/login" className="text-[#16255C] font-semibold underline">Ir a iniciar sesión</a>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto max-w-[1280px] px-6 py-[28px]">
        {/* 1. Cabecera */}
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="test-inter text-2xl font-bold text-[#1E293B]">Vehículos</h1>
            <p className="mt-1 text-sm text-[#64748B]">Gestiona tu stock, precios y publicación.</p>
          </div>
          <button
            type="button"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#16255C] px-[14px] py-2 text-[13px] font-semibold text-white transition-opacity hover:opacity-90 sm:w-auto"
          >
            <IconPlus className="h-4 w-4" />
            Añadir vehículo
          </button>
        </div>

        {/* 2. Barra de filtros */}
        <div className="mb-4 rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 shadow-sm">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="mb-3 w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2.5 text-sm font-semibold text-[#16255C] focus:border-[#16255C] focus:outline-none focus:ring-1 focus:ring-[#16255C] md:hidden"
          >
            {FILTERS.map((f) => (
              <option key={f.key} value={f.key}>
                {f.label} ({counts[f.key]})
              </option>
            ))}
          </select>

          {/* Desktop: todo en una sola fila (tabs | destacados | buscador | toggle) */}
          <div className="hidden flex-nowrap items-center justify-between gap-2 md:flex">
            <div className="flex flex-shrink-0 gap-0.5">
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setFilter(f.key)}
                  className={`whitespace-nowrap rounded-md px-3 py-[5px] text-[13px] font-medium transition-colors ${
                    filter === f.key ? 'bg-[#ECEEF6] text-[#16255C]' : 'text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#1E293B]'
                  }`}
                >
                  {f.label} <span className="opacity-60">({counts[f.key]})</span>
                </button>
              ))}
            </div>

            <span
              className={`inline-flex flex-shrink-0 items-center gap-1 whitespace-nowrap text-xs ${
                featuredCount >= 5 ? 'font-semibold text-[#DC2626]' : featuredCount > 0 ? 'font-semibold text-[#B45309]' : 'font-medium text-[#64748B]'
              }`}
            >
              ★ {featuredCount}/5 destacados
            </span>

            <SearchInput query={query} setQuery={setQuery} className="w-60 flex-shrink-0" />
            <ViewToggle effectiveView={effectiveView} setView={setView} />
          </div>

          {/* Móvil: buscador + toggle en su propia fila (los tabs ya están arriba como <select>) */}
          <div className="mt-3 flex items-center gap-2 md:hidden">
            <SearchInput query={query} setQuery={setQuery} className="flex-1" />
            <ViewToggle effectiveView={effectiveView} setView={setView} />
          </div>
        </div>

        {/* Estados de carga / error / vacío / contenido */}
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <p className="text-sm text-[#64748B]">Cargando vehículos...</p>
          </div>
        ) : currentError ? (
          <div className="flex items-center justify-center py-16">
            <p className="text-sm font-medium text-[#DC2626]">Error al cargar vehículos: {currentError}</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#E2E8F0] bg-white py-16 text-center">
            <p className="text-sm text-[#64748B]">No hay vehículos que coincidan con este filtro.</p>
          </div>
        ) : effectiveView === 'gallery' ? (
          // 3. Vista galería
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((vehicle, index) => (
              <GalleryCard key={vehicle.id} vehicle={vehicle} index={index} />
            ))}
          </div>
        ) : (
          // 4. Vista lista
          <div className="flex flex-col gap-2">
            {filtered.map((vehicle) => (
              <ListRow
                key={vehicle.id}
                vehicle={vehicle}
                isExpanded={expandedId === vehicle.id}
                onToggle={() => setExpandedId((id) => (id === vehicle.id ? null : vehicle.id))}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
