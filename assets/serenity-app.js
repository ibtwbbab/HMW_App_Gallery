import { escapeHtml, prepareSerenityPage } from "./serenity-theme.js";

export function renderSerenityApp(root, app) {
  prepareSerenityPage("app", app.description);
  root.innerHTML = `
    <section class="serenity-hero shell">
      <div class="serenity-hero-copy">
        <div class="serenity-identity"><img src="${new URL(app.icon, import.meta.url).href}" width="60" height="60" alt="摇泥马图标"><div><span class="kicker">A LITTLE QUIET, EVERY DAY</span><p>摇泥马 <span> / ${escapeHtml(app.platform)}</span></p></div></div>
        <p class="serenity-chapter">第一章 · 夺回你的宁静</p>
        <h1>封印纷扰。<br>让生活<span>重归宁静。</span></h1>
        <p class="serenity-description">${escapeHtml(app.description)}</p>
        <div class="hero-actions"><a class="button button-primary" href="#start">开启宁静之旅 <span aria-hidden="true">↓</span></a><a class="text-link" href="../support/?app=yaonima">查看使用指南 ↗</a></div>
        <p class="serenity-release">iPhone 专属 · 无需账号 · 数据留在本机<br>下载入口待开放</p>
      </div>
      <figure class="serenity-art">
        <div class="serenity-scene" role="img" aria-label="像素森林中，锁妖笼镇压着妖兽摇泥马的概念场景">
          <div class="serenity-scene-label">摇 泥 马 <span>封印纷扰 · 守护日常</span></div>
          <div class="serenity-cage"><span class="serenity-cage-sign">锁 妖 笼</span><div class="serenity-cage-symbols" aria-hidden="true"><i>✦</i><i>◈</i><i>✿</i><i>◆</i></div></div>
          <img class="serenity-beast" src="${new URL("./serenity-beast.png", import.meta.url).href}" alt="" width="1280" height="1280">
          <p class="serenity-scene-caption">收服一点纷扰，找回一片宁静。</p>
        </div>
        <figcaption><span>来自应用的像素世界</span><span>场景示意 · 非实际界面</span></figcaption>
      </figure>
    </section>
    <div class="serenity-values shell"><span><i aria-hidden="true">◆</i> 日常隐藏</span><span><i aria-hidden="true">◆</i> 按需解封</span><span><i aria-hidden="true">◆</i> 设备本地保存</span></div>
    <section class="serenity-section shell" aria-labelledby="features-title"><div class="serenity-heading"><div><p class="kicker">LESS DISTRACTION, MORE LIFE</p><h2 id="features-title">把注意力，<br>留给真正想做的事。</h2></div><p>不必每次都与意志力较量。<br>给容易分心的日常，多一道温柔的边界。</p></div><div class="serenity-features">${app.features.map((item, i) => `<article><span class="serenity-index">0${i + 1}</span><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.description)}</p></article>`).join("")}</div></section>
    <section class="serenity-start shell" id="start" aria-labelledby="start-title"><div><p class="kicker">YOUR FIRST QUEST</p><h2 id="start-title">三步，<br>开启你的封印之旅。</h2><p>无需账号，也没有复杂的任务。<br>从一个容易让你分心的应用开始。</p></div><ol><li><span>壹</span><div><h3>授予屏幕使用时间权限</h3><p>在主页完成个人授权，让摇泥马可以为你隐藏所选应用。</p></div></li><li><span>贰</span><div><h3>把分心的应用收进笼中</h3><p>点击锁妖笼，使用系统选择器挑选应用并保存。锁定时，它们会保持隐藏。</p></div></li><li><span>叁</span><div><h3>需要时，再短暂解封</h3><p>选一个合适的时长，或通过桌面组件快捷操作。也可以随时提前重新封印。</p></div></li></ol></section>
    <aside class="serenity-boundary shell"><span aria-hidden="true">◇</span><div><h2>是日常的帮手，不是强制的枷锁。</h2><p>摇泥马面向个人自我管理，不提供家长控制。恢复锁定依赖系统调度，持续锁屏时可能延迟；“自动”模式在解封半小时后等待后台机会，并非精确定时。游戏里的封印进度，不改变真实应用限制。</p></div></aside>
    <section class="serenity-bottom shell"><article><p class="kicker">YOUR DATA, YOUR DEVICE</p><h2>宁静，也关乎隐私。</h2><p>了解本地保存、系统权限与删除方式。</p><a class="text-link" href="../privacy/?app=yaonima">阅读隐私政策 →</a></article><article><p class="kicker">WE ARE HERE TO HELP</p><h2>旅途中，需要帮忙？</h2><p>关于授权、解封、组件和手动封印的解答。</p><a class="text-link" href="../support/?app=yaonima">前往技术支持 →</a></article></section>
    <p class="serenity-version shell">依据 ${escapeHtml(app.version)} 当前实现 · 2026.09.17 更新 · 商店发布状态以正式下载入口为准</p>`;
}
