<p align="center">
  <img src="../assets/banner.png" alt="Skipix Banner" width="100%" />
</p>

<h1 align="center">Skipix</h1>
<p align="center">自动跳过 Netflix 广告的浏览器扩展。</p>

<p align="center">
  <a href="../README.md">🇬🇧 English</a> &nbsp;|&nbsp;
  <a href="README.fr.md">🇫🇷 Français</a> &nbsp;|&nbsp;
  <a href="README.es.md">🇪🇸 Español</a>
</p>

---

## 简介

Skipix 是一个轻量级浏览器扩展，能自动检测并跳过 Netflix 广告，同时记录为您节省的时间。

---

## 工作原理

当检测到 Netflix 广告时，Skipix 会：

1. 通过查找特定 Netflix DOM 元素（`span[class*="mmvz9h"]`）来识别广告
2. 将播放速度加速至 **8×**（Edge 浏览器为 3×）以快速跳过
3. 在广告播放期间静音视频
4. 广告结束后立即恢复正常播放速度
5. 将跳过的时间和片段数量记录到本地统计信息中

---

## 安装（开发者模式）

> 尚未上架应用商店 — 请手动加载到浏览器中。

### Chrome / Edge / Brave

1. 克隆或下载本仓库
2. 构建扩展：
   ```bash
   npm install
   npm run build
   ```
3. 打开浏览器，访问 `chrome://extensions`（或 `edge://extensions`）
4. 开启**开发者模式**（右上角切换开关）
5. 点击**加载已解压的扩展程序**
6. 选择构建生成的 `dist/` 文件夹

### Firefox

1. 访问 `about:debugging#/runtime/this-firefox`
2. 点击**临时载入附加组件**
3. 选择 `dist/` 文件夹中的任意文件

---

## 本地开发

```bash
# 安装依赖
npm install

# 构建并监听文件变化
npm run dev

# 生产环境构建
npm run build
```

运行 `npm run dev` 后，每次修改代码时请在 `chrome://extensions` 中重新加载扩展。

---

## 项目结构

```
skipix/
├── src/
│   ├── core/
│   │   ├── ad-skipper.js       # 广告跳过核心逻辑
│   │   └── service-worker.ts   # 后台 Service Worker
│   └── ui/
│       └── skipix.js            # Skipix 界面逻辑
├── release/                     # 构建输出（在浏览器中加载此文件夹）
├── docs/                       # 多语言 README
├── skipix.html                 # Skipix 界面
├── assets/logo.png              # 扩展图标
├── manifest.json
├── package.json
└── vite.config.ts
```

---

## ⚠️ 免责声明

**Skipix 仅供教育目的提供。** 作者不对本扩展的任何误用负责。使用自动化工具跳过广告可能违反 Netflix 的服务条款。使用需自行承担风险。

---

<div align="center">

**⭐ 用任何方式支持这个项目！**

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/J3J41W702I)
<a href="https://github.com/InlitX/skipix/stargazers"><img src="https://img.shields.io/github/stars/InlitX/skipix?style=plastic&logo=github" alt="GitHub stars" width="140"></a>

用 ❤️ 为社区制作

</div>
