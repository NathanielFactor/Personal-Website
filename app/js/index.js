document.addEventListener('DOMContentLoaded', () => {
    const fadeInElements = document.querySelectorAll('.fade-in');

    const checkVisibility = () => {
        const windowHeight = window.innerHeight;
        const scrollTop = window.scrollY;

        fadeInElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top + scrollTop;
            const elementBottom = elementTop + element.offsetHeight;

            if (elementBottom > scrollTop && elementTop < scrollTop + windowHeight) {
                element.classList.add('active');
            }
        });
    };

    // Check visibility on scroll and initial load
    window.addEventListener('scroll', checkVisibility);
    checkVisibility(); // Run on initial load
});
