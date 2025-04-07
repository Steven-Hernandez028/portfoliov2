// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0',
    allowedHosts: [
      'portfoliov2-production-b07e.up.railway.app' // permite este dominio
    ]
  }
});
