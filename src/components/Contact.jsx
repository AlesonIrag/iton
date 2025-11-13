import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Web3Forms - Simple and reliable
      // Get your access key from: https://web3forms.com/
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          access_key: 'YOUR_WEB3FORMS_ACCESS_KEY', // Replace with your key from web3forms.com
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `Portfolio Contact from ${formData.name}`
        })
      })

      const result = await response.json()

      if (result.success) {
        showNotification('Message sent successfully! 🎉', 'success')
        setFormData({ name: '', email: '', message: '' })
        setShowModal(false)
      } else {
        showNotification('Failed to send. Please try again.', 'error')
      }
    } catch (error) {
      console.error('Error:', error)
      showNotification('Failed to send. Please try again.', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const showNotification = (message, type = 'success') => {
    const notification = document.createElement('div')
    const bgColor = type === 'success' ? 'rgba(16, 185, 129, 0.95)' : 'rgba(239, 68, 68, 0.95)'
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
    <>
      <section id="contact" className="py-20 px-4 bg-gray-900/50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Contact Me</h2>
          <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Let's connect!
          </p>
          
          <button
            onClick={() => setShowModal(true)}
            className="group relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full font-semibold text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50"
          >
            <span className="relative z-10 flex items-center gap-3">
              <i className="fas fa-envelope text-xl"></i>
              Send a Message
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>
        </div>
      </section>

      {/* Contact Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75 animate-fade-in">
          <div className="bg-gray-800 rounded-2xl p-8 max-w-2xl w-full relative animate-fade-in">
            {/* Close button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <i className="fas fa-times text-2xl"></i>
            </button>

            <h3 className="text-3xl font-bold mb-2 gradient-text text-center">Send a Message</h3>
            <p className="text-gray-400 text-center mb-6">Fill out the form below and I'll get back to you soon!</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <input 
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name" 
                className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                required
              />
              <input 
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email" 
                className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                required
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message" 
                rows="5"
                className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none text-white"
                required
              ></textarea>
              <div className="flex gap-4">
                <button 
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 py-3 rounded-lg font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 py-3 rounded-lg font-semibold hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
