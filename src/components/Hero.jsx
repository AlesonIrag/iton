import { useState, useEffect, useRef, useCallback } from 'react'
import { db } from '../firebase'
import { ref, get } from 'firebase/database'

export default function Hero({ openProfileModal, isAdminMode }) {
  const [profileImage, setProfileImage] = useState(null)
  const [typedText, setTypedText] = useState('')
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const animFrameRef = useRef(null)

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

  // Constellation particle system
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    
    const resize = () => {
      canvas.width = canvas.parentElement.offsetWidth
      canvas.height = canvas.parentElement.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Create particles
    const count = 40
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 1,
      alpha: Math.random() * 0.4 + 0.1,
    }))

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const particles = particlesRef.current

      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(129, 140, 248, ${p.alpha})`
        ctx.fill()
      })

      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(129, 140, 248, ${0.06 * (1 - dist / 120)})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animFrameRef.current)
    }
  }, [])

  // Parallax on mouse
  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setMousePos({ x, y })
  }, [])

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center pt-20 px-4 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Constellation canvas */}
      <canvas ref={canvasRef} className="constellation-canvas" />

      {/* Animated background orbs with parallax */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/4 left-[10%] w-[500px] h-[500px] bg-indigo-600/[0.07] rounded-full filter blur-[120px] animate-morph"
          style={{ transform: `translate(${mousePos.x * -30}px, ${mousePos.y * -30}px)` }}
        />
        <div 
          className="absolute top-1/3 right-[5%] w-[400px] h-[400px] bg-purple-600/[0.08] rounded-full filter blur-[100px] animate-morph"
          style={{ animationDelay: '2s', transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)` }}
        />
        <div 
          className="absolute bottom-[10%] left-1/3 w-[350px] h-[350px] bg-pink-600/[0.06] rounded-full filter blur-[100px] animate-morph"
          style={{ animationDelay: '4s', transform: `translate(${mousePos.x * -15}px, ${mousePos.y * 15}px)` }}
        />

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(rgba(99, 102, 241, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      <div className="relative text-center max-w-5xl mx-auto z-10">
        {/* Status badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/[0.08] border border-indigo-500/[0.15] mb-8 animate-fade-in">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400"></span>
          </span>
          <span className="text-sm text-gray-300 font-medium">Available for work</span>
        </div>

        {/* Profile Image */}
        <div className="mb-10 flex justify-center animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div 
            className={`w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden relative ring-2 ring-indigo-500/20 ring-offset-4 ring-offset-[#030712] ${isAdminMode ? 'profile-image cursor-pointer' : 'cursor-default'}`}
            onClick={() => openProfileModal('hero')}
            style={{ boxShadow: '0 0 60px rgba(99, 102, 241, 0.15)' }}
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
        
        {/* Name with animated gradient */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <span className="text-white">Aleson </span>
          <span className="gradient-text-animated">Irag</span>
        </h1>

        {/* Typewriter role */}
        <div className="text-xl md:text-2xl text-gray-400 mb-10 h-8 animate-fade-in font-light" style={{ animationDelay: '0.4s' }}>
          <span>{typedText}</span>
          <span className="typewriter-cursor"></span>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <a 
            href="#projects" 
            className="btn-primary group relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl font-semibold overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:shadow-indigo-500/30"
          >
            <span className="relative z-10 flex items-center gap-2">
              <span>View My Work</span>
              <i className="fas fa-arrow-right text-sm group-hover:translate-x-1 transition-transform"></i>
            </span>
          </a>
          <a 
            href="#contact" 
            className="group px-8 py-4 rounded-2xl font-semibold border border-white/[0.1] bg-white/[0.02] hover:bg-white/[0.06] transition-all duration-300 hover:scale-[1.03] hover:border-indigo-500/30"
          >
            <span className="flex items-center gap-2">
              <span>Contact Me</span>
              <i className="fas fa-paper-plane text-sm text-indigo-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"></i>
            </span>
          </a>
        </div>


      </div>
    </section>
  )
}
