# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static personal portfolio website for Stone, designed for university admissions. The site is a Single Page Application (SPA) showcasing three main areas: Technology, Performance, and Music Technology. **Currently internationalized with English-only content and CSS-based icons.**

## Architecture

- **Technology Stack**: Vite + HTML/CSS/JavaScript
- **Structure**: Single page with tab-based navigation  
- **Styling**: CSS variables for consistent theming, responsive grid layouts, pure CSS geometric icons
- **JavaScript**: Simple tab switching functionality with DOM manipulation
- **Deployment**: Vercel with GitHub auto-deployment

## Development Workflow

### Running the Site
```bash
# Development server (recommended)
npm run dev
# or use startup scripts
./start.sh    # Unix/Mac
start.bat     # Windows

# Build for production
npm run build

# Preview production build
npm run preview
```

### File Structure
- `src/index.html` - Main entry point with all content sections (English-only)
- `src/styles/pages.css` - Complete styling with CSS custom properties and CSS icons
- `src/components/AudioPlayer.js` - Audio playback functionality
- `src/main.js` - Tab navigation and app initialization
- `src/assets/images/` - Project images (photos, diagrams, screenshots)
- `src/assets/music/` - MP3 audio files for music technology section
- `dist/` - Built production files
- `vercel.json` - Deployment configuration

### Key Features
- **Tab Navigation**: Three sections (Technology, Performance, Music Tech)
- **Interactive Cards**: Clickable cards with smooth scroll navigation to project details
- **Responsive Design**: Grid layouts that adapt to different screen sizes
- **CSS Custom Properties**: Centralized theming via CSS variables
- **CSS Icons**: Pure geometric shapes instead of Unicode emojis
- **Real Images**: Extracted from documents and integrated with multiple layout variants
- **Audio Integration**: Embedded music player with MP3 playback capabilities
- **Internationalized**: English-only content for university applications

### Content Modification
- Update content directly in `src/index.html` within the respective page sections
- Modify styling in `src/styles/pages.css` 
- Navigation behavior controlled in `src/main.js`
- Images stored in `assets/images/` folder
- **ALWAYS check TODO.md for current project status and pending tasks**

### Design System
- **Primary Colors**: Deep slate (`#2C3E50`) and dark gold (`#C5A065`)
- **Typography**: Playfair Display for headings, Inter for body text
- **Layout**: CSS Grid for responsive layouts
- **Icons**: CSS-based geometric shapes (piano-icon, clarinet-icon, etc.)
- **Components**: Card-based design with consistent spacing
- **Audio Player**: Fixed-position player with progress bar and controls

### Audio System
- **Files**: MP3 format stored in `src/assets/music/`
- **Player**: AudioPlayer.js class with play/pause/stop/progress controls
- **Integration**: Preload links in HTML head ensure Vite includes files in build
- **Paths**: Relative paths `./assets/music/` compatible with Vite's `base: './'` config
- **Build**: Custom `assetFileNames` configuration preserves directory structure

### Deployment Status
- **Repository**: GitHub (EddieSnapped/my-portfolio.git)
- **Hosting**: Vercel with auto-deployment
- **URL**: https://my-portfolio-stoneli.vercel.app/
- **Build**: Vite with relative paths (`base: './'`) for portability
- **Assets**: All static files properly configured for production deployment

### Critical Deployment Lessons
- **Audio Files**: Must be explicitly referenced in HTML (`<link rel="preload">`) for Vite to include them in build
- **Path Configuration**: Use relative paths (`./assets/`) not absolute (`/assets/`) to match Vite's `base: './'` setting
- **Asset Configuration**: Custom `assetFileNames` in `vite.config.js` preserves directory structure in production
- **Build Verification**: Always check `dist/` folder structure matches expected paths before deployment
- **Static Assets**: Vite only bundles referenced assets; dynamic imports need explicit configuration

### Testing
- Test in multiple browsers (Chrome, Safari, Firefox)
- Verify responsive behavior on different screen sizes  
- Check tab navigation functionality
- **Test audio playback in both development and production environments**
- **Verify card click navigation and smooth scrolling**
- **Check all image assets load correctly**
- **Test audio player controls and progress bar**

## Current Status
Portfolio is fully functional with interactive navigation, diverse layout variants, and working audio integration. All assets properly configured for production deployment.

## Important Vite Configuration
```javascript
// vite.config.js
export default defineConfig({
  root: 'src',
  base: './', // Critical for relative paths
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.mp3')) {
            return 'assets/music/[name].[ext]' // Preserve music directory
          }
          return 'assets/[name]-[hash].[ext]'
        }
      }
    }
  },
  assetsInclude: ['**/*.mp3'] // Include audio files
})
```

## Commands Reference
```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production  
npm run preview      # Preview production build
npm run lint         # Lint code
npm run format       # Format code

# Deployment  
git add . && git commit -m "message" && git push  # Auto-deploys to Vercel
```