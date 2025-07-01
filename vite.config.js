import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/bahrain_fine_art/', // ✅ This is correct
  plugins: [react()],
  build: {
    assetsDir: 'assets', // ✅ Ensures correct asset path
  }
});
