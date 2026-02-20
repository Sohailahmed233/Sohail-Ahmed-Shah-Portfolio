// ============================================
// MAIN.JS - Navigation & DOM Manipulation
// ============================================

/**
 * Initialize the application
 */
function init() {
  setupMobileMenu();
  setupNavigation();
  setupSmoothScroll();
}

/**
 * Mobile Menu Toggle - Handle hamburger menu
 */
function setupMobileMenu() {
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");

  if (!mobileMenuBtn) return;

  mobileMenuBtn.addEventListener("click", () => {
    mobileMenuBtn.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  // Close menu when a link is clicked
  const navItems = navLinks.querySelectorAll("a");
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      mobileMenuBtn.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".navbar")) {
      mobileMenuBtn.classList.remove("active");
      navLinks.classList.remove("active");
    }
  });
}

/**
 * Navigation - Highlight active section
 */
function setupNavigation() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.pageYOffset >= sectionTop - 200) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  });
}

/**
 * Smooth Scroll - Enhanced navigation
 * Note: HTML5 scroll-behavior: smooth provides base functionality
 * This adds additional smooth scroll handling for better UX
 */
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#") return;

      e.preventDefault();
      const target = document.querySelector(href);

      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

/**
 * Utility: Detect if element is in viewport
 */
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom >= 0
  );
}

/**
 * Utility: Add class when element enters viewport
 */
function observeElements(selector, className = "visible") {
  const elements = document.querySelectorAll(selector);

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(className);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    elements.forEach((element) => {
      observer.observe(element);
    });
  } else {
    // Fallback for browsers without IntersectionObserver
    elements.forEach((element) => {
      element.classList.add(className);
    });
  }
}

/**
 * Navbar scroll effect - Add shadow on scroll
 */
function setupNavbarScroll() {
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = "var(--shadow-lg)";
    } else {
      navbar.style.boxShadow = "var(--shadow-sm)";
    }
  });
}

/**
 * Scroll to top button (optional future feature)
 */
function setupScrollToTop() {
  const scrollBtn = document.querySelector(".scroll-to-top");
  if (!scrollBtn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollBtn.style.display = "block";
    } else {
      scrollBtn.style.display = "none";
    }
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

/**
 * Counter animation for numbers
 */
function animateCounter(element, target, duration = 2000) {
  let current = 0;
  const increment = target / (duration / 16);

  const counter = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(counter);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

/**
 * Add scroll animations to elements
 */
function setupScrollAnimations() {
  observeElements(".project-card", "visible");
  observeElements(".skill-category", "visible");
  observeElements(".info-box", "visible");
  observeElements(".about-content", "visible");
}

/**
 * Handle window resize events
 */
function setupResizeListener() {
  let resizeTimer;

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // Handle resize logic here
      console.log("Window resized");
    }, 250);
  });
}

/**
 * Prevent default behavior for development links
 */
function setupLinkHandling() {
  document.querySelectorAll('a[href="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
    });
  });
}

/**
 * Log page information (for debugging)
 */
function logPageInfo() {
  console.log("Portfolio Website Loaded");
  console.log("Viewport:", window.innerWidth, "x", window.innerHeight);
  console.log(
    "Theme:",
    document.documentElement.getAttribute("data-theme") || "dark",
  );
}

// ============================================
// INITIALIZE ON DOM CONTENT LOADED
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  init();
  setupNavbarScroll();
  setupScrollAnimations();
  setupResizeListener();
  setupLinkHandling();
  logPageInfo();
});

// ============================================
// EXPORT FOR TESTING (if using modules)
// ============================================

// Uncomment if using ES6 modules
// export { init, isInViewport, observeElements };
