export class NavigationManager {
  constructor() {
    this.currentPage = 'tech'
    this.pages = ['tech', 'performance', 'music-tech']
    this.init()
  }

  init() {
    this.bindEvents()
    this.setInitialState()
    this.setupKeyboardNavigation()
  }

  bindEvents() {
    const navButtons = document.querySelectorAll('[data-nav-button]')
    navButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const targetPage = e.target.dataset.navButton
        this.navigateToPage(targetPage)
      })
    })
  }

  navigateToPage(pageId) {
    if (pageId === this.currentPage || !this.pages.includes(pageId)) return

    this.hideCurrentPage()
    this.showTargetPage(pageId) 
    this.updateNavigation(pageId)
    this.currentPage = pageId
    this.announcePageChange(pageId)
  }

  hideCurrentPage() {
    const currentSection = document.getElementById(`${this.currentPage}-page`)
    if (currentSection) {
      currentSection.classList.remove('active')
      currentSection.setAttribute('aria-hidden', 'true')
    }
  }

  showTargetPage(pageId) {
    const targetSection = document.getElementById(`${pageId}-page`)
    if (targetSection) {
      targetSection.classList.add('active')
      targetSection.setAttribute('aria-hidden', 'false')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  updateNavigation(pageId) {
    const navButtons = document.querySelectorAll('[data-nav-button]')
    navButtons.forEach(button => {
      const isActive = button.dataset.navButton === pageId
      button.classList.toggle('active', isActive)
      button.setAttribute('aria-pressed', isActive.toString())
    })
  }

  setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      if (e.key >= '1' && e.key <= '3') {
        const pageIndex = parseInt(e.key) - 1
        if (this.pages[pageIndex]) {
          this.navigateToPage(this.pages[pageIndex])
        }
      }
    })
  }

  setInitialState() {
    this.updateNavigation(this.currentPage)
    this.showTargetPage(this.currentPage)
  }

  announcePageChange(pageId) {
    const announcer = document.getElementById('page-announcer')
    if (announcer) {
      announcer.textContent = `Navigated to ${pageId.replace('-', ' ')} section`
    }
  }
}