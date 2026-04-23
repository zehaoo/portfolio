const revealItems = document.querySelectorAll(".reveal");
const timelineItems = document.querySelectorAll(".timeline-reveal");

const showAllRevealItems = () => {
  revealItems.forEach((item) => item.classList.add("visible"));
};

if (!("IntersectionObserver" in window)) {
  showAllRevealItems();
} else {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealItems.forEach((item) => revealObserver.observe(item));

  // Ensures the first screen is readable in environments where observers are late.
  window.setTimeout(showAllRevealItems, 900);
}

if ("IntersectionObserver" in window) {
  const timelineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("is-active", entry.isIntersecting);
      });
    },
    {
      threshold: 0.45,
      rootMargin: "-10% 0px -20% 0px",
    }
  );

  timelineItems.forEach((item, index) => {
    if (index === 0) {
      item.classList.add("is-active");
    }

    timelineObserver.observe(item);
  });
} else {
  timelineItems.forEach((item) => item.classList.add("is-active"));
}
