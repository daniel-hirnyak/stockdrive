-- ============================================
-- STOCKDRIVE — POLÍTICAS RLS
-- Ejecutar después de schema.sql
-- ============================================

-- ── VEHICULOS ────────────────────────────────────────────────
ALTER TABLE vehiculos ENABLE ROW LEVEL SECURITY;
-- Catálogo público: cualquiera puede leer vehículos publicados y no archivados
CREATE POLICY "public_select_published" ON vehiculos
  FOR SELECT USING (publicado = true AND archivado = false);
-- Panel de gestión: usuarios autenticados ven y gestionan todo
CREATE POLICY "auth_select_all" ON vehiculos
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "auth_insert" ON vehiculos
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "auth_update" ON vehiculos
  FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "auth_delete" ON vehiculos
  FOR DELETE USING (auth.role() = 'authenticated');

-- ── GASTOS ───────────────────────────────────────────────────
ALTER TABLE gastos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "auth_only" ON gastos USING (auth.role() = 'authenticated');

-- ── HISTORIAL_ESTADOS ────────────────────────────────────────
ALTER TABLE historial_estados ENABLE ROW LEVEL SECURITY;
CREATE POLICY "auth_only" ON historial_estados USING (auth.role() = 'authenticated');

-- ── VENTAS ───────────────────────────────────────────────────
-- Tal como está documentado en el código original
ALTER TABLE ventas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "auth_only" ON ventas USING (auth.role() = 'authenticated');

-- ── BUSQUEDAS_CATALOGO ───────────────────────────────────────
-- Escritura anónima desde el catálogo público, más lectura autenticada
-- para poder consultarla desde el panel de gestión en el futuro.
ALTER TABLE busquedas_catalogo ENABLE ROW LEVEL SECURITY;
CREATE POLICY "insert_anon" ON busquedas_catalogo FOR INSERT WITH CHECK (true);
CREATE POLICY "select_auth" ON busquedas_catalogo FOR SELECT USING (auth.role() = 'authenticated');

-- ── EVENTOS_CATALOGO ─────────────────────────────────────────
-- Tal como está documentado + política de lectura autenticada añadida
-- (el panel de gestión hace SELECT sobre esta tabla para analíticas,
-- pero el SQL original documentado solo cubría el INSERT anónimo)
ALTER TABLE eventos_catalogo ENABLE ROW LEVEL SECURITY;
CREATE POLICY "insert_anon" ON eventos_catalogo FOR INSERT WITH CHECK (true);
CREATE POLICY "select_auth" ON eventos_catalogo FOR SELECT USING (auth.role() = 'authenticated');
