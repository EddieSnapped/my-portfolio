import { defineConfig } from 'vite'

export default defineConfig({
  root: 'src',
  base: './', // 确保相对路径，避免部署后路径问题
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    sourcemap: true,
    assetsDir: 'assets', // 明确指定资源目录
  },
  server: {
    port: 3000,
    open: true
  }
})