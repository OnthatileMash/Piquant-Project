
/* =========================================================
   PIQUANT CHILLI SAUCE
   CATERING PAGE JAVASCRIPT
   ========================================================= */

"use strict";


/* =========================================================
   1. DOM READY
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initMobileNavigation();
    initHeaderScroll();
    initSmoothScrolling();
    initFaqAccordion();
    initGalleryLightbox();
    initBookingForm();
    initScrollToTop();
    initCurrentYear();

});


/* =========================================================
   2. MOBILE NAVIGATION
   ========================================================= */

function initMobileNavigation() {

    const menuToggle = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".navigation");

    if (!menuToggle || !navigation) {
        return;
    }


    menuToggle.addEventListener("click", () => {

        const isOpen =
            navigation.classList.toggle("is-open");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );

    });


    /* Close menu after selecting a navigation link */

    navigation
        .querySelectorAll("a")
        .forEach((link) => {

            link.addEventListener("click", () => {

                navigation.classList.remove("is-open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

            });

        });


    /* Close mobile menu when clicking outside */

    document.addEventListener("click", (event) => {

        const clickedInsideNavigation =
            navigation.contains(event.target);

        const clickedToggle =
            menuToggle.contains(event.target);


        if (
            navigation.classList.contains("is-open") &&
            !clickedInsideNavigation &&
            !clickedToggle
        ) {

            navigation.classList.remove("is-open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

        }

    });


    /* Close the mobile menu when returning to desktop */

    window.addEventListener("resize", () => {

        if (window.innerWidth >= 900) {

            navigation.classList.remove("is-open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

        }

    });

}


/* =========================================================
   3. HEADER SCROLL EFFECT
   ========================================================= */

function initHeaderScroll() {

    const header =
        document.querySelector(".header");

    if (!header) {
        return;
    }


    const updateHeader = () => {

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    };


    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );

}


/* =========================================================
   4. SMOOTH SCROLLING
   ========================================================= */

function initSmoothScrolling() {

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    links.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId =
                link.getAttribute("href");


            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }


            const target =
                document.querySelector(targetId);


            if (!target) {
                return;
            }


            event.preventDefault();


            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });


            /*
             * Update the URL without causing
             * another page jump.
             */

            if (
                window.history &&
                window.history.pushState
            ) {

                window.history.pushState(
                    null,
                    "",
                    targetId
                );

            }

        });

    });

}


/* =========================================================
   5. FAQ ACCORDION
   ========================================================= */

function initFaqAccordion() {

    const questions =
        document.querySelectorAll(
            ".faq-question"
        );


    if (!questions.length) {
        return;
    }


    questions.forEach((question) => {

        const answerId =
            question.getAttribute(
                "aria-controls"
            );


        let answer = null;


        if (answerId) {

            answer =
                document.getElementById(answerId);

        }


        /*
         * Fallback for markup where aria-controls
         * has not been supplied.
         */

        if (!answer) {

            answer =
                question.nextElementSibling;

        }


        if (!answer) {
            return;
        }


        /* Initial state */

        const initiallyExpanded =
            question.getAttribute(
                "aria-expanded"
            ) === "true";


        if (!initiallyExpanded) {

            answer.hidden = true;

        }


        question.addEventListener(
            "click",
            () => {

                const isExpanded =
                    question.getAttribute(
                        "aria-expanded"
                    ) === "true";


                /*
                 * Close other FAQ items.
                 */

                questions.forEach(
                    (otherQuestion) => {

                        if (
                            otherQuestion === question
                        ) {
                            return;
                        }


                        const otherAnswerId =
                            otherQuestion.getAttribute(
                                "aria-controls"
                            );


                        const otherAnswer =
                            otherAnswerId
                                ? document.getElementById(
                                      otherAnswerId
                                  )
                                : otherQuestion.nextElementSibling;


                        otherQuestion.setAttribute(
                            "aria-expanded",
                            "false"
                        );


                        if (otherAnswer) {

                            otherAnswer.hidden = true;

                        }

                    }
                );


                /*
                 * Toggle selected FAQ item.
                 */

                question.setAttribute(
                    "aria-expanded",
                    String(!isExpanded)
                );


                answer.hidden = isExpanded;

            }
        );

    });

}


/* =========================================================
   6. GALLERY LIGHTBOX
   ========================================================= */

function initGalleryLightbox() {

    const galleryTriggers =
        document.querySelectorAll(
            ".gallery-trigger"
        );


    if (!galleryTriggers.length) {
        return;
    }


    const lightbox =
        document.querySelector(".lightbox");


    const lightboxImage =
        document.querySelector(
            ".lightbox-image"
        );


    const closeButton =
        document.querySelector(
            ".lightbox-close"
        );


    if (
        !lightbox ||
        !lightboxImage ||
        !closeButton
    ) {
        return;
    }


    let previousFocus = null;


    const openLightbox = (trigger) => {

        const image =
            trigger.querySelector("img");


        if (!image) {
            return;
        }


        const imageSource =
            image.getAttribute("data-full") ||
            image.currentSrc ||
            image.src;


        const imageAlt =
            image.getAttribute("alt") || "";


        lightboxImage.src = imageSource;

        lightboxImage.alt = imageAlt;


        lightbox.classList.add("is-open");

        lightbox.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.style.overflow = "hidden";


        previousFocus = document.activeElement;

        closeButton.focus();

    };


    const closeLightbox = () => {

        lightbox.classList.remove(
            "is-open"
        );

        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.style.overflow = "";


        /*
         * Clear the image after the transition.
         */

        window.setTimeout(() => {

            if (
                !lightbox.classList.contains(
                    "is-open"
                )
            ) {

                lightboxImage.removeAttribute(
                    "src"
                );

            }

        }, 300);


        if (
            previousFocus &&
            typeof previousFocus.focus === "function"
        ) {

            previousFocus.focus();

        }

    };


    galleryTriggers.forEach((trigger) => {

        trigger.addEventListener(
            "click",
            () => openLightbox(trigger)
        );

    });


    closeButton.addEventListener(
        "click",
        closeLightbox
    );


    /*
     * Close when clicking the backdrop.
     */

    lightbox.addEventListener(
        "click",
        (event) => {

            if (
                event.target === lightbox
            ) {

                closeLightbox();

            }

        }
    );


    /*
     * Keyboard controls.
     */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                !lightbox.classList.contains(
                    "is-open"
                )
            ) {
                return;
            }


            if (event.key === "Escape") {

                closeLightbox();

            }

        }
    );

}


/* =========================================================
   7. BOOKING FORM
   ========================================================= */

function initBookingForm() {

    const form =
        document.querySelector(
            ".booking-form"
        );


    if (!form) {
        return;
    }


    const status =
        form.querySelector(
            ".form-status"
        );


    /*
     * This function performs client-side
     * validation only.
     *
     * It does NOT pretend to submit
     * information to a server.
     */

    form.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            const requiredFields =
                form.querySelectorAll(
                    "[required]"
                );


            let valid = true;


            requiredFields.forEach(
                (field) => {

                    if (
                        !field.value.trim()
                    ) {

                        valid = false;

                        field.setAttribute(
                            "aria-invalid",
                            "true"
                        );

                    } else {

                        field.removeAttribute(
                            "aria-invalid"
                        );

                    }

                }
            );


            /*
             * Email validation.
             */

            const email =
                form.querySelector(
                    'input[type="email"]'
                );


            if (
                email &&
                email.value.trim()
            ) {

                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                if (
                    !emailPattern.test(
                        email.value.trim()
                    )
                ) {

                    valid = false;

                    email.setAttribute(
                        "aria-invalid",
                        "true"
                    );

                }

            }


            if (!valid) {

                if (status) {

                    status.textContent =
                        "Please complete the required fields and check your details.";

                }

                return;

            }


            /*
             * At this stage the form is valid,
             * but no backend is assumed.
             */

            if (status) {

                status.textContent =
                    "Thank you. Your enquiry is ready to be sent. Please use the contact details provided to complete your booking.";

            }

        }
    );


    /*
     * Remove validation state as the user
     * corrects a field.
     */

    form.querySelectorAll(
        "input, select, textarea"
    ).forEach((field) => {

        field.addEventListener(
            "input",
            () => {

                field.removeAttribute(
                    "aria-invalid"
                );


                if (status) {
                    status.textContent = "";
                }

            }
        );


        field.addEventListener(
            "change",
            () => {

                field.removeAttribute(
                    "aria-invalid"
                );

            }
        );

    });

}


/* =========================================================
   8. SCROLL TO TOP
   ========================================================= */

function initScrollToTop() {

    const button =
        document.querySelector(
            ".scroll-top"
        );


    if (!button) {
        return;
    }


    const toggleButton = () => {

        if (window.scrollY > 500) {

            button.classList.add(
                "is-visible"
            );

            button.setAttribute(
                "aria-hidden",
                "false"
            );

        } else {

            button.classList.remove(
                "is-visible"
            );

            button.setAttribute(
                "aria-hidden",
                "true"
            );

        }

    };


    toggleButton();


    window.addEventListener(
        "scroll",
        toggleButton,
        { passive: true }
    );


    button.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* =========================================================
   9. CURRENT YEAR
   ========================================================= */

function initCurrentYear() {

    const yearElements =
        document.querySelectorAll(
            "[data-current-year]"
        );


    const currentYear =
        new Date().getFullYear();


    yearElements.forEach(
        (element) => {

            element.textContent =
                currentYear;

        }
    );

}


/* =========================================================
   10. IMAGE ERROR HANDLING
   ========================================================= */

document.addEventListener(
    "error",
    (event) => {

        const image = event.target;


        if (
            !(image instanceof HTMLImageElement)
        ) {
            return;
        }


        /*
         * Prevent broken images from repeatedly
         * attempting to load.
         */

        if (
            image.dataset.errorHandled === "true"
        ) {
            return;
        }


        image.dataset.errorHandled = "true";


        image.classList.add(
            "image-load-error"
        );

    },
    true
);


/* =========================================================
   11. LAZY IMAGE SAFETY
   ========================================================= */

function initLazyImages() {

    const images =
        document.querySelectorAll(
            "img"
        );


    images.forEach((image) => {

        /*
         * Don't override an explicit loading
         * attribute supplied by the HTML.
         */

        if (
            !image.hasAttribute("loading")
        ) {

            image.setAttribute(
                "loading",
                "lazy"
            );

        }


        if (
            !image.hasAttribute("decoding")
        ) {

            image.setAttribute(
                "decoding",
                "async"
            );

        }

    });

}


/*
 * Run separately because it does not depend
 * on interactive components.
 */

document.addEventListener(
    "DOMContentLoaded",
    initLazyImages
);


/* =========================================================
   12. ACTIVE NAVIGATION LINK
   ========================================================= */

function initActiveNavigation() {

    const navigationLinks =
        document.querySelectorAll(
            ".navigation a"
        );


    if (!navigationLinks.length) {
        return;
    }


    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    navigationLinks.forEach((link) => {

        const linkURL =
            new URL(
                link.href,
                window.location.href
            );


        const linkPage =
            linkURL.pathname
                .split("/")
                .pop()
                .toLowerCase();


        if (
            linkPage &&
            currentPage &&
            linkPage === currentPage
        ) {

            link.classList.add("active");

            link.setAttribute(
                "aria-current",
                "page"
            );

        }

    });

}


document.addEventListener(
    "DOMContentLoaded",
    initActiveNavigation
);


/* =========================================================
   END OF CATERING.JS
   ========================================================= */
```
