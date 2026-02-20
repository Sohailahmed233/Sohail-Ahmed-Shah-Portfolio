// ============================================
// THEME.JS - Dark/Light Mode Toggle
// ============================================

/**
 * Theme Manager Class
 */
class ThemeManager {
  constructor(options = {}) {
    this.storageKey = options.storageKey || "portfolio-theme";
    this.lightTheme = options.lightTheme || "light";
    this.darkTheme = options.darkTheme || "dark";
    this.defaultTheme = options.defaultTheme || "dark";

    this.toggleBtn = document.getElementById("themeToggle");
    this.htmlElement = document.documentElement;

    this.init();
  }

  /**
   * Initialize theme manager
   */
  init() {
    // Load saved theme or use system preference
    const savedTheme = this.getSavedTheme();
    const theme = savedTheme || this.getSystemPreference() || this.defaultTheme;

    // Set initial theme
    this.setTheme(theme);

    // Setup toggle button
    if (this.toggleBtn) {
      this.toggleBtn.addEventListener("click", () => this.toggleTheme());
    }

    // Listen for system theme changes
    if (window.matchMedia) {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", (e) => {
          // Only switch if user hasn't manually selected a theme
          if (!this.getSavedTheme()) {
            const newTheme = e.matches ? this.darkTheme : this.lightTheme;
            this.setTheme(newTheme);
          }
        });
    }

    console.log("Theme manager initialized");
  }

  /**
   * Get saved theme from localStorage
   */
  getSavedTheme() {
    try {
      return localStorage.getItem(this.storageKey);
    } catch (e) {
      console.warn("LocalStorage not available:", e);
      return null;
    }
  }

  /**
   * Get system color scheme preference
   */
  getSystemPreference() {
    if (window.matchMedia) {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return this.darkTheme;
      } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
        return this.lightTheme;
      }
    }
    return null;
  }

  /**
   * Set theme
   */
  setTheme(theme) {
    // Update data attribute
    this.htmlElement.setAttribute("data-theme", theme);

    // Save to localStorage
    try {
      localStorage.setItem(this.storageKey, theme);
    } catch (e) {
      console.warn("LocalStorage not available:", e);
    }

    // Update toggle button state
    this.updateToggleButton(theme);

    // Update meta theme-color
    this.updateMetaThemeColor(theme);

    // Dispatch custom event
    window.dispatchEvent(
      new CustomEvent("themeChange", {
        detail: { theme },
      }),
    );

    console.log("Theme changed to:", theme);
  }

  /**
   * Toggle between light and dark theme
   */
  toggleTheme() {
    const currentTheme =
      this.htmlElement.getAttribute("data-theme") || this.defaultTheme;
    const newTheme =
      currentTheme === this.darkTheme ? this.lightTheme : this.darkTheme;

    this.setTheme(newTheme);
  }

  /**
   * Update toggle button appearance
   */
  updateToggleButton(theme) {
    if (!this.toggleBtn) return;

    const sunIcon = this.toggleBtn.querySelector(".sun-icon");
    const moonIcon = this.toggleBtn.querySelector(".moon-icon");

    if (theme === this.darkTheme) {
      this.toggleBtn.setAttribute("aria-label", "Switch to light mode");
      if (sunIcon) sunIcon.style.display = "inline";
      if (moonIcon) moonIcon.style.display = "none";
    } else {
      this.toggleBtn.setAttribute("aria-label", "Switch to dark mode");
      if (sunIcon) sunIcon.style.display = "none";
      if (moonIcon) moonIcon.style.display = "inline";
    }
  }

  /**
   * Update meta theme-color for browser chrome
   */
  updateMetaThemeColor(theme) {
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');

    if (!metaThemeColor) {
      metaThemeColor = document.createElement("meta");
      metaThemeColor.setAttribute("name", "theme-color");
      document.head.appendChild(metaThemeColor);
    }

    const color = theme === this.darkTheme ? "#1a1a2e" : "#ffffff";
    metaThemeColor.setAttribute("content", color);
  }

  /**
   * Get current theme
   */
  getCurrentTheme() {
    return this.htmlElement.getAttribute("data-theme") || this.defaultTheme;
  }

  /**
   * Check if dark theme is active
   */
  isDarkMode() {
    return this.getCurrentTheme() === this.darkTheme;
  }

  /**
   * Check if light theme is active
   */
  isLightMode() {
    return this.getCurrentTheme() === this.lightTheme;
  }

  /**
   * Force light theme
   */
  enableLightMode() {
    this.setTheme(this.lightTheme);
  }

  /**
   * Force dark theme
   */
  enableDarkMode() {
    this.setTheme(this.darkTheme);
  }

  /**
   * Auto theme based on system preference
   */
  auto() {
    const preference = this.getSystemPreference();
    if (preference) {
      this.setTheme(preference);
    }
  }
}

// ============================================
// COLOR TRANSITION HELPER
// ============================================

/**
 * Animate color transitions during theme change
 */
class ColorTransition {
  constructor(duration = 300) {
    this.duration = duration;
    this.setupTransition();
  }

  setupTransition() {
    window.addEventListener("themeChange", () => {
      this.enableTransition();
      setTimeout(() => this.disableTransition(), this.duration);
    });
  }

  enableTransition() {
    const root = document.documentElement;
    root.style.transition = `
            background-color ${this.duration}ms ease,
            color ${this.duration}ms ease
        `;
  }

  disableTransition() {
    const root = document.documentElement;
    root.style.transition = "";
  }
}

// ============================================
// ADVANCED THEME CUSTOMIZER
// ============================================

/**
 * Advanced theme customization
 */
class ThemeCustomizer {
  constructor() {
    this.customThemes = {};
    this.loadCustomThemes();
  }

  /**
   * Create custom theme
   */
  createTheme(name, colors) {
    this.customThemes[name] = colors;
    this.saveTheme(name, colors);
  }

  /**
   * Apply custom theme
   */
  applyTheme(name) {
    const theme = this.customThemes[name];
    if (!theme) return;

    const root = document.documentElement;
    for (const [key, value] of Object.entries(theme)) {
      root.style.setProperty(`--${key}`, value);
    }
  }

  /**
   * Save custom theme to localStorage
   */
  saveTheme(name, colors) {
    try {
      const themes = JSON.parse(localStorage.getItem("custom-themes")) || {};
      themes[name] = colors;
      localStorage.setItem("custom-themes", JSON.stringify(themes));
    } catch (e) {
      console.warn("Failed to save theme:", e);
    }
  }

  /**
   * Load custom themes from localStorage
   */
  loadCustomThemes() {
    try {
      const themes = JSON.parse(localStorage.getItem("custom-themes")) || {};
      this.customThemes = { ...this.customThemes, ...themes };
    } catch (e) {
      console.warn("Failed to load themes:", e);
    }
  }

  /**
   * Delete custom theme
   */
  deleteTheme(name) {
    delete this.customThemes[name];

    try {
      const themes = JSON.parse(localStorage.getItem("custom-themes")) || {};
      delete themes[name];
      localStorage.setItem("custom-themes", JSON.stringify(themes));
    } catch (e) {
      console.warn("Failed to delete theme:", e);
    }
  }

  /**
   * Get all custom themes
   */
  getAllThemes() {
    return this.customThemes;
  }
}

// ============================================
// INITIALIZE THEME MANAGER
// ============================================

let themeManager = null;

document.addEventListener("DOMContentLoaded", () => {
  // Initialize theme manager
  themeManager = new ThemeManager({
    lightTheme: "light",
    darkTheme: "dark",
    defaultTheme: "dark",
  });

  // Initialize color transition
  new ColorTransition(300);

  // Optional: Initialize custom theme customizer
  // const customizer = new ThemeCustomizer();
});

// ============================================
// KEYBOARD SHORTCUT FOR THEME TOGGLE
// ============================================

document.addEventListener("keydown", (e) => {
  // Alt + T to toggle theme
  if (e.altKey && e.key === "t") {
    e.preventDefault();
    if (themeManager) {
      themeManager.toggleTheme();
    }
  }
});

// ============================================
// EXPORT FOR TESTING
// ============================================

// Uncomment if using ES6 modules
// export { ThemeManager, ThemeCustomizer, ColorTransition };

// Make available globally for testing
window.ThemeManager = ThemeManager;
window.ThemeCustomizer = ThemeCustomizer;
