// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const nav = document.querySelector('.main-nav');
    
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            
            // Toggle hamburger icon animation
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                nav.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            }
        });
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

// Slider functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
let slideInterval;

// Update slider content from localStorage
function updateSliderContent() {
    slides.forEach((slide, i) => {
        const textVal = localStorage.getItem('slide'+(i+1));
        const imgVal = localStorage.getItem('img'+(i+1));
        const textDiv = slide.querySelector('.slide-text');
        const imgDiv = slide.querySelector('.slide-img img');
        
        if (textVal && textDiv) {
            textDiv.textContent = textVal;
        }
        if (imgVal && imgDiv) {
            imgDiv.src = imgVal;
        }
    });
}

// Show specific slide
function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
}

// Go to next slide
function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Start slider
function startSlider() {
    slideInterval = setInterval(nextSlide, 4000);
}

// Stop slider
function stopSlider() {
    clearInterval(slideInterval);
}

// Initialize slider
function initSlider() {
    updateSliderContent();
    showSlide(currentSlide);
    startSlider();
    
    // Pause slider on hover
    const slider = document.querySelector('.slider');
    if (slider) {
        slider.addEventListener('mouseenter', stopSlider);
        slider.addEventListener('mouseleave', startSlider);
    }
}

// Hero Slider functionality
let currentHeroSlide = 0;
const heroSlides = document.querySelectorAll('.hero-slide');
const heroIndicators = document.querySelectorAll('.indicator');
let heroSlideInterval;

function showHeroSlide(index) {
    heroSlides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
    heroIndicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
    });
}

function nextHeroSlide() {
    currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
    showHeroSlide(currentHeroSlide);
}

function prevHeroSlide() {
    currentHeroSlide = (currentHeroSlide - 1 + heroSlides.length) % heroSlides.length;
    showHeroSlide(currentHeroSlide);
}

function startHeroSlider() {
    heroSlideInterval = setInterval(nextHeroSlide, 5000);
}

function stopHeroSlider() {
    clearInterval(heroSlideInterval);
}

function initHeroSlider() {
    if (heroSlides.length > 0) {
        showHeroSlide(currentHeroSlide);
        startHeroSlider();
        
        // Event listeners for navigation buttons
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        if (prevBtn) prevBtn.addEventListener('click', () => {
            stopHeroSlider();
            prevHeroSlide();
            startHeroSlider();
        });
        
        if (nextBtn) nextBtn.addEventListener('click', () => {
            stopHeroSlider();
            nextHeroSlide();
            startHeroSlider();
        });
        
        // Event listeners for indicators
        heroIndicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                stopHeroSlider();
                currentHeroSlide = index;
                showHeroSlide(currentHeroSlide);
                startHeroSlider();
            });
        });
        
        // Pause slider on hover
        const heroSlider = document.getElementById('hero-slider');
        if (heroSlider) {
            heroSlider.addEventListener('mouseenter', stopHeroSlider);
            heroSlider.addEventListener('mouseleave', startHeroSlider);
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initSlider();
    initHeroSlider();
    
    // Ensure all images are visible by default
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.style.opacity = '1';
        img.style.transition = 'opacity 0.3s ease';
        
        // Add error handling for failed image loads
        img.addEventListener('error', function() {
            console.warn('Image failed to load:', this.src);
            // Keep the image visible even if it fails to load
            this.style.opacity = '1';
        });
    });
});

// Add scroll effect to header
window.addEventListener('scroll', function() {
    const header = document.querySelector('.main-header');
    if (window.scrollY > 100) {
        header.style.background = 'linear-gradient(135deg, rgba(139, 0, 0, 0.95) 0%, rgba(160, 0, 0, 0.95) 100%)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'linear-gradient(135deg, #8B0000 0%, #A00000 100%)';
        header.style.backdropFilter = 'blur(10px)';
    }
});