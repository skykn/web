// cannot use path alias here because unocss can not resolve it
import { defineConfig } from "./toolkit/themeConfig";

export default defineConfig({
  siteName: "skykn blog",
  brand: {
    title: "skykn blog",
    subtitle: "skykn 的个人博客",
    logo: "✨",
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
  },
  home: {
    selectedCategories: [
      { name: "资讯新闻" },
      { name: "技术载文" },
      { name: "作品陈列" },
      { name: "浮生札录" },
    ],
    pageSize: 5,
  },
  footer: {
    since: 2026,
    icp: {
      enable: false,
      icpnumber: "",
      icpurl: "",
    },
  },
});
