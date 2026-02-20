// ============================================
// FORM.JS - Form Validation & Handling
// ============================================

/**
 * Form Validator Class
 */
class FormValidator {
  constructor(formSelector) {
    this.form = document.querySelector(formSelector);
    this.fields = {};

    if (this.form) {
      this.init();
    }
  }

  /**
   * Initialize form validation
   */
  init() {
    const inputs = this.form.querySelectorAll("input, textarea");

    inputs.forEach((input) => {
      this.fields[input.name] = {
        element: input,
        rules: this.getValidationRules(input),
      };

      // Real-time validation
      input.addEventListener("blur", () => this.validateField(input.name));
      input.addEventListener("change", () => this.validateField(input.name));
    });

    // Form submission
    this.form.addEventListener("submit", (e) => this.handleSubmit(e));
  }

  /**
   * Get validation rules from data attributes
   */
  getValidationRules(input) {
    return {
      type: input.type,
      required: input.hasAttribute("required"),
      minLength: input.getAttribute("minlength"),
      maxLength: input.getAttribute("maxlength"),
      pattern: input.getAttribute("pattern"),
    };
  }

  /**
   * Validate a single field
   */
  validateField(fieldName) {
    const field = this.fields[fieldName];
    const input = field.element;
    const rules = field.rules;
    const value = input.value.trim();

    let isValid = true;
    let errorMessage = "";

    // Check required
    if (rules.required && value === "") {
      isValid = false;
      errorMessage = `${input.name} is required`;
    }
    // Check email
    else if (input.type === "email" && value !== "") {
      if (!this.isValidEmail(value)) {
        isValid = false;
        errorMessage = "Please enter a valid email address";
      }
    }
    // Check min length
    else if (rules.minLength && value.length < rules.minLength) {
      isValid = false;
      errorMessage = `Minimum length is ${rules.minLength} characters`;
    }
    // Check max length
    else if (rules.maxLength && value.length > rules.maxLength) {
      isValid = false;
      errorMessage = `Maximum length is ${rules.maxLength} characters`;
    }
    // Check pattern
    else if (rules.pattern && value !== "") {
      const pattern = new RegExp(rules.pattern);
      if (!pattern.test(value)) {
        isValid = false;
        errorMessage = "Invalid format";
      }
    }

    // Update UI
    this.updateFieldUI(input, isValid, errorMessage);

    return isValid;
  }

  /**
   * Update field UI based on validation result
   */
  updateFieldUI(input, isValid, errorMessage) {
    const formGroup = input.closest(".form-group");
    const errorElement = formGroup.querySelector(".error-msg");

    if (isValid) {
      formGroup.classList.remove("error");
      errorElement.textContent = "";
    } else {
      formGroup.classList.add("error");
      errorElement.textContent = errorMessage;
    }
  }

  /**
   * Validate entire form
   */
  validateForm() {
    let isValid = true;

    for (const fieldName in this.fields) {
      if (!this.validateField(fieldName)) {
        isValid = false;
      }
    }

    return isValid;
  }

  /**
   * Check if email is valid
   */
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Handle form submission
   */
  handleSubmit(e) {
    e.preventDefault();

    // Validate form
    if (!this.validateForm()) {
      console.log("Form has validation errors");
      return;
    }

    // Collect form data
    const formData = new FormData(this.form);
    const data = Object.fromEntries(formData);

    // Handle submission
    this.submitForm(data);
  }

  /**
   * Submit form (simulate or send)
   */
  submitForm(data) {
    console.log("Form submitted with data:", data);

    // Show loading state
    this.setSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      this.handleSuccess(data);
    }, 1500);
  }

  /**
   * Handle successful submission
   */
  handleSuccess(data) {
    this.setSubmitting(false);

    // Show success message
    this.showMessage(
      "Thank you! Your message has been sent. I will get back to you soon.",
      "success",
    );

    // Log the message
    console.log("Message received:", {
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      timestamp: new Date().toISOString(),
    });

    // Copy to clipboard (optional)
    this.copyToClipboard({
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
    });

    // Reset form
    this.form.reset();

    // Clear error states
    this.form.querySelectorAll(".form-group").forEach((group) => {
      group.classList.remove("error");
      const errorMsg = group.querySelector(".error-msg");
      if (errorMsg) errorMsg.textContent = "";
    });
  }

  /**
   * Handle form error
   */
  handleError(error) {
    this.setSubmitting(false);
    this.showMessage("An error occurred. Please try again.", "error");
    console.error("Form submission error:", error);
  }

  /**
   * Set form submitting state
   */
  setSubmitting(isSubmitting) {
    const submitBtn = this.form.querySelector('button[type="submit"]');

    if (isSubmitting) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";
    } else {
      submitBtn.disabled = false;
      submitBtn.textContent = "Send Message";
    }
  }

  /**
   * Show success/error message
   */
  showMessage(message, type = "success") {
    // Create message element
    const messageDiv = document.createElement("div");
    messageDiv.className = `form-message form-message-${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
            padding: 12px 16px;
            margin-bottom: 16px;
            border-radius: 8px;
            background-color: ${type === "success" ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)"};
            color: ${type === "success" ? "#10b981" : "#ef4444"};
            border-left: 4px solid ${type === "success" ? "#10b981" : "#ef4444"};
            animation: slideUp 0.3s ease-out;
        `;

    // Insert before form
    this.form.insertBefore(messageDiv, this.form.firstChild);

    // Remove message after 5 seconds
    setTimeout(() => {
      messageDiv.style.animation = "slideDown 0.3s ease-out backwards";
      setTimeout(() => messageDiv.remove(), 300);
    }, 5000);
  }

  /**
   * Copy data to clipboard
   */
  copyToClipboard(data) {
    const text = `
Name: ${data.name}
Email: ${data.email}
Subject: ${data.subject}

Message:
${data.message}

---
Sent at: ${new Date().toLocaleString()}
        `.trim();

    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Message copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy:", err);
      });
  }

  /**
   * Reset form to initial state
   */
  reset() {
    this.form.reset();
    this.form.querySelectorAll(".form-group").forEach((group) => {
      group.classList.remove("error");
    });
  }
}

/**
 * Initialize form validator
 */
function initFormValidator() {
  const contactForm = new FormValidator("#contactForm");

  // Optional: Expose to window for external access
  window.contactForm = contactForm;

  console.log("Form validator initialized");
}

/**
 * Alternative: Send form data via Fetch API
 * Note: This would require a backend endpoint
 */
function sendFormViaFetch(data) {
  // Replace with your actual API endpoint
  const apiEndpoint = "/api/contact";

  fetch(apiEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

/**
 * Alternative: Send form data via email (using third-party service)
 * Example: EmailJS, Formspree, or similar
 */
function sendFormViaEmailService(data) {
  // Example using EmailJS
  // Note: Requires EmailJS library to be loaded
  /*
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
        to_email: data.email,
        from_name: data.name,
        subject: data.subject,
        message: data.message
    });
    */
}

/**
 * Utility: Get form data as object
 */
function getFormData(form) {
  const formData = new FormData(form);
  return Object.fromEntries(formData);
}

/**
 * Utility: Set form data from object
 */
function setFormData(form, data) {
  for (const [key, value] of Object.entries(data)) {
    const field = form.elements[key];
    if (field) {
      field.value = value;
    }
  }
}

/**
 * Utility: Clear all form fields
 */
function clearForm(form) {
  form.reset();
}

/**
 * Password strength indicator (for future use)
 */
class PasswordStrengthIndicator {
  constructor(inputSelector, indicatorSelector) {
    this.input = document.querySelector(inputSelector);
    this.indicator = document.querySelector(indicatorSelector);

    if (this.input && this.indicator) {
      this.input.addEventListener("input", () => this.updateStrength());
    }
  }

  updateStrength() {
    const password = this.input.value;
    const strength = this.calculateStrength(password);

    this.indicator.className = `strength-${strength.level}`;
    this.indicator.textContent = strength.label;
  }

  calculateStrength(password) {
    if (password.length === 0) {
      return { level: "empty", label: "" };
    }
    if (password.length < 6) {
      return { level: "weak", label: "Weak" };
    }
    if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
      return { level: "fair", label: "Fair" };
    }
    if (!/[!@#$%^&*]/.test(password)) {
      return { level: "good", label: "Good" };
    }
    return { level: "strong", label: "Strong" };
  }
}

// ============================================
// INITIALIZE ON DOM LOAD
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  initFormValidator();
});

// ============================================
// EXPORT FOR TESTING
// ============================================

// Uncomment if using ES6 modules
// export { FormValidator, PasswordStrengthIndicator };
