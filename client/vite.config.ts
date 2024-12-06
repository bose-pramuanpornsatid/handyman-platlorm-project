import * as path from 'path';

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import EnvironmentPlugin from 'vite-plugin-environment';

// https://vitejs.dev/config/
export default defineConfig({
  base: './', // Ensures all paths are relative, especially useful for Firebase Hosting
  build: {
    sourcemap: true,
  },
  plugins: [react(), EnvironmentPlugin(['REACT_APP_TEXT'])],
  publicDir: 'public',
  server: {
    host: true,
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://pythonapi-995028621724.us-central1.run.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});