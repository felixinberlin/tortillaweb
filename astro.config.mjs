import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { recipeSvgIntegration } from './src/integrations/recipeSvgIntegration.ts';

function virtualModuleMiddlewarePlugin() {
  return {
    name: 'virtual-module-middleware',
    configureServer(server) {
      const handler = (req, res, next) => {
        if (!req.url) return next();

        // Ensure CORS headers for dev preview in iframe
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', '*');

        if (req.method === 'OPTIONS') {
          res.statusCode = 204;
          res.end();
          return;
        }

        // Allow cross-origin requests within AI Studio iframe preview
        if (req.headers['sec-fetch-site'] === 'cross-site') {
          req.headers['sec-fetch-site'] = 'same-origin';
        }

        // Ensure before-hydration.js is always served as valid JS regardless of URL encoding or proxy path
        if (req.url.includes('before-hydration.js')) {
          res.setHeader('Content-Type', 'text/javascript; charset=utf-8');
          res.setHeader('Cache-Control', 'no-cache');
          res.end(
            'window.$RefreshReg$ = () => {};\n' +
            'window.$RefreshSig$ = () => (type) => type;\n'
          );
          return;
        }

        // Decode percent-encoded colons (%3A) in virtual module URLs (e.g. /@id/astro:scripts/...)
        if (req.url.includes('%3A') || req.url.includes('%3a')) {
          req.url = req.url.replace(/%3[Aa]/g, ':');
        }

        next();
      };

      // Unshift at the front of the middleware stack to run before Astro's secFetchMiddleware
      server.middlewares.stack.unshift({ route: '', handle: handler });
    },
  };
}

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false,
  },
  site: 'https://tortilladepatatas.org',
  security: {
    checkOrigin: false,
    allowedDomains: [{}],
  },
  integrations: [
    recipeSvgIntegration(),
    react(),
    sitemap({
      filter: (page) => !page.includes('/tienda') && !page.includes('/shop'),
      i18n: {
        defaultLocale: 'es',
        locales: {
          es: 'es',
          en: 'en',
          de: 'de',
        },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss(), virtualModuleMiddlewarePlugin()],
    resolve: {
      alias: {
        '@': '/src',
      },
      dedupe: ['react', 'react-dom'],
    },
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-dom/client',
        'react/jsx-runtime',
        'react/jsx-dev-runtime',
        'motion/react',
        'lucide-react',
        'clsx',
        'tailwind-merge',
        'class-variance-authority',
        'i18next',
        'react-i18next',
      ],
    },
    server: {
      allowedHosts: true,
      cors: true,
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
});
