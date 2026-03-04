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

    // Research sidebar theme accordion + active state
    const themeMenuGroups = document.querySelectorAll('.research-page .theme-menu-group[data-theme-group]');
    if (themeMenuGroups.length > 0) {
        const setGroupOpen = (group, open) => {
            const button = group.querySelector('.theme-menu-button[data-theme-target]');
            const panel = group.querySelector('.theme-menu-panel');
            group.classList.toggle('is-open', open);
            if (button) {
                button.setAttribute('aria-expanded', String(open));
            }
            if (panel) {
                panel.hidden = !open;
            }
        };

        const openGroupById = (id) => {
            themeMenuGroups.forEach((group) => {
                setGroupOpen(group, group.getAttribute('data-theme-group') === id);
            });
        };

        const activateThemeLink = (id) => {
            themeMenuGroups.forEach((group) => {
                const button = group.querySelector('.theme-menu-button[data-theme-target]');
                const isMatch = group.getAttribute('data-theme-group') === id;
                if (button) {
                    button.classList.toggle('is-active', isMatch);
                }
            });
        };

        themeMenuGroups.forEach((group) => {
            const button = group.querySelector('.theme-menu-button[data-theme-target]');
            if (!button) return;

            button.addEventListener('click', () => {
                const targetId = button.getAttribute('data-theme-target');
                const isOpen = group.classList.contains('is-open');
                if (isOpen) {
                    setGroupOpen(group, false);
                    button.classList.remove('is-active');
                } else {
                    openGroupById(targetId);
                    activateThemeLink(targetId);
                }
            });
        });

        const sections = Array.from(themeMenuGroups)
            .map((group) => {
                const button = group.querySelector('.theme-menu-button[data-theme-target]');
                if (!button) return null;
                return document.getElementById(button.getAttribute('data-theme-target'));
            })
            .filter(Boolean);

        if (sections.length > 0) {
            const observer = new IntersectionObserver((entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
                if (visible.length > 0) {
                    const activeId = visible[0].target.id;
                    activateThemeLink(activeId);
                    openGroupById(activeId);
                }
            }, {
                root: null,
                rootMargin: '-20% 0px -60% 0px',
                threshold: [0.2, 0.4, 0.6]
            });

            sections.forEach((section) => observer.observe(section));
        }

        const initialHash = window.location.hash.replace('#', '');
        if (initialHash) {
            activateThemeLink(initialHash);
            openGroupById(initialHash);
        }

        window.addEventListener('hashchange', () => {
            const hashId = window.location.hash.replace('#', '');
            if (hashId) {
                activateThemeLink(hashId);
                openGroupById(hashId);
            }
        });
    }

    // Mark current page in project-level TOC links
    const tocProjectLinks = document.querySelectorAll('.research-page .toc-sublink');
    if (tocProjectLinks.length > 0) {
        const currentPath = window.location.pathname.split('/').pop() || 'research.html';
        tocProjectLinks.forEach((link) => {
            const href = link.getAttribute('href') || '';
            if (href === currentPath || href.endsWith(`/${currentPath}`)) {
                link.classList.add('is-active');
            }
        });
    }
});
