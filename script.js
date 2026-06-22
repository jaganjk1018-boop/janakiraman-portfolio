document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('open');
            // Animate hamburger menu bars
            const bars = menuToggle.querySelectorAll('.bar');
            if (menuToggle.classList.contains('open')) {
                bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });

        // Close menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('open');
                const bars = menuToggle.querySelectorAll('.bar');
                bars.forEach(bar => bar.style.transform = 'none');
                bars[1].style.opacity = '1';
            });
        });
    }

    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealOnScroll.observe(el));

    // --- Copy to Clipboard Utility ---
    const copyCards = document.querySelectorAll('[data-copy]');
    
    copyCards.forEach(card => {
        const copyBtn = card.querySelector('.copy-btn');
        if (!copyBtn) return;

        card.addEventListener('click', async (e) => {
            // Prevent trigger if clicking an anchor inside if any
            if (e.target.tagName === 'A') return;

            const textToCopy = card.getAttribute('data-copy');
            try {
                await navigator.clipboard.writeText(textToCopy);
                
                // Trigger feedback animation
                copyBtn.classList.add('copied');
                card.style.borderColor = '#30d158';
                card.style.boxShadow = '0 4px 20px rgba(48, 209, 88, 0.15)';

                setTimeout(() => {
                    copyBtn.classList.remove('copied');
                    card.style.borderColor = '';
                    card.style.boxShadow = '';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy text: ', err);
            }
        });
    });

    // --- Active Link Highlighting on Scroll ---
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link:not(.nav-btn)');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active-nav');
            // Add subtle indicator style for active section (can style in CSS if needed)
            if (item.getAttribute('href').slice(1) === current) {
                item.style.color = 'var(--text-primary)';
            } else {
                item.style.color = '';
            }
        });
    });

    // --- Mock Form Submission with Micro-interactions ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const submitText = submitBtn.querySelector('.submit-text');
            const loader = submitBtn.querySelector('.submit-loader');
            const alertBox = document.getElementById('form-success-alert');

            // Start loader animation
            submitText.classList.add('hidden');
            loader.classList.remove('hidden');
            submitBtn.disabled = true;

            // Simulate form submission delay
            setTimeout(() => {
                loader.classList.add('hidden');
                submitText.classList.remove('hidden');
                submitBtn.disabled = false;
                
                // Show Success Alert
                alertBox.classList.remove('hidden');
                contactForm.reset();

                // Show browser alert pop-up
                alert("Hi,request sended . thank you.");

                // Hide Alert after 5 seconds
                setTimeout(() => {
                    alertBox.classList.add('hidden');
                }, 5000);
            }, 1500);
        });
    }

    // --- Floating Contact Button Scroll Visibility ---
    const floatingContactBtn = document.getElementById('floatingContactBtn');
    if (floatingContactBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                floatingContactBtn.classList.add('visible');
            } else {
                floatingContactBtn.classList.remove('visible');
            }
        });
    }
});
