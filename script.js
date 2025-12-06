// Mobile nav toggle
const navToggle = document.getElementById("navToggle");
const navList = document.getElementById("navList");

if (navToggle && navList) {
  navToggle.addEventListener("click", () => {
    navList.classList.toggle("open");
  });
}

// Active nav link on scroll
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function setActiveLink() {
  let current = "";
  const top = window.scrollY;

  sections.forEach((section) => {
    const offset = section.offsetTop - 120;
    const height = section.offsetHeight;
    if (top >= offset && top < offset + height) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", setActiveLink);

// Scroll reveal using IntersectionObserver
const revealItems = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15
  }
);

revealItems.forEach((item) => observer.observe(item));

// Set year
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Dark / light theme toggle with localStorage
const themeToggle = document.getElementById("themeToggle");
const body = document.body;
const storedTheme = localStorage.getItem("theme");

if (storedTheme === "light") {
  body.classList.remove("theme-dark");
  body.classList.add("theme-light");
} else {
  body.classList.add("theme-dark");
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    if (body.classList.contains("theme-dark")) {
      body.classList.remove("theme-dark");
      body.classList.add("theme-light");
      localStorage.setItem("theme", "light");
    } else {
      body.classList.remove("theme-light");
      body.classList.add("theme-dark");
      localStorage.setItem("theme", "dark");
    }
  });
}

// Tilt direction randomization for cards
function assignRandomTilt() {
  const tiltCards = document.querySelectorAll(".tilt-card");
  tiltCards.forEach((card, index) => {
    // alternate a bit but keep some variation
    const direction = Math.random() > 0.5 ? "left" : "right";
    card.setAttribute("data-tilt", direction);

    // subtle staggered animation on load
    card.style.transitionDelay = (index * 0.02).toFixed(2) + "s";
  });
}

// Loader hide
function hideLoader() {
  const loader = document.getElementById("loader");
  if (!loader) return;
  loader.classList.add("hidden");
}

window.addEventListener("load", () => {
  // Small timeout for smoother effect
  setTimeout(hideLoader, 600);

  // Init particles
  if (window.initParticles) {
    window.initParticles("bgParticles");
  }

  // Assign tilt
  assignRandomTilt();
});
