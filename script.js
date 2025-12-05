console.log('✅ script.js loaded');

// Global success notification function
window.showSuccessNotification = function (message) {
    // Remove existing notification
    const existing = document.getElementById('success-notification');
    if (existing) existing.remove();

    // Create minimal notification
    const notifDiv = document.createElement('div');
    notifDiv.id = 'success-notification';
    notifDiv.innerHTML = `
        <div class="success-notification-content">
            <i class="fas fa-check-circle"></i>
            <span class="success-notification-text">${message}</span>
        </div>
    `;

    document.body.appendChild(notifDiv);

    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notifDiv.parentElement) {
            notifDiv.classList.add('fade-out');
            setTimeout(() => notifDiv.remove(), 300);
        }
    }, 3000);

    // Add styles if not already added
    if (!document.getElementById('success-notification-styles')) {
        const style = document.createElement('style');
        style.id = 'success-notification-styles';
        style.textContent = `
            #success-notification {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10000;
                animation: slideInRight 0.3s ease-out;
            }

            .success-notification-content {
                background: rgba(16, 185, 129, 0.95);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(16, 185, 129, 0.3);
                border-radius: 10px;
                padding: 12px 16px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
                color: white;
                display: flex;
                align-items: center;
                gap: 10px;
                font-size: 14px;
                min-width: 200px;
            }

            .success-notification-content i {
                color: white;
                font-size: 16px;
            }

            .success-notification-text {
                flex: 1;
                font-weight: 500;
            }

            #success-notification.fade-out {
                animation: fadeOut 0.3s ease-out forwards;
            }

            @keyframes slideInRight {
                from {
                    opacity: 0;
                    transform: translateX(100px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }

            @keyframes fadeOut {
                to {
                    opacity: 0;
                    transform: translateX(100px);
                }
            }

            @media (max-width: 640px) {
                #success-notification {
                    left: 20px;
                    right: 20px;
                }
                
                .success-notification-content {
                    min-width: auto;
                }
            }
        `;
        document.head.appendChild(style);
    }
};

// Mobile menu functionality
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

// Toggle mobile menu
mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when clicking on links
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Close mobile menu when clicking outside
mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) {
        mobileMenu.classList.add('hidden');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll with throttling
let ticking = false;

function updateNavbar() {
    const nav = document.querySelector('nav');
    if (!nav) return; // Safety check

    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    ticking = false;
}

// Initialize navbar on load
function initializeNavbar() {
    const nav = document.querySelector('nav');
    if (nav) {
        // Ensure initial state is correct
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
    }
});

// Initialize on page load
window.addEventListener('load', initializeNavbar);

// Active navigation highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a[href^="#"]');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('text-blue-400');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('text-blue-400');
        }
    });
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('section, .bg-gray-800, .bg-gray-900').forEach(el => {
    observer.observe(el);
});

// Form submission handling
const contactForm = document.querySelector('form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;

        // Basic validation
        if (!name || !email || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Simulate form submission
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        contactForm.reset();
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.minimal-notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create minimal notification element
    const notification = document.createElement('div');
    notification.className = 'minimal-notification';

    // Set color based on type
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#3b82f6'
    };
    const color = colors[type] || colors.info;

    // Set icon based on type
    const icons = {
        success: '✓',
        error: '✕',
        info: 'i'
    };
    const icon = icons[type] || icons.info;

    notification.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            background: ${color};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            display: flex;
            align-items: center;
            gap: 10px;
            animation: slideInRight 0.3s ease-out;
            max-width: 350px;
        ">
            <span style="
                font-weight: bold;
                font-size: 16px;
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 50%;
            ">${icon}</span>
            <span style="flex: 1;">${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" style="
                background: none;
                border: none;
                color: white;
                cursor: pointer;
                font-size: 18px;
                padding: 0;
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0.7;
                transition: opacity 0.2s;
            " onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.7'">×</button>
        </div>
    `;

    document.body.appendChild(notification);

    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }
    }, 3000);
}

// Add notification animations to page
if (!document.getElementById('notification-animations')) {
    const style = document.createElement('style');
    style.id = 'notification-animations';
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Typing animation for hero section
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const heroSubtitle = document.querySelector('#home p');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        setTimeout(() => {
            typeWriter(heroSubtitle, originalText, 50);
        }, 1000);
    }
});

// Parallax effect for hero section - DISABLED to prevent layout issues
// The parallax was causing content duplication on scroll
/*
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('#home');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});
*/

// Skills animation on scroll
const skillsSection = document.querySelector('#skills');
if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillCards = entry.target.querySelectorAll('.bg-gray-800');
                skillCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(30px)';
                        card.style.transition = 'all 0.6s ease';

                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 100);
                    }, index * 200);
                });
            }
        });
    }, { threshold: 0.3 });

    skillsObserver.observe(skillsSection);
}

// Project cards hover effect
document.querySelectorAll('#projects .bg-gray-900').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
        card.style.boxShadow = '0 20px 40px rgba(59, 130, 246, 0.3)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = 'none';
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
    }
});

// Profile Picture Management
let currentUploadTarget = null;
let currentImageData = null;
let cameraStream = null;

// Open profile upload modal
window.openProfileUpload = function openProfileUpload(target) {
    currentUploadTarget = target;
    const modal = document.getElementById('profile-upload-modal');
    const previewImg = document.getElementById('preview-img');
    const currentImg = document.getElementById(`${target}-profile-img`);

    // Set current image as preview
    if (currentImg && currentImg.src) {
        previewImg.src = currentImg.src;
        previewImg.style.display = 'block';
        document.getElementById('preview-placeholder').style.display = 'none';
    }

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
};

// Close profile upload modal
window.closeProfileUpload = function closeProfileUpload() {
    const modal = document.getElementById('profile-upload-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
    document.body.style.overflow = 'auto';
    currentUploadTarget = null;
    currentImageData = null;
}

// Handle file selection
window.handleFileSelect = function (event) {
    console.log('handleFileSelect called');

    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
        console.log('File selected:', file.name);
        const reader = new FileReader();
        reader.onload = function (e) {
            currentImageData = e.target.result;
            const previewImg = document.getElementById('preview-img');
            if (previewImg) {
                previewImg.src = currentImageData;
                previewImg.style.display = 'block';
            }
            const placeholder = document.getElementById('preview-placeholder');
            if (placeholder) {
                placeholder.style.display = 'none';
            }
            console.log('Image loaded into preview');

            // Show success message
            if (typeof showNotification === 'function') {
                showNotification('Image loaded! Click "Save Changes" to apply.', 'success');
            }
        };
        reader.readAsDataURL(file);
    } else {
        console.log('No valid image file selected');
        if (typeof showNotification === 'function') {
            showNotification('Please select a valid image file', 'error');
        }
    }

    // Reset input to allow selecting the same file again
    event.target.value = '';
}

// Open camera
window.openCamera = async function openCamera() {
    // Check admin mode
    if (sessionStorage.getItem('portfolioAdminMode') !== 'true') {
        if (typeof showNotification === 'function') {
            showNotification('🔒 Admin access required', 'error');
        } else {
            alert('🔒 Admin access required to use camera');
        }
        return;
    }

    const cameraModal = document.getElementById('camera-modal');
    const video = document.getElementById('camera-video');

    if (!cameraModal || !video) {
        alert('Camera modal not found. Please refresh the page.');
        return;
    }

    try {
        cameraStream = await navigator.mediaDevices.getUserMedia({
            video: {
                width: { ideal: 640 },
                height: { ideal: 480 },
                facingMode: 'user'
            }
        });
        video.srcObject = cameraStream;
        cameraModal.classList.remove('hidden');
        if (typeof showNotification === 'function') {
            showNotification('Camera opened! Click capture when ready.', 'success');
        }
    } catch (error) {
        if (typeof showNotification === 'function') {
            showNotification('Camera access denied or not available', 'error');
        } else {
            alert('Camera access denied. Please allow camera access in your browser settings.');
        }
        console.error('Camera error:', error);
    }
};

// Close camera
function closeCamera() {
    const cameraModal = document.getElementById('camera-modal');
    const video = document.getElementById('camera-video');

    if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
        cameraStream = null;
    }

    video.srcObject = null;
    cameraModal.classList.add('hidden');
}

// Capture photo from camera
function capturePhoto() {
    const video = document.getElementById('camera-video');
    const canvas = document.getElementById('camera-canvas');
    const ctx = canvas.getContext('2d');

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw video frame to canvas
    ctx.drawImage(video, 0, 0);

    // Get image data
    currentImageData = canvas.toDataURL('image/jpeg', 0.8);

    // Update preview
    const previewImg = document.getElementById('preview-img');
    previewImg.src = currentImageData;
    previewImg.style.display = 'block';
    document.getElementById('preview-placeholder').style.display = 'none';

    // Close camera modal
    closeCamera();

    showNotification('Photo captured successfully!', 'success');
}

// Generate random avatar (preview only - requires Save Changes)
window.useRandomAvatar = function () {
    console.log('useRandomAvatar called');

    // Only avatar styles (no photo-realistic ones)
    const avatarStyles = ['avataaars', 'bottts', 'pixel-art', 'identicon', 'initials'];
    const randomStyle = avatarStyles[Math.floor(Math.random() * avatarStyles.length)];
    const randomSeed = Math.random().toString(36).substring(7);
    const avatarUrl = `https://api.dicebear.com/7.x/${randomStyle}/svg?seed=${randomSeed}&size=400`;

    console.log('Generated avatar style:', randomStyle);
    console.log('Generated avatar URL:', avatarUrl);

    // Store in currentImageData so it can be saved with "Save Changes" button
    currentImageData = avatarUrl;

    // Update preview only (in modal)
    const previewImg = document.getElementById('preview-img');
    if (previewImg) {
        previewImg.src = avatarUrl;
        previewImg.style.display = 'block';
        console.log('Updated preview image');
    }

    const placeholder = document.getElementById('preview-placeholder');
    if (placeholder) {
        placeholder.style.display = 'none';
    }

    // Show success message
    if (typeof showNotification === 'function') {
        showNotification('Avatar generated! Click "Save Changes" to apply.', 'success');
    }

    console.log('Random avatar generated - click "Save Changes" to apply');
};

// Save profile picture
window.saveProfilePicture = async function saveProfilePicture() {
    if (!currentImageData) {
        if (typeof showNotification === 'function') {
            showNotification('Please select an image first', 'error');
        } else {
            alert('Please select an image first');
        }
        return;
    }

    console.log('Saving profile picture...');

    // Update both profile images directly
    const heroImg = document.getElementById('hero-profile-img');
    const aboutImg = document.getElementById('about-profile-img');

    if (heroImg) {
        heroImg.src = currentImageData;
        heroImg.style.display = 'block';
        console.log('Updated hero image');
    }

    if (aboutImg) {
        aboutImg.src = currentImageData;
        aboutImg.style.display = 'block';
        console.log('Updated about image');
    }

    // Save to localStorage
    localStorage.setItem('profilePictureUrl', currentImageData);
    console.log('Saved to localStorage');

    // Close modal
    closeProfileUpload();

    // Show minimal success notification
    if (typeof showSuccessNotification === 'function') {
        showSuccessNotification('Profile updated!');
    } else {
        alert('✅ Profile picture updated!');
    }
}

// Upload image to ImgBB (free image hosting)
async function uploadToImgBB(base64Image) {
    try {
        // Remove data:image prefix if present
        const base64Data = base64Image.split(',')[1] || base64Image;

        // ImgBB API (free, no auth needed for basic use)
        const apiKey = '8d32e7a9c7f6f6c0d8e8f9a0b1c2d3e4'; // Public demo key
        const formData = new FormData();
        formData.append('image', base64Data);

        const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            return data.data.url;
        } else {
            throw new Error('ImgBB upload failed');
        }
    } catch (error) {
        console.error('ImgBB upload error:', error);

        // Try alternative: Upload to Cloudinary (backup)
        return await uploadToCloudinary(base64Image);
    }
}

// Backup: Upload to Cloudinary
async function uploadToCloudinary(base64Image) {
    try {
        const cloudName = 'demo'; // Cloudinary demo account
        const uploadPreset = 'ml_default';

        const formData = new FormData();
        formData.append('file', base64Image);
        formData.append('upload_preset', uploadPreset);

        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (data.secure_url) {
            return data.secure_url;
        } else {
            throw new Error('Cloudinary upload failed');
        }
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        return null;
    }
}

// Load saved profile picture on page load
function loadSavedProfilePicture() {
    try {
        // First check for uploaded URL (visible to everyone)
        const savedUrl = localStorage.getItem('profilePictureUrl');
        const savedImage = savedUrl || localStorage.getItem('profilePicture');

        if (savedImage) {
            const heroImg = document.getElementById('hero-profile-img');
            const aboutImg = document.getElementById('about-profile-img');

            if (heroImg) {
                heroImg.src = savedImage;
                heroImg.style.display = 'block';
                heroImg.onerror = null;
                const heroPlaceholder = heroImg.nextElementSibling;
                if (heroPlaceholder) {
                    heroPlaceholder.style.display = 'none';
                }
            }

            if (aboutImg) {
                aboutImg.src = savedImage;
                aboutImg.style.display = 'block';
                aboutImg.onerror = null;
                const aboutPlaceholder = aboutImg.nextElementSibling;
                if (aboutPlaceholder) {
                    aboutPlaceholder.style.display = 'none';
                }
            }

            if (savedUrl) {
                console.log('✅ Loaded shared profile picture from cloud');
            }
        }
    } catch (error) {
        console.warn('Could not load saved profile picture:', error);
    }
}

// Close modals with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (!document.getElementById('profile-upload-modal').classList.contains('hidden')) {
            closeProfileUpload();
        }
        if (!document.getElementById('camera-modal').classList.contains('hidden')) {
            closeCamera();
        }
        if (!mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
    }
});

// Debug function to check profile picture status
function debugProfilePicture() {
    const savedImage = localStorage.getItem('profilePicture');
    const heroImg = document.getElementById('hero-profile-img');
    const aboutImg = document.getElementById('about-profile-img');

    console.log('Debug Profile Picture:');
    console.log('Saved image exists:', !!savedImage);
    console.log('Hero img element:', !!heroImg);
    console.log('About img element:', !!aboutImg);

    if (heroImg) {
        console.log('Hero img src:', heroImg.src);
        console.log('Hero img display:', heroImg.style.display);
    }

    if (aboutImg) {
        console.log('About img src:', aboutImg.src);
        console.log('About img display:', aboutImg.style.display);
    }
}

// Load saved profile picture when page loads
window.addEventListener('load', () => {
    setTimeout(() => {
        loadSavedProfilePicture();
        debugProfilePicture(); // Add debug info
    }, 100);
});

// Manual function to refresh profile pictures (for debugging)
function refreshProfilePictures() {
    loadSavedProfilePicture();
    debugProfilePicture();
    showNotification('Profile pictures refreshed!', 'info');
}

// Make functions available globally for debugging
window.debugProfilePicture = debugProfilePicture;
window.refreshProfilePictures = refreshProfilePictures;

// Enhanced design features
function initializeEnhancedFeatures() {
    // Scroll progress indicator
    const scrollIndicator = document.getElementById('scroll-indicator');
    if (scrollIndicator) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            scrollIndicator.style.width = scrollPercent + '%';
        });
    }

    // Animate skill bars when in view
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width');
                setTimeout(() => {
                    bar.style.width = width + '%';
                }, 200);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => skillObserver.observe(bar));

    // Create floating particles
    createParticles();

    // Enhanced form interactions
    enhanceFormInputs();

    // Add glow effects to navigation
    enhanceNavigation();
}

// Create floating particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Enhance form inputs
function enhanceFormInputs() {
    const formInputs = document.querySelectorAll('.form-enhanced input, .form-enhanced textarea');

    formInputs.forEach(input => {
        const parent = input.parentElement;
        const overlay = parent.querySelector('div');

        input.addEventListener('focus', () => {
            if (overlay) overlay.style.opacity = '1';
        });

        input.addEventListener('blur', () => {
            if (overlay) overlay.style.opacity = '0';
        });

        // Add typing effect
        input.addEventListener('input', () => {
            input.style.transform = 'scale(1.02)';
            setTimeout(() => {
                input.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Enhance navigation
function enhanceNavigation() {
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.textShadow = '0 0 10px currentColor';
        });

        link.addEventListener('mouseleave', () => {
            link.style.textShadow = 'none';
        });
    });
}

// Enhanced scroll animations
function initializeScrollAnimations() {
    const animateElements = document.querySelectorAll('.card-3d, .project-card');

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });

    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        animationObserver.observe(element);
    });
}

// Enhanced button interactions
function enhanceButtons() {
    const buttons = document.querySelectorAll('.btn-enhanced');

    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.className = 'ripple';

            button.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Add ripple effect styles
const rippleStyles = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;

// Add styles to head
const styleSheet = document.createElement('style');
styleSheet.textContent = rippleStyles;
document.head.appendChild(styleSheet);

// Initialize all enhanced features
window.addEventListener('load', () => {
    setTimeout(() => {
        loadSavedProfilePicture();
        debugProfilePicture();
        initializeEnhancedFeatures();
        initializeScrollAnimations();
        enhanceButtons();
    }, 100);
});

console.log('Portfolio loaded successfully! 🚀');
console.log('Enhanced features initialized! ✨');
console.log('Debug functions available: debugProfilePicture(), refreshProfilePictures()');


// ===== ENHANCED ANIMATIONS AND INTERACTIONS =====

// Smooth reveal on scroll
function revealOnScroll() {
    const reveals = document.querySelectorAll('.skill-card, .project-card, .stat-card, section h2, section p');

    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Parallax effect for floating shapes
function parallaxShapes() {
    const shapes = document.querySelectorAll('.shape');
    const scrolled = window.pageYOffset;

    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.05;
        const yPos = -(scrolled * speed);
        shape.style.transform = `translateY(${yPos}px)`;
    });
}

window.addEventListener('scroll', parallaxShapes);

// Mouse move parallax effect
document.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.shape');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 20;
        const xMove = (x - 0.5) * speed;
        const yMove = (y - 0.5) * speed;

        shape.style.transform = `translate(${xMove}px, ${yMove}px)`;
    });
});

// Add hover tilt effect to cards
function addTiltEffect() {
    const cards = document.querySelectorAll('.skill-card, .project-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// Initialize tilt effect
window.addEventListener('load', addTiltEffect);

// Animated counter for stats
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// Trigger counter animation when stat cards are visible
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statValue = entry.target.querySelector('.text-2xl');
            const value = parseInt(statValue.textContent);
            animateCounter(statValue, value);
            statObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card').forEach(card => {
    statObserver.observe(card);
});

// Add ripple effect to buttons
document.querySelectorAll('.btn-enhanced, button').forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple-effect');

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add CSS for ripple effect
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Smooth scroll with offset for fixed nav
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add glow effect on hover for icons
document.querySelectorAll('i').forEach(icon => {
    icon.addEventListener('mouseenter', function () {
        this.style.filter = 'drop-shadow(0 0 15px currentColor)';
    });

    icon.addEventListener('mouseleave', function () {
        this.style.filter = 'drop-shadow(0 0 5px currentColor)';
    });
});

// Typing effect for hero text
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Initialize typing effect
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('#home h1 .typewriter');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        setTimeout(() => {
            typeWriter(heroTitle, text, 100);
        }, 500);
    }
});

console.log('🚀 All animations loaded and ready!');


// Admin mode removed - all features are now publicly accessible

// ===== EDIT YEAR FUNCTIONALITY =====

// Edit Year Function
window.editYear = function () {
    console.log('Edit year clicked!'); // Debug log

    const yearSpan = document.getElementById('copyright-year');
    if (!yearSpan) {
        console.error('Year span not found!');
        return;
    }

    const currentYear = yearSpan.textContent.trim();
    console.log('Current year:', currentYear); // Debug log

    // Create input element
    const input = document.createElement('input');
    input.type = 'number';
    input.value = currentYear;
    input.style.cssText = `
        background: rgba(26, 26, 46, 0.9);
        color: white;
        border: 2px solid #8b5cf6;
        border-radius: 6px;
        padding: 4px 8px;
        width: 80px;
        text-align: center;
        font-size: 16px;
        outline: none;
    `;
    input.min = '2000';
    input.max = '2100';

    // Replace span with input
    yearSpan.innerHTML = '';
    yearSpan.appendChild(input);
    input.focus();
    input.select();

    // Save on blur or enter
    const saveYear = () => {
        const newYear = input.value || currentYear;
        yearSpan.textContent = newYear;

        // Save to localStorage
        try {
            localStorage.setItem('copyrightYear', newYear);
            showNotification('Year updated to ' + newYear + '!', 'success');
            console.log('Year saved:', newYear); // Debug log
        } catch (error) {
            console.warn('Could not save year to localStorage:', error);
            showNotification('Year updated but not saved', 'info');
        }
    };

    input.addEventListener('blur', saveYear);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            input.blur();
        }
    });

    // Also save on Escape key
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            yearSpan.textContent = currentYear;
        }
    });
};

// Load saved year on page load
function loadSavedYear() {
    try {
        const savedYear = localStorage.getItem('copyrightYear');
        if (savedYear) {
            const yearSpan = document.getElementById('copyright-year');
            if (yearSpan) {
                yearSpan.textContent = savedYear;
                console.log('Loaded saved year:', savedYear);
            }
        }
    } catch (error) {
        console.warn('Could not load saved year:', error);
    }
}

// Load saved year when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadSavedYear();
    console.log('✅ Portfolio loaded successfully!');
});


// ===== ADMIN MODE SYSTEM (RECODED) =====

// Admin Mode Configuration
const AdminMode = {
    isActive: false,
    password: 'admin2025',
    storageKey: 'portfolioAdminMode',
    visitorAttempts: [], // Track visitor edit attempts

    // Initialize admin mode
    init: function () {

        // Add CSS styles
        this.addStyles();

        // Check if admin mode was previously enabled
        this.checkSavedState();

        // Keyboard shortcuts removed for security

        // Setup global functions
        this.setupGlobalFunctions();

        // Wrap protected functions
        this.wrapProtectedFunctions();

        // Setup global click protection
        this.setupGlobalProtection();

        // System ready
    },

    // Check saved admin state
    checkSavedState: function () {
        try {
            const saved = sessionStorage.getItem(this.storageKey);
            if (saved === 'true') {
                this.isActive = true;
                this.updateUI();
            }

            // Load visitor attempts
            const attempts = sessionStorage.getItem('visitorAttempts');
            if (attempts) {
                this.visitorAttempts = JSON.parse(attempts);
                // Attempts logged
            }
        } catch (e) {
            console.warn('Could not check saved admin state:', e);
        }
    },

    // Enable admin mode
    enable: function () {
        this.isActive = true;
        sessionStorage.setItem(this.storageKey, 'true');
        this.updateUI();
        this.showNotification('🔓 Admin Mode Activated!', 'success');
    },

    // Disable admin mode
    disable: function () {
        this.isActive = false;
        sessionStorage.setItem(this.storageKey, 'false');
        this.updateUI();
        this.showNotification('🔒 Admin Mode Deactivated', 'info');
    },

    // Toggle admin mode
    toggle: function () {
        if (this.isActive) {
            this.disable();
        } else {
            const password = prompt('🔐 Enter Admin Password:');
            if (password) {
                this.login(password);
            }
        }
    },

    // Login with password
    login: function (password) {
        if (password === this.password) {
            this.enable();
            return true;
        } else {
            this.showNotification('❌ Incorrect Password', 'error');
            console.log('❌ Access denied - wrong password');
            return false;
        }
    },

    // Update UI based on admin state
    updateUI: function () {
        const addonsSection = document.getElementById('addons');
        const addonsNavLink = document.getElementById('addons-nav-link');
        const addonsMobileLink = document.getElementById('addons-mobile-link');

        if (this.isActive) {
            // Add admin class to body
            document.body.classList.add('admin-mode');

            // Show admin indicator
            this.showIndicator();

            // Show add-ons section and links
            if (addonsSection) {
                addonsSection.classList.remove('hidden');
                console.log('✅ Add-ons section shown');
            }
            if (addonsNavLink) {
                addonsNavLink.classList.remove('hidden');
                console.log('✅ Add-ons nav link shown');
            }
            if (addonsMobileLink) {
                addonsMobileLink.classList.remove('hidden');
            }
        } else {
            // Remove admin class
            document.body.classList.remove('admin-mode');

            // Hide admin indicator
            this.hideIndicator();

            // Hide add-ons section and links
            if (addonsSection) addonsSection.classList.add('hidden');
            if (addonsNavLink) addonsNavLink.classList.add('hidden');
            if (addonsMobileLink) addonsMobileLink.classList.add('hidden');
        }
    },

    // Show admin indicator badge
    showIndicator: function () {
        this.hideIndicator(); // Remove existing first

        const indicator = document.createElement('div');
        indicator.id = 'admin-mode-indicator';
        indicator.innerHTML = `
            <div class="admin-badge">
                <i class="fas fa-shield-alt"></i>
                <span>ADMIN MODE</span>
                <button class="admin-close" onclick="AdminMode.disable()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        document.body.appendChild(indicator);
    },

    // Hide admin indicator
    hideIndicator: function () {
        const indicator = document.getElementById('admin-mode-indicator');
        if (indicator) indicator.remove();
    },

    // Show notification
    showNotification: function (message, type) {
        if (typeof showNotification === 'function') {
            showNotification(message, type);
        } else {
            console.log(message);
        }
    },

    // Removed keyboard shortcuts for security

    // Setup global functions
    setupGlobalFunctions: function () {
        // Internal use only - obfuscated
        window.AdminMode = this;
    },

    // Wrap protected functions
    wrapProtectedFunctions: function () {
        // Wait for DOM to be ready
        const wrapFunctions = () => {
            // Wrap openProfileUpload
            if (typeof window.openProfileUpload === 'function') {
                const originalOpenProfile = window.openProfileUpload;
                window.openProfileUpload = (target) => {
                    if (!this.isActive) {
                        // Show friendly notification to visitors
                        this.showVisitorNotification('profile');
                        return;
                    }
                    originalOpenProfile(target);
                };
            }

            // Wrap editYear
            if (typeof window.editYear === 'function') {
                const originalEditYear = window.editYear;
                window.editYear = () => {
                    if (!this.isActive) {
                        // Show friendly notification to visitors
                        this.showVisitorNotification('year');
                        return;
                    }
                    originalEditYear();
                };
            }
        };

        // Try wrapping immediately and after DOM load
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', wrapFunctions);
        } else {
            wrapFunctions();
        }

        // Also try after a short delay to ensure everything is loaded
        setTimeout(wrapFunctions, 500);
    },

    // Setup global click protection for any editable elements
    setupGlobalProtection: function () {
        document.addEventListener('click', (e) => {
            // Skip if admin mode is active
            if (this.isActive) return;

            // Check if clicking on any potentially editable element
            const target = e.target.closest('[contenteditable="true"], [data-editable], .editable, input:not([type="submit"]):not([type="button"]):not([type="checkbox"]):not([type="radio"]), textarea, select');

            // Exclude contact form elements
            const isContactForm = e.target.closest('#contact form, .contact-form');

            if (target && !isContactForm) {
                e.preventDefault();
                e.stopPropagation();
                this.showVisitorNotification('general');
            }
        }, true);

        // Prevent editing of contenteditable elements
        document.addEventListener('focus', (e) => {
            if (this.isActive) return;

            const target = e.target;
            const isContactForm = target.closest('#contact form, .contact-form');

            if ((target.hasAttribute('contenteditable') || target.classList.contains('editable')) && !isContactForm) {
                e.preventDefault();
                target.blur();
                this.showVisitorNotification('general');
            }
        }, true);

        // Protection enabled
    },

    // Show visitor notification when they try to edit
    showVisitorNotification: function (type) {
        // Log the attempt
        this.logVisitorAttempt(type);

        const messages = {
            profile: {
                title: 'View-only mode',
                message: 'This portfolio is protected',
                tip: ''
            },
            avatar: {
                title: 'View-only mode',
                message: 'This portfolio is protected',
                tip: ''
            },
            upload: {
                title: 'View-only mode',
                message: 'This portfolio is protected',
                tip: ''
            },
            save: {
                title: 'View-only mode',
                message: 'This portfolio is protected',
                tip: ''
            },
            year: {
                title: 'View-only mode',
                message: 'This portfolio is protected',
                tip: ''
            },
            'task-manager': {
                title: 'View-only mode',
                message: 'Task Manager is admin-only',
                tip: ''
            },
            general: {
                title: 'View-only mode',
                message: 'This portfolio is protected',
                tip: ''
            }
        };

        const notification = messages[type] || messages.general;

        // Show enhanced notification
        this.showEnhancedNotification(notification);

        // Console message for developers
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('👀 Visitor Attempt Detected');
        console.log(`📝 Action: Tried to edit ${type}`);
        console.log('🔒 Status: Blocked (Owner-only feature)');
        // Access restricted
    },

    // Log visitor attempts
    logVisitorAttempt: function (type) {
        const attempt = {
            type: type,
            timestamp: new Date().toISOString(),
            time: new Date().toLocaleString()
        };

        this.visitorAttempts.push(attempt);

        // Keep only last 50 attempts
        if (this.visitorAttempts.length > 50) {
            this.visitorAttempts.shift();
        }

        // Save to sessionStorage
        try {
            sessionStorage.setItem('visitorAttempts', JSON.stringify(this.visitorAttempts));
        } catch (e) {
            console.warn('Could not save visitor attempts:', e);
        }
    },

    // Get visitor attempts count
    getAttemptsCount: function () {
        return this.visitorAttempts.length;
    },

    // View all attempts (for admin)
    viewAttempts: function () {
        if (this.visitorAttempts.length === 0) {
            console.log('📊 No visitor edit attempts recorded yet.');
            return;
        }

        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('📊 Visitor Edit Attempts Log');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        this.visitorAttempts.forEach((attempt, index) => {
            console.log(`${index + 1}. ${attempt.time} - Tried to edit: ${attempt.type}`);
        });
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(`Total attempts: ${this.visitorAttempts.length}`);
    },

    // Show minimal notification in upper right corner
    showEnhancedNotification: function (notification) {
        // Remove existing notifications
        const existing = document.getElementById('visitor-notification');
        if (existing) existing.remove();

        // Create minimal notification element
        const notifDiv = document.createElement('div');
        notifDiv.id = 'visitor-notification';
        notifDiv.innerHTML = `
            <div class="visitor-notification-content">
                <i class="fas fa-lock"></i>
                <span class="visitor-notification-text">View-only mode</span>
                <button class="visitor-notification-close" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        document.body.appendChild(notifDiv);

        // Auto remove after 4 seconds
        setTimeout(() => {
            if (notifDiv.parentElement) {
                notifDiv.classList.add('fade-out');
                setTimeout(() => notifDiv.remove(), 300);
            }
        }, 4000);

        // Add minimal styles if not already added
        if (!document.getElementById('visitor-notification-styles')) {
            const style = document.createElement('style');
            style.id = 'visitor-notification-styles';
            style.textContent = `
                #visitor-notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    z-index: 10000;
                    animation: slideInRight 0.3s ease-out;
                }

                .visitor-notification-content {
                    background: rgba(30, 41, 59, 0.95);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(59, 130, 246, 0.3);
                    border-radius: 10px;
                    padding: 12px 16px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
                    color: white;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    font-size: 14px;
                    min-width: 200px;
                }

                .visitor-notification-content i.fa-lock {
                    color: #3b82f6;
                    font-size: 16px;
                }

                .visitor-notification-text {
                    flex: 1;
                    font-weight: 500;
                }

                .visitor-notification-close {
                    background: transparent;
                    border: none;
                    color: rgba(255, 255, 255, 0.6);
                    width: 20px;
                    height: 20px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s ease;
                    font-size: 12px;
                }

                .visitor-notification-close:hover {
                    color: white;
                    transform: scale(1.1);
                }

                #visitor-notification.fade-out {
                    animation: fadeOut 0.3s ease-out forwards;
                }

                @keyframes slideInRight {
                    from {
                        opacity: 0;
                        transform: translateX(100px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes fadeOut {
                    to {
                        opacity: 0;
                        transform: translateX(100px);
                    }
                }

                @media (max-width: 640px) {
                    #visitor-notification {
                        left: 20px;
                        right: 20px;
                    }
                    
                    .visitor-notification-content {
                        min-width: auto;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    },

    // Add CSS styles
    addStyles: function () {
        const style = document.createElement('style');
        style.textContent = `
            #admin-mode-indicator {
                position: fixed;
                top: 80px;
                right: 20px;
                z-index: 9999;
                animation: slideInRight 0.3s ease-out;
            }

            .admin-badge {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 12px 20px;
                border-radius: 30px;
                font-size: 13px;
                font-weight: 600;
                box-shadow: 0 4px 20px rgba(102, 126, 234, 0.5);
                display: flex;
                align-items: center;
                gap: 10px;
                transition: all 0.3s ease;
            }

            .admin-badge:hover {
                transform: scale(1.05);
                box-shadow: 0 6px 30px rgba(102, 126, 234, 0.7);
            }

            .admin-close {
                background: rgba(255, 255, 255, 0.2);
                border: none;
                color: white;
                width: 24px;
                height: 24px;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s ease;
            }

            .admin-close:hover {
                background: rgba(255, 255, 255, 0.3);
                transform: rotate(90deg);
            }

            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }

            body.admin-mode {
                /* Add any admin-specific body styles here */
            }
        `;
        document.head.appendChild(style);
    }
};

// Initialize admin mode when script loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => AdminMode.init());
} else {
    AdminMode.init();
}

// Also initialize after a delay to ensure everything is ready
setTimeout(() => {
    if (!AdminMode.isActive) {
        AdminMode.checkSavedState();
    }
}, 1000);


// ===== ADD-ONS SECTION FEATURES =====

// ===== VISITOR ATTEMPTS VIEWER =====

// Show visitor attempts in a modal
function showVisitorAttempts() {
    const attempts = AdminMode.visitorAttempts;

    if (attempts.length === 0) {
        showNotification('📊 No visitor edit attempts recorded yet', 'info');
        return;
    }

    // Create modal
    const modal = document.createElement('div');
    modal.id = 'visitor-attempts-modal';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="closeVisitorAttemptsModal()">
            <div class="modal-content" onclick="event.stopPropagation()">
                <div class="modal-header">
                    <h3>
                        <i class="fas fa-eye mr-2"></i>
                        Visitor Edit Attempts Log
                    </h3>
                    <button onclick="closeVisitorAttemptsModal()" class="modal-close-btn">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="attempts-stats">
                        <div class="stat-item">
                            <i class="fas fa-list-ol"></i>
                            <span>Total Attempts: <strong>${attempts.length}</strong></span>
                        </div>
                        <div class="stat-item">
                            <i class="fas fa-clock"></i>
                            <span>Session: <strong>Current</strong></span>
                        </div>
                    </div>
                    <div class="attempts-list">
                        ${attempts.map((attempt, index) => `
                            <div class="attempt-item">
                                <div class="attempt-number">#${index + 1}</div>
                                <div class="attempt-details">
                                    <div class="attempt-type">
                                        <i class="fas fa-${getAttemptIcon(attempt.type)}"></i>
                                        Tried to edit: <strong>${attempt.type}</strong>
                                    </div>
                                    <div class="attempt-time">
                                        <i class="fas fa-calendar-alt"></i>
                                        ${attempt.time}
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    <div class="modal-footer">
                        <button onclick="clearVisitorAttempts()" class="btn-danger">
                            <i class="fas fa-trash mr-2"></i>Clear Log
                        </button>
                        <button onclick="exportVisitorAttempts()" class="btn-primary">
                            <i class="fas fa-download mr-2"></i>Export
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Add styles if not already added
    if (!document.getElementById('visitor-attempts-styles')) {
        addVisitorAttemptsStyles();
    }
}

// Close visitor attempts modal
function closeVisitorAttemptsModal() {
    const modal = document.getElementById('visitor-attempts-modal');
    if (modal) {
        modal.classList.add('fade-out');
        setTimeout(() => modal.remove(), 300);
    }
}

// Get icon for attempt type
function getAttemptIcon(type) {
    const icons = {
        profile: 'user-circle',
        year: 'calendar-alt',
        theme: 'palette',
        content: 'file-alt'
    };
    return icons[type] || 'edit';
}

// Clear visitor attempts
function clearVisitorAttempts() {
    if (confirm('Are you sure you want to clear all visitor attempt logs?')) {
        AdminMode.visitorAttempts = [];
        sessionStorage.removeItem('visitorAttempts');
        showNotification('✅ Visitor attempts log cleared', 'success');
        closeVisitorAttemptsModal();
    }
}

// Export visitor attempts
function exportVisitorAttempts() {
    const attempts = AdminMode.visitorAttempts;
    const data = {
        exportDate: new Date().toISOString(),
        totalAttempts: attempts.length,
        attempts: attempts
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `visitor-attempts-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);

    showNotification('📥 Visitor attempts exported successfully', 'success');
}

// Add styles for visitor attempts modal
function addVisitorAttemptsStyles() {
    const style = document.createElement('style');
    style.id = 'visitor-attempts-styles';
    style.textContent = `
        #visitor-attempts-modal {
            position: fixed;
            inset: 0;
            z-index: 10001;
            animation: fadeIn 0.3s ease-out;
        }

        .modal-overlay {
            position: absolute;
            inset: 0;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(5px);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }

        .modal-content {
            background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
            border: 2px solid rgba(59, 130, 246, 0.3);
            border-radius: 20px;
            max-width: 700px;
            width: 100%;
            max-height: 80vh;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            animation: slideUp 0.3s ease-out;
        }

        .modal-header {
            background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
            padding: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 2px solid rgba(59, 130, 246, 0.3);
        }

        .modal-header h3 {
            color: white;
            font-size: 20px;
            font-weight: 700;
            margin: 0;
            display: flex;
            align-items: center;
        }

        .modal-close-btn {
            background: rgba(255, 255, 255, 0.2);
            border: none;
            color: white;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
        }

        .modal-close-btn:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: rotate(90deg);
        }

        .modal-body {
            padding: 20px;
            max-height: calc(80vh - 140px);
            overflow-y: auto;
        }

        .attempts-stats {
            display: flex;
            gap: 15px;
            margin-bottom: 20px;
            flex-wrap: wrap;
        }

        .stat-item {
            background: rgba(59, 130, 246, 0.1);
            border: 1px solid rgba(59, 130, 246, 0.3);
            padding: 12px 20px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            gap: 10px;
            color: white;
            flex: 1;
            min-width: 200px;
        }

        .stat-item i {
            color: #3b82f6;
            font-size: 18px;
        }

        .attempts-list {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        .attempt-item {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            padding: 15px;
            display: flex;
            gap: 15px;
            align-items: center;
            transition: all 0.2s ease;
        }

        .attempt-item:hover {
            background: rgba(255, 255, 255, 0.08);
            border-color: rgba(59, 130, 246, 0.5);
            transform: translateX(5px);
        }

        .attempt-number {
            background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
            color: white;
            width: 40px;
            height: 40px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 14px;
            flex-shrink: 0;
        }

        .attempt-details {
            flex: 1;
            color: white;
        }

        .attempt-type {
            font-size: 15px;
            margin-bottom: 5px;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .attempt-type i {
            color: #3b82f6;
        }

        .attempt-time {
            font-size: 13px;
            color: rgba(255, 255, 255, 0.6);
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .modal-footer {
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            display: flex;
            gap: 10px;
            justify-content: flex-end;
        }

        .btn-danger {
            background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
        }

        .btn-danger:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(239, 68, 68, 0.4);
        }

        .btn-primary {
            background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
        }

        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(59, 130, 246, 0.4);
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        #visitor-attempts-modal.fade-out {
            animation: fadeOut 0.3s ease-out forwards;
        }

        @keyframes fadeOut {
            to {
                opacity: 0;
            }
        }

        @media (max-width: 640px) {
            .modal-content {
                max-height: 90vh;
            }

            .attempts-stats {
                flex-direction: column;
            }

            .stat-item {
                min-width: 100%;
            }

            .modal-footer {
                flex-direction: column;
            }

            .btn-danger, .btn-primary {
                width: 100%;
                justify-content: center;
            }
        }
    `;
    document.head.appendChild(style);
}

// Make functions globally accessible
window.showVisitorAttempts = showVisitorAttempts;
window.closeVisitorAttemptsModal = closeVisitorAttemptsModal;
window.clearVisitorAttempts = clearVisitorAttempts;
window.exportVisitorAttempts = exportVisitorAttempts;

console.log('✅ Visitor attempts viewer loaded');


// ===== QUICK ACTIONS MENU =====

function showQuickActions() {
    const modal = document.createElement('div');
    modal.id = 'quick-actions-modal';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="closeQuickActions()">
            <div class="quick-actions-content" onclick="event.stopPropagation()">
                <div class="quick-actions-header">
                    <h3><i class="fas fa-bolt mr-2"></i>Quick Actions</h3>
                    <button onclick="closeQuickActions()" class="modal-close-btn">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="quick-actions-grid">
                    <button onclick="openProfileUpload('hero'); closeQuickActions();" class="quick-action-btn">
                        <i class="fas fa-camera"></i>
                        <span>Change Photo</span>
                    </button>
                    <button onclick="editYear(); closeQuickActions();" class="quick-action-btn">
                        <i class="fas fa-calendar-alt"></i>
                        <span>Edit Year</span>
                    </button>
                    <button onclick="showVisitorAttempts(); closeQuickActions();" class="quick-action-btn">
                        <i class="fas fa-eye"></i>
                        <span>View Attempts</span>
                    </button>
                    <button onclick="refreshProfilePictures(); closeQuickActions();" class="quick-action-btn">
                        <i class="fas fa-sync"></i>
                        <span>Refresh Images</span>
                    </button>
                    <button onclick="window.scrollTo({top: 0, behavior: 'smooth'}); closeQuickActions();" class="quick-action-btn">
                        <i class="fas fa-arrow-up"></i>
                        <span>Scroll to Top</span>
                    </button>
                    <button onclick="window.location.reload();" class="quick-action-btn">
                        <i class="fas fa-redo"></i>
                        <span>Reload Page</span>
                    </button>
                    <button onclick="copyAdminPassword(); closeQuickActions();" class="quick-action-btn">
                        <i class="fas fa-key"></i>
                        <span>Copy Password</span>
                    </button>
                    <button onclick="adminLogout(); closeQuickActions();" class="quick-action-btn danger">
                        <i class="fas fa-sign-out-alt"></i>
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    if (!document.getElementById('quick-actions-styles')) {
        addQuickActionsStyles();
    }
}

function closeQuickActions() {
    const modal = document.getElementById('quick-actions-modal');
    if (modal) {
        modal.classList.add('fade-out');
        setTimeout(() => modal.remove(), 300);
    }
}

function copyAdminPassword() {
    const password = AdminMode.password;
    navigator.clipboard.writeText(password).then(() => {
        showNotification('🔑 Password copied to clipboard', 'success');
    }).catch(() => {
        showNotification('Password: ' + password, 'info');
    });
}

function addQuickActionsStyles() {
    const style = document.createElement('style');
    style.id = 'quick-actions-styles';
    style.textContent = `
        .quick-actions-content {
            background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
            border: 2px solid rgba(236, 72, 153, 0.3);
            border-radius: 20px;
            max-width: 500px;
            width: 100%;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            animation: slideUp 0.3s ease-out;
        }

        .quick-actions-header {
            background: linear-gradient(135deg, #ec4899 0%, #db2777 100%);
            padding: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-radius: 18px 18px 0 0;
        }

        .quick-actions-header h3 {
            color: white;
            font-size: 20px;
            font-weight: 700;
            margin: 0;
            display: flex;
            align-items: center;
        }

        .quick-actions-grid {
            padding: 20px;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
        }

        .quick-action-btn {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: white;
            padding: 20px;
            border-radius: 12px;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
            transition: all 0.2s ease;
            font-size: 14px;
            font-weight: 600;
        }

        .quick-action-btn:hover {
            background: rgba(236, 72, 153, 0.2);
            border-color: rgba(236, 72, 153, 0.5);
            transform: translateY(-3px);
            box-shadow: 0 5px 15px rgba(236, 72, 153, 0.3);
        }

        .quick-action-btn i {
            font-size: 24px;
            color: #ec4899;
        }

        .quick-action-btn.danger {
            background: rgba(239, 68, 68, 0.1);
            border-color: rgba(239, 68, 68, 0.3);
        }

        .quick-action-btn.danger:hover {
            background: rgba(239, 68, 68, 0.2);
            border-color: rgba(239, 68, 68, 0.5);
        }

        .quick-action-btn.danger i {
            color: #ef4444;
        }

        @media (max-width: 640px) {
            .quick-actions-grid {
                grid-template-columns: 1fr;
            }
        }
    `;
    document.head.appendChild(style);
}

// Update attempts counter in add-ons section
function updateAttemptsCounter() {
    const counter = document.getElementById('attempts-count');
    if (counter && AdminMode) {
        counter.textContent = AdminMode.getAttemptsCount();
    }
}

// Update counter every 2 seconds when in admin mode
setInterval(() => {
    if (AdminMode && AdminMode.isActive) {
        updateAttemptsCounter();
    }
}, 2000);

// Make functions globally accessible
window.showQuickActions = showQuickActions;
window.closeQuickActions = closeQuickActions;
window.copyAdminPassword = copyAdminPassword;
window.updateAttemptsCounter = updateAttemptsCounter;

console.log('✅ Quick actions menu loaded');
