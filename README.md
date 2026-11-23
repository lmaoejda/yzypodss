# YEEZY PODS · e-commerce de pods descartables

Next.js (App Router) + TypeScript estricto + Tailwind v4 + Framer Motion + React Three Fiber + Zustand + Postgres (Drizzle).
Checkout 100 % por WhatsApp (`https://wa.me/5493765100878?text=...`). Precios en ARS con formato `$16.000`.

> **Nota sobre Supabase:** el backend usa **Postgres + Drizzle** con una `DATABASE_URL`. Esa URL puede ser el Postgres de
> Supabase (recomendado en producción) o cualquier Postgres local. El panel usa un login propio de un solo admin
> (`ADMIN_EMAIL` + `ADMIN_PASSWORD`, cookie JWT httpOnly) en vez de Supabase Auth, y las imágenes se guardan en Postgres
> (`bytea`) en vez de Supabase Storage: así todo funciona con `npm install && npm run dev`, sin servicios extra y
> sin exponer nunca una service-role key al cliente. `supabase/schema.sql` incluye schema + RLS + seed por si querés
> aplicar las políticas de Supabase.

## Árbol de archivos

```
public/            logo.svg · logo.png
scripts/make-assets.mjs        regenera logo.png, favicon, apple-icon y OG image desde logo.svg
supabase/schema.sql            schema + RLS + seed
src/db/                        schema.ts (Drizzle) · bootstrap.ts (tablas + seed idempotente) · index.ts
src/lib/                       auth · products · image-pipeline · flavors · format · whatsapp · types
src/store/cart.ts              Zustand persistido (yeezy_cart_v1): {productId, flavor, quantity}
src/components/                SkyBackground · Hero · ShippingBanner · ProductGrid/Card · CartDrawer · FloatingCart ·
                               AgeGate · Header · Footer · InfoBlock · Silhouette
src/components/pod/            PodScene (R3F procedural) · PodViewport (lazy + pausa fuera de viewport)
src/app/(site)/                landing (layout con fondo, header, carrito, age gate)
src/app/admin/                 login · panel · Server Actions · tabla · formulario · logs
src/app/bloqueado/             página para menores
src/app/api/images/[id]/       sirve las imágenes guardadas desde el propio dominio (sin CORS)
```

## Puesta en marcha local

```bash
npm install
cp .env.example .env    # completá ADMIN_EMAIL, ADMIN_PASSWORD, AUTH_SECRET, (SERPAPI_KEY opcional)
npm run dev
```

Las tablas y los 5 productos base se crean solos en el primer request (`src/db/bootstrap.ts`, idempotente,
el seed corre una única vez: si borrás productos no vuelven a aparecer).

## Paso a paso: Supabase + Vercel

1. **Supabase:** crear proyecto → *Project Settings → Database → Connection string (URI)* → copiarla en `DATABASE_URL`
   (en Vercel usá el *Transaction pooler*).
2. **SQL (opcional pero recomendado):** *SQL Editor* → pegar `supabase/schema.sql` (cambiá `admin@yeezypods.com` por tu
   `ADMIN_EMAIL` en `is_admin()`) → Run. Si no lo corrés, la app crea todo sola.
3. **Usuario admin:** no hay que crear nada en Supabase Auth: se define con `ADMIN_EMAIL` y `ADMIN_PASSWORD`.
4. **API key de imágenes:** cuenta en [serpapi.com](https://serpapi.com) → copiar la API key en `SERPAPI_KEY`.
5. **Vercel:** *Add New Project* → importar el repo → cargar las variables de `.env.example`
   (`DATABASE_URL`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `AUTH_SECRET`, `SERPAPI_KEY`, `NEXT_PUBLIC_WHATSAPP_NUMBER`) → Deploy.
6. Entrar a `/admin/login`, cargar productos y listo. Poné el link de la tienda en la bio de Instagram.

## Importar muchos productos desde un TXT

En `/admin`, el bloque **Importar varios productos** permite subir un archivo `.txt` o pegar su contenido. Cada producto
va en una línea con cinco campos separados por `|`; los sabores se separan con coma:

```text
Marca | Modelo | Puffs | Precio ARS | Sabor 1, Sabor 2
ELFBAR | BC 15K | 15000 | 16000 | Blue Razz, Watermelon
VUSE | GO 20K | 20000 | 18000 | Strawberry Kiwi, Mango Ice
```

Se aceptan hasta 50 productos y líneas vacías o comentarios que empiezan con `#`. Antes de guardar se validan todas las
líneas y se rechazan duplicados del archivo o del catálogo existente; si hay un error, no se importa ninguno. Los
productos quedan publicados con su modelo 3D de color y se pueden buscar imágenes desde la tabla del admin.

## Automatización del admin (el vendedor completa 5 campos)

Marca, Modelo, Puffs, Precio y Sabores (Enter agrega un chip). Al guardar, una Server Action corre el pipeline
(`src/lib/image-pipeline.ts`):

1. Consulta cache (`image_search_cache`, 30 días) → si hay imagen guardada para la query, la reutiliza.
2. Busca `"{marca} {modelo} vape"` (y `"... disposable vape"`) en SerpApi / Google Images.
   **Timeout 15 s, máximo 2 reintentos** con backoff.
3. Valida cada candidato: URL `https` (y host público), `content-type: image/*` (sin SVG), ≤ 8 MB y **≥ 400 px** de lado.
4. Descarga la imagen **desde el backend**, la normaliza (JPEG ≤ 900 px) y la guarda en Postgres; se sirve desde
   `/api/images/<id>` (mismo dominio → Three.js nunca tiene problemas de CORS).
5. Actualiza el producto (`image_url`, `render_mode = 'texture'`) y escribe el log.

### Fallbacks (nunca se rompe la publicación)

| Situación | Resultado | Log |
|---|---|---|
| Imagen válida encontrada | 3D con la foto como textura | `imagen encontrada` |
| API sin resultados válidos | 3D genérico del color del sabor | `fallback color` |
| API caída / sin `SERPAPI_KEY` / timeout tras reintentos | 3D genérico del color del sabor | `error de API` |
| La textura falla al cargar en el navegador | el modelo cambia solo al color del sabor | — |
| Sin WebGL | pod plano CSS del color del sabor | — |

Para probar el fallback: `SIMULATE_IMAGE_API_FAILURE=1`. En `/admin` el botón **Buscar imagen** reintenta por producto.
Se muestran las últimas 20 automatizaciones.

## Modelos 3D procedurales

100 % código (R3F + Three.js), **sin `.glb/.gltf` ni descargas 3D**: prisma redondeado extruido (cuerpo), boquilla
brillante y LED pulsante, `MeshPhysicalMaterial` con clearcoat. Sin imagen: etiqueta generada en canvas con el color del
sabor (mapa sabor→HEX en `src/lib/flavors.ts`, o hash determinista → HSL) con marca, modelo y puffs. El color cambia al
elegir otro sabor en la tarjeta. Un `<Canvas>` por tarjeta, cargado con `next/dynamic` (`ssr:false`) recién cuando la
tarjeta está cerca del viewport, `dpr={[1,1.5]}` y `frameloop="never"` al salir de pantalla. Rotación automática,
inclinación al hover y arrastre táctil (`touch-action: pan-y`, el scroll vertical nunca se bloquea).

## Seguridad

- Sin service-role key en el bundle: la única conexión a la base está en código de servidor (`server-only`).
- Toda Server Action del admin vuelve a verificar la sesión (`requireAdmin`); sólo entra `ADMIN_EMAIL`.
- Age Gate bloqueante (`yeezy_age_verified` en localStorage, sin flash gracias a un script previo al render);
  "No" → `/bloqueado`.

## Autorevisión (checklist QA)

- [x] `/admin` sin sesión → redirect a `/admin/login`; con credenciales se accede.
- [x] Crear producto → busca imagen, la guarda, la landing muestra el 3D con esa textura (requiere `SERPAPI_KEY`).
- [x] Fallo de API → modelo 3D del color del sabor, sin errores, con log `error de API`.
- [x] Precio inline en `/admin` → se refleja en la landing (`revalidatePath` + render dinámico).
- [x] Carrito → WhatsApp con productos, sabores, cantidades y `TOTAL $XX.XXX`, nombre y zona.
- [x] Las 5 tarjetas base muestran su 3D rotando (desktop y mobile).
- [x] No existe ningún `.glb/.gltf`.
- [x] Mobile-first (sin overflow a 375 px); `npm run lint` y `npm run typecheck` pasan.
- [x] "No" en el Age Gate → `/bloqueado`.
- [x] Ninguna service-role key en código cliente.

## Assets de marca

`public/logo.png` se genera desde `public/logo.svg` (`node scripts/make-assets.mjs`). Si querés usar el logo original
en alta resolución, reemplazá `public/logo.png` (y copiá a `src/app/icon.png` para el favicon). El fondo de cielo y
nubes se dibuja con CSS/SVG y no necesita archivos de imagen adicionales.
# yzypodss
