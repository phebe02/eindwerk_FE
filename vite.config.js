// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ["react", "react-dom", "@reduxjs/toolkit", "react-redux"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "@reduxjs/toolkit": "RTK",
          "react-redux": "ReactRedux",
        },
      },
    },
  },
});
