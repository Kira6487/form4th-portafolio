# FORM4TH — Digital Product Studio

Sitio oficial de FORM4TH construido con Next.js App Router, React, TypeScript y CSS moderno.

## Ejecutar localmente

Requiere Node.js 20 o superior.

```bash
npm install
npm run dev
```

Abrir `http://localhost:3000`.

## Build de producción

```bash
npm run build
npm run start
```

Para revisar reglas de lint: `npm run lint`.

No requiere variables de entorno. El proyecto está listo para importarse en Vercel; usar el preset Next.js y dejar los comandos por defecto.

## Arquitectura

- `app/`: rutas del App Router, metadata, sitemap y robots.
- `components/`: navbar, footer y secciones interactivas reutilizables.
- `public/images/`: copia servida de los recursos originales de `images/`.
- Páginas: `/`, `/servicios`, `/proyectos`, `/proyectos/acm-diproyec`, `/proyectos/estampado-djhonny`, `/nosotros` y `/contacto`.

## Interacción y assets

El home incluye tabs de servicios, navegación móvil fullscreen, marquee, estados hover y selector antes/después. Los casos de estudio usan los logos reales disponibles y `bambi.jpeg` como placeholder explícito para capturas de interfaces pendientes de incorporar.
