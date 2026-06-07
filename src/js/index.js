// Project initialization
document.addEventListener('DOMContentLoaded', () => {
    console.log('Premium Tailwind CSS v4 design system initialized.');

    // Intersection Observer for scroll animations with staggered delay
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
    };

    let delay = 0;
    let delayTimeout;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.remove('-translate-y-8', 'opacity-0');
                    entry.target.classList.add('translate-y-0', 'opacity-100');
                }, delay);
                delay += 0; // Stagger delay for elements appearing at the same time
                clearTimeout(delayTimeout);
                delayTimeout = setTimeout(() => {
                    delay =+100;
                }, 400);

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Split text animation logic
    const splitTextElements = document.querySelectorAll('.split-text-animate');
    splitTextElements.forEach(el => {
        const text = el.textContent.trim();
        const words = text.split(/\s+/);
        el.innerHTML = ''; // Clear text

        words.forEach(word => {
            const span = document.createElement('span');
            // We use inline-block to allow transforms on the span
            span.className = 'inline-block transform -translate-y-8 opacity-0 transition-all duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] mr-[0.25em]';
            span.textContent = word;
            el.appendChild(span);
        });
    });

    const splitTextObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const spans = entry.target.querySelectorAll('span');
                spans.forEach((span, index) => {
                    setTimeout(() => {
                        span.classList.remove('-translate-y-8', 'opacity-0');
                        span.classList.add('translate-y-0', 'opacity-100');
                    }, index * 40); // 40ms delay per word for a fluid effect
                });
                splitTextObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    splitTextElements.forEach(el => {
        splitTextObserver.observe(el);
    });

    // Apply to all major components in sections (excluding the sidebar and split text)
    const components = document.querySelectorAll('section h1:not(.split-text-animate), section h2, section h3, section h4, section p, section img, section li, section .grid > div, section button');

    components.forEach(el => {
        // Set initial hidden state and transition
        el.classList.add('transform', '-translate-y-8', 'opacity-0', 'transition-all', 'duration-[800ms]', 'ease-[cubic-bezier(0.22,1,0.36,1)]');
        observer.observe(el);
    });

    // Sidebar Toggle Logic
    const menuBtn = document.getElementById('menu-btn');
    const closeBtn = document.getElementById('close-sidebar-btn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    function openSidebar() {
        sidebar.classList.remove('-translate-y-full');
        sidebar.classList.add('translate-y-0');
        if (overlay) {
            overlay.classList.remove('opacity-0', 'pointer-events-none');
            overlay.classList.add('opacity-100');
        }
    }

    function closeSidebar() {
        sidebar.classList.add('-translate-y-full');
        sidebar.classList.remove('translate-y-0');
        if (overlay) {
            overlay.classList.add('opacity-0', 'pointer-events-none');
            overlay.classList.remove('opacity-100');
        }
    }

    if (menuBtn) menuBtn.addEventListener('click', openSidebar);
    if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
    if (overlay) overlay.addEventListener('click', closeSidebar);

    // Close sidebar when a link is clicked
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', closeSidebar);
    });

    // Add random floating stars
    const createRandomStars = () => {
        const sections = document.querySelectorAll('section');

        sections.forEach(section => {
            // Ensure section can contain absolute elements
            section.classList.add('relative', 'overflow-hidden');

            // Decide to add 1 star per section (or sometimes 2) to keep count low
            const starCount = Math.random() > 0.3 ? 1 : 0; // 70% chance to have a star

            for (let i = 0; i < starCount; i++) {
                // Wrapper to handle position and centering independently of the rotation
                const wrapper = document.createElement('div');
                wrapper.className = 'absolute pointer-events-none z-0';

                // Random position within the section
                const top = 10 + Math.random() * 80;
                const left = 10 + Math.random() * 80;

                // Larger sizes (200px to 450px)
                const size = 200 + Math.random() * 250;

                wrapper.style.top = `${top}%`;
                wrapper.style.left = `${left}%`;
                wrapper.style.width = `${size}px`;
                wrapper.style.height = `${size}px`;
                // Center it on its coordinates
                wrapper.style.transform = 'translate(-50%, -50%)';

                const star = document.createElement('img');
                star.src = '../assets/svg/star.svg';
                // Very low opacity so it doesn't distract, given the large size
                star.className = 'w-full h-full animate-rotate-slow opacity-[0.05]';

                const delay = Math.random() * -30;
                const duration = 30 + Math.random() * 20; // 30-50s (very slow rotation)

                star.style.animationDelay = `${delay}s`;
                star.style.animationDuration = `${duration}s`;

                wrapper.appendChild(star);
                // Prepend so it sits behind the section's content in the DOM structure
                section.prepend(wrapper);
            }
        });
    };
    createRandomStars();

    // ---- Works Carousel ----
    const carouselTrack = document.getElementById('works-carousel-track');
    const carouselPrev  = document.getElementById('carousel-prev');
    const carouselNext  = document.getElementById('carousel-next');

    if (carouselTrack && carouselPrev && carouselNext) {

        // Calculate the scroll amount: width of the first card + gap
        const getScrollAmount = () => {
            const firstCard = carouselTrack.querySelector('.carousel-card');
            if (!firstCard) return 300;
            const style = window.getComputedStyle(carouselTrack);
            const gap = parseFloat(style.gap) || 16;
            return firstCard.offsetWidth + gap;
        };

        const updateButtons = () => {
            const atStart = carouselTrack.scrollLeft <= 4;
            const atEnd   = carouselTrack.scrollLeft >= carouselTrack.scrollWidth - carouselTrack.clientWidth - 4;
            carouselPrev.disabled = atStart;
            carouselNext.disabled = atEnd;
        };

        carouselPrev.addEventListener('click', () => {
            carouselTrack.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
        });

        carouselNext.addEventListener('click', () => {
            carouselTrack.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
        });

        carouselTrack.addEventListener('scroll', updateButtons, { passive: true });
        window.addEventListener('resize', updateButtons);
        updateButtons(); // initialise state

        // Drag-to-scroll (mouse)
        let isDragging = false;
        let dragStartX = 0;
        let scrollStartLeft = 0;

        carouselTrack.addEventListener('mousedown', (e) => {
            isDragging = true;
            dragStartX = e.pageX;
            scrollStartLeft = carouselTrack.scrollLeft;
            carouselTrack.style.cursor = 'grabbing';
            e.preventDefault();
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const dx = e.pageX - dragStartX;
            carouselTrack.scrollLeft = scrollStartLeft - dx;
        });

        window.addEventListener('mouseup', () => {
            if (!isDragging) return;
            isDragging = false;
            carouselTrack.style.cursor = 'grab';
        });

        // Prevent link navigation when dragging
        carouselTrack.querySelectorAll('.carousel-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (Math.abs(carouselTrack.scrollLeft - scrollStartLeft) > 5) {
                    e.preventDefault();
                }
            });
        });
    }
});

