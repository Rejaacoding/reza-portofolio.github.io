// --- LOGIKA ANIMASI SCROLL REVEAL ---
function initScrollReveal() {
    const reveals = document.querySelectorAll('.scroll-reveal');
    if (!('IntersectionObserver' in window)) return;

    const observerOptions = {
        root: null,
        threshold: 0.1, 
        rootMargin: "0px 0px -50px 0px"
    };

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            } else {
                entry.target.classList.remove('show');
            }
        });
    };

    const scrollObserver = new IntersectionObserver(revealCallback, observerOptions);
    reveals.forEach(el => scrollObserver.observe(el));
}

// --- LOGIKA NAVBAR MOBILE ---
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if(hamburger) {
        hamburger.addEventListener('click', () => {
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '70px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'rgba(15, 23, 42, 0.95)'; /* Dark SysAdmin Theme for Mobile */
                navLinks.style.backdropFilter = 'blur(20px)';
                navLinks.style.padding = '20px';
                navLinks.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
                navLinks.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                hamburger.innerHTML = '<i class="fas fa-times"></i>';
            }
        });
    }
}

// --- LOGIKA SLIDER PORTOFOLIO: AUTO SCROLL + MANUAL ARROWS ---
function initPortfolioSlider() {
    const track = document.getElementById('portfolioTrack');
    const btnLeft = document.getElementById('slideLeft');
    const btnRight = document.getElementById('slideRight');
    
    if (!track) return;

    let autoScrollTimer;
    const speed = 1.5; 
    const scrollAmountManual = 382; 

    function startAutoScroll() {
        autoScrollTimer = setInterval(() => {
            track.scrollLeft += speed;
            if (track.scrollLeft >= track.scrollWidth / 2) {
                track.scrollLeft = 0;
            }
        }, 20); 
    }

    function stopAutoScroll() {
        clearInterval(autoScrollTimer);
    }

    startAutoScroll();

    track.addEventListener('mouseenter', stopAutoScroll);
    track.addEventListener('mouseleave', startAutoScroll);
    track.addEventListener('touchstart', stopAutoScroll);
    track.addEventListener('touchend', startAutoScroll);

    if (btnRight) {
        btnRight.addEventListener('click', () => {
            stopAutoScroll(); 
            track.scrollBy({ left: scrollAmountManual, behavior: 'smooth' });
            if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 10) {
                track.scrollTo({ left: 0, behavior: 'smooth' }); 
            }
            setTimeout(startAutoScroll, 1000); 
        });
    }

    if (btnLeft) {
        btnLeft.addEventListener('click', () => {
            stopAutoScroll();
            track.scrollBy({ left: -scrollAmountManual, behavior: 'smooth' });
            if (track.scrollLeft <= 0) {
                track.scrollTo({ left: track.scrollWidth / 2, behavior: 'smooth' });
            }
            setTimeout(startAutoScroll, 1000);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initMobileMenu();
    initPortfolioSlider(); 
});