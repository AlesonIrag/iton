import { useState, useEffect } from 'react'

export default function About({ openProfileModal, isAdminMode }) {
  const [profileImage, setProfileImage] = useState(null)

  useEffect(() => {
    const savedImage = localStorage.getItem('profilePictureUrl')
    if (savedImage) {
      setProfileImage(savedImage)
    }
  }, [])

  return (
    <section id="about" className="relative py-20 px-4 bg-gray-900/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 gradient-text">About Me</h2>
        <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
          Passionate developer crafting digital experiences
        </p>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div
            className={`w-full max-w-md mx-auto rounded-2xl overflow-hidden shadow-2xl animate-fade-in ${isAdminMode ? 'profile-image cursor-pointer' : 'cursor-default'}`}
            onClick={() => openProfileModal('about')}
          >
            {profileImage ? (
              <img
                id="about-profile-img"
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full aspect-square bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
                <i className="fas fa-user text-8xl text-white"></i>
              </div>
            )}
            {isAdminMode && <i className="fas fa-camera text-white"></i>}
          </div>
          <div className="space-y-6 animate-slide-in">
            <div className="glass p-6 rounded-2xl">
              <p className="text-lg text-gray-300 leading-relaxed">
                Hi! I'm <span className="gradient-text font-bold">Aleson</span>, a passionate frontend developer specializing in creating stunning,
                responsive, and user-friendly web interfaces. I love bringing designs to life with modern web technologies.
              </p>
            </div>
            <div className="glass p-6 rounded-2xl">
              <p className="text-lg text-gray-300 leading-relaxed">
                With expertise in React, JavaScript, and modern CSS frameworks, I craft beautiful digital experiences
                that are both visually appealing and highly functional.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="glass p-4 rounded-xl text-center">
                <div className="text-3xl font-bold gradient-text">3+</div>
                <div className="text-sm text-gray-400 mt-1">Projects</div>
              </div>
              <div className="glass p-4 rounded-xl text-center">
                <div className="text-3xl font-bold gradient-text">1+</div>
                <div className="text-sm text-gray-400 mt-1">Years Exp</div>
              </div>
              <div className="glass p-4 rounded-xl text-center">
                <div className="text-3xl font-bold gradient-text">100%</div>
                <div className="text-sm text-gray-400 mt-1">Dedication</div>
              </div>
            </div>

            {/* Social links */}
            <div className="flex space-x-4 pt-4">
              <a href="https://github.com/AlesonIrag" target="_blank" rel="noopener noreferrer"
                className="glass p-4 rounded-xl hover:scale-110 transition-all hover:shadow-lg hover:shadow-indigo-500/50">
                <i className="fab fa-github text-2xl"></i>
              </a>
              <a href="https://www.facebook.com/profile.php?id=100089181777906" target="_blank" rel="noopener noreferrer"
                className="glass p-4 rounded-xl hover:scale-110 transition-all hover:shadow-lg hover:shadow-blue-500/50">
                <i className="fab fa-facebook text-2xl"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
