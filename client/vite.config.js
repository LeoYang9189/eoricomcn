import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: [],
    },
  },
  optimizeDeps: {
    include: []
  },
  resolve: {
    dedupe: ['react']
  },
  css: {
    postcss: './postcss.config.js'
  }
}); 