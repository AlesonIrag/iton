import { useState } from 'react'

export default function CV() {
  const [showModal, setShowModal] = useState(false)

  // Listen for open CV event from navigation
  useState(() => {
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
            <p><strong>2020 - 2021</strong> | A.S. Fortuna St. Mandaue City</p>
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
      padding: 12px 20px; border-radius: 8px; font-size: 14px;
      background: rgba(16, 185, 129, 0.95); color: white;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `
    notification.textContent = '✅ CV downloaded successfully!'
    document.body.appendChild(notification)
    setTimeout(() => notification.remove(), 3000)
  }

  return (
    <>
      {/* CV Modal - Only shows when clicked from navigation */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75 overflow-y-auto">
          <div className="bg-gray-800 rounded-2xl p-6 max-w-5xl w-full my-8 relative animate-fade-in max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors z-10"
            >
              <i className="fas fa-times text-xl"></i>
            </button>

            {/* Profile Picture */}
            <div className="flex justify-center mb-6">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-500 shadow-xl">
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

            <h2 className="text-2xl md:text-3xl font-bold mb-6 gradient-text text-center">Curriculum Vitae</h2>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Left Column - Personal Info */}
              <div className="md:col-span-1 space-y-4">
                {/* Contact Info */}
                <div className="glass p-4 rounded-xl">
                  <h3 className="text-lg font-bold mb-3 gradient-text">Contact</h3>
                  <div className="space-y-3 text-sm">
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
                        <a href="mailto:iragaleson@gmail.com" className="text-white hover:text-indigo-400">
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
                <div className="glass p-4 rounded-xl">
                  <h3 className="text-lg font-bold mb-3 gradient-text">Personal Details</h3>
                  <div className="space-y-3 text-sm">
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
                <div className="glass p-4 rounded-xl">
                  <h3 className="text-xl font-bold mb-4 gradient-text">Education</h3>
                  <div className="space-y-4">
                    {/* College - Current */}
                    <div className="relative pl-8 border-l-2 border-indigo-500">
                      <div className="absolute -left-2 top-0 w-4 h-4 bg-indigo-500 rounded-full"></div>
                      <div className="text-sm text-indigo-400 mb-1">{education.period}</div>
                      <h4 className="text-lg font-semibold text-white mb-1">Benedicto College</h4>
                      <p className="text-gray-400 text-sm">A.S. Fortuna St. Mandaue City</p>
                      <p className="text-gray-300 text-sm mt-1">Bachelor of Science in Information Technology</p>
                      <p className="text-gray-300 text-sm mt-1 italic">{education.status}</p>
                    </div>

                    {/* Senior High */}
                    <div className="relative pl-8 border-l-2 border-gray-600">
                      <div className="absolute -left-2 top-0 w-4 h-4 bg-gray-600 rounded-full"></div>
                      <div className="text-sm text-gray-400 mb-1">2020 - 2021</div>
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
                      <i className="fas fa-download"></i>
                      Download CV
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
