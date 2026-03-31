// Feature: header changes on scroll

// Config
const THRESHOLD = 300;

const stateConfig = {
  original: {
    headerAdd: ["bg-transparent"],
    headerRemove: ["bg-main"],
    logoSrc: null, // Will be filled at init
    buttonAdd: ["bg-main", "text-white"],
    buttonRemove: ["bg-accent", "text-body"],
  },
  scrolled: {
    headerAdd: ["bg-main"],
    headerRemove: ["bg-transparent"],
    logoSrc: "media/logo_light.webp",
    buttonAdd: ["bg-accent", "text-body"],
    buttonRemove: ["bg-main", "text-white"],
  },
};

// Cached DOM & state
const header = document.querySelector("header");
const logo = header ? header.querySelector("img") : null;
const button = header ? header.querySelector("button") : null;
let lastState = null; // Will be set to 'top' or 'scrolled'

// Initializes original.logoSrc
if (logo) stateConfig.original.logoSrc = logo.getAttribute("src");

// Helpers
function addClasses(element, classes) {
  if (!element || !classes) return;
  classes.forEach((c) => element.classList.add(c));
}
function removeClasses(element, classes) {
  if (!element || !classes) return;
  classes.forEach((c) => element.classList.remove(c));
}
function setLogoSrc(src) {
  if (!logo || !src) return;
  logo.setAttribute("src", src);
}

// State appliers
function applyScrolled() {
  if (!header || lastState === "scrolled") return;
  addClasses(header, stateConfig.scrolled.headerAdd);
  removeClasses(header, stateConfig.scrolled.headerRemove);
  setLogoSrc(stateConfig.scrolled.logoSrc);
  if (button) {
    addClasses(button, stateConfig.scrolled.buttonAdd);
    removeClasses(button, stateConfig.scrolled.buttonRemove);
  }
  lastState = "scrolled";
}

function applyTop() {
  if (!header || lastState === "top") return;
  addClasses(header, stateConfig.original.headerAdd);
  removeClasses(header, stateConfig.original.headerRemove);
  setLogoSrc(stateConfig.original.logoSrc);
  if (button) {
    addClasses(button, stateConfig.original.buttonAdd);
    removeClasses(button, stateConfig.original.buttonRemove);
  }
  lastState = "top";
}

// Scroll handler
function onScroll() {
  const y = window.scrollY || window.pageYOffset;
  if (y >= THRESHOLD) applyScrolled();
  else applyTop();
}

// Listener (passive for performance)
window.addEventListener("scroll", onScroll, { passive: true });

// Initialized immediately based on current position
onScroll();