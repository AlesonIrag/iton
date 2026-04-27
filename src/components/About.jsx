import { useState, useEffect, useCallback } from 'react'
import { db } from '../firebase'
import { ref, get } from 'firebase/database'
import useScrollReveal from '../hooks/useScrollReveal'

export default function About({ openProfileModal, isAdminMode }) {
  const [profileImage, setProfileImage] = useState(null)
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.15 })
  const [countersStarted, setCountersStarted] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const loadProfileImage = async () => {
      try {
        const dbRef = ref(db, 'portfolio/profile')
        const snapshot = await get(dbRef)
        
        if (snapshot.exists()) {
          const data = snapshot.val()
          setProfileImage(data.imageUrl)
          localStorage.setItem('profilePictureUrl', data.imageUrl)
        } else {
          const savedImage = localStorage.getItem('profilePictureUrl')
          setProfileImage(savedImage || '/profile.jpg')
        }
      } catch (error) {
        console.error('Error loading profile:', error)
        const savedImage = localStorage.getItem('profilePictureUrl')
        setProfileImage(savedImage || '/profile.jpg')
      }
    }

    loadProfileImage()
  }, [])

  useEffect(() => {
    if (isVisible && !countersStarted) {
      setCountersStarted(true)
    }
  }, [isVisible, countersStarted])

  const handleImageTilt = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: y * -10, y: x * 10 })
  }, [])

  const stats = [
    { value: 5, suffix: '+', label: 'Projects', icon: 'fas fa-rocket' },
    { value: 1, suffix: '+', label: 'Years Exp', icon: 'fas fa-calendar' },
    { value: 100, suffix: '%', label: 'Dedication', icon: 'fas fa-heart' },
  ]

  return (
    <section id="about" ref={sectionRef} className="relative py-16 sm:py-20 md:py-28 px-4 sm:px-6">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent"></div>
      
      <div className="max-w-6xl mx-auto perspective-container">
        {/* Section header */}
        <div className={`text-center mb-20 reveal-3d ${isVisible ? 'active' : ''}`}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/[0.08] border border-indigo-500/[0.15] text-indigo-300 text-sm font-medium mb-4">
            <i className="fas fa-user mr-2"></i>About Me
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold gradient-text">
            Get To Know Me
          </h2>
          <p className="text-gray-500 mt-3 sm:mt-4 max-w-lg mx-auto text-sm sm:text-base">
            Passionate developer crafting digital experiences
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Profile Image with 3D tilt */}
          <div className={`reveal-3d ${isVisible ? 'active' : ''}`} style={{ transitionDelay: '0.15s' }}>
            <div 
              className="relative"
              onMouseMove={handleImageTilt}
              onMouseLeave={() => setTilt({ x: 0, y: 0 })}
            >
              <div className="absolute -inset-4 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10 rounded-3xl blur-xl"></div>
              <div
                className={`relative w-full max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl shadow-indigo-500/10 card-3d glow-border-hover ${isAdminMode ? 'profile-image cursor-pointer' : 'cursor-default'}`}
                onClick={() => openProfileModal('about')}
                style={{
                  transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                  transition: tilt.x ? 'transform 0.1s ease' : 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
                }}
              >
                {profileImage ? (
                  <img
                    id="about-profile-img"
                    src={profileImage}
                    alt="Aleson Irag"
                    className="w-full h-full object-cover aspect-[4/5]"
                  />
                ) : (
                  <div className="w-full aspect-[4/5] bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
                    <i className="fas fa-user text-8xl text-white"></i>
                  </div>
                )}
                {isAdminMode && <i className="fas fa-camera text-white"></i>}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className={`space-y-6 reveal-3d ${isVisible ? 'active' : ''}`} style={{ transitionDelay: '0.25s' }}>
            <div className="glass-3d rounded-2xl p-4 sm:p-6 glow-border-hover">
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                Hi! I'm <span className="gradient-text font-bold">Aleson</span>, a passionate frontend developer specializing in creating stunning,
                responsive, and user-friendly web interfaces. I love bringing designs to life with modern web technologies.
              </p>
            </div>
            <div className="glass-3d rounded-2xl p-4 sm:p-6 glow-border-hover">
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                With expertise in React, JavaScript, and modern CSS frameworks, I craft beautiful digital experiences
                that are both visually appealing and highly functional.
              </p>
            </div>

            {/* Stats with 3D cards */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4">
              {stats.map((stat, index) => (
                <div key={index} className="glass-3d rounded-xl sm:rounded-2xl p-3 sm:p-5 text-center card-3d glow-border-hover group"
                  style={{ transitionDelay: `${0.3 + index * 0.1}s` }}
                >
                  <div className="text-indigo-400 mb-1 sm:mb-2 group-hover:scale-110 transition-transform" style={{ transform: 'translateZ(15px)' }}>
                    <i className={`${stat.icon} text-sm sm:text-lg`}></i>
                  </div>
                  <div className="text-xl sm:text-3xl font-bold gradient-text" style={{ transform: 'translateZ(20px)' }}>
                    <AnimatedCounter 
                      target={stat.value} 
                      suffix={stat.suffix} 
                      started={countersStarted} 
                    />
                  </div>
                  <div className="text-[9px] sm:text-xs text-gray-500 mt-1 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div className="flex gap-3 pt-4">
              <a href="https://github.com/AlesonIrag" target="_blank" rel="noopener noreferrer"
                className="glass-3d w-12 h-12 rounded-xl flex items-center justify-center social-icon-magnetic hover:shadow-lg hover:shadow-indigo-500/20 group">
                <i className="fab fa-github text-xl text-gray-400 group-hover:text-white transition-colors"></i>
              </a>
              <a href="https://www.facebook.com/Aleson420" target="_blank" rel="noopener noreferrer"
                className="glass-3d w-12 h-12 rounded-xl flex items-center justify-center social-icon-magnetic hover:shadow-lg hover:shadow-blue-500/20 group">
                <i className="fab fa-facebook text-xl text-gray-400 group-hover:text-blue-400 transition-colors"></i>
              </a>
              <a href="mailto:alesoncirag@gmail.com"
                className="glass-3d w-12 h-12 rounded-xl flex items-center justify-center social-icon-magnetic hover:shadow-lg hover:shadow-red-500/20 group">
                <i className="fas fa-envelope text-xl text-gray-400 group-hover:text-red-400 transition-colors"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Animated counter component
function AnimatedCounter({ target, suffix, started }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!started) return
    let current = 0
    const duration = 1500
    const steps = 30
    const increment = target / steps
    const stepTime = duration / steps

    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, stepTime)

    return () => clearInterval(timer)
  }, [started, target])

  return <span>{count}{suffix}</span>
}
