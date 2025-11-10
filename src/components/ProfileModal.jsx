import { useState } from 'react'

export default function ProfileModal({ target, onClose }) {
  const [previewImage, setPreviewImage] = useState(null)
  const [currentImageData, setCurrentImageData] = useState(null)

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const imageData = event.target.result
        setPreviewImage(imageData)
        setCurrentImageData(imageData)
      }
      reader.readAsDataURL(file)
    }
  }

  const generateRandomAvatar = () => {
    const styles = ['avataaars', 'bottts', 'pixel-art', 'identicon', 'initials']
    const randomStyle = styles[Math.floor(Math.random() * styles.length)]
    const randomSeed = Math.random().toString(36).substring(7)
    const avatarUrl = `https://api.dicebear.com/7.x/${randomStyle}/svg?seed=${randomSeed}&size=400`
    
    setPreviewImage(avatarUrl)
    setCurrentImageData(avatarUrl)
  }

  const saveProfilePicture = () => {
    if (!currentImageData) {
      alert('Please select an image first')
      return
    }

    // Update both profile images
    const heroImg = document.getElementById('hero-profile-img')
    const aboutImg = document.getElementById('about-profile-img')
    
    if (heroImg) heroImg.src = currentImageData
    if (aboutImg) aboutImg.src = currentImageData

    // Save to localStorage
    localStorage.setItem('profilePictureUrl', currentImageData)
    
    // Close modal
    onClose()
    
    // Show success notification
    showNotification('Profile updated!')
  }

  const showNotification = (message) => {
    const notification = document.createElement('div')
    notification.style.cssText = `
      position: fixed; top: 20px; right: 20px; z-index: 10000;
      padding: 12px 20px; border-radius: 8px; font-size: 14px;
      background: rgba(16, 185, 129, 0.95); color: white;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      animation: slideIn 0.3s ease-out;
    `
    notification.textContent = message
    document.body.appendChild(notification)
    
    setTimeout(() => notification.remove(), 3000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75">
      <div className="bg-gray-800 rounded-2xl p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6">Change Profile Picture</h2>
        
        {/* Preview */}
        <div className="mb-6">
          <div className="w-full aspect-square bg-gray-700 rounded-xl overflow-hidden flex items-center justify-center">
            {previewImage ? (
              <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <i className="fas fa-user text-6xl text-gray-500"></i>
            )}
          </div>
        </div>

        {/* Upload Options */}
        <div className="space-y-4 mb-6">
          <input 
            type="file" 
            id="file-input" 
            accept="image/*" 
            className="hidden"
            onChange={handleFileSelect}
          />
          
          <button 
            onClick={() => document.getElementById('file-input').click()}
            className="w-full bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            <i className="fas fa-upload mr-3"></i>
            Upload from Device
          </button>

          <button 
            onClick={generateRandomAvatar}
            className="w-full bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            <i className="fas fa-dice mr-3"></i>
            Generate Random Avatar
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <button 
            onClick={onClose}
            className="flex-1 bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={saveProfilePicture}
            className="flex-1 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}
