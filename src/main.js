import { NavigationManager } from './components/NavigationManager.js'
import { SimpleVisualization } from './components/SimpleVisualization.js'

class PortfolioApp {
  constructor() {
    this.navigation = null
    this.visualization = null
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
      
      // Initialize visualization after a short delay
      setTimeout(() => {
        this.visualization = new SimpleVisualization()
      }, 300)

      console.log('Portfolio application initialized successfully')
      
    } catch (error) {
      console.error('Failed to initialize portfolio application:', error)
      this.handleInitializationError(error)
    }
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

  destroy() {
    // Cleanup method
    this.navigation = null
    this.visualization = null
  }
}

// Initialize the application
new PortfolioApp()

// Export for potential testing or external access
export default PortfolioApp