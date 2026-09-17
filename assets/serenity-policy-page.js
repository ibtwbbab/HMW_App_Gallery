import { escapeHtml, prepareSerenityPage } from "./serenity-theme.js";

export function enhanceSerenityPrivacy(app) {
  prepareSerenityPage("privacy", app.privacy.summary);
  document.querySelectorAll("[data-privacy-content] > section").forEach((node, index) => {
    node.id = `serenity-policy-${index + 1}`;
  });
  document.querySelector(".policy-aside").insertAdjacentHTML("beforeend", `<nav class="serenity-toc" aria-label="隐私政策目录">${app.privacy.sections.map((item, index) => `<a href="#serenity-policy-${index + 1}"><span>${String(index + 1).padStart(2, "0")}</span>${escapeHtml(item.title)}</a>`).join("")}</nav>`);
}
