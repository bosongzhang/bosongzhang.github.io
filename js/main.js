document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('open');
            menuToggle.textContent = mainNav.classList.contains('open') ? '✕' : '☰';
        });
    }

    // Slideshow Logic
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

    if (slides.length > 0) {
        let slideIndex = 0;
        const totalSlides = slides.length;
        let slideshowInterval;

        function showSlide(n) {
            slideIndex = (n + totalSlides) % totalSlides;

            slides.forEach((slide, index) => {
                slide.style.display = (index === slideIndex) ? 'block' : 'none';
            });

            if (dots.length > 0) {
                dots.forEach(dot => dot.classList.remove('active'));
                if (dots[slideIndex]) {
                    dots[slideIndex].classList.add('active');
                }
            }
        }

        function nextSlide() {
            slideIndex++;
            showSlide(slideIndex);
        }

        function startSlideshow() {
            slideshowInterval = setInterval(nextSlide, 3000);
        }

        function stopSlideshow() {
            clearInterval(slideshowInterval);
        }

        // Initialize
        showSlide(slideIndex);
        startSlideshow();

        // Pause on hover
        const container = document.querySelector('.slideshow-container');
        if (container) {
            container.addEventListener('mouseover', stopSlideshow);
            container.addEventListener('mouseleave', startSlideshow);
        }

        if (dots.length > 0) {
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    slideIndex = index;
                    showSlide(slideIndex);
                });
            });
        }
    }

    // Lightbox Logic
    const lightboxImages = document.querySelectorAll('.figure-item img, .research-figure');
    
    if (lightboxImages.length > 0) {
        // Create lightbox elements
        const lightboxOverlay = document.createElement('div');
        lightboxOverlay.className = 'lightbox-overlay';
        
        const lightboxImg = document.createElement('img');
        lightboxImg.className = 'lightbox-image';
        
        const lightboxClose = document.createElement('button');
        lightboxClose.className = 'lightbox-close';
        lightboxClose.innerHTML = '&times;';
        lightboxClose.ariaLabel = 'Close lightbox';
        
        lightboxOverlay.appendChild(lightboxImg);
        lightboxOverlay.appendChild(lightboxClose);
        document.body.appendChild(lightboxOverlay);
        
        // Open lightbox
        lightboxImages.forEach(img => {
            img.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent default if wrapped in link
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                lightboxOverlay.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            });
        });
        
        // Close lightbox functions
        const closeLightbox = () => {
            lightboxOverlay.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
            setTimeout(() => {
                lightboxImg.src = ''; // Clear source after transition
            }, 300);
        };
        
        // Event listeners for closing
        lightboxClose.addEventListener('click', closeLightbox);
        
        lightboxOverlay.addEventListener('click', (e) => {
            if (e.target === lightboxOverlay) {
                closeLightbox();
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightboxOverlay.classList.contains('active')) {
                closeLightbox();
            }
        });
    }
});
