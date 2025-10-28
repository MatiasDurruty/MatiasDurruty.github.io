// ============================================
// Language Switching System
// ============================================
let currentLang = localStorage.getItem('language') || 'fr';

// Set initial language
document.addEventListener('DOMContentLoaded', () => {
    setLanguage(currentLang);
});

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);

    // Update HTML lang attribute
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('data-lang', lang);

    // Update meta tags
    const metaTitle = document.querySelector('title');
    const metaDescription = document.querySelector('meta[name="description"]');

    if (metaTitle && translations[lang]?.meta?.title) {
        metaTitle.textContent = translations[lang].meta.title;
    }

    if (metaDescription && translations[lang]?.meta?.description) {
        metaDescription.setAttribute('content', translations[lang].meta.description);
    }

    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = getTranslation(lang, key);

        if (translation) {
            element.textContent = translation;
        }
    });

    // Update all elements with data-i18n-html attribute (for HTML content with formatting)
    document.querySelectorAll('[data-i18n-html]').forEach(element => {
        const key = element.getAttribute('data-i18n-html');
        const translation = getTranslation(lang, key);

        if (translation) {
            element.innerHTML = translation;
        }
    });

    // Update language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
}

function getTranslation(lang, key) {
    const keys = key.split('.');
    let value = translations[lang];

    for (const k of keys) {
        if (value && value[k] !== undefined) {
            value = value[k];
        } else {
            console.warn(`Translation not found: ${lang}.${key}`);
            return null;
        }
    }

    return value;
}

// Language button click handlers
document.querySelectorAll('.lang-btn').forEach(button => {
    button.addEventListener('click', () => {
        const lang = button.getAttribute('data-lang');
        setLanguage(lang);

        // Close mobile menu if open
        if (navLinks && navLinks.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// ============================================
// Mobile Menu Toggle
// ============================================
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');

// Toggle mobile menu
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking a link
navItems.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar') && navLinks.classList.contains('active')) {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ============================================
// Navbar Scroll Effect
// ============================================
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow on scroll
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
    }

    lastScroll = currentScroll;
});

// ============================================
// Active Section Highlighting
// ============================================
const sections = document.querySelectorAll('section[id]');

function highlightActiveSection() {
    const scrollPosition = window.pageYOffset + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const correspondingLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navItems.forEach(link => link.classList.remove('active'));
            if (correspondingLink) {
                correspondingLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightActiveSection);

// ============================================
// Scroll Animations
// ============================================
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
const animateOnScroll = document.querySelectorAll(
    '.about-content, .highlight-card, .prestation-card, .service-item, .portfolio-card, .contact-card, .tarif-main, .tarif-custom'
);

animateOnScroll.forEach(element => {
    observer.observe(element);
});

// ============================================
// Smooth Scroll Enhancement
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');

        if (targetId === '#' || !targetId) return;

        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = targetElement.offsetTop - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// Scroll Indicator Click
// ============================================
const scrollIndicator = document.querySelector('.scroll-indicator');

if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const aboutSection = document.querySelector('#a-propos');
        if (aboutSection) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = aboutSection.offsetTop - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
}

// ============================================
// Portfolio Card Animations
// ============================================
const portfolioCards = document.querySelectorAll('.portfolio-card');

portfolioCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
});

// ============================================
// Prestation Cards Stagger Animation
// ============================================
const prestationCards = document.querySelectorAll('.prestation-card');

prestationCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// ============================================
// Contact Links Enhancement
// ============================================
const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
const emailLinks = document.querySelectorAll('a[href^="mailto:"]');

// Add analytics or tracking here if needed
phoneLinks.forEach(link => {
    link.addEventListener('click', () => {
        console.log('Phone link clicked');
        // You can add analytics tracking here
    });
});

emailLinks.forEach(link => {
    link.addEventListener('click', () => {
        console.log('Email link clicked');
        // You can add analytics tracking here
    });
});

// ============================================
// Performance Optimization: Debounce Scroll
// ============================================
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll-heavy functions
const debouncedHighlight = debounce(highlightActiveSection, 50);
window.removeEventListener('scroll', highlightActiveSection);
window.addEventListener('scroll', debouncedHighlight);

// ============================================
// Image Placeholder Enhancement
// ============================================
const imagePlaceholders = document.querySelectorAll('.image-placeholder');

imagePlaceholders.forEach(placeholder => {
    placeholder.addEventListener('click', () => {
        // This could be used to open a modal or file picker in the future
        console.log('Image placeholder clicked - ready for image upload');
    });
});

// ============================================
// Accessibility Enhancements
// ============================================

// Skip to main content (accessibility)
document.addEventListener('keydown', (e) => {
    // Alt + H to go to home
    if (e.altKey && e.key === 'h') {
        e.preventDefault();
        document.querySelector('#accueil').scrollIntoView({ behavior: 'smooth' });
    }

    // Alt + C to go to contact
    if (e.altKey && e.key === 'c') {
        e.preventDefault();
        document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
    }

    // ESC to close mobile menu
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ============================================
// Dynamic Year in Footer (if needed)
// ============================================
const currentYear = new Date().getFullYear();
const yearElements = document.querySelectorAll('.current-year');
yearElements.forEach(element => {
    element.textContent = currentYear;
});

// ============================================
// Page Load Animation
// ============================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Trigger initial highlight
    highlightActiveSection();

    // Add fade-in to hero elements with stagger
    const heroElements = document.querySelectorAll('.hero-text > *');
    heroElements.forEach((element, index) => {
        element.style.animation = `fadeInUp 0.8s ease ${index * 0.1}s both`;
    });
});

// ============================================
// Parallax Effect on Hero (Optional)
// ============================================
const hero = document.querySelector('.hero');

if (hero && window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;

        if (scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            hero.style.opacity = 1 - scrolled / 800;
        }
    });
}

// ============================================
// Lazy Loading Optimization
// ============================================
if ('IntersectionObserver' in window) {
    const lazyElements = document.querySelectorAll('.lazy-load');

    const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
                lazyObserver.unobserve(entry.target);
            }
        });
    });

    lazyElements.forEach(element => {
        lazyObserver.observe(element);
    });
}

// ============================================
// Console Welcome Message
// ============================================
console.log('%c🎸 Site Web Matias Durruty', 'color: #C62828; font-size: 20px; font-weight: bold;');
console.log('%cMusicien professionnel à Biarritz', 'color: #666; font-size: 14px;');
console.log('%cPour me contacter: +33 6 52 06 73 80', 'color: #666; font-size: 12px;');
