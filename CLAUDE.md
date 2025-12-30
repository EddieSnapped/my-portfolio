# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static personal portfolio website for Stone, designed for university admissions. The site is a Single Page Application (SPA) showcasing three main areas: Technology, Performance, and Music Technology.

## Architecture

- **Technology Stack**: Pure HTML/CSS/JavaScript (no build tools or frameworks)
- **Structure**: Single page with tab-based navigation
- **Styling**: CSS variables for consistent theming, responsive grid layouts
- **JavaScript**: Simple tab switching functionality with DOM manipulation

## Development Workflow

### Running the Site
```bash
# Open directly in browser
open index.html

# Or use a local server for better development experience
npx live-server .
# or
python3 -m http.server 8000
```

### File Structure
- `index.html` - Main entry point with all content sections
- `css/style.css` - Complete styling with CSS custom properties
- `js/script.js` - Tab navigation logic
- `assets/images/` - Image assets (currently using placeholders)
- `docs/` - Reference materials and project documentation

### Key Features
- **Tab Navigation**: Three sections (Technology, Performance, Music Tech)
- **Responsive Design**: Grid layouts that adapt to different screen sizes
- **CSS Custom Properties**: Centralized theming via CSS variables
- **Image Placeholders**: Content areas marked for future image integration

### Content Modification
- Update content directly in `index.html` within the respective page sections
- Modify styling in `css/style.css` 
- Navigation behavior controlled in `js/script.js`
- Replace image placeholders by adding files to `assets/images/` and updating HTML

### Design System
- **Primary Colors**: Deep slate (`#2C3E50`) and dark gold (`#C5A065`)
- **Typography**: Playfair Display for headings, Roboto for body text
- **Layout**: CSS Grid for responsive layouts
- **Components**: Card-based design with consistent spacing

### Testing
- Test in multiple browsers (Chrome, Safari, Firefox)
- Verify responsive behavior on different screen sizes
- Check tab navigation functionality