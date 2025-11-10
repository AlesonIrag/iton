import { useState, useEffect } from 'react'

export default function Footer({ isAdminMode }) {
  const [year, setYear] = useState('')
  const [message, setMessage] = useState('')
  const [isEditingYear, setIsEditingYear] = useState(false)
  const [isEditingMessage, setIsEditingMessage] = useState(false)

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
    // Load saved values or use defaults
    const savedYear = localStorage.getItem('footerYear') || new Date().getFullYear().toString()
    const savedMessage = localStorage.getItem('footerMessage') || 'Built with ❤ using React & Tailwind CSS'
    setYear(savedYear)
    setMessage(savedMessage)
  }, [])

  const generateRandomMessage = () => {
    const randomIndex = Math.floor(Math.random() * inspirationalMessages.length)
    const newMessage = inspirationalMessages[randomIndex]
    setMessage(newMessage)
    showNotification('New message generated! Click ✓ to save.')
  }

  const handleYearSave = () => {
    localStorage.setItem('footerYear', year)
    setIsEditingYear(false)
    showNotification('Year updated!')
  }

  const handleMessageSave = () => {
    localStorage.setItem('footerMessage', message)
    setIsEditingMessage(false)
    showNotification('Message updated!')
  }

  const showNotification = (text) => {
    const notification = document.createElement('div')
    notification.style.cssText = `
      position: fixed; top: 20px; right: 20px; z-index: 10000;
      padding: 12px 20px; border-radius: 8px; font-size: 14px;
      background: rgba(16, 185, 129, 0.95); color: white;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      animation: slideIn 0.3s ease-out;
    `
    notification.textContent = text
    document.body.appendChild(notification)
    setTimeout(() => notification.remove(), 3000)
  }

  return (
    <footer className="relative py-8 px-4 bg-gray-900/80 border-t border-gray-800">
      <div className="max-w-6xl mx-auto">
        {/* Copyright */}
        <div className="text-gray-400 text-sm flex justify-center items-center gap-2 mb-4">
          {isEditingYear && isAdminMode ? (
            <div className="flex items-center gap-2">
              <span>©</span>
              <input
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-16 px-2 py-1 bg-gray-700 rounded text-white text-sm"
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
                  className="text-blue-400 hover:text-blue-300"
                >
                  <i className="fas fa-edit text-xs"></i>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Message */}
        <div className="text-gray-400 text-sm flex justify-center items-center gap-2 mb-4">
          {isEditingMessage && isAdminMode ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="px-3 py-1 bg-gray-700 rounded text-white text-sm min-w-[250px]"
                autoFocus
              />
              <button 
                onClick={generateRandomMessage} 
                className="text-purple-400 hover:text-purple-300"
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
                  className="text-blue-400 hover:text-blue-300"
                >
                  <i className="fas fa-edit text-xs"></i>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-4">
          <a 
            href="mailto:iragaleson@gmail.com" 
            className="text-gray-400 hover:text-red-400 transition-colors"
            title="Email"
          >
            <i className="fas fa-envelope text-xl"></i>
          </a>
          <a 
            href="https://github.com/AlesonIrag" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
            title="GitHub"
          >
            <i className="fab fa-github text-xl"></i>
          </a>
          <a 
            href="https://www.facebook.com/profile.php?id=100089181777906" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-400 transition-colors"
            title="Facebook"
          >
            <i className="fab fa-facebook text-xl"></i>
          </a>
        </div>
      </div>
    </footer>
  )
}
