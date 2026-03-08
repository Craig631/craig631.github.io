const menuToggle = document.getElementById("mobile-menu");
const navLinks = document.querySelector(".nav-links");
const navAnchors = document.querySelectorAll('.nav-links a, .cta-link, .cta-btn[href^="#"], .brand');

navAnchors.forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
        const targetId = anchor.getAttribute("href");

        if (!targetId || !targetId.startsWith("#")) {
            return;
        }

        const target = document.querySelector(targetId);

        if (!target) {
            return;
        }

        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });

        if (navLinks && menuToggle) {
            navLinks.classList.remove("active");
            menuToggle.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
        }
    });
});

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("active");
        menuToggle.classList.toggle("active", isOpen);
        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });
}

const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) {
            return;
        }

        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
    });
}, {
    threshold: 0.18,
    rootMargin: "0px 0px -40px 0px"
});

revealItems.forEach((item) => revealObserver.observe(item));

const skillBars = document.querySelectorAll(".skill-progress");

const skillObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) {
            return;
        }

        const progress = entry.target.dataset.progress;
        entry.target.style.width = `${progress}%`;
        observer.unobserve(entry.target);
    });
}, {
    threshold: 0.35
});

skillBars.forEach((bar) => skillObserver.observe(bar));

const contactForm = document.getElementById("contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!name || !emailRegex.test(email) || !message) {
            alert("Please complete your name, a valid email, and your message.");
            return;
        }

        alert("Message received. I will get back to you soon.");
        contactForm.reset();
    });
}

const yearSpan = document.getElementById("year");

if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}
