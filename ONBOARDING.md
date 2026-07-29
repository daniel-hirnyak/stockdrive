# StockDrive — Checklist de onboarding nuevo cliente

## 1. Supabase
- [ ] Crear nuevo proyecto Supabase (nombre: stockdrive-[slug])
- [ ] Ejecutar SQL de estructura de tablas (ver /template/schema.sql)
- [ ] Ejecutar SQL de RLS (ver /template/rls.sql)
- [ ] Crear usuario en Authentication > Users con el email del cliente
- [ ] Copiar Project URL y anon key

## 2. Panel
- [ ] Duplicar carpeta /template/ → /[slug]/
- [ ] Rellenar /[slug]/config.js con los datos del cliente
- [ ] Crear manifest.json para PWA (ver /template/manifest.json)
- [ ] Push al repo

## 3. Verificación
- [ ] Entrar en stockdrive.es/[slug]/ con las credenciales del cliente
- [ ] Verificar saludo con nombre correcto
- [ ] Verificar ajustes con datos del negocio correctos
- [ ] Añadir vehículo de prueba y eliminarlo

## 4. Entrega
- [ ] Enviar credenciales al cliente
- [ ] Instalar PWA en su dispositivo si lo solicita
- [ ] Primera sesión de formación (30 min)
