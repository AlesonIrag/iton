import { useState, useCallback } from 'react'
import useScrollReveal from '../hooks/useScrollReveal'

export default function Projects() {
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.05 })
  const [activeFilter, setActiveFilter] = useState('all')
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [animatingFilter, setAnimatingFilter] = useState(false)
  const [displayFilter, setDisplayFilter] = useState('all')
  const [tilt, setTilt] = useState({})

  const projects = [
    {
      title: 'Bagkuning',
      subtitle: 'E-Commerce Platform',
      description: 'A full-stack e-commerce platform with server-side rendering, secure CyberSource payment integration, and a dynamic product catalog, enhanced by smooth GSAP animations. Currently deployed and actively used for online retail operations in Brunei.',
      icon: 'fas fa-shopping-bag',
      tags: ['Next.js + React + Tailwind CSS', 'Node.js', 'Firebase', 'CyberSource API', 'Stripe API'],
      link: 'https://bagkuning.com/',
      bgImage: '/bagkuning-bg.png',
      category: 'frontend',
      color: '#efebeb',
    },
    {
      title: 'Library System',
      subtitle: 'Benedicto College',
      description: 'Comprehensive library management system for Benedicto College with book cataloging, user management, and borrowing tracking.',
      icon: 'fas fa-book',
      tags: ['Angular 20 + TypeScript', 'Node.js + Express', 'SQL Database', 'jsPDF + html2canvas', 'RxJS'],
      link: 'https://benedictocollege-library.org/',
      bgImage: '/library-bg.jpg',
      category: 'frontend',
      color: '#ffffff'
    },
    {
      title: 'Personnel Tracker System',
      subtitle: 'Organization Management',
      description: 'A personnel tracking system for monitoring employees during official appointments through structured form submissions, with activity logging and an administrative dashboard. Currently implemented at the MISO Office of Mandaue City Hall.',
      icon: 'fas fa-users-cog',
      tags: ['Next.js (React) + Tailwind CSS', 'ASP.NET Core Web API', 'SQL Server'],
      link: null,
      bgImage: '/tracker-bg.png',
      category: 'fullstack',
      color: '#000000'
    },
    {
      title: 'JoyMove App',
      subtitle: 'Delivery, Transport and Orders',
      description: 'A unified mobility and logistics platform that provides both passenger transportation and parcel delivery services, featuring real-time tracking and an intuitive user experience. It is currently deployed and actively operating in Brunei.',
      icon: 'fas fa-motorcycle and car',
      tags: ['Flutter + Dart', ' Next.js + React + Tailwind CSS', ' Express.js + Node.js', 'Firebase', 'CyberSource API'],
      link: null,
      bgImage: '/joymove-bg.png',
      category: 'frontend',
      color: '#000000'
    },
    {
      title: 'Developer Portfolio',
      subtitle: 'Personal Website',
      description: 'Professional portfolio website showcasing creative designs, smooth animations, and modern UI/UX principles with Firebase-backed content management.',
      icon: 'fas fa-laptop-code',
      tags: ['React', 'Vite', 'Tailwind CSS', 'Firebase'],
      link: window.location.origin,
      bgImage: '/portfolio-bg.jpg',
      color: '#ec4899'
    }
  ]

  const filters = [
    { id: 'all', label: 'All Projects', icon: 'fas fa-th' },
  ]

  const handleFilterChange = (filterId) => {
    if (filterId === activeFilter) return
    setAnimatingFilter(true)
    setTimeout(() => {
      setActiveFilter(filterId)
      setDisplayFilter(filterId)
      setTimeout(() => setAnimatingFilter(false), 50)
    }, 300)
  }

  const handleTilt = useCallback((e, id) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt(prev => ({
      ...prev,
      [id]: {
        rx: y * -10,
        ry: x * 10,
        mx: e.clientX - rect.left,
        my: e.clientY - rect.top,
        imgX: x * -6,
        imgY: y * -6,
      }
    }))
  }, [])

  const resetTilt = useCallback((id) => {
    setTilt(prev => ({ ...prev, [id]: null }))
  }, [])

  const filteredProjects = displayFilter === 'all'
    ? projects
    : projects.filter(p => p.category === displayFilter)

  const getTiltStyle = (id) => {
    const t = tilt[id]
    if (!t) return { transform: 'perspective(800px) rotateX(0) rotateY(0) scale(1)' }
    return {
      transform: `perspective(800px) rotateX(${t.rx}deg) rotateY(${t.ry}deg) scale(1.02)`,
      transition: 'none',
    }
  }

  const getImageStyle = (id) => {
    const t = tilt[id]
    if (!t) return { transform: 'scale(1)', transition: 'transform 0.5s ease' }
    return {
      transform: `scale(1.08) translate(${t.imgX}px, ${t.imgY}px)`,
      transition: 'none',
    }
  }

  return (
    <section id="projects" ref={sectionRef} className="relative py-16 sm:py-20 md:py-28 px-4 sm:px-6">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent"></div>

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className={`text-center mb-16 reveal-3d ${isVisible ? 'active' : ''}`}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-pink-500/[0.08] border border-pink-500/[0.15] text-pink-300 text-sm font-medium mb-4">
            <i className="fas fa-rocket mr-2"></i>Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold gradient-text">
            Featured Projects
          </h2>
          <p className="text-gray-500 mt-3 sm:mt-4 max-w-lg mx-auto text-sm sm:text-base">
            Showcasing my best work and creative solutions
          </p>
        </div>

        {/* Filter tabs */}
        <div className={`flex justify-center gap-2 mb-12 reveal-3d ${isVisible ? 'active' : ''}`} style={{ transitionDelay: '0.1s' }}>
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => handleFilterChange(filter.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'bg-gradient-to-r from-indigo-600/80 to-purple-600/80 text-white shadow-lg shadow-indigo-500/20 scale-105'
                  : 'text-gray-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.05]'
              }`}
            >
              <i className={`${filter.icon} text-xs`}></i>
              {filter.label}
            </button>
          ))}
        </div>

        {/* Featured project - 3D tilt card */}
        {displayFilter === 'all' && (
          <div className={`mb-8 reveal-3d ${isVisible ? 'active' : ''} transition-all duration-500 ${animatingFilter ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
            style={{ transitionDelay: '0.15s' }}
          >
            <a
              href={projects[0].link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block relative glass glass-shimmer rounded-3xl overflow-hidden card-3d"
              onMouseEnter={() => setHoveredIndex(-1)}
              onMouseLeave={() => { setHoveredIndex(null); resetTilt('featured') }}
              onMouseMove={(e) => handleTilt(e, 'featured')}
              style={{
                ...getTiltStyle('featured'),
                transition: tilt['featured'] ? 'none' : 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
              }}
            >
              {/* Mouse-follow shine */}
              {tilt['featured'] && (
                <div className="card-shine" style={{
                  background: `radial-gradient(circle at ${tilt['featured'].mx}px ${tilt['featured'].my}px, rgba(255,255,255,0.06) 0%, transparent 50%)`,
                  opacity: 1,
                }} />
              )}

              <div className="grid lg:grid-cols-2 gap-0">
                {/* Image with parallax */}
                <div className="relative h-64 lg:h-96 overflow-hidden">
                  <img
                    src={projects[0].bgImage}
                    alt={projects[0].title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    style={getImageStyle('featured')}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0f172a]/80 lg:block hidden"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] to-transparent lg:hidden"></div>

                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-300 text-xs font-semibold flex items-center gap-1.5">
                    <i className="fas fa-star text-[10px]"></i>
                    Featured Project
                  </div>
                </div>

                {/* Content */}
                <div className="relative p-5 sm:p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-xl" style={{ background: `${projects[0].color}25`, color: projects[0].color }}>
                      <i className={projects[0].icon}></i>
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
                        {projects[0].title}
                      </h3>
                      <span className="text-sm text-gray-500">{projects[0].subtitle}</span>
                    </div>
                  </div>

                  <p className="text-gray-400 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base lg:text-lg">{projects[0].description}</p>

                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                    {projects[0].tags.map((tag, i) => (
                      <span key={i} className="tag-pill px-3 py-1.5 bg-white/[0.04] border border-white/[0.06] text-xs rounded-lg font-medium text-gray-300">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center text-indigo-400 group-hover:text-indigo-300 transition-colors font-semibold">
                    <span>Visit Live Site</span>
                    <i className="fas fa-external-link-alt ml-2 text-sm group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform"></i>
                  </div>
                </div>
              </div>
            </a>
          </div>
        )}

        {/* Project grid - 3D tilt cards */}
        <div className={`grid sm:grid-cols-2 gap-5 sm:gap-6 transition-all duration-500 ${animatingFilter ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
          {(displayFilter === 'all' ? projects.slice(1) : filteredProjects).map((project, index) => (
            <div
              key={project.title}
              className={`group relative glass glass-shimmer rounded-2xl overflow-hidden card-3d project-grid-item reveal-3d ${isVisible ? 'active' : ''}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => { setHoveredIndex(null); resetTilt(project.title) }}
              onMouseMove={(e) => handleTilt(e, project.title)}
              style={{
                ...getTiltStyle(project.title),
                transition: tilt[project.title] ? 'none' : 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.9s ease',
                transitionDelay: isVisible && !tilt[project.title] ? `${0.1 * (index + 2)}s` : '0s',
              }}
            >
              {/* Mouse-follow shine */}
              {tilt[project.title] && (
                <div className="card-shine" style={{
                  background: `radial-gradient(circle at ${tilt[project.title].mx}px ${tilt[project.title].my}px, rgba(255,255,255,0.05) 0%, transparent 50%)`,
                  opacity: 1,
                }} />
              )}

              {/* Background Image with parallax */}
              <div className="relative h-48 sm:h-52 overflow-hidden">
                {project.bgImage ? (
                  <img
                    src={project.bgImage}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    style={getImageStyle(project.title)}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br" style={{ background: `linear-gradient(135deg, ${project.color}30, ${project.color}10)` }}></div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/40 to-transparent"></div>

                <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider"
                  style={{ background: `${project.color}20`, color: project.color, border: `1px solid ${project.color}30` }}>
                  {project.category}
                </div>

                <div className="absolute bottom-4 left-6 w-12 h-12 rounded-2xl flex items-center justify-center backdrop-blur-xl text-white text-lg"
                  style={{ background: `${project.color}30`, boxShadow: `0 4px 20px ${project.color}20` }}>
                  <i className={project.icon}></i>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6">
                <div className="mb-1">
                  <span className="text-xs text-gray-500 uppercase tracking-wider">{project.subtitle}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text transition-all duration-300"
                  style={{ '--tw-gradient-from': project.color, '--tw-gradient-to': '#a78bfa' }}>
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-5 leading-relaxed line-clamp-2">{project.description}</p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tags.slice(0, 4).map((tag, i) => (
                    <span key={i} className="tag-pill px-2.5 py-1 bg-white/[0.03] border border-white/[0.05] text-[11px] rounded-md font-medium text-gray-400">
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 4 && (
                    <span className="px-2.5 py-1 text-[11px] text-gray-500 font-medium">
                      +{project.tags.length - 4} more
                    </span>
                  )}
                </div>

                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 group-hover:gap-3"
                    style={{ color: project.color }}
                  >
                    <span>View Project</span>
                    <i className="fas fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
                  </a>
                ) : (
                  <div className="inline-flex items-center gap-2 text-sm text-gray-500 font-medium">
                    <div className="w-2 h-2 rounded-full bg-yellow-500/50 animate-pulse"></div>
                    <span>In Development</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
