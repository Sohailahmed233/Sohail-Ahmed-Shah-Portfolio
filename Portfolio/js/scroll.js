// ============================================
// SCROLL.JS - Scroll Animations & Effects
// ============================================

/**
 * Intersection Observer for scroll animations
 * Triggers animations when elements enter viewport
 */
class ScrollAnimator {
  constructor(options = {}) {
    this.options = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
      ...options,
    };

    this.observer = null;
    this.animatedElements = new Set();

    if ("IntersectionObserver" in window) {
      this.setupObserver();
    }
  }

  /**
   * Setup the Intersection Observer
   */
  setupObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
          this.triggerAnimation(entry.target);
          this.animatedElements.add(entry.target);

          // Optionally unobserve after animation
          // this.observer.unobserve(entry.target);
        }
      });
    }, this.options);
  }

  /**
   * Trigger animation when element enters viewport
   */
  triggerAnimation(element) {
    element.classList.add("visible");

    // Trigger any callbacks on the element
    const callback = element.dataset.onScroll;
    if (callback && typeof window[callback] === "function") {
      window[callback](element);
    }
  }

  /**
   * Observe elements with given selector
   */
  observe(selector) {
    const elements = document.querySelectorAll(selector);

    elements.forEach((element) => {
      if (this.observer) {
        this.observer.observe(element);
      }
    });
  }

  /**
   * Stop observing an element
   */
  unobserve(element) {
    if (this.observer) {
      this.observer.unobserve(element);
    }
  }

  /**
   * Disconnect the observer
   */
  disconnect() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

// ============================================
// PARALLAX EFFECT
// ============================================

class ParallaxEffect {
  constructor(selector, speed = 0.5) {
    this.elements = document.querySelectorAll(selector);
    this.speed = speed;
    this.init();
  }

  init() {
    window.addEventListener("scroll", () => this.update());
  }

  update() {
    const scrollY = window.scrollY;

    this.elements.forEach((element) => {
      const elementTop = element.offsetTop;
      const elementHeight = element.offsetHeight;
      const distanceFromTop = scrollY - elementTop;

      // Calculate parallax transform
      const yOffset = distanceFromTop * this.speed;

      // Only apply if element is in viewport
      if (
        distanceFromTop > -elementHeight &&
        distanceFromTop < window.innerHeight
      ) {
        element.style.transform = `translateY(${yOffset}px)`;
      }
    });
  }
}

// ============================================
// PROGRESS BAR SKILLS ANIMATION
// ============================================

class SkillsAnimator {
  constructor() {
    this.skillBars = document.querySelectorAll(".skill-progress");
    this.animated = false;
    this.init();
  }

  init() {
    const skillsSection = document.querySelector(".skills");
    if (!skillsSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.animated) {
            this.animateBars();
            this.animated = true;
          }
        });
      },
      { threshold: 0.5 },
    );

    observer.observe(skillsSection);
  }

  animateBars() {
    this.skillBars.forEach((bar, index) => {
      setTimeout(() => {
        const width = bar.style.width;
        bar.style.width = "0";

        // Trigger animation
        setTimeout(() => {
          bar.style.animation = "none";
          bar.offsetHeight; // Trigger reflow
          bar.style.animation = null;
          bar.style.width = width;
        }, 10);
      }, index * 100);
    });
  }
}

// ============================================
// COUNTER ANIMATION FOR NUMBERS
// ============================================

class CounterAnimation {
  constructor(selector, duration = 2000) {
    this.elements = document.querySelectorAll(selector);
    this.duration = duration;
    this.animated = new Set();
    this.init();
  }

  init() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.animated.has(entry.target)) {
            this.animateCounter(entry.target);
            this.animated.add(entry.target);
          }
        });
      },
      { threshold: 0.5 },
    );

    this.elements.forEach((element) => observer.observe(element));
  }

  animateCounter(element) {
    const target = parseInt(element.textContent);
    if (isNaN(target)) return;

    let current = 0;
    const increment = target / (this.duration / 16);
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / this.duration, 1);

      current = Math.floor(target * progress);
      element.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }
}

// ============================================
// TYPING EFFECT (Optional)
// ============================================

class TypingEffect {
  constructor(selector, text, speed = 50) {
    this.element = document.querySelector(selector);
    this.text = text;
    this.speed = speed;
    this.index = 0;

    if (this.element) {
      this.start();
    }
  }

  start() {
    this.element.textContent = "";
    this.type();
  }

  type() {
    if (this.index < this.text.length) {
      this.element.textContent += this.text.charAt(this.index);
      this.index++;
      setTimeout(() => this.type(), this.speed);
    }
  }
}

// ============================================
// SCROLL POSITION TRACKER
// ============================================

class ScrollTracker {
  constructor() {
    this.scrollPosition = 0;
    this.direction = "down";
    this.lastScrollPosition = 0;

    this.init();
  }

  init() {
    window.addEventListener("scroll", () => {
      this.scrollPosition = window.scrollY;

      if (this.scrollPosition > this.lastScrollPosition) {
        this.direction = "down";
      } else {
        this.direction = "up";
      }

      this.lastScrollPosition = this.scrollPosition;

      // Dispatch custom event
      window.dispatchEvent(
        new CustomEvent("scrollChange", {
          detail: {
            position: this.scrollPosition,
            direction: this.direction,
          },
        }),
      );
    });
  }

  getPosition() {
    return this.scrollPosition;
  }

  getDirection() {
    return this.direction;
  }
}

// ============================================
// SMOOTH SCROLL POLYFILL
// ============================================

function setupSmoothScrollPolyfill() {
  if (!("scrollBehavior" in document.documentElement.style)) {
    const html = document.documentElement;

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        const target = document.querySelector(href);

        if (target) {
          e.preventDefault();
          smoothScroll(target.offsetTop, 1000);
        }
      });
    });
  }
}

function smoothScroll(target, duration) {
  const start = window.scrollY;
  const distance = target - start;
  const startTime = performance.now();

  function animation(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function (ease-out-cubic)
    const easeProgress = 1 - Math.pow(1 - progress, 3);

    window.scrollTo(0, start + distance * easeProgress);

    if (progress < 1) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
}

// ============================================
// LAZY LOADING PLACEHOLDER
// ============================================

class LazyLoader {
  constructor(selector = "img[data-src]") {
    this.images = document.querySelectorAll(selector);
    this.init();
  }

  init() {
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute("data-src");
              observer.unobserve(img);
              img.addEventListener("load", () => {
                img.classList.add("loaded");
              });
            }
          }
        });
      });

      this.images.forEach((img) => observer.observe(img));
    } else {
      // Fallback: load all images
      this.images.forEach((img) => {
        if (img.dataset.src) {
          img.src = img.dataset.src;
        }
      });
    }
  }
}

// ============================================
// INITIALIZE SCROLL FEATURES
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  // Initialize scroll animator
  const scrollAnimator = new ScrollAnimator();
  scrollAnimator.observe(".scroll-animate");
  scrollAnimator.observe(".project-card");
  scrollAnimator.observe(".skill-category");
  scrollAnimator.observe(".about-content");
  scrollAnimator.observe(".info-box");

  // Initialize skills animation
  new SkillsAnimator();

  // Initialize scroll tracker
  new ScrollTracker();

  // Setup smooth scroll polyfill
  setupSmoothScrollPolyfill();

  // Initialize lazy loader
  new LazyLoader();

  // Optional: Add parallax effect to hero
  // new ParallaxEffect('.profile-img', 0.3);

  console.log("Scroll animations initialized");
});

// ============================================
// EXPORT FOR TESTING
// ============================================

// Uncomment if using ES6 modules
// export { ScrollAnimator, ParallaxEffect, SkillsAnimator, CounterAnimation };
