import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://vardark.no',
  integrations: [sitemap({ i18n: { defaultLocale: 'nb', locales: { nb: 'nb-NO', en: 'en' } } })],
  i18n: { locales: ['nb', 'en'], defaultLocale: 'nb', routing: { prefixDefaultLocale: false } },
  // CSP har style-src 'self': aldri inline <style>
  build: { inlineStylesheets: 'never' },
  devToolbar: { enabled: false },
  // CSP har font-src 'self': ingen fonter som data:-URI
  vite: { build: { assetsInlineLimit: 0 } },
});
