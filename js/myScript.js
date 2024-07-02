function openHamburgerMenu() {
  var menu = document.getElementById("top-nav");
  if (menu.className === "index-nav") {
    menu.className += " index-nav-show";
  } else {
    menu.className = "index-nav";
  }
}

let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;

function showSlide(n) {
    // Ensure slideIndex wraps around correctly
    slideIndex = (n + totalSlides) % totalSlides;
    
    slides.forEach((slide, index) => {
        if (index === slideIndex) {
            slide.style.display = 'block';
        } else {
            slide.style.display = 'none';
        }
    });
    
    dots.forEach(dot => dot.classList.remove('active'));
    dots[slideIndex].classList.add('active');
}

function nextSlide() {
    slideIndex++;
    showSlide(slideIndex);
}

function previousSlide() {
    slideIndex--;
    showSlide(slideIndex);
}

// Automatic slideshow
let slideshowInterval = setInterval(nextSlide, 3000);

// Pause slideshow on hover
document.querySelector('.slideshow-container').addEventListener('mouseover', () => {
    clearInterval(slideshowInterval);
});

// Resume slideshow on mouse leave
document.querySelector('.slideshow-container').addEventListener('mouseleave', () => {
    slideshowInterval = setInterval(nextSlide, 3000);
});

// Clickable dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        slideIndex = index;
        showSlide(slideIndex);
    });
});

// Initial slide display
showSlide(slideIndex);



