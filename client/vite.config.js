import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false,  
  },
  css: {
    devSourcemap: false, 
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') 
      }
    },
    historyApiFallback: true,  
  },
  hmr: {
    overlay: false
  }
});
