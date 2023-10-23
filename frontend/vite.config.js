import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api/v2": {
        target: "https://qlsp86-5000.csb.app",
        changeOrigin: true,
      },
    },
  },
});
