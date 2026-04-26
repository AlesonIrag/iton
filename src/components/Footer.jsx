import { useState, useEffect } from 'react'
import { db } from '../firebase'
import { ref, get, set } from 'firebase/database'
import useScrollReveal from '../hooks/useScrollReveal'

export default function Footer({ isAdminMode }) {
  const [year, setYear] = useState('')
  const [message, setMessage] = useState('')
  const [isEditingYear, setIsEditingYear] = useState(false)
  const [isEditingMessage, setIsEditingMessage] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [footerRef, isVisible] = useScrollReveal({ threshold: 0.1 })

  const inspirationalMessages = [
    'Built with ❤ using React & Tailwind CSS',
    'Crafted with passion and creativity ✨',
    'Turning ideas into reality, one line at a time 💻',
    'Code is poetry, design is art 🎨',
    'Creating digital experiences that inspire 🚀',
    'Where creativity meets technology ⚡',
    'Designed with love, coded with care 💙',
    'Building the future, one pixel at a time 🌟',
    'Passion-driven development 🔥',
    'Making the web beautiful, one project at a time 🌈',
    'Innovate. Create. Inspire. 💡',
    'Dream it. Code it. Ship it. 🚢',
    'Powered by coffee and creativity ☕',
    'Transforming visions into digital reality ✨',
    'Code with purpose, design with passion 💜'
  ]

  useEffect(() => {
    const loadFooterData = async () => {
      try {
        const dbRef = ref(db, 'portfolio/footer')
        const snapshot = await get(dbRef)
        
        if (snapshot.exists()) {
          const data = snapshot.val()
          setYear(data.year || new Date().getFullYear().toString())
          setMessage(data.message || 'Built with ❤ using React & Tailwind CSS')
          localStorage.setItem('footerYear', data.year)
          localStorage.setItem('footerMessage', data.message)
        } else {
          const savedYear = localStorage.getItem('footerYear') || new Date().getFullYear().toString()
          const savedMessage = localStorage.getItem('footerMessage') || 'Built with ❤ using React & Tailwind CSS'
          setYear(savedYear)
          setMessage(savedMessage)
        }
      } catch (error) {
        console.error('Error loading footer:', error)
        const savedYear = localStorage.getItem('footerYear') || new Date().getFullYear().toString()
        const savedMessage = localStorage.getItem('footerMessage') || 'Built with ❤ using React & Tailwind CSS'
        setYear(savedYear)
        setMessage(savedMessage)
      }
    }

    loadFooterData()
  }, [])

  const generateRandomMessage = () => {
    const randomIndex = Math.floor(Math.random() * inspirationalMessages.length)
    const newMessage = inspirationalMessages[randomIndex]
    setMessage(newMessage)
    showNotification('New message generated! Click ✓ to save.')
  }

  const handleYearSave = async () => {
    setIsSaving(true)
    try {
      await set(ref(db, 'portfolio/footer'), {
        year: year,
        message: message,
        updatedAt: new Date().toISOString()
      })
      localStorage.setItem('footerYear', year)
      setIsEditingYear(false)
      showNotification('Year updated! 🎉')
    } catch (error) {
      console.error('Error saving year:', error)
      showNotification('Failed to save. Check console.', 'error')
    } finally {
      setIsSaving(false)
    }
  }

  const handleMessageSave = async () => {
    setIsSaving(true)
    try {
      await set(ref(db, 'portfolio/footer'), {
        year: year,
        message: message,
        updatedAt: new Date().toISOString()
      })
      localStorage.setItem('footerMessage', message)
      setIsEditingMessage(false)
      showNotification('Message updated! 🎉')
    } catch (error) {
      console.error('Error saving message:', error)
      showNotification('Failed to save. Check console.', 'error')
    } finally {
      setIsSaving(false)
    }
  }

  const showNotification = (text, type = 'success') => {
    const notification = document.createElement('div')
    const bgColor = type === 'success' ? 'rgba(16, 185, 129, 0.95)' : 'rgba(239, 68, 68, 0.95)'
    notification.style.cssText = `
      position: fixed; top: 20px; right: 20px; z-index: 10000;
      padding: 14px 24px; border-radius: 16px; font-size: 14px;
      background: ${bgColor}; color: white;
      box-shadow: 0 8px 32px rgba(0,0,0,0.3);
      backdrop-filter: blur(10px);
      animation: fadeInUp 0.4s ease-out;
      font-family: 'Inter', sans-serif;
    `
    notification.textContent = text
    document.body.appendChild(notification)
    setTimeout(() => {
      notification.style.opacity = '0'
      notification.style.transition = 'opacity 0.3s ease'
      setTimeout(() => notification.remove(), 300)
    }, 2700)
  }

  const quickLinks = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Contact', id: 'contact' },
  ]

  const socialLinks = [
    { icon: 'fas fa-envelope', href: 'mailto:iragaleson@gmail.com', label: 'Email', color: '#ef4444' },
    { icon: 'fab fa-github', href: 'https://github.com/AlesonIrag', label: 'GitHub', color: '#f1f5f9' },
    { icon: 'fab fa-facebook', href: 'https://www.facebook.com/Aleson420', label: 'Facebook', color: '#3b82f6' },
  ]

  return (
    <footer ref={footerRef} className="relative pt-20 pb-8 px-4">
      {/* Top divider */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent"></div>
      
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-indigo-600/[0.03] rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-6xl mx-auto relative">
        {/* Main footer content */}
        <div className={`grid md:grid-cols-3 gap-12 mb-16 reveal-3d ${isVisible ? 'active' : ''}`}>
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20">
                A
              </div>
              <span className="text-lg font-semibold">
                <span className="text-white">Aleson</span>
                <span className="text-indigo-400 ml-1">Irag</span>
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Frontend developer passionate about creating stunning, modern web experiences with attention to every detail.
            </p>
          </div>

          {/* Quick Links */}
          <div className={`reveal-3d ${isVisible ? 'active' : ''}`} style={{ transitionDelay: '0.15s' }}>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">Quick Links</h4>
            <div className="space-y-2">
              {quickLinks.map(link => (
                <a
                  key={link.id}
                  onClick={() => {
                    const el = document.getElementById(link.id)
                    if (el) el.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="block text-gray-500 hover:text-indigo-400 transition-all text-sm cursor-pointer hover:translate-x-2 transform duration-300"
                >
                  <i className="fas fa-chevron-right text-[8px] mr-2 text-indigo-500/50"></i>
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div className={`reveal-3d ${isVisible ? 'active' : ''}`} style={{ transitionDelay: '0.25s' }}>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">Connect</h4>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.href}
                  target={social.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-center social-icon-magnetic group"
                  title={social.label}
                >
                  <i className={`${social.icon} text-gray-500 group-hover:text-white transition-colors`}
                    style={{ '--hover-color': social.color }}></i>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent mb-8"></div>

        {/* Bottom bar */}
        <div className={`flex flex-col md:flex-row justify-between items-center gap-4 reveal-3d ${isVisible ? 'active' : ''}`} style={{ transitionDelay: '0.35s' }}>
          {/* Copyright */}
          <div className="text-gray-500 text-sm flex items-center gap-2">
            {isEditingYear && isAdminMode ? (
              <div className="flex items-center gap-2">
                <span>©</span>
                <input
                  type="text"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-16 px-2 py-1 bg-white/[0.04] border border-white/[0.08] rounded-lg text-white text-sm"
                  autoFocus
                />
                <span>Aleson Irag. All rights reserved.</span>
                <button onClick={handleYearSave} className="text-green-400 hover:text-green-300">
                  <i className="fas fa-check"></i>
                </button>
                <button onClick={() => setIsEditingYear(false)} className="text-red-400 hover:text-red-300">
                  <i className="fas fa-times"></i>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span>© {year} Aleson Irag. All rights reserved.</span>
                {isAdminMode && (
                  <button 
                    onClick={() => setIsEditingYear(true)}
                    className="text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    <i className="fas fa-edit text-xs"></i>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Message */}
          <div className="text-gray-600 text-sm flex items-center gap-2">
            {isEditingMessage && isAdminMode ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="px-3 py-1 bg-white/[0.04] border border-white/[0.08] rounded-lg text-white text-sm min-w-[250px]"
                  autoFocus
                />
                <button 
                  onClick={generateRandomMessage} 
                  className="text-purple-400 hover:text-purple-300 transition-colors"
                  title="Generate random message"
                >
                  <i className="fas fa-random"></i>
                </button>
                <button onClick={handleMessageSave} className="text-green-400 hover:text-green-300">
                  <i className="fas fa-check"></i>
                </button>
                <button onClick={() => setIsEditingMessage(false)} className="text-red-400 hover:text-red-300">
                  <i className="fas fa-times"></i>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span dangerouslySetInnerHTML={{ __html: message.replace('❤', '<span class="text-red-500">❤</span>') }}></span>
                {isAdminMode && (
                  <button 
                    onClick={() => setIsEditingMessage(true)}
                    className="text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    <i className="fas fa-edit text-xs"></i>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
