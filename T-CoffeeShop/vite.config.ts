import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default () => {
  return defineConfig({
    root: "./src/frontend",
    base: "",
    plugins: [
      tsconfigPaths(),
      react(),
      {
        name: "override-config",
        config: (config) => ({
          build: {
            target: "esnext",
          },
        }),
      },
    ],
    build: { chunkSizeWarningLimit: 1600 },
  });
};
