/* ==========================================================
   页面渲染与交互脚本（依赖 data.js 中的 PROFILE / PROJECTS）
   ========================================================== */

(function () {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* ---------- 左侧栏 ---------- */
  function renderSidebar() {
    $("#bar-name").textContent = PROFILE.name;
    $("#brand-name").textContent = PROFILE.name;
    $("#brand-role").textContent = PROFILE.role;
    $("#side-school").textContent = PROFILE.school;
    $("#side-location").textContent = PROFILE.location;

    $("#skill-tags").innerHTML = PROFILE.skills.map(s => `<li>${s}</li>`).join("");

    $("#side-contact-list").innerHTML = PROFILE.contact
      .map(c => {
        const label = `<span class="c-label">${c.label}</span>`;
        const value = c.link
          ? `<a href="${c.link}"${c.external ? ' target="_blank" rel="noreferrer"' : ""}>${label}${c.value}</a>`
          : `<span class="plain">${label}${c.value}</span>`;
        return `<li>${value}</li>`;
      })
      .join("");
  }

  /* ---------- 首屏 ---------- */
  function renderHero() {
    $("#hero-kicker").textContent = `HELLO, I'M ${PROFILE.name}`;
    $("#hero-desc").textContent = PROFILE.heroDesc;
    $("#hero-meta").innerHTML = [PROFILE.school, PROFILE.location, ...PROFILE.directions]
      .map(t => `<li>${t}</li>`)
      .join("");
  }

  /* ---------- 项目列表 ---------- */
  function renderProjects() {
    $("#project-list").innerHTML = PROJECTS.map((p, i) => {
      const num = String(i + 1).padStart(2, "0");
      return `
        <article class="project">
          <div class="project-media">
            <img src="${p.image}" alt="${p.alt}" loading="lazy">
          </div>
          <div class="project-info">
            <span class="project-index" aria-hidden="true">${num}</span>
            <p class="project-meta">
              <span class="project-tag">${p.category}</span>
              <time class="project-date">${p.date}</time>
            </p>
            <h3 class="project-name">${p.name}</h3>
            <p class="project-summary">${p.summary}</p>
            <ul class="project-stack">${p.stack.map(t => `<li>${t}</li>`).join("")}</ul>
          </div>
        </article>`;
    }).join("");
  }

  /* ---------- 关于我 ---------- */
  function renderAbout() {
    $("#about-text").innerHTML = PROFILE.about.map(p => `<p>${p}</p>`).join("");
    $("#about-chips").innerHTML = PROFILE.directions.map(d => `<li>${d}</li>`).join("");
    $("#about-facts").innerHTML = PROFILE.facts
      .map(f => `
        <div class="fact-row">
          <span class="fact-label">${f.label}</span>
          <span class="fact-value">${f.value}</span>
        </div>`)
      .join("");
  }

  /* ---------- 联系方式 ---------- */
  function renderContact() {
    $("#contact-list").innerHTML = PROFILE.contact
      .map(c => `
        <li class="contact-row">
          <span class="contact-label">${c.label}<i>${c.sub}</i></span>
          ${c.link
            ? `<a class="contact-value" href="${c.link}"${c.external ? ' target="_blank" rel="noreferrer"' : ""}>${c.value}<span class="contact-arrow">↗</span></a>`
            : `<span class="contact-value">${c.value}</span>`}
          ${c.copy ? `<button class="copy-btn" type="button" data-copy="${c.value}">复制</button>` : ""}
        </li>`)
      .join("");

    $$(".copy-btn").forEach(btn => {
      btn.addEventListener("click", async () => {
        const ok = await copyText(btn.dataset.copy);
        btn.textContent = ok ? "已复制 ✓" : "复制失败";
        btn.classList.toggle("done", ok);
        setTimeout(() => {
          btn.textContent = "复制";
          btn.classList.remove("done");
        }, 1400);
      });
    });
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (e) {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      let ok = false;
      try { ok = document.execCommand("copy"); } catch (err) { /* 忽略 */ }
      ta.remove();
      return ok;
    }
  }

  /* ---------- 移动端菜单 ---------- */
  function initMenu() {
    const sidebar = $("#sidebar");
    const toggle = $("#menu-toggle");
    const overlay = $("#menu-overlay");

    const close = () => {
      sidebar.classList.remove("open");
      overlay.classList.remove("show");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "打开菜单");
    };

    toggle.addEventListener("click", () => {
      const open = sidebar.classList.toggle("open");
      overlay.classList.toggle("show", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "关闭菜单" : "打开菜单");
    });

    overlay.addEventListener("click", close);
    $$(".side-nav-link").forEach(a => a.addEventListener("click", close));
    window.addEventListener("resize", () => {
      if (window.innerWidth > 960) close();
    });
  }

  /* ---------- 导航高亮 ---------- */
  function initNavSpy() {
    const links = $$(".side-nav-link");
    const sections = links
      .map(a => document.getElementById(a.getAttribute("href").slice(1)))
      .filter(Boolean);
    if (!("IntersectionObserver" in window) || !sections.length) return;

    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        links.forEach(l =>
          l.classList.toggle("is-active", l.getAttribute("href") === `#${entry.target.id}`)
        );
      });
    }, { rootMargin: "-45% 0px -50% 0px" });

    sections.forEach(s => io.observe(s));
  }

  /* ---------- 滚动淡入 ---------- */
  function initReveal() {
    if (!("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = $$(".section-head, .project, .about-grid, .contact-row");
    targets.forEach(t => t.classList.add("reveal"));

    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -8% 0px" });

    targets.forEach(t => io.observe(t));
  }

  /* ---------- 初始化 ---------- */
  renderSidebar();
  renderHero();
  renderProjects();
  renderAbout();
  renderContact();
  initMenu();
  initNavSpy();
  initReveal();
  $("#year").textContent = new Date().getFullYear();
})();
