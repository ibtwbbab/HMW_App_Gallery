// 三套皮肤仅作外观展示，不在网站读取设备动作或改变 App 设置。
import { escapeHtml } from "./serenity-theme.js";

const skins = [
  { key: "doodle", name: "潦草涂鸦", badge: "默认主题", image: "./serenity-doodle.png", description: "横线纸、随手画的笼子与潦草妖兽。封印完成后，枝条长出新叶。" },
  { key: "pixel", name: "像素森林", badge: "复古像素", image: "./serenity-beast.png?v=20260922", description: "森林遗址、像素笼体与马头泥身妖兽。封印完成后，破败森林恢复生机。" },
  { key: "monochrome", name: "黑白手绘", badge: "简洁留白", image: "./serenity-monochrome.png", description: "白底黑线、圆润按钮与炭黑妖兽。封印完成后，金光与小黑云淡入背景。" },
];

export function renderSerenitySkins() {
  return `<section class="serenity-skins shell" aria-labelledby="skins-title">
    <div class="serenity-heading"><div><p class="kicker">THREE LOOKS, YOUR CHOICE</p><h2 id="skins-title">换个主题，<br>用你喜欢的方式封印纷扰。</h2></div><p>设置 → 外观 → 皮肤<br>随时预览切换，应用清单与解封计时照常保留。</p></div>
    <div class="serenity-skins-grid">${skins.map(skin => `<article class="serenity-skin-card">
      <div class="serenity-skin-art serenity-skin-${skin.key}"><span>${skin.badge}</span><img src="${new URL(skin.image, import.meta.url).href}" alt="${escapeHtml(skin.name)}的马头泥身妖兽" width="1280" height="1280" loading="lazy"></div>
      <div class="serenity-skin-copy"><h3>${skin.name}</h3><p>${skin.description}</p></div>
    </article>`).join("")}</div>
    <p class="serenity-skins-note">使用应用内当前素材制作的主题示意，非实际界面截图。主页、弹窗与小型/中型桌面组件跟随所选皮肤；组件刷新由系统安排。</p>
  </section>`;
}
