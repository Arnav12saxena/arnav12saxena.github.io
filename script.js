document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  if (loader) loader.style.opacity = 0;

  setTimeout(() => {
    if (loader) loader.style.display = "none";
  }, 400);
});

// Disable scroll while loading
document.body.classList.add("loading");

// Mobile nav toggle
const navToggle = document.getElementById("navToggle");
const navList = document.getElementById("navList");

if (navToggle && navList) {
  navToggle.addEventListener("click", () => {
    navList.classList.toggle("open");
  });
}

// Auto-close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    const navList = document.getElementById('navList');
    navList.classList.remove('open');
  });
});

// Active nav link on scroll
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function setActiveLink() {
  if (!sections.length || !navLinks.length) return;
  let current = sections[0].getAttribute("id");
  const midScreen = window.scrollY + window.innerHeight / 3;

  sections.forEach((section) => {
    const offset = section.offsetTop;
    const height = section.offsetHeight;
    if (midScreen >= offset && midScreen < offset + height) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    const target = link.getAttribute("href") || "";
    link.classList.toggle("active", target === "#" + current);
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

// Tilt direction randomization for clickable cards
function assignRandomTilt() {
  const tiltCards = document.querySelectorAll(".tilt-card");
  tiltCards.forEach((card, index) => {
    const direction = Math.random() > 0.5 ? "left" : "right";
    card.setAttribute("data-tilt", direction);
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
  setTimeout(hideLoader, 600);

  if (window.initParticles) {
    window.initParticles("bgParticles");
  }

  assignRandomTilt();
  setActiveLink();
});

function validateContactForm(e) {
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const msg = document.getElementById("message");

  if (!name.value.trim() || !email.value.trim() || !msg.value.trim()) {
    alert("Please fill out all fields before sending.");
    return false;
  }

  if (!email.value.includes("@") || !email.value.includes(".")) {
    alert("Please enter a valid email address.");
    return false;
  }

  alert("Your message was submitted successfully!");

  // Clear fields
  name.value = "";
  email.value = "";
  msg.value = "";

  return false;
}

window.addEventListener("load", () => {
  // Re-enable scroll when loading is done
  document.body.classList.remove("loading");
});

// Mobile menu toggle
const navToggle = document.getElementById("navToggle");
const navList = document.getElementById("navList");

navToggle.addEventListener("click", () => {
  navList.classList.toggle("open");
});

// Close menu after clicking a link (mobile)
document.querySelectorAll("#navList .nav-link").forEach(link => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      navList.classList.remove("open");
    }
  });
});


