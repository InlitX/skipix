<p align="center">
  <img src="../assets/banner.png" alt="Skipix Banner" width="100%" />
</p>

<h1 align="center">Skipix</h1>
<p align="center">Extensión de navegador que salta automáticamente los anuncios de Netflix.</p>

<p align="center">
  <a href="../README.md">🇬🇧 English</a> &nbsp;|&nbsp;
  <a href="README.fr.md">🇫🇷 Français</a> &nbsp;|&nbsp;
  <a href="README.zh.md">🇨🇳 中文</a>
</p>

---

## Descripción

Skipix es una extensión de navegador ligera que detecta los anuncios de Netflix y los salta automáticamente, registrando cuánto tiempo te ahorras en el proceso.

---

## Cómo funciona

Cuando se detecta un anuncio en Netflix, Skipix:

1. Localiza el anuncio buscando un elemento DOM específico de Netflix (`span[class*="mmvz9h"]`)
2. Acelera la reproducción a **8×** (o 3× en Edge) para avanzar rápido
3. Silencia el vídeo para que no se escuche audio durante el anuncio
4. Restaura la velocidad normal en cuanto el anuncio termina
5. Registra el tiempo saltado y el número de segmentos en tus estadísticas locales

---

## Instalación (Modo Desarrollador)

> Aún no está en ninguna tienda — cárgala manualmente en tu navegador.

### Chrome / Edge / Brave

1. Clona o descarga este repositorio
2. Compila la extensión:
   ```bash
   npm install
   npm run build
   ```
3. Abre el navegador y ve a `chrome://extensions` (o `edge://extensions`)
4. Activa el **Modo desarrollador** (interruptor en la esquina superior derecha)
5. Haz clic en **Cargar descomprimida**
6. Selecciona la carpeta `dist/` generada por la compilación

### Firefox

1. Ve a `about:debugging#/runtime/this-firefox`
2. Haz clic en **Cargar complemento temporal**
3. Selecciona cualquier archivo dentro de la carpeta `dist/`

---

## Desarrollo local

```bash
# Instalar dependencias
npm install

# Compilar y observar cambios
npm run dev

# Compilación para producción
npm run build
```

Tras ejecutar `npm run dev`, recarga la extensión en `chrome://extensions` cada vez que hagas cambios.

---

## Estructura del proyecto

```
skipix/
├── src/
│   ├── core/
│   │   ├── ad-skipper.js       # Lógica principal de salto de anuncios
│   │   └── service-worker.ts   # Service worker en segundo plano
│   └── ui/
│       └── skipix.js            # Lógica de Skipix
├── release/                     # Resultado de la compilación (cargar en el navegador)
├── docs/                       # READMEs traducidos
├── skipix.html                 # Interfaz de Skipix
├── assets/logo.png              # Icono de la extensión
├── manifest.json
├── package.json
└── vite.config.ts
```

---

## ⚠️ Aviso legal

**Skipix se proporciona solo con fines educativos.** El autor no se hace responsable del uso indebido de esta extensión. El uso de herramientas de automatización para saltar anuncios puede violar los Términos de Servicio de Netflix. Usar bajo tu propia responsabilidad.

---

<div align="center">

**⭐ ¡Apoya este proyecto de cualquier manera posible!**

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/J3J41W702I)
<a href="https://github.com/InlitX/skipix/stargazers"><img src="https://img.shields.io/github/stars/InlitX/skipix?style=plastic&logo=github" alt="GitHub stars" width="140"></a>

Hecho con ❤️ para la comunidad

</div>
