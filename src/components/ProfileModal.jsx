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

    console.log('🚀 Starting profile picture save...')
    setIsUploading(true)

    try {
      console.log('💾 Saving to Firebase Realtime Database...')
      // Save to Firebase Realtime Database
      await set(ref(db, 'portfolio/profile'), {
        imageUrl: currentImageData,
        updatedAt: new Date().toISOString()
      })
      console.log('✅ Successfully saved to Firebase!')

      // Update images immediately
      const heroImg = document.getElementById('hero-profile-img')
      const aboutImg = document.getElementById('about-profile-img')
      
      if (heroImg) {
        heroImg.src = currentImageData
        console.log('✅ Updated hero image')
      }
      if (aboutImg) {
        aboutImg.src = currentImageData
        console.log('✅ Updated about image')
      }

      // Also save to localStorage as backup
      localStorage.setItem('profilePictureUrl', currentImageData)
      console.log('✅ Saved to localStorage as backup')
      
      showNotification('Profile updated successfully! 🎉')
      onClose()
    } catch (error) {
      console.error('❌ Firebase Error:', error)
      
      // If Firebase fails, still update the UI and use localStorage
      console.log('🔄 Firebase failed, using localStorage fallback...')
      
      // Update images immediately
      const heroImg = document.getElementById('hero-profile-img')
      const aboutImg = document.getElementById('about-profile-img')
      
      if (heroImg) {
        heroImg.src = currentImageData
        console.log('✅ Updated hero image (fallback)')
      }
      if (aboutImg) {
        aboutImg.src = currentImageData
        console.log('✅ Updated about image (fallback)')
      }

      // Save to localStorage as primary storage
      localStorage.setItem('profilePictureUrl', currentImageData)
      console.log('✅ Saved to localStorage (fallback mode)')
      
      if (error.code === 'PERMISSION_DENIED') {
        showNotification('Profile updated locally! (Firebase rules need fixing)', 'info')
        alert('Profile updated locally!\n\nTo sync with Firebase:\n1. Go to Firebase Console\n2. Realtime Database → Rules\n3. Set rules to allow writes\n\nSee FIREBASE_RULES_SETUP.md for details')
      } else {
        showNotification('Profile updated locally!', 'info')
      }
      
      onClose()
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black bg-opacity-75">
      <div className="bg-gray-800 rounded-2xl p-4 sm:p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Change Profile Picture</h2>
        
        {/* Preview */}
        <div className="mb-4 sm:mb-6">
          <div className="w-full aspect-square bg-gray-700 rounded-xl overflow-hidden flex items-center justify-center">
            {previewImage ? (
              <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <i className="fas fa-user text-5xl sm:text-6xl text-gray-500"></i>
            )}
          </div>
        </div>

        {/* Upload Options */}
        <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
          <input 
            type="file" 
            id="file-input" 
            accept="image/*" 
            className="hidden"
            onChange={handleFileSelect}
          />
          
          <button 
            onClick={() => document.getElementById('file-input').click()}
            className="w-full bg-blue-600 hover:bg-blue-700 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold transition-colors text-sm sm:text-base"
          >
            <i className="fas fa-upload mr-2 sm:mr-3"></i>
            Upload from Device
          </button>

          <button 
            onClick={generateRandomAvatar}
            className="w-full bg-purple-600 hover:bg-purple-700 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold transition-colors text-sm sm:text-base"
          >
            <i className="fas fa-dice mr-2 sm:mr-3"></i>
            Generate Random Avatar
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 sm:space-x-4">
          <button 
            onClick={onClose}
            className="flex-1 bg-gray-700 hover:bg-gray-600 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold transition-colors text-sm sm:text-base"
          >
            Cancel
          </button>
          <button 
            onClick={saveProfilePicture}
            disabled={isUploading}
            className="flex-1 bg-green-600 hover:bg-green-700 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
          >
            {isUploading ? 'Uploading...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}
