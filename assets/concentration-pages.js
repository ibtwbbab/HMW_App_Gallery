// 专注之旅独立呈现层：仅作用于此应用，不替换其它应用模板。
const escapeHtml = (value = "") => String(value).replace(/[&<>"']/g, c => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
})[c]);

function preparePage(active, description) {
  document.body.classList.add("journey");
  const stylesheet = document.createElement("link");
  stylesheet.rel = "stylesheet";
  stylesheet.href = new URL("./concentration.css", import.meta.url).href;
  document.head.append(stylesheet);
  let meta = document.querySelector('meta[name="description"]');
  if (!meta) { meta = document.createElement("meta"); meta.name = "description"; document.head.append(meta); }
  meta.content = description;
  document.querySelector('meta[name="theme-color"]').content = "#f7f8f2";
  const links = [
    ["app", "产品介绍", "../app/?id=concentration-journey"],
    ["privacy", "隐私政策", "../privacy/?app=concentration-journey"],
    ["support", "技术支持", "../support/?app=concentration-journey"],
  ];
  document.querySelector(".site-nav").innerHTML = links.map(([key, name, url]) =>
    `<a ${key === active ? 'class="is-active" aria-current="page"' : ""} href="${url}">${name}</a>`).join("");
  document.querySelector(".footer-links").innerHTML = links.map(([, name, url]) => `<a href="${url}">${name}</a>`).join("");
  document.querySelector(".site-footer > div:first-child p").innerHTML = "专注之旅<br>行远自迩，笃行不怠。";
  document.querySelector(".skip-link")?.remove();
  const skip = document.createElement("a");
  skip.href = "#main-content"; skip.className = "journey-skip"; skip.textContent = "跳到主要内容";
  document.body.prepend(skip);
  document.querySelector("main").id = "main-content";
  console.info("[hmw gallery] Concentration journey page rendered", { page: active });
}

const storeButton = app => `<a class="button journey-store" href="${escapeHtml(app.appStoreUrl)}" rel="noopener noreferrer"><span aria-hidden="true">↗</span><span><small>前往下载</small>App Store</span><span aria-hidden="true">→</span></a>`;
const faqMarkup = items => items.map(item => `<details><summary>${escapeHtml(item.title)}</summary><p>${escapeHtml(item.description)}</p></details>`).join("");

export function renderJourneyApp(root, app) {
  preparePage("app", app.description);
  root.innerHTML = `
    <section class="journey-hero shell">
      <div class="journey-copy">
        <div class="journey-identity"><img src="${new URL(app.icon, import.meta.url).href}" alt="专注之旅 App 图标" width="64" height="64"><div><p class="kicker">CONCENTRATION JOURNEY</p><span>专注之旅 · 为注意力留白</span></div></div>
        <h1>少一点分心。<br>多一点<span>自己。</span></h1>
        <p class="journey-manifesto">解放被 App 绑架的注意力</p>
        <p class="journey-description">${escapeHtml(app.description)}</p>
        <div class="hero-actions">${storeButton(app)}<a class="text-link" href="#features">发现它能做什么 ↓</a></div>
        <p class="journey-meta">${escapeHtml(app.platform)} <span>·</span> 无需账户</p>
        <p class="journey-store-note">商店上架状态、价格与可用地区以 App Store 页面为准。</p>
      </div>
      <figure class="journey-art" aria-label="专注 40 分钟的功能示意，并非 App 实际截图">
        <div class="art-orbit orbit-one"></div><div class="art-orbit orbit-two"></div>
        <div class="art-label"><span></span> 把这一刻，还给自己</div>
        <div class="focus-preview"><div class="preview-top"><span>专注之旅</span><span aria-hidden="true">✳</span></div><div class="preview-center"><p>给重要的事，留一段时间</p><div class="preview-time">40<span>分钟</span></div><div class="preview-track"><span></span></div><p>放下分心，开始一段旅程。</p></div><div class="preview-slide"><span>→</span> 右滑开启专注</div><div class="preview-tabs"><b>专注</b><span>宁静</span><span>口袋</span><span>设置</span></div></div>
        <div class="art-note"><span aria-hidden="true">↳</span><div>让干扰暂时退场<small>为阅读、学习、创作留白</small></div></div>
        <figcaption>功能示意 · 实际界面以 App 为准</figcaption>
      </figure>
    </section>
    <div class="journey-values shell"><span><i aria-hidden="true">◌</i> 系统级屏幕使用时间能力</span><span><i aria-hidden="true">⌁</i> 设置与规则保存在本机</span><span><i aria-hidden="true">✧</i> 无广告 · 无第三方跟踪</span></div>
    <section id="features" class="journey-section shell"><div class="journey-heading"><div><p class="kicker">A LITTLE SPACE FOR YOURSELF</p><h2>不是更努力克制，<br>是少一些打扰。</h2></div><p>从一次专注，到每天的习惯。<br>用适合自己的方式，与手机相处。</p></div><div class="journey-feature-grid">${app.features.map((item, index) => `<article class="journey-feature"><span class="feature-symbol" aria-hidden="true">${["◷", "❋", "▤", "↻", "▦", "⌘"][index]}</span><span class="feature-index">0${index + 1}</span><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.description)}</p></article>`).join("")}</div></section>
    <section class="journey-start shell"><div><p class="kicker">YOUR FIRST JOURNEY</p><h2>从一段属于你的<br>时间开始。</h2><p>读几页书、写一段文字，或只是安静地做完一件事。</p></div><ol><li><span>01</span><div><h3>完成授权与密码设置</h3><p>选择个人或家庭模式，按系统提示授权，并牢记六位管理员密码。</p></div></li><li><span>02</span><div><h3>选出让你分心的应用</h3><p>把它们加入专注分组，选择这次旅程的时长。</p></div></li><li><span>03</span><div><h3>右滑开始，把手机放一旁</h3><p>App 内不可提前结束；旅程到期后回到 App，解除本次专注隐藏。</p></div></li></ol></section>
    <section class="journey-privacy-card shell"><div class="privacy-emblem" aria-hidden="true">◎</div><div><p class="kicker">PRIVATE BY DESIGN</p><h2>你的习惯，不必成为数据画像。</h2><p>不读取被选应用的内容，不上传应用选择和使用规则。必要的数据在设备上处理，管理员密码校验凭据由系统安全存储保护。</p><a class="text-link" href="../privacy/?app=concentration-journey">了解我们如何处理信息 →</a></div></section>
    <section class="journey-section journey-faq shell"><div><p class="kicker">GOOD TO KNOW</p><h2>开始之前，<br>你可能想知道。</h2><p>能力有边界，说明要清楚。</p></div><div>${faqMarkup(app.faq)}<div class="app-help"><h3>需要更多帮助？</h3><a class="text-link" href="../support/">找到开发者 →</a></div></div></section>
    <section class="journey-final shell"><p class="kicker">MAKE ROOM FOR WHAT MATTERS</p><h2>下一段好时光，<br>从专注开始。</h2>${storeButton(app)}<p>内容依据 App ${escapeHtml(app.version)} 当前实现 · 2026.09.09 更新</p></section>`;
}

export function enhanceJourneyPrivacy(app) {
  preparePage("privacy", app.privacy.summary);
  const aside = document.querySelector(".policy-aside");
  aside.querySelector(".kicker").textContent = "专注之旅 / PRIVACY";
  document.querySelectorAll("[data-privacy-content] > section").forEach((section, index) => { section.id = `policy-${index + 1}`; });
  const nav = document.createElement("nav");
  nav.className = "journey-policy-toc"; nav.setAttribute("aria-label", "隐私政策目录");
  nav.innerHTML = app.privacy.sections.map((item, index) => `<a href="#policy-${index + 1}"><span>${String(index + 1).padStart(2, "0")}</span>${escapeHtml(item.title)}</a>`).join("");
  aside.append(nav);
  document.querySelector(".policy-lead").insertAdjacentHTML("afterend", '<p class="journey-policy-notice">发布前待完善 · 运营联系信息与生效日期仍为占位内容，详见第 1、9 节。</p>');
  document.querySelectorAll(".policy-content p").forEach(p => { if (p.textContent.includes("【待补充")) p.classList.add("journey-placeholder"); });
}
