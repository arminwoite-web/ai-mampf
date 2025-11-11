import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { fileURLToPath } from 'url';

// fix für __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  base: "/ai-mampf/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      // 🚫 schließt Backend/Deno-Dateien explizit vom Build aus
      external: [
        "src/api/main-api.ts"
      ],
    },
  },
  optimizeDeps: {
    exclude: ["src/api/main-api.ts"],
  },
});
