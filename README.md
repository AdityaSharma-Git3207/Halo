# Halo

Halo is a premium desktop widget for Windows built with Electron, React, and Vite.

Designed to feel minimal, elegant, and useful, Halo brings essential information like time, date, and weather directly to your desktop through a polished floating widget experience.

---

## Preview

Halo provides a clean widget interface with:

- Live digital clock
- Current date
- Weather + location
- Light / Dark themes
- Smooth animations and transitions
- Frameless modern desktop widget UI

---

## Features

### Productivity Focused

Halo is designed to stay lightweight and glanceable.

- Quick time checks while working
- Weather visibility without opening apps
- Minimal distraction interface

### Premium UI

- Rounded modern widget design
- Soft shadows and gradients
- Dark / Light theme support
- Smooth theme switching animations

### Desktop Native Experience

- Built as a real Windows desktop application
- Remembers last size and position
- Resizable widget window
- Launch on startup support
- Custom Halo app icon

---

## Tech Stack

- **Electron** – Desktop application framework
- **React** – UI architecture
- **Vite** – Fast frontend tooling
- **CSS3** – Custom handcrafted UI styling
- **electron-store** – Persistent local settings

---

## Installation (Development)

Clone the repository:

```bash
git clone https://github.com/yourusername/halo.git
cd halo

## Install Dependencies

```bash
npm install
```

## Run in Development Mode

```bash
npm start
```

---

# Build Windows Installer

Create production build:

```bash
npm run dist
```

Installer output:

```text
release/Halo Setup.exe
```

---

# Project Structure

```text
Halo/
├── public/
│   └── icon.ico
├── src/
│   ├── App.jsx
│   └── App.css
├── main.js
├── preload.js
├── package.json
└── vite.config.js
```

---

# Current Version

## v1.0

- Core widget released
- Theme switching added
- Window state persistence
- Packaged Windows installer
- Custom branding + icon system

---

# Roadmap

- Quick Peek Mode
- System Tray Controls
- Sticky desktop behavior
- Notes widget
- Calendar widget
- CPU / RAM widgets
- Multiple widget packs

---

# Why Halo?

The name **Halo** is inspired by precision engineering and clean protective design — representing a desktop companion that quietly surrounds your workflow without disturbing it.

---

# Author

**Aditya Sharma**

---

# License

MIT License