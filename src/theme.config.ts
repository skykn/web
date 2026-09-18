// cannot use path alias here because unocss can not resolve it
import { defineConfig } from "./toolkit/themeConfig";

export default defineConfig({
  siteName: "skykn blog",
  brand: {
    title: "skykn blog",
    subtitle: "skykn 的个人博客",
    logo: "",
  },
  nav: [
    {
      href: "/",
      text: "首页",
      icon: "i-ri-home-line",
    },
    {
      text: "资讯新闻",
      href: "/categories/资讯新闻/",
      icon: "i-ri-newspaper-line",
    },
    {
      text: "技术载文",
      href: "/categories/技术载文/",
      icon: "i-ri-code-box-line",
    },
    {
      text: "作品陈列",
      href: "/categories/作品陈列/",
      icon: "i-ri-rocket-2-line",
    },
    {
      text: "浮生札录",
      href: "/categories/浮生札录/",
      icon: "i-ri-quill-pen-line",
    },
    {
      text: "文章",
      href: "/random/",
      icon: "i-ri-quill-pen-fill",
      dropbox: {
        enable: true,
        items: [
          {
            href: "/categories/",
            text: "分类",
            icon: "i-ri-book-shelf-fill",
          },
          {
            href: "/tags/",
            text: "标签",
            icon: "i-ri-price-tag-3-fill",
          },
          {
            href: "/archives/",
            text: "归档",
            icon: "i-ri-archive-line",
          },
        ],
      },
    },
    {
      text: "关于",
      href: "/about/",
      icon: "i-ri-user-3-line",
    },
    {
      text: "友链",
      href: "/friends/",
      icon: "i-ri-link",
    },
    {
      text: "动态",
      href: "/moments/",
      icon: "i-ri-chat-quote-line",
    },
    {
      text: "统计",
      href: "/statistics/",
      icon: "i-ri-bar-chart-box-line",
    },
  ],
  sidebar: {
    author: "skykn",
    description: "记录技术、生活与思考。",
    // 社交图标：键名自定义，icon 用 Remix Icon（i-ri-*）。
    // uno.config.ts 会自动收集此处图标进 safelist，无需手动维护。
    social: {
      telegram: {
        url: "https://t.me/ykncn",
        icon: "i-ri-telegram-fill",
        color: "var(--color-blue)",
      },
      discord: {
        url: "https://discord.com/users/1540000777257353328",
        icon: "i-ri-discord-fill",
        color: "var(--color-purple)",
      },
      email: {
        url: "mailto:ykncn@msn.com",
        icon: "i-ri-mail-line",
        color: "var(--color-aqua)",
      },
    },
  },
  cover: {
    fixedCover: {
      // 海岸日落航拍图（cover-4 为樱花图）
      url: "cover-3",
    },
  },
  layout: {
    rightSidebar: {
      calendar: false,
    },
  },
  home: {
    selectedCategories: [
      // 顺序即首页"分类"卡片的展示顺序（2 列网格按行排布）
      { name: "资讯新闻" },
      { name: "浮生札录" },
      { name: "技术载文" },
      { name: "作品陈列" },
    ],
    pageSize: 5,
  },
  friends: {
    title: "友链",
    description: "常来常往的站点，位置一直留着。",
    // 暂无友链：留空数组，页面会显示空态提示。后续按 friends-rules.md 的规则逐条添加。
    links: [],
  },
  footer: {
    since: 2026,
    // 隐藏底部的 "由 Astro 和 ShokaX 主题强力驱动" 致谢行
    powered: false,
    icp: {
      enable: false,
      icpnumber: "",
      icpurl: "",
    },
  },
});
