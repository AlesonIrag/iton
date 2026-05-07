import { useState, useEffect, useRef, lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import CV from './components/CV'
import Contact from './components/Contact'
import ProfileModal from './components/ProfileModal'
import Footer from './components/Footer'

const Scene3D = lazy(() => import('./components/Scene3D'))

function App() {
  const [isAdminMode, setIsAdminMode] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [profileTarget, setProfileTarget] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const cursorRef = useRef(null)

  useEffect(() => {
    // Check admin mode from sessionStorage
    const adminMode = sessionStorage.getItem('portfolioAdminMode') === 'true'
    setIsAdminMode(adminMode)

    // Preloader - hide after brief delay
    const timer = setTimeout(() => setIsLoaded(true), 1200)

    // Scroll progress & back-to-top
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
      setShowBackToTop(scrollTop > 600)
    }

    // Cursor glow (desktop only)
    const handleMouseMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px'
        cursorRef.current.style.top = e.clientY + 'px'
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const toggleAdminMode = () => {
    const newMode = !isAdminMode
    setIsAdminMode(newMode)
    sessionStorage.setItem('portfolioAdminMode', newMode.toString())

    // Show notification
    showNotification(newMode ? '🔓 Admin Enabled' : '🔒 Admin Disabled', newMode)
  }

  const showNotification = (message, isEnabled) => {
    const notification = document.createElement('div')
    notification.style.cssText = `
      position: fixed; top: 20px; right: 20px; z-index: 10000;
      padding: 10px 16px; border-radius: 12px; font-size: 13px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.3);
      backdrop-filter: blur(12px);
      background: ${isEnabled ? 'rgba(16, 185, 129, 0.95)' : 'rgba(107, 114, 128, 0.95)'};
      color: white; animation: fadeInUp 0.4s ease-out;
      font-family: 'Inter', sans-serif;
    `
    notification.innerHTML = `<div style="display: flex; align-items: center; gap: 8px;">
      <span>${isEnabled ? '🔓' : '🔒'}</span><span>${message}</span>
    </div>`
    document.body.appendChild(notification)

    setTimeout(() => {
      notification.style.opacity = '0'
      notification.style.transform = 'translateY(-10px)'
      notification.style.transition = 'all 0.3s ease'
      setTimeout(() => notification.remove(), 300)
    }, 2700)
  }

  const openProfileModal = (target) => {
    setProfileTarget(target)
    setShowProfileModal(true)
  }

  const handleOpenProfileModal = (target) => {
    if (isAdminMode) {
      openProfileModal(target)
    } else {
      const notification = document.createElement('div')
      notification.style.cssText = `
        position: fixed; top: 20px; right: 20px; z-index: 10000;
        padding: 12px 20px; border-radius: 12px; font-size: 14px;
        background: rgba(239, 68, 68, 0.95); color: white;
        box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        backdrop-filter: blur(12px);
        animation: fadeInUp 0.4s ease-out;
        font-family: 'Inter', sans-serif;
      `
      notification.innerHTML = '🔒 Admin access required to change profile picture'
      document.body.appendChild(notification)
      setTimeout(() => {
        notification.style.opacity = '0'
        notification.style.transition = 'opacity 0.3s ease'
        setTimeout(() => notification.remove(), 300)
      }, 2700)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="App">
      {/* Preloader */}
      <div className={`preloader ${isLoaded ? 'loaded' : ''}`}>
        <div className="preloader-logo"></div>
        <div className="preloader-bar">
          <div className="preloader-bar-fill"></div>
        </div>
      </div>

      {/* 3D Game Background */}
      <Suspense fallback={null}>
        <Scene3D />
      </Suspense>

      {/* Scroll Progress Bar */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      {/* Cursor Glow (desktop) */}
      <div ref={cursorRef} className="cursor-glow hidden md:block" />

      <div className="relative z-10">
        <Navbar isAdminMode={isAdminMode} toggleAdminMode={toggleAdminMode} />
        <Hero openProfileModal={handleOpenProfileModal} isAdminMode={isAdminMode} />
        <About openProfileModal={handleOpenProfileModal} isAdminMode={isAdminMode} />
        <Skills />
        <Projects />
        <Contact />
        <Footer isAdminMode={isAdminMode} />
        <CV />
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
        aria-label="Back to top"
      >
        <i className="fas fa-arrow-up"></i>
      </button>

      {showProfileModal && (
        <ProfileModal
          target={profileTarget}
          onClose={() => setShowProfileModal(false)}
        />
      )}
    </div>
  )
}

export default App
