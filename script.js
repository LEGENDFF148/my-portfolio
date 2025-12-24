const typingText = document.querySelector('.typing-text');
const cursor = document.querySelector('.cursor');
if (typingText) {
    const roles = ['Script Writer', 'Web Developer', 'UI/UX Designer', 'Content Creator', 'Digital Artist'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;

    function typeWriter() {
        if (isPaused) {
            setTimeout(typeWriter, 100);
            return;
        }
        
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 80 : 120;
        
        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2500;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 800;
        }
        
        setTimeout(typeWriter, typeSpeed);
    }

    typingText.addEventListener('mouseenter', () => {
        isPaused = true;
    });

    typingText.addEventListener('mouseleave', () => {
        isPaused = false;
    });

    setTimeout(typeWriter, 1500);
}

// Smooth scrolling for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href') || '';
        if (href.startsWith('#')) {
            e.preventDefault();
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            const targetSection = document.querySelector(href);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Hire me button functionality
const hireButtons = document.querySelectorAll('.hire-btn');
hireButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
        // If it's the "View Portfolio" button (secondary), redirect to index or projects
        if (this.classList.contains('secondary') && this.textContent.includes('Portfolio')) {
            window.location.href = 'index.html';
            return;
        }
        
        // Default: Redirect to WhatsApp
        window.open('https://wa.me/918957627253', '_blank');
    });
});

// Update time display
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
    const timeEl = document.querySelector('.time-display');
    if (timeEl) {
        timeEl.textContent = timeString;
    }
}

// Update time every minute
updateTime();
setInterval(updateTime, 60000);

// Add scroll effect to header
let isHeaderScrolled = false;
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 100) {
            if (!isHeaderScrolled) {
                header.style.background = 'rgba(0, 0, 0, 0.9)';
                header.style.backdropFilter = 'blur(10px)';
                isHeaderScrolled = true;
            }
        } else {
            if (isHeaderScrolled) {
                header.style.background = 'transparent';
                header.style.backdropFilter = 'none';
                isHeaderScrolled = false;
            }
        }
    }
});

// Add hover effects to social links
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.1)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Enhanced loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transform = 'scale(0.95)';
    document.body.style.transition = 'opacity 0.8s ease-in-out, transform 0.8s ease-in-out';
    
    // Staggered animation for elements
    const elements = document.querySelectorAll('.header, .profile-section, .content-section');
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.style.transform = 'scale(1)';
        
        elements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }, 200);
});

// Enhanced parallax effect
let targetScroll = 0;
let currentScroll = 0;

window.addEventListener('scroll', () => {
    targetScroll = window.pageYOffset;
});

function updateParallax() {
    // Linear interpolation for smooth movement (0.1 factor for smoothness)
    currentScroll += (targetScroll - currentScroll) * 0.1;
    
    const background = document.querySelector('.background-texture');
    const profileSection = document.querySelector('.profile-section');
    const contentSection = document.querySelector('.content-section');
    
    // Apply transforms with translate3d for hardware acceleration
    if (background) {
        background.style.transform = `translate3d(0, ${currentScroll * -0.15}px, 0)`;
    }
    
    if (profileSection) {
        profileSection.style.transform = `translate3d(0, ${currentScroll * 0.05}px, 0)`;
    }
    
    if (contentSection) {
        contentSection.style.transform = `translate3d(0, ${currentScroll * -0.02}px, 0)`;
    }
    
    requestAnimationFrame(updateParallax);
}

updateParallax();

// Enhanced intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1)';
            
            // Add special effects for different elements
            if (entry.target.classList.contains('profile-image')) {
                entry.target.style.animation = 'float 6s ease-in-out infinite';
            }
            if (entry.target.classList.contains('social-link')) {
                entry.target.style.animation = 'socialPulse 2s ease-in-out infinite';
            }
        }
    });
}, observerOptions);

// Add CSS for social pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes socialPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
`;
document.head.appendChild(style);

// Observe elements for animation
document.querySelectorAll('.profile-section, .content-section, .social-link').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px) scale(0.95)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
});

/* --- ADVANCED ANIMATIONS & EFFECTS --- */

// 1. Custom Cursor Logic
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

if (cursorDot && cursorOutline && !isMobile()) {
    document.body.style.cursor = 'none';
    
    let cursorX = 0, cursorY = 0;
    let outlineX = 0, outlineY = 0;
    
    window.addEventListener('mousemove', function(e) {
        cursorX = e.clientX;
        cursorY = e.clientY;
    });

    function animateCursor() {
        cursorDot.style.left = `${cursorX}px`;
        cursorDot.style.top = `${cursorY}px`;
        
        outlineX += (cursorX - outlineX) * 0.15;
        outlineY += (cursorY - outlineY) * 0.15;
        cursorOutline.style.left = `${outlineX}px`;
        cursorOutline.style.top = `${outlineY}px`;
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    const interactiveElements = document.querySelectorAll('a, button, .service-card, .skill-card, .timeline-item, input, textarea');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.style.width = '60px';
            cursorOutline.style.height = '60px';
            cursorOutline.style.backgroundColor = 'rgba(255, 51, 51, 0.1)';
            cursorOutline.style.borderColor = 'transparent';
        });
        
        el.addEventListener('mouseleave', () => {
            cursorOutline.style.width = '40px';
            cursorOutline.style.height = '40px';
            cursorOutline.style.backgroundColor = 'transparent';
            cursorOutline.style.borderColor = 'rgba(255, 51, 51, 0.5)';
        });
    });
}

const canvas = document.getElementById('particle-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let animationFrameId;
    let currentEffect = 'particles';
    let particlesArray = [];
    
    let mouse = {
        x: null,
        y: null,
        radius: 150
    }

    window.addEventListener('mousemove', function(e) {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.color = color;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = '#ff3333';
            ctx.fill();
        }
        update() {
            if (this.x > canvas.width || this.x < 0) {
                this.directionX = -this.directionX;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.directionY = -this.directionY;
            }
            
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx*dx + dy*dy);
            if (distance < mouse.radius + this.size) {
                if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                    this.x += 3;
                }
                if (mouse.x > this.x && this.x > this.size * 10) {
                    this.x -= 3;
                }
                if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                    this.y += 3;
                }
                if (mouse.y > this.y && this.y > this.size * 10) {
                    this.y -= 3;
                }
            }
            
            this.x += this.directionX;
            this.y += this.directionY;
            this.draw();
        }
    }

    function initParticles() {
        particlesArray = [];
        let numberOfParticles = (canvas.height * canvas.width) / 25000; // Reduced density for performance
        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 2) + 1;
            let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
            let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
            let directionX = (Math.random() * 2) - 1;
            let directionY = (Math.random() * 2) - 1;
            let color = '#ff3333';
            particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }

    function animateParticles() {
        animationFrameId = requestAnimationFrame(animateParticles);
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
        connectParticles();
    }

    function connectParticles() {
        let opacityValue = 1;
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                // Optimization: Check simple distance first to avoid expensive math
                if (Math.abs(particlesArray[a].x - particlesArray[b].x) > canvas.width/7) continue;
                if (Math.abs(particlesArray[a].y - particlesArray[b].y) > canvas.height/7) continue;

                let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
                + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                if (distance < (canvas.width/7) * (canvas.height/7)) {
                    opacityValue = 1 - (distance/20000);
                    ctx.strokeStyle = 'rgba(255, 51, 51,' + opacityValue + ')';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
    const fontSize = 14;
    let columns;
    let drops = [];

    function initMatrix() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        columns = Math.floor(canvas.width / fontSize);
        drops = [];
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.random() * -100;
        }
    }

    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#ff3333';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = characters.charAt(Math.floor(Math.random() * characters.length));
            
            if (Math.random() > 0.95) {
                ctx.fillStyle = '#ff6b6b';
            } else {
                ctx.fillStyle = '#ff3333';
            }
            
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            drops[i]++;
        }
        animationFrameId = requestAnimationFrame(drawMatrix);
    }

    function startBackground() {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        if (currentEffect === 'particles') {
            initParticles();
            animateParticles();
        } else {
            initMatrix();
            drawMatrix();
        }
    }

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            startBackground();
        }, 200);
    });

    startBackground();

    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'bg-toggle-btn';
    toggleBtn.innerHTML = '<i class="fas fa-network-wired"></i>';
    toggleBtn.title = 'Toggle Background Effect';
    document.body.appendChild(toggleBtn);

    toggleBtn.addEventListener('click', () => {
        currentEffect = currentEffect === 'particles' ? 'matrix' : 'particles';
        toggleBtn.innerHTML = currentEffect === 'particles' ? 
            '<i class="fas fa-network-wired"></i>' : 
            '<i class="fas fa-code"></i>';
        startBackground();
    });
}

// Mobile Menu Functionality
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
if (mobileMenuToggle && nav) {
    mobileMenuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : 'auto';
    });
}

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        const href = this.getAttribute('href');
        // Only close menu for internal anchor links, let page navigation handle the rest
        if (href && href.startsWith('#') && mobileMenuToggle && nav) {
            mobileMenuToggle.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    if (nav && mobileMenuToggle) {
        if (!nav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            mobileMenuToggle.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
});

// Touch and swipe gestures for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = touchEndX - touchStartX;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
        if (nav && mobileMenuToggle && swipeDistance > 0 && nav.classList.contains('active')) {
            // Swipe right to close menu
            mobileMenuToggle.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = 'auto';
        } else if (nav && mobileMenuToggle && swipeDistance < 0 && !nav.classList.contains('active')) {
            // Swipe left to open menu (optional)
            mobileMenuToggle.classList.add('active');
            nav.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
}

// Optimize animations for mobile devices
function isMobile() {
    return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Reduce animations on mobile for better performance
if (isMobile()) {
    // Reduce animation complexity
    document.documentElement.style.setProperty('--animation-duration', '0.3s');
    
    // Optimize hover effects for touch devices
    const style = document.createElement('style');
    style.textContent = `
        @media (hover: none) and (pointer: coarse) {
            .profile-image:hover {
                transform: none;
            }
            
            .social-link:hover {
                transform: none;
            }
            
            .hire-btn:hover {
                transform: none;
            }
        }
    `;
    document.head.appendChild(style);
}

// Viewport height fix for mobile browsers
function setViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', setViewportHeight);
setViewportHeight();

// Prevent zoom on double tap for mobile
let lastTouchEnd = 0;
document.addEventListener('touchend', function(event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Add loading indicator for mobile
if (isMobile()) {
    const loadingIndicator = document.createElement('div');
    loadingIndicator.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background: linear-gradient(90deg, #ff3333, #ff6b6b, #ff3333);
        z-index: 9999;
        animation: loadingBar 2s ease-in-out;
    `;
    
    const loadingStyle = document.createElement('style');
    loadingStyle.textContent = `
        @keyframes loadingBar {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
    `;
    document.head.appendChild(loadingStyle);
    
    document.body.appendChild(loadingIndicator);
    
    setTimeout(() => {
        loadingIndicator.remove();
    }, 2000);
}

// Services Page Specific Functionality
if (document.querySelector('.services-page')) {
    // Animate service cards on scroll
    const serviceCards = document.querySelectorAll('.service-card');
    const processSteps = document.querySelectorAll('.process-step');
    
    const serviceObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Initialize service cards animation
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        serviceObserver.observe(card);
    });
    
    // Initialize process steps animation
    processSteps.forEach((step, index) => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(30px)';
        step.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        serviceObserver.observe(step);
    });
    
    // Add hover effects to service cards
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add scroll-triggered animations for page elements
    const pageHeader = document.querySelector('.page-header');
    const ctaSection = document.querySelector('.cta-section');
    
    if (pageHeader) {
        pageHeader.style.opacity = '0';
        pageHeader.style.transform = 'translateY(30px)';
        pageHeader.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            pageHeader.style.opacity = '1';
            pageHeader.style.transform = 'translateY(0)';
        }, 200);
    }
    
    if (ctaSection) {
        const ctaObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        ctaSection.style.opacity = '0';
        ctaSection.style.transform = 'translateY(30px)';
        ctaSection.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        ctaObserver.observe(ctaSection);
    }
    
    // Add typing effect to page title
    const pageTitle = document.querySelector('.page-title');
    if (pageTitle) {
        const originalText = pageTitle.textContent;
        pageTitle.textContent = '';
        
        let charIndex = 0;
        const typeSpeed = 100;
        
        function typeTitle() {
            if (charIndex < originalText.length) {
                pageTitle.textContent += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeTitle, typeSpeed);
            }
        }
        
        setTimeout(typeTitle, 500);
    }
}

// Enhanced Hover Animations for All Elements
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to all interactive elements
    const interactiveElements = document.querySelectorAll('.skill-card, .timeline-item, .hire-btn, .social-link, .nav-link, .profile-image, .section-title, .name-highlight, .typing-text, .about p, .logo h1, .time-display');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });
    
    // Enhanced skill bar animations
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetWidth = entry.target.getAttribute('data-width');
                entry.target.style.width = targetWidth;
                entry.target.style.transition = 'width 1.5s ease-out';
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        bar.style.width = '0%';
        skillObserver.observe(bar);
    });
    
    // Enhanced timeline animations
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 200);
            }
        });
    }, { threshold: 0.1 });
    
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        timelineObserver.observe(item);
    });
    
    // Enhanced card animations
    const cards = document.querySelectorAll('.skill-card');
    const cardObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        cardObserver.observe(card);
    });
    
    // Enhanced ripple effect for buttons
    const buttons = document.querySelectorAll('.hire-btn, .learn-more-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
                z-index: 1;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation CSS
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
    
    // Enhanced scroll-triggered animations
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Add section animation CSS
    const sectionStyle = document.createElement('style');
    sectionStyle.textContent = `
        section {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        section.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(sectionStyle);
});

// 3. 3D Tilt Effect for Cards
const tiltCards = document.querySelectorAll('.service-card, .skill-card, .profile-image-container');

if (!isMobile()) {
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -10; // Max rotation deg
            const rotateY = ((x - centerX) / centerX) * 10;
            
            this.style.transition = 'transform 0.1s ease';
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });

        card.addEventListener('mouseleave', function() {
            this.style.transition = 'transform 0.5s ease';
            this.style.transform = ''; // Clear inline style to let CSS/Animations take over
        });
    });
}

window.addEventListener('scroll', () => {
    const scrollProgress = document.querySelector('.scroll-progress');
    if (scrollProgress) {
        const totalHeight = document.body.scrollHeight - window.innerHeight;
        const progress = (window.pageYOffset / totalHeight) * 100;
        scrollProgress.style.width = `${progress}%`;
    }
});

const nameHighlight = document.querySelector('.name-highlight');
if (nameHighlight) {
    nameHighlight.classList.add('glitch');
    nameHighlight.setAttribute('data-text', nameHighlight.textContent);
}

// Add Scroll to Top Button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
