import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  logLevel: "error",
  plugins: [react()],
  base: '/', // Change this to '/your-repo-name/' if deploying to a project page (not user.github.io)
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
})