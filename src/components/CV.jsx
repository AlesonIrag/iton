import { useState, useEffect } from 'react'

export default function CV() {
  const [showModal, setShowModal] = useState(false)

  // Fixed: was using useState instead of useEffect for event listener
  useEffect(() => {
    const handleOpenCV = () => setShowModal(true)
    window.addEventListener('openCV', handleOpenCV)
    return () => window.removeEventListener('openCV', handleOpenCV)
  }, [])

  // Calculate age automatically
  const calculateAge = () => {
    const birthDate = new Date('2004-09-27')
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    
    // Adjust if birthday hasn't occurred this year yet
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    
    return age
  }

  // Calculate education status
  const getEducationStatus = () => {
    const currentYear = new Date().getFullYear()
    const graduationYear = 2026
    
    if (currentYear >= graduationYear) {
      return {
        period: '2022 - 2026',
        status: 'Graduated'
      }
    } else {
      return {
        period: '2022 - 2026',
        status: 'Currently studying'
      }
    }
  }

  const age = calculateAge()
  const education = getEducationStatus()

  const handleDownloadCV = async () => {
    // Convert profile image to base64
    let profileImageBase64 = ''
    try {
      const response = await fetch('/profile.jpg')
      const blob = await response.blob()
      const reader = new FileReader()
      profileImageBase64 = await new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result)
        reader.readAsDataURL(blob)
      })
    } catch (error) {
      console.log('Could not load profile image')
    }

    // Create CV content as HTML
    const cvContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Aleson Irag - Curriculum Vitae</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; }
          .header { text-align: center; margin-bottom: 30px; }
          .profile-pic { width: 120px; height: 120px; border-radius: 50%; border: 4px solid #6366f1; margin: 0 auto 20px; display: block; object-fit: cover; }
          h1 { color: #4f46e5; margin-bottom: 10px; margin-top: 10px; }
          h2 { color: #6366f1; border-bottom: 2px solid #6366f1; padding-bottom: 5px; margin-top: 30px; }
          .section { margin-bottom: 20px; }
          .info-row { display: flex; justify-content: space-between; margin: 5px 0; }
          .label { font-weight: bold; color: #4b5563; }
          .education-item { margin: 15px 0; padding-left: 20px; border-left: 3px solid #6366f1; }
          .education-item h3 { margin: 5px 0; color: #1f2937; }
          .education-item p { margin: 3px 0; color: #6b7280; }
        </style>
      </head>
      <body>
        <div class="header">
          ${profileImageBase64 ? `<img src="${profileImageBase64}" alt="Aleson Irag" class="profile-pic">` : ''}
          <h1>ALESON IRAG</h1>
          <p style="color: #6b7280; font-size: 18px;">Frontend Developer</p>
        </div>
        
        <h2>Contact Information</h2>
        <div class="section">
          <div class="info-row"><span class="label">Phone:</span> <span>0992 973 5321</span></div>
          <div class="info-row"><span class="label">Email:</span> <span>iragaleson@gmail.com</span></div>
          <div class="info-row"><span class="label">Address:</span> <span>Sector-6 Pagsabungan, Mandaue City</span></div>
        </div>
        
        <h2>Personal Details</h2>
        <div class="section">
          <div class="info-row"><span class="label">Gender:</span> <span>Male</span></div>
          <div class="info-row"><span class="label">Age:</span> <span>${age}</span></div>
          <div class="info-row"><span class="label">Date of Birth:</span> <span>September 27, 2004</span></div>
          <div class="info-row"><span class="label">Nationality:</span> <span>Filipino</span></div>
          <div class="info-row"><span class="label">Marital Status:</span> <span>Single</span></div>
        </div>
        
        <h2>Education</h2>
        <div class="section">
          <div class="education-item">
            <h3>Benedicto College</h3>
            <p><strong>${education.period}</strong> | A.S. Fortuna St. Mandaue City</p>
            <p>Bachelor of Science in Information Technology</p>
            <p><em>${education.status}</em></p>
          </div>
          
          <div class="education-item">
            <h3>Benedicto College</h3>
            <p><strong>2020 - 2022</strong> | A.S. Fortuna St. Mandaue City</p>
            <p>Senior High School</p>
          </div>
          
          <div class="education-item">
            <h3>Pagsabungan National High School</h3>
            <p><strong>2016 - 2020</strong> | Pagsabungan, Mandaue City</p>
            <p>Junior High School</p>
          </div>
          
          <div class="education-item">
            <h3>Pagsabungan Elementary School</h3>
            <p><strong>2010 - 2016</strong> | Pagsabungan, Mandaue City</p>
          </div>
        </div>
      </body>
      </html>
    `

    // Create blob and download
    const blob = new Blob([cvContent], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'Aleson_Irag_CV.html'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    // Show notification
    const notification = document.createElement('div')
    notification.style.cssText = `
      position: fixed; top: 20px; right: 20px; z-index: 10000;
      padding: 14px 24px; border-radius: 16px; font-size: 14px;
      background: rgba(16, 185, 129, 0.95); color: white;
      box-shadow: 0 8px 32px rgba(0,0,0,0.3);
      backdrop-filter: blur(10px);
      animation: fadeInUp 0.4s ease-out;
      font-family: 'Inter', sans-serif;
    `
    notification.textContent = '✅ CV downloaded successfully!'
    document.body.appendChild(notification)
    setTimeout(() => {
      notification.style.opacity = '0'
      notification.style.transition = 'opacity 0.3s ease'
      setTimeout(() => notification.remove(), 300)
    }, 2700)
  }

  return (
    <>
      {/* CV Modal with smooth transition */}
      <div className={`fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto transition-all duration-400 ${showModal ? 'visible opacity-100' : 'invisible opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={() => setShowModal(false)} />
        
        <div className={`relative glass rounded-2xl sm:rounded-3xl p-4 sm:p-6 max-w-5xl w-full my-4 sm:my-8 border border-white/[0.06] shadow-2xl max-h-[92vh] sm:max-h-[90vh] overflow-y-auto transition-all duration-400 ${showModal ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'}`}>
          {/* Close button */}
          <button
            onClick={() => setShowModal(false)}
            className="absolute top-3 right-3 w-10 h-10 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] flex items-center justify-center text-gray-400 hover:text-white transition-all hover:rotate-90 duration-300 z-10"
          >
            <i className="fas fa-times text-xl"></i>
          </button>

          {/* Profile Picture */}
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-3 sm:border-4 border-indigo-500 shadow-xl shadow-indigo-500/20">
              <img 
                src="/profile.jpg" 
                alt="Aleson Irag"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextElementSibling.style.display = 'flex'
                }}
              />
              <div className="w-full h-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center" style={{ display: 'none' }}>
                <i className="fas fa-user text-4xl text-white"></i>
              </div>
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 gradient-text text-center">Curriculum Vitae</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {/* Left Column - Personal Info */}
            <div className="md:col-span-1 space-y-4">
              {/* Contact Info */}
              <div className="glass rounded-xl p-3 sm:p-4">
                <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3 gradient-text">Contact</h3>
                <div className="space-y-2 sm:space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <i className="fas fa-phone text-indigo-400 mt-1"></i>
                    <div>
                      <div className="text-gray-400">Phone</div>
                      <div className="text-white">0992 973 5321</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <i className="fas fa-envelope text-indigo-400 mt-1"></i>
                    <div>
                      <div className="text-gray-400">Email</div>
                      <a href="mailto:iragaleson@gmail.com" className="text-white hover:text-indigo-400 transition-colors">
                        iragaleson@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <i className="fas fa-map-marker-alt text-indigo-400 mt-1"></i>
                    <div>
                      <div className="text-gray-400">Address</div>
                      <div className="text-white">Sector-6 Pagsabungan, Mandaue City</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal Details */}
              <div className="glass rounded-xl p-3 sm:p-4">
                <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3 gradient-text">Personal Details</h3>
                <div className="space-y-2 sm:space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Gender</span>
                    <span className="text-white">Male</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Age</span>
                    <span className="text-white">{age}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Date of Birth</span>
                    <span className="text-white">Sept 27, 2004</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Nationality</span>
                    <span className="text-white">Filipino</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Marital Status</span>
                    <span className="text-white">Single</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Education & Experience */}
            <div className="md:col-span-2 space-y-4">
              {/* Education */}
              <div className="glass rounded-xl p-3 sm:p-4">
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 gradient-text">Education</h3>
                <div className="space-y-4">
                  {/* College - Current */}
                  <div className="relative pl-8 border-l-2 border-indigo-500">
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-indigo-500 rounded-full shadow-lg shadow-indigo-500/30"></div>
                    <div className="text-sm text-indigo-400 mb-1">{education.period}</div>
                    <h4 className="text-lg font-semibold text-white mb-1">Benedicto College</h4>
                    <p className="text-gray-400 text-sm">A.S. Fortuna St. Mandaue City</p>
                    <p className="text-gray-300 text-sm mt-1">Bachelor of Science in Information Technology</p>
                    <p className="text-gray-300 text-sm mt-1 italic">{education.status}</p>
                  </div>

                  {/* Senior High */}
                  <div className="relative pl-8 border-l-2 border-gray-600">
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-gray-600 rounded-full"></div>
                    <div className="text-sm text-gray-400 mb-1">2020 - 2022</div>
                    <h4 className="text-lg font-semibold text-white mb-1">Benedicto College</h4>
                    <p className="text-gray-400 text-sm">A.S. Fortuna St. Mandaue City</p>
                    <p className="text-gray-300 text-sm mt-2">Senior High School</p>
                  </div>

                  {/* Junior High */}
                  <div className="relative pl-8 border-l-2 border-gray-600">
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-gray-600 rounded-full"></div>
                    <div className="text-sm text-gray-400 mb-1">2016 - 2020</div>
                    <h4 className="text-lg font-semibold text-white mb-1">Pagsabungan National High School</h4>
                    <p className="text-gray-400 text-sm">Pagsabungan, Mandaue City</p>
                    <p className="text-gray-300 text-sm mt-2">Junior High School</p>
                  </div>

                  {/* Elementary */}
                  <div className="relative pl-8 border-l-2 border-gray-600">
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-gray-600 rounded-full"></div>
                    <div className="text-sm text-gray-400 mb-1">2010 - 2016</div>
                    <h4 className="text-lg font-semibold text-white mb-1">Pagsabungan Elementary School</h4>
                    <p className="text-gray-400 text-sm">Pagsabungan, Mandaue City</p>
                  </div>
                </div>
              </div>

              {/* Download CV Button */}
              <div className="flex justify-center">
                <button 
                  onClick={handleDownloadCV}
                  className="group relative px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full font-semibold overflow-hidden transition-all hover:scale-105 hover:shadow-xl hover:shadow-purple-500/50 text-sm"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <i className="fas fa-download group-hover:animate-bounce"></i>
                    Download CV
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
