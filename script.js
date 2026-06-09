const progress = document.querySelector(".page-progress");
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");
const gallery = document.querySelector(".case-gallery");
const galleryPrev = document.querySelector(".gallery-prev");
const galleryNext = document.querySelector(".gallery-next");

const updateProgress = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
};

window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

menuButton.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(open));
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -40px" });

document.querySelectorAll(".reveal").forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
  observer.observe(element);
});

const galleryStep = () => Math.min(gallery.clientWidth * 0.72, 860);
galleryPrev.addEventListener("click", () => gallery.scrollBy({ left: -galleryStep(), behavior: "smooth" }));
galleryNext.addEventListener("click", () => gallery.scrollBy({ left: galleryStep(), behavior: "smooth" }));
