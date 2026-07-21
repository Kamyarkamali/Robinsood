import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0",
    allowedHosts: [
      "new-panel.robinsood.org",
      "new-panel2.robinsood.org",
      "panel.robinsood.org",
      "localhost",
      "127.0.0.1",
    ],
  },
});
