import { defineConfig } from 'vite'
import { resolve } from 'path'
import { readFileSync, writeFileSync, existsSync, copyFileSync, mkdirSync } from 'fs'

const copyManifest = () => ({
  name: 'copy-manifest',
  closeBundle() {
    const src = resolve(__dirname, 'manifest.json')
    const dest = resolve(__dirname, 'release', 'manifest.json')
    if (existsSync(src)) {
      const content = readFileSync(src, 'utf-8')
      writeFileSync(dest, content)
    }
    const assetsDir = resolve(__dirname, 'release', 'assets')
    if (!existsSync(assetsDir)) {
      mkdirSync(assetsDir, { recursive: true })
    }
    const logoSrc = resolve(__dirname, 'assets', 'logo.png')
    const logoDest = resolve(__dirname, 'release', 'assets', 'logo.png')
    if (existsSync(logoSrc)) {
      copyFileSync(logoSrc, logoDest)
    }
    const bannerSrc = resolve(__dirname, 'assets', 'banner.png')
    const bannerDest = resolve(__dirname, 'release', 'assets', 'banner.png')
    if (existsSync(bannerSrc)) {
      copyFileSync(bannerSrc, bannerDest)
    }
    const uiDir = resolve(__dirname, 'release', 'js')
    if (!existsSync(uiDir)) {
      mkdirSync(uiDir, { recursive: true })
    }
    const skipixJsSrc = resolve(__dirname, 'src/ui/skipix.js')
    const skipixJsDest = resolve(__dirname, 'release', 'js/skipix.js')
    if (existsSync(skipixJsSrc)) {
      copyFileSync(skipixJsSrc, skipixJsDest)
    }
  }
})

export default defineConfig({
  plugins: [copyManifest()],
  base: './',
  build: {
    outDir: 'release',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        skipix: resolve(__dirname, 'skipix.html'),
        background: resolve(__dirname, 'src/core/service-worker.ts'),
        content: resolve(__dirname, 'src/core/ad-skipper.js')
      },
      output: {
        entryFileNames: 'js/[name].js',
        chunkFileNames: 'js/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  },
  define: {
    'import.meta.env': '{}'
  }
})