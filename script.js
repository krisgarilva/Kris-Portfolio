// year
const yearEl = document.getElementById("y");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// --- Starfield ---
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

let w, h, dpr;
function resize() {
  dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
  w = canvas.width = Math.floor(window.innerWidth * dpr);
  h = canvas.height = Math.floor(window.innerHeight * dpr);
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";
}
window.addEventListener("resize", resize);
resize();

const STAR_COUNT = 170;
const stars = Array.from({ length: STAR_COUNT }, () => ({
  x: Math.random(),
  y: Math.random(),
  r: Math.random() * 1.2 + 0.2,
  tw: Math.random() * 0.6 + 0.2,
  sp: (Math.random() * 0.25 + 0.05) * (Math.random() < 0.5 ? 1 : -1),
}));

let t = 0;
function drawStars() {
  ctx.clearRect(0, 0, w, h);

  const g = ctx.createRadialGradient(
    w * 0.5,
    h * 0.4,
    50,
    w * 0.5,
    h * 0.5,
    Math.max(w, h) * 0.8,
  );
  g.addColorStop(0, "rgba(0,0,0,0)");
  g.addColorStop(1, "rgba(0,0,0,.45)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  for (const s of stars) {
    const px = s.x * w;
    const py = s.y * h;
    const twinkle = 0.55 + Math.sin(t * s.tw + s.x * 10) * 0.35;

    ctx.beginPath();
    ctx.fillStyle = `rgba(255,255,255,${0.85 * twinkle})`;
    ctx.arc(px, py, s.r * dpr, 0, Math.PI * 2);
    ctx.fill();

    s.y += s.sp * 0.0008;
    if (s.y < -0.05) s.y = 1.05;
    if (s.y > 1.05) s.y = -0.05;
  }

  const aur = ctx.createLinearGradient(0, h * 0.2, w, h * 0.85);
  aur.addColorStop(0, "rgba(34,243,255,.03)");
  aur.addColorStop(0.5, "rgba(167,139,250,.03)");
  aur.addColorStop(1, "rgba(94,234,212,.03)");
  ctx.fillStyle = aur;
  ctx.fillRect(0, 0, w, h);

  t += 0.02;
  requestAnimationFrame(drawStars);
}
drawStars();

/* =========================
   KG SCROLL SIGNATURE
========================= */
(function initKGSignature() {
  const section = document.getElementById("kgScroll");
  const initials = document.getElementById("kgInitials");
  const name = document.getElementById("kgName");
  if (!section || !initials || !name) return;

  const ring = section.querySelector(".kg-ring");
  let ticking = false;

  function clamp(v, min, max) {
    return Math.max(min, Math.min(max, v));
  }

  function render() {
    const rect = section.getBoundingClientRect();
    const travel = Math.max(
      1,
      section.offsetHeight - window.innerHeight * 0.42,
    );
    const progress = clamp(-rect.top / travel, 0, 1);
    const arc = progress <= 0.5 ? progress / 0.5 : (1 - progress) / 0.5;
    const midpoint = 1 - clamp(Math.abs(progress - 0.5) / 0.16, 0, 1);

    const flip = progress * 360;
    const lift = -arc * 26;
    const scale = 0.38 + arc * 0.98;
    const ringScale = scale;

    initials.style.transform = `translate3d(0, ${lift}px, 0) rotateY(${flip}deg) scale(${scale})`;
    initials.style.opacity = String(1 - midpoint * 0.92);

    const nameScale = 0.9 + midpoint * 0.14;
    name.style.opacity = String(midpoint);
    name.style.transform = `translate3d(-50%, calc(-50% + ${lift * 0.35}px), 0) scale(${nameScale})`;

    if (ring) {
      ring.style.transform = `scale(${ringScale})`;
      ring.style.opacity = String(0.5 + arc * 0.5);
    }

    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(render);
      ticking = true;
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();
})();

/* =========================
   PROJECT MAP
========================= */
(function initProjectMap() {
  const map = document.getElementById("projectMap");
  if (!map) return;

  const projects = [
    {
      year: "2024",
      title: "CourtConnect",
      role: "BA & Jr Dev",
      summary:
        "A scheduling hub for community basketball courts, built to reduce booking conflicts and keep access fair.",
      points: [
        "Centralized court reservations into one clear workflow.",
        "Reduced overlap and confusion with structured schedule management.",
      ],
      img: "assets/shots/courtconnect/main.png",
      shotLabel: "Scheduler Hub",
    },
    {
      year: "2024",
      title: "Nasugbu Local Market Information System",
      role: "BA & Jr Dev",
      summary:
        "A market operations platform focused on stall management, pricing visibility, and rental tracking.",
      points: [
        "Organized vendor and stall records into a usable monitoring system.",
        "Tracked rental revenue and dynamic pricing updates for better oversight.",
      ],
      img: "assets/shots/market/main.png",
      shotLabel: "Market Operations",
    },
    {
      year: "2025",
      title: "MoneyPulse",
      role: "BA & Mobile Dev",
      summary:
        "A banking and financial tracking experience that combined secure transactions with clearer money movement.",
      points: [
        "Built secure transfer and QR withdrawal flows with React.js.",
        "Applied ISO/IEC 25010-aligned quality checks for reliability and security.",
      ],
      img: "assets/shots/moneypulse/main.png",
      shotLabel: "Finance Tracking",
    },
    {
      year: "2025",
      title: "ReserveNAs",
      role: "BA & Mobile Dev",
      summary:
        "A reservation and sports match-up app for handling facilities, availability, and QR-based validation.",
      points: [
        "Modernized reservations with cross-platform booking flows.",
        "Added live availability checks and sports match-up coordination.",
      ],
      img: "assets/shots/reservenas/main.png",
      shotLabel: "Reservation Flow",
    },
    {
      year: "2025",
      title: "SCROLL: Intelligent Thesis Repository",
      role: "BA & Jr Dev",
      summary:
        "A capstone repository platform designed to centralize academic research and improve thesis access across colleges.",
      points: [
        "Built the repository direction around scalable academic search and access.",
        "Planned multi-tenant workflows for different institutional needs.",
      ],
      img: "assets/shots/scroll/main.png",
      shotLabel: "Thesis Repository",
    },
    {
      year: "2025–2026",
      title: "Journal Management System (JMS)",
      role: "Developer",
      summary:
        "An AI-driven journal and thesis platform focused on semantic retrieval, research indexing, and academic-scale structure.",
      points: [
        "Developing Laravel and Elasticsearch-based semantic search capabilities.",
        "Leading the data modeling strategy for efficient large-scale indexing.",
      ],
      img: "assets/shots/jms/main.png",
      shotLabel: "Research Platform",
    },
  ];

  function escapeHtml(value) {
    return String(value).replace(
      /[&<>"']/g,
      (match) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[match],
    );
  }

  function createFallback(project) {
    const fallback = document.createElement("div");
    fallback.className = "map-shot-fallback";
    const fromFileProtocol = window.location.protocol === "file:";
    const note =
      fromFileProtocol && project.img
        ? `Preview mode active. Add a local server or place a real image at ${escapeHtml(project.img)}.`
        : `Add a screenshot at ${escapeHtml(project.img)} to replace this panel.`;
    fallback.innerHTML = `
      <div>
        <div class="map-shot-label">${escapeHtml(project.shotLabel)}</div>
        <div class="map-shot-title">${escapeHtml(project.title)}</div>
        <div class="map-shot-note">${note}</div>
      </div>`;
    return fallback;
  }

  function canLoadImage(path) {
    if (!path) return false;

    const isEmbedded = /^data:/i.test(path);
    const isRemote = /^https?:/i.test(path);
    const isLocalFilePreview =
      window.location.protocol === "file:" && !isEmbedded && !isRemote;

    return !isLocalFilePreview;
  }

  function createStop(project, index) {
    const side = index % 2 === 0 ? "left" : "right";
    const stop = document.createElement("article");
    stop.className = "map-stop";
    stop.dataset.side = side;

    const copy = document.createElement("div");
    copy.className = "map-copy";
    copy.innerHTML = `
      <p class="map-year">${escapeHtml(project.year)}</p>
      <h3 class="map-title">${escapeHtml(project.title)}</h3>
      <div class="map-role">${escapeHtml(project.role)}</div>
      <p class="map-summary">${escapeHtml(project.summary)}</p>
      <ul class="map-points">
        ${project.points.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}
      </ul>`;

    const node = document.createElement("div");
    node.className = "map-node";
    node.innerHTML = `<span class="map-step">0${index + 1}</span>`;

    const shot = document.createElement("div");
    shot.className = "map-shot";

    const fallback = createFallback(project);
    fallback.hidden = canLoadImage(project.img);
    shot.appendChild(fallback);

    if (canLoadImage(project.img)) {
      const image = document.createElement("img");
      image.src = project.img;
      image.alt = `${project.title} screenshot`;
      image.decoding = "async";
      image.onload = () => {
        fallback.hidden = true;
      };
      image.onerror = () => {
        image.remove();
        fallback.hidden = false;
      };

      shot.appendChild(image);
    }

    const caption = document.createElement("div");
    caption.className = "map-shot-caption";
    caption.innerHTML = `
      <div>
        <strong>${escapeHtml(project.shotLabel)}</strong>
        <span>${escapeHtml(project.year)} milestone</span>
      </div>
      <div class="map-shot-index">0${index + 1}</div>`;
    shot.appendChild(caption);

    stop.appendChild(copy);
    stop.appendChild(node);
    stop.appendChild(shot);
    return stop;
  }

  map.innerHTML = "";
  projects.forEach((project, index) => {
    map.appendChild(createStop(project, index));
  });

  const stops = Array.from(map.querySelectorAll(".map-stop"));

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      {
        threshold: 0.25,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    stops.forEach((stop) => observer.observe(stop));
  } else {
    stops.forEach((stop) => stop.classList.add("is-visible"));
  }
})();
