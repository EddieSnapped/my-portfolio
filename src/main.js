import { NavigationManager } from './components/NavigationManager.js'
import { SimpleVisualization } from './components/SimpleVisualization.js'
import { EffectsManager } from './components/EffectsManager.js'

class PortfolioApp {
  constructor() {
    this.navigation = null
    this.visualization = null
    this.effects = null
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

      // Initialize core components
      this.navigation = new NavigationManager()
      this.effects = new EffectsManager()
      
      // Initialize visualization after a short delay
      setTimeout(() => {
        this.visualization = new SimpleVisualization()
      }, 300)

      console.log('✨ Portfolio application with dynamic effects initialized successfully')
      
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
    if (this.effects) {
      this.effects.destroy()
      this.effects = null
    }
  }
}

// Initialize the application
new PortfolioApp()

// Export for potential testing or external access
export default PortfolioApp