import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    open: true,
    allowedHosts: ["5173-ir7vjheoecp638rojhbn3-3da20871.manusvm.computer"],
    hmr: {
      host: '0.0.0.0'
    },
    fs: {
      strict: false
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    outDir: 'dist'
  }
});

