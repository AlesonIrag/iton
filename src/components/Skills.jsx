export default function Skills() {
  const skills = [
    { name: 'React', icon: 'fab fa-react', color: 'from-blue-400 to-cyan-400', level: 90 },
    { name: 'JavaScript', icon: 'fab fa-js', color: 'from-yellow-400 to-yellow-600', level: 90 },
    { name: 'HTML/CSS', icon: 'fab fa-html5', color: 'from-orange-400 to-red-500', level: 95 },
    { name: 'Tailwind CSS', icon: 'fas fa-wind', color: 'from-cyan-400 to-blue-500', level: 85 },
    { name: 'TypeScript', icon: 'fab fa-js-square', color: 'from-blue-500 to-indigo-600', level: 80 },
    { name: 'Git', icon: 'fab fa-git-alt', color: 'from-red-500 to-orange-500', level: 85 },
  ]

  return (
    <section id="skills" className="relative py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 gradient-text">Frontend Frameworks</h2>
        <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
          Modern tools and technologies for building stunning web interfaces
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <div 
              key={index}
              className="group relative glass p-6 rounded-2xl card-hover cursor-pointer overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
              
              <div className="relative z-10">
                <div className={`text-5xl mb-4 bg-gradient-to-r ${skill.color} bg-clip-text text-transparent group-hover:scale-110 transition-transform inline-block`}>
                  <i className={skill.icon}></i>
                </div>
                <h3 className="text-xl font-semibold mb-3">{skill.name}</h3>
                
                {/* Progress bar */}
                <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${skill.color} transition-all duration-1000 ease-out`}
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-400 mt-2">{skill.level}% proficiency</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
