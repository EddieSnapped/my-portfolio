import { NavigationManager } from './components/NavigationManager.js'
import { DataVisualization } from './components/DataVisualization.js'
import { AnimationManager } from './components/AnimationManager.js'

class PortfolioApp {
  constructor() {
    this.navigation = null
    this.dataViz = null
    this.animations = null
    this.init()
  }

  async init() {
    try {
      // Wait for DOM to be fully loaded
      if (document.readyState === 'loading') {
        await new Promise(resolve => {
          document.addEventListener('DOMContentLoaded', resolve)
        })
      }

      // Initialize components
      this.navigation = new NavigationManager()
      this.animations = new AnimationManager()
      
      // Initialize data visualization after a short delay to ensure DOM is ready
      setTimeout(() => {
        this.dataViz = new DataVisualization()
        this.animations.animateChartEntry()
      }, 500)

      // Setup performance monitoring
      this.setupPerformanceMonitoring()
      
      // Setup error handling
      this.setupErrorHandling()
      
      console.log('Portfolio application initialized successfully')
      
    } catch (error) {
      console.error('Failed to initialize portfolio application:', error)
      this.handleInitializationError(error)
    }
  }

  setupPerformanceMonitoring() {
    // Monitor Core Web Vitals
    if ('web-vital' in window) {
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(console.log)
        getFID(console.log)
        getFCP(console.log)
        getLCP(console.log)
        getTTFB(console.log)
      })
    }

    // Monitor resource loading
    window.addEventListener('load', () => {
      const navigationTiming = performance.getEntriesByType('navigation')[0]
      console.log('Page load metrics:', {
        domContentLoaded: navigationTiming.domContentLoadedEventEnd - navigationTiming.domContentLoadedEventStart,
        loadComplete: navigationTiming.loadEventEnd - navigationTiming.loadEventStart
      })
    })
  }

  setupErrorHandling() {
    window.addEventListener('error', (event) => {
      console.error('Global error:', event.error)
      this.reportError('JavaScript Error', event.error)
    })

    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled promise rejection:', event.reason)
      this.reportError('Promise Rejection', event.reason)
    })
  }

  handleInitializationError(error) {
    // Graceful degradation - show basic content even if JavaScript fails
    document.body.classList.add('js-error')
    
    // Show error message to user (for development only)
    if (import.meta.env.DEV) {
      const errorElement = document.createElement('div')
      errorElement.className = 'error-banner'
      errorElement.innerHTML = `
        <strong>Development Error:</strong> ${error.message}
        <button onclick="this.parentElement.remove()">×</button>
      `
      document.body.prepend(errorElement)
    }
  }

  reportError(type, error) {
    // In production, this would send to error reporting service
    if (import.meta.env.PROD) {
      // analytics.track('Error', { type, message: error.message })
    }
  }

  destroy() {
    // Cleanup method for SPA navigation or testing
    this.dataViz?.destroy()
    this.navigation = null
    this.animations = null
  }
}

// Initialize the application
new PortfolioApp()

// Export for potential testing or external access
export default PortfolioApp