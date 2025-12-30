export class NavigationManager {
  constructor() {
    this.currentPage = 'tech'
    this.pages = ['tech', 'performance', 'music-tech']
    this.init()
  }

  init() {
    this.bindEvents()
    this.setInitialState()
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
  }

  hideCurrentPage() {
    const currentSection = document.getElementById(`${this.currentPage}-page`)
    if (currentSection) {
      currentSection.classList.remove('active')
    }
  }

  showTargetPage(pageId) {
    const targetSection = document.getElementById(`${pageId}-page`)
    if (targetSection) {
      targetSection.classList.add('active')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  updateNavigation(pageId) {
    const navButtons = document.querySelectorAll('[data-nav-button]')
    navButtons.forEach(button => {
      const isActive = button.dataset.navButton === pageId
      button.classList.toggle('active', isActive)
    })
  }

  setInitialState() {
    this.updateNavigation(this.currentPage)
    this.showTargetPage(this.currentPage)
  }
}