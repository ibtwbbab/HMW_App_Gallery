// 仅负责YNM页面的公共外观与导航，保持其它应用不变。
export const escapeHtml = (value = "") => String(value).replace(/[&<>"']/g, c => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
})[c]);

const links = [
  ["app", "APP 介绍", "../app/?id=yaonima"],
  ["privacy", "隐私政策", "../privacy/?app=yaonima"],
  ["support", "技术支持", "../support/?app=yaonima"],
];

export function prepareSerenityPage(active, description) {
  document.body.classList.add("serenity-page");
  const css = document.createElement("link");
  css.rel = "stylesheet";
  css.href = new URL("./serenity.css", import.meta.url).href;
  css.addEventListener("error", () => console.error("[hmw gallery] Serenity stylesheet unavailable"));
  document.head.append(css);
  let meta = document.querySelector('meta[name="description"]');
  if (!meta) { meta = document.createElement("meta"); meta.name = "description"; document.head.append(meta); }
  meta.content = description;
  document.querySelector('meta[name="theme-color"]').content = "#f5e8b8";
  const icon = document.createElement("link");
  icon.rel = "icon";
  icon.href = new URL("./serenity-icon.png?v=20260922", import.meta.url).href;
  document.head.append(icon);
  document.querySelector(".site-nav").innerHTML = links.map(([key, label, href]) => `<a href="${href}" ${active === key ? 'class="is-active" aria-current="page"' : ""}>${label}</a>`).join("");
  document.querySelector(".footer-links").innerHTML = '<a href="../#apps">全部 App</a>' + links.map(([, label, href]) => `<a href="${href}">${label}</a>`).join("");
  document.querySelector(".site-footer > div:first-child p").textContent = "YNM · 封印纷扰，重归宁静";
  document.querySelector(".site-footer > p").innerHTML = `© ${new Date().getFullYear()} hmw`;
  document.querySelector("main").id = "main-content";
  if (!document.querySelector(".skip-link")) document.body.insertAdjacentHTML("afterbegin", '<a class="skip-link" href="#main-content">跳到主要内容</a>');
  console.info("[hmw gallery] Serenity page rendered", { page: active });
}
