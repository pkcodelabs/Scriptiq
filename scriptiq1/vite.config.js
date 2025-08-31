import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { visualizer } from "rollup-plugin-visualizer"; // Optional, for visual report

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true, // open in browser after build
      filename: "bundle-report.html",
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  build: {
    sourcemap: true,
    rollupOptions: {
      external: [
        "antd/es/upload/style",
        "antd/es/upload/style/css",
        "antd/es/message/style",
        "antd/es/message/style/css",
        // add other style imports if needed
      ],
    }, // ✅ enables bundle analysis tools
  },
  optimizeDeps: {
    exclude: ["universal-form-builder"], // ✅ exclude your lib if needed
  },
  server: {
    host: "0.0.0.0", // listen on all network interfaces
    port: 5173,
  },
});
