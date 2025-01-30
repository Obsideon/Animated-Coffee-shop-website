// Fade-in animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const fadeElements = document.querySelectorAll(
  ".picks-section, .card, .hero-content, .cta"
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

fadeElements.forEach((element) => {
  element.classList.add("fade-element");
  observer.observe(element);
});

// Floating animation for hero images
const heroImages = document.querySelectorAll(".floating-image");
heroImages.forEach((img, index) => {
  img.style.animation = `float ${
    2 + index * 0.5
  }s ease-in-out infinite alternate`;
});

// Carousel functionality with smooth transitions
document.addEventListener("DOMContentLoaded", () => {
  const carousels = document.querySelectorAll(".carousel");

  carousels.forEach((carousel) => {
    const items = carousel.querySelector(".carousel-items");
    const prevBtn = carousel.querySelector(".prev");
    const nextBtn = carousel.querySelector(".next");

    let scrollAmount = 0;
    const cardWidth = 270; // card width + gap

    nextBtn.addEventListener("click", () => {
      scrollAmount += cardWidth;
      if (scrollAmount > items.scrollWidth - items.clientWidth) {
        scrollAmount = 0;
      }
      items.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    });

    prevBtn.addEventListener("click", () => {
      scrollAmount -= cardWidth;
      if (scrollAmount < 0) {
        scrollAmount = items.scrollWidth - items.clientWidth;
      }
      items.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    });
  });
});

// Smooth scroll for navigation with animation
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Add hover animation for buttons
const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
  button.addEventListener("mouseover", () => {
    button.style.transform = "scale(1.05)";
    button.style.transition = "all 0.3s ease";
  });

  button.addEventListener("mouseout", () => {
    button.style.transform = "scale(1)";
  });
});

// Animate cards on hover
const cards = document.querySelectorAll(".card");
cards.forEach((card) => {
  card.addEventListener("mouseover", () => {
    card.style.transform = "translateY(-10px)";
    card.style.transition = "all 0.3s ease";
    card.style.boxShadow = "0 10px 20px rgba(0,0,0,0.2)";
  });

  card.addEventListener("mouseout", () => {
    card.style.transform = "translateY(0)";
    card.style.boxShadow = "none";
  });
});

// Text pop-up animation
document.addEventListener("DOMContentLoaded", () => {
  // Add classes to elements we want to animate
  const textElements = document.querySelectorAll(
    "h1, h2, h3, p, .card-title, .price"
  );

  textElements.forEach((element, index) => {
    // Add base animation class
    element.classList.add("pop-up-text");

    // Add delay class based on element position
    const delayClass = `delay-${(index % 5) + 1}`;
    element.classList.add(delayClass);

    // Add highlight effect to headings
    if (
      element.tagName.toLowerCase() === "h1" ||
      element.tagName.toLowerCase() === "h2"
    ) {
      element.classList.add("highlight-text");
    }
  });

  // Create intersection observer for animation triggers
  const observerOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        // Optional: Unobserve after animation
        // observer.unobserve(entry.target);
      } else {
        // Optional: Remove class when out of view for re-animation
        entry.target.classList.remove("visible");
      }
    });
  }, observerOptions);

  // Observe all text elements
  textElements.forEach((element) => {
    observer.observe(element);
  });

  // Trigger initial animations for elements in view
  setTimeout(() => {
    const initialElements = document.querySelectorAll(".pop-up-text");
    initialElements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        element.classList.add("visible");
      }
    });
  }, 100);
});

// Add animation to new elements (for dynamic content)
function animateNewElement(element) {
  element.classList.add("pop-up-text");
  setTimeout(() => {
    element.classList.add("visible");
  }, 100);
}

// Optional: Add scroll-triggered animations for specific sections
document.addEventListener("scroll", () => {
  const scrollPosition = window.scrollY;
  const windowHeight = window.innerHeight;

  document.querySelectorAll(".picks-section, .cta").forEach((section) => {
    const sectionTop = section.offsetTop;

    if (scrollPosition > sectionTop - windowHeight * 0.8) {
      section
        .querySelectorAll(".pop-up-text:not(.visible)")
        .forEach((element, index) => {
          setTimeout(() => {
            element.classList.add("visible");
          }, index * 100);
        });
    }
  });
});
