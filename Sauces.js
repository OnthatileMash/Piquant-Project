/*
====================================================
PIQUANT CHILLI SAUCE
sauces.js
PART 1
====================================================

Contains

✓ Page Loader
✓ Sticky Header
✓ Active Navigation
✓ Smooth Scrolling
✓ Hero Animation
✓ Reveal Animations
✓ Product Card Effects
✓ Gallery Image Switching
✓ Utility Functions

====================================================
*/


"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementById("main-header");
    const toggleBtn = document.getElementById("header-toggle");
    const loader = document.querySelector(".page-loader");
    const backToTop = document.getElementById("back-to-top");

    initialiseHeader(header);
    initialiseMobileMenu(header, toggleBtn);
    initialiseSmoothScroll();
    initialiseRevealAnimations();
    initialiseGallerySwitching();
    initialiseFaqAccordion();
    initialiseBackToTop(backToTop);
    initialiseLazyLoading();
    initialiseActiveNavState();

    window.addEventListener("load", () => {
        document.body.classList.add("loaded");
        if (loader) {
            window.setTimeout(() => loader.classList.add("loaded"), 400);
        }
    });
});

function initialiseHeader(header) {
    if (!header) return;

    const onScroll = () => {
        const isMobile = window.matchMedia("(max-width: 768px)").matches;
        const threshold = isMobile ? 24 : 80;

        if (window.scrollY > threshold) {
            header.classList.add("minimized");
        } else {
            header.classList.remove("minimized");
        }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();
}

function initialiseMobileMenu(header, toggleBtn) {
    if (!header || !toggleBtn) return;

    toggleBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        const isOpen = header.classList.toggle("expanded");
        toggleBtn.setAttribute("aria-expanded", String(isOpen));
    });

    document.addEventListener("click", (event) => {
        if (header.classList.contains("expanded") && !header.contains(event.target)) {
            header.classList.remove("expanded");
            toggleBtn.setAttribute("aria-expanded", "false");
        }
    });

    header.querySelectorAll(".nav-menu a").forEach((link) => {
        link.addEventListener("click", () => {
            header.classList.remove("expanded");
            toggleBtn.setAttribute("aria-expanded", "false");
        });
    });
}

function initialiseSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        const href = link.getAttribute("href");
        if (!href || href === "#") return;

        link.addEventListener("click", (event) => {
            const target = document.querySelector(href);
            if (!target) return;

            event.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });
}

function initialiseRevealAnimations() {
    const elements = document.querySelectorAll(
        ".reveal, .product-card, .quick-card, .sauce-showcase, .nutrition-card, .comparison-wrapper, .faq-item"
    );

    if (!("IntersectionObserver" in window)) {
        elements.forEach((element) => element.classList.add("is-visible"));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    elements.forEach((element) => observer.observe(element));
}

function initialiseGallerySwitching() {
    document.querySelectorAll(".sauce-gallery").forEach((gallery) => {
        const mainImage = gallery.querySelector(".main-image img");
        const thumbnails = gallery.querySelectorAll(".thumb-button");

        if (!mainImage || !thumbnails.length) return;

        thumbnails.forEach((thumb) => {
            thumb.addEventListener("click", () => {
                const src = thumb.getAttribute("data-src");
                const alt = thumb.getAttribute("data-alt") || "";
                if (!src) return;

                mainImage.src = src;
                mainImage.alt = alt;
            });
        });
    });
}

function initialiseFaqAccordion() {
    document.querySelectorAll(".faq-item").forEach((item) => {
        const button = item.querySelector(".faq-question");
        if (!button) return;

        button.addEventListener("click", () => {
            const isActive = item.classList.contains("active");

            document.querySelectorAll(".faq-item.active").forEach((openItem) => {
                openItem.classList.remove("active");
                const openButton = openItem.querySelector(".faq-question");
                if (openButton) openButton.setAttribute("aria-expanded", "false");
            });

            if (!isActive) {
                item.classList.add("active");
                button.setAttribute("aria-expanded", "true");
            }
        });
    });
}

function initialiseBackToTop(button) {
    if (!button) return;

    const onScroll = () => {
        if (window.scrollY > 700) {
            button.classList.add("visible");
        } else {
            button.classList.remove("visible");
        }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    button.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

function initialiseLazyLoading() {
    document.querySelectorAll("img").forEach((image) => {
        if (!image.hasAttribute("loading")) {
            image.loading = "lazy";
        }
    });
}

function initialiseActiveNavState() {
    const navLinks = document.querySelectorAll(".nav-menu a");
    const sections = document.querySelectorAll("section[id]");

    if (!navLinks.length || !sections.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const currentId = entry.target.id;

            navLinks.forEach((link) => {
                link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
            });
        });
    }, { rootMargin: "-35% 0px -55% 0px", threshold: 0.01 });

    sections.forEach((section) => observer.observe(section));
    }
