import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';

// https://astro.build/config
export default defineConfig({
    site: isGitHubPages
    ? 'https://felixinberlin.github.io/tortillaweb/'
    : 'https://tortilladepatatas.org',

  base: isGitHubPages ? '/tortillaweb/' : '/',

  integrations: [
    react(),
    sitemap({
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
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  },

  server: {
    host: '0.0.0.0',
    port: 3000,
  },
});