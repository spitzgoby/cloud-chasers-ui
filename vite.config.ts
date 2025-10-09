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
        target: 'https://2oxmer2e7xpnc5dpofyczm5tri0xuxar.lambda-url.us-east-1.on.aws',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/s3': {
        target: 'https://cloudchasers-image-bucket.s3.amazonaws.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/s3/, ''),
      }
    }
  },
});
