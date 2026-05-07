import { useState, useEffect, useCallback } from 'react'
import emailjs from '@emailjs/browser'
import useScrollReveal from '../hooks/useScrollReveal'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.15 })
  const [focusedField, setFocusedField] = useState(null)
  const [cardTilt, setCardTilt] = useState({})

  // Replace these with your EmailJS credentials
  const serviceId = 'service_xlx9vc9'
  const templateId = 'template_rftrovp'
  const publicKey = 'ppyPHgFmLUTmk8A0v'

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(publicKey)
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const subject = `Portfolio Contact from ${formData.name}`
    const body = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0A%0D%0AMessage:%0D%0A${formData.message}`
    const mailtoLink = `mailto:iragaleson@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`
    
    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_name: 'Aleson Irag'
      }

      const response = await emailjs.send(serviceId, templateId, templateParams)
      
      if (response.status === 200) {
        showNotification('Message sent successfully! 🎉', 'success')
        setFormData({ name: '', email: '', message: '' })
        setShowModal(false)
      }
    } catch (error) {
      console.error('EmailJS failed, using mailto fallback:', error)
      window.open(mailtoLink, '_blank')
      showNotification('Opening your email client...', 'info')
      setFormData({ name: '', email: '', message: '' })
      setShowModal(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  const showNotification = (message, type = 'success') => {
    const notification = document.createElement('div')
    let bgColor = 'rgba(16, 185, 129, 0.95)'
    if (type === 'error') bgColor = 'rgba(239, 68, 68, 0.95)'
    if (type === 'info') bgColor = 'rgba(59, 130, 246, 0.95)'
    
    notification.style.cssText = `
      position: fixed; top: 20px; right: 20px; z-index: 10000;
      padding: 14px 24px; border-radius: 16px; font-size: 14px;
      background: ${bgColor}; color: white;
      box-shadow: 0 8px 32px rgba(0,0,0,0.3);
      backdrop-filter: blur(10px);
      animation: fadeInUp 0.4s ease-out;
      font-family: 'Inter', sans-serif;
    `
    notification.textContent = message
    document.body.appendChild(notification)
    
    setTimeout(() => {
      notification.style.opacity = '0'
      notification.style.transform = 'translateY(-10px)'
      notification.style.transition = 'all 0.3s ease'
      setTimeout(() => notification.remove(), 300)
    }, 2700)
  }

  const handleCardMouseMove = useCallback((e, id) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setCardTilt(prev => ({ ...prev, [id]: { x: y * -8, y: x * 8 } }))
  }, [])

  const handleCardMouseLeave = useCallback((id) => {
    setCardTilt(prev => ({ ...prev, [id]: null }))
  }, [])

  const contactMethods = [
    { icon: 'fas fa-envelope', label: 'Email', value: 'iragaleson@gmail.com', href: 'mailto:iragaleson@gmail.com', color: '#ef4444' },
    { icon: 'fab fa-github', label: 'GitHub', value: 'AlesonIrag', href: 'https://github.com/AlesonIrag', color: '#f1f5f9' },
    { icon: 'fab fa-facebook', label: 'Facebook', value: 'Aleson420', href: 'https://www.facebook.com/Aleson420', color: '#3b82f6' },
  ]

  return (
    <>
      <section id="contact" ref={sectionRef} className="relative py-16 sm:py-20 md:py-28 px-4 sm:px-6">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-500/20 to-transparent"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-indigo-600/[0.05] rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto perspective-container">
          {/* Section header */}
          <div className={`text-center mb-16 reveal-3d ${isVisible ? 'active' : ''}`}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/[0.08] border border-emerald-500/[0.15] text-emerald-300 text-sm font-medium mb-4">
              <i className="fas fa-paper-plane mr-2"></i>Get In Touch
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold gradient-text">
              Contact Me
            </h2>
            <p className="text-gray-500 mt-3 sm:mt-4 max-w-lg mx-auto text-sm sm:text-base">
              Have a project in mind or want to collaborate? Let's connect!
            </p>
          </div>

          {/* Contact methods - 3D floating panels */}
          <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 sm:mb-12 reveal-3d ${isVisible ? 'active' : ''}`} style={{ transitionDelay: '0.15s' }}>
            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.href}
                target={method.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="glass-3d rounded-2xl p-5 sm:p-5 flex items-center gap-4 card-3d glow-border-hover group"
                onMouseMove={(e) => handleCardMouseMove(e, `contact-${index}`)}
                onMouseLeave={() => handleCardMouseLeave(`contact-${index}`)}
                style={{
                  transform: cardTilt[`contact-${index}`]
                    ? `perspective(600px) rotateX(${cardTilt[`contact-${index}`].x}deg) rotateY(${cardTilt[`contact-${index}`].y}deg) translateZ(10px)`
                    : 'perspective(600px) rotateX(0) rotateY(0) translateZ(0)',
                  transition: cardTilt[`contact-${index}`] ? 'transform 0.1s ease' : 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
                }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                  style={{ background: `${method.color}15`, transform: 'translateZ(15px)' }}>
                  <i className={`${method.icon} text-lg`} style={{ color: method.color }}></i>
                </div>
                <div className="min-w-0" style={{ transform: 'translateZ(10px)' }}>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">{method.label}</div>
                  <div className="text-sm text-white font-medium truncate group-hover:text-indigo-300 transition-colors">{method.value}</div>
                </div>
              </a>
            ))}
          </div>
          
          {/* CTA Button */}
          <div className={`text-center reveal-3d ${isVisible ? 'active' : ''}`} style={{ transitionDelay: '0.25s' }}>
            <button
              onClick={() => setShowModal(true)}
              className="btn-primary group relative px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl font-semibold text-base sm:text-lg overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:shadow-indigo-500/30"
            >
              <span className="relative z-10 flex items-center gap-3">
                <i className="fas fa-paper-plane group-hover:rotate-12 transition-transform"></i>
                <span>Send a Message</span>
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Contact Modal with 3D entrance */}
      <div className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 transition-all duration-400 ${showModal ? 'visible opacity-100' : 'invisible opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={() => setShowModal(false)}></div>
        
        <div 
          className={`relative glass-3d rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 max-w-xl w-full border border-white/[0.06] shadow-2xl shadow-indigo-500/10 transition-all duration-500 ${showModal ? 'scale-100 translate-y-0' : 'scale-90 translate-y-8'}`}
          onClick={e => e.stopPropagation()}
          style={{
            transform: showModal 
              ? 'perspective(800px) rotateX(0) scale(1) translateY(0)' 
              : 'perspective(800px) rotateX(-10deg) scale(0.9) translateY(40px)',
          }}
        >
          <button
            onClick={() => setShowModal(false)}
            className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] flex items-center justify-center text-gray-400 hover:text-white transition-all hover:rotate-90 duration-300"
          >
            <i className="fas fa-times"></i>
          </button>

          <div className="text-center mb-6 sm:mb-8">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg shadow-indigo-500/20">
              <i className="fas fa-envelope text-white text-lg sm:text-xl"></i>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold gradient-text">Send a Message</h3>
            <p className="text-gray-500 text-xs sm:text-sm mt-2">I'll get back to you as soon as possible!</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <label className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                focusedField === 'name' || formData.name 
                  ? 'top-1 text-[10px] text-indigo-400 font-medium' 
                  : 'top-3.5 text-sm text-gray-500'
              }`}>Your Name</label>
              <input 
                type="text" name="name" value={formData.name}
                onChange={handleChange}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                className="w-full px-4 pt-5 pb-2.5 bg-white/[0.03] border border-white/[0.06] rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/30 text-white transition-all"
                required
              />
            </div>

            <div className="relative">
              <label className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                focusedField === 'email' || formData.email 
                  ? 'top-1 text-[10px] text-indigo-400 font-medium' 
                  : 'top-3.5 text-sm text-gray-500'
              }`}>Email Address</label>
              <input 
                type="email" name="email" value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                className="w-full px-4 pt-5 pb-2.5 bg-white/[0.03] border border-white/[0.06] rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/30 text-white transition-all"
                required
              />
            </div>

            <div className="relative">
              <label className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                focusedField === 'message' || formData.message 
                  ? 'top-1 text-[10px] text-indigo-400 font-medium' 
                  : 'top-3.5 text-sm text-gray-500'
              }`}>Your Message</label>
              <textarea
                name="message" value={formData.message}
                onChange={handleChange}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
                rows="4"
                className="w-full px-4 pt-5 pb-2.5 bg-white/[0.03] border border-white/[0.06] rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/30 resize-none text-white transition-all"
                required
              ></textarea>
            </div>

            <div className="flex gap-3 pt-2">
              <button 
                type="button" onClick={() => setShowModal(false)}
                className="flex-1 py-3.5 rounded-xl font-semibold transition-all bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] text-gray-300"
              >Cancel</button>
              <button 
                type="submit" disabled={isSubmitting}
                className="flex-1 btn-primary bg-gradient-to-r from-indigo-600 to-purple-600 py-3.5 rounded-xl font-semibold hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/20"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <i className="fas fa-spinner animate-spin"></i>
                    Sending...
                  </span>
                ) : 'Send Message'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
