'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, MotionConfig } from 'framer-motion'

const skills = [
  { category: 'Linguagens', items: ['Node.js', 'Python', 'TypeScript', 'JavaScript', 'Go', 'C#', 'C++', 'PHP', 'Bash/Shell'] },
  { category: 'Frontend', items: ['React', 'Next.js', 'Tailwind CSS', 'HTML5', 'CSS3', 'Figma'] },
  { category: 'Backend', items: ['Express', 'FastAPI', 'NestJS', 'PHP', 'GraphQL', 'REST APIs', 'WebSockets'] },
  { category: 'Banco de Dados', items: ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL', 'Prisma', 'Drizzle ORM'] },
  { category: 'DevOps & CI/CD', items: ['Docker', 'Kubernetes', 'GitHub Actions', 'GitLab CI', 'Terraform', 'Ansible'] },
  { category: 'Cloud', items: ['AWS', 'GCP', 'Oracle Cloud', 'SquareCloud', 'Vercel', 'Railway', 'Cloudflare', 'Nginx'] },
  { category: 'Ferramentas', items: ['Git', 'Linux', 'PowerShell', 'Batch', 'Vim', 'VSCode', 'Postman', 'Jest'] },
  { category: 'Outros', items: ['Baixo Nível (Windows)', 'Microservices', 'Event-Driven', 'Monorepo', 'TDD', 'Clean Code', 'System Design'] },
]

const projects = [
  {
    title: 'aMathyzin',
    description: 'Plataforma web multifuncional com frontend Next.js 15 e backend PHP com API REST.',
    impact: 'Integração Stripe + elementos 3D com Three.js',
    tech: ['Next.js 15', 'React', 'TypeScript', 'PHP', 'Three.js', 'Stripe'],
    src: '/images/amathyzincom.webp',
    color: '#ef4444',
    colSpan: 'lg:col-span-4',
    aspect: 'aspect-[3/4]',
    liveUrl: 'https://amathyzin.com.br',
    githubUrl: '#',
  },
  {
    title: 'VarejoCode',
    description: 'Site institucional de plataforma de desenvolvimento de software sob demanda via Discord.',
    impact: 'Design minimalista com animações Framer Motion',
    tech: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    src: '/images/varejocode.webp',
    color: '#fafafa',
    colSpan: 'lg:col-span-4',
    aspect: 'aspect-[3/4]',
    liveUrl: 'https://varejocode.com.br',
    githubUrl: '#',
  },
  {
    title: 'VarejoVendas',
    description: 'Plataforma de Automação de Vendas para Discord com bot, landing page e painel administrativo.',
    impact: 'SaaS completo com tickets automáticos, CRM e analytics',
    tech: ['Node.js', 'Discord.js', 'Next.js 15', 'React 19', 'TypeScript', 'SQLite'],
    src: '/images/varejovendas.webp',
    color: '#22c55e',
    colSpan: 'lg:col-span-4',
    aspect: 'aspect-[3/4]',
    liveUrl: 'https://vendas.varejocode.com.br',
    githubUrl: '#',
  },
  {
    title: 'Minimal Optimizer',
    description: 'App Windows para otimização de sistema com limpeza de RAM, Game Boost e gerenciamento de serviços.',
    impact: '~5MB, ultra-lightweight e 100% open source',
    tech: ['C#', '.NET 8.0', 'WPF'],
    src: '/images/minimal.webp',
    color: '#ef4444',
    colSpan: 'lg:col-span-5',
    aspect: 'aspect-[3/5]',
    liveUrl: 'https://github.com/aMathyzinn/Minimal-Optimizer-2',
    githubUrl: 'https://github.com/aMathyzinn/Minimal-Optimizer-2',
  },
  {
    title: 'OrganicCord',
    description: 'Cliente Discord alternativo multi-conta com Tauri 2.0 e Rust. Nativo, leve e focado em privacidade.',
    impact: 'Cliente nativo ultra-leve vs Electron-based oficial',
    tech: ['Tauri 2.0', 'Rust', 'React 18', 'TypeScript'],
    src: '/images/organiccord.webp',
    color: '#10b981',
    colSpan: 'lg:col-span-7',
    aspect: 'aspect-[4/5]',
    liveUrl: '#',
    githubUrl: '#',
  },
]

const HERO_NAME = 'Matheus Damodara'

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [hackText, setHackText] = useState(HERO_NAME)
  const [isHacking, setIsHacking] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [formMessage, setFormMessage] = useState('')
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [activeSection, setActiveSection] = useState('#home')
  const [navProgress, setNavProgress] = useState(0)
  const [heroHeight, setHeroHeight] = useState(800)
  const [isMobile, setIsMobile] = useState(false)
  const [portfolioOffsetY, setPortfolioOffsetY] = useState(0)
  const portfolioRef = useRef<HTMLDivElement>(null)
  
  const [heroMouse, setHeroMouse] = useState({ x: 50, y: 50, isHovering: false })
  const heroImageRef = useRef<HTMLDivElement>(null)

  const handleHeroMouseMove = (e: React.MouseEvent) => {
    if (!heroImageRef.current) return
    const rect = heroImageRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setHeroMouse({ x, y, isHovering: true })
  }

  const handleHeroTouchMove = (e: React.TouchEvent) => {
    if (!heroImageRef.current || e.touches.length === 0) return
    const touch = e.touches[0]
    const rect = heroImageRef.current.getBoundingClientRect()
    const x = ((touch.clientX - rect.left) / rect.width) * 100
    const y = ((touch.clientY - rect.top) / rect.height) * 100
    setHeroMouse({ x, y, isHovering: true })
  }
  
  const handleHeroMouseLeave = () => {
    setHeroMouse(prev => ({ ...prev, isHovering: false }))
  }

  useEffect(() => {
    startHackEffect()
    setHeroHeight(window.innerHeight)
    setIsMobile(window.innerWidth < 768)

    const handleResize = () => {
      setHeroHeight(window.innerHeight)
      setIsMobile(window.innerWidth < 768)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const measureRef = useRef<HTMLHeadingElement>(null)
  const [route, setRoute] = useState<{
    left: string[], y: string[], leftTimes: number[], yTimes: number[], yEases: string[],
    scaleX: number[], scaleY: number[], shadowScale: number[], shadowOpacity: number[]
  } | null>(null)

  useEffect(() => {
    const measure = () => {
      if (!measureRef.current) return
      const spans = measureRef.current.querySelectorAll('span')
      const containerWidth = measureRef.current.offsetWidth
      if (containerWidth === 0 || spans.length === 0) return

      const c: number[] = []
      spans.forEach(s => {
        const centerPx = s.offsetLeft + s.offsetWidth / 2
        c.push((centerPx / containerWidth) * 100)
      })

      const left: string[] = []
      const y: string[] = []
      const leftTimes: number[] = []
      const yTimes: number[] = []
      const yEases: string[] = []
      
      const scaleX: number[] = []
      const scaleY: number[] = []
      const shadowScale: number[] = []
      const shadowOpacity: number[] = []

      for (let i = 0; i < 16; i++) {
        left.push(`${c[i]}%`)
        leftTimes.push(i / 16)

        // Ground state (takeoff)
        y.push("0em")
        yTimes.push(i / 16)
        if (i > 0) yEases.push("easeIn")
        scaleX.push(1.3)
        scaleY.push(0.7)
        shadowScale.push(1.6)
        shadowOpacity.push(0.5)

        // Peak state (apex)
        y.push("-1.3em")
        yTimes.push((i + 0.5) / 16)
        yEases.push("easeOut")
        scaleX.push(0.8)
        scaleY.push(1.2)
        shadowScale.push(0.5)
        shadowOpacity.push(0.15)
      }

      // Final landing
      left.push(`${c[0] + 100}%`)
      leftTimes.push(1)

      y.push("0em")
      yTimes.push(1)
      yEases.push("easeIn")
      scaleX.push(1.3)
      scaleY.push(0.7)
      shadowScale.push(1.6)
      shadowOpacity.push(0.5)

      setRoute({ left, y, leftTimes, yTimes, yEases, scaleX, scaleY, shadowScale, shadowOpacity })
    }

    measure()
    let isMounted = true
    if (document.fonts) {
      document.fonts.ready.then(() => {
        if (isMounted) measure()
      })
    }
    const timer = setTimeout(() => {
      if (isMounted) measure()
    }, 500)
    window.addEventListener('resize', measure)
    return () => {
      isMounted = false
      window.removeEventListener('resize', measure)
      clearTimeout(timer)
    }
  }, [])


  useEffect(() => {
    let ticking = false;

    const updateScroll = () => {
      const currentScroll = window.scrollY
      setScrollY(currentScroll)
      setShowScrollTop(currentScroll > 1000)

      const vh = window.innerHeight
      const portfolioEl = document.getElementById('portfolio')
      const servicesEl = document.getElementById('services')
      const contactEl = document.getElementById('contact')
      
      const tops = [
        0,
        vh * 0.5,
        vh * 1.5,
        portfolioEl ? portfolioEl.offsetTop - vh * 0.5 : vh * 2.5,
        servicesEl ? servicesEl.offsetTop - vh * 0.5 : vh * 3.5,
        contactEl ? contactEl.offsetTop - vh * 0.5 : vh * 4.5
      ]

      let progress = 5 // default to last
      for (let i = 0; i < tops.length; i++) {
        const start = tops[i]
        const end = i < tops.length - 1 ? tops[i + 1] : document.documentElement.scrollHeight - vh
        if (currentScroll >= start && currentScroll < end) {
          const sectionHeight = Math.max(1, end - start)
          const scrollInside = currentScroll - start
          
          // Make the arrow stay on the item, and only slide during the last 80vh of the section
          const transitionZone = Math.min(vh * 0.8, sectionHeight * 0.5)
          
          if (scrollInside < sectionHeight - transitionZone) {
            progress = i
          } else {
            const ratio = (scrollInside - (sectionHeight - transitionZone)) / Math.max(1, transitionZone)
            // Use easeInOutSine-like curve for smooth departure and arrival
            const smoothRatio = ratio < 0.5 ? 2 * ratio * ratio : 1 - Math.pow(-2 * ratio + 2, 2) / 2
            progress = i + smoothRatio
          }
          break
        }
      }
      
      progress = Math.min(5, Math.max(0, progress))
      setNavProgress(progress)

      let currentSection = '#home'
      if (progress < 0.5) currentSection = '#home'
      else if (progress < 1.5) currentSection = '#me'
      else if (progress < 2.5) currentSection = '#skills'
      else if (progress < 3.5) currentSection = '#portfolio'
      else if (progress < 4.5) currentSection = '#services'
      else currentSection = '#contact'
      
      setActiveSection(currentSection)
      ticking = false;
    }

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll)
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    updateScroll() // Initial update
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Measure real portfolio section offset for accurate scroll triggers
  useEffect(() => {
    const measure = () => {
      if (portfolioRef.current) {
        setPortfolioOffsetY(portfolioRef.current.getBoundingClientRect().top + window.scrollY)
      }
    }
    // Measure after layout stabilizes
    const timer = setTimeout(measure, 300)
    window.addEventListener('resize', measure)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', measure)
    }
  }, [])

  const hackIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const startHackEffect = () => {
    if (isHacking) return
    setIsHacking(true)
    const originalText = 'Matheus Damodara'
    const chars = '01!@#$%^&*(){}[]<>?/\\|~`abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let iterations = 0
    
    if (hackIntervalRef.current) clearInterval(hackIntervalRef.current)
    
    hackIntervalRef.current = setInterval(() => {
      setHackText(
        originalText
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' '
            if (index < iterations) return originalText[index]
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join('')
      )
      iterations += 0.15
      if (iterations >= originalText.length) {
        if (hackIntervalRef.current) clearInterval(hackIntervalRef.current)
        setHackText(originalText)
        setIsHacking(false)
      }
    }, 60)
  }

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (hackIntervalRef.current) clearInterval(hackIntervalRef.current)
    }
  }, [])

  const resetText = () => {
    if (!isHacking) setHackText('Matheus Damodara')
  }

  const scrollProgress = Math.min(scrollY / heroHeight, 1)
  const imageScale = Math.max(0.65, 1 - scrollProgress * 0.35)
  const imageTranslateX = isMobile ? -scrollProgress * 30 : 0
  const aboutMeProgress = Math.max(0, Math.min(1, (scrollY - heroHeight * 0.5) / (heroHeight * 0.3)))
  const navOpacity = scrollY > 100 ? 1 : 1
  const navTextColor = 'text-foreground'
  const heroContentOpacity = Math.max(0, 1 - scrollProgress * 2)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus('loading')
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      
      if (response.ok) {
        setFormStatus('success')
        setFormMessage('Mensagem enviada! Vou responder em breve.')
        setFormData({ name: '', email: '', message: '' })
        
        if (typeof window !== 'undefined' && (window as any).va) {
          (window as any).va('track', 'Contact Form Submit')
        }
      } else {
        throw new Error('Erro ao enviar')
      }
    } catch (error) {
      setFormStatus('error')
      setFormMessage('Erro ao enviar. Tente enviar direto para matheus@damodara.xyz')
    }
  }

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    
    if (sectionId === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    
    if (sectionId === '#me') {
      window.scrollTo({ top: window.innerHeight * 0.8, behavior: 'smooth' })
      return
    }

    const element = document.querySelector(sectionId)
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <main className="min-h-screen bg-background">
      {/* Logo */}
      <div className="fixed top-6 left-6 md:top-8 md:left-8 lg:left-12 z-[9999] pointer-events-none transition-all duration-500">
        <div className="relative w-12 h-12 md:w-14 md:h-14 overflow-hidden rounded-xl bg-background/50 backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.5)] border border-white/5 flex items-center justify-center">
          <Image src="/logo.png" alt="Damodara Dev Logo" width={32} height={32} className="object-contain drop-shadow-md" />
        </div>
      </div>

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[9999] bg-foreground text-background p-3 md:p-4 rounded-full shadow-lg hover:opacity-80 transition-all duration-300 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Voltar ao topo"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 md:w-6 md:h-6">
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </button>

      {/* Hero Section */}
      <div id="home" className="relative" style={{ height: '150vh' }}>
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="grid lg:grid-cols-2 h-full">
            {/* Photo side */}
            <div className="flex items-center justify-center p-6 md:p-8 lg:p-16 relative">
              <div
                className="relative w-full max-w-lg aspect-[3/4] transition-all duration-300 ease-out hover:scale-105 group px-4"
                style={{
                  transform: `scale(${imageScale}) translateX(${imageTranslateX}%)`,
                  transformOrigin: 'center center',
                }}
              >
                {/* Glow effect behind photo */}
                <div className="absolute inset-0 bg-accent/5 blur-3xl scale-95 opacity-60" />
                
                <div 
                  ref={heroImageRef}
                  className="relative w-full h-full overflow-hidden"
                  onMouseMove={handleHeroMouseMove}
                  onMouseLeave={handleHeroMouseLeave}
                  onMouseEnter={() => setHeroMouse(prev => ({ ...prev, isHovering: true }))}
                  onTouchStart={(e) => handleHeroTouchMove(e)}
                  onTouchMove={handleHeroTouchMove}
                  onTouchEnd={handleHeroMouseLeave}
                >
                  {/* Colored Base */}
                  <Image
                    src="/images/matheusdamodara.webp"
                    alt="Matheus Damodara"
                    fill
                    className="object-cover object-top"
                    priority
                    fetchPriority="high"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />

                  {/* Grayscale Spotlight */}
                  <div 
                    className="absolute inset-0 transition-opacity duration-700 ease-out pointer-events-none"
                    style={{
                      opacity: heroMouse.isHovering ? 1 : 0,
                      maskImage: `radial-gradient(200px circle at ${heroMouse.x}% ${heroMouse.y}%, black 0%, transparent 100%)`,
                      WebkitMaskImage: `radial-gradient(200px circle at ${heroMouse.x}% ${heroMouse.y}%, black 0%, transparent 100%)`
                    }}
                  >
                    <Image
                      src="/images/matheusdamodara.webp"
                      alt="Matheus Damodara"
                      fill
                      className="object-cover object-top grayscale"
                      priority
                      fetchPriority="high"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  
                  {/* Vignette overlay for depth */}
                  <div className="absolute inset-0 pointer-events-none z-10">
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-background/20" />
                    <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-background/30" />
                  </div>
                  
                  {/* Subtle accent glow on edges */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/0 via-transparent to-accent/5 opacity-40 pointer-events-none z-10" />
                </div>
              </div>
            </div>

            {/* Text side */}
            <div className="flex flex-col justify-between p-6 md:p-8 lg:p-16 relative">
              <nav
                className="fixed top-4 md:top-8 right-4 md:right-8 lg:right-16 flex flex-col items-end z-[9999] transition-all duration-500 pointer-events-none"
                style={{ opacity: navOpacity }}
              >
                <div className="text-xs uppercase tracking-widest text-muted-foreground/50 font-mono mb-4">Você está aqui:</div>
                <div className="relative flex flex-col items-end gap-3">
                  <div 
                    className="absolute right-full mr-3 text-accent text-sm md:text-base font-bold pointer-events-none flex items-center h-6"
                    style={{ 
                      top: '0px',
                      transform: `translateY(calc(${navProgress} * 36px))`, 
                      willChange: 'transform'
                    }}
                  >
                    →
                  </div>
                  {[
                    { href: '#home', label: 'Home' },
                    { href: '#me', label: 'Sobre' },
                    { href: '#skills', label: 'Skills' },
                    { href: '#portfolio', label: 'Portfolio' },
                    { href: '#services', label: 'Serviços' },
                    { href: '#contact', label: 'Contato' },
                  ].map(({ href, label }) => {
                    const isActive = activeSection === href
                    return (
                      <div
                        key={href}
                        className={`text-sm md:text-base font-mono flex items-center justify-end transition-all duration-300 h-6 ${isActive ? 'text-foreground font-bold scale-105 transform origin-right' : 'text-muted-foreground/30'}`}
                      >
                        {label}
                      </div>
                    )
                  })}
                </div>
              </nav>

              <div
                className="flex-1 flex flex-col justify-center transition-opacity duration-300 pt-24 md:pt-40 lg:pt-48"
                style={{ opacity: heroContentOpacity }}
              >
                {/* Hero name — bouncing ball driven by pre-calculated animation route keyframes */}
                <div
                  className="relative mb-3 md:mb-6 text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-mono w-max"
                >
                  {/* Hidden element for measuring exact pixel centers regardless of font proportionality */}
                  <h1
                    ref={measureRef}
                    className="absolute top-0 left-0 font-bold font-mono opacity-0 pointer-events-none"
                    aria-hidden="true"
                    style={{ whiteSpace: 'nowrap', margin: 0, fontSize: 'inherit', lineHeight: 'inherit' }}
                  >
                    {'Matheus Damodara'.split('').map((char, index) => (
                      <span key={index} style={{ display: 'inline-block' }}>
                        {char === ' ' ? '\u00A0' : char}
                      </span>
                    ))}
                  </h1>

                  {/* The visible Hacker text */}
                  <h1
                    className="font-bold text-foreground cursor-pointer font-mono group/name"
                    onMouseEnter={startHackEffect}
                    onMouseLeave={resetText}
                    style={{ display: 'block', whiteSpace: 'nowrap', margin: 0, fontSize: 'inherit', lineHeight: 'inherit' }}
                  >
                    {hackText.split('').map((char, index) => (
                      <span key={index} style={{ display: 'inline-block' }}>
                        {char === ' ' ? '\u00A0' : char}
                      </span>
                    ))}
                  </h1>

                  {/* Bouncing ball following the generated keyframe route */}
                  {route && (
                    <MotionConfig reducedMotion="never">
                      <motion.span
                        aria-hidden="true"
                        className="absolute bottom-full mb-[0.1em] w-[0.42em] h-[0.42em] rounded-full bg-accent z-20 pointer-events-none"
                        style={{ boxShadow: '0 0 0.15em 0.06em var(--accent), 0 0 0.5em 0.15em var(--accent)', transformOrigin: 'center bottom', x: '-50%' }}
                        animate={{
                          left: route.left,
                          y: route.y,
                          scaleX: route.scaleX,
                          scaleY: route.scaleY
                        }}
                        transition={{
                          left: { duration: 19.2, ease: "linear", times: route.leftTimes, repeat: Infinity },
                          y: { duration: 19.2, ease: route.yEases, times: route.yTimes, repeat: Infinity },
                          scaleX: { duration: 19.2, ease: route.yEases, times: route.yTimes, repeat: Infinity },
                          scaleY: { duration: 19.2, ease: route.yEases, times: route.yTimes, repeat: Infinity }
                        }}
                      />
                      <motion.span
                        aria-hidden="true"
                        className="absolute bottom-full mb-[0.04em] w-[0.42em] h-[0.07em] rounded-full bg-accent blur-[0.05em] z-19 pointer-events-none"
                        style={{ transformOrigin: 'center center', x: '-50%' }}
                        animate={{
                          left: route.left,
                          scaleX: route.shadowScale,
                          opacity: route.shadowOpacity
                        }}
                        transition={{
                          left: { duration: 19.2, ease: "linear", times: route.leftTimes, repeat: Infinity },
                          scaleX: { duration: 19.2, ease: route.yEases, times: route.yTimes, repeat: Infinity },
                          opacity: { duration: 19.2, ease: route.yEases, times: route.yTimes, repeat: Infinity }
                        }}
                      />
                    </MotionConfig>
                  )}
                </div>

                <div className="space-y-1 md:space-y-2 mb-6 md:mb-12">
                  <p className="text-base md:text-xl text-muted-foreground">
                    Desenvolvedor Full-Stack & DevOps
                  </p>
                  <p className="text-sm md:text-lg text-muted-foreground font-semibold">
                    Engenheiro de Software
                  </p>
                  <p className="text-sm md:text-lg text-muted-foreground">
                    Construindo sistemas robustos e escaláveis
                  </p>
                </div>

                <button
                  onClick={() => {
                    const contactSection = document.querySelector('#contact')
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
                      if (typeof window !== 'undefined' && (window as any).va) {
                        (window as any).va('track', 'Hero CTA Click')
                      }
                    }
                  }}
                  className="space-y-3 md:space-y-4 group cursor-pointer text-left"
                >
                  <div className="flex items-center gap-3 md:gap-4">
                    <span className="text-xl md:text-3xl font-bold text-foreground transition-transform duration-300 group-hover:scale-110 origin-left block">
                      {"Let's build"}
                    </span>
                    <svg
                      width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      className="text-foreground md:w-6 md:h-6 transition-all duration-500 group-hover:translate-x-2 group-hover:-translate-y-2"
                    >
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </div>
                  <div className="h-1 w-20 md:w-32 bg-accent transition-all duration-500 ease-out group-hover:w-32 md:group-hover:w-48"></div>
                </button>
              </div>

              <div id="me"></div>
              <div
                className="absolute bottom-0 left-0 right-0 p-4 md:p-8 lg:p-16 transition-all duration-1000 ease-out"
                style={{
                  opacity: aboutMeProgress,
                  transform: `translateY(${(1 - aboutMeProgress) * 50}px)`,
                  pointerEvents: aboutMeProgress > 0.5 ? 'auto' : 'none',
                }}
              >
                <div className="space-y-2 md:space-y-6">
                  <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
                    MATHEUS DAMODARA
                  </h2>
                  <p className="text-base sm:text-xl md:text-2xl font-bold text-foreground tracking-wide">
                    FULL-STACK DEVELOPER & DEVOPS ENGINEER
                  </p>
                  <p className="text-xs md:text-base lg:text-lg text-muted-foreground leading-relaxed">
                    <span className="text-accent font-semibold">5+ anos</span> construindo sistemas de alta performance. Especializado em arquiteturas escaláveis que suportam <span className="text-accent font-semibold">milhares de usuários simultâneos</span>. Do código à infraestrutura cloud, entrego produtos completos com <span className="text-accent font-semibold">99.9% de uptime</span>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <section id="skills" className="min-h-screen relative py-16 md:py-20 lg:py-28 px-6 md:px-12 lg:px-16">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto">
          <div
            className="transition-all duration-700"
            style={{
              opacity: Math.min(1, Math.max(0, (scrollY - 400) / 300)),
              transform: `translateY(${Math.max(0, 40 - (scrollY - 400) / 10)}px)`,
            }}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4">
              Skills
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl mb-16 md:mb-20 max-w-xl">
              Tecnologias e ferramentas que uso para construir produtos completos.
            </p>
            
            {/* Navigation for categories */}
            <nav className="flex flex-wrap gap-2 mb-6" aria-label="Categorias de Skills" style={{pointerEvents: 'auto'}}>
              {skills.map((group) => (
                <button
                  key={group.category}
                  onClick={(e) => handleNavClick(e, `#${group.category.replace(/\s+/g, '-').toLowerCase()}`)}
                  className="px-4 py-2 min-h-[44px] flex items-center justify-center text-sm font-medium text-foreground bg-background rounded hover:bg-accent/10 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  {group.category}
                </button>
              ))}
            </nav>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
              {skills.map((group, gi) => (
                <div
                  key={group.category}
                  id={group.category.replace(/\s+/g, '-').toLowerCase()}
                  className="space-y-4 group"
                  style={{
                    opacity: Math.min(1, Math.max(0, (scrollY - 500 - gi * 60) / 250)),
                    transform: `translateY(${Math.max(0, 40 - (scrollY - 500 - gi * 60) / 8)}px)`,
                  }}
                >
                  <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold border-b border-border pb-2">
                    {group.category}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <span
                        key={skill}
                        className="text-sm px-3 py-1.5 min-h-[44px] flex items-center justify-center border border-border text-foreground hover:border-foreground hover:bg-foreground hover:text-background transition-all duration-200 font-mono"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section — Sticky Scroll Cinematic Reveal */}
      <div id="portfolio" ref={portfolioRef} style={{ height: `${120 + projects.length * 100}vh` }} className="relative">
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Ambient glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.04] via-transparent to-transparent pointer-events-none" />

          {/* Section header */}
          {(() => {
            const portfolioStart = portfolioOffsetY
            const headerProgress = Math.min(1, Math.max(0, (scrollY - portfolioStart) / 300))
            return (
              <div
                className="absolute top-0 left-0 right-0 px-6 md:px-12 lg:px-16 pt-12 md:pt-16 z-20 pointer-events-none"
                style={{
                  opacity: headerProgress,
                  transform: `translateY(${(1 - headerProgress) * 30}px)`,
                }}
              >
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-2">
                  Portfolio
                </h2>
                <p className="text-muted-foreground text-base md:text-lg max-w-xl">
                  Projetos reais que refletem minha experiência em desenvolvimento e infraestrutura.
                </p>
              </div>
            )
          })()}

          {/* One project at a time — each slides in as you scroll */}
          {(() => {
            const portfolioStart = portfolioOffsetY
            const scrollPerProject = heroHeight * 1.0

            return projects.map((project, i) => {
              const enter = portfolioStart + 300 + i * scrollPerProject
              const exit = enter + scrollPerProject

              const enterP = Math.min(1, Math.max(0, (scrollY - enter) / (scrollPerProject * 0.4)))
              const exitP = Math.min(1, Math.max(0, (scrollY - exit + scrollPerProject * 0.3) / (scrollPerProject * 0.3)))

              const opacity = enterP * (1 - exitP)
              const translateX = (1 - enterP) * (i % 2 === 0 ? 100 : -100) + exitP * (i % 2 === 0 ? -60 : 60)
              const scale = 0.88 + enterP * 0.12 - exitP * 0.05
              const blurVal = (1 - enterP) * 16 + exitP * 8

              return (
                <div
                  key={project.title}
                  className="absolute inset-0 flex items-center justify-center px-6 md:px-12 lg:px-16"
                  style={{
                    opacity,
                    pointerEvents: opacity > 0.3 ? 'auto' : 'none',
                    zIndex: i + 1,
                  }}
                >
                  <div
                    className="w-full max-w-6xl flex flex-col lg:flex-row items-center gap-8 lg:gap-12"
                    style={{
                      transform: `translateX(${translateX}px) scale(${scale})`,
                      filter: `blur(${blurVal}px)`,
                      willChange: 'transform, opacity, filter',
                    }}
                  >
                    {/* Image */}
                    <div className="relative w-full lg:w-1/2 group overflow-hidden rounded-xl border border-white/10 flex-shrink-0 shadow-2xl bg-zinc-900/20">
                      <Image
                        src={project.src}
                        alt={project.title}
                        width={1600}
                        height={900}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="w-full h-auto object-cover transition-all duration-700 group-hover:scale-105"
                      />
                      {/* Number watermark */}
                      <div className="absolute top-4 left-4 font-mono text-7xl md:text-9xl font-bold text-white/15 mix-blend-overlay drop-shadow-md leading-none pointer-events-none select-none z-10">
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      {/* Subtle gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none z-0" />
                    </div>

                    {/* Info */}
                    <div className="w-full lg:w-1/2 space-y-4 md:space-y-6">
                      <div>
                        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2 font-mono">
                          Projeto {String(i + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                        </p>
                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                          {project.title}
                        </h3>
                      </div>
                      <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                        {project.description}
                      </p>
                      <p className="text-sm font-semibold" style={{ color: project.color }}>
                        {project.impact}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((t) => (
                          <span key={t} className="text-xs font-mono border border-border px-3 py-1.5 text-muted-foreground hover:border-foreground hover:text-foreground transition-colors">
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-4 pt-2">
                        <Link
                          href={project.liveUrl}
                          className="text-sm font-bold border px-6 py-3 transition-all duration-200"
                          style={{
                            borderColor: project.color,
                            color: project.color,
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = project.color;
                            e.currentTarget.style.color = '#000000';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = project.color;
                          }}
                          onClick={(e) => {
                            if (project.liveUrl === '#') e.preventDefault()
                            if (typeof window !== 'undefined' && (window as any).va) {
                              (window as any).va('track', 'Project Live Click', { project: project.title })
                            }
                          }}
                        >
                          Ver Projeto
                        </Link>
                        <Link
                          href={project.githubUrl}
                          className="text-sm font-bold border border-border text-foreground px-6 py-3 hover:bg-foreground hover:text-background transition-all duration-200"
                          onClick={(e) => {
                            if (project.githubUrl === '#') e.preventDefault()
                            if (typeof window !== 'undefined' && (window as any).va) {
                              (window as any).va('track', 'Project GitHub Click', { project: project.title })
                            }
                          }}
                        >
                          Código
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          })()}

          {/* Progress dots */}
          {(() => {
            const portfolioStart = portfolioOffsetY
            const scrollPerProject = heroHeight * 1.0
            const activeIndex = Math.min(
              projects.length - 1,
              Math.max(0, Math.floor((scrollY - portfolioStart - 300) / scrollPerProject))
            )
            const dotsVisible = Math.min(1, Math.max(0, (scrollY - portfolioStart - 100) / 300))

            return (
              <div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3"
                style={{ opacity: dotsVisible }}
              >
                {projects.map((_, i) => (
                  <div
                    key={i}
                    className="rounded-full bg-foreground transition-all duration-500"
                    style={{
                      width: i === activeIndex ? 28 : 6,
                      height: 6,
                      opacity: i === activeIndex ? 1 : 0.25,
                    }}
                  />
                ))}
              </div>
            )
          })()}
        </div>
      </div>

      {/* Testimonials Section */}
      <section className="relative py-20 md:py-28 px-6 md:px-12 lg:px-16">
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-accent/[0.015] to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto">
          <div
            className="transition-all duration-700"
            style={{
              opacity: Math.min(1, Math.max(0, (scrollY - 2400) / 300)),
              transform: `translateY(${Math.max(0, 40 - (scrollY - 2400) / 10)}px)`,
            }}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-16 md:mb-20">
              O que dizem
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {[
                {
                  quote: "Matheus entregou nossa plataforma SaaS em tempo recorde. A arquitetura que ele construiu está rodando sem problemas há 8 meses, suportando picos de 5k usuários simultâneos.",
                  author: "Carlos Silva",
                  role: "CTO, TechStartup",
                },
                {
                  quote: "Precisávamos de alguém que entendesse tanto de código quanto de infraestrutura. Matheus automatizou todo nosso pipeline de deploy e reduziu nosso tempo de release de dias para minutos.",
                  author: "Ana Costa",
                  role: "Founder, DataFlow",
                },
                {
                  quote: "A API que ele desenvolveu processa 50k requisições por minuto sem engasgar. Performance impecável e código limpo que qualquer dev consegue manter.",
                  author: "Roberto Mendes",
                  role: "Tech Lead, FinanceApp",
                },
                {
                  quote: "Contratei o Matheus para uma consultoria de 2 semanas. Ele identificou gargalos que estavam custando R$ 15k/mês em infraestrutura desnecessária. ROI imediato.",
                  author: "Julia Ferreira",
                  role: "CEO, E-commerce Plus",
                },
              ].map((testimonial, i) => (
                <div
                  key={i}
                  className="border-l-2 border-accent pl-6 md:pl-8 space-y-4"
                  style={{
                    opacity: Math.min(1, Math.max(0, (scrollY - 2500 - i * 100) / 300)),
                    transform: `translateY(${Math.max(0, 40 - (scrollY - 2500 - i * 100) / 8)}px)`,
                  }}
                >
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed italic">
                    "{testimonial.quote}"
                  </p>
                  <div>
                    <p className="text-foreground font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="min-h-screen bg-background px-6 md:px-12 lg:px-20 py-20">
        <div className="max-w-[1600px] mx-auto">
          <h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-foreground"
            style={{
              opacity: Math.min(1, Math.max(0, (scrollY - 3000) / 400)),
              transform: `translateY(${Math.max(0, 40 - (scrollY - 3000) / 12)}px)`,
            }}
          >
            Serviços
          </h2>
          <p
            className="text-muted-foreground text-lg md:text-xl mb-16 md:mb-24 max-w-xl"
            style={{
              opacity: Math.min(1, Math.max(0, (scrollY - 3050) / 300)),
            }}
          >
            O que posso entregar para o seu produto ou negócio.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
            {[
              {
                n: '01',
                title: 'Desenvolvimento Full-Stack',
                desc: 'Aplicações web completas do back ao front, com foco em performance, segurança e experiência do usuário.',
              },
              {
                n: '02',
                title: 'DevOps & CI/CD',
                desc: 'Pipelines automatizados de build, test e deploy. Infraestrutura como código com Docker, Kubernetes e GitHub Actions.',
              },
              {
                n: '03',
                title: 'APIs & Microserviços',
                desc: 'Arquitetura de APIs RESTful e GraphQL, microserviços escaláveis com Node.js, Python e Go.',
              },
              {
                n: '04',
                title: 'Cloud & Infraestrutura',
                desc: 'Configuração e gestão de ambientes na AWS, GCP e Cloudflare. Escalabilidade e alta disponibilidade.',
              },
              {
                n: '05',
                title: 'Performance & Otimização',
                desc: 'Diagnóstico e resolução de gargalos. Caching, otimização de queries, profiling e monitoramento.',
              },
              {
                n: '06',
                title: 'Consultoria Técnica',
                desc: 'Análise de arquitetura, code review, definição de stack tecnológica e guia para times de desenvolvimento.',
              },
            ].map((svc, i) => (
              <div
                key={svc.n}
                className="space-y-4 group border-t border-border pt-6"
                style={{
                  opacity: Math.min(1, Math.max(0, (scrollY - 3200 - i * 100) / 300)),
                  transform: `translateY(${Math.max(0, 50 - (scrollY - 3200 - i * 100) / 8)}px)`,
                }}
              >
                <div className="text-5xl md:text-6xl font-bold text-muted-foreground/30 group-hover:text-foreground transition-colors duration-300 font-mono">
                  {svc.n}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground">{svc.title}</h3>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">{svc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen bg-background text-foreground px-6 md:px-12 lg:px-20 py-20">
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 md:mb-12 text-foreground"
            style={{
              opacity: Math.min(1, Math.max(0, (scrollY - 4200) / 400)),
              transform: `translateY(${Math.max(0, 40 - (scrollY - 4200) / 12)}px)`,
            }}
          >
            Vamos conversar
          </h2>

          <p
            className="text-lg md:text-xl text-muted-foreground mb-12 md:mb-16 max-w-2xl"
            style={{
              opacity: Math.min(1, Math.max(0, (scrollY - 4300) / 300)),
              transform: `translateY(${Math.max(0, 30 - (scrollY - 4300) / 10)}px)`,
            }}
          >
            Tem um projeto em mente? Vamos colaborar e construir algo incrível juntos.
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-8"
            style={{
              opacity: Math.min(1, Math.max(0, (scrollY - 4400) / 300)),
              transform: `translateY(${Math.max(0, 40 - (scrollY - 4400) / 10)}px)`,
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3 group">
                <label htmlFor="name" className="block text-sm uppercase tracking-wider text-muted-foreground group-focus-within:text-foreground transition-colors">
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-transparent border-b-2 border-border focus:border-foreground py-3 text-lg md:text-xl outline-none transition-all duration-300 text-foreground placeholder:text-muted-foreground"
                  placeholder="Seu nome"
                />
              </div>
              <div className="space-y-3 group">
                <label htmlFor="email" className="block text-sm uppercase tracking-wider text-muted-foreground group-focus-within:text-foreground transition-colors">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-transparent border-b-2 border-border focus:border-foreground py-3 text-lg md:text-xl outline-none transition-all duration-300 text-foreground placeholder:text-muted-foreground"
                  placeholder="seu@email.com"
                />
              </div>
            </div>
            <div className="space-y-3 group">
                <label htmlFor="message" className="block text-sm uppercase tracking-wider text-muted-foreground group-focus-within:text-foreground transition-colors">
                Mensagem
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={6}
                className="w-full bg-transparent border-b-2 border-border focus:border-foreground py-3 text-lg md:text-xl outline-none resize-none transition-all duration-300 text-foreground placeholder:text-muted-foreground"
                placeholder="Me conta sobre seu projeto..."
              />
            </div>
            {formStatus === 'success' && (
              <div className="p-4 bg-accent/10 border border-accent text-accent rounded">
                {formMessage}
              </div>
            )}
            {formStatus === 'error' && (
              <div className="p-4 bg-destructive/10 border border-destructive text-destructive rounded">
                {formMessage}
              </div>
            )}
            <div className="pt-8">
              <button
                type="submit"
                disabled={formStatus === 'loading'}
                className="group relative inline-flex items-center gap-4 text-xl md:text-2xl font-bold bg-foreground text-background px-10 py-5 hover:opacity-80 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10">
                  {formStatus === 'loading' ? 'Enviando...' : 'Enviar Mensagem'}
                </span>
                {formStatus !== 'loading' && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 transition-transform duration-300 group-hover:translate-x-2">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                )}
              </button>
            </div>
          </form>

          <div
            className="mt-16 md:mt-20 pt-12 border-t border-border flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
            style={{
              opacity: Math.min(1, Math.max(0, (scrollY - 4600) / 300)),
            }}
          >
            <div className="space-y-2">
              <p className="text-muted-foreground text-sm uppercase tracking-wider">Contato Direto</p>
              <Link 
                href="mailto:matheus@damodara.xyz?subject=Ol%C3%A1!%20Vi%20seu%20portfolio" 
                className="text-xl md:text-2xl hover:text-accent transition-colors text-foreground"
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any).va) {
                    (window as any).va('track', 'Email Click')
                  }
                }}
              >
                matheus@damodara.xyz
              </Link>
            </div>
            <div className="space-y-2">
              <p className="text-muted-foreground text-sm uppercase tracking-wider">Redes</p>
              <div className="flex gap-6">
                <Link 
                  href="https://github.com/aMathyzinn" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-xl hover:text-accent transition-colors text-foreground"
                  onClick={() => {
                    if (typeof window !== 'undefined' && (window as any).va) {
                      (window as any).va('track', 'GitHub Click')
                    }
                  }}
                >
                  GitHub
                </Link>
                <Link 
                  href="https://www.linkedin.com/in/matheus-damodara-a866a9362/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-xl hover:text-accent transition-colors text-foreground"
                  onClick={() => {
                    if (typeof window !== 'undefined' && (window as any).va) {
                      (window as any).va('track', 'LinkedIn Click')
                    }
                  }}
                >
                  LinkedIn
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
