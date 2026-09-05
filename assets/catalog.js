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
  {
    id: "concentration-journey",
    name: "专注之旅",
    initials: "专",
    tagline: "解放被 APP 绑架的注意力",
    description: "通过专注计时、宁静之地、隐匿盒子和自动化，减少容易打断注意力的应用。",
    accent: "#71856f",
    platform: "iPhone",
    status: "coming-soon",
    appStoreUrl: "",
    icon: "",
    features: [
      { title: "专注之旅", description: "设定不可中断的时长，在旅程中隐藏容易分心的应用。" },
      { title: "宁静之地", description: "长期隐藏指定应用，需要时可临时或持续解锁。" },
      { title: "自动化盒子", description: "按星期和时间定时开启，或在使用超时后自动隐藏应用。" },
    ],
    privacy: {
      collectsData: false,
      updatedAt: "2026 年 9 月 5 日",
      summary: "专注之旅不要求创建账户，不包含广告、第三方分析或跟踪 SDK，也不会将你选择的应用、使用规则或家长密码上传到开发者服务器。",
      sections: [
        {
          title: "适用范围",
          paragraphs: [
            "本政策适用于“专注之旅”iOS 应用及其配套的桌面组件和屏幕使用时间扩展。HMW Apps 展示网站本身的数据处理另适用通用隐私政策。",
          ],
        },
        {
          title: "本应用处理的信息",
          paragraphs: [
            "当你选择要隐藏的应用时，本应用保存 Apple 屏幕使用时间框架提供的隐私化应用令牌，而不是从系统读取你的完整应用清单。",
            "本应用会在设备上处理你创建的盒子名称、所选应用令牌、定时开启规则、超时开启阈值、专注会话、宁静之地解锁状态和家长控制设置。",
            "为便于排查错误，本应用可在本机系统日志中记录功能状态、数量和错误类别；日志不记录家长密码或应用选择令牌的内容。",
          ],
        },
        {
          title: "信息的使用方式",
          paragraphs: [
            "上述信息仅用于保存你的设置、显示你选择的应用、安排屏幕使用时间监测、在条件满足时隐藏应用，以及校验家长模式的访问。",
            "超时开启由 Apple Device Activity 在系统内计算阈值；本应用不会获取你的完整设备使用历史。",
          ],
        },
        {
          title: "存储与保护",
          paragraphs: [
            "盒子、规则和会话等配置默认保存在你的设备上，并通过 App Group 与同一应用的桌面组件及系统扩展共享。这些数据不会上传到开发者运营的服务器。",
            "家长密码不以明文保存；用于校验密码的凭据保存在 iOS 钥匙串中。钥匙串数据的保留和删除由 iOS 系统管理。",
          ],
        },
        {
          title: "系统权限与 Apple 服务",
          paragraphs: [
            "核心功能依赖 Apple 提供的屏幕使用时间授权、Family Controls、Device Activity、Managed Settings 和 WidgetKit。相关信息由 Apple 的系统框架在设备上处理。",
            "你可以在 iOS 系统设置中撤回屏幕使用时间权限。撤回后，专注、宁静之地、口袋和家长模式的对应功能将无法继续使用。",
          ],
        },
        {
          title: "账户、广告与第三方跟踪",
          paragraphs: [
            "本应用不要求创建账户，不包含广告、第三方分析 SDK 或跨应用跟踪功能，也不会出售你的个人信息。",
            "当你主动打开 App Store 评分页、开发者社交主页或技术支持页面时，目标服务将按其自身的隐私政策处理你与该服务的交互。",
          ],
        },
        {
          title: "你的选择",
          paragraphs: [
            "你可以在应用内更改或删除盒子、所选应用和自动化规则，也可以修改家长密码。受正在进行的专注会话、家长模式或 iOS 系统规则保护的内容，可能需要等待限制结束或完成验证后才能更改。",
          ],
        },
        {
          title: "政策更新",
          paragraphs: [
            "当应用功能、数据处理方式或适用要求发生变化时，本政策可能更新。更新版本将发布在本页面，并同步调整最后更新日期。",
          ],
        },
        {
          title: "联系我们",
          paragraphs: [
            "如对本隐私政策或专注之旅的数据处理方式有疑问，请通过 HMW Apps 技术支持页面联系我们。",
          ],
          action: { label: "前往技术支持", href: "../support/" },
        },
      ],
    },
  },
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
