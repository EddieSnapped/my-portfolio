import { gsap } from 'gsap'

export class AnimationManager {
  constructor() {
    this.timeline = gsap.timeline()
    this.init()
  }

  init() {
    this.setupPageTransitions()
    this.setupScrollAnimations()
    this.setupHoverEffects()
  }

  setupPageTransitions() {
    gsap.registerEffect({
      name: "pageSlide",
      effect: (targets, config) => {
        const tl = gsap.timeline()
        tl.fromTo(targets, 
          { opacity: 0, x: config.direction * 50 },
          { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" }
        )
        return tl
      },
      defaults: { direction: 1 }
    })
  }

  animatePageEntry(pageElement, direction = 1) {
    gsap.effects.pageSlide(pageElement, { direction })
  }

  setupScrollAnimations() {
    gsap.utils.toArray('.animate-on-scroll').forEach(element => {
      gsap.fromTo(element, 
        { 
          opacity: 0, 
          y: 50 
        }, {
          opacity: 1, 
          y: 0, 
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      )
    })
  }

  setupHoverEffects() {
    gsap.utils.toArray('.card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          scale: 1.02,
          y: -5,
          duration: 0.3,
          ease: "power2.out"
        })
      })

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out"
        })
      })
    })
  }

  animateNavigation(fromPage, toPage) {
    const tl = gsap.timeline()
    
    tl.to(fromPage, {
      opacity: 0,
      x: -30,
      duration: 0.3,
      ease: "power2.in"
    })
    .fromTo(toPage, 
      { opacity: 0, x: 30 },
      { 
        opacity: 1, 
        x: 0, 
        duration: 0.4, 
        ease: "power2.out" 
      }, 
      "-=0.1"
    )

    return tl
  }

  animateChartEntry() {
    gsap.fromTo('.chart-container', 
      { scale: 0.8, opacity: 0 },
      { 
        scale: 1, 
        opacity: 1, 
        duration: 0.8, 
        ease: "back.out(1.7)" 
      }
    )
  }

  createLoadingAnimation() {
    const tl = gsap.timeline({ repeat: -1 })
    
    tl.to('.loading-dot', {
      scale: 1.2,
      opacity: 0.7,
      duration: 0.4,
      stagger: 0.1,
      ease: "power2.inOut"
    })
    .to('.loading-dot', {
      scale: 1,
      opacity: 1,
      duration: 0.4,
      stagger: 0.1,
      ease: "power2.inOut"
    })

    return tl
  }
}