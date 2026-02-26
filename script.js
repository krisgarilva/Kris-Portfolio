// year
document.getElementById("y").textContent = new Date().getFullYear();

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

// --- Mini constellation ---
const box = document.getElementById("miniConst");
const points = [
  { x: 12, y: 30 },
  { x: 28, y: 18 },
  { x: 42, y: 28 },
  { x: 58, y: 20 },
  { x: 72, y: 34 },
  { x: 86, y: 26 },
  { x: 24, y: 56 },
  { x: 38, y: 48 },
  { x: 54, y: 60 },
  { x: 70, y: 52 },
  { x: 82, y: 64 },
];
const edges = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [1, 6],
  [6, 7],
  [7, 2],
  [2, 8],
  [8, 9],
  [9, 4],
  [9, 10],
];

function buildConstellation() {
  box.querySelectorAll(".node,.line").forEach((n) => n.remove());

  for (const [a, b] of edges) {
    const p1 = points[a],
      p2 = points[b];
    const dx = p2.x - p1.x,
      dy = p2.y - p1.y;
    const len = Math.hypot(dx, dy);
    const ang = (Math.atan2(dy, dx) * 180) / Math.PI;

    const line = document.createElement("div");
    line.className = "line";
    line.style.left = p1.x + "%";
    line.style.top = p1.y + "%";
    line.style.width = len + "%";
    line.style.transform = `rotate(${ang}deg)`;
    box.appendChild(line);
  }

  for (const p of points) {
    const n = document.createElement("div");
    n.className = "node";
    n.style.left = `calc(${p.x}% - 4px)`;
    n.style.top = `calc(${p.y}% - 4px)`;
    box.appendChild(n);
  }
}
buildConstellation();

/* =========================
   SLIDESHOW (6 LANDSCAPE CARDS, RIGHT→LEFT)
   - no back cover / no flip
   - transform-based slider (smooth, consistent on all browsers)
========================= */
(function initDeck() {
  const rail = document.getElementById("deckRail");
  if (!rail) return;

  const btnLeft = document.getElementById("btnLeft");
  const btnRight = document.getElementById("btnRight");

  const viewport = document.getElementById("deckViewport");

  let autoplay = true;
  let timer = null;
  viewport?.addEventListener("mouseenter", () => stopAutoplay());
  viewport?.addEventListener("mouseleave", () => startAutoplay());

  // pause when tab is hidden
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopAutoplay();
    else startAutoplay();
  });
  function startAutoplay() {
    stopAutoplay();
    if (!autoplay) return;
    timer = setInterval(() => next(), 3200);
  }
  function stopAutoplay() {
    if (timer) clearInterval(timer);
    timer = null;
  }
  function restartAutoplay() {
    if (!autoplay) return;
    startAutoplay();
  }
  const projects = [
    {
      title: "JMS — Journal Management System",
      role: "Developer • 2025–2026",
      img: "assets/shots/jms/main.png",
    },
    {
      title: "SCROLL — Thesis Repository",
      role: "BA & Jr Dev • Nov 2025",
      img: "assets/shots/scroll/main.png",
    },
    {
      title: "MoneyPulse — Banking & Tracking",
      role: "BA & Mobile Dev • 2025",
      img: "assets/shots/moneypulse/main.png",
    },
    {
      title: "ReserveNAs — Reservations & Match-ups",
      role: "BA & Mobile Dev • 2025",
      img: "assets/shots/reservenas/main.png",
    },
    {
      title: "CourtConnect — Scheduler Hub",
      role: "BA & Jr Dev • 2024",
      img: "assets/shots/courtconnect/main.png",
    },
    {
      title: "Nasugbu Local Market IS",
      role: "BA & Jr Dev • 2024",
      img: "assets/shots/market/main.png",
    },
  ];

  function escapeHtml(s) {
    return String(s).replace(
      /[&<>"']/g,
      (m) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[m],
    );
  }

  function makeFrontOverlay(title, role) {
    const o = document.createElement("div");
    o.className = "front-overlay";
    o.innerHTML = `<p class="front-title">${escapeHtml(title)}</p>
                   <p class="front-sub">${escapeHtml(role)}</p>`;
    return o;
  }

  function makeFrontPlaceholder(title, role) {
    const p = document.createElement("div");
    p.style.position = "absolute";
    p.style.inset = "0";
    p.style.display = "grid";
    p.style.placeItems = "center";
    p.style.padding = "14px";
    p.style.background = "rgba(2,6,23,.35)";
    p.innerHTML = `
      <div style="text-align:center;">
        <div style="font-weight:950;">${escapeHtml(title)}</div>
        <div style="margin-top:6px; font-size:12px; color: var(--muted);">${escapeHtml(role)}</div>
      </div>`;
    p.appendChild(makeFrontOverlay(title, role));
    return p;
  }

  function createCard({ title, role, img }, idx) {
    const c = document.createElement("article");
    c.className = "c54";
    c.dataset.idx = String(idx);

    const front = document.createElement("div");
    front.className = "face front";

    if (img) {
      const image = document.createElement("img");
      image.src = img;
      image.alt = `${title} screenshot`;
      image.onerror = () => {
        image.remove();
        front.appendChild(makeFrontPlaceholder(title, role));
      };
      front.appendChild(image);
      front.appendChild(makeFrontOverlay(title, role));
    } else {
      front.appendChild(makeFrontPlaceholder(title, role));
    }

    c.appendChild(front);
    return c;
  }

  // Render cards directly (no 100% slides)
  rail.innerHTML = "";
  projects.forEach((p, idx) => rail.appendChild(createCard(p, idx)));

  const cards = () => Array.from(rail.querySelectorAll(".c54"));

  let index = 0;

  function setActive() {
    const cs = cards();
    cs.forEach((x) => x.classList.remove("active"));
    cs[index]?.classList.add("active");
  }

  function layout() {
    const cs = cards();
    if (!cs.length) return;

    const cardW = cs[0].getBoundingClientRect().width;
    const gap = 22;
    const step = cardW + gap;

    const vpW = viewport.getBoundingClientRect().width;

    // Center active card: move rail so active card's center = viewport center
    const activeCenter = index * step + cardW / 2;
    const viewportCenter = vpW / 2;
    const offset = viewportCenter - activeCenter;

    rail.style.transform = `translateX(${offset}px)`;
    setActive();
  }

  function go(i) {
    index = (i + projects.length) % projects.length;
    layout();
  }

  function prev() {
    go(index - 1);
    restartAutoplay();
  }
  function next() {
    go(index + 1);
    restartAutoplay();
  }

  btnLeft?.addEventListener("click", prev);
  btnRight?.addEventListener("click", next);

  window.addEventListener("keydown", (e) => {
    const tag =
      (document.activeElement && document.activeElement.tagName) || "";
    if (tag === "INPUT" || tag === "TEXTAREA") return;

    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    }
  });

  window.addEventListener("resize", layout);

  // init
  go(0);
  startAutoplay();
})();
