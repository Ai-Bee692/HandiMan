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
          title: "Solar Engineering",
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

      const grid = document.getElementById("servicesGrid");
      grid.innerHTML = services
        .map(
          (s) => `
    <a href="#services" class="service reveal ${s.featured ? "featured" : ""}">
      <div class="icon">${iconSvg(s.icon)}</div>
      <h3>${s.title}</h3>
      <p>${s.desc}</p>
      <span class="link">${s.cta}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><use href="#i-arrow"/></svg>
      </span>
    </a>
  `,
        )
        .join("");

      // ===== HEADER SCROLL =====
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