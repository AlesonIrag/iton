import { useState, useEffect, useRef, useCallback } from 'react'

export default function Navbar({ isAdminMode, toggleAdminMode }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const [clickTimeout, setClickTimeout] = useState(null)
  const [activeSection, setActiveSection] = useState('home')
  const navContainerRef = useRef(null)
  const indicatorRef = useRef(null)

  const navLinks = [
    { id: 'home', label: 'Home', icon: 'fas fa-home' },
    { id: 'about', label: 'About', icon: 'fas fa-user' },
    { id: 'skills', label: 'Skills', icon: 'fas fa-code' },
    { id: 'projects', label: 'Projects', icon: 'fas fa-rocket' },
    { id: 'cv', label: 'CV', icon: 'fas fa-file-alt', isCV: true },
    { id: 'contact', label: 'Contact', icon: 'fas fa-envelope' },
  ]

  // Update sliding indicator position
  const updateIndicator = useCallback(() => {
    if (!navContainerRef.current || !indicatorRef.current) return
    const activeEl = navContainerRef.current.querySelector(`[data-nav="${activeSection}"]`)
    if (activeEl) {
      const containerRect = navContainerRef.current.getBoundingClientRect()
      const activeRect = activeEl.getBoundingClientRect()
      indicatorRef.current.style.left = (activeRect.left - containerRect.left) + 'px'
      indicatorRef.current.style.width = activeRect.width + 'px'
    }
  }, [activeSection])

  useEffect(() => {
    updateIndicator()
  }, [activeSection, updateIndicator])

  // Also update on resize
  useEffect(() => {
    window.addEventListener('resize', updateIndicator)
    return () => window.removeEventListener('resize', updateIndicator)
  }, [updateIndicator])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      // Track active section
      const sections = ['home', 'about', 'skills', 'projects', 'contact']
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActiveSection(id)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogoClick = () => {
    setClickCount(prev => prev + 1)
    
    if (clickTimeout) clearTimeout(clickTimeout)
    
    const timeout = setTimeout(() => {
      setClickCount(0)
    }, 1000)
    
    setClickTimeout(timeout)
    
    if (clickCount + 1 === 3) {
      toggleAdminMode()
      setClickCount(0)
      clearTimeout(timeout)
    }
  }

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'scrolled py-2' : 'bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div 
              className="flex items-center gap-3 cursor-default select-none group"
              onClick={handleLogoClick}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all duration-300 group-hover:scale-105">
                A
              </div>
              <span className="text-lg font-semibold tracking-tight">
                <span className="text-white">Aleson</span>
                <span className="text-indigo-400 ml-1">Irag</span>
              </span>
            </div>

            {/* Desktop Nav with sliding indicator */}
            <div 
              ref={navContainerRef}
              className="hidden md:flex items-center gap-1 bg-white/[0.03] backdrop-blur-xl rounded-full px-2 py-1.5 border border-white/[0.05] relative nav-pill-container"
            >
              {/* Sliding indicator */}
              <div ref={indicatorRef} className="nav-indicator" />
              
              {navLinks.map(link => (
                <a
                  key={link.id}
                  data-nav={link.id}
                  onClick={() => link.isCV 
                    ? window.dispatchEvent(new CustomEvent('openCV'))
                    : scrollToSection(link.id)
                  }
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer z-10 ${
                    activeSection === link.id
                      ? 'text-white'
                      : 'text-gray-400 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Mobile menu button */}
            <button 
              className="md:hidden relative w-10 h-10 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] flex items-center justify-center transition-all"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <div className="flex flex-col gap-1.5">
                <span className={`w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0 scale-0' : ''}`}></span>
                <span className={`w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - 3D */}
      <div className={`fixed inset-0 z-40 transition-all duration-500 ${isMobileMenuOpen ? 'visible opacity-100' : 'invisible opacity-0 pointer-events-none'}`} style={{ perspective: '800px' }}>
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/90 backdrop-blur-2xl"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Close button */}
        <button 
          className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/[0.05] flex items-center justify-center text-white hover:bg-white/[0.1] transition-colors z-10"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <i className="fas fa-times text-xl"></i>
        </button>
        
        <div className={`relative flex flex-col items-center justify-center h-full gap-2 px-8 ${isMobileMenuOpen ? 'menu-3d-enter' : ''}`}>
          {navLinks.map((link, index) => (
            <a
              key={link.id}
              onClick={() => {
                if (link.isCV) {
                  window.dispatchEvent(new CustomEvent('openCV'))
                  setIsMobileMenuOpen(false)
                } else {
                  scrollToSection(link.id)
                }
              }}
              className={`w-full max-w-sm flex items-center gap-4 px-6 py-4 rounded-2xl text-lg font-medium transition-all cursor-pointer ${
                isMobileMenuOpen ? 'animate-fade-in' : ''
              } ${
                activeSection === link.id
                  ? 'text-white bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/20'
                  : 'text-gray-300 hover:text-white hover:bg-white/[0.05]'
              }`}
              style={{ animationDelay: `${index * 0.06}s` }}
            >
              <i className={`${link.icon} w-6 text-center ${activeSection === link.id ? 'text-indigo-300' : 'text-indigo-400'}`}></i>
              <span>{link.label}</span>
              {activeSection === link.id && (
                <div className="ml-auto w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
              )}
            </a>
          ))}
        </div>
      </div>
    </>
  )
}
