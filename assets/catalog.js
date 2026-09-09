import { concentrationJourney } from "./concentration-data.js";
import { jugaogaoAlarm } from "./jugaogao-data.js";

export const siteConfig = {
  brand: "hmw",
};

// 新应用使用独立数据文件，避免影响其它应用的内容与隐私政策。
export const apps = [concentrationJourney, jugaogaoAlarm];

export function getApp(id) {
  return apps.find((app) => app.id === id);
}
