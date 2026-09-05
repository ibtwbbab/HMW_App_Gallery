/**
 * 应用目录：后续接入正式应用时，只需在 apps 数组中新增对象。
 * icon 使用相对 assets 目录的图片路径（如 ./icons/focus-note.png），
 * 也可留空并使用 initials + accent 生成图标。
 */
export const siteConfig = {
  brand: "HMW Apps",
  supportEmail: "",
};

export const apps = [
  // 示例：复制下方对象并移除注释即可发布一个应用。
  // {
  //   id: "focus-note",
  //   name: "Focus Note",
  //   initials: "FN",
  //   tagline: "把想法留在当下",
  //   description: "一个轻巧、专注的记录工具，帮助你快速捕捉值得留下的内容。",
  //   accent: "#ff7358",
  //   platform: "iPhone · iPad",
  //   status: "available",
  //   appStoreUrl: "https://apps.apple.com/",
  //   icon: "",
  //   features: [
  //     { title: "快速记录", description: "用更短的路径捕捉灵感。" },
  //     { title: "本地优先", description: "核心数据保留在你的设备中。" },
  //     { title: "原生体验", description: "贴合系统习惯，流畅而克制。" },
  //   ],
  //   privacy: {
  //     collectsData: false,
  //     summary: "Focus Note 不收集或向第三方出售个人数据。",
  //   },
  // },
];

export function getApp(id) {
  return apps.find((app) => app.id === id);
}
