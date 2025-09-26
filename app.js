// Portfolio Web Application JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

function initializePortfolio() {
    // Initialize image upload functionality
    initImageUploads();
    
    // Initialize smooth scrolling for internal links
    initSmoothScrolling();
    
    // Add scroll animations
    initScrollAnimations();
    
    // Add interactive hover effects
    initInteractiveEffects();
    
    // Initialize contact form interactions
    initContactInteractions();
}

// Image Upload Functionality
function initImageUploads() {
    // Profile picture upload
    const profileUpload = document.getElementById('profileUpload');
    const profilePic = document.getElementById('profilePic');
    
    if (profileUpload && profilePic) {
        profileUpload.addEventListener('change', function(e) {
            handleImageUpload(e, profilePic, true);
        });
    }

    // Company logo uploads
    const logoUploads = [
        { upload: 'logo1Upload', image: 'logo1Image', placeholder: 'logo1Placeholder' },
        { upload: 'logo2Upload', image: 'logo2Image', placeholder: 'logo2Placeholder' },
        { upload: 'logo3Upload', image: 'logo3Image', placeholder: 'logo3Placeholder' }
    ];

    logoUploads.forEach(logo => {
        const uploadInput = document.getElementById(logo.upload);
        const imageElement = document.getElementById(logo.image);
        const placeholder = document.getElementById(logo.placeholder);
        
        if (uploadInput && imageElement && placeholder) {
            uploadInput.addEventListener('change', function(e) {
                handleLogoUpload(e, imageElement, placeholder);
            });
        }
    });
}

// Handle profile picture upload
function handleImageUpload(event, container, isProfile = false) {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file.');
        return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        if (isProfile) {
            container.style.backgroundImage = `url(${e.target.result})`;
            container.style.backgroundSize = 'cover';
            container.style.backgroundPosition = 'center';
            container.classList.add('has-image');
        }
        
        // Add success animation
        container.style.transform = 'scale(0.95)';
        setTimeout(() => {
            container.style.transform = 'scale(1)';
        }, 150);
    };
    
    reader.readAsDataURL(file);
}

// Handle company logo upload
function handleLogoUpload(event, imageElement, placeholder) {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file.');
        return;
    }

    // Validate file size (max 2MB for logos)
    if (file.size > 2 * 1024 * 1024) {
        alert('Logo file size must be less than 2MB.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        imageElement.src = e.target.result;
        imageElement.style.display = 'block';
        placeholder.style.display = 'none';
        imageElement.closest('.logo-upload').classList.add('has-logo');
        
        // Add success animation
        const logoContainer = imageElement.closest('.logo-upload');
        logoContainer.style.transform = 'scale(0.95)';
        setTimeout(() => {
            logoContainer.style.transform = 'scale(1)';
        }, 150);
    };
    
    reader.readAsDataURL(file);
}

// Smooth scrolling functionality
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe sections for scroll animations
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        // Set initial state for animation
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        observer.observe(section);
    });

    // Animate cards with staggered delay
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        
        observer.observe(card);
    });

    // Special animation for position items
    const positionItems = document.querySelectorAll('.position-item');
    positionItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        
        observer.observe(item);
    });

    // Animate achievement items
    const achievementItems = document.querySelectorAll('.achievement-item');
    achievementItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.9)';
        item.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
        
        observer.observe(item);
    });
}

// Interactive hover effects
function initInteractiveEffects() {
    // Skill tags interactive effects
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
            this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });

    // Certification tags interactive effects
    const certTags = document.querySelectorAll('.cert-tag');
    
    certTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
            this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });

    // Experience, education, and project items hover effects
    const items = document.querySelectorAll('.experience-item, .education-item, .project-item');
    
    items.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
            this.style.borderLeftWidth = '6px';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)';
            this.style.borderLeftWidth = '4px';
        });
    });

    // Position items hover effects
    const positionItems = document.querySelectorAll('.position-item');
    
    positionItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
            this.querySelector('.position-icon').style.transform = 'scale(1.2) rotate(10deg)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)';
            this.querySelector('.position-icon').style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Achievement items hover effects
    const achievementItems = document.querySelectorAll('.achievement-item');
    
    achievementItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
            this.querySelector('.achievement-icon').style.transform = 'scale(1.2) rotate(-5deg)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)';
            this.querySelector('.achievement-icon').style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Logo upload hover effects
    const logoUploads = document.querySelectorAll('.logo-upload');
    logoUploads.forEach(upload => {
        upload.addEventListener('mouseenter', function() {
            if (!this.classList.contains('has-logo')) {
                this.style.transform = 'scale(1.05)';
                this.style.borderStyle = 'solid';
            }
        });
        
        upload.addEventListener('mouseleave', function() {
            if (!this.classList.contains('has-logo')) {
                this.style.transform = 'scale(1)';
                this.style.borderStyle = 'dashed';
            }
        });
    });
}

// Contact interactions
function initContactInteractions() {
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Add a subtle animation when clicked
            this.style.transform = 'translateY(-2px) scale(0.98)';
            
            setTimeout(() => {
                this.style.transform = 'translateY(-2px) scale(1)';
            }, 150);
        });

        // Add ripple effect
        item.addEventListener('mousedown', function(e) {
            const rect = this.getBoundingClientRect();
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.4)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = (e.clientX - rect.left - 10) + 'px';
            ripple.style.top = (e.clientY - rect.top - 10) + 'px';
            ripple.style.width = ripple.style.height = '20px';
            ripple.style.pointerEvents = 'none';
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Utility functions
function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Progressive enhancement for modern browsers
if ('IntersectionObserver' in window) {
    // Enhanced scroll effects for modern browsers
    const enhancedObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Special effects for different elements
                if (entry.target.classList.contains('section-title')) {
                    entry.target.style.animation = 'slideInFromLeft 0.8s ease forwards';
                }
                
                if (entry.target.classList.contains('profile-section')) {
                    entry.target.style.animation = 'fadeInUp 1s ease forwards';
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Apply enhanced animations to key elements
    const keyElements = document.querySelectorAll('.profile-section, .section-title, .item-title');
    keyElements.forEach(element => {
        enhancedObserver.observe(element);
    });
}

// Handle window resize for responsive adjustments
window.addEventListener('resize', function() {
    // Recalculate any layout-dependent features
    const profilePic = document.querySelector('.profile-pic');
    if (profilePic && window.innerWidth < 480) {
        profilePic.style.width = '100px';
        profilePic.style.height = '100px';
    } else if (profilePic) {
        profilePic.style.width = '120px';
        profilePic.style.height = '120px';
    }
});

// Add CSS for enhanced animations and effects
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: slideInUp 0.6s ease forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideInFromLeft {
        from {
            opacity: 0;
            transform: translateX(-30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .skill-tag,
    .cert-tag {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .experience-item,
    .education-item,
    .project-item,
    .position-item,
    .achievement-item {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .position-icon,
    .achievement-icon {
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .logo-upload {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .profile-pic {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .contact-item {
        overflow: hidden;
    }
    
    /* Loading states */
    .loading {
        opacity: 0.7;
        pointer-events: none;
    }
    
    .loading::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 20px;
        height: 20px;
        margin: -10px 0 0 -10px;
        border: 2px solid transparent;
        border-top-color: var(--color-primary);
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
`;
document.head.appendChild(style);

// Export functions for potential external use
window.portfolioApp = {
    initializePortfolio,
    handleImageUpload,
    handleLogoUpload
};