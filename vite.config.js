import { defineConfig } from 'vite'

export default defineConfig({
  root: 'src',
  base: './', // 确保相对路径，避免部署后路径问题
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    sourcemap: true,
    assetsDir: 'assets', // 明确指定资源目录
    rollupOptions: {
      input: {
        main: 'src/index.html'
      },
      output: {
        assetFileNames: (assetInfo) => {
          // 保持音频文件的目录结构
          if (assetInfo.name && assetInfo.name.endsWith('.mp3')) {
            return 'assets/music/[name].[ext]'
          }
          return 'assets/[name]-[hash].[ext]'
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true
  },
  assetsInclude: ['**/*.mp3'] // 明确包含音频文件
})