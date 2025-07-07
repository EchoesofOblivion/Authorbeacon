
// Enhanced includes.js with navigation highlighting and smooth interactions

function loadHTML(id, file) {
  const element = document.getElementById(id);
  if (!element) return;

  // Add loading state
  element.classList.add('loading');

  fetch(file)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then(data => {
      element.innerHTML = data;
      element.classList.remove('loading');
      
      // Initialize navigation highlighting after header is loaded
      if (id === 'header') {
        initializeNavigation();
      }
    })
    .catch(error => {
      console.error('Error loading HTML:', error);
      element.classList.remove('loading');
    });
}

function initializeNavigation() {
  // Get current page
  const currentPath = window.location.pathname;
  const currentPage = currentPath.split('/').pop() || 'index.html';
  
  // Find all navigation links
  const navLinks = document.querySelectorAll('nav a, .main-nav a');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    
    // Remove any existing active class
    link.classList.remove('active');
    
    // Add active class to current page link
    if (href === currentPage || 
        (currentPage === '' && href === 'index.html') ||
        (currentPage === 'index.html' && href === 'index.html')) {
      link.classList.add('active');
    }
    
    // Add smooth hover effects
    link.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
    });
    
    link.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
}

// Enhanced carousel functionality
function initializeCarousel() {
  const slides = document.querySelectorAll('.quote-slide');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  
  if (!slides.length) return;
  
  let currentSlide = 0;
  
  function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
  }
  
  function nextSlide() {
    showSlide(currentSlide + 1);
  }
  
  function prevSlide() {
    showSlide(currentSlide - 1);
  }
  
  // Event listeners
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  
  // Auto-advance slides
  setInterval(nextSlide, 5000);
  
  // Initialize first slide
  showSlide(0);
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Intersection Observer for animations
function initializeAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);
  
  // Observe elements for animation
  document.querySelectorAll('.content-card, .service-item, .feedback-card').forEach(el => {
    observer.observe(el);
  });
}

// Enhanced form interactions
function initializeFormEnhancements() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
      // Add focus effects
      input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
      });
      
      input.addEventListener('blur', function() {
        this.parentElement.classList.remove('focused');
        if (this.value.trim() !== '') {
          this.parentElement.classList.add('filled');
        } else {
          this.parentElement.classList.remove('filled');
        }
      });
    });
  });
}

// Loading states for buttons
function initializeButtonStates() {
  document.querySelectorAll('button, .btn').forEach(btn => {
    btn.addEventListener('click', function() {
      if (!this.classList.contains('no-loading')) {
        this.classList.add('loading');
        setTimeout(() => {
          this.classList.remove('loading');
        }, 1000);
      }
    });
  });
}

// Enhanced DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
  // Load HTML partials
  loadHTML("header", "partials/header.html");
  loadHTML("footer", "partials/footer.html");
  
  // Initialize all enhancements
  setTimeout(() => {
    initializeCarousel();
    initializeSmoothScrolling();
    initializeAnimations();
    initializeFormEnhancements();
    initializeButtonStates();
  }, 100);
});

// Window load event for final touches
window.addEventListener('load', function() {
  // Remove any remaining loading states
  document.querySelectorAll('.loading').forEach(el => {
    el.classList.remove('loading');
  });
  
  // Add loaded class to body
  document.body.classList.add('loaded');
});

// Handle window resize
window.addEventListener('resize', function() {
  // Reinitialize carousel on resize
  initializeCarousel();
});
