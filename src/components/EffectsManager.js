/**
 * 动态效果管理器
 * 处理页面滚动、背景变化、动画效果等
 */
export class EffectsManager {
  constructor() {
    this.scrollThrottle = null
    this.lastScrollY = 0
    this.isScrolling = false
    this.currentSection = 'tech'
    
    // 主题配置
    this.themes = {
      tech: {
        '--bg-theme': '#f8fafc',
        '--bg-theme-secondary': '#e2e8f0',
        '--theme-accent': '#3b82f6'
      },
      performance: {
        '--bg-theme': '#fef7e5',
        '--bg-theme-secondary': '#fed7aa',
        '--theme-accent': '#f59e0b'
      },
      'music-tech': {
        '--bg-theme': '#1e293b',
        '--bg-theme-secondary': '#334155',
        '--theme-accent': '#8b5cf6'
      }
    }
    
    this.init()
  }

  init() {
    this.setupScrollEffects()
    this.setupIntersectionObserver()
    this.setupParallaxEffect()
    this.setupProgressIndicator()
    this.setupAnimatedEntries()
    this.setupNavigationAnimation()
    console.log('✨ Dynamic effects initialized')
  }

  // 滚动背景颜色变化
  setupScrollEffects() {
    let ticking = false
    
    const updateOnScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', updateOnScroll, { passive: true })
  }

  handleScroll() {
    const scrollY = window.scrollY
    const windowHeight = window.innerHeight
    
    // 检测当前在哪个section
    const sections = document.querySelectorAll('.page-section')
    sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect()
      const threshold = windowHeight * 0.3
      
      if (rect.top <= threshold && rect.bottom >= -threshold) {
        const sectionId = section.id.replace('-page', '')
        this.switchTheme(sectionId)
      }
    })

    // 导航栏滚动隐藏/显示
    this.handleNavigationScroll(scrollY)
    
    // 更新阅读进度
    this.updateReadingProgress()
    
    this.lastScrollY = scrollY
  }

  // 主题切换
  switchTheme(sectionId) {
    if (this.currentSection === sectionId) return
    
    this.currentSection = sectionId
    const theme = this.themes[sectionId]
    
    if (theme) {
      const root = document.documentElement
      Object.entries(theme).forEach(([property, value]) => {
        root.style.setProperty(property, value)
      })
      
      // 添加平滑过渡
      document.body.style.transition = 'background-color 0.6s ease'
      document.body.style.backgroundColor = theme['--bg-theme']
    }
  }

  // 设置IntersectionObserver用于元素进入动画
  setupIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -20% 0px'
    }

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view')
        }
      })
    }, observerOptions)

    // 观察所有可动画元素
    const animatedElements = document.querySelectorAll(
      '.card, .project-story, .activity-card, .section-header'
    )
    
    animatedElements.forEach(el => {
      el.classList.add('animate-on-scroll')
      this.observer.observe(el)
    })
  }

  // 视差效果
  setupParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.hero')
    
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset
      
      parallaxElements.forEach(element => {
        const rate = scrolled * -0.5
        element.style.transform = `translate3d(0, ${rate}px, 0)`
      })
    }, { passive: true })
  }

  // 阅读进度指示器
  setupProgressIndicator() {
    // 创建进度圆形指示器元素
    const progressIndicator = document.createElement('div')
    progressIndicator.className = 'reading-progress'
    progressIndicator.textContent = '0%'
    document.body.appendChild(progressIndicator)
  }

  updateReadingProgress() {
    const progressIndicator = document.querySelector('.reading-progress')
    if (!progressIndicator) return

    const winScroll = document.body.scrollTop || document.documentElement.scrollTop
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
    const scrolled = (winScroll / height) * 100
    
    progressIndicator.textContent = Math.round(Math.min(scrolled, 100)) + '%'
  }

  // 导航栏滚动动画
  setupNavigationAnimation() {
    this.navigation = document.querySelector('.nav')
  }

  handleNavigationScroll(scrollY) {
    if (!this.navigation) return

    // 导航栏始终显示，不进行隐藏操作
    this.navigation.classList.remove('nav--hidden')
  }

  // 动画入场设置
  setupAnimatedEntries() {
    // 为主要卡片添加3D悬停效果（排除音乐播放相关元素）
    const majorCards = document.querySelectorAll('.card, .activity-card')
    majorCards.forEach(card => {
      // 确保不是音乐播放器或音乐轨道
      if (!card.closest('.audio-player') && !card.classList.contains('music-track')) {
        card.addEventListener('mouseenter', (e) => {
          // 确保只对卡片容器本身应用效果，停止事件冒泡
          if (e.target === card) {
            e.target.style.transform = 'perspective(1000px) rotateX(5deg) rotateY(5deg) scale(1.01)'
          }
        })
        
        card.addEventListener('mouseleave', (e) => {
          if (e.target === card) {
            e.target.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)'
          }
        })
        
        card.addEventListener('mousemove', (e) => {
          // 只对卡片容器应用，调整倾斜角度到9度
          if (e.target === card) {
            const rect = e.target.getBoundingClientRect()
            const centerX = rect.left + rect.width / 2
            const centerY = rect.top + rect.height / 2
            
            // 倾斜系数调整，最大角度约为 ±9度
            const rotateX = Math.max(-9, Math.min(9, (e.clientY - centerY) / 12))
            const rotateY = Math.max(-9, Math.min(9, (centerX - e.clientX) / 12))
            
            e.target.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`
          }
        })
      }
    })
  }

  // 页面切换动画
  addPageTransition() {
    const sections = document.querySelectorAll('.page-section')
    sections.forEach(section => {
      section.style.transition = 'opacity 0.4s ease, transform 0.4s ease'
    })
  }

  // 清理资源
  destroy() {
    if (this.observer) {
      this.observer.disconnect()
    }
    window.removeEventListener('scroll', this.handleScroll)
    console.log('🧹 Effects manager destroyed')
  }
}