import { useState, useEffect } from 'react'

export default function Navbar({ isAdminMode, toggleAdminMode }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const [clickTimeout, setClickTimeout] = useState(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogoClick = () => {
    setClickCount(prev => prev + 1)
    
    if (clickTimeout) clearTimeout(clickTimeout)
    
    const timeout = setTimeout(() => {
      setClickCount(0)
    }, 1000)
    
    setClickTimeout(timeout)
    
    if (clickCount + 1 === 3) {
      toggleAdminMode()
      setClickCount(0)
      clearTimeout(timeout)
    }
  }

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'scrolled' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div 
              className="text-xl font-bold text-blue-400 glow-text cursor-default select-none"
              onClick={handleLogoClick}
            >
              Aleson Irag
            </div>
            <div className="hidden md:flex space-x-8 items-center">
              <a onClick={() => scrollToSection('home')} className="hover:text-blue-400 transition-all duration-300 hover:glow-text cursor-pointer">Home</a>
              <a onClick={() => scrollToSection('about')} className="hover:text-blue-400 transition-all duration-300 hover:glow-text cursor-pointer">About</a>
              <a onClick={() => scrollToSection('skills')} className="hover:text-blue-400 transition-all duration-300 hover:glow-text cursor-pointer">Skills</a>
              <a onClick={() => scrollToSection('projects')} className="hover:text-blue-400 transition-all duration-300 hover:glow-text cursor-pointer">Projects</a>
              <a onClick={() => scrollToSection('contact')} className="hover:text-blue-400 transition-all duration-300 hover:glow-text cursor-pointer">Contact</a>
            </div>
            <button 
              className="md:hidden text-white hover:text-blue-400 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-98">
          <div className="flex flex-col items-center justify-center h-full space-y-8 text-xl">
            <a onClick={() => scrollToSection('home')} className="hover:text-blue-400 transition-colors cursor-pointer">Home</a>
            <a onClick={() => scrollToSection('about')} className="hover:text-blue-400 transition-colors cursor-pointer">About</a>
            <a onClick={() => scrollToSection('skills')} className="hover:text-blue-400 transition-colors cursor-pointer">Skills</a>
            <a onClick={() => scrollToSection('projects')} className="hover:text-blue-400 transition-colors cursor-pointer">Projects</a>
            <a onClick={() => scrollToSection('contact')} className="hover:text-blue-400 transition-colors cursor-pointer">Contact</a>
          </div>
        </div>
      )}
    </>
  )
}
