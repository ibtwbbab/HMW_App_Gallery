// 举高高专属布局与导航，样式仅在当前应用页面启用。
const escapeHtml = (value = "") => String(value).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const links = [
  ["app", "App 介绍", "../app/?id=jugaogao-alarm"],
  ["support", "技术支持", "../support/?app=jugaogao-alarm"],
  ["privacy", "隐私政策", "../privacy/?app=jugaogao-alarm"],
];

function prepareAlarmPage(active, description) {
  document.body.classList.add("alarm-page");
  const css = document.createElement("link"); css.rel = "stylesheet";
  css.href = new URL("./jugaogao.css", import.meta.url).href; document.head.append(css);
  let meta = document.querySelector('meta[name="description"]');
  if (!meta) { meta = document.createElement("meta"); meta.name = "description"; document.head.append(meta); }
  meta.content = description;
  document.querySelector('meta[name="theme-color"]').content = "#f2f5fc";
  const icon = document.createElement("link"); icon.rel = "icon";
  icon.href = new URL("./jugaogao-icon.png", import.meta.url).href; document.head.append(icon);
  document.querySelector(".site-nav").innerHTML = links.map(([key, label, href]) => `<a href="${href}" ${active === key ? 'class="is-active" aria-current="page"' : ""}>${label}</a>`).join("");
  document.querySelector(".footer-links").innerHTML = '<a href="../">全部 App</a>' + links.map(([, label, href]) => `<a href="${href}">${label}</a>`).join("");
  document.querySelector(".site-footer > div:first-child p").textContent = "举高高闹钟 · 认真迎接每一个清晨";
  document.querySelector("main").id = "main-content";
  if (!document.querySelector(".skip-link")) document.body.insertAdjacentHTML("afterbegin", '<a class="skip-link" href="#main-content">跳到主要内容</a>');
  console.info("[hmw gallery] Alarm page rendered", { page: active });
}

export function renderAlarmApp(root, app) {
  prepareAlarmPage("app", app.description);
  root.innerHTML = `
    <section class="alarm-hero shell">
      <div class="alarm-copy"><div class="alarm-identity"><img src="${new URL(app.icon, import.meta.url).href}" width="64" height="64" alt="举高高闹钟图标"><div><p class="kicker">RISE & SHINE</p><strong>举高高闹钟</strong></div></div>
        <h1>把困意放下，<br>把清晨<span>举起来。</span></h1><p class="alarm-description">${escapeHtml(app.description)}</p>
        <div class="hero-actions"><a class="button button-primary" href="${escapeHtml(app.appStoreUrl)}" rel="noopener noreferrer">前往 App Store <span aria-hidden="true">↗</span></a><a class="text-link" href="#start">了解如何开始 ↓</a></div>
        <p class="alarm-meta">${escapeHtml(app.platform)}</p><p class="alarm-note">商店上架状态、价格及地区以商店为准。<br>HarmonyOS 下载入口待提供。</p>
      </div>
      <figure class="alarm-art"><div class="alarm-art-top"><span>早安，今天也要好好起床。</span><span aria-hidden="true">☀</span></div>
        <div class="alarm-preview"><div class="alarm-preview-heading">闹钟 <span aria-hidden="true">＋</span></div><p class="alarm-group-label">举高高模式</p><div class="alarm-time-card"><div><strong>07:00</strong><p>早起一点 · 工作日</p></div><span class="alarm-toggle" aria-hidden="true"></span></div><p class="alarm-group-label">普通模式</p><div class="alarm-time-card standard"><div><strong>08:30</strong><p>慢慢来 · 周末</p></div><span class="alarm-toggle" aria-hidden="true"></span></div><div class="alarm-progress"><div class="alarm-ring"><strong>3<small> / 5</small></strong></div><div><strong>再举高两次</strong><p>一个完整动作，一点清醒。</p></div></div></div>
        <figcaption>功能示意 · 非实际截图 · 挑战次数可自行设置</figcaption>
      </figure>
    </section>
    <div class="alarm-values shell"><span>无需账号</span><span>无广告</span><span>动作数据本机处理</span></div>
    <section class="alarm-section shell" id="features"><p class="kicker">YOUR MORNING, YOUR PACE</p><h2>起床这件事，<br>多一个认真对待的理由。</h2><div class="alarm-features">${app.features.map((item, i) => `<article><span class="alarm-index">0${i + 1}</span><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.description)}</p></article>`).join("")}</div></section>
    <section class="alarm-start shell" id="start"><div><p class="kicker">THREE SMALL STEPS</p><h2>第一次，<br>先找到你的节奏。</h2><p>不用等到明天早上，<br>现在就熟悉完整动作。</p></div><ol><li><h3>录下 3 次完整动作</h3><p>双手握住手机，屏幕朝向自己，从接近地面举到头顶上方；起点和终点短暂停稳。</p></li><li><h3>做一次独立测试</h3><p>按页面提示体验 5 次动作挑战，确认识别适合自己的握持和动作习惯。</p></li><li><h3>设好时间，选好模式</h3><p>选择重复日期、铃声与次数，并检查系统权限和音量。不便做动作时，可使用普通模式。</p></li></ol></section>
    <section class="alarm-boundary shell"><p class="kicker">GOOD TO KNOW</p><h2>提醒认真，承诺克制。</h2><p>系统停止入口无法封锁，闹钟表现受权限、设备及系统状态影响。它是起床帮手，不保证强制唤醒；重要事项请另设备用提醒。举起手机前请留出空间、握紧设备，不适合弯腰或上举时请勿勉强。</p></section>
    <section class="alarm-bottom shell"><article><p class="kicker">NEED A HAND?</p><h2>遇到问题，先看这里。</h2><p>响铃、音量、动作识别与平台差异。</p><a class="text-link" href="../support/?app=jugaogao-alarm">查看技术支持 →</a></article><article><p class="kicker">PRIVATE BY DESIGN</p><h2>动作留在手机里。</h2><p>了解各平台的权限、保存期限与删除方式。</p><a class="text-link" href="../privacy/?app=jugaogao-alarm">阅读隐私政策 →</a></article></section>
    <p class="alarm-version shell">内容依据 ${escapeHtml(app.version)} 当前实现 · 2026.09.09 更新</p>`;
}

export function enhanceAlarmSupport(app) {
  prepareAlarmPage("support", app.description);
  document.querySelector(".app-support-help > div").insertAdjacentHTML("beforeend", '<p>也可发送邮件至 <a href="mailto:ibtwbbab@qq.com">ibtwbbab@qq.com</a>。</p>');
}

export function enhanceAlarmPrivacy(app) {
  prepareAlarmPage("privacy", app.privacy.summary);
  document.title = `举高高闹钟 ${app.policyPlatform === "ios" ? "iOS" : "HarmonyOS"} 隐私政策 · hmw`;
  const aside = document.querySelector(".policy-aside");
  aside.insertAdjacentHTML("beforeend", `<nav class="alarm-platform" aria-label="选择隐私政策平台">${[["ios", "iOS 版"], ["harmonyos", "HarmonyOS 版"]].map(([key, label]) => `<a href="?app=jugaogao-alarm&platform=${key}" ${app.policyPlatform === key ? 'aria-current="page"' : ""}>${label}</a>`).join("")}</nav>`);
  document.querySelectorAll("[data-privacy-content] > section").forEach((node, i) => { node.id = `alarm-policy-${i + 1}`; });
  aside.insertAdjacentHTML("beforeend", `<nav class="alarm-toc" aria-label="隐私政策目录">${app.privacy.sections.map((item, i) => `<a href="#alarm-policy-${i + 1}">${escapeHtml(item.title)}</a>`).join("")}</nav>`);
}
