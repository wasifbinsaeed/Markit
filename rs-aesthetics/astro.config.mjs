import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://rsaesthetics.pk',
  trailingSlash: 'never',
  image: {
    domains: [],
  },
  integrations: [sitemap()],
});
