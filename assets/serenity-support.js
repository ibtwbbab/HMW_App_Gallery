import { prepareSerenityPage } from "./serenity-theme.js";

export function enhanceSerenitySupport(app) {
  prepareSerenityPage("support", `${app.name}技术支持：授权、应用隐藏、临时解封、桌面组件及手动封印的常见问题。`);
  const hero = document.querySelector(".app-support-hero");
  hero.querySelector(".kicker").textContent = "摇泥马 / ADVENTURER’S GUIDE";
  hero.querySelector("h1").textContent = "宁静之旅，总有解答。";
  hero.querySelector("p:not(.kicker)").textContent = "技术支持 · 从第一次收服应用，到每一次从容解封。";
  document.querySelector(".app-support-help p:not(.kicker)").textContent = "请告诉我们应用版本、iOS 版本、问题发生时间与操作步骤，以及屏幕使用时间和后台 App 刷新的状态。截图请遮盖私人内容，不要发送密码或完整应用列表。";
  document.querySelectorAll(".app-support-faq details").forEach((item, index) => {
    item.addEventListener("toggle", () => {
      if (item.open) console.info("[hmw gallery] Serenity help expanded", { topic: index + 1 });
    });
  });
}
