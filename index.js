// ===== SERVICES DATA =====
const services = [
  {
    icon: "i-wrench",
    title: "Plumbing",
    desc: "24/7 emergency pipe repair, water systems, drains and fixture replacements.",
    cta: "Book now",
    featured: true,
  },
  {
    icon: "i-sun",
    title: "Solar/Inverter Engineering",
    desc: "Panel and inverter setup, monitoring, and maintenance to cut electricity bills.",
    cta: "Book now",
  },
  {
    icon: "i-sparkle",
    title: "Cleaning",
    desc: "Deep cleans and routine care for homes and offices with pro-grade products.",
    cta: "Book now",
  },
  {
    icon: "i-wind",
    title: "Air Conditioners",
    desc: "AC servicing, repair, gas refill and installation — cool comfort year round.",
    cta: "Book now",
  },
  {
    icon: "i-roller",
    title: "Painters",
    desc: "Interior, exterior, waterproofing and wall finishes with quality paints.",
    cta: "Book now",
  },
  {
    icon: "i-hammer",
    title: "Carpenters",
    desc: "Furniture, cabinetry, joinery, and repairs by skilled craftsmen.",
    cta: "Book now",
  },
  {
    icon: "i-zap",
    title: "Electricians",
    desc: "Wiring, generator repair, switchboards, inspections — licensed and insured.",
    cta: "Book now",
  },
];

const iconSvg = (id) =>
  `<svg viewBox="0 0 24 24"><use href="#${id}"/></svg>`;

// ===== RENDER SERVICES =====
const grid = document.getElementById("servicesGrid");
grid.innerHTML = services
  .map(
    (s) => `
  <div class="service reveal ${s.featured ? "featured" : ""}" data-service="${s.title}">
    <div class="icon">${iconSvg(s.icon)}</div>
    <h3>${s.title}</h3>
    <p>${s.desc}</p>
    <span class="link book-now" data-service="${s.title}">${s.cta}
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><use href="#i-arrow"/></svg>
    </span>
  </div>
`,
  )
  .join("");

// ===== BOOKING MODAL =====
const modal = document.getElementById("bookingModal");
const modalServiceName = document.getElementById("modalServiceName");
const serviceTypeInput = document.getElementById("serviceType");
const bookingForm = document.getElementById("bookingForm");
const successMessage = document.getElementById("successMessage");
const errorMessage = document.getElementById("errorMessage");
const areaField = document.getElementById("areaField");
const otherAreaInput = document.getElementById("otherArea");
const neighborhoodSelect = document.getElementById("neighborhood");
const modalClose = document.getElementById("modalClose");

function openModal(serviceName) {
  modalServiceName.textContent = "Book " + serviceName;
  serviceTypeInput.value = serviceName;
  neighborhoodSelect.value = "";
  otherAreaInput.value = "";
  otherAreaInput.required = false;
  areaField.classList.remove("visible");
  bookingForm.reset();
  serviceTypeInput.value = serviceName;
  successMessage.classList.remove("active");
  errorMessage.classList.remove("active");
  bookingForm.style.display = "block";
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

// Open modal on service card or book-now click
grid.addEventListener("click", function (e) {
  const card = e.target.closest(".service");
  if (!card) return;
  const serviceName = card.getAttribute("data-service");
  openModal(serviceName);
});

// Also handle direct clicks on book-now links
document.addEventListener("click", function (e) {
  const bookBtn = e.target.closest(".book-now");
  if (!bookBtn) return;
  e.preventDefault();
  const serviceName = bookBtn.getAttribute("data-service");
  openModal(serviceName);
});

// Close modal
modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", function (e) {
  if (e.target === modal) closeModal();
});
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && modal.classList.contains("active")) {
    closeModal();
  }
});

// ===== NEIGHBORHOOD TOGGLE =====
neighborhoodSelect.addEventListener("change", function () {
  if (this.value === "not-listed") {
    areaField.classList.add("visible");
    otherAreaInput.required = true;
  } else {
    areaField.classList.remove("visible");
    otherAreaInput.required = false;
    otherAreaInput.value = "";
  }
});

// ===== EMAILJS CONFIG =====
const EMAILJS_PUBLIC_KEY = "VUo6gDvlr44_37IWw";
const EMAILJS_SERVICE_ID = "service_n6ml95g";
const EMAILJS_TEMPLATE_ID = "template_9s9todf";

// ===== FORM SUBMISSION =====
bookingForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const fullName = document.getElementById("fullName").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const neighborhood = neighborhoodSelect.value;

  if (!fullName || !phone || !neighborhood) return;

  if (neighborhood === "not-listed" && !otherAreaInput.value.trim()) return;

  const formData = {
    service: serviceTypeInput.value,
    name: fullName,
    phone: phone,
    neighborhood: neighborhood,
    otherArea: otherAreaInput.value.trim(),
    message: document.getElementById("message").value.trim(),
  };

  bookingForm.style.display = "none";
  successMessage.classList.add("active");

  emailjs
    .send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        from_name: formData.name,
        phone: formData.phone,
        neighborhood: formData.neighborhood,
        other_area: formData.otherArea || "N/A",
        service: formData.service,
        message: formData.message,
      },
      EMAILJS_PUBLIC_KEY
    )
    .then(function () {
      console.log("Booking email sent successfully");
    })
    .catch(function (error) {
      console.error("Email send failed:", error);
      bookingForm.style.display = "block";
      successMessage.classList.remove("active");
      errorMessage.classList.add("active");
    });
});

// ===== EMAILJS INIT =====
(function () {
  emailjs.init(EMAILJS_PUBLIC_KEY);
})();
const header = document.getElementById("header");
const onScroll = () =>
  header.classList.toggle("scrolled", window.scrollY > 12);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// ===== MOBILE NAV =====
const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav");
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  nav.classList.toggle("open");
});
nav.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    hamburger.classList.remove("active");
    nav.classList.remove("open");
  }),
);

// ===== REVEAL ON SCROLL =====
const revealIo = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        revealIo.unobserve(e.target);
      }
    });
  },
  { threshold: 0.15 },
);
document
  .querySelectorAll(".reveal")
  .forEach((el) => revealIo.observe(el));

// ===== ANIMATED STATS =====
const nums = document.querySelectorAll(".stat .num");
let statsDone = false;
const statsIo = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting && !statsDone) {
        statsDone = true;
        nums.forEach((el) => {
          const target = +el.dataset.target;
          const suffix = el.dataset.suffix || "";
          const start = performance.now();
          const dur = 1600;
          const step = (t) => {
            const p = Math.min(1, (t - start) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            const v = Math.floor(eased * target);
            el.innerHTML =
              v.toLocaleString() + `<span class="plus">${suffix}</span>`;
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        });
      }
    });
  },
  { threshold: 0.3 },
);
const aboutSection = document.getElementById("about");
if (aboutSection) statsIo.observe(aboutSection);