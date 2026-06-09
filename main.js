document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. HERO SECTION: PAUSE ON HOVER
    // ==========================================
 



const heroSection = document.querySelector('.hero');

    if (heroSection) {
        // Pause on Hover Logic interacts flawlessly with the updated loop
        heroSection.addEventListener('mouseenter', () => {
            heroSection.classList.add('is-paused');
        });

        heroSection.addEventListener('mouseleave', () => {
            heroSection.classList.remove('is-paused');
        });
    }

    // Form Submission
    const form = document.querySelector('.enquiry-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your enquiry!');
            form.reset();
        });
    }



    // ==========================================
    // 2. HERO DUAL-AXIS SLIDER EFFECT
    // ==========================================
    let currentSlide = 0;
    
    function rotateImages() {
        if (!heroSection || heroSection.classList.contains('is-paused')) return;
        
        images.forEach(img => {
            img.style.transform = `scale(${1 + Math.random() * 0.1})`;
        });
    }

    setInterval(rotateImages, 3000);

    // ==========================================
    // 3. FORM SUBMISSION HANDLER
    // ==========================================
    const form = document.querySelector('.enquiry-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your enquiry!');
            form.reset();
        });
    }

    // ==========================================
    // 4. CHOOSE SCHOOL CARDS: MOBILE SCROLL TRACKER
    // ==========================================
    const track = document.getElementById('selection-slider');
    const dots = document.querySelectorAll('.selection__dot');

    if (track && dots.length > 0) {
        track.addEventListener('scroll', () => {
            const width = track.getBoundingClientRect().width;
            const scrollLeft = track.scrollLeft;
            
            const activeIndex = Math.round(scrollLeft / width);

            dots.forEach((dot, index) => {
                if (index === activeIndex) {
                    dot.classList.add('selection__dot--active');
                } else {
                    dot.classList.remove('selection__dot--active');
                }
            });
        }, { passive: true });
    }

    // ==========================================
    // 5. REGISTER BUTTON: SMOOTH SCROLL (MOVED INSIDE)
    // ==========================================
    const registerBtn = document.getElementById('register-btn');

    if (registerBtn) {
        registerBtn.addEventListener('click', (e) => {
            const targetId = registerBtn.getAttribute('href');
            
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const navElement = document.querySelector('.header-nav');
                    const navHeight = navElement ? navElement.offsetHeight : 0;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    
                    window.scrollTo({
                        top: targetPosition - navHeight - 20, // Clean breathing space gap offset
                        behavior: 'smooth'
                    });
                }
            }
        });
    }
});