# Configuración de Supabase para el Blog

## Configuración inicial

1. Las credenciales de Supabase ya están configuradas en `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`

2. Las dependencias necesarias ya están instaladas:
   - `@supabase/ssr`
   - `@supabase/supabase-js`

## Estructura de la tabla en Supabase

Necesitas crear una tabla llamada `posts` en tu base de datos de Supabase con la siguiente estructura:

```sql
CREATE TABLE posts (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  image_url TEXT,
  category TEXT,
  author TEXT,
  author_role TEXT,
  reading_time INTEGER,
  tags TEXT[],
  published BOOLEAN DEFAULT false
);

-- Índice para búsqueda por slug
CREATE INDEX idx_posts_slug ON posts(slug);

-- Índice para ordenar por fecha
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);

-- Habilitar Row Level Security (opcional pero recomendado)
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Política para permitir lectura pública de posts publicados
CREATE POLICY "Posts publicados son visibles públicamente" 
ON posts FOR SELECT 
USING (published = true);

-- Si quieres permitir operaciones de escritura, necesitarás políticas adicionales
-- Por ejemplo, solo para usuarios autenticados:
-- CREATE POLICY "Usuarios autenticados pueden insertar posts" 
-- ON posts FOR INSERT 
-- TO authenticated 
-- WITH CHECK (true);
```

## Estructura de campos

- `id`: ID único del post (generado automáticamente)
- `created_at`: Fecha de creación (generada automáticamente)
- `updated_at`: Fecha de última actualización
- `title`: Título del post (requerido)
- `slug`: URL amigable única para el post (ej: "mi-primer-post")
- `content`: Contenido HTML del post (requerido)
- `excerpt`: Resumen corto del post (opcional)
- `image_url`: URL de la imagen destacada (opcional)
- `category`: Categoría del post (ej: "Desarrollo Web", "IA", "Seguridad")
- `author`: Nombre del autor (opcional)
- `author_role`: Rol o título del autor (opcional)
- `reading_time`: Tiempo estimado de lectura en minutos (opcional)
- `tags`: Array de etiquetas (opcional)
- `published`: Si el post está publicado o es un borrador

## Ejemplo de inserción de un post de prueba

```sql
INSERT INTO posts (
  title, 
  slug, 
  content, 
  excerpt, 
  category, 
  author, 
  author_role,
  reading_time,
  tags,
  published
) VALUES (
  'Mi primer post en el blog',
  'mi-primer-post',
  '<h2>Introducción</h2><p>Este es el contenido de mi primer post...</p>',
  'Un post de ejemplo para probar el blog',
  'Desarrollo Web',
  'Tempest GF',
  'Full Stack Developer',
  5,
  ARRAY['nextjs', 'supabase', 'desarrollo'],
  true
);
```

## Archivos creados

1. **Utilidades de Supabase:**
   - `/src/utils/supabase/server.js` - Cliente para Server Components
   - `/src/utils/supabase/client.js` - Cliente para Client Components
   - `/src/utils/supabase/middleware.js` - Cliente para Middleware

2. **Páginas del blog:**
   - `/src/app/blog/page.js` - Lista de posts del blog
   - `/src/app/blog/[slug]/page.js` - Vista individual de un post

3. **Componentes cliente:**
   - `/src/components/BlogClient.jsx` - Componente cliente para la lista de posts
   - `/src/components/BlogPostClient.jsx` - Componente cliente para un post individual

## Características implementadas

- ✅ Conexión con Supabase
- ✅ Fetch de posts desde la base de datos
- ✅ Página de listado de posts con animaciones
- ✅ Página individual de posts
- ✅ Vista "Coming Soon" si no hay posts
- ✅ Categorías y etiquetas
- ✅ Imágenes destacadas
- ✅ Información del autor
- ✅ Botones de compartir en redes sociales
- ✅ Diseño responsive con animaciones

## Cómo usar

1. Ve a tu proyecto en Supabase: https://pbbkyzkqimkrobszwjag.supabase.co
2. Crea la tabla `posts` usando el SQL de arriba
3. Inserta algunos posts de prueba
4. Reinicia el servidor de desarrollo: `npm run dev`
5. Visita `/blog` para ver tus posts

## Próximos pasos opcionales

- Añadir un sistema de comentarios
- Implementar búsqueda de posts
- Crear un panel de administración para gestionar posts
- Añadir autenticación para editores
- Implementar categorías como páginas separadas
- Añadir paginación para muchos posts
- Implementar sistema de likes/reacciones
