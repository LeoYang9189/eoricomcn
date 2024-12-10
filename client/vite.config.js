import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

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
    postcss: {
      plugins: [
        tailwindcss('./tailwind.config.cjs'),
        autoprefixer()
      ]
    }
  }
}); 