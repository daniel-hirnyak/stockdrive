import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { supabasePanel } from '../lib/supabase'
import { useAuth } from '../lib/auth'

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

const STATUS_ORDER = ['en_preparacion', 'disponible', 'reservado', 'vendido']

function IconArrowLeft({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M19 12H5" />
      <path d="M12 19l-7-7 7-7" />
    </svg>
  )
}

function IconStar({ className, filled }) {
  return (
    <svg viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

function IconEdit({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  )
}

function IconTrash({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
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

function IconClose({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

function IconChevronLeft({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 18l-6-6 6-6" />
    </svg>
  )
}

function IconChevronRight({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9 18l6-6-6-6" />
    </svg>
  )
}

function formatEur(value) {
  return (value ?? 0).toLocaleString('es-ES') + ' €'
}

function formatKm(value) {
  return (value ?? 0).toLocaleString('es-ES') + ' km'
}

function formatDate(value) {
  if (!value) return '—'
  return new Date(value).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })
}

function formaPagoTexto(v) {
  if (v.forma_pago_compra === 'mixto') {
    return `Mixto — ${formatEur(v.importe_transferencia_compra || 0)} transf. + ${formatEur(v.importe_efectivo_compra || 0)} efectivo`
  }
  if (v.forma_pago_compra === 'efectivo') return 'Efectivo'
  return 'Transferencia bancaria'
}

function InfoRow({ label, value, mono }) {
  return (
    <div className="flex items-center justify-between border-b border-[#F1F5F9] py-[7px] text-[13px] last:border-b-0">
      <span className="text-[#64748B]">{label}</span>
      <span className={`text-right font-medium text-[#1E293B] ${mono ? 'font-mono text-xs' : ''}`}>{value || '—'}</span>
    </div>
  )
}

export default function VehiculoDetalle() {
  const session = useAuth()
  const { id } = useParams()

  const [vehiculo, setVehiculo] = useState(null)
  const [gastos, setGastos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      setError(null)

      const { data: vData, error: vError } = await supabasePanel
        .from('vehiculos')
        .select('*')
        .eq('id', id)
        .single()

      if (vError) {
        setError(vError.message)
        setLoading(false)
        return
      }
      setVehiculo(vData)

      const { data: gData, error: gError } = await supabasePanel
        .from('gastos')
        .select('*')
        .eq('vehiculo_id', id)

      if (gError) {
        console.error('Error al cargar gastos:', gError)
      }
      setGastos(gData || [])
      setLoading(false)
    }
    fetchData()
  }, [id])

  useEffect(() => {
    if (!lightboxOpen) return
    function handleKey(e) {
      if (e.key === 'Escape') setLightboxOpen(false)
      if (e.key === 'ArrowLeft') navLightbox(-1)
      if (e.key === 'ArrowRight') navLightbox(1)
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxOpen, vehiculo])

  const totalGastos = useMemo(() => gastos.reduce((sum, g) => sum + (g.importe || 0), 0), [gastos])

  const gastosPorCategoria = useMemo(() => {
    const groups = {}
    gastos.forEach((g) => {
      const key = g.categoria || 'Sin categoría'
      if (!groups[key]) groups[key] = []
      groups[key].push(g)
    })
    return groups
  }, [gastos])

  const costeTotal = vehiculo ? (vehiculo.precio_compra || 0) + totalGastos : 0
  const margen = vehiculo ? (vehiculo.precio_venta || 0) - costeTotal : 0
  const margenPct = vehiculo && vehiculo.precio_venta ? (margen / vehiculo.precio_venta) * 100 : 0

  const fotos = vehiculo?.fotos && vehiculo.fotos.length > 0 ? vehiculo.fotos : []

  function openLightbox(index) {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }
  function navLightbox(dir) {
    setLightboxIndex((i) => (i + dir + fotos.length) % fotos.length)
  }

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

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC]">
        <p className="text-sm text-[#64748B]">Cargando vehículo...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#F8FAFC] p-8 text-center">
        <p className="text-sm font-medium text-[#DC2626]">Error al cargar el vehículo: {error}</p>
        <Link to="/panel-nuevo" className="font-semibold text-[#16255C] underline">
          Volver al listado
        </Link>
      </div>
    )
  }

  // Filas de "Datos del vehículo": básicas siempre, técnicas/origen solo si existen
  const infoRows = [
    { label: 'Marca', value: vehiculo.marca },
    { label: 'Modelo', value: vehiculo.modelo },
    { label: 'Matrícula', value: vehiculo.matricula, mono: true },
    { label: 'Año', value: vehiculo.anio },
    { label: 'Kilometraje', value: vehiculo.kilometraje ? formatKm(vehiculo.kilometraje) : null },
    { label: 'Color', value: vehiculo.color },
    { label: 'Nº Bastidor', value: vehiculo.bastidor, mono: true },
    { label: 'Fecha entrada', value: formatDate(vehiculo.fecha_entrada) },
    ...(vehiculo.combustible ? [{ label: 'Combustible', value: vehiculo.combustible }] : []),
    ...(vehiculo.cambio ? [{ label: 'Cambio', value: vehiculo.cambio }] : []),
    ...(vehiculo.potencia_cv ? [{ label: 'Potencia', value: `${vehiculo.potencia_cv} CV` }] : []),
    ...(vehiculo.motor ? [{ label: 'Motor', value: vehiculo.motor }] : []),
    ...(vehiculo.puertas ? [{ label: 'Puertas', value: vehiculo.puertas }] : []),
    ...(vehiculo.plazas ? [{ label: 'Plazas', value: vehiculo.plazas }] : []),
    ...(vehiculo.etiqueta_dgt ? [{ label: 'Etiqueta DGT', value: vehiculo.etiqueta_dgt }] : []),
    ...(vehiculo.proveedor ? [{ label: 'Proveedor', value: vehiculo.proveedor }] : []),
    ...(vehiculo.origen ? [{ label: 'Origen', value: vehiculo.origen }] : []),
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className="min-h-screen bg-[#F8FAFC] p-6 md:p-8"
    >
      <div className="mx-auto max-w-6xl">
        {/* 1. Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Link
              to="/panel-nuevo"
              className="mb-2.5 inline-flex items-center gap-1.5 rounded-lg border border-[#E2E8F0] bg-white px-2.5 py-[5px] text-xs font-medium text-[#1E293B] transition-colors hover:bg-[#F8FAFC]"
            >
              <IconArrowLeft className="h-3.5 w-3.5" />
              Volver al stock
            </Link>
            <h1 className="text-2xl font-bold text-[#1E293B]">
              {vehiculo.marca} {vehiculo.modelo}
            </h1>
            <p className="mt-[3px] text-[13px] text-[#64748B]">
              {vehiculo.matricula && (
                <span className="mr-1 inline-block rounded border border-[#E2E8F0] bg-[#F8FAFC] px-[5px] py-px font-mono text-[11px] font-semibold tracking-[.04em] text-[#1E293B]">
                  {vehiculo.matricula}
                </span>
              )}
              {vehiculo.matricula ? ' · ' : ''}
              {vehiculo.anio || '—'} · {vehiculo.kilometraje ? formatKm(vehiculo.kilometraje) : 'Sin km'} · {vehiculo.color || 'Sin color'}
            </p>
          </div>

          <div className="flex flex-shrink-0 gap-2">
            <button
              type="button"
              className={`inline-flex items-center gap-1.5 rounded-lg border px-3.5 py-2 text-[13px] font-medium transition-colors ${
                vehiculo.destacado
                  ? 'border-[#FCD34D] bg-[#FFFBEB] text-[#B45309] hover:bg-[#FEF3C7]'
                  : 'border-[#E2E8F0] bg-white text-[#1E293B] hover:bg-[#F8FAFC]'
              }`}
            >
              <IconStar className="h-3.5 w-3.5" filled={vehiculo.destacado} />
              {vehiculo.destacado ? 'Destacado' : 'Destacar'}
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#E2E8F0] bg-white px-3.5 py-2 text-[13px] font-medium text-[#1E293B] transition-colors hover:bg-[#F8FAFC]"
            >
              <IconEdit className="h-3.5 w-3.5" />
              Editar
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#FECACA] bg-[#FEF2F2] px-3.5 py-2 text-[13px] font-medium text-[#DC2626] transition-colors hover:bg-[#FEE2E2]"
            >
              <IconTrash className="h-3.5 w-3.5" />
              Eliminar
            </button>
          </div>
        </div>

        {/* 2. Bloque superior */}
        <div className="mb-[18px] rounded-xl border border-[#E2E8F0] bg-white p-[22px] shadow-sm sm:px-6">
          <div className="mb-[18px] flex flex-col items-start justify-between gap-3 sm:flex-row">
            <div className="flex items-center gap-3.5">
              {fotos.length > 0 ? (
                <img
                  src={fotos[0]}
                  alt={`${vehiculo.marca} ${vehiculo.modelo}`}
                  className="h-[88px] w-[120px] flex-shrink-0 rounded-lg border border-[#E2E8F0] object-cover"
                />
              ) : (
                <div className="flex h-[88px] w-[88px] flex-shrink-0 items-center justify-center rounded-lg border border-[#E2E8F0] bg-[#F1F5F9]">
                  <IconCar className="h-8 w-8 text-slate-400" />
                </div>
              )}
              <div>
                <div className="text-[26px] font-bold leading-[1.1] text-[#1E293B]">
                  {vehiculo.marca} {vehiculo.modelo}
                </div>
                <div className="mt-1 text-sm text-[#64748B]">
                  {vehiculo.anio || ''} · {vehiculo.color || ''}
                  {vehiculo.bastidor ? (
                    <>
                      {' '}
                      · <span className="font-mono text-xs">{vehiculo.bastidor}</span>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
            <span className={`rounded-full px-3.5 py-[5px] text-[13px] font-semibold ${STATUS_BADGE_STYLE[vehiculo.estado]}`}>
              {STATUS_LABEL[vehiculo.estado]}
            </span>
          </div>

          <div className="flex flex-wrap gap-5">
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] font-semibold uppercase tracking-[.06em] text-[#64748B]">Coste total</span>
              <span className="text-[15px] font-semibold text-[#1E293B]">{formatEur(costeTotal)}</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] font-semibold uppercase tracking-[.06em] text-[#64748B]">Precio de venta</span>
              <span className="text-[15px] font-semibold text-[#1E293B]">{formatEur(vehiculo.precio_venta)}</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] font-semibold uppercase tracking-[.06em] text-[#64748B]">Margen</span>
              <span className={`text-[15px] font-semibold ${margen >= 0 ? 'text-[#15803D]' : 'text-[#DC2626]'}`}>
                {formatEur(margen)} · {margenPct.toFixed(1)}%
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] font-semibold uppercase tracking-[.06em] text-[#64748B]">Fecha entrada</span>
              <span className="text-[15px] font-semibold text-[#1E293B]">{formatDate(vehiculo.fecha_entrada)}</span>
            </div>
          </div>
        </div>

        {/* 3. Grid de 2 columnas */}
        <div className="grid grid-cols-1 gap-[18px] lg:grid-cols-[1fr_340px] lg:items-start">
          {/* Columna izquierda */}
          <div className="flex flex-col gap-4">
            <div className="overflow-hidden rounded-xl border border-[#E2E8F0] bg-white shadow-sm">
              <div className="border-b border-[#E2E8F0] bg-[#F8FAFC] px-[18px] py-3.5 text-[13px] font-semibold text-[#1E293B]">
                Datos del vehículo
              </div>
              <div className="p-[18px]">
                {infoRows.map((row) => (
                  <InfoRow key={row.label} label={row.label} value={row.value} mono={row.mono} />
                ))}
              </div>
            </div>

            {fotos.length > 0 && (
              <div className="overflow-hidden rounded-xl border border-[#E2E8F0] bg-white shadow-sm">
                <div className="border-b border-[#E2E8F0] bg-[#F8FAFC] px-[18px] py-3.5 text-[13px] font-semibold text-[#1E293B]">
                  Fotos <span className="font-normal text-[#64748B]">({fotos.length})</span>
                </div>
                <div className="p-[18px]">
                  <div className="grid grid-cols-[repeat(auto-fill,minmax(110px,1fr))] gap-2">
                    {fotos.map((foto, i) => (
                      <img
                        key={foto + i}
                        src={foto}
                        alt={`Foto ${i + 1}`}
                        onClick={() => openLightbox(i)}
                        className="block aspect-[4/3] w-full cursor-zoom-in rounded-md border border-[#E2E8F0] object-cover transition-opacity hover:opacity-80"
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {vehiculo.descripcion && (
              <div className="overflow-hidden rounded-xl border border-[#E2E8F0] bg-white shadow-sm">
                <div className="border-b border-[#E2E8F0] bg-[#F8FAFC] px-[18px] py-3.5 text-[13px] font-semibold text-[#1E293B]">
                  Descripción
                </div>
                <div className="p-[18px]">
                  <p className="whitespace-pre-wrap text-[13px] leading-[1.65] text-[#1E293B]">{vehiculo.descripcion}</p>
                </div>
              </div>
            )}

            {vehiculo.notas && (
              <div className="overflow-hidden rounded-xl border border-[#FDE68A] bg-[#FFFBEB] shadow-sm">
                <div className="border-b border-[#FDE68A] bg-[#FEF3C7] px-[18px] py-3.5 text-[13px] font-semibold text-[#92400E]">
                  Notas internas
                </div>
                <div className="p-[18px]">
                  <p className="whitespace-pre-wrap text-[13px] leading-[1.65] text-[#78350F]">{vehiculo.notas}</p>
                </div>
              </div>
            )}
          </div>

          {/* Columna derecha */}
          <div className="flex flex-col gap-4">
            <div className="overflow-hidden rounded-xl border border-[#E2E8F0] bg-white shadow-sm">
              <div className="border-b border-[#E2E8F0] bg-[#F8FAFC] px-[18px] py-3.5 text-[13px] font-semibold text-[#1E293B]">
                Desglose económico
              </div>
              <div className="p-[18px]">
                <InfoRow label="Precio de compra" value={formatEur(vehiculo.precio_compra)} />
                <InfoRow label="Forma de pago" value={formaPagoTexto(vehiculo)} />

                {Object.keys(gastosPorCategoria).length > 0 ? (
                  <>
                    <div className="mb-1.5 mt-3 text-[11px] font-semibold uppercase tracking-[.05em] text-[#64748B]">Gastos</div>
                    {Object.entries(gastosPorCategoria).map(([categoria, items]) => {
                      const subtotal = items.reduce((s, g) => s + (g.importe || 0), 0)
                      return <InfoRow key={categoria} label={categoria} value={formatEur(subtotal)} />
                    })}
                  </>
                ) : (
                  <p className="my-2 text-xs text-[#64748B]">Sin gastos registrados.</p>
                )}

                <div className="mt-3.5 border-t-2 border-[#E2E8F0] pt-3.5">
                  <div className="flex items-center justify-between py-[5px] text-[13px]">
                    <span className="font-bold text-[#1E293B]">Coste total</span>
                    <span className="text-[15px] font-semibold text-[#1E293B]">{formatEur(costeTotal)}</span>
                  </div>
                  <div className="flex items-center justify-between py-[5px] text-[13px]">
                    <span className="text-[#64748B]">Precio de venta</span>
                    <span className="font-semibold text-[#1E293B]">{formatEur(vehiculo.precio_venta)}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between border-t-2 border-[#E2E8F0] pt-2.5">
                    <span className="text-sm font-bold text-[#1E293B]">Margen bruto</span>
                    <span className={`text-lg font-semibold ${margen >= 0 ? 'text-[#15803D]' : 'text-[#DC2626]'}`}>
                      {formatEur(margen)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-[5px] text-[13px]">
                    <span className="text-[#64748B]">Margen (%)</span>
                    <span className={`font-semibold ${margen >= 0 ? 'text-[#15803D]' : 'text-[#DC2626]'}`}>
                      {margenPct.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-[#E2E8F0] bg-white shadow-sm">
              <div className="border-b border-[#E2E8F0] bg-[#F8FAFC] px-[18px] py-3.5 text-[13px] font-semibold text-[#1E293B]">
                Cambiar estado
              </div>
              <div className="p-[18px]">
                <div className="flex flex-col gap-[7px]">
                  {STATUS_ORDER.map((st) => {
                    const isCurrent = vehiculo.estado === st
                    return (
                      <motion.button
                        key={st}
                        type="button"
                        whileHover={isCurrent ? {} : { scale: 1.02 }}
                        whileTap={isCurrent ? {} : { scale: 0.98 }}
                        className={`flex items-center justify-start gap-1.5 rounded-lg px-3.5 py-2 text-[13px] font-medium transition-colors ${
                          isCurrent
                            ? 'cursor-default bg-[#16255C] text-white'
                            : 'border border-[#E2E8F0] bg-white text-[#1E293B] hover:bg-[#F8FAFC]'
                        }`}
                      >
                        {isCurrent ? '✓ ' : ''}
                        {STATUS_LABEL[st]}
                      </motion.button>
                    )
                  })}

                  <div className="mt-3.5 border-t border-[#E2E8F0] pt-3.5">
                    <label className="flex cursor-pointer items-center gap-2 text-[13px] font-medium text-[#1E293B]">
                      <input
                        type="checkbox"
                        defaultChecked={vehiculo.publicado}
                        className="h-4 w-4 flex-shrink-0 accent-[#059669]"
                      />
                      Publicar en la web
                    </label>
                    <div className="mt-1 text-[11px] text-[#64748B]">
                      {vehiculo.publicado ? 'Visible en el catálogo público' : 'No visible en el catálogo público'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && fotos.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-6"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="absolute right-5 top-5 text-white/80 transition-colors hover:text-white"
            >
              <IconClose className="h-7 w-7" />
            </button>

            {fotos.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  navLightbox(-1)
                }}
                className="absolute left-4 text-white/80 transition-colors hover:text-white"
              >
                <IconChevronLeft className="h-9 w-9" />
              </button>
            )}

            <AnimatePresence mode="wait">
              <motion.img
                key={lightboxIndex}
                src={fotos[lightboxIndex]}
                alt={`Foto ${lightboxIndex + 1}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
                className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain"
              />
            </AnimatePresence>

            {fotos.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  navLightbox(1)
                }}
                className="absolute right-4 text-white/80 transition-colors hover:text-white"
              >
                <IconChevronRight className="h-9 w-9" />
              </button>
            )}

            {fotos.length > 1 && (
              <div className="absolute bottom-5 text-sm text-white/80">
                {lightboxIndex + 1} / {fotos.length}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
