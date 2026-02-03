import { defineConfig } from "vitest/config";
import { resolve } from "path";

export default defineConfig({
  test: {
    globals: true,
    include: ["test/**/*.{test,spec}.ts"],
    exclude: ["node_modules", "dist"],
    coverage: {
      reporter: ["text", "json", "html"],
    },
    alias: {
      // 确保这里的路径指向你的源码根目录
      "@": resolve(__dirname, "./src"),
    },
  },
});
