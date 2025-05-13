// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.innerHTML = navLinks.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Portfolio filtering
const portfolioFilterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

portfolioFilterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        portfolioFilterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Testimonial slider
const track = document.querySelector('.testimonial-track');
const dots = document.querySelectorAll('.slider-dot');
let currentSlide = 0;

function goToSlide(index) {
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
    currentSlide = index;
}

dots.forEach(dot => {
    dot.addEventListener('click', () => {
        const slideIndex = parseInt(dot.getAttribute('data-index'));
        goToSlide(slideIndex);
    });
});

// Auto-rotate testimonials
setInterval(() => {
    currentSlide = (currentSlide + 1) % dots.length;
    goToSlide(currentSlide);
}, 5000);

// Animate skill bars on scroll
const skillBars = document.querySelectorAll('.skill-progress');

function animateSkillBars() {
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        if (isElementInViewport(bar) && !bar.style.width) {
            bar.style.width = width + '%';
        }
    });
}

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

window.addEventListener('scroll', animateSkillBars);
window.addEventListener('load', animateSkillBars);

// Animate stats counter
const statNumbers = document.querySelectorAll('.stat-number');
let statsAnimated = false;

function animateStats() {
    if (!statsAnimated && isElementInViewport(document.querySelector('.stats'))) {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const counter = setInterval(() => {
                current += step;
                if (current >= target) {
                    clearInterval(counter);
                    stat.textContent = target;
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, 16);
        });
        
        statsAnimated = true;
    }
}

window.addEventListener('scroll', animateStats);
window.addEventListener('load', animateStats);

// Back to top button
const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Contact form submission
const contactForm = document.getElementById('contactForm');
const loading = document.querySelector('.loading');
const successMessage = document.querySelector('.success-message');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Show loading spinner
    loading.style.display = 'block';
    
    // Simulate form submission (replace with actual AJAX call)
    setTimeout(() => {
        loading.style.display = 'none';
        successMessage.style.display = 'block';
        contactForm.reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
    }, 1500);
});

// Lightbox configuration
lightbox.option({
    'resizeDuration': 300, // Slightly longer duration for smoother transitions
    'wrapAround': true, // Enable looping through images
    'showImageNumberLabel': true, // Show image numbers for better navigation
    'fadeDuration': 200, // Add fade effect for transitions
    'imageFadeDuration': 200, // Smooth fade effect for images
    'disableScrolling': true // Prevent background scrolling when lightbox is open
});

// Initialize animations when page loads
window.addEventListener('load', () => {
    // Animate hero elements
    document.querySelector('.hero h1').style.animation = 'fadeInDown 1s ease';
    document.querySelector('.hero p').style.animation = 'fadeInUp 1s ease 0.3s forwards';
    document.querySelector('.hero-btns').style.animation = 'fadeInUp 1s ease 0.6s forwards';
});

// Dark mode toggle
const darkModeToggle = document.querySelector('.dark-mode-toggle');
const body = document.body;

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    darkModeToggle.innerHTML = body.classList.contains('dark-mode') ? 
        '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
});

// Preserve dark mode state on reload
window.addEventListener('load', () => {
    if (localStorage.getItem('darkMode') === 'true') {
        body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
});

// Lazy load images
const lazyImages = document.querySelectorAll('img[data-src]');

function lazyLoad() {
    lazyImages.forEach(img => {
        if (isElementInViewport(img) && !img.src) {
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');
        }
    });
}

window.addEventListener('scroll', lazyLoad);
window.addEventListener('load', lazyLoad);

// Floating action button for quick navigation
const fab = document.querySelector('.fab');
const fabMenu = document.querySelector('.fab-menu');

fab.addEventListener('click', () => {
    fabMenu.classList.toggle('active');
});

// Typing effect for hero section
const typingText = document.querySelector('.typing-text');
const phrases = ['Web Developer', 'Designer', 'Freelancer'];
let phraseIndex = 0;
let charIndex = 0;

function typeEffect() {
    if (charIndex < phrases[phraseIndex].length) {
        typingText.textContent += phrases[phraseIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeEffect, 100);
    } else {
        setTimeout(eraseEffect, 2000);
    }
}

function eraseEffect() {
    if (charIndex > 0) {
        typingText.textContent = phrases[phraseIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(eraseEffect, 50);
    } else {
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(typeEffect, 500);
    }
}

window.addEventListener('load', typeEffect);

// Scroll progress bar
const progressBar = document.querySelector('.scroll-progress');

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = `${scrollPercent}%`;
});

// Initialize WOW.js for animations
new WOW().init();

// Initialize AOS (Animate On Scroll) library
AOS.init({
    duration: 800, // Animation duration
    easing: 'ease-in-out', // Easing function
    once: true, // Whether animation should happen only once
    mirror: false // Whether elements should animate out while scrolling past them
});

// Initialize Swiper for testimonials slider
const swiper = new Swiper('.swiper-container', {
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
});
// Initialize Isotope for portfolio filtering
const iso = new Isotope('.portfolio-grid', {
    itemSelector: '.portfolio-item',
    layoutMode: 'fitRows',
});

// Filter items on button click
const isotopeFilterButtons = document.querySelectorAll('.filter-btn');
isotopeFilterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filterValue = button.getAttribute('data-filter');
        iso.arrange({ filter: filterValue });
    });
});

// Add active class to the clicked button
isotopeFilterButtons.forEach(button => {
    button.addEventListener('click', () => {
        isotopeFilterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});

// Initialize Magnific Popup for portfolio images
$('.portfolio-item').magnificPopup({
    type: 'image',
    gallery: {
        enabled: true,
    },
    zoom: {
        enabled: true,
        duration: 300,
        opener: function(element) {
            return element.find('img');
        }
    }
});
// Initialize Lightbox for portfolio images
lightbox.option({
    'resizeDuration': 300,
    'wrapAround': true,
    'showImageNumberLabel': true,
    'fadeDuration': 200,
    'imageFadeDuration': 200,
    'disableScrolling': true
});
// Initialize Typed.js for typing effect
const options = {
    strings: ['Web Developer', 'Designer', 'Freelancer'],
    typeSpeed: 100,
    backSpeed: 50,
    loop: true,
    showCursor: false,
};
const typed = new Typed('.typing-text', options);





document.getElementById('contactForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
    };

    const response = await fetch('https://script.google.com/macros/s/AKfycbzN6xvQvu1eyaX2Pb6xZZSy3MQFeVNhH32yBMOLhyBNGq92FVgjG6x5Aesnyg9UWQlzVQ/exec', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' },
    });

    const result = await response.json();
    if (result.status === 'success') {
        alert('Message sent successfully!');
    } else {
        alert('Failed to send message.');
    }
});