// Testimonials Carousel
document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.testimonials-slider');
    const dots = document.querySelectorAll('.testimonial-dot');
    const testimonials = document.querySelectorAll('.testimonial-card');
    const isMobile = window.innerWidth < 768;

    let currentIndex = 0;
    let interval;

    function updateSlider() {
        const slideWidth = isMobile ? 100 : 33.333;
        slider.style.transform = `translateX(-${currentIndex * slideWidth}%)`;

        dots.forEach((dot, index) => {
            dot.classList.toggle('bg-secondary', index === currentIndex);
            dot.classList.toggle('bg-gray-300', index !== currentIndex);
        });
    }

    function startAutoplay() {
        interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % (isMobile ? testimonials.length : testimonials.length - 2);
            updateSlider();
        }, 5000);
    }

    function stopAutoplay() {
        clearInterval(interval);
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateSlider();
            stopAutoplay();
            startAutoplay();
        });
    });

    const container = document.querySelector('.testimonials-container');
    container.addEventListener('mouseenter', stopAutoplay);
    container.addEventListener('mouseleave', startAutoplay);

    updateSlider();
    startAutoplay();

    window.addEventListener('resize', () => {
        const newIsMobile = window.innerWidth < 768;
        if (newIsMobile !== isMobile) location.reload();
    });
});

// Booking Form Handler
document.addEventListener('DOMContentLoaded', function () {
    const bookingForm = document.getElementById('booking-form');

    if (bookingForm) {
        bookingForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const formData = new FormData(bookingForm);
            const formValues = Object.fromEntries(formData.entries());

            let isValid = true;
            ['name', 'email', 'phone', 'service', 'date', 'time'].forEach(field => {
                const input = document.getElementById(field);
                if (!formValues[field]) {
                    input.classList.add('border-red-500');
                    isValid = false;
                } else {
                    input.classList.remove('border-red-500');
                }
            });

            if (isValid) {
                const submitButton = bookingForm.querySelector('button[type="submit"]');
                submitButton.disabled = true;
                submitButton.innerHTML = '<i class="ri-loader-4-line animate-spin mr-2"></i> Processing...';

                setTimeout(() => {
                    alert('Thank you! Your booking request has been received.');
                    bookingForm.reset();
                    submitButton.disabled = false;
                    submitButton.innerHTML = 'Confirm Booking';
                }, 1500);
            } else {
                alert('Please fill in all required fields.');
            }
        });
    }

    const dateInput = document.getElementById('date');
    if (dateInput) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        dateInput.min = tomorrow.toISOString().split('T')[0];
    }
});

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function () {
    const menuButton = document.querySelector('.ri-menu-line');
    const nav = document.querySelector('nav');

    if (menuButton && nav) {
        menuButton.addEventListener('click', function () {
            const isHidden = nav.classList.contains('hidden');
            nav.classList.toggle('hidden', !isHidden);
            nav.classList.toggle('flex', isHidden);
            nav.classList.toggle('flex-col', isHidden);
            nav.classList.toggle('absolute', isHidden);
            nav.classList.toggle('top-16', isHidden);
            nav.classList.toggle('left-0', isHidden);
            nav.classList.toggle('right-0', isHidden);
            nav.classList.toggle('bg-white', isHidden);
            nav.classList.toggle('shadow-md', isHidden);
            nav.classList.toggle('p-4', isHidden);
            nav.classList.toggle('space-y-4', isHidden);
            nav.classList.toggle('z-50', isHidden);
            menuButton.classList.toggle('ri-menu-line', !isHidden);
            menuButton.classList.toggle('ri-close-line', isHidden);
        });

        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 768) {
                    nav.className = 'hidden md:flex space-x-8';
                    menuButton.classList.add('ri-menu-line');
                    menuButton.classList.remove('ri-close-line');
                }
            });
        });
    }
});

// Smooth Scrolling
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offset = targetElement.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({ top: offset, behavior: 'smooth' });
            }
        });
    });
});

// Stats counter animation
const statsCounters = document.querySelectorAll('.stats-counter');

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseFloat(counter.getAttribute('data-target'));
            const originalText = counter.textContent;
            let suffix = '';
            if (originalText.includes('M+')) {
                suffix = 'M+';
            } else if (originalText.includes('+')) {
                suffix = '+';
            } else if (originalText.includes('%')) {
                suffix = '%';
            }
            let current = 0;
            let decimals = 0;
            if (suffix === 'M+') {
                decimals = 1;
            }
            const increment = target / 100;
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    let displayValue;
                    if (suffix === 'M+') {
                        displayValue = (current / 1000000).toFixed(decimals) + 'M+';
                    } else if (suffix === '+') {
                        displayValue = Math.ceil(current) + '+';
                    } else if (suffix === '%') {
                        displayValue = Math.ceil(current) + '%';
                    } else {
                        displayValue = Math.ceil(current);
                    }
                    counter.textContent = displayValue;
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = originalText;
                }
            };
            updateCounter();
        }
    });
}, {
    threshold: 0.5
});
statsCounters.forEach(counter => statsObserver.observe(counter));

const dots = document.querySelectorAll('.testimonial-dot');
let currentIndex = 0; // or get from your slider logic

function setActiveDot(index) {
  dots.forEach((dot, i) => {
    dot.classList.remove('active');
    if (i === index) {
      dot.classList.add('active');
    }
  });
}

// Example: when a testimonial changes
setActiveDot(currentIndex);
