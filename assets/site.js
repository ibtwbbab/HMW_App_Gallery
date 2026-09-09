import { apps, getApp, siteConfig } from "./catalog.js";
import { renderJourneyApp, enhanceJourneyPrivacy } from "./concentration-pages.js";
import { renderAppSupport } from "./app-support.js";

const escapeHtml = (value = "") =>
  String(value).replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character]);

function iconMarkup(app, className = "app-icon") {
  const style = `--accent:${escapeHtml(app.accent || "#ff7358")}`;
  if (app.icon) {
    const iconUrl = new URL(app.icon, import.meta.url).href;
    return `<span class="${className}" style="${style}"><img src="${escapeHtml(iconUrl)}" alt="" /></span>`;
  }
  return `<span class="${className}" style="${style}" aria-hidden="true">${escapeHtml(app.initials || app.name.slice(0, 2))}</span>`;
}

function renderHome() {
  const grid = document.querySelector("[data-app-grid]");
  if (!grid) return;

  if (!apps.length) {
    grid.innerHTML = `
      <div class="empty-state">
        <span class="empty-symbol" aria-hidden="true">✦</span>
        <div>
          <h3>第一批作品正在准备中</h3>
          <p>应用信息将在正式发布后出现在这里，敬请期待。</p>
        </div>
        <span class="empty-index">00 / SOON</span>
      </div>`;
    return;
  }

  grid.innerHTML = apps.map((app, index) => `
    <article class="gallery-app" style="--accent:${escapeHtml(app.accent || "#365745")}">
      <div class="gallery-app-art">${iconMarkup(app, "app-icon gallery-icon")}<span class="gallery-art-caption">${escapeHtml(app.tagline)}</span><span class="gallery-index">${String(index + 1).padStart(2, "0")}</span></div>
      <div class="gallery-app-copy"><p class="kicker">${escapeHtml(app.platform)}</p><h3>${escapeHtml(app.name)}</h3><p>${escapeHtml(app.description)}</p><div class="gallery-app-links"><a class="button button-primary" href="./app/?id=${encodeURIComponent(app.id)}">了解 App <span aria-hidden="true">→</span></a>${app.privacy?.sections?.length ? `<a class="text-link" href="./privacy/?app=${encodeURIComponent(app.id)}">${escapeHtml(app.name)}隐私政策</a>` : ""}</div></div>
    </article>`).join("");

}

function renderApp() {
  const root = document.querySelector("[data-app-detail]");
  if (!root) return;
  const app = getApp(new URLSearchParams(location.search).get("id"));

  if (!app) {
    root.innerHTML = `
      <section class="message-page shell">
        <p class="kicker">App not found</p>
        <h1>这个应用页面还未准备好。</h1>
        <p>应用可能尚未发布，或者当前链接已经更新。</p>
        <a class="button button-primary" href="../">返回应用列表</a>
      </section>`;
    return;
  }

  document.title = `${app.name} · ${siteConfig.brand}`;
  if (app.id === "concentration-journey") {
    renderJourneyApp(root, app);
    return;
  }
  const features = (app.features || []).map((feature, index) => `
    <article class="feature-card">
      <span>${String(index + 1).padStart(2, "0")}</span>
      <h3>${escapeHtml(feature.title)}</h3>
      <p>${escapeHtml(feature.description)}</p>
    </article>`).join("");
  const storeAction = app.appStoreUrl
    ? `<a class="button button-primary" href="${escapeHtml(app.appStoreUrl)}" rel="noopener noreferrer">前往 App Store <span>↗</span></a>`
    : `<span class="button button-muted">即将上线</span>`;

  root.innerHTML = `
    <section class="app-hero shell" style="--accent:${escapeHtml(app.accent || "#ff7358")}">
      <div class="app-hero-copy">
        ${iconMarkup(app, "app-icon app-icon-large")}
        <p class="kicker">${escapeHtml(app.platform || "Apple platforms")}</p>
        <h1>${escapeHtml(app.name)}</h1>
        <p class="app-tagline">${escapeHtml(app.tagline)}</p>
        <p>${escapeHtml(app.description)}</p>
        <div class="hero-actions">${storeAction}<a class="text-link" href="../privacy/?app=${encodeURIComponent(app.id)}">查看隐私政策 →</a></div>
      </div>
      <div class="device-stage" aria-hidden="true"><div class="device"><div class="device-island"></div><div class="device-screen"><span>${escapeHtml(app.initials || app.name.slice(0, 2))}</span></div></div></div>
    </section>
    <section class="feature-section shell">
      <div class="section-heading"><div><p class="kicker">Highlights</p><h2>简单，但不简陋</h2></div><p>围绕真正重要的体验精心设计。</p></div>
      <div class="feature-grid">${features || "<p>功能介绍即将补充。</p>"}</div><div class="app-help"><h2>需要更多帮助？</h2><a class="text-link" href="../support/">找到开发者 →</a></div>
    </section>`;
}

function renderPrivacy() {
  const app = getApp(new URLSearchParams(location.search).get("app"));
  if (!app?.privacy?.sections?.length) {
    console.info("[hmw gallery] Privacy route has no app policy");
    location.replace(new URL("../#apps", location.href).href);
    return;
  }
  document.querySelector(".site-nav").insertAdjacentHTML("afterbegin", `<a href="../app/?id=${encodeURIComponent(app.id)}">${escapeHtml(app.name)}</a>`);
  const nameTargets = document.querySelectorAll("[data-privacy-name]");
  nameTargets.forEach((target) => { target.textContent = app?.name || "HMW Apps"; });
  if (app) document.title = `${app.name} 隐私政策 · ${siteConfig.brand}`;

  const summary = document.querySelector("[data-privacy-summary]");
  if (summary && app?.privacy?.summary) summary.textContent = app.privacy.summary;

  const updatedAt = document.querySelector("[data-privacy-updated]");
  if (updatedAt && app?.privacy?.updatedAt) updatedAt.textContent = app.privacy.updatedAt;

  const content = document.querySelector("[data-privacy-content]");
  if (content && app?.privacy?.sections?.length) {
    const sections = app.privacy.sections.map((section, index) => {
      const paragraphs = (section.paragraphs || [])
        .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
        .join("");
      const action = section.action
        ? `<p class="policy-action"><a href="${escapeHtml(section.action.href)}">${escapeHtml(section.action.label)} →</a></p>`
        : "";
      return `<section><span>${String(index + 1).padStart(2, "0")}</span><div><h2>${escapeHtml(section.title)}</h2>${paragraphs}${action}</div></section>`;
    }).join("");
    content.querySelectorAll(":scope > section").forEach((section) => section.remove());
    content.insertAdjacentHTML("beforeend", sections);
  }

  const switcher = document.querySelector("[data-privacy-apps]");
  if (switcher) switcher.innerHTML = `<a href="../app/?id=${encodeURIComponent(app.id)}">← 返回${escapeHtml(app.name)}</a>`;
  if (app?.id === "concentration-journey") enhanceJourneyPrivacy(app);
}

function renderDeveloper() {
  const app = getApp(new URLSearchParams(location.search).get("app"));
  if (app) {
    renderAppSupport(app);
    return;
  }
  console.info("[hmw gallery] Developer social page rendered");
  document.querySelectorAll(".social-card").forEach(link => {
    link.addEventListener("click", () => {
      console.info("[hmw gallery] Opening developer channel", { channel: link.querySelector("strong").textContent });
    });
  });
}

document.querySelectorAll("[data-current-year]").forEach((node) => { node.textContent = new Date().getFullYear(); });

({ home: renderHome, app: renderApp, privacy: renderPrivacy, developer: renderDeveloper })[document.body.dataset.page]?.();
