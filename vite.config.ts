import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// 👉 Dies ist ALLES, was du für GitHub Pages brauchst
export default defineConfig({
  base: "/ai-mampf/",  // wichtig für GitHub Pages
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
