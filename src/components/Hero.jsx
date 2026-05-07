import { useState, useEffect, useRef, useCallback } from 'react'
import { db } from '../firebase'
import { ref, get } from 'firebase/database'

export default function Hero({ openProfileModal, isAdminMode }) {
  const [profileImage, setProfileImage] = useState(null)
  const [typedText, setTypedText] = useState('')
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const roles = [
    'Frontend Developer',
    'UI/UX Enthusiast',
    'Creative Designer',
    'React Specialist'
  ]

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
        console.error('Error loading profile from Firebase:', error)
        const savedImage = localStorage.getItem('profilePictureUrl')
        setProfileImage(savedImage || '/profile.jpg')
      }
    }

    loadProfileImage()
  }, [])

  // Typewriter effect
  useEffect(() => {
    const currentRole = roles[currentRoleIndex]
    let timeout

    if (!isDeleting && typedText === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), 2000)
    } else if (isDeleting && typedText === '') {
      setIsDeleting(false)
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length)
    } else {
      timeout = setTimeout(() => {
        setTypedText(prev => 
          isDeleting 
            ? prev.slice(0, -1) 
            : currentRole.slice(0, prev.length + 1)
        )
      }, isDeleting ? 40 : 80)
    }

    return () => clearTimeout(timeout)
  }, [typedText, isDeleting, currentRoleIndex])

  // 3D Parallax on mouse
  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setMousePos({ x, y })
    setTilt({ x: y * -8, y: x * 8 })
  }, [])

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center pt-16 sm:pt-20 px-4 sm:px-6 overflow-hidden perspective-container"
      onMouseMove={handleMouseMove}
    >
      {/* Animated background orbs with 3D parallax */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none preserve-3d">
        <div 
          className="absolute top-1/4 left-[10%] w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] md:w-[500px] md:h-[500px] bg-indigo-600/[0.07] rounded-full filter blur-[80px] sm:blur-[100px] md:blur-[120px] animate-morph"
          style={{ transform: `translate3d(${mousePos.x * -30}px, ${mousePos.y * -30}px, -50px)` }}
        />
        <div 
          className="absolute top-1/3 right-[5%] w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] bg-purple-600/[0.08] rounded-full filter blur-[80px] sm:blur-[100px] animate-morph"
          style={{ animationDelay: '2s', transform: `translate3d(${mousePos.x * 20}px, ${mousePos.y * 20}px, -30px)` }}
        />
        <div 
          className="absolute bottom-[10%] left-1/3 w-[180px] h-[180px] sm:w-[250px] sm:h-[250px] md:w-[350px] md:h-[350px] bg-pink-600/[0.06] rounded-full filter blur-[80px] sm:blur-[100px] animate-morph"
          style={{ animationDelay: '4s', transform: `translate3d(${mousePos.x * -15}px, ${mousePos.y * 15}px, -40px)` }}
        />

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(rgba(99, 102, 241, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      <div 
        className="relative text-center max-w-5xl mx-auto z-10 preserve-3d"
        style={{
          transform: `perspective(1200px) rotateX(${tilt.x * 0.3}deg) rotateY(${tilt.y * 0.3}deg)`,
          transition: 'transform 0.15s ease-out',
        }}
      >
        {/* Status badge */}
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-indigo-500/[0.08] border border-indigo-500/[0.15] mb-6 sm:mb-8 animate-fade-in"
          style={{ transform: 'translateZ(40px)' }}
        >
          <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-green-400"></span>
          </span>
          <span className="text-xs sm:text-sm text-gray-300 font-medium">Available for work</span>
        </div>

        {/* Profile Image with 3D floating ring */}
        <div className="mb-8 sm:mb-10 flex justify-center animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="relative" style={{ transform: 'translateZ(60px)', transformStyle: 'preserve-3d' }}>
            {/* Orbiting ring */}
            <div className="absolute inset-[-12px] sm:inset-[-20px] rounded-full border border-indigo-500/20 animate-spin" 
              style={{ animationDuration: '12s', transform: 'rotateX(60deg) translateZ(5px)' }} 
            />
            <div className="absolute inset-[-18px] sm:inset-[-30px] rounded-full border border-purple-500/10 animate-spin" 
              style={{ animationDuration: '18s', animationDirection: 'reverse', transform: 'rotateX(75deg) rotateZ(30deg) translateZ(10px)' }} 
            />
            
            <div 
              className={`w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full overflow-hidden relative ring-2 ring-indigo-500/20 ring-offset-2 sm:ring-offset-4 ring-offset-[#030712] ${isAdminMode ? 'profile-image cursor-pointer' : 'cursor-default'}`}
              onClick={() => openProfileModal('hero')}
              style={{ 
                boxShadow: '0 0 60px rgba(99, 102, 241, 0.15), 0 0 120px rgba(99, 102, 241, 0.05)',
              }}
            >
              {profileImage ? (
                <img 
                  id="hero-profile-img"
                  src={profileImage}
                  alt="Aleson Irag - Frontend Developer"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
                  <i className="fas fa-user text-6xl text-white"></i>
                </div>
              )}
              {isAdminMode && <i className="fas fa-camera text-white"></i>}
            </div>
          </div>
        </div>
        
        {/* Name with animated gradient - 3D depth */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 tracking-tight animate-fade-in px-4" 
          style={{ animationDelay: '0.2s', transform: 'translateZ(30px)' }}
        >
          <span className="text-white">Aleson </span>
          <span className="gradient-text-animated">Irag</span>
        </h1>

        {/* Typewriter role - floating */}
        <div className="text-lg sm:text-xl md:text-2xl text-gray-400 mb-8 sm:mb-10 min-h-[32px] sm:min-h-[36px] animate-fade-in font-light px-4" 
          style={{ animationDelay: '0.4s', transform: 'translateZ(20px)' }}
        >
          <span>{typedText}</span>
          <span className="typewriter-cursor"></span>
        </div>

        {/* CTA Buttons - elevated */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 animate-fade-in w-full px-4 max-w-md sm:max-w-none mx-auto" 
          style={{ animationDelay: '0.6s', transform: 'translateZ(50px)' }}
        >
          <a 
            href="#projects" 
            className="btn-primary group relative px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl font-semibold overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:shadow-indigo-500/30 text-center text-sm sm:text-base w-full sm:w-auto"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <span>View My Work</span>
              <i className="fas fa-arrow-right text-sm group-hover:translate-x-1 transition-transform"></i>
            </span>
          </a>
          <a 
            href="#contact" 
            className="group px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl font-semibold border border-white/[0.1] bg-white/[0.02] hover:bg-white/[0.06] transition-all duration-300 hover:scale-[1.03] hover:border-indigo-500/30 text-center text-sm sm:text-base w-full sm:w-auto"
          >
            <span className="flex items-center justify-center gap-2">
              <span>Contact Me</span>
              <i className="fas fa-paper-plane text-sm text-indigo-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"></i>
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
