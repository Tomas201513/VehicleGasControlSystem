import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port : 3000
  },
  resolve: {
      alias: {
        src: "/src"
      }
  }, optimizeDeps: {
    exclude: ['js-big-decimal'] // Replace 'js-big-decimal' with the dependency causing the issue
  }
});
