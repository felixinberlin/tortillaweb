# Arquitectura Técnica — tortilladepatatas.org

## 1. Visión General del Stack Tecnológico

`tortilladepatatas.org` está construido como una aplicación web moderna, ultrarrápida y accesible utilizando el patrón de **Islas de React sobre Astro 5**:

* **Framework Principal**: [Astro 5](https://astro.build/) (Generación Estática + Rutado Dinámico de i18n).
* **Componentes Interactivos**: [React 18](https://react.dev/) (para herramientas de cálculo, comparadores e islas de interacción).
* **Estilos & Diseño**: [Tailwind CSS v4](https://tailwindcss.com/) + Sistema de Diseño "Kitchen Notebook" (Cuaderno de Cocina).
* **Iconografía**: [Lucide React](https://lucide.dev/).
* **Validaciones de Esquema**: [Zod](https://zod.dev/) para validar colecciones de contenido.
* **Testing & Calidad**: [Vitest](https://vitest.dev/) para suites de prueba unitarias e integración de contenido.

---

## 2. Estructura de Directorios

```
/
├── docs/                             # Documentación del Proyecto
│   ├── Idea.md                       # Visión, filosofía y pilares del proyecto
│   ├── Arquitectura.md               # Especificación técnica del sistema
│   ├── DESIGN_SYSTEM.md              # Guía de estilos y paleta "Kitchen Notebook"
│   ├── taxonomy-driven-content-model.md # Modelo de datos y taxonomías
│   └── research/                     # Investigaciones e información divulgativa
│       ├── facciones-es.txt / en / de
│       ├── historia-es.txt / en / de
│       ├── personas.txt
│       └── stories.txt
│
├── src/
│   ├── components/                   # Componentes e Islas Interactivas (React)
│   │   ├── builder/                  # Calculadora y Creador de Tortillas
│   │   ├── comparator/               # Comparador de Facciones
│   │   ├── factions/                 # Páginas y tarjetas de Facciones
│   │   ├── recipes/                  # Listados y fichas de recetas
│   │   ├── safety/                   # Monitor e Indicador de Seguridad Alimentaria
│   │   └── ui/                       # Componentes base de UI (Button, Badge, Cards)
│   │
│   ├── content/                      # Colecciones de Contenido (Archivos JSON)
│   │   ├── recipes/                  # Recetas (clasica, betanzos, con-cebolla, etc.)
│   │   ├── taxonomies/               # Facciones, ingredientes, regiones, técnicas
│   │   ├── pages/                    # Páginas estáticas multilíngües
│   │   ├── navigation/               # Menús y navegación por idioma
│   │   └── settings/                 # Configuración global del sitio
│   │
│   ├── layouts/                      # Layouts de Astro (BaseLayout.astro, Header, Footer)
│   ├── lib/                          # Utilidades y motores de datos (taxonomy.ts, i18n.ts, etc.)
│   ├── pages/                        # Enrutamiento de Astro ([lang]/...)
│   └── content.config.ts             # Definición de Esquemas Zod para Astro Content Collections
│
├── tests/                            # Suites de test de Vitest
└── public/                           # Activos estáticos (imágenes de personas, ingredientes, facciones)
```

---

## 3. Arquitectura de Datos y Taxonomías

El sitio utiliza una arquitectura de **Contenido Guiado por Taxonomías** (*Taxonomy-Driven Content*):

1. **Relación entre Facciones y Recetas**:
   * Las recetas definen un array `taxonomyIds` (ej. `["faction:puristas", "ingredient:potato", "technique:confit"]`).
   * La función helper `getRecipesForTaxonomy()` resuelve dinámicamente qué recetas pertenecen a cada facción o ingrediente.

2. **Esquema de Colecciones (`src/content.config.ts`)**:
   * `recipes`: Título, descripción, tiempos, proporciones de huevo/patata, imagen, instrucciones multilíngües, y IDs de taxonomía.
   * `taxonomies`: Categorías (facciones, ingredientes, técnicas, regiones) con título, descripción, icono, imagen, dogma y figuras prominentes.

---

## 4. Estrategia de Internacionalización (i18n)

El sitio soporta tres idiomas nativos: **Español (`es`)**, **Inglés (`en`)** y **Alemán (`de`)**.

* **Rutas Localizadas**: Todas las páginas residen en `src/pages/[lang]/...`.
* **Traducción de Cadenas**: `src/lib/i18n.ts` proporciona helpers para obtener diccionarios y formatear URLs con el prefijo de idioma activo.

---

## 5. Reglas y Motor de Seguridad Alimentaria

El módulo de seguridad alimentaria aplica reglas térmicas e intervalos sanitarios estrictos:

* **Esterilización / Huevo Cuajado**: **70°C durante 2 minutos**.
* **Huevo Cuajado Mínimo**: **63°C durante 20 segundos**.
* **Límite a Temperatura Ambiente**: Máximo **4 horas** antes de requerir refrigeración a menos de **8°C**.

---

## 6. Verificación y Testing

El proyecto cuenta con suites de test automatizadas con **Vitest** ejecutables mediante `npm test`:

* `tests/recipes.test.ts`: Valida que todas las recetas cumplen con el esquema de datos.
* `tests/taxonomy.test.ts`: Comprueba la vinculación de taxonomías y facciones.
* `tests/safetyRules.test.ts`: Garantiza que las reglas de temperatura (**70°C por 2 minutos**, **63°C por 20 segundos**, **4 horas**) se calculen correctamente.
* `tests/contentIntegrity.test.ts` & `tests/seo.test.ts`: Verifican la integridad de enlaces, metadatos SEO e imágenes localizadas.

---

## 7. Documentación Relacionada

* **[Hoja de Ruta (Roadmap.md)](./Roadmap.md)**
* **[Seguridad y Sentry (Security.md)](./Security.md)**
* **[Estrategia SEO e i18n (SEO.md)](./SEO.md)**
* **[Licencia Open Source (License.md)](./License.md)**

