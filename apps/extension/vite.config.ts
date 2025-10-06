import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";
import path, { resolve } from "path";

export default defineConfig(({ mode }) => {
  const isContent = mode === "content";

  return {
    plugins: [
      react(),
      tailwindcss(),
      viteStaticCopy({
        targets: [
          { src: "manifest.json", dest: "." },
          { src: "public/*", dest: "." },
        ],
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    build: {
      rollupOptions: {
        input: isContent
          ? resolve(__dirname, "src/content.tsx")
          : {
              popup: resolve(__dirname, "index.html"),
              background: resolve(__dirname, "src/background.ts"),
            },
        output: {
          entryFileNames: isContent ? "content.js" : "[name].js",
          format: isContent ? "iife" : "es",
        },
      },
      outDir: "dist",
      emptyOutDir: !isContent,
    },
  };
});
