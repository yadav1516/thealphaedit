// import './style.css'

document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const contactForm = document.getElementById('contactForm');

  // Navbar scroll effect
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // Hamburger menu toggle
  if (hamburger && navLinks) {
    console.log('Hamburger and navLinks elements found. Attaching click listener.'); // Debugging line
    hamburger.addEventListener('click', () => {
      console.log('Hamburger clicked! Toggling classes.'); // Debugging line
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
      document.body.classList.toggle('no-scroll'); // Prevent scrolling when mobile menu is open
    });

    // Close mobile menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        console.log('Nav link clicked! Closing menu.'); // Debugging line
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('no-scroll');
      });
    });
  } else {
    console.error('ERROR: Hamburger or navLinks element not found in the DOM!'); // Debugging line
  }

  // Contact form submission
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        service: document.getElementById('service').value,
        message: document.getElementById('message').value
      };

      console.log('Form submitted:', formData);

      // In a real application, you would send this data to a server.
      // For this example, we'll just show an alert.
      alert('Thank you for your message! We will get back to you soon.');

      contactForm.reset();
    });
  }

  // Intersection Observer for scroll animations
  const animateOnScroll = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const animationType = element.dataset.animation || 'fade-in-up';
        const delay = parseInt(element.dataset.delay) || 0;

        setTimeout(() => {
          element.classList.add('is-visible');
        }, delay);

        observer.unobserve(element); // Stop observing once animated
      }
    });
  };

  const observerOptions = {
    root: null, // viewport
    rootMargin: '0px',
    threshold: 0.2 // Trigger when 20% of the element is visible
  };

  const observer = new IntersectionObserver(animateOnScroll, observerOptions);

  // Apply 'animated' class and observe elements
  document.querySelectorAll('[data-animation]').forEach(el => {
    const animationType = el.dataset.animation;
    el.classList.add('animated', animationType);
    observer.observe(el);
  });

  // Initial animations for hero section elements (already visible)
  document.querySelectorAll('.hero-title, .hero-subtitle, .hero-cta').forEach(el => {
    const animationType = el.dataset.animation || 'fade-in-up';
    const delay = parseInt(el.dataset.delay) || 0;
    el.classList.add('animated', animationType);
    setTimeout(() => {
      el.classList.add('is-visible');
    }, delay);
  });
});
