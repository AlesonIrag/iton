import { useState, useCallback } from 'react'
import useScrollReveal from '../hooks/useScrollReveal'

export default function Skills() {
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.15 })
  const [tilt, setTilt] = useState({})

  const skills = [
    { name: 'React', icon: 'fab fa-react', color: '#61dafb', level: 90, description: 'Component-based UI' },
    { name: 'Next.js', icon: 'fas fa-server', color: '#ffffff', level: 85, description: 'SSR & Full-Stack React' },
    { name: 'JavaScript', icon: 'fab fa-js', color: '#f7df1e', level: 90, description: 'ES6+ & Modern JS' },
    { name: 'TypeScript', icon: 'fab fa-js-square', color: '#3178c6', level: 80, description: 'Type-safe code' },
    { name: 'HTML/CSS', icon: 'fab fa-html5', color: '#e34f26', level: 95, description: 'Semantic & Responsive' },
    { name: 'Tailwind CSS', icon: 'fas fa-wind', color: '#06b6d4', level: 85, description: 'Utility-first CSS' },
    { name: 'Firebase', icon: 'fas fa-fire', color: '#ffca28', level: 85, description: 'BaaS & Realtime DB' },
    { name: 'Node.js', icon: 'fab fa-node-js', color: '#68a063', level: 80, description: 'Express & REST APIs' },
    { name: 'Flutter', icon: 'fas fa-mobile-alt', color: '#02569B', level: 75, description: 'Cross-platform apps' },
    { name: 'PHP', icon: 'fab fa-php', color: '#777BB4', level: 80, description: 'Server-side scripting' },
    { name: 'ASP.NET Core', icon: 'fas fa-cube', color: '#512BD4', level: 75, description: 'Web API & C#' },
    { name: 'Git', icon: 'fab fa-git-alt', color: '#f05032', level: 85, description: 'Version control' },
  ]

  const handleMouseMove = useCallback((e, index) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt(prev => ({ ...prev, [index]: { x: y * -10, y: x * 10 } }))
  }, [])

  const handleMouseLeave = useCallback((index) => {
    setTilt(prev => ({ ...prev, [index]: { x: 0, y: 0 } }))
  }, [])

  return (
    <section id="skills" ref={sectionRef} className="relative py-28 px-4">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"></div>
      
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className={`text-center mb-20 reveal ${isVisible ? 'active' : ''}`}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/[0.08] border border-purple-500/[0.15] text-purple-300 text-sm font-medium mb-4">
            <i className="fas fa-code mr-2"></i>Tech Stack
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text">
            Tech Stack & Tools
          </h2>
          <p className="text-gray-500 mt-4 max-w-lg mx-auto">
            Modern tools and technologies for building stunning web interfaces
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {skills.map((skill, index) => (
            <div 
              key={index}
              className={`group relative glass glass-shimmer rounded-2xl p-6 card-hover border-gradient overflow-hidden tilt-card reveal ${isVisible ? 'active' : ''} stagger-${index + 1}`}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => handleMouseLeave(index)}
              style={{
                transform: tilt[index] 
                  ? `perspective(800px) rotateX(${tilt[index].x}deg) rotateY(${tilt[index].y}deg)` 
                  : 'perspective(800px) rotateX(0) rotateY(0)',
                transition: tilt[index]?.x ? 'transform 0.1s ease' : 'transform 0.5s ease, opacity 0.8s ease'
              }}
            >
              {/* Glow effect */}
              <div 
                className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-3xl"
                style={{ background: skill.color }}
              ></div>
              
              <div className="relative z-10 tilt-card-inner">
                {/* Icon */}
                <div className="mb-4 flex items-center justify-between">
                  <div 
                    className="text-4xl group-hover:scale-110 transition-transform duration-300"
                    style={{ color: skill.color }}
                  >
                    <i className={skill.icon}></i>
                  </div>
                  <span className="text-xs text-gray-500 font-mono">{skill.level}%</span>
                </div>

                {/* Name */}
                <h3 className="text-lg font-semibold mb-1 text-white group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300"
                  style={{ '--tw-gradient-from': skill.color }}
                >
                  {skill.name}
                </h3>
                <p className="text-xs text-gray-500 mb-4">{skill.description}</p>
                
                {/* Progress bar */}
                <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ 
                      width: isVisible ? `${skill.level}%` : '0%',
                      background: `linear-gradient(90deg, ${skill.color}, ${skill.color}88)`,
                      transitionDelay: `${0.3 + index * 0.1}s`,
                      boxShadow: `0 0 10px ${skill.color}40`
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
