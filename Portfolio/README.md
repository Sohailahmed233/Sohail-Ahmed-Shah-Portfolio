# Professional Portfolio Website

A modern, responsive personal portfolio website built with vanilla HTML5, CSS3, and JavaScript (ES6+). Designed for showcasing projects, skills, and contact information to recruiters and collaborators.

## 🎯 Features

- **Responsive Design** - Mobile-first approach, works perfectly on all devices (320px - 1920px+)
- **Dark/Light Mode** - Toggle between dark and light themes with persistent localStorage
- **Smooth Animations** - CSS animations and JavaScript scroll effects
- **Hero Section** - Eye-catching introduction with call-to-action buttons
- **About Section** - Personal bio and background information
- **Skills Section** - Visual skill bars with categorization
- **Projects Showcase** - Responsive grid with project cards and overlays
- **Contact Form** - Client-side validation with success/error messages
- **Sticky Navigation** - Always-accessible navigation with smooth scrolling
- **Mobile Menu** - Hamburger menu for mobile devices
- **Performance Optimized** - Lightweight and fast-loading (3 seconds or less)
- **SEO-Friendly** - Semantic HTML, meta tags, and structured content
- **Accessibility** - ARIA labels, keyboard navigation, and alt text

## 📁 Project Structure

```
Portfolio/
├── index.html                    # Main HTML file
├── css/
│   ├── style.css               # Core styles & components
│   ├── animations.css          # Animations & keyframes
│   └── responsive.css          # Media queries & breakpoints
├── js/
│   ├── main.js                 # Navigation & DOM manipulation
│   ├── scroll.js               # Scroll animations & effects
│   ├── form.js                 # Form validation & handling
│   └── theme.js                # Dark/light mode toggle
├── assets/
│   ├── images/
│   │   ├── hero/               # Hero section images
│   │   ├── projects/           # Project screenshots
│   │   └── about/              # Profile photos
│   └── icons/                  # Optional SVG icons
├── README.md                   # This file
└── .gitignore                  # Git ignore file
```

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Optional: A local development server (Python, Node.js, or VS Code Live Server)

### Installation

1. **Clone or download** the portfolio files to your computer

2. **Update content** in `index.html`:
   - Replace placeholder text with your name, bio, and information
   - Update skills, projects, and contact details

3. **Add images**:
   - Place your profile photo in `assets/images/about/`
   - Add project screenshots to `assets/images/projects/`
   - Add hero section image to `assets/images/hero/`

4. **Customize colors** (optional):
   - Edit CSS variables in `css/style.css` (lines 7-25)
   - Change accent colors, fonts, and spacing as needed

5. **Open in browser**:
   - Simply open `index.html` in your web browser, or
   - Run a local server: `python -m http.server` or use VS Code Live Server

## 🎨 Customization

### Color Scheme

Edit CSS custom properties in `css/style.css`:

```css
:root {
  /* Dark Theme Colors */
  --bg-primary: #1a1a2e; /* Main background */
  --text-primary: #e0e0e0; /* Main text */
  --accent-primary: #00d4ff; /* Primary accent (cyan) */
  --accent-secondary: #7c3aed; /* Secondary accent (purple) */
  /* ... more variables ... */
}
```

### Typography

Change fonts in the `:root` section:

```css
:root {
  --font-primary: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
```

### Spacing & Layout

Modify spacing variables:

```css
:root {
  --spacing-sm: 1rem;
  --spacing-md: 1.5rem;
  --spacing-lg: 2rem;
  --spacing-xl: 3rem;
}
```

## 📝 Content Updates

### Update Personal Information

Edit these sections in `index.html`:

1. **Hero Title** (line 49):

   ```html
   <h1 class="hero-title">Hi, I'm <span class="accent">Sohail</span></h1>
   ```

2. **Skills** (lines 149-198):
   - Modify skill names and percentages
   - Add or remove skill categories

3. **Projects** (lines 217-281):
   - Update project titles, descriptions, and links
   - Change technology tags

4. **Contact Info** (lines 315-327):
   - Update email, location, and social links

## 🎬 JavaScript Features

### Mobile Menu Toggle

The hamburger menu automatically appears on screens smaller than 1024px.

### Smooth Scrolling

Click navigation links for smooth scrolling to sections.

### Form Validation

The contact form validates:

- Required fields
- Email format
- Field length limits

Messages are validated on submit and blur events.

### Theme Toggle

Click the sun/moon icon to toggle between dark and light modes. Your preference is saved in localStorage.

### Scroll Animations

Elements animate into view as you scroll:

- Fade in effects
- Slide up animations
- Scale transitions
- Skill bars fill up

## 🌐 Deployment

### GitHub Pages (Recommended)

1. Create a GitHub repository named `username.github.io`
2. Push your portfolio files to the repository
3. Your site will be live at `https://username.github.io`

**Enable custom domain** (optional):

1. Create a `CNAME` file with your domain name
2. Configure DNS settings with your domain provider

### Other Hosting Options

- **Netlify**: Drag and drop your files
- **Vercel**: Connect GitHub repository
- **AWS S3 + CloudFront**: For advanced users
- **Shared Hosting**: Upload via FTP

## 📊 Performance Optimization

The portfolio is optimized for performance:

- ✅ Lightweight CSS (no frameworks)
- ✅ Vanilla JavaScript (no libraries)
- ✅ Optimized images (use compression tools)
- ✅ Minimal HTTP requests
- ✅ Fast load time (< 3 seconds)

**Lighthouse Scores Target:**

- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 90+

## ♿ Accessibility

The portfolio includes:

- Semantic HTML elements
- Alt text for images
- ARIA labels for buttons
- Keyboard navigation support
- High contrast colors
- Focus states for interactive elements

## 🔒 Browser Support

- Chrome/Chromium (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🐛 Troubleshooting

### Images not loading

- Check file paths in HTML
- Ensure image files exist in `assets/images/` folders
- Use relative paths: `assets/images/hero/image.jpg`

### Form not submitting

- Check browser console for errors
- Verify form input names match validation rules
- Ensure JavaScript files are loaded

### Styles not applying

- Clear browser cache (Ctrl+Shift+Delete)
- Check CSS file links in HTML `<head>`
- Verify CSS file paths are correct

### Mobile menu not working

- Check if JavaScript files are loaded
- Verify media query breakpoints in responsive.css
- Test in actual mobile device or emulator

## 📚 Additional Resources

- [HTML5 Semantic Elements](https://developer.mozilla.org/en-US/docs/Glossary/Semantic_HTML)
- [CSS Grid & Flexbox](https://css-tricks.com/)
- [JavaScript ES6+](https://javascript.info/)
- [Web Accessibility](https://www.a11y-101.com/)
- [Responsive Design](https://web.dev/responsive-web-design-basics/)

## 📄 License

This portfolio template is free to use and modify for personal use. Feel free to use it as a starting point for your own portfolio.

## 👤 Author

Created as a professional portfolio template. Customize it with your own information and projects.

## 🤝 Contributing

This is your personal portfolio! Feel free to:

- Modify the design
- Add new features
- Improve animations
- Optimize performance

## 🎓 Learning Resources

To extend this portfolio, consider learning about:

- **Backend Integration**: Node.js, Express, or Python Flask
- **Database**: MongoDB, PostgreSQL for dynamic content
- **APIs**: Connect to GitHub, LinkedIn, or other services
- **Frameworks**: Consider React, Vue, or Svelte for complex features
- **CMS**: Use Headless CMS for easier content management

## 📞 Questions & Support

For questions about the code:

1. Check the comments in each file
2. Review the MDN Web Docs
3. Search StackOverflow for specific issues
4. Test in browser DevTools console

---

**Last Updated:** February 2026

Happy coding! 🚀
