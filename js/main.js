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

        // Clickable dots
        if (dots.length > 0) {
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    slideIndex = index;
                    showSlide(slideIndex);
                });
            });
        }
    }
});
