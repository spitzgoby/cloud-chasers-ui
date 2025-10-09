import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  build: {
    rollupOptions: {
      external: (id) => {
        // Exclude problematic optional dependencies
        return id.includes('@rollup/rollup-') && id.includes('-gnu');
      }
    }
  },
  server: {
    hmr: true,
    proxy: {
      '/api': {
        target: 'https://pf3w7890x3.execute-api.us-east-1.amazonaws.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/dev')
      }
    }
  },
});
