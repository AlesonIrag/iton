import { useState, useCallback } from 'react'
import useScrollReveal from '../hooks/useScrollReveal'

export default function Skills() {
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.15 })
  const [tilt, setTilt] = useState({})
  const [flipped, setFlipped] = useState({})

  const skills = [
    { name: 'React', icon: 'fab fa-react', color: '#61dafb', level: 90, description: 'Component-based UI', details: ['Hooks & Context', 'Redux', 'React Router', 'Custom Hooks', 'Performance'] },
    { name: 'Next.js', icon: 'fas fa-server', color: '#ffffff', level: 85, description: 'SSR & Full-Stack React', details: ['App Router', 'Server Components', 'API Routes', 'ISR / SSG', 'Middleware'] },
    { name: 'JavaScript', icon: 'fab fa-js', color: '#f7df1e', level: 90, description: 'ES6+ & Modern JS', details: ['Async/Await', 'Closures', 'Modules', 'Web APIs', 'DOM'] },
    { name: 'TypeScript', icon: 'fab fa-js-square', color: '#3178c6', level: 80, description: 'Type-safe code', details: ['Generics', 'Interfaces', 'Type Guards', 'Utility Types', 'Enums'] },
    { name: 'HTML/CSS', icon: 'fab fa-html5', color: '#e34f26', level: 95, description: 'Semantic & Responsive', details: ['CSS Grid', 'Flexbox', 'Animations', 'Variables', 'BEM'] },
    { name: 'Tailwind CSS', icon: 'fas fa-wind', color: '#06b6d4', level: 85, description: 'Utility-first CSS', details: ['JIT Mode', 'Plugins', 'Responsive', 'Dark Mode', 'Components'] },
    { name: 'Firebase', icon: 'fas fa-fire', color: '#ffca28', level: 85, description: 'BaaS & Realtime DB', details: ['Firestore', 'Auth', 'Storage', 'Functions', 'Hosting'] },
    { name: 'Node.js', icon: 'fab fa-node-js', color: '#68a063', level: 80, description: 'Express & REST APIs', details: ['Express.js', 'Middleware', 'JWT Auth', 'WebSockets', 'npm'] },
    { name: 'Flutter', icon: 'fas fa-mobile-alt', color: '#02569B', level: 75, description: 'Cross-platform apps', details: ['Widgets', 'State Mgmt', 'Animations', 'Platform Ch.', 'Dart'] },
    { name: 'PHP', icon: 'fab fa-php', color: '#777BB4', level: 80, description: 'Server-side scripting', details: ['Laravel', 'MVC', 'PDO', 'REST APIs', 'Blade'] },
    { name: 'ASP.NET Core', icon: 'fas fa-cube', color: '#512BD4', level: 75, description: 'Web API & C#', details: ['EF Core', 'LINQ', 'DI', 'MVC', 'Razor'] },
    { name: 'Git', icon: 'fab fa-git-alt', color: '#f05032', level: 85, description: 'Version control', details: ['Branching', 'Merging', 'Rebasing', 'CI/CD', 'GitHub'] },
  ]

  const handleMouseMove = useCallback((e, index) => {
    if (flipped[index]) return
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt(prev => ({ ...prev, [index]: { x: y * -12, y: x * 12 } }))
  }, [flipped])

  const handleMouseLeave = useCallback((index) => {
    setTilt(prev => ({ ...prev, [index]: { x: 0, y: 0 } }))
  }, [])

  const toggleFlip = useCallback((index) => {
    setFlipped(prev => ({ ...prev, [index]: !prev[index] }))
    setTilt(prev => ({ ...prev, [index]: { x: 0, y: 0 } }))
  }, [])

  return (
    <section id="skills" ref={sectionRef} className="relative py-28 px-4">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"></div>

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className={`text-center mb-20 reveal-3d ${isVisible ? 'active' : ''}`}>
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
              className={`skill-flip-card rounded-2xl reveal-3d ${isVisible ? 'active' : ''} ${flipped[index] ? 'flipped' : ''}`}
              style={{
                transitionDelay: isVisible ? `${0.05 * index}s` : '0s',
              }}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => handleMouseLeave(index)}
              onClick={() => toggleFlip(index)}
            >
              <div
                className="skill-flip-inner relative w-full"
                style={{
                  transform: !flipped[index] && tilt[index]
                    ? `perspective(800px) rotateX(${tilt[index].x}deg) rotateY(${tilt[index].y}deg)`
                    : undefined,
                  transition: tilt[index]?.x && !flipped[index] ? 'none' : undefined,
                }}
              >
                {/* FRONT */}
                <div className="skill-flip-front glass rounded-2xl p-6 glass-shimmer border-gradient group card-3d">
                  {/* Glow on hover */}
                  <div
                    className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-3xl"
                    style={{ background: skill.color }}
                  ></div>

                  <div className="relative z-10">
                    <div className="mb-4 flex items-center justify-between">
                      <div
                        className="text-4xl group-hover:scale-110 transition-transform duration-300"
                        style={{ color: skill.color, filter: `drop-shadow(0 0 8px ${skill.color}40)` }}
                      >
                        <i className={skill.icon}></i>
                      </div>
                      <span className="text-xs text-gray-500 font-mono">{skill.level}%</span>
                    </div>

                    <h3 className="text-lg font-semibold mb-1 text-white">{skill.name}</h3>
                    <p className="text-xs text-gray-500 mb-4">{skill.description}</p>

                    {/* Progress bar with glow */}
                    <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: isVisible ? `${skill.level}%` : '0%',
                          background: `linear-gradient(90deg, ${skill.color}, ${skill.color}88)`,
                          transitionDelay: `${0.3 + index * 0.1}s`,
                          boxShadow: `0 0 12px ${skill.color}50`
                        }}
                      ></div>
                    </div>

                    <div className="mt-3 text-[10px] text-gray-600 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <i className="fas fa-sync-alt text-[8px]"></i> Click to flip
                    </div>
                  </div>
                </div>

                {/* BACK */}
                <div className="skill-flip-back glass rounded-2xl p-5 flex flex-col items-center justify-center">
                  <div className="text-2xl mb-2" style={{ color: skill.color, filter: `drop-shadow(0 0 10px ${skill.color}50)` }}>
                    <i className={skill.icon}></i>
                  </div>
                  <h3 className="text-base font-bold mb-3 text-white">{skill.name}</h3>
                  <div className="w-full space-y-1.5">
                    {skill.details.map((detail, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px] text-gray-300">
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: skill.color }}></div>
                        {detail}
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 text-[10px] text-gray-600 flex items-center gap-1">
                    <i className="fas fa-undo text-[8px]"></i> Click to flip back
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
