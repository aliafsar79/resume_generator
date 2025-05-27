import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',  // default is 'dist', just make sure it matches
  },
  server: {
    host: true,
    port: 5173,
    strictPort: true,
  },
});
