import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  logLevel: "error",
  plugins: [react()],
  base: '/', // Change this to '/your-repo-name/' if deploying to a project page (not user.github.io)
  build: {
    outDir: 'dist',
  },
})