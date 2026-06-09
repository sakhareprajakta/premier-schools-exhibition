document.addEventListener('DOMContentLoaded', () => {
    
    const heroSection = document.querySelector('.hero');

    if (heroSection) {
        heroSection.addEventListener('mouseenter', () => {
            heroSection.classList.add('is-paused');
        });

        heroSection.addEventListener('mouseleave', () => {
            heroSection.classList.remove('is-paused');
        });
    }

    // Form Submission (Kept only once to avoid duplicate variable crashes)
    const form = document.querySelector('.enquiry-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your enquiry!');
            form.reset();
        });
    }

    // Hero Image Rotator
    function rotateImages() {
        if (!heroSection || heroSection.classList.contains('is-paused')) return;
        
        // Dynamic safety fallback loop for hero visual components
        const images = document.querySelectorAll('.hero__img');
        if (images.length > 0) {
            images.forEach(img => {
                img.style.transform = `scale(${1 + Math.random() * 0.1})`;
            });
        }
    }
    setInterval(rotateImages, 3000);

    // Selection Slider (Dot Navigation tracking system)
    const selectionTrack = document.getElementById('selection-slider');
    const dots = document.querySelectorAll('.selection__dot');

    if (selectionTrack && dots.length > 0) {
        selectionTrack.addEventListener('scroll', () => {
            const width = selectionTrack.getBoundingClientRect().width;
            const scrollLeft = selectionTrack.scrollLeft;
            const activeIndex = Math.round(scrollLeft / width);

            dots.forEach((dot, index) => {
                if (index === activeIndex) {
                    dot.classList.add('selection__dot--active');
                } else {
                    dot.classList.remove('selection__dot--active');
                }
            });
        });
    }

    // Exhibition Slider (Arrow Button System with no variable collisions)
    const exhibitionTrack = document.getElementById("exhibition-track");
    const cards = document.querySelectorAll(".exhibition-card");
    const prevBtn = document.getElementById("exh-prev");
    const nextBtn = document.getElementById("exh-next");

    if (!exhibitionTrack || cards.length === 0 || !prevBtn || !nextBtn) return;

    let currentIndex = 0;

    function getVisibleCardsCount() {
        if (window.innerWidth <= 480) return 1;
        if (window.innerWidth <= 768) return 2;
        if (window.innerWidth <= 1200) return 3;
        return 4;
    }

    function updateSlider() {
        const visibleCards = getVisibleCardsCount();
        const maxIndex = cards.length - visibleCards;

        if (currentIndex > maxIndex) currentIndex = maxIndex;
        if (currentIndex < 0) currentIndex = 0;

        const cardWidth = cards[0].offsetWidth;
        const trackGap = parseInt(window.getComputedStyle(exhibitionTrack).gap) || 0;
        
        const amountToMove = currentIndex * (cardWidth + trackGap);
        exhibitionTrack.style.transform = `translateX(-${amountToMove}px)`;
    }

    nextBtn.addEventListener("click", () => {
        const visibleCards = getVisibleCardsCount();
        if (currentIndex < cards.length - visibleCards) {
            currentIndex++;
        } else {
            currentIndex = 0; 
        }
        updateSlider();
    });

    prevBtn.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            const visibleCards = getVisibleCardsCount();
            currentIndex = cards.length - visibleCards; 
        }
        updateSlider();
    });

    window.addEventListener("resize", updateSlider);
    updateSlider();





    const selectionGrid = document.querySelector('.selection__grid');
    const selectionDots = document.querySelectorAll('.selection__dot');
    let autoSlideInterval = null;
    let userInteracting = false;
    let interactionTimeout = null;

    if (selectionGrid && selectionDots.length > 0) {
        
        // 1. Sync dots with the active card position when scrolling manually
        selectionGrid.addEventListener('scroll', () => {
            const width = selectionGrid.getBoundingClientRect().width;
            const scrollLeft = selectionGrid.scrollLeft;
            const activeIndex = Math.round(scrollLeft / width);

            selectionDots.forEach((dot, index) => {
                if (index === activeIndex) {
                    dot.classList.add('selection__dot--active');
                } else {
                    dot.classList.remove('selection__dot--active');
                }
            });
        }, { passive: true });

        // 2. Core Auto-Scroll Engine (Only moves if dots are visible / mobile active)
        function startAutoSlide() {
            // Stop any existing interval to prevent overlapping timers
            if (autoSlideInterval) clearInterval(autoSlideInterval);

            autoSlideInterval = setInterval(() => {
                // Read the display property of dots container from CSS
                const dotsContainer = document.querySelector('.selection__dots');
                const isMobile = window.getComputedStyle(dotsContainer).display !== 'none';

                // Only scroll if on mobile and user is not actively swiping
                if (isMobile && !userInteracting) {
                    const cards = selectionGrid.querySelectorAll('.school-card');
                    if (cards.length === 0) return;

                    const cardWidth = cards[0].getBoundingClientRect().width;
                    // Grab layout gaps directly from computed CSS mechanics
                    const gridGap = parseFloat(window.getComputedStyle(selectionGrid).gap) || 20; 
                    
                    const scrollWidth = cardWidth + gridGap;
                    const maxScroll = selectionGrid.scrollWidth - selectionGrid.clientWidth;

                    // If we reach the end of the cards, loop smoothly back to zero
                    if (selectionGrid.scrollLeft >= maxScroll - 10) {
                        selectionGrid.scrollTo({ left: 0, behavior: 'smooth' });
                    } else {
                        selectionGrid.scrollBy({ left: scrollWidth, behavior: 'smooth' });
                    }
                }
            }, 3000); // Transitions automatically every 3 seconds
        }

        // 3. Prevent auto-scroll fight when user touches/swipes cards manually
        function pauseOnInteraction() {
            userInteracting = true;
            clearTimeout(interactionTimeout);
            
            // Resume auto-sliding 5 seconds after the user stops touching the screen
            interactionTimeout = setTimeout(() => {
                userInteracting = false;
            }, 5000);
        }

        selectionGrid.addEventListener('touchstart', pauseOnInteraction, { passive: true });
        selectionGrid.addEventListener('touchmove', pauseOnInteraction, { passive: true });

        // Fire auto-scroller setup initial layer
        startAutoSlide();
    }


    
});