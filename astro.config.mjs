import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://vardark.no',
  integrations: [sitemap()],
  // CSP har style-src 'self': aldri inline <style>
  build: { inlineStylesheets: 'never' },
  devToolbar: { enabled: false },
  // CSP har font-src 'self': ingen fonter som data:-URI
  vite: { build: { assetsInlineLimit: 0 } },
});
