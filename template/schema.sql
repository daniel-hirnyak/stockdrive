-- ============================================
-- STOCKDRIVE — ESQUEMA DE BASE DE DATOS
-- Ejecutar en el SQL Editor de Supabase (proyecto nuevo del cliente)
-- ============================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ── VEHICULOS ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS vehiculos (
  id                            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  marca                         TEXT        NOT NULL,
  modelo                        TEXT        NOT NULL,
  matricula                     TEXT,
  anio                          INTEGER,
  kilometraje                   INTEGER,
  color                         TEXT,
  bastidor                      TEXT,
  proveedor                     TEXT,
  origen                        TEXT,
  fecha_entrada                 DATE        NOT NULL DEFAULT CURRENT_DATE,
  precio_compra                 NUMERIC     NOT NULL DEFAULT 0,
  precio_venta                  NUMERIC     NOT NULL DEFAULT 0,
  precio_venta_final            NUMERIC,
  fecha_venta                   DATE,
  estado                        TEXT        NOT NULL DEFAULT 'en_preparacion',
  publicado                     BOOLEAN     NOT NULL DEFAULT false,
  notas                         TEXT,
  combustible                   TEXT,
  cambio                        TEXT,
  potencia_cv                   INTEGER,
  motor                         TEXT,
  puertas                       INTEGER,
  plazas                        INTEGER,
  descripcion                   TEXT,
  etiqueta_dgt                  TEXT,
  fotos                         TEXT[]      DEFAULT '{}',
  precio_mas_iva                BOOLEAN     NOT NULL DEFAULT false,
  forma_pago_compra             TEXT        NOT NULL DEFAULT 'transferencia',
  importe_transferencia_compra  NUMERIC,
  importe_efectivo_compra       NUMERIC,
  compra_con_iva                BOOLEAN     NOT NULL DEFAULT false,
  destacado                     BOOLEAN     NOT NULL DEFAULT false,
  archivado                     BOOLEAN     NOT NULL DEFAULT false,
  created_at                    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at                    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── GASTOS ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS gastos (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  vehiculo_id  UUID        NOT NULL REFERENCES vehiculos(id) ON DELETE CASCADE,
  concepto     TEXT,
  importe      NUMERIC     DEFAULT 0,
  categoria    TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── HISTORIAL_ESTADOS ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS historial_estados (
  id               UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  vehiculo_id      UUID        NOT NULL REFERENCES vehiculos(id) ON DELETE CASCADE,
  estado_anterior  TEXT,
  estado_nuevo     TEXT        NOT NULL,
  nota             TEXT,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── VENTAS ───────────────────────────────────────────────────
-- Basado en el SQL documentado en eurocar-motor/gestion/index.html:1382-1407
-- FK ajustada a ON DELETE RESTRICT: el panel bloquea el borrado de un
-- vehículo con venta asociada, comportamiento incompatible con SET NULL.
CREATE TABLE IF NOT EXISTS ventas (
  id                  BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  vehiculo_id         UUID REFERENCES vehiculos(id) ON DELETE RESTRICT,
  marca               TEXT,
  modelo              TEXT,
  matricula           TEXT,
  precio_venta        NUMERIC,
  precio_compra       NUMERIC,
  coste_total         NUMERIC,
  margen              NUMERIC,
  forma_pago          TEXT,
  tipo_iva            TEXT DEFAULT 'rebu',
  iva_repercutido     NUMERIC DEFAULT 0,
  nombre_comprador    TEXT,
  dni_comprador       TEXT,
  direccion_comprador TEXT,
  fecha_venta         DATE,
  numero_contrato     TEXT,
  dias_en_stock       INTEGER DEFAULT 0,
  created_at          TIMESTAMPTZ DEFAULT NOW()
);

-- ── BUSQUEDAS_CATALOGO ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS busquedas_catalogo (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  termino     TEXT        NOT NULL,
  resultados  INTEGER     NOT NULL DEFAULT 0,
  timestamp   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── EVENTOS_CATALOGO ─────────────────────────────────────────
-- SQL tal como está documentado en eurocar-motor/catalogo/index.html:1838-1846
CREATE TABLE IF NOT EXISTS eventos_catalogo (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  tipo        TEXT        NOT NULL,
  vehiculo_id UUID        REFERENCES vehiculos(id) ON DELETE SET NULL,
  timestamp   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
