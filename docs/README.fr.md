<p align="center">
  <img src="../assets/banner.png" alt="Skipix Banner" width="100%" />
</p>

<h1 align="center">Skipix</h1>
<p align="center">Extension de navigateur qui saute automatiquement les publicités sur Netflix.</p>

<p align="center">
  <a href="../README.md">🇬🇧 English</a> &nbsp;|&nbsp;
  <a href="README.es.md">🇪🇸 Español</a> &nbsp;|&nbsp;
  <a href="README.zh.md">🇨🇳 中文</a> &nbsp;|&nbsp;
  <b>🇫🇷 Français</b>
</p>

---

## Introduction

Skipix est une extension de navigateur légère qui détecte automatiquement les publicités sur Netflix et les saute, tout en enregistrant le temps économisé.

---

## Comment ça fonctionne

Lorsqu'une publicité est détectée sur Netflix, Skipix :

1. Détecte la publicité en recherchant un élément DOM Netflix spécifique (`span[class*="mmvz9h"]`)
2. Règle la vitesse de lecture à **8×** (3× sur Edge) pour la sauter rapidement
3. Coupe le son de la vidéo pendant la publicité
4. Restore la lecture normale à la fin de la publicité
5. Enregistre le temps sauté et le nombre de segments dans vos statistiques locales

---

## Installation (mode développeur)

> Pas encore disponible dans une boutique — chargez-la manuellement dans votre navigateur.

### Chrome / Edge / Brave

1. Clonez ou téléchargez ce dépôt
2. Construisez l'extension :
   ```bash
   npm install
   npm run build
   ```
3. Ouvrez le navigateur et allez sur `chrome://extensions` (ou `edge://extensions`)
4. Activez le **mode développeur** (toggle en haut à droite)
5. Cliquez sur **Charger décompacté**
6. Sélectionnez le dossier `dist/` généré

### Firefox

1. Allez sur `about:debugging#/runtime/this-firefox`
2. Cliquez sur **Charger un module complémentaires temporaire**
3. Sélectionnez n'importe quel fichier dans le dossier `dist/`

---

## Développement local

```bash
# Installer les dépendances
npm install

# Construire et surveiller les changements
npm run build

# Build de production
npm run build
```

Après avoir lancé `npm run dev`, rechargez l'extension dans `chrome://extensions` à chaque changement.

---

## Structure du projet

```
skipix/
├── src/
│   ├── core/
│   │   ├── ad-skipper.js       # Logique principale du saut de publicité
│   │   └── service-worker.ts   # Service worker d'arrière-plan
│   └── ui/
│       └── skipix.js            # Logique de Skipix
├── release/                     # Sortie du build (charger ce dossier dans le navigateur)
├── docs/                       # READMEs traduits
├── skipix.html                 # Interface Skipix
├── assets/logo.png              # Icône de l'extension
├── manifest.json
├── package.json
└── vite.config.ts
```

---

## ⚠️ Clause de responsabilité

**Skipix est fourni uniquement à des fins éducatives.** L'auteur n'est pas responsable de toute utilisation abusive de cette extension. L'utilisation d'outils d'automatisation pour sauter les publicités peut violer les Conditions d'utilisation de Netflix. Utiliser à vos propres risques.

---

<div align="center">

**⭐ Soutenez ce projet de toutes les façons possibles !**

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/J3J41W702I)
<a href="https://github.com/InlitX/skipix/stargazers"><img src="https://img.shields.io/github/stars/InlitX/skipix?style=plastic&logo=github" alt="GitHub stars" width="140"></a>

Fait avec ❤️ pour la communauté

</div>