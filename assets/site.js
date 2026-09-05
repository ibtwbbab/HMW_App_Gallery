import { apps, getApp, siteConfig } from "./catalog.js";

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
    <article class="app-card" style="--accent:${escapeHtml(app.accent || "#ff7358")}">
      <div class="app-card-top">
        ${iconMarkup(app)}
        <span class="app-number">${String(index + 1).padStart(2, "0")}</span>
      </div>
      <div class="app-card-body">
        <p class="app-platform">${escapeHtml(app.platform || "Apple platforms")}</p>
        <h3>${escapeHtml(app.name)}</h3>
        <p>${escapeHtml(app.description)}</p>
      </div>
      <a class="card-link" href="./app/?id=${encodeURIComponent(app.id)}" aria-label="了解 ${escapeHtml(app.name)}">了解更多 <span>↗</span></a>
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
      <div class="feature-grid">${features || "<p>功能介绍即将补充。</p>"}</div>
    </section>`;
}

function renderPrivacy() {
  const app = getApp(new URLSearchParams(location.search).get("app"));
  const nameTargets = document.querySelectorAll("[data-privacy-name]");
  nameTargets.forEach((target) => { target.textContent = app?.name || "HMW Apps"; });
  if (app) document.title = `${app.name} 隐私政策 · ${siteConfig.brand}`;

  const summary = document.querySelector("[data-privacy-summary]");
  if (summary && app?.privacy?.summary) summary.textContent = app.privacy.summary;

  const switcher = document.querySelector("[data-privacy-apps]");
  if (switcher && apps.length) {
    switcher.innerHTML = `<a class="${app ? "" : "is-active"}" href="./">通用政策</a>${apps.map((item) =>
      `<a class="${app?.id === item.id ? "is-active" : ""}" href="?app=${encodeURIComponent(item.id)}">${escapeHtml(item.name)}</a>`
    ).join("")}`;
  }
}

function renderSupport() {
  const emailLink = document.querySelector("[data-support-email]");
  if (!emailLink) return;
  if (siteConfig.supportEmail) {
    emailLink.href = `mailto:${siteConfig.supportEmail}`;
    emailLink.textContent = siteConfig.supportEmail;
  } else {
    emailLink.removeAttribute("href");
    emailLink.classList.add("is-disabled");
    emailLink.textContent = "联系邮箱将在应用上线时公布";
  }
}

document.querySelectorAll("[data-current-year]").forEach((node) => { node.textContent = new Date().getFullYear(); });

({ home: renderHome, app: renderApp, privacy: renderPrivacy, support: renderSupport })[document.body.dataset.page]?.();
