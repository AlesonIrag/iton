import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import ProfileModal from './components/ProfileModal'
import Footer from './components/Footer'

function App() {
  const [isAdminMode, setIsAdminMode] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [profileTarget, setProfileTarget] = useState(null)

  useEffect(() => {
    // Check admin mode from sessionStorage
    const adminMode = sessionStorage.getItem('portfolioAdminMode') === 'true'
    setIsAdminMode(adminMode)
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
      padding: 10px 16px; border-radius: 8px; font-size: 13px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
      background: ${isEnabled ? 'rgba(16, 185, 129, 0.95)' : 'rgba(107, 114, 128, 0.95)'};
      color: white; animation: slideIn 0.3s ease-out;
    `
    notification.innerHTML = `<div style="display: flex; align-items: center; gap: 8px;">
      <span>${isEnabled ? '🔓' : '🔒'}</span><span>${message}</span>
    </div>`
    document.body.appendChild(notification)

    setTimeout(() => {
      notification.remove()
    }, 3000)
  }

  const openProfileModal = (target) => {
    setProfileTarget(target)
    setShowProfileModal(true)
  }

  const handleOpenProfileModal = (target) => {
    if (isAdminMode) {
      openProfileModal(target)
    } else {
      // Show notification for visitors
      const notification = document.createElement('div')
      notification.style.cssText = `
        position: fixed; top: 20px; right: 20px; z-index: 10000;
        padding: 12px 20px; border-radius: 8px; font-size: 14px;
        background: rgba(239, 68, 68, 0.95); color: white;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        animation: slideIn 0.3s ease-out;
      `
      notification.innerHTML = '🔒 Admin access required to change profile picture'
      document.body.appendChild(notification)
      setTimeout(() => notification.remove(), 3000)
    }
  }

  return (
    <div className="App">
      <Navbar isAdminMode={isAdminMode} toggleAdminMode={toggleAdminMode} />
      <Hero openProfileModal={handleOpenProfileModal} isAdminMode={isAdminMode} />
      <About openProfileModal={handleOpenProfileModal} isAdminMode={isAdminMode} />
      <Skills />
      <Projects />
      <Contact />
      <Footer isAdminMode={isAdminMode} />
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
