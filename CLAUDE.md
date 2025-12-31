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
- `src/main.js` - Tab navigation logic
- `assets/images/` - Extracted project images from PDF documents
- `dist/` - Built production files
- `TODO.md` - Real-time project progress tracking
- `vercel.json` - Deployment configuration

### Key Features
- **Tab Navigation**: Three sections (Technology, Performance, Music Tech)
- **Responsive Design**: Grid layouts that adapt to different screen sizes
- **CSS Custom Properties**: Centralized theming via CSS variables
- **CSS Icons**: Pure geometric shapes instead of Unicode emojis
- **Real Images**: Extracted from PDF documents and integrated
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

### Deployment Status
- **Repository**: GitHub (EddieSnapped/my-portfolio.git)
- **Hosting**: Vercel with auto-deployment
- **URL**: Stable (autoAlias disabled)
- **Build**: Vite with relative paths for portability
- **Current Issue**: Images not loading in production (being resolved)

### Testing
- Test in multiple browsers (Chrome, Safari, Firefox)
- Verify responsive behavior on different screen sizes  
- Check tab navigation functionality
- **Verify image loading in both development and production**
- **Test CSS icons display correctly**

## Current Development Focus
Check `TODO.md` for real-time status of ongoing work. Current priority is resolving image display issues in Vercel production deployment.

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