// 安心守护专属页面与视觉；继续复用站点公共路由、FAQ 和政策正文渲染。
const escapeHtml = (value = "") => String(value).replace(/[&<>"']/g, (character) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
})[character]);

const navigation = [
  ["app", "APP介绍", "../app/?id=app-locker"],
  ["support", "技术支持", "../support/?app=app-locker"],
  ["privacy", "隐私政策", "../privacy/?app=app-locker"],
];

function prepareGrowthGuardPage(activePage, description) {
  document.body.classList.add("growth-guard-page");

  if (!document.querySelector('link[data-growth-guard-style]')) {
    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = new URL("./growth-guard.css", import.meta.url).href;
    stylesheet.dataset.growthGuardStyle = "";
    document.head.append(stylesheet);
  }

  let meta = document.querySelector('meta[name="description"]');
  if (!meta) {
    meta = document.createElement("meta");
    meta.name = "description";
    document.head.append(meta);
  }
  meta.content = description;
  document.querySelector('meta[name="theme-color"]').content = "#f6f3ec";

  if (!document.querySelector('link[data-growth-guard-icon]')) {
    const icon = document.createElement("link");
    icon.rel = "icon";
    icon.href = new URL("./growth-guard-icon.png", import.meta.url).href;
    icon.dataset.growthGuardIcon = "";
    document.head.append(icon);
  }

  document.querySelector(".site-nav").innerHTML = navigation
    .map(([key, label, href]) =>
      '<a href="' + href + '"' +
      (activePage === key ? ' class="is-active" aria-current="page"' : "") +
      ">" + label + "</a>"
    )
    .join("");

  document.querySelector(".footer-links").innerHTML =
    '<a href="../">全部 APP</a>' +
    navigation.map(([, label, href]) => '<a href="' + href + '">' + label + "</a>").join("");
  document.querySelector(".site-footer > div:first-child p").textContent =
    "安心守护 · 让孩子健康成长";

  document.querySelector("main").id = "main-content";
  if (!document.querySelector(".skip-link")) {
    document.body.insertAdjacentHTML(
      "afterbegin",
      '<a class="skip-link" href="#main-content">跳到主要内容</a>'
    );
  }
  console.info("[hmw gallery] Growth Guard page rendered", { page: activePage });
}

export function renderGrowthGuardApp(root, app) {
  prepareGrowthGuardPage("app", app.description);
  const iconURL = new URL(app.icon, import.meta.url).href;
  const featureMarkup = app.features.map((feature, index) =>
    '<article><span class="guard-feature-index">' +
      String(index + 1).padStart(2, "0") +
      "</span><h3>" + escapeHtml(feature.title) +
      "</h3><p>" + escapeHtml(feature.description) + "</p></article>"
  ).join("");

  root.innerHTML = [
    '<section class="guard-hero shell">',
      '<div class="guard-hero-copy">',
        '<div class="guard-identity">',
          '<img src="' + escapeHtml(iconURL) + '" width="72" height="72" alt="安心守护图标">',
          '<div><p class="kicker">GROW WITH CARE</p><strong>安心守护</strong></div>',
        "</div>",
        '<h1>给手机一些边界，<br><span>给成长更多空间。</span></h1>',
        '<p class="guard-lead">' + escapeHtml(app.description) + "</p>",
        '<div class="hero-actions">',
          '<a class="button button-primary" href="' + escapeHtml(app.appStoreUrl) + '" rel="noopener noreferrer">前往 App Store <span aria-hidden="true">↗</span></a>',
          '<a class="text-link" href="#guard-start">了解如何开始 ↓</a>',
        "</div>",
        '<p class="guard-meta">' + escapeHtml(app.platform) + " · 当前实现 " + escapeHtml(app.version) + "</p>",
        '<p class="guard-store-note">商店上架状态、价格和可用地区以 App Store 为准。</p>',
      "</div>",
      '<figure class="guard-preview">',
        '<div class="guard-preview-header"><div><small>安心守护</small><strong>应用分组</strong></div><span aria-hidden="true">⚙︎</span></div>',
        '<p class="guard-preview-caption">为孩子手机打造健康的使用环境</p>',
        '<div class="guard-group-card">',
          '<div class="guard-group-icon blue" aria-hidden="true">◇</div>',
          '<div><strong>偶尔玩一下</strong><small>包含 3 项选择 · 无自动化</small><span class="guard-status is-open">未锁定</span></div>',
          '<span class="guard-switch" aria-hidden="true"></span>',
        "</div>",
        '<div class="guard-group-card">',
          '<div class="guard-group-icon green" aria-hidden="true">◇</div>',
          '<div><strong>休息时间适度玩</strong><small>包含 6 项选择 · 2 个自动化</small><span class="guard-status is-locked">已锁定 · 定时锁定</span></div>',
          '<span class="guard-switch is-on" aria-hidden="true"></span>',
        "</div>",
        '<div class="guard-automation-card">',
          '<span aria-hidden="true">◷</span><div><strong>今天的约定</strong><small>达到每日时长后，系统会执行锁定</small></div>',
        "</div>",
        "<figcaption>功能示意 · 非实际截图 · 系统执行可能存在延迟</figcaption>",
      "</figure>",
    "</section>",
    '<div class="guard-values shell"><span>无需开发者账号</span><span>只管理当前设备</span><span>无广告与追踪</span></div>',
    '<section class="guard-section shell" id="features">',
      '<div class="guard-section-heading"><div><p class="kicker">CLEAR RULES, CALMER DAYS</p><h2>规则清楚一点，<br>争执就少一点。</h2></div><p>从临时需要到每天的固定安排，把不同场景分开管理，也把产品做不到的边界讲清楚。</p></div>',
      '<div class="guard-features">' + featureMarkup + "</div>",
    "</section>",
    '<section class="guard-start shell" id="guard-start">',
      '<div><p class="kicker">START TOGETHER</p><h2>三步建立<br>家庭使用约定。</h2><p>请在孩子的 iPhone 上完成设置，过程中由家长或监护人操作。</p></div>',
      "<ol>",
        '<li><span>01</span><div><h3>完成家庭授权</h3><p>确认设备属于家人共享中的儿童账号，并授予屏幕使用时间权限。</p></div></li>',
        '<li><span>02</span><div><h3>设置应用密码</h3><p>创建 6 位密码保护应用与重要设置，并由家长妥善保管。</p></div></li>',
        '<li><span>03</span><div><h3>分组，再约定规则</h3><p>选择应用或类别，按需要开启手动、定时或每日使用时长锁定。</p></div></li>',
      "</ol>",
    "</section>",
    '<section class="guard-boundary shell">',
      '<div aria-hidden="true">⌁</div><p class="kicker">GOOD TO KNOW</p><h2>守护在当前设备发生。</h2>',
      "<p>安心守护不是远程监控工具，也不读取孩子在应用里的聊天、照片或浏览内容。锁定依赖 Apple 屏幕使用时间框架，授权状态、系统调度与设备环境都可能影响实际执行。</p>",
    "</section>",
    '<section class="guard-bottom shell">',
      '<article><p class="kicker">NEED A HAND?</p><h2>遇到问题，先看这里。</h2><p>家庭授权、锁定状态、自动化、试用与会员的常见问题。</p><a class="text-link" href="../support/?app=app-locker">查看技术支持 →</a></article>',
      '<article><p class="kicker">PRIVATE BY DESIGN</p><h2>选择和规则留在设备。</h2><p>了解本地配置、系统服务、购买流程与支持信息的处理方式。</p><a class="text-link" href="../privacy/?app=app-locker">阅读隐私政策 →</a></article>',
    "</section>",
    '<p class="guard-version shell">内容依据 ' + escapeHtml(app.version) + " 当前实现 · 2026.09.24 更新</p>",
  ].join("");
}

export function enhanceGrowthGuardSupport(app) {
  prepareGrowthGuardPage("support", app.name + "的常见问题、使用说明与技术支持。");
  const hero = document.querySelector(".app-support-hero");
  if (hero) {
    hero.insertAdjacentHTML(
      "beforeend",
      '<aside class="guard-support-note"><strong>开始排查前</strong><p>请确认当前是家人共享中的儿童 iPhone，并检查 iOS 版本、屏幕使用时间权限、试用或会员状态。系统执行可能存在短暂延迟。</p></aside>'
    );
  }
  document.querySelectorAll(".app-support-faq details").forEach((details, index) => {
    details.addEventListener("toggle", () => {
      if (details.open) {
        console.info("[hmw gallery] Growth Guard FAQ opened", { item: index + 1 });
      }
    });
  });
}

export function enhanceGrowthGuardPrivacy(app) {
  prepareGrowthGuardPage("privacy", app.privacy.summary);
  document.title = "安心守护隐私政策 · hmw";
  const sections = document.querySelectorAll("[data-privacy-content] > section");
  sections.forEach((node, index) => {
    node.id = "growth-guard-policy-" + (index + 1);
  });
  const aside = document.querySelector(".policy-aside");
  if (aside) {
    aside.insertAdjacentHTML(
      "beforeend",
      '<nav class="guard-policy-toc" aria-label="隐私政策目录">' +
        app.privacy.sections.map((item, index) =>
          '<a href="#growth-guard-policy-' + (index + 1) + '">' +
          escapeHtml(item.title) + "</a>"
        ).join("") +
      "</nav>"
    );
  }
}
