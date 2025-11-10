export default function Projects() {
  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'Modern online shopping platform with responsive design, product catalog, and seamless user experience',
      icon: 'fas fa-shopping-cart',
      gradient: 'from-blue-500 via-indigo-500 to-purple-500',
      tags: ['React', 'Tailwind CSS', 'JavaScript'],
      link: null
    },
    {
      title: 'Website Developer Portfolio',
      description: 'Professional portfolio website showcasing creative designs, smooth animations, and modern UI/UX principles',
      icon: 'fas fa-laptop-code',
      gradient: 'from-purple-500 via-pink-500 to-red-500',
      tags: ['React', 'Vite', 'Tailwind CSS'],
      link: window.location.origin
    }
  ]

  return (
    <section id="projects" className="relative py-20 px-4 bg-gray-900/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 gradient-text">Featured Projects</h2>
        <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
          Showcasing my best work and creative solutions
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="group relative glass rounded-2xl overflow-hidden card-hover cursor-pointer"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Gradient background */}
              <div className={`relative h-56 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                <i className={`${project.icon} text-7xl text-white relative z-10 group-hover:scale-125 transition-transform duration-500`}></i>
                
                {/* Animated circles */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
              </div>
              
              <div className="p-6 relative">
                <h3 className="text-2xl font-bold mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-6 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="px-4 py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-xs rounded-full font-medium hover:scale-110 transition-transform">
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* View project button */}
                {project.link ? (
                  <a 
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 flex items-center text-indigo-400 group-hover:text-indigo-300 transition-colors"
                  >
                    <span className="font-semibold">View Project</span>
                    <i className="fas fa-arrow-right ml-2 group-hover:translate-x-2 transition-transform"></i>
                  </a>
                ) : (
                  <div className="mt-6 flex items-center text-gray-500">
                    <span className="font-semibold">Coming Soon</span>
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
