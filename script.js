
document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle");
    const navbar = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".navbar a");
    const year = document.getElementById("year");

    // Automatically update the copyright year
    if (year) {
        year.textContent = new Date().getFullYear();
    }

    // Mobile navigation menu
    menuToggle.addEventListener("click", () => {
        const isOpen = navbar.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation" : "Open navigation"
        );
        menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    // Close the mobile menu after selecting a link
    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            navbar.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation");
            menuToggle.textContent = "☰";
        });
    });

    // Highlight the navigation link for the current section
    const sections = document.querySelectorAll("section[id]");

    if ("IntersectionObserver" in window) {
        const sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        navLinks.forEach((link) => {
                            const isActive =
                                link.getAttribute("href") ===
                                "#" + entry.target.id;

                            link.classList.toggle("active", isActive);
                        });
                    }
                });
            },
            { rootMargin: "-20% 0px -65% 0px" }
        );

        sections.forEach((section) => {
            sectionObserver.observe(section);
        });
    }

    // Reveal sections as the user scrolls
    const revealItems = document.querySelectorAll(
        ".section-heading, .about-content, .card, " +
        ".timeline-item, .experience-card, .contact-card, " +
        ".language-list"
    );

    if (
        "IntersectionObserver" in window &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
        revealItems.forEach((item) => {
            item.classList.add("reveal");
        });

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12 }
        );

        revealItems.forEach((item) => {
            revealObserver.observe(item);
        });
    }
});
