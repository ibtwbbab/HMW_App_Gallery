// 应用专属技术支持；公共开发者页保留独立社交联系职责。
const escapeHtml = (value = "") => String(value).replace(/[&<>"']/g, c => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
})[c]);

export function renderAppSupport(app) {
  const name = escapeHtml(app.name);
  const id = encodeURIComponent(app.id);
  document.title = `${app.name} · 技术支持`;
  document.querySelector('meta[name="description"]').content = `${app.name}的常见问题、使用说明与更多帮助。`;
  const css = document.createElement("link");
  css.rel = "stylesheet";
  css.href = new URL("./app-support.css", import.meta.url).href;
  document.head.append(css);
  const links = `<a href="../app/?id=${id}">产品介绍</a>${app.privacy?.sections?.length ? `<a href="../privacy/?app=${id}">隐私政策</a>` : ""}<a class="is-active" aria-current="page" href="?app=${id}">技术支持</a>`;
  document.querySelector(".site-nav").innerHTML = links;
  document.querySelector(".footer-links").innerHTML = `<a href="../app/?id=${id}">返回${name}</a><a href="../support/">找到开发者</a>`;
  document.querySelector("main").innerHTML = `
    <section class="app-support-hero shell"><p class="kicker">${name} / SUPPORT</p><h1>让使用，顺利一点。</h1><p>关于${name}的常见问题与使用说明。</p><a class="text-link" href="../app/?id=${id}">← 返回 App 介绍</a></section>
    <section class="app-support-faq shell" aria-labelledby="faq-title"><div><p class="kicker">QUICK ANSWERS</p><h2 id="faq-title">常见问题</h2>${app.version ? `<p>适用于当前版本 ${escapeHtml(app.version)}</p>` : ""}</div><div>${(app.faq || []).map(item => `<details><summary>${escapeHtml(item.title)}</summary><p>${escapeHtml(item.description)}</p></details>`).join("") || "<p>使用说明正在整理中，如需帮助请联系开发者。</p>"}</div></section>
    <section class="app-support-help shell"><div><p class="kicker">MORE HELP</p><h2>需要更多帮助？</h2><p>交流时请说明 App 名称、版本、系统版本及问题发生的步骤。截图请遮盖私人内容，切勿发送密码。</p></div><a class="button button-primary" href="../support/">找到开发者 <span aria-hidden="true">→</span></a></section>`;
  console.info("[hmw gallery] App support rendered", { app: app.id });
}
