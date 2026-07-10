import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 4260,
    host: true,
  },
  build: {
    rollupOptions: {
      input: {
        main: "./index.html",
        wordle: "./wordle.html",
        connections: "./connections.html",
      },
    },
  },
});
