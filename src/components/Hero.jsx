import { useState, useEffect } from 'react'

export default function Hero({ openProfileModal, isAdminMode }) {
  const [profileImage, setProfileImage] = useState(null)

  useEffect(() => {
    const savedImage = localStorage.getItem('profilePictureUrl')
    if (savedImage) {
      setProfileImage(savedImage)
    } else {
      // Use default profile image
      setProfileImage('/profile.jpg')
    }
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 px-4 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative text-center max-w-4xl mx-auto animate-fade-in">
        <div className="mb-8 flex justify-center">
          <div 
            className={`w-48 h-48 rounded-full overflow-hidden shadow-2xl relative ${isAdminMode ? 'profile-image cursor-pointer' : 'cursor-default'}`}
            onClick={() => openProfileModal('hero')}
          >
            {profileImage ? (
              <img 
                id="hero-profile-img"
                src={profileImage}
                alt="Profile"
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
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Aleson Irag
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          Frontend Developer | UI/UX Enthusiast | Creative Designer
        </p>
        <div className="flex flex-wrap justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <a href="#projects" className="group relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full font-semibold overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50">
            <span className="relative z-10">View My Work</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </a>
          <a href="#contact" className="px-8 py-4 border-2 border-indigo-500 rounded-full font-semibold hover:bg-indigo-500/20 transition-all hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/50">
            Contact Me
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <i className="fas fa-chevron-down text-2xl text-gray-400"></i>
        </div>
      </div>
    </section>
  )
}
