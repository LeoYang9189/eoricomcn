import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import path from 'path';

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
    dedupe: ['react'],
    alias: {
      'tailwind.config.js': path.resolve(__dirname, 'tailwind.config.cjs')
    }
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss(path.resolve(__dirname, 'tailwind.config.cjs')),
        autoprefixer()
      ]
    }
  }
}); 