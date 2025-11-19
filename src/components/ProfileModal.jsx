import { useState } from 'react'
import { db } from '../firebase'
import { ref, set } from 'firebase/database'

export default function ProfileModal({ target, onClose }) {
  const [previewImage, setPreviewImage] = useState(null)
  const [currentImageData, setCurrentImageData] = useState(null)
  const [isUploading, setIsUploading] = useState(false)

  const compressImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const img = new Image()
        img.onload = () => {
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')
          
          // Resize to max 500x500 while maintaining aspect ratio (smaller = faster)
          let width = img.width
          let height = img.height
          const maxSize = 500
          
          if (width > height && width > maxSize) {
            height = (height * maxSize) / width
            width = maxSize
          } else if (height > maxSize) {
            width = (width * maxSize) / height
            height = maxSize
          }
          
          canvas.width = width
          canvas.height = height
          ctx.drawImage(img, 0, 0, width, height)
          
          // Compress to 60% quality (more compression = faster upload)
          const compressedData = canvas.toDataURL('image/jpeg', 0.6)
          resolve(compressedData)
        }
        img.src = e.target.result
      }
      reader.readAsDataURL(file)
    })
  }

  const handleFileSelect = async (e) => {
    const file = e.target.files[0]
    if (file && file.type.startsWith('image/')) {
      showNotification('Compressing image...', 'info')
      const compressedImage = await compressImage(file)
      setPreviewImage(compressedImage)
      setCurrentImageData(compressedImage)
      showNotification('Image ready!', 'success')
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

  const saveProfilePicture = async () => {
    if (!currentImageData) {
      alert('Please select an image first')
      return
    }

    setIsUploading(true)

    try {
      // Save to Firebase Realtime Database
      await set(ref(db, 'portfolio/profile'), {
        imageUrl: currentImageData,
        updatedAt: new Date().toISOString()
      })

      // Update images immediately
      const heroImg = document.getElementById('hero-profile-img')
      const aboutImg = document.getElementById('about-profile-img')
      
      if (heroImg) heroImg.src = currentImageData
      if (aboutImg) aboutImg.src = currentImageData

      // Also save to localStorage as backup
      localStorage.setItem('profilePictureUrl', currentImageData)
      
      showNotification('Profile updated successfully! 🎉')
      onClose()
    } catch (error) {
      console.error('Error saving profile:', error)
      const errorMsg = error.message || 'Unknown error'
      showNotification(`Error: ${errorMsg}`, 'error')
      alert(`Failed to save profile picture.\n\nError: ${errorMsg}\n\nMake sure:\n1. Firestore is enabled in Firebase Console\n2. Security rules allow writes\n3. Check browser console for details`)
    } finally {
      setIsUploading(false)
    }
  }

  const showNotification = (message, type = 'success') => {
    const notification = document.createElement('div')
    let bgColor = 'rgba(16, 185, 129, 0.95)'
    if (type === 'error') bgColor = 'rgba(239, 68, 68, 0.95)'
    if (type === 'info') bgColor = 'rgba(59, 130, 246, 0.95)'
    
    notification.style.cssText = `
      position: fixed; top: 20px; right: 20px; z-index: 10000;
      padding: 12px 20px; border-radius: 8px; font-size: 14px;
      background: ${bgColor}; color: white;
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
            disabled={isUploading}
            className="flex-1 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploading ? 'Uploading...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}
