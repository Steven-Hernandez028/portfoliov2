// Main TypeScript file

// DOM Elements
const loadingScreen = document.querySelector('.loading-screen') as HTMLElement;
const cursor = document.querySelector('.cursor') as HTMLElement;
const cursorFollower = document.querySelector('.cursor-follower') as HTMLElement;
const sections = document.querySelectorAll('section');
const links = document.querySelectorAll('a');
const buttons = document.querySelectorAll('button');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle') as HTMLElement;
const mainNav = document.querySelector('.main-nav') as HTMLElement;

// Mobile Menu Toggle
mobileMenuToggle.addEventListener('click', () => {
  mobileMenuToggle.classList.toggle('active');
  mainNav.classList.toggle('active');

  // Prevent scrolling when menu is open
  if (mainNav.classList.contains('active')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});

// Close menu when clicking on links
const navLinks = mainNav.querySelectorAll('a');
for (const link of navLinks) {
  link.addEventListener('click', () => {
    mobileMenuToggle.classList.remove('active');
    mainNav.classList.remove('active');
    document.body.style.overflow = '';
  });
}

// Custom cursor functionality
document.addEventListener('mousemove', (e) => {
  // Update cursor position
  cursor.style.transform = `translate(${e.clientX+16}px, ${e.clientY+15}px)`;

  // Add a slight delay to the follower for a smooth effect
  setTimeout(() => {
    cursorFollower.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  }, 50);
});

// Cursor effects on interactive elements
const handleMouseEnter = () => {
  cursor.style.transform = 'scale(1.5)';
  cursorFollower.style.width = '70px';
  cursorFollower.style.height = '70px';
  cursorFollower.style.border = '1px solid rgba(87, 116, 224, 0.5)';
};

const handleMouseLeave = () => {
  cursor.style.transform = 'scale(1)';
  cursorFollower.style.width = '40px';
  cursorFollower.style.height = '40px';
  cursorFollower.style.border = '1px solid rgba(87, 116, 224, 1)';
};

// Add hover effect for all links and buttons
for (const link of links) {
  link.addEventListener('mouseenter', handleMouseEnter);
  link.addEventListener('mouseleave', handleMouseLeave);
}

for (const button of buttons) {
  button.addEventListener('mouseenter', handleMouseEnter);
  button.addEventListener('mouseleave', handleMouseLeave);
}

window.addEventListener('load', () => {
  setTimeout(() => {
    loadingScreen.classList.add('hidden');
  }, 1000);
});

const observerOptions = {
  root: null, 
  rootMargin: '-10% 0px', 
  threshold: 0.1 
};

const sectionObserver = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-in-view');
    } else {
      entry.target.classList.remove('is-in-view');
    }
  }
}, observerOptions);

for (const section of sections) {
  sectionObserver.observe(section);
}

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  const parallaxElements = document.querySelectorAll('.parallax');
  for (const element of parallaxElements) {
    const speed = element.getAttribute('data-speed') || '0.1';
    const direction = element.getAttribute('data-direction') || 'up';

    let yPos = 0;
    if (direction === 'up') {
      yPos = -scrollY * Number.parseFloat(speed);
    } else {
      yPos = scrollY * Number.parseFloat(speed);
    }

    element.setAttribute('style', `transform: translateY(${yPos}px)`);
  }
});

// Smooth scrolling for anchor links
const anchorLinks = document.querySelectorAll('a[href^="#"]');
for (const anchor of anchorLinks) {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();

    const targetId = anchor.getAttribute('href') as string;
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.getBoundingClientRect().top + window.scrollY,
        behavior: 'smooth'
      });
    }
  });
}

window.addEventListener('scroll', () => {
  const header = document.querySelector('.site-header');
  if (window.scrollY > 50) {
    console.log('Header scrolled');
    header?.classList.add('scrolled');
  } else {
    header?.classList.remove('scrolled');
  }
});
