import { useState, useCallback } from 'react'
import useScrollReveal from '../hooks/useScrollReveal'

export default function Contact() {
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.15 })
  const [cardTilt, setCardTilt] = useState({})

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
        </div>
      </section>
    </>
  )
}
